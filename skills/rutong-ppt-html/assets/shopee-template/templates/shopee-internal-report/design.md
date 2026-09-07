# Shopee Internal Report — Design System

**Shopee Internal Report** is the company-standard HTML deck for business reviews, OKR readouts, strategy updates, and operational decisions. It is dense, data-driven, and executive-facing. The visual grammar is crisp white surfaces with Shopee Orange reserved for kickers, dividers, and status accents — never as wallpaper. Every slide is accountable: a headline states the conclusion before the data explains it.

---

## Typography

| Role | Size | Weight | Color |
|---|---|---|---|
| Cover title | `58–72px` | 900 | `#202325` |
| Kicker (section label) | `16–18px` | 900 | `#ee4d2d` |
| Content headline | `28–34px` | 900 | `#202325` |
| Subhead / card label | `15–20px` | 800 | `#202325` or `#ee4d2d` |
| Body / list | `13–16px` | 600–700 | `#202325` |
| Dense table text | `9–12px` | 600–800 | `#202325` |
| KPI value | `30–38px` | 900 | `#202325` or `#ee4d2d` |
| Milestone hero number | `72px` | 900 | `#ee4d2d` |
| Caption / note | `11–13px` | 600–700 | `#757575` |
| Footer | `10–12px` | 700–800 | `#757575` |

**Font stack — headings:** `"Shopee2021 Bold", "ShopeeFont", "Noto Sans SC", "Roboto", Arial, sans-serif`
**Font stack — body:** `"Roboto", "Noto Sans SC", Arial, sans-serif`

For CJK content (Chinese, Japanese, Korean) use Noto Sans SC for both heading and body. Never use more than two font families in the same slide.

---

## Color Tokens

| Token | CSS var | Hex | Use |
|---|---|---|---|
| Orange | `--orange` | `#ee4d2d` | Kicker, divider dot, cover bar, status accent, key numbers |
| Orange soft | `--orange-soft` | `#fff1ec` | Background fill for highlighted cards and insight boxes |
| Orange hot | `--orange-hot` | `#f65800` | Intervention, action push, transition, campaign mechanism |
| Red | `--red` | `#d0011b` | Blocked, failed, escalate, negative delta |
| Red bright | `--red-bright` | `#e4380e` | Critical movement, alert band, severe comparison |
| Yellow | `--yellow` | `#ffbb00` | Watch, pending, in progress, partial risk |
| Blue | `--blue` | `#0053de` | Neutral benchmark, technical KPI, secondary comparison |
| Blue bright | `--blue-bright` | `#2794fb` | System, Diana2/product capability, automation cue |
| Light blue | `--light-blue` | `#2673dd` | Ads / digital channel accent |
| Navy | `--navy` | `#113366` | Deep emphasis, Phase badges, strategic labels |
| Navy deep | `--navy-deep` | `#111340` | Pyramid base, stable foundation, deep contrast |
| Cyan | `--cyan` | `#26aa99` | Positive delta, milestone achievement, efficiency metrics |
| Teal | `--teal` | `#3ce6ca` | Light positive accent, process improvement |
| Green | `--green` | `#4caf50` | On track, confirmed, positive status |
| Ink | `--ink` | `#202325` | All headlines, table text, body copy |
| Muted | `--muted` | `#757575` | Footer, captions, secondary labels |
| Line | `--line` | `#eeeff2` | Card borders, table grid lines |
| Surface | `--surface` | `#f9f9f9` | Table row alternation, secondary card fill |
| White | `--white` | `#ffffff` | Slide surface, card fill, text on orange |

Orange is an **accent**, not a fill. In dense data pages, black, gray, and white carry the information. Orange appears on the kicker, divider, chips, and one or two key numbers per slide. Cyan is the secondary accent for achievements, positive trends, and progressive comparisons.

For analytical visuals, use `references/shopee-template/visual-element-library.md` as the source of truth. A pyramid, risk stack, chevron process, benchmark quadrant, or before/after bridge should use color semantically: navy = foundation, red = critical risk, orange/hot orange = action or mechanism, yellow = watch or partial confidence, blue = system/product, green/cyan = healthy or improvement.

