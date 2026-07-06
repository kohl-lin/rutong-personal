# Neatness Governance

Adapted from the `neat-freak` skill, but simplified for Rutong's personal AI PMO knowledge repo.

## Verdict On Neat-Freak

Neat-freak is useful for Rutong, but not as a direct install-and-run rule set.

Useful parts:

- Separate durable docs from agent memory and skills.
- Keep docs authoritative and skills concise.
- Run regular cleanup instead of appending forever.
- Check stale links, duplicated resources, dead references, and oversized files.
- Treat repo structure as part of the working system, not decoration.

Parts to simplify:

- It is optimized for software projects with `CLAUDE.md`, code routes, APIs, and deployment docs.
- Rutong's repo is a personal PMO and AI delivery knowledge base, so the scan should focus on resources, decks, sheets, skills, and workstream state.
- Do not over-audit every file on every session. Use lightweight periodic checks.

## Local-First Rule

All content changes should happen locally first:

1. Edit local files in the repo.
2. Show summary or relevant diff to Rutong.
3. Push only after confirmation.

## Hygiene Scan

Run periodically or when Rutong says `整理一下`, `neat`, `sync`, `沉淀一下`, `更新知识库`, or `检查github是否neat`.

Check:

- `docs/resource-index.md`: links still present, new links added, dead or blocked links marked.
- `docs/work-diary-index.md`: current WIP still current, completed items moved or summarized.
- `skills/`: SKILL.md files are concise and route to references instead of becoming long docs.
- `docs/`: no duplicate explanation of the same AI Eco definition across many files.
- Git status: local changes are intentional and grouped.
- Repo root: no random scratch files, exports, or large binary files unless intentionally placed.

## Size Rules

- Keep each `SKILL.md` under 250 lines if possible.
- Put detailed examples in `references/`.
- Put resource links in `docs/resource-index.md`.
- Put stable business definitions in `docs/ai-eco-context.md`.
- Put temporary scratch or raw extraction outside the repo, unless it is intentionally curated.

## Graduation Rule

If the same correction appears three times, promote it into:

- `docs/working-style.md` if it is a collaboration preference.
- A specific `skills/*/SKILL.md` if it should change agent behavior.
- A `skills/*/references/*.md` file if it is detailed domain or artifact knowledge.

