#!/usr/bin/env node
// Lint a produced Shopee HTML deck against hard design-system constraints.
// Usage: node scripts/shopee-template/lint-deck.mjs <path-to-deck.html>
//
// Checks (ERROR = must fix, WARN = review visually):
//  E1  every non-cover / non-ending / non-section-divider slide has .shopee-content-header
//  E2  data-sequence values are continuous 1..N with no duplicates
//  E3  no font-size below 8px anywhere in slide markup
//  E4  no leftover placeholder text (Lorem, TODO, XXX, {{...}}, 占位, 待填)
//  E5  slides carry contenteditable="true" text fields (manual editing preserved)
//  E6  deck-stage runtime is packaged next to the HTML or inlined
//  E7  Shopee logomark is packaged next to the HTML or inlined as a data URL
//  E8  review annotation runtime is packaged next to the HTML or inlined
//  E9  data-layout-id and derived editable IDs are unique
//  E10 agenda targets exist and follow physical slide order
//  E11 every slide footer is the matching NN / total
//  W1  hex colors used inside slides that are not in the approved token palette
//  W2  slide count in footer "N/M" (if present) matches actual slide count
//  W3  bracket-style template placeholders remain anywhere in the HTML
//  W4  modal content is missing, stale, or unreferenced

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/shopee-template/lint-deck.mjs <deck.html>");
  process.exit(1);
}
const html = readFileSync(file, "utf8");
const isTemplate = /(?:^|\/)template\.html$/i.test(file.replace(/\\/g, "/"));

const APPROVED_HEX = new Set([
  "#ee4d2d", "#d3422a", "#fff1ec", "#f65800", "#f37b62",
  "#d0011b", "#e4380e", "#113366", "#111340", "#0053de",
  "#2794fb", "#26aa99", "#3ce6ca", "#ffbb00", "#ffbc1b",
  "#d2aa6e", "#4caf50", "#70ad47", "#2673dd", "#202325", "#101010",
  "#757575", "#616161", "#eeeff2", "#f9f9f9", "#ffffff",
  "#fff", "#000", "#000000",
]);

const errors = [];
const warns = [];

function attrValue(attrs, name) {
  const match = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? (match[1] ?? match[2] ?? "") : "";
}

function hasClass(attrs, className) {
  return attrValue(attrs, "class").split(/\s+/).includes(className);
}

function findTags(markup, tagName) {
  return [...markup.matchAll(new RegExp(`<${tagName}\\b([^>]*)>`, "gi"))]
    .map((match) => ({ tag: match[0], attrs: match[1] || "" }));
}

// Split into slide sections. Attribute order must not change what lint sees.
const sectionRe = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
const slides = [];
let m;
while ((m = sectionRe.exec(html)) !== null) {
  const attrs = m[1] || "";
  if (!hasClass(attrs, "slide")) continue;
  const layout = attrValue(attrs, "data-layout-id");
  const sequence = attrValue(attrs, "data-sequence");
  if (!layout || !sequence) continue;
  slides.push({ id: attrValue(attrs, "id"), layout, seq: Number(sequence), body: m[2], open: m[0].slice(0, 240), attrs });
}

