# Consulting Storyline and Message-Proof Logic

Use this reference in Stage 1 (Plan), together with `slide-mapping-plan.md`, whenever the deck must argue a judgment rather than just report numbers — business reviews, diagnostics, strategy readouts, opportunity assessments, decision proposals, and any deck the user calls "汇报给领导 / 管理层". Skip only for pure data-tracking pages where the table itself is the deliverable.

The principle imported here: **storyline before design**. Do not choose layouts, elements, or colors until the argument is locked. A polished page proving the wrong claim is a full-generation waste.

## The Storyline Spine (lock before any page planning)

Every consulting-grade deck answers four things, in order:

1. **核心问题 (Core question)** — the one business question the deck exists to answer. One sentence, phrased as a question the audience actually holds. "IBT 异常率为什么连续三周恶化,值得投入专项吗?" not "IBT 分析".
2. **核心判断 (Working thesis)** — the current best answer, stated as a falsifiable judgment. It may carry a confidence qualifier ("初步判断…", "在 X 前提下…"). If the material cannot support a thesis yet, the deck's honest thesis is "证据指向 A,但 B 未验证" — say so rather than faking certainty.
3. **Storyline** — how pages escalate toward the thesis. Each page hands the reader one resolved question and raises the next. Test: read only the page headlines top to bottom; they must form a coherent argument a manager could repeat in the elevator.
4. **Page claims** — one complete judgment sentence per page (see One Slide, One Claim).

Common storyline patterns (pick one as the spine; mixing mid-deck confuses readers):

- **结论先行 (Pyramid / answer-first)**: thesis -> evidence pillars -> risks & boundaries -> action. Default for management readouts; leaders read page 2 and decide whether to keep reading.
- **SCQA**: situation -> complication -> question -> answer -> proof. Use when the audience does not yet agree the problem exists or matters.
- **诊断线 (Diagnostic)**: 现状与差距 -> 归因/机制 -> 干预方案 -> 预期效果与追踪. Default for Ops diagnostics and root-cause reviews.
- **决策线 (Decision memo)**: 背景与约束 -> 选项对比 -> 建议与依据 -> 风险与所需支持. Use when the deck must extract a decision, not just inform.
- **验证线 (Proven vs pending)**: 已观察到的信号 -> 机制假设 -> 尚待验证的条件 -> 验证计划. Use for opportunity/market judgments where honesty about evidence limits is the credibility.

## One Slide, One Claim

Every content page carries exactly one governing message. Everything else on the page proves it, explains it, qualifies it, or gets cut. If a page seems to need two governing messages, split the page or demote one claim to a supporting line.

Layer jobs in the Shopee shell (each layer has a distinct job; the failure mode is layers repeating or competing):

| Layer | Job | Failure mode |
|---|---|---|
| Headline (页标题) | States the page claim as a sharp business judgment | Topic label ("数据概览"); or a second claim elsewhere reads like another title |
| Kicker / subtitle | Says why the claim is true or scopes it, in one sentence | Restates the headline in softer words |
| Primary element (proof object) | Carries the evidence visually | Becomes decoration behind labels; or missing entirely (bullet stack) |
| Key numbers | Anchor the proof object | Float as detached KPI blocks stealing attention from the claim |
| Panel headers | Name evidence objects (证据锚点/关键判断/约束条件) | Restate the conclusion a third time |
| Examples / cases | Make the proof object tangible with enough text to carry the point | Bare name + one-word tag a reader cannot interpret |
| Insight / takeaway box | Synthesizes ONCE into an implication | Becomes a competing conclusion band; duplicated by Summary box |
| Source note / caveat | Sets the evidence boundary quietly | Styled as heavily as the takeaway |

Hard rules: one headline claim; one primary proof object; at most one takeaway band; source notes visibly low-weight; large numbers only when attached to the proof object (a percentage inside a funnel stage: yes; two giant numbers in a side rail while the proof object is elsewhere: no).

Deck-level takeaway policy: decide once — no bottom synthesis anywhere, light synthesis on every page, or synthesis only on named judgment pages. Do not ban all so-what lines because one page had a duplicate.

## Claim-Evidence Map (keep the slide honest)

Before designing any judgment page, write three layers in the build plan:

```
Page claim: <one sentence>
Evidence supports:
- <fact/metric/case> -> proves <which specific part of the claim>
Evidence does NOT prove:
- <fact> does not prove <the overreach a reader might take away>
Visual guardrails:
- do not connect <evidence> to <unsupported outcome>; no checkmark/green for unverified items
```

