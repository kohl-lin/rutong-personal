# Visual Review

Run this review after generating or materially editing any deck, before returning it to the user. Reading HTML source cannot catch layout problems like "left column crowded, right column mostly empty". You must look at rendered pixels.

For HTML, run the full review loop and every applicable checklist item. For PPTX, use the rendered-slide and cross-deck checklist items but skip HTML-only lint, toolbar, runtime, `contenteditable`, and `data-layout-*` checks.

## The Review Loop

1. **Lint first** (machine-checkable constraints):
   ```bash
   node scripts/shopee-template/lint-deck.mjs <deck.html>
   ```
   Fix every ERROR. Investigate every WARN.

2. **Screenshot every slide**:
   ```bash
   node scripts/shopee-template/screenshot-deck.mjs <deck.html> <out-dir>
   ```
   Requires a Chrome/Chromium binary (set `CHROME_PATH` if detection fails; `npx playwright install chromium` works in most sandboxes). The script uses Chrome DevTools Protocol to clip the `.slide` canvas, so each PNG is exactly one 1280x720 slide and excludes toolbar/page body content below the canvas.

3. **View each PNG and score it against the checklist below.** Look at the image; do not reason from the HTML you wrote. You wrote the HTML with intent, so your memory of it is biased — the screenshot is the ground truth.

4. **Fix and re-shoot.** Any slide that fails a checklist item gets edited, then re-screenshot only the changed slides. Repeat until clean. Two passes are normal; more than three passes usually means the layout choice itself is wrong — go back and restructure the slide instead of nudging pixels.

5. Only after the loop is clean: open the deck for the user and report the path, plus a one-line note of anything you fixed during review.

## Per-Slide Checklist

### Balance and whitespace (the most common failure)
- [ ] No large accidental empty region. If one column/side occupies less than ~60% of its allotted height while the other is full, rebalance: move a block across, widen the dense side's column ratio, enlarge the sparse side's card padding/font, or add a legitimate supporting element (source note, definition box, mini metric). Never pad with filler content.
- [ ] Visual weight is roughly symmetric for two-column layouts. Text-heavy left + one lonely small image right = fail. Give the image a caption card, enlarge it, or stack a second proof element.
- [ ] Tables do not look oversized or under-dense. If a table's rows/cells are much larger than the amount of data they contain, add a summary/readout band, reduce the table's allotted area, or pair it with a conclusion block so the page feels evidence-led rather than empty.
- [ ] If a Summary / Key Message box already states the takeaway, remove duplicated hero or lead copy above the insight cards; use the saved space for clearer evidence and actions.
- [ ] Summary / Key Message boxes should be visually lightweight by default: neutral or light-gray background, compact height, no heavy orange border or oversized label unless the page is intentionally alert-style. When placed at the top of a one-page report, the Summary spans the full slide content width above the columns.
- [ ] Browser editing and review toolbars sit below the PPT canvas, not at the top and not overlapping the header, Summary, footer, or page content.
- [ ] Annotation objects that are likely to need manual adjustment after review, such as evidence outlines, numbered badges, callout labels, and connector arrows, carry stable `data-layout-editable` / `data-layout-id` attributes. Do not make the standard header, footer, or whole body columns layout-editable by default.
- [ ] Grid gaps are consistent within the slide (cards in the same row share height; gutters match).

### Containment
- [ ] Nothing overflows the 1280x720 canvas: no clipped text, no cut-off table rows, no elements colliding with the footer.
- [ ] Long titles wrap to at most two lines and do not push the divider or content down unevenly.
- [ ] Table text is legible in the PNG at 100%. If you must squint, the table needed a split — apply `large_table_split_policy`.

### Hierarchy and alignment
- [ ] One clear focal point per slide. If everything is bold/orange, nothing is.
- [ ] The headline states a business answer readable in ≤3 seconds.
- [ ] For one-page reports with multiple findings, a clear but lightweight Summary / Key Message box appears near the top before dense evidence.
- [ ] Data-backed insight callouts are numbered or otherwise linked back to the exact table cells, chart points, columns, or evidence blocks that support them.
- [ ] When one insight is supported by a whole column, mark the column once. When it is supported by specific outlier cells in a column, place the numbered badge on those highlighted cells. When it is supported by two or more columns or a continuous region, use one large numbered outline around the whole evidence region.
- [ ] Annotation badges are visually positioned outside editable text content, so browser autosave does not merge marker numbers into values such as `15.78%2`.
- [ ] Left edges of stacked blocks align; numbers in table columns align consistently.
- [ ] Footer sits on the same baseline as other slides; page number matches sequence.

