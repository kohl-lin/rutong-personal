#!/usr/bin/env node
// Runtime regression tests for generated Shopee decks.
// Covers packaging, linting, export safety, editable ID uniqueness, review mode,
// and clipped 1280x720 screenshots.

import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync, execSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillRoot = join(__dirname, "..", "..");
const scriptDir = join(skillRoot, "scripts", "shopee-template");

function assert(condition, message) {
  if (!condition) throw new Error(message);
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
  return connectCdp(target.webSocketDebuggerUrl);
}

async function waitForReady(client) {
  const result = await client.send("Runtime.evaluate", {
    awaitPromise: true,
    returnByValue: true,
    expression: `
      new Promise((resolve) => {
        const started = Date.now();
        const tick = () => {
          const stage = document.querySelector("[data-deck-stage]");
          const ready = document.readyState === "complete" && stage && stage.dataset.currentSlide === "1" && document.querySelector("[data-deck-toolbar]");
          if (ready || Date.now() - started > 5000) resolve(Boolean(ready));
          else setTimeout(tick, 50);
        };
        tick();
      })
    `
  });
  assert(result.result?.value === true, "deck runtime did not initialize");
}

function pngSize(file) {
  const png = readFileSync(file);
  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20)
  };
}

function writeFixtureDeck(file) {
  writeFileSync(file, `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Runtime Regression Deck</title>
  <style>
    :root { --logo: url("./assets/brand/logos/shopee-logomark-no-text-square.png"); }
    body { margin: 0; background: #e9ebef; font-family: Arial, sans-serif; }
    .deck { width: 100vw; height: 100vh; display: grid; place-items: center; }
    .slide { width: 1280px; height: 720px; position: relative; background: #fff; padding: 34px 36px; box-sizing: border-box; overflow: hidden; }
    .slide[hidden] { display: none !important; }
    .content-header { display: grid; grid-template-columns: 50px 1fr; gap: 14px; }
    .mark { width: 44px; height: 44px; }
    .footer { position: absolute; left: 36px; right: 36px; bottom: 28px; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <main class="deck" data-deck-stage data-storage-version="runtime-test-v1">
    <section class="slide" data-layout-id="internal.test-one" data-sequence="1">
      <header class="content-header"><img class="mark" src="./assets/brand/logos/shopee-logomark-no-text-square.png" alt="Shopee"><h2 contenteditable="true" data-slot="headline">First slide headline</h2></header>
      <p contenteditable="true" data-slot="body">First slide evidence.</p>
      <div class="footer"><span contenteditable="true" data-slot="source">Source: regression fixture</span><span><span contenteditable="true" data-slot="page">01 / 02</span> <button class="modal-trigger" data-target="modal-real" type="button">Notes</button></span></div>
    </section>
    <section class="slide" data-sequence="2" data-layout-id="internal.test-two">
      <header class="content-header"><img class="mark" src="./assets/brand/logos/shopee-logomark-no-text-square.png" alt="Shopee"><h2 contenteditable="true" data-slot="headline">Second slide headline</h2></header>
      <p contenteditable="true" data-slot="body">Second slide evidence.</p>
      <div class="footer"><span contenteditable="true" data-slot="source">Source: regression fixture</span><span contenteditable="true" data-slot="page">02 / 02</span></div>
    </section>
    <div id="modal-overlay" class="modal-overlay" hidden><div class="modal-body"></div></div>
    <div id="modal-real" hidden><strong>Metric notes</strong><p>Real fixture definition.</p></div>
  </main>
  <script src="./deck-stage.js"></script>
</body>
</html>
`, "utf8");
}

const chrome = findChrome();
if (!chrome) throw new Error("No Chrome/Chromium binary found for runtime tests.");

const tmp = mkdtempSync(join(tmpdir(), "shopee-runtime-test-"));
const deckPath = join(tmp, "index.html");
const singleFileDeckPath = join(tmp, "index.single.html");
const screenshotDir = join(tmp, "screenshots");
const profileDir = mkdtempSync(join(tmpdir(), "shopee-runtime-chrome-"));
let chromeProc = null;
let stderrBuffer = "";

