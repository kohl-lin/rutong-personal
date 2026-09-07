# HTML Workflow Reference

This reference belongs to the Shopee template mode inside `rutong-ppt-html`. Use it only after the user approves the proposal plan and the parent skill selects HTML.

Turn business input into a manually editable, Shopee-branded HTML report. The library ships one template: `shopee-internal-report`.

The core architecture is **fixed shell + shared pattern library + free body**:

- **Shell (hard constraints, never negotiable):** 1280x720 canvas, the standard Shopee content header on every content slide, footer conventions, font stack, color tokens, and the typography scale. Defined in `references/shopee-template/shopee-slide-design-system.md` and enforced by `scripts/shopee-template/lint-deck.mjs`.
- **Shared pattern library:** the retained PPTX catalog in `references/shopee-template/internal-visual-assets.md` plus the approved HTML fragments. Use it to choose information hierarchy and evidence treatment across formats.
- **Body (free zone):** everything between header and footer is composed by you to fit the content. `references/shopee-template/visual-element-library.md` is your vocabulary. The 10 shipped layout fragments in `assets/shopee-template/templates/shopee-internal-report/layouts/` are proven examples to reuse when they fit — they are NOT a menu you must pick from. When no fragment fits, design the body freely inside the design system.

## Generate

Read now: `references/shopee-template/shopee-slide-design-system.md`, `references/shopee-template/visual-element-library.md`, and `references/shopee-template/shopee-dual-format-style.md`. Read `references/shopee-template/shopee-brand.md` before using logos or brand assets. Read `references/shopee-template/source-deck-patterns.md` only when synthesizing from Shopee source decks.

1. Start from `assets/shopee-template/templates/shopee-internal-report/shell.html` (deck chrome, CSS, runtime included; insert slides at the `<!-- SLIDES -->` marker). Create a self-contained output folder for the deck, for example `outputs/<deck-slug>/`, and write the final HTML as `index.html` inside that folder. Copy `assets/shopee-template/templates/shopee-internal-report/deck-stage.js` verbatim to `outputs/<deck-slug>/deck-stage.js`, copy `assets/shopee-template/templates/shopee-internal-report/review-annotations.js` to `outputs/<deck-slug>/review-annotations.js`, copy the Shopee logomark to `outputs/<deck-slug>/assets/brand/logos/shopee-logomark-no-text-square.png`, and place any deck-specific images or screenshots under `outputs/<deck-slug>/assets/`. After writing or updating the HTML, run `node scripts/shopee-template/package-deck.mjs outputs/<deck-slug>/index.html --single-file` to refresh the folder package and also create `outputs/<deck-slug>/index.single.html`. The folder package rewrites generated HTML references to `./assets/brand/logos/shopee-logomark-no-text-square.png`, `<script src="./deck-stage.js"></script>`, and `<script src="./review-annotations.js"></script>`; the single-file package inlines both runtimes and the Shopee mark so it can be sent as one HTML file. Never deliver or review a standalone `index.html` whose runtime files or brand assets live outside the output folder. Alternatively copy the full template folder and replace slides only while drafting — before review, package the final deck into the same self-contained output-folder structure.
2. For each planned slide, compose the body:
   - If a layout fragment in `assets/shopee-template/templates/shopee-internal-report/layouts/` matches the content shape, copy it and replace its content.
   - If no fragment fits, inspect the planned `style_refs` from the retained PPTX, then translate the useful hierarchy with design-system components and visual-element-library elements (`assets/shopee-template/shared/shopee-analysis-elements.css` classes). Do not embed a source-slide screenshot or imitate irrelevant source content. Pick at most one primary analytical element per slide; add a shape only when it carries logic.
   - Enforce one slide, one claim: the headline states the page claim; kicker/subtitle, panel headers, numbers, examples, takeaway, and source note each do a distinct job and never restate or compete with the claim (layer table in `references/shopee-template/consulting-storyline.md`). Large numbers attach to the proof object, never float as detached KPI blocks. Connector lines, arrows, checkmarks, gates, and green fills are claims — keep observed signals from visually certifying pending validations.
   - Every content slide keeps the standard Shopee content header and footer. `data-layout-id` may be a fragment id or a descriptive custom id; `data-sequence` must be continuous.
   - Add an internal `data-style-ref="ref-pptx:slide-XX"` attribute when a retained slide materially guided the composition; it is traceability metadata, not visible copy.
