# PPTX Workflow

Use this reference only after the user approves the proposal plan and the parent skill selects PPTX.

## Choose the Reference Mode

Read `references/shopee-template/internal-visual-assets.md` and use the retained 55-slide deck as explicit Shopee visual direction.

- Default to **style-library mode**: inspect the selected `style_refs`, then create original native layouts that reuse the shared tokens, hierarchy, and evidence patterns.
- Use **exact template mode** only when the user explicitly asks to reuse or closely follow retained pages. Then follow the `presentations` skill's template-following workflow, preserve the source master/layout hierarchy, and edit duplicated source slides in place.
- Never modify `assets/shopee-template/reference-decks/shopee-monthly-reference/reference.pptx`.

## Generate

1. Use the `presentations` skill and its required workspace tools to create a native editable `.pptx`; do not convert HTML or flatten slides into screenshots.
2. Build a 16:9 deck around the approved page claims and evidence map. Use original layouts or adapt the closest Shopee layout pattern when it fits the content.
3. Keep text, tables, charts, shapes, and images editable wherever practical. Use images only for genuine source visuals, screenshots, or illustrations.
4. Apply the shared Shopee header, typography, spacing, color semantics, and footer conventions from `shopee-slide-design-system.md`. Use `visual-element-library.md` as a logic vocabulary, not as decoration.
5. Split dense tables before text becomes unreadable. Give each continuation slide its own claim or finding, repeated headers, and a `Part x/y` label.
6. Put sources, links, qualifications, and useful presenter context in speaker notes. Do not hide evidence gaps in notes; show any caveat that materially changes the claim on the slide.

## Review

1. Run the structural checks required by the `presentations` skill.
2. Render every slide to an image.
3. Inspect every render against the cross-format items in `visual-review.md`, including containment, hierarchy, business meaning, brand consistency, and claim-evidence integrity. Skip HTML runtime, toolbar, `contenteditable`, and `data-layout-*` checks.
4. Fix all clipping, overlap, wrapping, unreadable tables, inconsistent headers/footers, weak contrast, and accidental empty space. Re-render changed slides.
5. Reopen or re-parse the final `.pptx` when supported to confirm the file is valid and editable.

## Deliver

Return the native `.pptx` path. Mention the slide count and any caveat that affects interpretation or later editing. Do not deliver render images unless the user asks for them.
