#!/usr/bin/env node
// Package a generated deck folder so the HTML can be shared with its assets.
// Usage: node scripts/shopee-template/package-deck.mjs <path-to-output/index.html> [--single-file] [--single-file-only]

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const deckFile = process.argv[2];
if (!deckFile) {
  console.error("Usage: node scripts/shopee-template/package-deck.mjs <path-to-output/index.html> [--single-file] [--single-file-only]");
  process.exit(1);
}

const options = new Set(process.argv.slice(3));
const writeSingleFile = options.has("--single-file") || options.has("--single-file-only");
const singleFileOnly = options.has("--single-file-only");
const unknownOptions = [...options].filter((option) => !["--single-file", "--single-file-only"].includes(option));
if (unknownOptions.length) {
  console.error(`Unknown option(s): ${unknownOptions.join(", ")}`);
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillRoot = join(__dirname, "..", "..");
const templateRoot = join(skillRoot, "assets", "shopee-template", "templates", "shopee-internal-report");
const deckPath = resolve(deckFile);
const deckDir = dirname(deckPath);
const runtimeSource = join(templateRoot, "deck-stage.js");
const reviewRuntimeSource = join(templateRoot, "review-annotations.js");
const logoSource = join(skillRoot, "assets", "shopee-template", "brand", "logos", "shopee-logomark-no-text-square.png");
const runtimeDest = join(deckDir, "deck-stage.js");
const reviewRuntimeDest = join(deckDir, "review-annotations.js");
const logoRel = "assets/brand/logos/shopee-logomark-no-text-square.png";
const logoDest = join(deckDir, logoRel);
const localLogoRef = `./${logoRel}`;
const singleFilePath = join(deckDir, `${basename(deckPath, extname(deckPath))}.single.html`);

if (!existsSync(deckPath)) {
  console.error(`Deck HTML not found: ${deckPath}`);
  process.exit(1);
}
if (basename(deckPath) !== "index.html") {
  console.warn(`WARN expected output HTML to be named index.html, got ${basename(deckPath)}`);
}

if (!singleFileOnly) {
  mkdirSync(dirname(logoDest), { recursive: true });
  copyFileSync(runtimeSource, runtimeDest);
  copyFileSync(reviewRuntimeSource, reviewRuntimeDest);
  copyFileSync(logoSource, logoDest);
}

let html = readFileSync(deckPath, "utf8");

function makeFolderPortable(sourceHtml) {
  let nextHtml = sourceHtml.replace(
  /((?:src=["']|url\(\s*["']?))[^"')]*shopee-logomark-no-text-square\.png/g,
  `$1${localLogoRef}`
  );

  const runtimeScriptRe = /<script\b[^>]*src=["'][^"']*deck-stage\.js["'][^>]*>\s*<\/script>/gi;
  if (runtimeScriptRe.test(nextHtml)) {
    nextHtml = nextHtml.replace(runtimeScriptRe, '<script src="./deck-stage.js"></script>');
  } else if (/<\/body>/i.test(nextHtml)) {
    nextHtml = nextHtml.replace(/<\/body>/i, '  <script src="./deck-stage.js"></script>\n</body>');
  } else {
    nextHtml += '\n<script src="./deck-stage.js"></script>\n';
  }

  const reviewScriptTag = '<script src="./review-annotations.js"></script>';
  const reviewScriptRe = /<script\b[^>]*src=["'][^"']*review-annotations\.js["'][^>]*>\s*<\/script>/gi;
  if (reviewScriptRe.test(nextHtml)) {
    nextHtml = nextHtml.replace(reviewScriptRe, reviewScriptTag);
  } else if (nextHtml.includes('<script src="./deck-stage.js"></script>')) {
    nextHtml = nextHtml.replace('<script src="./deck-stage.js"></script>', `<script src="./deck-stage.js"></script>\n  ${reviewScriptTag}`);
  } else if (/<\/body>/i.test(nextHtml)) {
    nextHtml = nextHtml.replace(/<\/body>/i, `  ${reviewScriptTag}\n</body>`);
  } else {
    nextHtml += `\n${reviewScriptTag}\n`;
  }

  return nextHtml;
}

function inlineRuntime(sourceHtml, scriptName, scriptSource) {
  const escapedScript = scriptSource.replace(/<\/script/gi, "<\\/script");
  const inlineTag = `<script data-inlined-runtime="${scriptName}">\n${escapedScript}\n</script>`;
  const scriptRe = new RegExp(`<script\\b[^>]*src=["'][^"']*${scriptName.replace(".", "\\.")}["'][^>]*>\\s*<\\/script>`, "gi");
  if (scriptRe.test(sourceHtml)) return sourceHtml.replace(scriptRe, inlineTag);
  if (/<\/body>/i.test(sourceHtml)) return sourceHtml.replace(/<\/body>/i, `  ${inlineTag}\n</body>`);
  return `${sourceHtml}\n${inlineTag}\n`;
}

function makeSingleFile(sourceHtml) {
  const logoDataUri = `data:image/png;base64,${readFileSync(logoSource).toString("base64")}`;
  let nextHtml = sourceHtml.replace(
    /((?:src=["']|url\(\s*["']?))[^"')]*shopee-logomark-no-text-square\.png/g,
    `$1${logoDataUri}`
  );

  nextHtml = inlineRuntime(nextHtml, "deck-stage.js", readFileSync(runtimeSource, "utf8"));
  nextHtml = inlineRuntime(nextHtml, "review-annotations.js", readFileSync(reviewRuntimeSource, "utf8"));
  return nextHtml;
}

html = makeFolderPortable(html);
if (!singleFileOnly) writeFileSync(deckPath, html, "utf8");
if (writeSingleFile) writeFileSync(singleFilePath, makeSingleFile(html), "utf8");

if (!singleFileOnly) {
  console.log(`Packaged folder deck ${deckPath}`);
  console.log(` - ${relative(deckDir, runtimeDest)}`);
  console.log(` - ${relative(deckDir, reviewRuntimeDest)}`);
  console.log(` - ${relative(deckDir, logoDest)}`);
}
if (writeSingleFile) {
  console.log(`Packaged single-file deck ${singleFilePath}`);
}