---

## Slide Canvas

- **Dimensions:** `1280 × 720px`, aspect ratio `16:9`
- **Background:** `#ffffff`
- **Safe area padding:** `34px top, 36px left/right, 18px bottom` (footer zone)
- **Border radius:** `14px` (slide card in browser view)
- **Box shadow:** `0 20px 70px rgba(32,35,37,.12)`
- **Top stripe (content slides only):** `9px` multicolor gradient bar at the very top edge, suppressed on cover

Top stripe CSS:
```css
.slide::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 9px;
  background: linear-gradient(90deg,
    #ee4d2d 0 34%, #f37b62 34% 46%,
    #ffbb00 46% 50%, #26aa99 50% 56%,
    #f7e2dc 56% 100%
  );
}
```

---

## Cover Slide

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│            [Full Shopee logo — centered]                │
│         (shopping bag icon + "Shopee" wordmark)         │
│                                                         │
│           [Deck title — black, bold, centered]          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Confidentiality — white, left]     [Team / Date]      │
│           ORANGE BAR  #ee4d2d                           │
└─────────────────────────────────────────────────────────┘
```

- **Logo:** Full Shopee wordmark — orange shopping bag (white S inside) with "Shopee" text below in orange. Center both horizontally. Logo height `~100px`. No background card behind the logo.
- **Title:** Centered, `#202325`, `44–52px`, weight `900`. Max two lines. No subtitle on cover.
- **Orange bar:** Solid `#ee4d2d`, `height ~18%` of slide (`≈130px`), full width, pinned to bottom.
- **Bar content:** White text only. Left: confidentiality label e.g. `PRIVATE & CONFIDENTIAL`, `12px`, uppercase, weight `800`. Right: team name or date, `13px`, weight `700`. Optional — leave blank if not needed.
- **Top stripe:** Hidden on cover (`height: 0` or removed).
- **No floating meta cards.** Period, scope, owner, version go in the orange bar as plain text if needed.

---

## Content Header

Every non-cover slide opens with this header. It is the strongest consistency rule in the template.

```
┌────┬─────────────────────────────────────────────────────┐
│ [S]│  [Section label — orange]                           │
│    │  [Business answer headline — black]                 │
└────┴─────────────────────────────────────────────────────┘
─────────────────────────────────────────────────────────●
```

**Bag icon:** `44px` square, `border-radius: 10px`, `background: #ee4d2d` with the Shopee bag asset (`shopee-logomark-no-text-square.png`) centered inside.

**Kicker — section label:**
- Color: `#ee4d2d`, size: `17px`, weight: `900`
- Format: `[场景标签 | 适用场景说明]` — bracket wrapper always present, pipe delimiter separates label from scenario hint
- Example: `[Trend Analysis | 大规模数据 — 65/35 双栏趋势表 + Watch Panel]`

**Headline — business answer:**
- Color: `#202325`, size: `30–34px`, weight: `900`, `letter-spacing: -0.03em`
- States the **conclusion**, never just the topic (see Writing Rules)
- Sits directly below the kicker, `6px` gap

**Divider rule:**
- Height: `5px`, placed `10px` below the headline
- Gradient: `linear-gradient(90deg, #ee4d2d 0 calc(100% - 20px), transparent calc(100% - 20px))`
- Orange circle dot: `15px` diameter, `border-radius: 999px`, `background: #ee4d2d`, positioned at far right, centered on the rule

---

## Footer

Standard content slides use a lightweight footer and a presenter tag:

```
[姓名][部门]                                    ← top-right reporter tag
[Context / Summary ...]                        ← title下方单行summary框
[Left footer note or page]                     [optional ! 口径]
```

- Pinned `18px` from slide bottom, `36px` from left and right edges
- Font: `11px`, weight `800`, color `#757575`
- Cover, agenda, and ending pages do not need the presenter tag.
- Presenter tag format: `[姓名][部门]`, aligned top-right on standard content slides.
- Use one `Context / Summary` bar directly below the title rule on every non-cover slide. This bar is for the current month's key context and takeaway, not raw metadata.
- Every page should show a page number.
- Data-page footer behavior:
  - Left side can keep a short source / 口径提示.
  - Right side should keep the page number and may additionally show `! 口径`.
