# Shopee Brand Reference

This file captures shared Shopee brand rules for HTML and PPTX slides. It summarizes official brand guidelines and Shopee Design observations that were reviewed during template creation.

## Source Notes

Checked on 2026-05-28:

- Shopee Brand Guidelines 2024 PDF was reviewed and had 62 pages. The raw PDF is not bundled in the final lightweight template library.
- `https://shopee.design/download#brand%20asset%20library` returns a React app shell with title `Shopee Design`.
- The app shell exposes `theme-color: #EE4D2D`.
- Static CSS references Shopee-specific fonts: `Shopee2021`, `ShopeeRounded`, and `OpenSans`.
- Static CSS references common UI colors including `#ee4d2d`, `#202325`, and `#f9f9f9`.
- The app includes routes for `/download`, `/download/icons`, `/download/illustrations`, `/download/image-library`, and `/brand`.
- The app bundle references Shopee Image Library, Shopee Icon Library, Shopee Illustration Library, and Brand Asset Library.
- Some brand guideline assets appear to point to SharePoint and may require authenticated access.
- Internal PowerPoint template PDF was reviewed for layout grammar. The raw PDF is not bundled in the final lightweight template library.
- A square no-text Shopee logomark is bundled at `assets/shopee-template/brand/logos/shopee-logomark-no-text-square.png`.

## Logo

- For internal report slide headers, use the no-text Shopee logomark asset provided in this skill.
- Apply `0.5x` clear space around all sides of the horizontal logo, vertical logo, and standalone shopping bag icon.
- Minimum sizes: horizontal logo `60px` screen or `20mm` print; vertical logo `40px` screen or `15mm` print; standalone logomark `20px` screen or `10mm` print.
- Avoid using the standalone shopping bag unless there are already significant Shopee branding elements on the same canvas.
- Avoid using standalone Shopee logotype unless it is part of a product, feature, event, or campaign logo design.
- For internal slide content headers, prefer the no-text logomark asset rather than a horizontal logo with the Shopee wordmark.
- When placing the shopping bag icon inside a circle, keep it slightly off-center for optical balance.

Logo color rules:

- Orange logo on white or light backgrounds: `#EE4D2D`.
- White logo on orange or dark backgrounds: `#FFFFFF`.
- Achromatic logo when needed: `#616161`.
- For the orange logo, the `S` inside the bag must be white.
- For white and achromatic logos, the `S` inside the bag must be transparent.

Do not:

- Alter the bag icon, logotype, proportions, aspect ratio, or logo colors.
- Stretch, rotate, tilt, apply gradients, add excessive shadows, create 3D logo effects, or use the bag as the letter `S`.
- Place the logo over busy imagery or low-contrast backgrounds.
- Place extra text too tightly around the logo.

## Palette

Use these design tokens:

```css
:root {
  --shopee-orange: #ee4d2d;
  --shopee-orange-dark: #d3422a;
  --shopee-orange-hot: #f65800;
  --shopee-orange-light: #f37b62;
  --shopee-orange-bright: #f27961;
  --shopee-red: #d0011b;
  --shopee-red-bright: #e4380e;
  --shopee-navy: #113366;
  --shopee-navy-deep: #111340;
  --shopee-blue: #0053de;
  --shopee-blue-bright: #2794fb;
  --shopee-light-blue: #2673dd;
  --shopee-cyan: #26aa99;
  --shopee-teal: #3ce6ca;
  --shopee-yellow: #ffbb00;
  --shopee-yellow-bright: #ffbc1b;
  --shopee-gold: #d2aa6e;
  --shopee-green: #4caf50;
  --shopee-green-bright: #70ad47;
  --shopee-gray: #b3b9c2;
  --shopee-achromatic: #616161;
  --shopee-ink: #202325;
  --shopee-muted: #757575;
  --shopee-line: #eeeff2;
  --shopee-surface: #f9f9f9;
  --shopee-white: #ffffff;
}
```

Color usage:

- Shopee Orange is the primary color.
- Brand guideline recommendation: use roughly `70%` primary color plus `30%` secondary color to best represent Shopee identity.
- Use flat colors by default. Gradients are acceptable when subtle, gentle, gradual, and derived from the same base color spectrum.
- Avoid harsh, overly dramatic, overly dark, or high-contrast mixed-spectrum gradients.
- Use analytical accent colors semantically in internal reports: navy for foundation, red for critical risk, orange-hot for action/intervention, yellow for watch, blue-bright for system/product, and green/cyan for healthy or improvement.
- Use `references/shopee-template/visual-element-library.md` for pyramid layers, process chains, risk stacks, metric rows, before/after bridges, and other reusable analysis elements.

Campaign colors:

