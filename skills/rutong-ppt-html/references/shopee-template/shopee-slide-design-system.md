# Shopee Slide Design System

Use this design system before creating or revising Shopee HTML or PPTX slides. Each format can express the content differently, but typography, brand chrome, and content components must start from the same Shopee grammar.

## Required Content Header

Every non-cover content slide should use the standard Shopee content header unless the slide is a full-bleed campaign or section divider.

Use the no-text Shopee mark. The local asset is:

- Bundled source asset: `assets/shopee-template/brand/logos/shopee-logomark-no-text-square.png`

Structure:

- Left mark: no-text Shopee logomark from `assets/shopee-template/brand/logos/shopee-logomark-no-text-square.png`, `46-56px` square, aligned to the headline block. Generated HTML copies it to `./assets/brand/logos/`. Do not use a wordmark in internal content headers.
- Kicker: orange, bold, `16-22px`, one line when possible. Use it for section, initiative, case type, market, or workstream.
- Main headline: black, bold, `28-38px`, one sentence, max two lines. The headline should state the business answer, not just the topic.
- Divider: Shopee Orange rule, `5-7px` high, full width inside the safe area, with an orange dot at the far right.
- Spacing: `24-40px` from slide top to header, `8-14px` from headline to divider, `14-26px` from divider to content.

Reference CSS:

```css
.shopee-content-header {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 16px;
  align-items: start;
}

.shopee-bag-mark {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  overflow: hidden;
  color: transparent;
  background: #ee4d2d url("../brand/logos/shopee-logomark-no-text-square.png") center / cover no-repeat;
  font-size: 0;
}

.shopee-kicker {
  margin: 0;
  color: #ee4d2d;
  font: 900 18px/1.1 "Shopee2021 Bold", "ShopeeFont", "Noto Sans SC", "Roboto", Arial, sans-serif;
}

.shopee-headline {
  margin: 4px 0 0;
  color: #202325;
  font: 900 34px/1.06 "Shopee2021 Bold", "ShopeeFont", "Noto Sans SC", "Roboto", Arial, sans-serif;
  letter-spacing: -0.03em;
}

.shopee-title-rule {
  height: 6px;
  margin: 10px 0 18px;
  background: linear-gradient(90deg, #ee4d2d 0 calc(100% - 20px), transparent calc(100% - 20px));
  position: relative;
}

.shopee-title-rule::after {
  content: "";
  position: absolute;
  right: 0;
  top: -5px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #ee4d2d;
}
```

The bundled template already uses its local `./assets/brand/logos/shopee-logomark-no-text-square.png`. Generated output keeps the same portable relative path.

## Typography Scale

Use ShopeeFont / Shopee2021 for headings when available. Use Roboto for Latin body text. For Chinese, Japanese, Korean, and mixed CJK decks, use Noto Sans before Roboto for all text.

Recommended scale for 1280 x 720 slides:

- Cover title: `58-72px`, line-height `0.95-1.05`, weight `900`.
- Section title: `44-64px`, line-height `1.0-1.1`, weight `900`.
- Content headline: `28-38px`, line-height `1.05-1.15`, weight `800-900`.
- Subhead: `18-24px`, line-height `1.2-1.35`, weight `700-900`.
- Body: `13-18px`, line-height `1.3-1.5`, weight `400-700`.
- Dense table text: `8.8-12.5px`, line-height `1.1-1.25`, weight `500-800`.
- Caption / footer: `10-13px`, line-height `1.25-1.4`, muted color.
- Footnote / source: `8.5-11px`, line-height `1.2-1.35`, muted or achromatic.

## Color Tokens

Core tokens:

```css
:root {
  --shopee-orange: #ee4d2d;
  --shopee-orange-dark: #d3422a;
  --shopee-orange-soft: #fff1ec;
  --shopee-orange-hot: #f65800;
  --shopee-orange-light: #f37b62;
  --shopee-red: #d0011b;
  --shopee-red-bright: #e4380e;
  --shopee-navy: #113366;
  --shopee-navy-deep: #111340;
  --shopee-blue: #0053de;
  --shopee-blue-bright: #2794fb;
  --shopee-cyan: #26aa99;
  --shopee-teal: #3ce6ca;
  --shopee-yellow: #ffbb00;
  --shopee-yellow-bright: #ffbc1b;
  --shopee-gold: #d2aa6e;
  --shopee-green: #4caf50;
  --shopee-green-bright: #70ad47;
  --shopee-ink: #202325;
  --shopee-black: #101010;
  --shopee-muted: #757575;
  --shopee-achromatic: #616161;
  --shopee-line: #eeeff2;
  --shopee-surface: #f9f9f9;
  --shopee-white: #ffffff;
}
```

Usage:

- Use Shopee Orange for section identity, active states, important numbers, and header dividers.
- Use black / ink for the main business statement.
- Use muted gray for footer, source, timestamp, and caveats.
- Use green for confirmed / positive / complete.
- Use red for failed / blocked / negative.
- Use yellow / amber for pending / watchout / partial confidence.
- Use blue / navy for neutral benchmark, product, technical, or secondary comparison systems.
- Use the extended analytical palette only when a color encodes business meaning: navy for foundation, red for critical risk, orange-hot for intervention/action, yellow for watch/partial confidence, blue-bright for system/product, and cyan/green for improvement or healthy status.
- Read `references/shopee-template/visual-element-library.md` before using pyramid layers, process chains, risk stacks, metric cards, or other analytical elements.

## Component Rules

Cards and boxes:

- Standard card: white surface, `1px` line, `14-24px` radius, `14-24px` padding.
- Emphasis card: orange left border or top accent, not full orange unless it is a campaign moment.
- Dense data panel: white surface, black or gray border, compact padding, strong table headers.
- Note box: pale orange or gray background, small icon or label, body `12-15px`.
- Decision box: pale red / amber background, bold decision prefix, owner and due date.

Tables:

- Use black or Shopee Orange header rows for high-stakes summary tables.
- Use gray group rows for markets / categories / stages.
- Use soft green / red / amber cell fills for heatmap comparisons.
- Keep table captions and source notes close to the table.
- For very dense pages, prefer smaller text over splitting logic across too many sparse slides.

Footer:

- Left: data period, team, source, or deck context.
- Right: page number, confidentiality, or owner.
- Size `10-13px`, muted gray, fixed to the same baseline across the deck.

## Template Design Spec

Every `template.json` must include a `design_system` object with:

- `reference`: this file path.
- `header_style`: `standard-shopee-content-header` unless there is a documented exception.
- `typography_scale`: named sizes for cover, headline, subhead, body, caption, and dense text.
- `color_tokens`: the template's approved tokens.
- `required_components`: the content components the template supports, such as cards, tables, notes, chips, or timelines.

When building a user deck, keep this design spec as an internal construction guide. Do not include an explicit design-spec slide in the final deck unless the user asks for it.
