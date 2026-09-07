# Visual Element Library

Use this reference after the mini story plan and layout choice, before writing HTML. The goal is to make Shopee internal pages feel like reusable business reports, not one-off decorated slides.

The element library is inspired by Shopee internal samples and a reviewed 300+ page red/blue business template deck. That source deck was shape-heavy: rectangles, rounded rectangles, ellipses, triangles, arrows, chevrons, parallelograms, trapezoids, arcs, pies, charts, and tables appeared frequently. Treat those shapes as analytical grammar, not decoration.

## Color System

### Core Brand Colors

| Role | Token | Hex | Use |
|---|---|---|---|
| Shopee Orange | `--shopee-orange` | `#ee4d2d` | Brand accent, kicker, divider, key number, active state |
| Orange Soft | `--shopee-orange-soft` | `#fff1ec` | Insight background, light highlight, soft callout |
| Ink | `--shopee-ink` | `#202325` | Main headline, body, table text |
| Muted | `--shopee-muted` | `#757575` | Source note, caveat, footer, secondary label |
| Line | `--shopee-line` | `#eeeff2` | Card border, table grid, subtle separators |
| Surface | `--shopee-surface` | `#f9f9f9` | Table alternation, neutral panel fill |

### Analytical Accent Colors

Use these for business meaning. Do not use all of them on one slide unless the visual is explicitly categorical.

| Role | Token | Hex | Use |
|---|---|---|---|
| Foundation / base | `--shopee-navy` | `#113366` | Baseline layer, strategic pillar, denominator, stable base |
| Critical risk | `--shopee-red` | `#d0011b` | At Risk, blocked, urgent, high negative impact |
| Strong warning | `--shopee-red-bright` | `#e4380e` | Severe movement, alert band, standout comparison |
| Action / momentum | `--shopee-orange-hot` | `#f65800` | Mechanism, transition, intervention, campaign push |
| Caution / partial | `--shopee-yellow` | `#ffbb00` | Watch, pending, partial confidence, top cap layer |
| Product / system | `--shopee-blue-bright` | `#2794fb` | Diana2, product capability, technical system |
| Healthy / achieved | `--shopee-green` | `#4caf50` | Healthy, complete, target met |
| Efficiency / positive delta | `--shopee-cyan` | `#26aa99` | Improvement, uplift, process gain |

### Usage Rules

- Keep 60-70% of each internal report slide white or neutral. Shopee Orange and analytical accents should carry meaning, not fill the page.
- Use one dominant accent per slide, plus status colors only where the data needs them.
- Use navy for the base of pyramids, operating foundations, or stable strategic layers.
- Use red and orange for risk, pressure, intervention, or action intensity.
- Use yellow for watchouts, partial maturity, or a small top layer.
- Use bright blue for tools, systems, and Diana2-style product capability.
- Use green/cyan for healthy status, improvement, or achieved outcomes.

## Element Selection Rules

Select the element by evidence shape:

1. If the business answer is a hierarchy, composition, severity, or "what makes up the whole", use `segmented-pyramid` or `risk-severity-stack`.
2. If the business answer is a causal or operational sequence, use `chevron-chain`, `logic-progression`, or `timeline-phase-band`.
3. If the business answer is evidence-first, use `metric-card-row`, `status-dot-table`, `ranked-bar-list`, or `benchmark-quadrant`.
4. If the business answer is transformation, use `before-after-bridge`.
5. If the business answer is "why is this happening", use `driver-tree` or `root-cause-ladder`; if the drivers have known magnitudes, use `waterfall-decomposition`.
6. If the business answer is a consulting judgment (stage leakage, value shift, route divergence, capability gaps, pending validations, tier positioning, layered control), pick from the Consulting Structure Elements section below via the proof-object table in `references/shopee-template/consulting-storyline.md`.
7. If a shape does not add logic, do not add it. Dense Shopee pages should feel useful before they feel decorative.

## Reusable Elements

### `segmented-pyramid`

