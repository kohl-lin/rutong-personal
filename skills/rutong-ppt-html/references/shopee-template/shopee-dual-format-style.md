# Shopee Dual-Format Style System

Use this guide for both HTML and PowerPoint outputs. It describes a reusable visual language, not a slide template to copy.

## Shared Visual Source

Read `references/shopee-template/internal-visual-assets.md` and use the retained 55-slide Shopee deck as the common pattern source for both formats. Select source-slide anchors by information shape, then translate them natively. HTML and PPTX should share tokens, hierarchy, evidence treatment, and pattern vocabulary without sharing implementation code or converting files between formats.

## Visual Grammar

- Use a white or very light-gray canvas. Reserve Shopee Orange (`#EE4D2D`) for section identity, titles, rules, decisive actions, and selected evidence.
- Start non-cover pages with a small no-text Shopee mark, a concise orange kicker, a black business-answer headline, and a thin orange divider. Keep the header compact so data has room.
- Make dense evidence easy to scan: dark or orange table headers, light gridlines, grouped rows, and muted footnotes. Use red only for a material miss or risk; green for confirmed health or achievement; yellow for watchouts.
- Prefer a flat analytical composition over decorative cards. Red outlines, arrows, and numbered markers must identify specific evidence rather than decorate the page.
- Keep title, source, page number, and date in consistent positions. Use direct, management-facing claims rather than topic-only titles.

## Operating Page Types

| Page type | Use when | Primary evidence |
|---|---|---|
| Executive summary | Leadership needs the conclusion first | KPI table plus 3-5 evidence-backed messages |
| Project discussion tracker | Multiple teams own ongoing initiatives | Function, workstream, owner, status, next step |
| Evidence deep dive | A metric or initiative needs diagnosis | Annotated table/chart plus root cause and action |
| Operating plan | The audience needs execution alignment | Objective, mechanism, owner, milestone, dependency |
| Risk / follow-up | Risks require closure | Risk, impact, mitigation, PIC, deadline, status |
| Appendix | Detail supports the main story | Raw cuts, metric definitions, and source notes |

## Format-Specific Translation

| Intent | HTML | PowerPoint |
|---|---|---|
| Text revision | Leaf `contenteditable` slots | Native text boxes, tables, and notes |
| Review | Browser review annotations | Comments or speaker notes |
| Delivery | Folder package plus optional single HTML | Editable `.pptx` |
| Visual QA | Screenshot every slide canvas | Render every slide canvas |
| Retained PPTX pattern | Translate hierarchy into HTML/CSS and editable DOM elements | Recompose with native editable PowerPoint elements |

Never convert one output into the other as the default workflow. Recreate the approved story with native elements in the requested format.