- Non-data page footer behavior:
  - Show the page number without extra remarks by default.
- Do not add miscellaneous remarks to every page by default.

---

## SOP: Data Density → Layout Selection

The layout engine is driven by two axes: **data density** and **content type**.

### Rule 1 — Data Information Density

| Density | Layout |
|---|---|
| **Large-scale / cross-market multi-indicator** | 65/35 dual-column: large data table left, structured insights right |
| **Minimal / single KPI milestone** | Giant number card: 72px hero number + delta + 3-column action grid |
| **Moderate / 1–2 market weekly trend** | Upper-lower grid: trend table top, watch panel or bar chart bottom |

**65/35 layout:** Use `display: grid; grid-template-columns: 63% 37%;` with `data-auto-fit-table` on the left panel. Right panel uses numbered `kh-item` findings or `insight-box`.

**Single number card:** Use `.milestone-hero` (72px orange number) + `.milestone-delta` (28px cyan delta) + `.milestone-action-grid` (3-column action cards) + `.milestone-bottom-bar` (context pills).

### Rule 2 — Unstructured / Strategic Content Type

| Content type | Layout |
|---|---|
| **Pain points vs solutions (≥4 items)** | Accordion: `.accordion` + `.acc-item` + `.acc-trigger` + `.acc-panel` |
| **Strategic logic chain / progressive reveal** | Step-by-step: use `data-step` on content blocks; spacebar advances in-slide |
| **Timeline / phased execution** | Phase cards: `.timeline` + `.phase` with numbered `sec-badge` headers |
| **Cross-team coordination** | Matrix cards: `.coord-grid` + `.coord-card` with Status Quo + Support Needed sections |
| **Decision proposal A vs B** | Split panels: `.decision-split` + `.decision-panel` with `panel-head-dark` and `panel-head-orange` |

---

## Current Routing

### Evidence and Decision Flow

The current template moves from topline evidence into the decision page, then provides deeper matrices, benchmarks, and the improvement plan. Keep the agenda in this same physical order.

- `03 Executive Summary`: use for one topline table plus short leadership takeaway.
- `04 Trend Analysis`: use for one scope across multiple periods, with watch/action commentary.
- `05 Data Highlights`: use for dense grouped tables across markets / cohorts / segments, with numbered findings.
- `06 Decision Proposal`: use for background + option comparison + recommendation.
- `07 Dense Matrix`: use for very wide monthly or annual tracking across many markets.
- `08 Multi-table Benchmark`: use when one page needs two related tables, usually topline status above and ranking / benchmark below.
- `09 Phase Improvement Plan`: use when the table explains where the problem sits and the cards explain what to do next.

---

## Layout Library

### 1. Cover `internal.cover`
See Cover Slide section above.
**Slots:** `[报告标题]` `[PRIVATE & CONFIDENTIAL]` `[团队 / 部门名称]` `[YYYY WXX / Month]`

---

### 2. Agenda `internal.agenda`
**Purpose:** Navigation index linking to all report sections.

**Layout:** Content header → agenda grid with up to 7 reusable page types.

**Item style:** Number chip `01`–`07` (orange, `900` weight) + label text (editable). Click jumps to target slide via `data-target` attribute.

**Slots:** `[kicker]` `[headline]` · Items: `[agenda-num]` + `[agenda-label]` × up to 7

---

### 3. Executive Summary `internal.executive-summary`
**Purpose:** 3–5 synthesized leadership messages with evidence and decision ask.

**Layout:** Content header → `Context / Summary` bar → 3 horizontal cards.

**Card structure:**
- Sec-badge label: `sb-cyan` / `sb-yellow` / `sb-orange`
- Body: 2–4 sentences of synthesized evidence. Never leave a card body mostly empty.
- Optional `insight-box` at bottom for the key decision ask.

**Slots:** `[kicker]` `[headline]` `[Context / Summary]` · Cards: `[sec-badge]` + `[body]` × 3–5 · `[insight-box]`

---