- Regional mega campaigns should remain predominantly orange with secondary-color accents.
- Thematic campaigns may use secondary or extended palette colors as main colors, but Shopee Orange and secondary colors should still be prominent.
- 10.10 is noted as a Shopee Mall driven brands campaign that uses red.

Product and feature associations:

- Shopee Orange: ShopeePay, ShopeeFood, ShopeePayLater.
- Shopee Red: Shopee Mall, Brand Days, Fashion & Beauty.
- Shopee Navy Blue: Shopee for Men, Electronic Category.
- Shopee Blue: Electronic Category, Other FMCG Category.
- Light Blue: Shopee Supermarket.
- Shopee Cyan: Free Shipping.
- Shopee Yellow: Coin Rewards, Vouchers & Cashback.
- Shopee Premium Gold: Shopee Premium.

## Typography

Official brand guideline:

- ShopeeFont is the primary typeface for headers, sub-headers, sub-brands, family brands, and marketing campaign logos.
- Roboto is mandatory for paragraphs, short sentences, and supporting text.
- Use ShopeeFont default or rounded for sub-brands, family brands, campaigns, features, and events under the Shopee brand unless a distinct theme or business need requires otherwise.

Localized pairing:

- English, Bahasa, Vietnamese, Portuguese, Spanish, and other Latin-script languages: ShopeeFont for header and sub-header; Roboto for body.
- Thai: ShopeeFont Rounded for header, sub-header, and body.
- Traditional Chinese, Simplified Chinese, Japanese, and Korean: Noto Sans for header, sub-header, and body.

Line height:

- Latin headers and sub-headers: minimum `1x`.
- Latin body text: minimum `1.3x`.
- Thai headers and sub-headers: minimum `1.3x`.
- Thai body text: minimum `1.4x`.

Type hierarchy:

- Pair a thicker ShopeeFont weight for headers with a lighter ShopeeFont weight for sub-headers.
- Use Bold, ExtraBold, or Black for all-uppercase headers.
- Avoid Light, Regular, and Medium for uppercase headers unless necessary.
- Do not use more than two different weights in a sentence.
- Do not distort ShopeeFont vertically or horizontally.
- Avoid overly tight kerning, overly tight line-height, overly wide line-height, and leaving one word alone on the last line.

Implementation aliases:

- Shopee Design site CSS exposes font-face names such as `Shopee2021`, `ShopeeRounded`, and `OpenSans`.
- Until official font files are stored under `assets/shopee-template/brand/fonts/`, use CSS fallbacks that prefer ShopeeFont/Shopee2021 for headings and Roboto for body.

Recommended CSS pattern:

```css
h1, h2, h3 {
  font-family: "Shopee2021 Bold", "ShopeeFont", "Roboto", Arial, sans-serif;
}

body {
  font-family: "Roboto", Arial, sans-serif;
}
```

## Illustration, Icons, And Mascots

Shopee's brand personality is `Simple, Happy, Together`.

Illustrations:

- Use the Shopee Illustration Library when available.
- Illustration adaptations should stay on brand and preserve the Simple, Happy, Together personality.
- Brand-driven applications include mega campaigns, in-app assets, corporate touchpoints, PR reports, and infographics.
- Content-driven applications can vary more for local relevance, but should remain clear and Shopee-like.

Promotional icons:

- Use Shopee promotional icons to represent product or service concepts when available.
- Icons should be expressive, distinct, and consistent with the larger Shopee asset system.

Mascots:

- Mascots should be approachable, friendly, and market-specific.
- Do not place mascots in unpleasant or contentious situations.
- Market examples in the guideline include Shopito, Sean & Sophie, Choky, Pixie & Pat, Shogi, and Xia Xiao Bian.

## Asset Intake Checklist

When official source assets are added to this skill, place them under `assets/shopee-template/brand/`:

- `assets/shopee-template/brand/logos/`
- `assets/shopee-template/brand/fonts/`
- `assets/shopee-template/brand/icons/`
- `assets/shopee-template/brand/illustrations/`
- `assets/shopee-template/brand/mascots/`
- `assets/shopee-template/brand/color-guides/`

Record any license or internal-use constraints in this file.

## Design Guidance

- Orange should usually be an accent, CTA, highlight, active tab, key stat, or campaign marker.
- Pair orange with clean white, warm off-white, or light gray surfaces for readable business decks.
- Use rounded cards, pill labels, UI chips, and dashboard-like modules to echo product and marketplace patterns.
- Keep information hierarchy crisp: short labels, large numbers, tight captions, and strong section dividers.
- Avoid overusing orange backgrounds in dense decks; it quickly becomes visually loud.
- For internal business decks, prioritize legible tables, operational clarity, and direct actionability over decorative intensity.
