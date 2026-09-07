#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillRoot = join(__dirname, "..", "..");
const scriptDir = join(skillRoot, "scripts", "shopee-template");
const templatesDir = join(skillRoot, "assets", "shopee-template", "templates");
const reviewRuntimePath = join(templatesDir, "shopee-internal-report", "review-annotations.js");
const referenceAssetDir = join(skillRoot, "assets", "shopee-template", "reference-decks", "shopee-monthly-reference");
const referenceAssetManifestPath = join(referenceAssetDir, "asset.json");
const canonicalLogoPath = join(skillRoot, "assets", "shopee-template", "brand", "logos", "shopee-logomark-no-text-square.png");
const templateLogoPath = join(templatesDir, "shopee-internal-report", "assets", "brand", "logos", "shopee-logomark-no-text-square.png");

const requiredFields = [
  "slug",
  "name",
  "tagline",
  "mood",
  "occasion",
  "tone",
  "formality",
  "density",
  "scheme",
  "best_for",
  "avoid_for",
  "layout_modules",
  "manual_editing",
  "delivery_packaging",
  "design_system",
  "visual_element_library",
  "shared_visual_assets",
  "input_modes",
  "pre_generation_plan",
  "layouts",
  "slide_count"
];

function isDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function zipEntries(path) {
  return execFileSync("unzip", ["-Z1", path], { encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean);
}

function zipText(path, entry) {
  return execFileSync("unzip", ["-p", path, entry], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
}

function nonEmptyDrawingText(xml) {
  return [...xml.matchAll(/<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>/g)]
    .map((match) => match[1].replace(/&(?:amp|lt|gt|quot|apos);/g, "").trim())
    .filter(Boolean);
}

function validateSanitizedPptx(sourcePath, asset) {
  const entries = zipEntries(sourcePath);
  const slideEntries = entries.filter((entry) => /^ppt\/slides\/slide\d+\.xml$/.test(entry));
  const layoutEntries = entries.filter((entry) => /^ppt\/slideLayouts\/slideLayout\d+\.xml$/.test(entry));
  const notesEntries = entries.filter((entry) => /^ppt\/notesSlides\/notesSlide\d+\.xml$/.test(entry));
  const forbiddenPrefixes = ["ppt/embeddings/", "ppt/charts/", "customXml/", "ppt/comments/", "ppt/commentAuthors"];

  if (slideEntries.length !== 55) errors.push(`reference asset: expected 55 slide parts, found ${slideEntries.length}`);
  if (layoutEntries.length !== 303) errors.push(`reference asset: expected 303 retained structural layout parts, found ${layoutEntries.length}`);
  if (notesEntries.length !== 55) errors.push(`reference asset: expected 55 empty note containers, found ${notesEntries.length}`);
  for (const prefix of forbiddenPrefixes) {
    if (entries.some((entry) => entry.startsWith(prefix))) errors.push(`reference asset: forbidden package content remains under ${prefix}`);
  }

  for (const entry of entries.filter((name) => name.endsWith(".rels"))) {
    const xml = zipText(sourcePath, entry);
    if (/TargetMode\s*=\s*["']External["']/i.test(xml) || /relationships\/hyperlink/i.test(xml)) {
      errors.push(`reference asset: external relationship or hyperlink remains in ${entry}`);
    }
  }

  for (const entry of [...slideEntries, ...notesEntries]) {
    const xml = zipText(sourcePath, entry);
    if (/<a:hlink(?:Click|MouseOver)\b/i.test(xml)) errors.push(`reference asset: hyperlink markup remains in ${entry}`);
    if (nonEmptyDrawingText(xml).length) errors.push(`reference asset: non-empty text remains in ${entry}`);
  }

  const slideLayoutTargets = new Set();
  for (const entry of entries.filter((name) => /^ppt\/slides\/_rels\/slide\d+\.xml\.rels$/.test(name))) {
    const xml = zipText(sourcePath, entry);
    for (const match of xml.matchAll(/Target=["']\/ppt\/slideLayouts\/(slideLayout\d+\.xml)["']/g)) slideLayoutTargets.add(match[1]);
  }
  if (slideLayoutTargets.size !== 17) errors.push(`reference asset: expected slides to reference 17 unique layouts, found ${slideLayoutTargets.size}`);

  if (entries.includes("docProps/core.xml")) {
    const core = zipText(sourcePath, "docProps/core.xml");
    const coreValues = core.replace(/<[^>]+>/g, " ");
    if (/(?:https?:\/\/|file:\/\/|[A-Z]:\\|\/Users\/|@[a-z0-9.-]+\.[a-z]{2,})/i.test(coreValues)) {
      errors.push("reference asset: core metadata contains a URL, local path, or email address");
    }
  } else {
    errors.push("reference asset: missing docProps/core.xml metadata");
  }

  if (asset.sanitized !== true) errors.push("reference asset: asset.json sanitized must be true");
  if (!Array.isArray(asset.retainedStructure) || asset.retainedStructure.length < 3) {
    errors.push("reference asset: asset.json retainedStructure must document empty notes and structural layouts");
  }
}

const slugs = readdirSync(templatesDir).filter((slug) => isDirectory(join(templatesDir, slug))).sort();
const errors = [];

for (const [label, logoPath] of [["canonical logo", canonicalLogoPath], ["template logo", templateLogoPath]]) {
  if (!existsSync(logoPath)) errors.push(`${label}: missing ${logoPath}`);
}
if (existsSync(canonicalLogoPath) && existsSync(templateLogoPath)) {
  const canonicalLogoHash = createHash("sha256").update(readFileSync(canonicalLogoPath)).digest("hex");
  const templateLogoHash = createHash("sha256").update(readFileSync(templateLogoPath)).digest("hex");
  if (canonicalLogoHash !== templateLogoHash) {
    errors.push("template logo: checksum differs from canonical packaging logo");
  }
}

if (!existsSync(reviewRuntimePath)) errors.push("runtime: missing review-annotations.js");

if (!existsSync(referenceAssetManifestPath)) {
  errors.push("reference asset: missing assets/shopee-template/reference-decks/shopee-monthly-reference/asset.json");
} else {
  try {
    const asset = JSON.parse(readFileSync(referenceAssetManifestPath, "utf8"));
    for (const field of ["id", "kind", "source", "preview", "contactSheet", "catalog", "slideCount", "aspectRatio", "sha256", "usage", "guardrails"]) {
      if (!(field in asset)) errors.push(`reference asset: missing field "${field}"`);
    }
    for (const field of ["source", "preview", "contactSheet"]) {
      if (typeof asset[field] === "string" && !existsSync(join(referenceAssetDir, asset[field]))) {
        errors.push(`reference asset: missing ${field} file "${asset[field]}"`);
      }
    }
    if (typeof asset.catalog === "string" && !existsSync(join(referenceAssetDir, asset.catalog))) {
      errors.push(`reference asset: missing catalog "${asset.catalog}"`);
    }
    if (Number.isInteger(asset.slideCount) && asset.slideCount !== 55) {
      errors.push(`reference asset: expected 55 slides, found ${asset.slideCount}`);
    }
    const sourcePath = typeof asset.source === "string" ? join(referenceAssetDir, asset.source) : null;
    if (sourcePath && existsSync(sourcePath) && typeof asset.sha256 === "string") {
      const actualHash = createHash("sha256").update(readFileSync(sourcePath)).digest("hex");
      if (actualHash !== asset.sha256) errors.push("reference asset: source PPTX checksum does not match asset.json");
      validateSanitizedPptx(sourcePath, asset);
    }
  } catch (error) {
    errors.push(`reference asset: invalid manifest - ${error.message}`);
  }
}

for (const slug of slugs) {
  const dir = join(templatesDir, slug);
  const metaPath = join(dir, "template.json");
  const htmlPath = join(dir, "template.html");
  const runtimePath = join(dir, "deck-stage.js");

  if (!existsSync(metaPath)) errors.push(`${slug}: missing template.json`);
  if (!existsSync(htmlPath)) errors.push(`${slug}: missing template.html`);
  if (!existsSync(runtimePath)) errors.push(`${slug}: missing deck-stage.js`);
  if (existsSync(htmlPath)) {
    const html = readFileSync(htmlPath, "utf8");
    if (!html.includes("shopee-logomark-no-text-square.png")) {
      errors.push(`${slug}: template.html must use the no-text Shopee logomark asset`);
    }
    if (!html.includes("contenteditable=\"true\"")) {
      errors.push(`${slug}: template.html must include contenteditable=\"true\" editable fields`);
    }
    try {
      execFileSync(process.execPath, [join(scriptDir, "lint-deck.mjs"), htmlPath], { encoding: "utf8" });
    } catch (error) {
      errors.push(`${slug}: template lint failed - ${(error.stdout || error.stderr || error.message).trim()}`);
    }
  }
  if (!existsSync(metaPath)) continue;

  try {
    const meta = JSON.parse(readFileSync(metaPath, "utf8"));
    for (const field of requiredFields) {
      if (!(field in meta)) errors.push(`${slug}: missing field "${field}"`);
    }
    if (meta.slug !== slug) errors.push(`${slug}: slug does not match folder name`);
    if (!Array.isArray(meta.mood)) errors.push(`${slug}: mood must be an array`);
    if (!Array.isArray(meta.occasion)) errors.push(`${slug}: occasion must be an array`);
    if (!Array.isArray(meta.tone)) errors.push(`${slug}: tone must be an array`);
    if (!Array.isArray(meta.layout_modules)) errors.push(`${slug}: layout_modules must be an array`);
    if (typeof meta.manual_editing !== "object" || meta.manual_editing === null || meta.manual_editing.enabled !== true) {
      errors.push(`${slug}: manual_editing.enabled must be true`);
    }
    if (typeof meta.delivery_packaging !== "object" || meta.delivery_packaging === null || Array.isArray(meta.delivery_packaging)) {
      errors.push(`${slug}: delivery_packaging must be an object`);
    } else {
      const packaging = meta.delivery_packaging;
      if (packaging.self_contained !== true) errors.push(`${slug}: delivery_packaging.self_contained must be true`);
      if (packaging.html_entry !== "index.html") errors.push(`${slug}: delivery_packaging.html_entry must be "index.html"`);
      if (packaging.single_file_entry !== "index.single.html") errors.push(`${slug}: delivery_packaging.single_file_entry must be "index.single.html"`);
      if (packaging.default_delivery_mode !== "both") errors.push(`${slug}: delivery_packaging.default_delivery_mode must be "both"`);
      if (packaging.required_runtime !== "deck-stage.js") errors.push(`${slug}: delivery_packaging.required_runtime must be "deck-stage.js"`);
      if (packaging.review_runtime !== "review-annotations.js") errors.push(`${slug}: delivery_packaging.review_runtime must be "review-annotations.js"`);
      if (!Array.isArray(packaging.required_assets) || !packaging.required_assets.includes("assets/brand/logos/shopee-logomark-no-text-square.png")) {
        errors.push(`${slug}: delivery_packaging.required_assets must include assets/brand/logos/shopee-logomark-no-text-square.png`);
      }
      if (!Array.isArray(packaging.path_rules) || !packaging.path_rules.length) {
        errors.push(`${slug}: delivery_packaging.path_rules must be a non-empty array`);
      }
    }
    if (typeof meta.design_system !== "object" || meta.design_system === null || Array.isArray(meta.design_system)) {
      errors.push(`${slug}: design_system must be an object`);
    } else {
      const designSystem = meta.design_system;
      if (typeof designSystem.reference !== "string" || !designSystem.reference) {
        errors.push(`${slug}: design_system.reference must be a non-empty string`);
      }
      if (designSystem.header_style !== "standard-shopee-content-header") {
        errors.push(`${slug}: design_system.header_style must be "standard-shopee-content-header"`);
      }
      if (typeof designSystem.typography_scale !== "object" || designSystem.typography_scale === null || Array.isArray(designSystem.typography_scale)) {
        errors.push(`${slug}: design_system.typography_scale must be an object`);
      }
      if (!Array.isArray(designSystem.color_tokens) || !designSystem.color_tokens.length) {
        errors.push(`${slug}: design_system.color_tokens must be a non-empty array`);
      }
      if (!Array.isArray(designSystem.required_components) || !designSystem.required_components.length) {
        errors.push(`${slug}: design_system.required_components must be a non-empty array`);
      }
    }
    if (typeof meta.visual_element_library !== "object" || meta.visual_element_library === null || Array.isArray(meta.visual_element_library)) {
      errors.push(`${slug}: visual_element_library must be an object`);
    } else {
      const elementLibrary = meta.visual_element_library;
      if (typeof elementLibrary.reference !== "string" || !elementLibrary.reference) {
        errors.push(`${slug}: visual_element_library.reference must be a non-empty string`);
      }
      if (typeof elementLibrary.css_reference !== "string" || !elementLibrary.css_reference) {
        errors.push(`${slug}: visual_element_library.css_reference must be a non-empty string`);
      }
      if (!Array.isArray(elementLibrary.approved_elements) || !elementLibrary.approved_elements.length) {
        errors.push(`${slug}: visual_element_library.approved_elements must be a non-empty array`);
      }
      if (!Array.isArray(elementLibrary.semantic_color_rules) || !elementLibrary.semantic_color_rules.length) {
        errors.push(`${slug}: visual_element_library.semantic_color_rules must be a non-empty array`);
      }
    }
    if (typeof meta.shared_visual_assets !== "object" || meta.shared_visual_assets === null || Array.isArray(meta.shared_visual_assets)) {
      errors.push(`${slug}: shared_visual_assets must be an object`);
    } else {
      for (const field of ["catalog", "manifest", "source", "contact_sheet", "use"]) {
        if (typeof meta.shared_visual_assets[field] !== "string" || !meta.shared_visual_assets[field]) {
          errors.push(`${slug}: shared_visual_assets.${field} must be a non-empty string`);
        }
      }
    }
    if (!Array.isArray(meta.input_modes) || meta.input_modes.length < 2) {
      errors.push(`${slug}: input_modes must include brief_first and source_synthesis`);
    } else {
      const modes = new Set(meta.input_modes.map((inputMode) => inputMode.mode));
      for (const requiredMode of ["brief_first", "source_synthesis"]) {
        if (!modes.has(requiredMode)) errors.push(`${slug}: input_modes missing ${requiredMode}`);
      }
      for (const inputMode of meta.input_modes) {
        if (typeof inputMode.mode !== "string" || !inputMode.mode) {
          errors.push(`${slug}: every input mode must include mode`);
        }
        if (typeof inputMode.use_when !== "string" || !inputMode.use_when) {
          errors.push(`${slug}: input mode ${inputMode.mode || "<missing>"} must include use_when`);
        }
        if (typeof inputMode.output !== "string" || !inputMode.output) {
          errors.push(`${slug}: input mode ${inputMode.mode || "<missing>"} must include output`);
        }
      }
    }
    if (typeof meta.pre_generation_plan !== "object" || meta.pre_generation_plan === null || Array.isArray(meta.pre_generation_plan)) {
      errors.push(`${slug}: pre_generation_plan must be an object`);
    } else {
      const plan = meta.pre_generation_plan;
      if (plan.required !== true) errors.push(`${slug}: pre_generation_plan.required must be true`);
      if (typeof plan.reference !== "string" || !plan.reference) {
        errors.push(`${slug}: pre_generation_plan.reference must be a non-empty string`);
      }
      if (!Array.isArray(plan.intake_questions) || plan.intake_questions.length < 3) {
        errors.push(`${slug}: pre_generation_plan.intake_questions must include at least 3 questions`);
      }
      if (!Array.isArray(plan.build_plan_fields) || !plan.build_plan_fields.length) {
        errors.push(`${slug}: pre_generation_plan.build_plan_fields must be a non-empty array`);
      }
      if (typeof plan.user_confirmation_gate !== "string" || !plan.user_confirmation_gate.length) {
        errors.push(`${slug}: pre_generation_plan.user_confirmation_gate must describe the approval gate`);
      }
      if (!Array.isArray(plan.quality_rules) || !plan.quality_rules.length) {
        errors.push(`${slug}: pre_generation_plan.quality_rules must be a non-empty array`);
      }

      if (!existsSync(join(dir, "review-annotations.js"))) {
        errors.push(`${slug}: missing review-annotations.js`);
      }
    }
    if (!Number.isInteger(meta.slide_count)) errors.push(`${slug}: slide_count must be an integer`);
    if ("large_table_split_policy" in meta) {
      const splitPolicy = meta.large_table_split_policy;
      if (typeof splitPolicy !== "object" || splitPolicy === null || Array.isArray(splitPolicy)) {
        errors.push(`${slug}: large_table_split_policy must be an object when present`);
      } else {
        if (splitPolicy.enabled !== true) errors.push(`${slug}: large_table_split_policy.enabled must be true when present`);
        if (!Array.isArray(splitPolicy.applies_to_layouts) || !splitPolicy.applies_to_layouts.length) {
          errors.push(`${slug}: large_table_split_policy.applies_to_layouts must be a non-empty array`);
        }
        if (typeof splitPolicy.must_split_when !== "object" || splitPolicy.must_split_when === null || Array.isArray(splitPolicy.must_split_when)) {
          errors.push(`${slug}: large_table_split_policy.must_split_when must be an object`);
        }
      }
    }
    if (!Array.isArray(meta.layouts) || !meta.layouts.length) {
      errors.push(`${slug}: layouts must be a non-empty array`);
    } else {
      for (const layout of meta.layouts) {
        if (typeof layout.layout_id !== "string" || !layout.layout_id) {
          errors.push(`${slug}: every layout must include layout_id`);
        }
        if (!Array.isArray(layout.signals) || !layout.signals.length) {
          errors.push(`${slug}: layout ${layout.layout_id || "<missing>"} must include signals`);
        }
        if (!Array.isArray(layout.required_slots) || !layout.required_slots.length) {
          errors.push(`${slug}: layout ${layout.layout_id || "<missing>"} must include required_slots`);
        }
      }
    }
    if (existsSync(htmlPath) && Number.isInteger(meta.slide_count)) {
      const html = readFileSync(htmlPath, "utf8");
      const sectionCount = (html.match(/<section class="slide/g) || []).length;
      const layoutIdCount = (html.match(/data-layout-id=/g) || []).length;
      if (sectionCount !== meta.slide_count) errors.push(`${slug}: slide_count ${meta.slide_count} does not match ${sectionCount} HTML slides`);
      if (layoutIdCount !== meta.slide_count) errors.push(`${slug}: every slide must include data-layout-id`);
      if (Array.isArray(meta.layouts) && meta.layouts.length !== meta.slide_count) {
        errors.push(`${slug}: layouts length ${meta.layouts.length} does not match slide_count ${meta.slide_count}`);
      }

      const sections = [...html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)]
        .filter((match) => /\bclass=["'][^"']*\bslide\b/i.test(match[1]));
      const physicalIds = sections.map((match) => (match[1].match(/\bid=["']([^"']+)["']/i) || [])[1]).filter(Boolean);
      const agendaTargets = [...html.matchAll(/class=["'][^"']*\bagenda-item\b[^"']*["'][^>]*\bdata-target=["']([^"']+)["']/gi)].map((match) => match[1]);
      const expectedAgendaOrder = physicalIds.filter((id) => agendaTargets.includes(id));
      if (agendaTargets.some((target) => !physicalIds.includes(target))) errors.push(`${slug}: agenda contains a target that does not match a slide id`);
      if (agendaTargets.join("|") !== expectedAgendaOrder.join("|")) errors.push(`${slug}: agenda target order does not match physical slide order`);

      sections.forEach((section, index) => {
        const pages = [...section[2].matchAll(/\b(\d{2})\s*\/\s*(\d{2})\b/g)];
        const page = pages.at(-1);
        if (!page || Number(page[1]) !== index + 1 || Number(page[2]) !== meta.slide_count) {
          errors.push(`${slug}: slide ${index + 1} footer must be ${String(index + 1).padStart(2, "0")} / ${String(meta.slide_count).padStart(2, "0")}`);
        }
      });

      const layoutDir = join(dir, "layouts");
      const fragmentIds = existsSync(layoutDir)
        ? readdirSync(layoutDir).filter((name) => name.endsWith(".html")).map((name) => name.slice(0, -5)).sort()
        : [];
      const metadataIds = Array.isArray(meta.layouts) ? meta.layouts.map((layout) => layout.layout_id).sort() : [];
      if (fragmentIds.join("|") !== metadataIds.join("|")) errors.push(`${slug}: layout fragment files do not match template.json layouts`);
      for (const layoutId of fragmentIds) {
        const fragment = readFileSync(join(layoutDir, `${layoutId}.html`), "utf8");
        if (!fragment.includes(`data-layout-id="${layoutId}"`)) errors.push(`${slug}: ${layoutId}.html does not declare its matching data-layout-id`);
      }
    }
  } catch (error) {
    errors.push(`${slug}: invalid JSON - ${error.message}`);
  }
}

if (errors.length) {
  console.error("Template validation failed:");
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log(`Validated ${slugs.length} templates and 1 reference asset.`);
