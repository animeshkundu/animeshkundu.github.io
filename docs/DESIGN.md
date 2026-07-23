# Design system

## Direction

The site is a warm evidence ledger. It should feel like a carefully edited technical notebook: clear sources, dated facts, quiet confidence, and enough visual character to be recognizable without decorative noise.

## Reference review

The July 2026 desktop and mobile review used Paco Coursey for information density, Anthropic for editorial contrast and metadata rules, and Rauno Freiberg for the value of one authored visual idea. The implementation does not copy their layouts. It combines those lessons with Animesh's public evidence and the existing terracotta warmth.

## Grid

- Maximum reading frame: 76rem
- Main page grid: 12 columns
- Body copy: 5 to 7 columns
- Proof rail: 3 to 4 columns
- Gutter: fluid from 1rem to 2rem
- Section rhythm: fluid from 4rem to 8rem
- Mobile: single content column with full-width ruled records

The home hero offsets the primary statement and evidence rail instead of centering a generic marketing block.

## Type

- Display: Georgia-compatible serif stack for evidence-led editorial scale
- Reading and UI: modern system sans stack
- Code and source labels: system monospace stack
- Fluid home heading: `clamp(3rem, 9vw, 7.5rem)`
- Page heading: `clamp(2.5rem, 7vw, 5.75rem)`
- Body: `clamp(1rem, 1.4vw, 1.18rem)`
- Measure: 68 characters for prose

## Color

### Light

- Paper: `#f3efe6`
- Paper raised: `#fbf8f1`
- Ink: `#181713`
- Muted ink: `#5f5a50`
- Rule: `#c9c0b1`
- Terracotta: `#a54127`
- Terracotta dark: `#7b2d1c`
- Teal: `#116466`

### Dark

- Paper: `#151715`
- Paper raised: `#1d211e`
- Ink: `#f3eee3`
- Muted ink: `#b9b1a3`
- Rule: `#464b45`
- Terracotta: `#ef987c`
- Teal: `#62c8c1`

Text and controls must meet WCAG 2.1 AA against their actual background in both themes.

## Components

### Evidence record

A ruled row with a source index, title, concise result, date, and direct source link. It replaces generic shadow cards where comparison matters.

### Project plate

A slightly raised surface for selected work. It combines category, artifact name, one concrete result, technology, and direct detail/source links.

### Source mark

A small monospace label such as `S-01` or `PUBLIC RECORD`. It communicates provenance and helps create the authored ledger signature.

### Buttons and links

Primary actions use a solid ink or terracotta field. Secondary actions use an underline or ruled outline. Hover movement is no more than 2px. Touch targets are at least 44px.

### Navigation

Desktop navigation remains a simple row of anchors. Mobile navigation uses a `details` summary and therefore works without JavaScript.

## Theme

Light is the no-JavaScript default. A short inline script can apply a saved or system dark preference before paint. The theme control is an enhancement and never blocks navigation or content.

## Motion

- no viewport-triggered reveal
- no initial zero opacity
- color and transform transitions only
- duration at or below 180ms
- reduced-motion mode removes all non-essential transitions and transforms

## Texture

Paper texture is produced with low-contrast CSS gradients. It must not reduce text contrast or require image downloads.

## Accessibility

- visible 3px focus ring with offset
- underlined links in prose
- semantic headings in document order
- labels remain understandable without color
- embeds have titles and adjacent fallback links
- no horizontal scrolling at 320px
