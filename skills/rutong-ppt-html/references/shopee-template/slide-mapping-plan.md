# Planning and the User Confirmation Gate

Use this reference in Stage 1 (Plan) of the workflow. Planning has two artifacts with different audiences:

1. **Proposal plan** — shown to the user in chat. Light, readable, focused on the logic line. The user must approve it before any HTML is written.
2. **Build plan** — your internal working notes. Detailed, never shown unless asked.

Do not show the build plan's full field table to the user; nobody reviews a 9-column table in chat. Do not skip the proposal because you feel confident; the whole point is catching a wrong logic line before it costs a full generation.

## Business Intake (before planning)

Ask at most 3-5 questions, and only for answers that are missing AND would change the output:

1. What is the core conclusion the audience should remember?
2. Who is the audience, and what decision, alignment, or feedback do they need to give?
3. Which narrative flow: problem -> solution -> proof -> next step; conclusion -> evidence -> risk -> action; or another?
4. What does each screenshot / chart / table represent, and in what order should they appear?
5. What must NOT appear (asks, CTAs, sensitive details, unfinished metrics)?

If the brief already answers these, do not ask again — assume, record the assumption, and move on. Combine intake questions and the proposal plan into ONE message when possible, so the user replies once.

**Escalate to grill mode** (`references/shopee-template/consulting-storyline.md`) when the core content itself is unresolved — the user cannot state the conclusion, the material supports contradictory theses, or the deck is high-stakes (department-head+ audience, decision or resource ask). In grill mode ask one question at a time, always attaching your recommended answer, until the storyline spine (核心问题 / 核心判断 / storyline / page claims) is locked; then return here for the proposal plan. Offer grill mode; do not impose it on routine updates.

## The Proposal Plan (user-facing — REQUIRED before generation)

Post this in chat, in the user's language, then STOP and wait for a reply. Format:

```
准备生成的规划(请确认或指出要改的地方):

核心问题:<the one business question this deck answers>
核心判断:<the falsifiable answer / working thesis — may carry a confidence qualifier>
叙事线:<storyline pattern, e.g. 结论先行 / SCQA / 诊断线 / 决策线 / 验证线,及页面递进逻辑>
受众与用途:<who reads it, what decision/action they should take after>

页面规划(共 N 页):
1. 封面 — <topic / period / team>
2. <页标题 = page claim(完整判断句)> — <承载论证的 proof object:漏斗/瀑布拆解/路径图/能力栈/风险桥/表格…>
3. ...

证据边界:<the 1-2 claims where evidence is thin or pending — flagged, not hidden>
不包含:<exclusions>
假设:<assumptions made where the brief was silent — only ones the user should know about>
```

Read the page-claim, proof-object, and claim-evidence rules in `references/shopee-template/consulting-storyline.md` before writing this proposal for any judgment-carrying deck. For a pure data-tracking page, 核心问题/核心判断 may collapse into one 核心结论 line and 证据边界 may be omitted.

Rules for the proposal:
- Every content page line is a business answer, not a topic label ("首单激活在涨但 ADO 集中在头部市场", not "数据概览").
- Name the visual form in plain words ("左侧机制链 + 右侧市场表格"), not internal layout_ids.
- Keep it scannable: one line per page, no nested tables.
- End with an explicit question: 有没有要调整的?确认后我开始生成。

**Hard gate: do not write any deck HTML until the user replies with approval or edits.** If the user replies with changes, revise the proposal (you may proceed directly if the changes are small and unambiguous — restate them in one line as you start). If the user says "随便/你定", that counts as approval.

The only exception: the user explicitly asked to skip confirmation ("直接生成,不用问我"). Then post the proposal for the record and continue without waiting.

## The Build Plan (internal)

After approval, expand the proposal into working notes. Per slide, decide:

| Field | Purpose |
| --- | --- |
| `slide_no` | Final order |
| `source_ref` | Brief bullet / pasted table / screenshot / inferred |
| `business_answer` | Headline-level answer the slide proves — the page claim, one complete judgment sentence |
| `proof_object` | The one visual structure carrying the argument (element id from the visual element library, table, or `none` for pure narrative pages) |
| `claim_evidence_map` | For judgment pages: what the evidence proves / does NOT prove / visual guardrails, per `consulting-storyline.md`. Required for the highest-stakes 2-3 pages; optional elsewhere |
| `body_composition` | The free-zone plan: which elements (from the visual element library or custom), arranged how, roughly what column ratio |
| `style_refs` | Optional retained PPTX slide numbers or shared pattern ids that guide the composition; never source business content |
| `layout_ref` | Closest reference layout fragment if one fits, or `custom` |
| `evidence` | Data/proof that fills it; mark approximate values |
| `split_decision` | For dense tables, per `large_table_split_policy` |
| `assumptions_risks` | Anything shaky |

Also keep an asset role inventory when screenshots/charts are provided: for each asset note its role (overview / input / output / evidence / appendix), display order, and crop focus. Place assets by business narrative order, not upload order.

## Business Logic Rules

- Start from the audience and decision need, then choose pages. Never preserve source page order or page count by default; business intent outranks page numbers.
- For source PPT/screenshots, build an evidence inventory first (titles, key numbers, deltas, owners, statuses), infer the author's logic chain, then keep only what strengthens the story. Merge repeats; drop weak pages; push detail to appendix.
- Preserve exact numbers only when readable in the source; otherwise mark approximate and flag as a risk.
- Make the action implication explicit where the audience must act: decision, owner, watch point, support ask, or next step. Do not add ask/CTA/next-step panels the user didn't request.
- For one-page outputs additionally confirm: left and right areas have distinct jobs (narrative vs proof); the title is a business conclusion, not a tool name; screenshots follow narrative order.