3. Size the body to the actual content volume. Choose column ratios from content weight (narrative vs proof), not a default 50/50. Anticipate the balance problems listed in `references/shopee-template/visual-review.md` while composing, not only when reviewing.
4. Apply `large_table_split_policy` from `template.json` BEFORE filling any dense table: estimate rows x columns; if columns > 16, rows > 18, density >= 190, or text would fall below 8px, split across slides by business section / metric family / market group / period / appendix, repeating header and source notes on each part with a `Part 1/2` label.
5. Apply the data-formatting rules below before styling tables, deltas, and insight callouts.
6. Use color tokens semantically (orange = Shopee/action, navy = foundation, red = critical risk, yellow = watch, blue = system/product, green/cyan = healthy/improved). No one-off colors.
7. Keep `contenteditable="true"` on user-facing text, table cells, list items, labels, and captions — never on whole slides. Preserve meaningful `data-slot` names. Replace ALL placeholder text, numbers, dates, and images.
8. Inside a `contenteditable` element, use only inline rich-text markup: plain text plus `b/strong/i/em/u/s/sub/sup/br/span/font` carrying at most color / font-size / font-weight / font-style / text-decoration / background-color inline styles. The runtime persists drafts through a whitelist serializer, so any structural tag (div, img, table…) nested inside an editable would be stripped on save/reload — put structure outside the editable and mark only the leaf text editable.
9. Use the bundled source assets under `assets/shopee-template/brand/`. Any asset used by the final HTML must be copied into the output folder and referenced with a `./assets/...` relative path, so the whole folder can be sent to another user without broken images.

## Data Formatting Rules

- Color direction by business meaning, not by numeric sign alone: green means better / achieved / on target; red means worse / missed target / risk. For example, sales or order volume up is green, while cost, NFR, LSR, defect rate, or failure rate up is red.
- Time-period columns should put the nearest period on the left and older periods to the right, for example `W-1`, `W-2`, `W-3`, ... unless the user explicitly asks for chronological left-to-right.
- Preserve the source table's market order unless the user or supplied template specifies another sequence. The common Shopee order `SG, MY, TH, TW, ID, VN, PH, BR, MX, CO, CL` is an available convention, not an automatic override.
- For one-page reports, use a lightweight neutral Summary / Key Message box near the top before dense evidence when the slide needs a quick executive readout. If the Summary is placed at the top, it must be one full-width horizontal box spanning the whole slide content area above the body columns; do not split it into left/right summary blocks. Avoid heavy orange borders, oversized labels, or overly dominant summary blocks unless the user explicitly wants an alert-style page.
- The browser editing toolbar generated by `deck-stage.js` (`Prev`, `Next`, `Editable`, `Layout`, rotate controls, token color swatches, `Save`, `Export HTML`, `Reset edits`, `Reset layout`) and the review toolbar generated by `review-annotations.js` must appear below the PPT canvas. Never place them at the top of the slide or over the header/Summary; reserve bottom space or scale the stage so toolbars sit visually under the deck.
- Use `data-layout-editable` for annotation objects that users may need to manually adjust after generation: evidence outlines, numbered badges, arrows/connector labels, callout labels, and lightweight image-crop markers. Keep the standard header, footer, body columns, tables, and major page structure fixed unless the user explicitly asks for freeform layout editing. For resizable outlines set a stable `data-layout-id` plus sensible `data-layout-min-width` / `data-layout-min-height`; for badges and text labels set `data-layout-resize="false"`.
- Link data-backed insights back to the evidence: if the whole column supports the insight, mark that column once; if specific outlier cells in a column support it, place a positioned numbered badge on those highlighted cells; if two or more columns or a continuous region support it, use one numbered outline around the whole evidence region. Avoid repeating markers where they do not identify evidence. Keep annotation badges outside editable text nodes so browser autosave does not turn values into strings like `15.78%2`.
- Remove duplicated lead text when the Summary already states the takeaway; insight cards should add evidence or implication, not restate the same headline.