Use for: share composition, seller tiering, severity hierarchy, funnel volume mix, issue distribution, layered priorities.

Avoid for: chronology, process steps, or equal-weight categories.

Required slots: `segments[]` with `label`, `value`, `tone`, optional `caption`.

Color logic: bottom layer usually navy for the base or largest denominator; middle layers red/orange for pressure or action; top layer yellow for small cap, watchout, or highest maturity tier.

Layout notes: keep 3-5 segments. Center the pyramid or pair it with a short right-side explanation. Do not place long text inside the segments; use labels outside if needed.

HTML/CSS starting point: `assets/shopee-template/shared/shopee-analysis-elements.css` classes `.ae-pyramid` and `.ae-pyramid__seg`.

### `chevron-chain`

Use for: trigger -> diagnosis -> intervention -> outcome, operating mechanism, workflow, program logic, escalation path.

Avoid for: unordered categories or large paragraphs.

Required slots: 3-5 `steps[]` with `label`, `title`, `proof` or `output`.

Color logic: use a single orange/navy progression for standard logic; use red -> orange -> yellow -> green only when each step carries a status meaning.

Layout notes: best inside `internal.phase-improvement-plan` or a custom body guided by the retained visual asset library.

HTML/CSS starting point: `.ae-chevron-chain`, `.ae-chevron`, `.ae-chevron__label`, `.ae-chevron__title`.

### `risk-severity-stack`

Use for: top risks, issue triage, health overview, seller diagnostics, follow-up priority.

Avoid for: ranking without risk semantics.

Required slots: `risk_items[]` with `status`, `metric`, `current_value`, `why_it_matters`, `owner_or_action`.

Color logic: red = at risk, yellow = missed target/watch, green = healthy, blue = system/product note.

Layout notes: pair with a summary table or screenshot. Keep the action phrase visible in the rightmost column.

HTML/CSS starting point: `.ae-risk-stack`, `.ae-risk-item`, `.ae-risk-dot`.

### `metric-card-row`

Use for: 3-5 headline KPIs, capability coverage, before/after headline numbers, UAT status.

Avoid for: tables where row-level comparison matters.

Required slots: `metric_cards[]` with `value`, `label`, optional `delta`, optional `context`.

Color logic: one card can use orange for the hero number; other cards should use navy/blue/green/yellow only when semantically meaningful.

Layout notes: useful above a dense table or below a business-answer card.

HTML/CSS starting point: `.ae-metric-row`, `.ae-metric-card`, `.ae-metric-card__value`, `.ae-metric-card__label`.

### `before-after-bridge`

Use for: manual process -> automated output, old reporting -> reusable report, scattered questions -> standardized diagnosis.

Avoid for: non-transformational comparisons.

Required slots: `before`, `bridge_action`, `after`, optional `proof`.

Color logic: before panel neutral, bridge orange, after panel blue/green or white with orange accent.

Layout notes: best for one-page project updates and product capability slides.

HTML/CSS starting point: `.ae-before-after`, `.ae-before-after__panel`, `.ae-before-after__bridge`.

### `benchmark-quadrant`

Use for: priority matrix, impact x effort, risk x controllability, market maturity x opportunity.

Avoid for: one-dimensional rankings or time series.

Required slots: `x_axis`, `y_axis`, `quadrants[]`, and `items[]`.

Color logic: keep the grid mostly neutral; use orange for recommended zone, red for risk zone, green for healthy zone.

HTML/CSS starting point: `.ae-quadrant`, `.ae-quadrant__cell`.

### `status-dot-table`

Use for: health overview, SLA table, market status, metric target check.

Avoid for: pages where the status label is less important than the raw number.

Required slots: `table`, `status_column`, `target_column`, `trend_column`.

Color logic: red/yellow/green dots only. Avoid tinted whole rows unless the table is small.

Layout notes: if rows > 18 or columns > 16, apply the large-table split policy before styling.

### `driver-tree`

Use for: root-cause analysis, metric decomposition, "why target missed", seller health diagnosis.

Avoid for: process steps or status trackers.

