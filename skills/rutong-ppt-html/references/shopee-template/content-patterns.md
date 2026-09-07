# Content Patterns

Use this reference to turn natural-language briefs, raw notes, pasted data, Markdown, PPT screenshots, or outline text into the Shopee internal HTML report template.

## Input Modes

Use one of two modes before selecting layouts:

- `brief_first`: Start from the user's business question, target audience, desired decision, and rough content. Infer the report spine, then mark missing evidence as assumptions or risks.
- `source_synthesis`: Start from existing source material such as PPT, screenshots, tables, or notes. Extract evidence and logic, then rebuild a cleaner report. Do not preserve source page order unless the order is already the best business story.

For both modes, the output is a slide-mapping-plan before HTML editing.

## One-Page PPT / HTML Business Pages

For a one-page project update, Monthly Meeting page, or effect showcase, do not begin with layout. First lock the story:

1. Write the business answer in one sentence.
2. Pick the narrative structure.
3. Assign each visual asset a role and display order.
4. Name anything the user does not want included.
5. Then choose the layout.

Common one-page structures:

- `problem -> solution -> proof -> iteration`: use for project updates, UAT updates, internal tools, or process improvements.
- `conclusion -> evidence -> implication -> action`: use for business reviews and data readouts.
- `before -> after -> proof -> next step`: use for product / program launches and workflow improvements.
- `context -> mechanism -> output -> usage`: use for explaining a tool, skill, or automated report.

For two-column pages, assign clear jobs:

- Left column: business answer, narrative chain, decision logic, or operating model.
- Right column: screenshots, charts, tables, proof, or output examples.

Do not add an ask, CTA, next-step panel, or feedback loop just to fill space. Include those only if the user asked for them or the audience needs to act.

## Screenshot Role And Ordering

When screenshots are provided, classify each one before placing it:

- `input_ui`: where the user asks or configures the tool.
- `report_overview`: the first result view or health summary.
- `exported_output`: the exported HTML / PPT / report artifact.
- `evidence_detail`: a table, chart, diagnosis detail, benchmark, or risk list.
- `appendix_detail`: useful backup, not main-slide material.

Ask the user for order if the role is ambiguous. If the role is clear, place screenshots by story logic, not by upload order.

## PPT / Source Synthesis

When the user gives a PPT or existing deck, treat it as source material to be mined and improved.

First build an evidence inventory:

1. Extract page title, section label, visible conclusion, subtitle, and any speaker-note style message.
2. Extract chart/table evidence: metric names, periods, markets, segments, absolute values, deltas, rankings, status colors, thresholds, and source notes.
3. Extract business logic: problem, trigger, root cause, mechanism, recommendation, owner, decision ask, next step, and risk.
4. Tag each page or block as `keep`, `merge`, `split`, `appendix`, or `drop`.
5. Mark uncertain numbers, unreadable screenshots, missing definitions, and unsupported claims as risks.

Then synthesize:

- Rewrite topic titles into business-answer headlines.
- Merge repeated context pages into one framing slide.
- Turn scattered metrics into one evidence slide when the same business question is being answered.
- Split a page only when it has more than one decision, more than one evidence family, or exceeds the large-table split threshold.
- Keep appendix detail only if it helps the user defend the answer.

## Internal Report Flow

Best for company-standard, data-heavy, decision-oriented decks.

Default flow:

1. Cover: topic, period, scope, owner.
2. Agenda: reporting scenario and section flow.
3. Executive summary: topline table plus leadership conclusion.
4. Trend analysis: one scope across multiple periods with watch/action commentary.
5. Data highlights: dense grouped table plus numbered findings.
6. Dense matrix: market x month, market x metric, forecast, capacity, quota, or annual tracking.
7. Multi-table benchmark: topline status plus benchmark, ranking, or OKR comparison.
8. Phase improvement plan: breakdown table plus action cards and quantified targets.
9. Decision proposal: background, constraints, options, and recommendation.
10. Ending: presenter, team, and contact.

Content-to-layout hints:

- Many numbers, market rows, or month columns -> `internal.dense-matrix`.
- Business background, objectives, or mechanism logic -> `internal.context-split`, `internal.phase-improvement-plan`, or a custom body guided by `style_refs`.
- One scope across weeks/months with movement commentary -> `internal.trend-analysis`.
- Cross-market grouped data with several findings -> `internal.data-highlights`.
- Targets, deltas, status, and rankings across related tables -> `internal.multi-table-benchmark`.
- Process-stage, lead-time, funnel-step, or phased improvement actions -> `internal.phase-improvement-plan`.
- Policy/process pain mapped to a recommended response -> `internal.context-split` or a custom body.
- PIC, owner, dependency, support needed, or cross-functional ask -> `internal.phase-improvement-plan` or a custom tracker body.

Internal layout selection rules:

- `internal.cover`: use only for title, period, scope, owner, and confidentiality context.
- `internal.agenda`: use for the report scenario, section flow, and clickable navigation labels.
- `internal.executive-summary`: use for a topline data table plus a short leadership takeaway, decision ask, or recommendation.
- `internal.trend-analysis`: use for one scope tracked across multiple periods, with trend commentary and watch points.
- `internal.data-highlights`: use for dense grouped tables across markets, cohorts, or segments, paired with numbered findings.
- `internal.dense-matrix`: use for large-scale data tables such as market x month, forecast, capacity, quota, SKU, ADO, and status matrices.
- `internal.multi-table-benchmark`: use when two related tables need to sit together, often topline status above and benchmark/ranking below.
- `internal.phase-improvement-plan`: use for breakdown tables paired with owners, action cards, target improvements, or phase-level fixes.
- `internal.context-split`: use for decision pages with background, constraints, option comparison, and recommended path.
- `internal.ending`: use for presenter, team, contact, and closing information.

