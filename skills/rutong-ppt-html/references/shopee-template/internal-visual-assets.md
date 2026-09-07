# Internal Visual Asset Library

Use this catalog during planning and generation for both HTML and PPTX. It connects the retained Shopee reference deck to the shared design system and format-native implementations.

## Retained Source

- Deck: `assets/shopee-template/reference-decks/shopee-monthly-reference/reference.pptx`
- Manifest: `assets/shopee-template/reference-decks/shopee-monthly-reference/asset.json`
- Contact sheet: `assets/shopee-template/reference-decks/shopee-monthly-reference/contact-sheet.png`
- Quick preview: `assets/shopee-template/reference-decks/shopee-monthly-reference/preview.png`
- Inventory: 55 slides, 16:9, 9 masters, 17 unique layouts referenced by the slides. The imported package retains 303 structural layout parts for fidelity; they are not 303 curated patterns.
- SHA-256: generated from the current `reference.pptx`; `asset.json` is the source of truth and validation rejects mismatches.
- Privacy state: sanitized. Visible text and table values, charts/data, slide-local screenshots/images, note/comment content, slide object names, and external hyperlinks have been removed. Empty note containers and safe structural master/layout metadata may remain.

Keep the retained sanitized deck unchanged. It is an internal style and pattern source containing empty visual structures, not source business content.

## Use the Library Efficiently

1. Read this catalog and view the contact sheet.
2. Choose one or two source-slide anchors for each planned slide based on content shape, not topic or page number.
3. Render or inspect only the shortlisted source slides at full size when more detail is needed.
4. Record the chosen slide numbers in the internal build plan as `style_refs`.
5. Recreate the approved story with native HTML or PPTX elements. Never use a reference-slide screenshot as the finished slide.

Use the reference at three levels:

- **Tokens:** color, typography, rules, spacing, table treatment, footer rhythm.
- **Patterns:** roadmap, mechanism, matrix, action tracker, comparison, evidence deep dive, case study.
- **Assets:** authentic retained brand marks or graphics when appropriate and permitted.

Do not reintroduce confidential figures, names, screenshots, or narrative claims. Do not force new content into a source layout that does not fit.

## Slide Pattern Index

| Need | Strong source anchors | Pattern to reuse |
| --- | --- | --- |
| Cover / ending | 1, 55 | Minimal centered brand opening; decisive orange close |
| Agenda / section reset | 2, 9, 20, 26, 39, 44, 48, 52 | Sparse discussion index with strong orange rule |
| Executive performance summary | 10, 29, 37 | Claim headline + compact evidence table + right-side interpretation |
| Dense market or seller matrix | 12-16, 29-31, 45-46, 50 | Dark headers, semantic cells, outlined evidence, restrained commentary |
| Roadmap / timeline | 4, 40, 51 | Horizontal phases, dated milestones, owner/action bands |
| Operating mechanism | 23-25, 27-28, 33, 35-36, 49 | Commitment/investment structure, gates, rules, program flow |
| Action / ownership tracker | 5-6, 11, 21, 32, 38, 43, 51 | Owner, action, timing, status, dependency, support needed |
| Before-after / quality framework | 7, 34 | Two-state comparison with a clear transition or decision logic |
| Product or screenshot evidence | 6, 8, 47 | Screenshot paired with annotated explanation and calculation logic |
| Market-program comparison | 22-25 | Repeated market columns with consistent commitment and incentive fields |
| Deep-dive case study | 16, 18, 53-54 | Profile/context + evidence + drivers/actions + implication |

## Cross-Format Translation

For **HTML**, translate the selected anchors into the fixed Shopee shell, shared CSS tokens, layout fragments, and native editable HTML. Reuse the reference's information hierarchy and evidence treatment, not its exact coordinates.

For **PPTX**, use the retained deck as explicit Shopee visual direction and create native editable slides. Do not activate exact template-following automatically. Duplicate retained slides or preserve their master/layout hierarchy only when the user explicitly asks for exact template reuse.

When a useful pattern is missing from the HTML fragment library, build it as a custom body for the current deck. Promote it into a reusable fragment only after it works across at least two real content examples and passes visual review. Add the promoted fragment to `assets/shopee-template/templates/shopee-internal-report/layouts/`, document its signals in `template.json`, and rebuild `index.json`.