Required slots: `root_metric`, `drivers[]`, `evidence[]`, `actions[]`.

Color logic: root metric orange or red; drivers neutral; action nodes orange/green depending on status.

Layout notes: prefer left-to-right tree for 16:9 slides. Keep branches to 2-3 levels.

### `timeline-phase-band`

Use for: UAT phases, rollout plan, monthly execution rhythm, dependency plan.

Avoid for: unordered workstreams.

Required slots: `phases[]` with `date_or_period`, `objective`, `owner`, `status`, `output`.

Color logic: completed = green/cyan, current = orange, blocked = red, future = gray/yellow.

Layout notes: repeat owner and status in each phase card.

### `ranked-bar-list`

Use for: top/bottom markets, top SKUs, largest deltas, issue ranking.

Avoid for: precise distribution with many categories.

Required slots: `items[]` with `rank`, `label`, `value`, optional `delta`, optional `status`.

Color logic: bars are neutral/navy by default; use orange or red only for selected or at-risk rows.

### `callout-answer-card`

Use for: business answer, executive takeaway, recommendation, or decision.

Avoid for: generic explanatory copy.

Required slots: `answer`, `supporting_points[]`, optional `decision_or_owner`.

Color logic: orange border or soft orange background. Text remains ink/black.

Layout notes: use one per slide. Do not nest it inside another card.

## Consulting Structure Elements

Classic consulting proof objects for judgment pages. Select them via the proof-object table in `references/shopee-template/consulting-storyline.md`; on this level they follow the same rules as other elements (one primary element per slide, semantic color, legible at 100%). None of these need new CSS files — compose them from design-system primitives (flex/grid, `.ae-*` starting points where noted, borders/fills from the color tokens). Keep them layout-honest: every line, gate, checkmark, and green fill is a claim (see the visual semantics guardrails in `consulting-storyline.md`).

### `gated-funnel`

Use for: stage-by-stage decay where the argument is *where* volume/quality leaks and which gates are unverified — PN 通过率、入库转化、activation-to-ADO、seller onboarding.

Avoid for: stages without a real pass/fail boundary; use `chevron-chain` for plain sequences.

Required slots: `stages[]` with `label`, `metric`, `gate_status` (`passed` / `pending` / `failed`), optional `leak_note` between stages.

Color logic: neutral/navy stage bodies; gate markers green only when evidence proves passage, yellow for pending, red for failed. Metrics live inside their stage, never in a side rail.

Build recipe: horizontal flex of trapezoid-ish stage blocks (decreasing widths via flex-basis or clip-path), thin gate bars between stages carrying a status dot + one-line gate criterion; leak annotations as small muted labels under the gaps.

### `waterfall-decomposition`

Use for: decomposing a gap or delta into named drivers — target miss 拆解、成本变动归因、GMV bridge、月环比 movement。

Avoid for: drivers whose magnitudes are unknown (use `driver-tree` for structure-only decomposition).

Required slots: `start` (label+value), `steps[]` (label, signed value), `end` (label+value).

Color logic: navy start/end pillars; green/cyan for favorable contributions, red/orange for unfavorable — judged by business meaning, not numeric sign (cost up = red). Connector hairlines in `--shopee-line`.

Build recipe: flex row of bars with computed offsets (inline style heights/margins from the actual values); value labels on each bar, driver labels beneath; one hairline linking each bar's baseline to the next.

### `value-chain-map`

Use for: showing where value, margin, or control sits along a chain and how it is shifting — 履约链路成本分布、价值链迁移、利润池移动。

Avoid for: unordered categories.

Required slots: `links[]` with `label`, `value_or_share`, `shift` (`gaining` / `losing` / `stable`), optional `players`.

Color logic: chain links neutral/navy; gaining links tinted cyan/green with an up marker, losing links tinted with muted red and a down marker; one orange highlight only on the link the page claim is about.

Build recipe: horizontal chevron or block chain (reuse `.ae-chevron` styling widened into bands); under each link a compact strip for share/value and player names; a thin annotation arrow above the chain only if the claim is directional shift.