// E10: agenda links resolve and follow the same order as the slide file.
{
  const slideIds = slides.map((slide) => slide.id).filter(Boolean);
  const agendaTargets = [...html.matchAll(/class=["'][^"']*\bagenda-item\b[^"']*["'][^>]*\bdata-target=["']([^"']+)["']/gi)]
    .map((match) => match[1]);
  for (const target of agendaTargets) {
    if (!slideIds.includes(target)) errors.push(`E10 agenda target #${target} does not match a slide id`);
  }
  const physicalAgendaOrder = slideIds.filter((id) => agendaTargets.includes(id));
  if (agendaTargets.join("|") !== physicalAgendaOrder.join("|")) {
    errors.push("E10 agenda target order does not match physical slide order");
  }
}

// E11: each slide carries its own page numerator and the correct deck total.
for (let index = 0; index < slides.length; index++) {
  const pages = [...slides[index].body.matchAll(/\b(\d{2})\s*\/\s*(\d{2})\b/g)];
  const page = pages.at(-1);
  if (!page || Number(page[1]) !== index + 1 || Number(page[2]) !== slides.length) {
    errors.push(`E11 slide seq=${slides[index].seq} footer must be ${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`);
  }
}
if (slides.length === 0) {
  console.error("ERROR: no <section> blocks with class=\"slide\", data-layout-id, and data-sequence found.");
  process.exit(2);
}

// E1: content header on content slides
const HEADER_EXEMPT = /cover|ending|section-divider|agenda/i;
for (const s of slides) {
  const exempt = HEADER_EXEMPT.test(s.layout) || /full-bleed/.test(s.open);
  const hasHeader = s.body.includes("shopee-content-header") || /<header class="content-header"/.test(s.body);
  if (!exempt && !hasHeader) {
    errors.push(`E1 slide seq=${s.seq} (${s.layout}) is missing .shopee-content-header`);
  }
}

// E2: sequence continuity
const seqs = slides.map((s) => s.seq).sort((a, b) => a - b);
for (let i = 0; i < seqs.length; i++) {
  if (seqs[i] !== i + 1) {
    errors.push(`E2 data-sequence not continuous: got [${seqs.join(",")}], expected 1..${seqs.length}`);
    break;
  }
}

// E3: font sizes below 8px
const fsRe = /font(?:-size)?\s*:\s*(?:\d{3}\s+)?([0-9]*\.?[0-9]+)px/g;
for (const s of slides) {
  let f;
  while ((f = fsRe.exec(s.body)) !== null) {
    if (parseFloat(f[1]) < 8) {
      errors.push(`E3 slide seq=${s.seq} uses font-size ${f[1]}px (< 8px legibility floor)`);
    }
  }
}

// E4: placeholder text
const phRe = /(Lorem ipsum|\bTODO\b|\bXXX\b|\{\{[^}]*\}\}|占位|待填|placeholder text)/i;
for (const s of slides) {
  const p = s.body.match(phRe);
  if (p) errors.push(`E4 slide seq=${s.seq} contains leftover placeholder: "${p[0]}"`);
}

// E5: contenteditable present
for (const s of slides) {
  if (!/contenteditable\s*=\s*["']true["']/i.test(s.body)) {
    errors.push(`E5 slide seq=${s.seq} (${s.layout}) has no contenteditable="true" fields`);
  }
}

// E9: unique layout IDs and unique derived editable IDs
{
  const layoutCounts = new Map();
  for (const s of slides) layoutCounts.set(s.layout, (layoutCounts.get(s.layout) || 0) + 1);
  for (const [layoutId, count] of layoutCounts) {
    if (count > 1) errors.push(`E9 duplicate data-layout-id "${layoutId}" appears ${count}x — make continuation/custom slides unique`);
  }

  const editableCounts = new Map();
  for (const s of slides) {
    let fallbackIndex = 0;
    for (const tag of findTags(s.body, "[a-zA-Z0-9-]+")) {
      if (attrValue(tag.attrs, "contenteditable") !== "true") continue;
      const slideKey = `slide-${s.seq}:${s.layout}`;
      const slot = attrValue(tag.attrs, "data-slot");
      const id = slot ? `${slideKey}:${slot}` : `${slideKey}:editable-${++fallbackIndex}`;
      editableCounts.set(id, (editableCounts.get(id) || 0) + 1);
    }
  }
  for (const [editableId, count] of editableCounts) {
    if (count > 1) errors.push(`E9 duplicate derived editableId "${editableId}" appears ${count}x — data-slot values must be unique within a slide`);
  }
}

// E6: frozen runtime referenced and present next to the deck
{
  const scriptMatch = html.match(/<script[^>]*src="([^"]*deck-stage\.js)"/);
  const inlinedRuntime = /<script\b[^>]*data-inlined-runtime=["']deck-stage\.js["'][^>]*>/i.test(html);
  if (!scriptMatch && !inlinedRuntime) {
    errors.push("E6 deck does not reference or inline deck-stage.js — the frozen runtime (nav/autosave/editor) is missing");
  } else {
    if (scriptMatch) {
      if (scriptMatch[1] !== "./deck-stage.js") {
        errors.push(`E6 deck references ${scriptMatch[1]} — generated folder decks must use ./deck-stage.js so the output folder is portable`);
      }
      const runtimePath = resolvePath(dirname(resolvePath(file)), scriptMatch[1]);
      if (!existsSync(runtimePath)) {
        errors.push(`E6 deck references ${scriptMatch[1]} but the file is missing at ${runtimePath} — package the bundled deck-stage.js next to the deck`);
      }
    }
  }
}

// E7: Shopee logomark is packaged inside the output folder
{
  const deckDir = dirname(resolvePath(file));
  const logoRefs = [...html.matchAll(/(?:src=["']|url\(\s*["']?)([^"')]*(?:shopee-logomark-no-text-square\.png|data:image\/png;base64,[A-Za-z0-9+/=]+))/g)]
    .map((match) => match[1]);
  if (logoRefs.length === 0) {
    errors.push("E7 deck does not reference or inline shopee-logomark-no-text-square.png — the standard Shopee mark is missing");
  }
  for (const ref of new Set(logoRefs)) {
    if (ref.startsWith("data:image/png;base64,")) continue;
    if (ref !== "./assets/brand/logos/shopee-logomark-no-text-square.png") {
      errors.push(`E7 Shopee logomark reference ${ref} is not self-contained — use ./assets/brand/logos/shopee-logomark-no-text-square.png`);
      continue;
    }
    const logoPath = resolvePath(deckDir, ref);
    if (!existsSync(logoPath)) {
      errors.push(`E7 deck references ${ref} but the file is missing at ${logoPath} — copy assets/brand/logos/shopee-logomark-no-text-square.png into the output folder`);
    }
  }
}

// E8: review annotation runtime referenced and present next to the deck
{
  const scriptMatch = html.match(/<script[^>]*src="([^"]*review-annotations\.js)"/);
  const inlinedReviewRuntime = /<script\b[^>]*data-inlined-runtime=["']review-annotations\.js["'][^>]*>/i.test(html);
  if (!scriptMatch && !inlinedReviewRuntime) {
    errors.push("E8 deck does not reference or inline review-annotations.js — the browser review/comment mode is missing");
  } else {
    if (scriptMatch) {
      if (scriptMatch[1] !== "./review-annotations.js") {
        errors.push(`E8 deck references ${scriptMatch[1]} — generated folder decks must use ./review-annotations.js so review mode is portable`);
      }
      const reviewRuntimePath = resolvePath(dirname(resolvePath(file)), scriptMatch[1]);
      if (!existsSync(reviewRuntimePath)) {
        errors.push(`E8 deck references ${scriptMatch[1]} but the file is missing at ${reviewRuntimePath} — package the bundled review-annotations.js next to the deck`);
      }
    }
  }
}

// W1: off-palette hex colors inside slides
const hexRe = /#[0-9a-fA-F]{3,6}\b/g;
const offPalette = new Map();
for (const s of slides) {
  let h;
  while ((h = hexRe.exec(s.body)) !== null) {
    const hex = h[0].toLowerCase();
    if (!APPROVED_HEX.has(hex)) {
      offPalette.set(hex, (offPalette.get(hex) || 0) + 1);
    }
  }
}
for (const [hex, count] of offPalette) {
  warns.push(`W1 off-palette color ${hex} used ${count}x — confirm it encodes business meaning or replace with a token`);
}

// W2: footer page total
const totalRe = /(\d+)\s*\/\s*(\d+)/g;
let t;
const totals = new Set();
while ((t = totalRe.exec(html)) !== null) totals.add(Number(t[2]));
if (totals.size > 0 && !totals.has(slides.length) && totals.size === 1) {
  warns.push(`W2 footer page totals say /${[...totals][0]} but deck has ${slides.length} slides`);
}

// W3: bracket-style template placeholders anywhere in the HTML, including modals.
{
  const bracketPlaceholderRe = /\[[^\]\n]{0,80}(?:标题|名称|姓名|YYYY|WXX|指标|数据源|口径|报告|团队|部门|周期|对象|计算公式|placeholder)[^\]\n]{0,80}\]/gi;
  const found = [...new Set([...html.matchAll(bracketPlaceholderRe)].map((match) => match[0].replace(/\s+/g, " ").trim()))];
  if (found.length && !isTemplate) {
    warns.push(`W3 bracket placeholder(s) remain: ${found.slice(0, 6).join(" | ")}${found.length > 6 ? ` | +${found.length - 6} more` : ""}`);
  }
}

