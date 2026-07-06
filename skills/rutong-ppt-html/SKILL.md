---
name: rutong-ppt-html
description: Build, revise, critique, or package PPT and HTML decks for Rutong Lin, including AI PMO, AI Eco, training, executive updates, layout previews, source sync, visual QA, and deck-specific quality gates.
---

# Rutong PPT HTML

## Purpose

Create or revise usable presentation surfaces: editable PPTX, HTML deck, or browser-openable slide preview. Do not treat this as a script-writing skill.

## Default Workflow

1. Inspect the existing deck or source material first.
2. Determine mode: new deck, deck polish, HTML package, single-slide layout preview, executive report, or sync fix.
3. Preserve content when Rutong says content should not change.
4. Choose page archetypes before building: workflow bridge, capability stack, value stream, matrix, roadmap, screenshot evidence, or hero statement.
5. Check deck consistency: TOC, page order, footer numbers, hidden slides, linked speaker notes.
6. Render or preview when possible.

## Rutong-Specific Rules

- Prefer direct answer-first titles.
- Avoid repeated "不是 X, 而是 Y" copy. Write the conclusion directly.
- Use strong but purposeful visual emphasis: highlight chips, yellow good/bad boxes, clear owner/status markers.
- Do not add visible prompt residue, implementation notes, or internal reasoning.
- If a slide should be hidden but recoverable, hide it at presentation layer instead of deleting it.
- If GitHub and local deck versions differ, confirm source of truth or follow the user's latest source-of-truth instruction.

## Output Contract

Return:

- changed file path or local preview path,
- concise change summary,
- verification performed,
- anything not verified.

## References

Read when relevant:

- `../../docs/working-style.md`
- `../../docs/resource-index.md`
- `../../docs/skill-architecture.md`