## Runtime Freeze (hard rule)

`assets/shopee-template/templates/shopee-internal-report/deck-stage.js` is the single frozen runtime for every deck. It ships navigation, autosave, export, save-to-file (File System Access API), the Layout Mode annotation editor (drag / corner-resize / rotate / token-palette recolor for `data-layout-editable` elements), and the floating text-style toolbar (bold, font-size steps within the design scale, token text colors).

- NEVER rewrite, regenerate, inline, or "improve" this file when building a deck. Copy it verbatim next to the deck HTML and reference it with `<script src="./deck-stage.js"></script>`.
- `assets/shopee-template/templates/shopee-internal-report/deck-stage.js` is the canonical bundled runtime. `scripts/shopee-template/validate-template.mjs` verifies that the template bundle contains the required runtime files.
- Editing behavior is driven by markup contracts, not custom JS: `contenteditable="true"` for text; `data-layout-editable` (+ optional `data-layout-id`, `data-layout-resize="false"`, `data-layout-rotatable`, `data-layout-min-width/height`, `data-layout-color-target`) for annotations, per the Data Formatting Rules above. If a deck needs different editing behavior, change the markup, never the runtime.

## Review

Read now: `references/shopee-template/visual-review.md`, and follow its loop exactly:

1. `node scripts/shopee-template/lint-deck.mjs <deck.html>` — fix every ERROR. This includes self-contained delivery checks: the deck must reference `./deck-stage.js` and `./review-annotations.js`, both files must exist next to the HTML, and Shopee logo references must point to local `./assets/...` files that also exist in the output folder.
2. `node scripts/shopee-template/screenshot-deck.mjs <deck.html> <out-dir>` — one clipped 1280x720 PNG per slide canvas; the toolbar and page body outside the canvas must not appear in screenshots.
3. View every PNG against the checklist (balance/whitespace, containment, hierarchy, brand). The screenshot is ground truth; do not reason from the HTML you wrote.
4. Fix failures, re-shoot changed slides, repeat until clean. If a slide needs a third pass, restructure it instead of nudging pixels.

## Output Contract

1. Before final delivery, offer the delivery-mode choice in plain language unless the user already specified it: Folder package = best for continued editing/debugging; share the whole folder. Single HTML = best for sending to reviewers; one portable file, but larger. Both = recommended default; keep the folder as working copy and send the single HTML as share copy. If the user does not choose, generate and present both.
2. Open or present the final HTML and give absolute paths for the folder package `index.html`, the containing output folder, and the single-file share copy `index.single.html` when generated.
3. One sentence on the structure chosen and why it fits the audience.
4. Mention anything you fixed during visual review, and caveats only if they affect usage (e.g., missing official assets, approximate numbers).
5. Remind the user the file is click-to-edit in the browser: text edits inline (with a floating bold / size / color toolbar on selection), the toolbar's Layout button unlocks drag / resize / rotate / recolor for annotation elements, and Save writes changes back to the local file in Chrome/Edge (Export HTML elsewhere). Also mention Review mode: reviewers can click `Review`, drag a box around a region, write a comment, then use `Export comments` to download/copy a JSON file that Codex can use to address feedback.

## Maintenance

This integration retains delivery and QA tooling. Upstream plugin publishing, template scaffolding, layout extraction, and index-building tools are intentionally excluded. Template conventions live in `references/shopee-template/template-strategy.md` and the `design_system` block of `template.json`.