// W4: modal trigger/content consistency. Shell example modal text should not
// silently ship in generated decks, and triggers should always resolve.
{
  const triggers = new Set([...html.matchAll(/\bdata-target\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]));
  const modalEntries = [...html.matchAll(/<div\b([^>]*)>([\s\S]*?)<\/div>/gi)]
    .map((match) => ({
      id: attrValue(match[1] || "", "id"),
      body: match[2] || ""
    }))
    .filter((entry) => entry.id.startsWith("modal-") && entry.id !== "modal-overlay");
  const modalIds = new Set(modalEntries.map((entry) => entry.id));

  for (const target of triggers) {
    if (target.startsWith("modal-") && !modalIds.has(target)) {
      warns.push(`W4 modal trigger references missing #${target}`);
    }
  }
  for (const entry of modalEntries) {
    if (!triggers.has(entry.id)) warns.push(`W4 modal #${entry.id} is not referenced by any trigger`);
    if (!isTemplate && /(2026-W22|Y26|Shopee Analytics|Service Quality Dashboard|OKR Tracking Sheet|\[[^\]]+\])/i.test(entry.body)) {
      warns.push(`W4 modal #${entry.id} appears to contain template/example content`);
    }
  }
}

console.log(`Linted ${file}: ${slides.length} slides`);
for (const e of errors) console.log("ERROR " + e);
for (const w of warns) console.log("WARN  " + w);
if (errors.length === 0 && warns.length === 0) console.log("PASS: no issues found");
process.exit(errors.length > 0 ? 1 : 0);