Dense-table handling:

- If a page has 8-16 columns or 8-18 rows and the table itself is the evidence, choose `internal.dense-matrix`.
- Before filling HTML, estimate normalized rows, columns, and density (`rows × columns`) after including header rows, row groups, subtotals, and status columns.
- If columns > 16, rows > 18, density >= 190, or the table would need text below 8px, duplicate the closest data layout and split the source table across multiple slides.
- Prefer business-aware split order: metric family / business section, market group, quarter or month range, topline vs backup detail, then appendix detail.
- For split slides, repeat the header, source note, table definitions, and context summary; add continuation labels such as `Part 1/2` in the kicker, headline, or source note.
- Give every split slide its own right-side finding, watch panel, or commentary summary. Do not make slide 2 only a raw continuation table unless it is explicitly appendix detail.
- Keep the black table frame wrapped to the actual table and editable frame note; do not stretch the frame to fill the page.
- Use the side rail for the business focus, review rhythm, and pending decision; do not use it as overflow space for table rows.
- After adding split pages, update `data-sequence`, footer page numbers, agenda labels, `template.json.slide_count`, and rebuild `index.json`.

## Data To Highlight Logic

When the user provides a dataset and asks "what is the highlight?", infer the slide message before choosing a layout:

1. Identify the business question: growth, efficiency, seller adoption, market coverage, cost, SLA, conversion, or risk.
2. Find the strongest signal: largest delta, target miss, top/bottom market, outlier segment, sustained trend, benchmark gap, or operational bottleneck.
3. Translate the signal into Shopee-style business language: "what changed", "why it matters", "who is affected", "what action is needed".
4. Pick a layout by evidence shape: trend -> `internal.trend-analysis`; grouped comparison -> `internal.data-highlights`; wide tracking -> `internal.dense-matrix`; benchmark/ranking -> `internal.multi-table-benchmark`; action path -> `internal.phase-improvement-plan` or a custom body.
5. Write the headline as the business answer, not the topic. Example: "ID sellers show strong Instant adoption, but ADO unlock depends on keeping first-time activations live for 30 days."

## Natural-Language Briefs

When the user describes the desired report in plain language, build from the business question outward:

1. Identify the audience, occasion, decision need, and expected output shape.
2. Convert each useful sentence, metric, example, or requested topic into a `source_ref` in the slide-mapping-plan.
3. Infer the report spine: frame the business context, state the answer, prove it with evidence, explain the mechanism, and close with decision / action / next steps.
4. Choose layouts by business intent, not by the order in which the user wrote the brief.
5. Mark missing evidence as assumptions or risks instead of inventing unsupported facts.

Recommended internal brief flow:

1. `internal.cover`: topic, period, owner, and confidentiality.
2. `internal.executive-summary`: the answer first.
3. `internal.trend-analysis`, `internal.data-highlights`, `internal.dense-matrix`, or `internal.multi-table-benchmark`: evidence.
4. `internal.phase-improvement-plan`, `internal.context-split`, or a custom body: mechanism, action, decision, owner, or support ask.
5. `internal.ending`: close.

Required slide-mapping-plan fields are defined in `references/shopee-template/slide-mapping-plan.md`.

## Visual Element Selection

After layout selection, choose a primary visual element from `references/shopee-template/visual-element-library.md` when the slide needs a stronger analytical structure.

Use evidence shape as the deciding factor:

- Hierarchy, composition, severity, seller tiering, or funnel mix -> `segmented-pyramid`.
- Trigger -> diagnosis -> intervention -> outcome -> `chevron-chain` or `logic-progression`.
- Health overview, top risks, target misses, or issue triage -> `risk-severity-stack` or `status-dot-table`.
- Three to five headline values -> `metric-card-row`.
- Manual process -> automated report, old flow -> new flow, scattered question -> reusable diagnosis -> `before-after-bridge`.
- Root cause or driver decomposition -> `driver-tree`.
- Impact x effort, risk x controllability, maturity x opportunity -> `benchmark-quadrant`.
- UAT, rollout, phase execution, owner rhythm -> `timeline-phase-band`.
- Top/bottom markets, SKUs, deltas, or issue ranking -> `ranked-bar-list`.

Color is part of the meaning. Use Shopee Orange for brand/action, navy for foundations, red for critical risk, yellow for watch/partial confidence, blue for product/system, and green/cyan for healthy or improving status. Do not introduce one-off colors just because a source PPT used them.

## Uploaded PPT, Markdown, Or Screenshots

Uploaded files are supporting source material, not a conversion target. Do not preserve source page count by default. A 20-page PPT can become a 10-slide HTML deck if pages repeat or contain appendix detail.

Recommended process:

1. Extract or summarize each source page or content block.
2. Add each useful block to the slide-mapping-plan as a `source_ref`.
3. Label each block with business intent.
4. Merge repetitive pages.
5. Select the closest layout by `signals` in `template.json`.
6. Fill editable slots.
7. Keep any extra detail in appendix or speaker notes if needed.