The "does not prove" layer is briefing discipline; it appears on the slide only as a caveat when the audience could overread.

**Proven vs pending split.** When a page mixes observed signals (shipments, adoption, price tests, launched features, current metrics) with future requirements (retention, compliance, renewal, unit economics, SLA sustainability), separate them visually. Observed activity must never visually certify pending validation — this is the most common way an attractive page lies.

**Visual semantics are claims.** In the HTML body: a connector line means "supports / feeds / belongs to"; an arrow means causation or sequence; a green fill or checkmark means verified; a gate means must-pass; a closed loop means a reinforcing mechanism. Draw none of these casually. Use neutral dots, locks, or yellow "watch" states for pending items. A 2x2 quadrant asserts that its two dimensions fairly compare every plotted item — if the items are different roles in one value system, use a `control-point-map` or `value-chain-map` instead of forcing the quadrant.

## Choosing the Proof Object

Every judgment page needs one visual structure that carries the argument — the proof object. Choose it from the evidence relationship, never from what looks impressive:

| Claim type | Proof object (see visual-element-library) | Avoid |
|---|---|---|
| Volume/quality decays through stages; where it leaks matters | `gated-funnel` | detached KPI cards per stage |
| A gap decomposes into drivers of known size | `waterfall-decomposition`, `driver-tree` | prose list of reasons |
| Value/margin/control is shifting along a chain | `value-chain-map` | logo grid |
| Players/routes diverge from one starting condition | `route-map` | forced 2x2 with mixed dimensions |
| Winning requires layered capabilities, some unproven | `capability-stack` | equal-weight feature cards |
| Reaching the target requires named validations first | `risk-bridge` | checkmarked roadmap implying completion |
| Positioning across price/value tiers | `value-ladder` | scatter without banding |
| Different players control different layers of a system | `control-point-map` | quadrant comparing unlike roles |
| Trigger-to-outcome mechanism | `chevron-chain` / logic-progression | decorative arrows between text blocks |
| Options against explicit criteria | decision matrix (`status-dot-table` variant) | pros/cons prose |

If no proof object fits, the page claim is probably not yet sharp enough — rewrite the claim before hunting for a chart.

## Grill Mode (deep intake, borrowed from grill-me)

The standard intake (3-5 batched questions, `slide-mapping-plan.md`) fits when material is rich and only gaps need filling. Switch to grill mode when the core content itself is unresolved: the user says "帮我想想怎么讲 / 我也不知道核心结论是什么", the material supports contradictory theses, or the deck is high-stakes (department-head+ audience, decision requests, resource asks).

Grill mode protocol:

1. Ask **one question at a time**, and with every question **offer your recommended answer with a one-line reason** ("我的建议是 X,因为…你确认还是调整?"). Recommendations keep the grill fast and give the user something to react to instead of a blank.
2. Walk the decision tree in dependency order: 核心问题 -> 受众与他们要做的决定 -> 核心判断 -> storyline pattern -> 有争议的页面 claims -> evidence boundaries (哪些数字/结论还站不住). Resolve upstream before downstream.
3. If a question can be answered from the user's own uploaded material or data, answer it yourself from the material and state the inference — do not bounce it back.
4. Stop when the spine (core question, thesis, storyline, page claims) is locked; usually 3-7 exchanges. Then produce the normal proposal plan for final confirmation. Grill mode replaces the batched intake, not the confirmation gate.

Never enter grill mode silently for a simple weekly update — it would feel like an interrogation. Offer it: "这份材料还能支撑好几种讲法,要不要我逐个问题跟你对一遍核心内容(每个问题我都会给推荐答案)?"

## Storyline Rewrite Pass (source_synthesis mode)

When distilling an existing PPT/notes, after the evidence inventory and before the proposal plan:

1. Reverse-engineer the author's implicit thesis and where the source pages fail it (repeated context, topic-label titles, evidence without claims, claims without evidence).
2. Restate the core question and thesis in your own words; flag if the source material cannot actually support its own headline conclusions.
3. Rewrite every kept page's title into a claim sentence; a page whose claim you cannot state gets merged, demoted to appendix, or dropped.
4. Run the claim-evidence map on the 2-3 highest-stakes pages; mark overreach as risks in the proposal.