### 4. Trend Analysis `internal.trend-analysis`
**Purpose:** One scope tracked across multiple periods, with trend commentary and watch/action points.

**Layout:** Content header → `Context / Summary` bar → 65/35 split. Left: `data-auto-fit-table` wrapping a multi-period trend table. Right: `.watch-panel` with `.watch-item` entries.

**Delta badges:** `.delta-badge.up` (green) · `.delta-badge.down` (red) · `.delta-badge.warn` (amber) · `.delta-badge.flat` (muted) · `.delta-badge.good-down` (cyan — for metrics where lower is better)

**Slots:** `[kicker]` `[headline]` `[Context / Summary]` · Table: `[指标名]` `[单位]` `[period columns]` `[WoW/MoM delta]` × 5–10 rows · Watch panel: `[watch-title]` `[watch items]`

---

### 5. Data Highlights `internal.data-highlights`
**Purpose:** Wide grouped table plus numbered findings panel. Use for dense cross-market analytics.

**Layout:** 63/37 split. Left: `data-auto-fit-table` with `row-group` sub-headers. Right: `.kh-panel` with numbered `.kh-item` findings.

**Table groups:** Use `<tr class="row-group">` for sub-headers such as Group A / Group B.

**Slots:** `[kicker]` `[headline]` · Table col headers: `[指标名]` `[单位]` `[汇总]` `[市场 A–C]` · Row groups: `[分组名]` + data rows · Findings: `[洞察 N]` + `[sub-bullets]` × 3

---

### 6. Decision Proposal `internal.context-split`
**Purpose:** Context framing + Option A vs Option B decision ask for approval or escalation.

**Trigger:** Use when presenting to **decision-makers who need to approve, reject, or choose** between paths.

**Layout:** Content header → `context-box` (background & constraints) → `decision-split` (two panels side by side) → `explore-note`.

**Panel styles:** Option A uses `panel-head-dark` (dark). Option B (recommended) uses `panel-head-orange` (orange). Recommended option always goes right.

**Context box elements:** Background bullets + `approval-tag` span for deadline.

**Slots:** `[kicker]` `[headline]` · Context: `[背景说明]` `[约束条件]` `[YYYY-MM-DD approval date]` · Option A: `[描述]` `[风险]` `[要点]` · Option B: `[提案]` `[执行要求]` `[预期效果]` `[负责方]` · `[deep-dive note]`

---

### 7. Dense Matrix `internal.dense-matrix`
**Purpose:** Very wide rolling matrix for annual plan tracking across markets, months, metrics, and status.

**Layout:** Content header → `Context / Summary` bar → side rail for focus/review rhythm/decision → black-framed `data-auto-fit-table`.

**When to use:** Market x month, market x metric, forecast, capacity, quota, SKU, ADO, or status fields where the table itself is the main evidence.

**Slots:** `[kicker]` `[headline]` `[Context / Summary]` · Flow rail: `[business focus]` `[review rhythm]` `[pending decision]` · Table: `[market]` `[metric]` `[month columns]` `[status]` · `[source]`

---

### 8. Multi-table Benchmark `internal.multi-table-benchmark`
**Purpose:** Two related tables on one page, usually topline status above and benchmark/ranking comparison below.

**Layout:** Content header → `Context / Summary` bar → stacked table blocks with a right-side insight / interpretation area.

**When to use:** OKR target vs actual, pass/fail benchmark, market ranking, comparable package / cohort review, or one topline table that needs a supporting benchmark cut.

**Slots:** `[kicker]` `[headline]` `[Context / Summary]` · `[top_table]` `[benchmark_table]` `[insights]` `[source]`

---

### 9. Phase Improvement Plan `internal.phase-improvement-plan`
**Purpose:** Breakdown table paired with specific improvement actions and quantified targets.

**Layout:** Content header → `Context / Summary` bar → table showing the phase / funnel / process breakdown → action cards below or beside it.

**When to use:** Lead-time, funnel-step, process-stage, rollout phase, or operational improvement planning where each action needs an owner, target, and expected lift.

**Slots:** `[kicker]` `[headline]` `[Context / Summary]` · `[breakdown_table]` · Improvement cards: `[action title]` `[owner]` `[target]` `[action detail]` × 3–4 · `[source]`