### Brand and color
- [ ] Standard Shopee content header present (mark, orange kicker, black headline, orange rule + dot) on every content slide.
- [ ] 60-70% of the slide is white/neutral; orange and accents carry meaning, not fill.
- [ ] Status colors (green/red/yellow) are used only where the data has that meaning.
- [ ] Green means better / achieved / on target and red means worse / missed target / risk according to the metric semantics, not just numeric direction. Sales or order volume up can be green; cost, NFR, LSR, defect rate, or failure rate up should be red.
- [ ] Time-period columns place the nearest period on the left and older periods to the right, for example `W-1`, `W-2`, `W-3`, unless the user requests another order.
- [ ] Market order follows the source, user instruction, or supplied template. Use `SG, MY, TH, TW, ID, VN, PH, BR, MX, CO, CL` only when the task selects the common Shopee convention.

### Message and argument (content-level, from consulting-storyline.md)
- [ ] One governing claim per slide: no second module (side metric block, central ribbon, bottom banner) reads like another conclusion.
- [ ] A visible proof object carries the argument on judgment pages — the page is not a stack of equal-weight cards, labels, or bullets.
- [ ] Large numbers sit on or inside the proof object; no detached KPI rail stealing attention from the claim.
- [ ] Kicker/subtitle explains or scopes the claim rather than restating the headline in softer words; the takeaway (if any) adds an implication, not a repeat.
- [ ] Company/case/market examples carry enough text that a reader can tell what each one proves — no bare name + one-word tag on standalone report pages.
- [ ] No visual overclaim: checkmarks/green only on verified items; pending validations shown as pending (yellow, dashed, gate); no arrow or connector implying support the evidence does not give.
- [ ] Bottom synthesis follows the deck-level policy (absent everywhere, light everywhere, or judgment pages only); source notes are visibly quieter than the takeaway.

### Consistency across the deck (check once, comparing PNGs side by side)
- [ ] Headline sizes match across content slides.
- [ ] Header, divider, and footer positions do not jump between slides.
- [ ] The same semantic color means the same thing on every slide.

## Fix Playbook for Common Failures

| Symptom in screenshot | Likely cause | Fix |
| --- | --- | --- |
| Left crowded, right sparse | Content volume mismatched to a 50/50 grid | Change column ratio (e.g. `1.4fr 1fr`), or move one block to the sparse side |
| Big empty band at bottom | Content underfills a dense layout | Choose a lighter layout, enlarge type one step within the scale, or add a legitimate note/definition block |
| Table looks too large and sparse | Table area is oversized for the row/column density | Shrink the table frame, add a top summary strip, tighten cell padding, or move secondary readout into adjacent insight cards |
| Table looks like gray noise | Density over threshold | Split per `large_table_split_policy`; never shrink below 8px |
| Insight feels detached from data | Callout is not linked to source evidence | Mark the relevant column once, or draw one numbered outline around the multi-column evidence region, and repeat the same marker in the insight label |
| Slide feels cluttered | More than one primary visual element | Keep one primary element; demote the rest to a compact list or appendix slide |
| Orange everywhere | Accent used as decoration | Return non-semantic fills to white/surface; keep orange for kicker, divider, key numbers |
| Multiple conclusion zones | Layers competing instead of doing distinct jobs | Keep one claim headline + at most one takeaway; rewrite panel headers as evidence labels; demote or delete the rest |
| Page reads pretty but proves nothing | No proof object; evidence never structured into an argument | Rebuild the body around one consulting structure element chosen from the claim's evidence relationship |
| Evidence visually overclaims | Observed signals connected to unverified outcomes; checkmarks on pending items | Split proven vs pending; switch to yellow/dashed/gate treatment; revise the claim-evidence map |
