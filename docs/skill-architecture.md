# Skill Architecture

## Recommended Shape

Use one entry skill plus four focused execution skills.

| Skill | Purpose |
|---|---|
| `rutong-working-style` | Entry point, clarification, local-first workflow, quality gates, repeated corrections |
| `rutong-ai-pmo` | AI PMO, AI Eco, user adoption, delivery planning, executive reporting |
| `rutong-ppt-html` | PPT and HTML deck production, layout, visual QA, source sync |
| `rutong-script` | Speaker notes, training scripts, facilitation, audience adaptation |
| `rutong-bi-sql` | SQL, Diana, BI analysis, LFF Ops, CNLS, metric diagnosis |

## Why Not One Large Skill

One large skill would mix:

- collaboration style,
- AI PMO domain context,
- deck rendering rules,
- script voice,
- SQL debugging rules.

That would make the skill long and unstable. A small entry skill should route to focused skills.

## What To Borrow From Qu Yue PPTX Skill

- Lean `SKILL.md` with strong trigger description.
- `Read First` references for design systems and playbooks.
- Modes for different task types.
- Concrete page archetypes and quality gates.
- Output contract and final QA checklist.
- Assets and scripts only when deterministic output is needed.

## What To Borrow From Neat-Freak

- Periodic repo hygiene checks.
- Docs are durable knowledge; skills are behavior.
- Avoid endless append-only notes.
- Promote repeated corrections into rules.
- Mark blocked private resources rather than pretending they were read.

## Installation Note

These skills are currently drafted inside this repo. To make Codex auto-discover them globally later, copy or install the selected skill folders into `~/.codex/skills/` after Rutong confirms.

