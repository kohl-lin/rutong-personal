#!/usr/bin/env node
// Capture one exact slide-canvas PNG per slide for visual review.
// Usage: node scripts/shopee-template/screenshot-deck.mjs <deck.html> [out-dir]
// Requires Chrome/Chromium. Set CHROME_PATH to override detection.
// Uses Chrome DevTools Protocol Page.captureScreenshot with a .slide clip so
// toolbar/body height never compresses or contaminates the 1280x720 canvas.

import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execSync, spawn } from "node:child_process";

const deck = process.argv[2];
if (!deck) {
  console.error("Usage: node scripts/shopee-template/screenshot-deck.mjs <deck.html> [out-dir]");
  process.exit(1);
}
const outDir = process.argv[3] || join(process.cwd(), "deck-screenshots");
mkdirSync(outDir, { recursive: true });

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [
    "chromium", "chromium-browser", "google-chrome", "google-chrome-stable",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome",
  ];
  for (const c of candidates) {
    try {
      const p = c.startsWith("/") ? (existsSync(c) ? c : null) : execSync(`which ${JSON.stringify(c)}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
      if (p) return p;
    } catch {
      // Keep looking.
    }
  }
  return null;
}

function attrValue(attrs, name) {
  const match = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? (match[1] ?? match[2] ?? "") : "";
}

function slideCount(html) {
  const sections = [...html.matchAll(/<section\b([^>]*)>/gi)];
  return sections.filter((match) => {
    const attrs = match[1] || "";
    const classes = attrValue(attrs, "class").split(/\s+/);
    return classes.includes("slide") && attrValue(attrs, "data-layout-id") && attrValue(attrs, "data-sequence");
  }).length;
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

async function terminateProcess(proc) {
  if (!proc || proc.exitCode !== null) return;
  proc.kill("SIGTERM");
  await Promise.race([
    new Promise((resolveClose) => proc.once("close", resolveClose)),
    delay(1200)
  ]);
  if (proc.exitCode === null) proc.kill("SIGKILL");
}

async function waitForDevtoolsPort(profileDir, proc, stderr) {
  const portFile = join(profileDir, "DevToolsActivePort");
  for (let i = 0; i < 160; i++) {
    if (existsSync(portFile)) {
      const [port] = readFileSync(portFile, "utf8").trim().split(/\r?\n/);
      if (port) return port;
    }
    if (proc.exitCode !== null) break;
    await delay(50);
  }
  throw new Error(`Chrome did not expose DevToolsActivePort. ${stderr()}`);
}

function connectCdp(wsUrl) {
  return new Promise((resolveConnect, rejectConnect) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();

    ws.addEventListener("open", () => {
      resolveConnect({
        send(method, params = {}) {
          const id = nextId++;
          ws.send(JSON.stringify({ id, method, params }));
          return new Promise((resolveSend, rejectSend) => {
            pending.set(id, { resolve: resolveSend, reject: rejectSend, method });
          });
        },
        close() {
          ws.close();
        }
      });
    });

    ws.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (!message.id || !pending.has(message.id)) return;
      const item = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) item.reject(new Error(`${item.method}: ${message.error.message}`));
      else item.resolve(message.result || {});
    });

    ws.addEventListener("error", rejectConnect);
    ws.addEventListener("close", () => {
      for (const item of pending.values()) item.reject(new Error("CDP websocket closed"));
      pending.clear();
    });
  });
}

async function openPage(port) {
  const endpoint = `http://127.0.0.1:${port}/json/new?${encodeURIComponent("about:blank")}`;
  let response = await fetch(endpoint, { method: "PUT" });
  if (!response.ok) response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Could not create Chrome target: HTTP ${response.status}`);
  const target = await response.json();
  if (!target.webSocketDebuggerUrl) throw new Error("Chrome target did not include webSocketDebuggerUrl");
  return connectCdp(target.webSocketDebuggerUrl);
}

async function waitForSlide(client, expectedSlide) {
  const expression = `
    new Promise((resolve) => {
      const started = Date.now();
      const tick = () => {
        const stage = document.querySelector("[data-deck-stage]");
        const slide = document.querySelector(".slide:not([hidden])");
        const rect = slide ? slide.getBoundingClientRect() : null;
        const ready = document.readyState === "complete" &&
          slide && rect && rect.width > 100 && rect.height > 100 &&
          (!stage || stage.dataset.currentSlide === "${expectedSlide}");
        if (ready || Date.now() - started > 5000) {
          resolve({
            ready,
            currentSlide: stage ? stage.dataset.currentSlide : "",
            rect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null
          });
          return;
        }
        setTimeout(tick, 50);
      };
      tick();
    })
  `;
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  const value = result.result?.value;
  if (!value?.ready || !value.rect) {
    throw new Error(`Slide ${expectedSlide} did not render for screenshot; currentSlide=${value?.currentSlide || "<none>"}`);
  }
  return value.rect;
}

const chrome = findChrome();
if (!chrome) {
  console.error("No Chrome/Chromium binary found. Install one or set CHROME_PATH.");
  process.exit(2);
}

const html = readFileSync(deck, "utf8");
const count = slideCount(html);
if (count === 0) {
  console.error("No slides found in " + deck);
  process.exit(2);
}

const abs = resolve(deck);
const profileDir = mkdtempSync(join(tmpdir(), "shopee-screenshot-"));
let stderrBuffer = "";
const chromeProc = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  "--window-size=1280,720",
  "--remote-debugging-port=0",
  `--user-data-dir=${profileDir}`,
  "about:blank"
], { stdio: ["ignore", "ignore", "pipe"] });

chromeProc.stderr.on("data", (chunk) => {
  stderrBuffer += String(chunk);
  if (stderrBuffer.length > 4000) stderrBuffer = stderrBuffer.slice(-4000);
});

try {
  const port = await waitForDevtoolsPort(profileDir, chromeProc, () => stderrBuffer);
  const client = await openPage(port);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log(`Capturing ${count} clipped slide screenshots with ${chrome}`);
  for (let i = 1; i <= count; i++) {
    await client.send("Page.navigate", { url: `file://${abs}?slide=${i}` });
    const rect = await waitForSlide(client, i);
    const png = join(outDir, `slide-${String(i).padStart(2, "0")}.png`);
    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
      clip: {
        x: Math.max(0, rect.x),
        y: Math.max(0, rect.y),
        width: Math.min(1280, rect.width),
        height: Math.min(720, rect.height),
        scale: 1
      }
    });
    writeFileSync(png, Buffer.from(screenshot.data, "base64"));
    console.log("wrote " + png);
  }

  client.close();
  console.log(`Done. Review the ${count} PNGs in ${outDir} against references/shopee-template/visual-review.md.`);
} finally {
  await terminateProcess(chromeProc);
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 120 });
}