### `route-map`

Use for: one starting condition diverging into distinct routes taken by different players or options — 入口路线分化、渠道策略分叉、方案路径对比。

Avoid for: routes that never actually shared a starting point; that is just a comparison table.

Required slots: `origin`, `routes[]` with `label`, `who`, `bet` (what the route assumes), `status_or_evidence`, optional `endpoint`.

Color logic: origin in navy; route lines in `--shopee-line` with one orange route only if the deck recommends it; per-route status chips use standard status colors.

Build recipe: left origin card, 2-4 branch lanes fanning right (grid rows with a curved or angled connector drawn as a bordered pseudo-element or thin rotated div); each lane is a slim card carrying who/bet/evidence — enough text that a reader can interpret the route without prior context.

### `capability-stack`

Use for: layered capabilities required to win, distinguishing built vs missing — 未来赢家能力栈、履约能力建设、系统化 vs 人肉运营。

Avoid for: unranked feature lists.

Required slots: `layers[]` bottom-up with `label`, `status` (`proven` / `building` / `missing`), `evidence_line`.

Color logic: base layers navy (foundations), proven layers green/cyan tint, building yellow, missing outlined with dashed `--shopee-line` and no fill — an empty slot is the honest visual for a missing capability.

Build recipe: vertical stack of full-width bands (a squared `.ae-pyramid` variant with equal widths); each band holds label left + one evidence sentence right; status chip at the band's edge.

### `risk-bridge`

Use for: current state to target state where the bridge is a set of named validations that must hold — Google-Glass-style risk bridges, 上线前置条件、扩量 gating、投资判断的待验证项。

Avoid for: plans already fully de-risked (that is a `timeline-phase-band`).

Required slots: `current_state`, `target_state`, `pillars[]` with `label`, `status` (`validated` / `pending` / `at_risk`), `test_or_evidence`.

Color logic: banks in navy; bridge deck neutral; pillars green only when validated, yellow pending, red at-risk. Never render the crossing arrow as completed (solid orange) while any pillar is unvalidated — use a dashed arrow.

Build recipe: two side cards (banks) joined by a horizontal deck bar; 3-5 pillar cards hanging below the deck, each with status chip + the concrete test that would validate it.

### `value-ladder`

Use for: price bands or maturity tiers with players/SKUs positioned on rungs — 价格带分布、服务分层、seller tier 阶梯。

Avoid for: continuous distributions better served by a chart.

Required slots: `rungs[]` top-down with `band_label`, `range`, `occupants`, optional `insight_marker` on the contested rung.

Color logic: rungs neutral with navy edges; exactly one orange highlight on the rung the claim concerns; occupant text must say what the occupant proves, not just its name.

Build recipe: left-aligned stepped bars of increasing indent/width (grid rows with stepped padding-left), band label + range on the bar, occupants as a compact caption row per rung.

### `control-point-map`

Use for: different players controlling different layers of one system — 生态分层、平台/服务商/卖家角色划分、who-owns-what maps. This is the honest replacement when a 2x2 would compare unlike roles.

Avoid for: genuinely comparable players on two shared dimensions (use `benchmark-quadrant`).

Required slots: `layers[]` with `layer_label`, `control_points[]` (each: `point`, `holder`, `strength`), optional cross-layer dependency notes.

Color logic: layer bands alternate white/`--shopee-surface`; control points as chips — navy for structural holders, orange only for the point the claim centers on; strength shown by chip weight (filled vs outlined), not by extra colors.

Build recipe: stacked horizontal layer bands (like `capability-stack` but each band contains a row of control-point chips with holder labels); dependency lines only where the dependency is itself part of the claim.

## Generator Checklist

Before writing HTML:

1. Confirm the mini story plan and selected layout.
2. Choose one primary visual element from this library.
3. Assign a semantic color role to each accent.
4. Check whether the chosen element can hold the user's real text without shrinking below legibility.
5. If the data is too large, split first; do not use a decorative element to hide unreadable data.