---

### 10. Ending `internal.ending`
**Purpose:** Thank you + contact card.

**Layout:** Centered logo → large title → subtitle → 3-column contact strip.

**Slots:** `[Thank You title]` `[subtitle]` · Contact: `[汇报人姓名]` `[团队]` `[email]`

---

### Optional extension vocabulary

The CSS still contains reusable component grammar for KPI cards, phase cards, status chips, ranking tables, and milestone-style callouts. These are extension patterns, not current `template.json.layouts[]` entries. If a new layout is added later, add it to `template.json`, `index.json`, and this section together.

- KPI dashboard behavior can be composed inside `internal.executive-summary` or `internal.multi-table-benchmark`.
- Risk/action tracker and coordination behavior belongs inside `internal.phase-improvement-plan` or a custom body unless a dedicated tracker layout is added.
- Timeline behavior belongs inside `internal.phase-improvement-plan` unless a dedicated roadmap layout is added.
- Metric definitions and caveats should live in source notes, callout frames, or duplicated appendix-style pages under the current design system.

---

## Components

### Context / Summary Bar `.context-bar`
A compact single-line summary strip placed between the title rule and the main content. It captures the current month's business context, the key change, and the one takeaway the reader should remember first.

```css
.context-bar {
  display: block;
  margin: 0 0 8px;
  padding: 4px 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 3px solid var(--orange);
  border-radius: 0 5px 5px 0;
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
}
```

Use the copy prefix `Context / Summary:` and keep the line concise enough to scan in one pass.

---

### Section Badge `.sec-badge`
Inline label chip used inside cards, phase headers, and table sub-sections.

| Class | Background | Color | Use |
|---|---|---|---|
| `.sb-orange` | `#fff1ec` | `#ee4d2d` | Key action, highlight, recommended |
| `.sb-navy` | `#e8eeff` | `#113366` | Strategic, milestone, next step |
| `.sb-cyan` | `#e6f7f5` | `#26aa99` | Positive finding, achievement, action |
| `.sb-muted` | `#f9f9f9` | `#757575` | Status quo, neutral, reference |
| `.sb-red` | `#fce8ec` | `#d0011b` | Risk, blocked, escalation |
| `.sb-yellow` | `#fff8e1` | `#b8860b` | Watch, partial, pending |

---

### Delta Badge `.delta-badge`
Inline pill for WoW / MoM / QoQ change values in trend tables.

| Class | Color | Use |
|---|---|---|
| `.delta-badge.up` | Green | Positive for metrics where up is good |
| `.delta-badge.down` | Red | Negative direction |
| `.delta-badge.warn` | Amber | Small or mixed change |
| `.delta-badge.flat` | Muted | No meaningful change |
| `.delta-badge.good-down` | Cyan | Metrics where lower is better (e.g. cost, churn) |

---

### Insight Box `.insight-box`
Highlighted conclusion or decision ask placed inside a card or at the bottom of a content area.

```css
.insight-box { border: 1.5px solid var(--orange); border-radius: 8px; padding: 10px 13px; background: var(--orange-soft); }
.insight-box-lbl { color: var(--orange); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .07em; }
.insight-box-body { font-size: 12.5px; font-weight: 700; line-height: 1.4; }
```

Use for the single most important takeaway on a slide — do not use more than one per slide.

---

### Callout Frame `.callout-frame`
Neutral framed box for supplementary context, data notes, or reference data that supports but does not lead the narrative.

```css
.callout-frame { border: 1px solid var(--line); border-radius: 7px; padding: 9px 12px; background: var(--surface); }
.callout-frame-title { font-size: 10px; font-weight: 900; color: var(--muted); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px; }
```

---

### KPI Cards
Top accent color cycles: KPI 1 orange → KPI 2 blue → KPI 3 amber → KPI 4 cyan.

```css
.kpi-card { box-shadow: inset 0 5px 0 var(--accent-color); border-radius: 16px; }
```

Value: `34px` weight `900`. Label + note: `11px`, muted. Delta: green if positive, red if negative.

---

### Status Chips `.chip`

