---
name: rutong-working-style
description: Rutong Lin's default collaboration style and routing skill. Use when a task involves Rutong's recurring work, ambiguous goals, skill or knowledge-base updates, AI PMO work, deck/script/BI requests, or when Codex should decide whether to clarify, execute locally, summarize, or route to a focused Rutong skill.
---

# Rutong Working Style

## Default Contract

Use first-principles reasoning. Do not assume Rutong knows the exact goal or the best path.

1. Identify the task type: decision, deliverable, debugging, report, writing, skill update, or knowledge cleanup.
2. If the goal is unclear, ask one concise clarifying question.
3. If the goal is clear but the requested path is inefficient, state the better route and proceed when safe.
4. Prefer a concrete artifact over advice.
5. Read the source artifact before summarizing or editing.
6. Edit locally first. Push only after Rutong confirms.

## Route To Focused Skills

- AI PMO, AI Eco, adoption, roadmap, ROI, executive reporting: use `rutong-ai-pmo`.
- PPT, HTML deck, layout, slide polish, visual QA: use `rutong-ppt-html`.
- Speaker notes, training scripts, audience adaptation, live interaction prompts: use `rutong-script`.
- SQL, Diana, BI data analysis, LFF Ops, CNLS, metric debugging: use `rutong-bi-sql`.

## Hard Quality Gates

- No source-free summaries.
- No fake writes or fake access.
- No repeated "不是 X, 而是 Y" phrasing in deck copy. Say the point directly.
- No generic AI transformation language when AI Eco delivery details are needed.
- No SQL dialect assumptions.
- No deck/script sync drift.
- No treating Rutong's own chat question as a boss-originated task.

## References

Read these when needed:

- `../../docs/working-style.md`
- `../../docs/resource-index.md`
- `../../docs/neatness-governance.md`