try {
  writeFixtureDeck(deckPath);
  execFileSync(process.execPath, [join(scriptDir, "package-deck.mjs"), deckPath, "--single-file"], { stdio: "inherit" });
  execFileSync(process.execPath, [join(scriptDir, "lint-deck.mjs"), deckPath], { stdio: "inherit" });
  execFileSync(process.execPath, [join(scriptDir, "lint-deck.mjs"), singleFileDeckPath], { stdio: "inherit" });
  const singleFileHtml = readFileSync(singleFileDeckPath, "utf8");
  assert(singleFileHtml.includes('data-inlined-runtime="deck-stage.js"'), "single-file deck did not inline deck-stage.js");
  assert(singleFileHtml.includes('data-inlined-runtime="review-annotations.js"'), "single-file deck did not inline review-annotations.js");
  assert(singleFileHtml.includes("data:image/png;base64,"), "single-file deck did not inline Shopee logo");
  mkdirSync(screenshotDir, { recursive: true });
  execFileSync(process.execPath, [join(scriptDir, "screenshot-deck.mjs"), deckPath, screenshotDir], { stdio: "inherit" });
  assert(pngSize(join(screenshotDir, "slide-01.png")).width === 1280, "slide-01 screenshot width is not 1280");
  assert(pngSize(join(screenshotDir, "slide-01.png")).height === 720, "slide-01 screenshot height is not 720");

  chromeProc = spawn(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1280,900",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    "about:blank"
  ], { stdio: ["ignore", "ignore", "pipe"] });
  chromeProc.stderr.on("data", (chunk) => {
    stderrBuffer += String(chunk);
    if (stderrBuffer.length > 4000) stderrBuffer = stderrBuffer.slice(-4000);
  });

  const port = await waitForDevtoolsPort(profileDir, chromeProc, () => stderrBuffer);
  const client = await openPage(port);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Page.navigate", { url: `file://${deckPath}` });
  await waitForReady(client);

  const idResult = await client.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const ids = Array.from(document.querySelectorAll("[contenteditable='true']")).map((node) => node.dataset.editableId);
      return { ids, unique: new Set(ids).size, reviewButton: Boolean(document.querySelector("[data-review-action='toggle']")) };
    })()`
  });
  const idValue = idResult.result.value;
  assert(idValue.ids.length === idValue.unique, "editable IDs are not unique");
  assert(idValue.ids.some((id) => id.startsWith("slide-1:")), "slide 1 editable IDs missing slide key");
  assert(idValue.ids.some((id) => id.startsWith("slide-2:")), "slide 2 editable IDs missing slide key");
  assert(idValue.reviewButton, "Review button was not installed");

  const exportResult = await client.send("Runtime.evaluate", {
    awaitPromise: true,
    returnByValue: true,
    expression: `(() => new Promise((resolve) => {
      const NativeBlob = window.Blob;
      window.Blob = function(parts, options) {
        window.__lastExportHtml = parts.map((part) => String(part)).join("");
        return new NativeBlob(parts, options);
      };
      window.Blob.prototype = NativeBlob.prototype;
      document.querySelector("[data-action='export']").click();
      setTimeout(() => resolve(window.__lastExportHtml || ""), 100);
    }))()`
  });
  const exportedHtml = exportResult.result.value;
  assert(exportedHtml.includes('id="modal-overlay" class="modal-overlay" hidden'), "export removed hidden from modal overlay");
  assert(exportedHtml.includes('id="modal-real" hidden'), "export removed hidden from modal content");
  assert(!exportedHtml.includes("data-review-toolbar"), "export leaked review toolbar markup");

  await client.send("Page.navigate", { url: `file://${singleFileDeckPath}` });
  await waitForReady(client);
  const singleFileRuntimeResult = await client.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => ({
      toolbar: Boolean(document.querySelector("[data-deck-toolbar]")),
      reviewButton: Boolean(document.querySelector("[data-review-action='toggle']")),
      logoComplete: Boolean(document.querySelector(".mark")?.complete)
    }))()`
  });
  assert(singleFileRuntimeResult.result.value.toolbar, "single-file deck did not install editor toolbar");
  assert(singleFileRuntimeResult.result.value.reviewButton, "single-file deck did not install Review button");
  assert(singleFileRuntimeResult.result.value.logoComplete, "single-file deck logo did not load");

  client.close();
  console.log("Runtime regression tests passed.");
} finally {
  await terminateProcess(chromeProc);
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 120 });
  rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 120 });
}