```css
.chip         { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 800; color: #fff; }
.status-good  { background: #4caf50; }
.status-bad   { background: #d0011b; }
.status-watch { background: #ffbb00; color: #202325; }
```

---

### Tables
- Header row: `background: #202325`, white text, `11–13px`, weight `800`
- Group rows (`.row-group`): `background: #f9f9f9`, weight `800`, colspan full width
- Data cells: `background: #fff`, `10–12px`, weight `600`
- Grid lines: `1px solid #eeeff2`
- Wrap in `data-auto-fit-table` for auto density scaling (adds `.is-wide`, `.is-tall`, `.is-ultra-dense` classes)

**Auto-fit density thresholds and split policy:**

| Condition | Class added | Generation action |
|---|---|---|
| Columns ≥ 10 | `is-wide` | Smaller font is acceptable |
| Columns ≥ 14 | `is-very-wide` | Even smaller font is acceptable if still ≥ 8px |
| Rows ≥ 13 | `is-tall` | Tighter line-height is acceptable |
| Columns > 16 or rows > 18 or density ≥ 190 | `is-ultra-dense` | Duplicate the closest layout and split the table |

Auto-fit is a safety net, not a license to ship unreadable slides. When a generated table would require text below `8px`, split by metric family, business section, market group, quarter/month range, topline vs backup detail, or appendix detail. Repeat the content header, source note, table definitions, and a business-answer headline on every split slide.

---

## Placeholder Format

All template slots use `[bracket placeholder]` format. This is the **canonical placeholder notation** — square brackets with descriptive Chinese or English content inside.

| Type | Format | Example |
|---|---|---|
| Metric name | `[指标名称]` | `[指标名 A]` |
| Number | `[000]` or `[0,000]` | `[000,000]` |
| Percentage | `[XX%]` or `[X.X%]` | `[XX.X%]` |
| Date | `[YYYY-MM-DD]` or `[YYYY WXX]` | `[2026-W22]` |
| Team name | `[团队 / 部门名称]` | `[市场 A]` |
| Free text | `[描述性占位]` | `[本期核心结论]` |

When filling a template, replace every `[bracket]` with real content. Do not ship bracket placeholders in a final deck.

---

## Writing Rules

**Kicker format:** `[场景标签 | 适用场景说明]` — bracket wrapper always present. Pipe delimiter separates the topic from the scenario hint.

Examples:
- `[Executive Summary | 周期复盘 / 月度汇报 / 专题洞察]`
- `[Trend Analysis | 大规模数据 — 65/35 双栏趋势表 + Watch Panel]`
- `[Phase Improvement Plan | 阶段拆解 / 行动跟进 / 改善目标]`

**Headline format:** One sentence. States the conclusion before the data explains it.

| Wrong | Correct |
|---|---|
| Multi-table Benchmark | GMV is ahead of target; conversion is lagging in PH and MY |
| Phase Improvement Plan | Three fulfillment risks need escalation before end of quarter |
| Cross-team Coordination | Launch is on track for W22; seller onboarding must accelerate |
| Executive Summary | The period is ahead on topline but risk is concentrated in fulfillment |

**Data density:** Dense is expected. Do not thin out a slide to make it look "cleaner". Use `data-auto-fit-table` for moderate density, but apply `large_table_split_policy` when thresholds are exceeded.

**Scenario labels in footer:** Every slide uses the left footer zone to note `*[适用场景]` and data source — this makes the slide self-documenting for agent and human readers.

---

## Never Do

- Orange as a large background fill on content slides — it reads as campaign, not report
- Gradient blobs, decorative shapes, or pattern fills in the content area
- A headline that only states the topic (`"KPI Overview"`) — it must state the conclusion
- Missing PIC or due date on the action tracker
- Table font below `8px` — split the table across two slides instead
- Shipping bracket placeholders `[like this]` in a final deck — they are template slots, not design elements
- Importing another template's visual language into the internal report deck
- Omitting the footer on any slide
- Stretching the black table frame to fill blank space below the data
- More than two font families in any single slide
- Using `contenteditable` on navigation/button elements — only editable data cells, text, and labels need it
