# Template Strategy

The library intentionally ships with one high-quality internal HTML report template rather than many narrow templates.

## Shopee Internal Report

Use for internal company-standard reporting: weekly/monthly/quarterly reviews, OKR readouts, strategy updates, operations projects, and decision memos.

Design posture:

- Official and structured.
- Dense data is acceptable and often expected.
- Use the no-text Shopee mark, orange section labels, black business-answer titles, and compact footers.
- Prioritize decisions, risks, owners, status, timelines, metric definitions, and appendices.

Required layouts:

- Internal cover (`internal.cover`).
- Agenda (`internal.agenda`).
- Executive summary (`internal.executive-summary`).
- Trend analysis (`internal.trend-analysis`).
- Data highlights (`internal.data-highlights`).
- Dense market / metric matrix (`internal.dense-matrix`).
- Multi-table benchmark (`internal.multi-table-benchmark`).
- Phase improvement plan (`internal.phase-improvement-plan`).
- Decision proposal (`internal.context-split`).
- Ending / contact (`internal.ending`).

## Pre-Generation Planning

Before choosing layouts or editing HTML, create a slide-mapping-plan using `references/shopee-template/slide-mapping-plan.md`.

The plan is mandatory because this library is meant to generate usable Shopee reports from natural-language business briefs, not only transform existing PPT pages. The input may be a user prompt, rough bullets, pasted tables, screenshots, uploaded slides, or a mix of all of them.

For one-page PPT/HTML, project updates, and screenshot-heavy pages, run the business-intake gate before planning. Ask at most 3-5 questions only when they affect the output: core conclusion, audience action, narrative structure, asset roles/order, and exclusions.

Choose the input mode first:

- `brief_first`: Generate the report structure from a natural-language business goal, rough bullets, or partial data.
- `source_synthesis`: Extract evidence and logic from PPT, screenshots, tables, notes, or existing source material before building the report structure.

The plan must identify:

- Input mode.
- Selected template.
- Mini story plan: business answer, narrative structure, visual order, and do-not-include list.
- Asset role inventory for screenshots, charts, tables, and uploaded pages.
- Source reference.
- Business intent.
- Business-answer headline or hypothesis.
- Selected `layout_id`.
- Evidence needed or available.
- Split decision.
- Assumptions.
- Risks or follow-ups.

Use the plan as the contract for building the deck. If a user's brief lacks details, make conservative assumptions and record them rather than inventing unsupported metrics or silently skipping slides.

Do not use a layout to compensate for an unclear story. First clarify or infer the business answer and asset roles, then choose the layout.

## Layout Matching

When a user provides a natural-language brief, PPT, Markdown, notes, pasted data, or screenshots, do not map source pages to template pages by page number. Instead:

- Classify each source block by intent.
- Match the intent to `template.json.layouts[].signals`.
- Read `use_when`, `avoid_when`, `source_content_shape`, and `mapping_rules` before filling a layout.
- Use `required_slots` to confirm the layout can hold the content.
- Prefer `shopee-internal-report` for dense data and decisions.
- If confidence is low, select the safer layout and record the assumption in the slide-mapping-plan.

For internal large-scale data:

- Use `internal.dense-matrix` when the table is the main evidence and includes month, market, forecast, capacity, quota, SKU, ADO, or status fields.
- Use `internal.multi-table-benchmark` when the page needs two related tables, usually a topline status view plus benchmark / ranking evidence.
- Use `internal.phase-improvement-plan` when a breakdown table needs to connect directly to owners, actions, target improvements, or phase-level fixes.
- Split oversized tables instead of shrinking below legibility. The dense-matrix HTML has auto-fit classes for common wide/tall tables, but it is not a license to make unreadable slides.
- Treat `large_table_split_policy` in `template.json` as a hard rule: split when columns > 16, rows > 18, density >= 190, or table text would fall below 8px.
- Prefer semantic splits: metric family / business section, market group, quarter or month range, topline vs backup detail, then appendix detail.
- Every split page needs its own business-answer headline or finding summary, not just a continued raw table.

## Visual Element Strategy

The internal report template uses one approved visual element library: `references/shopee-template/visual-element-library.md`.

Use it after choosing the layout:

- Pick one primary analytical element per content slide when it clarifies hierarchy, process, risk, transformation, root cause, status, or benchmark logic.
- Use `assets/shopee-template/shared/shopee-analysis-elements.css` as a starting point when implementing pyramid, chevron, metric card, risk stack, before/after bridge, or quadrant elements in HTML.
- Keep every element subordinate to the business-answer headline. If the visual does not help prove the headline, do not add it.
- Preserve the internal report design system even when the source PPT has useful shapes. Extract the pattern, then restyle it with Shopee tokens.
- Use the approved semantic colors: Shopee Orange for brand/action, navy for foundation, red for critical risk, yellow for watch, blue for system/product, and green/cyan for healthy or improvement.

## Manual Editing

Every template must support browser-based manual editing:

- Require a pre-generation slide-mapping-plan so layout choices can be traced back to business intent.
- Use `contenteditable="true"` on editable text, table cells, list items, captions, and labels.
- Preserve `data-slot` where useful so agents can replace content deterministically.
- Do not make an entire slide contenteditable; it makes layout breakage too easy.
- Keep `deck-stage.js` export and local autosave behavior.
- For dense data pages, keep table headers, table cells, status cells, side notes, and black-frame notes editable.

## Quality Bar

Each template should include:

- Exactly enough slides to demonstrate the complete visual system.
- A `template.json` with matching metadata, `layouts`, `manual_editing`, and `design_system`.
- Local keyboard navigation and edit/export runtime.
- Screenshot QA for at least cover, middle pages, and closing.
- No dependency on private raw source decks.
