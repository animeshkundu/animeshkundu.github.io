# Spec: Homepage Visual Redesign

## Status
Implemented

## Date
2026-07-22

## Summary
Refresh the existing homepage into a more distinctive, responsive single-page portfolio while retaining its content model, routes, section order, accessibility labels, and established warm visual identity.

## Goals
- Give the hero a stronger editorial composition with a compact proof-of-work panel.
- Present featured projects as a responsive bento-style grid sourced from `FEATURED_PROJECTS`.
- Make the fixed navigation and theme control feel polished in both themes.
- Preserve smooth in-page navigation and disable non-essential motion when the visitor prefers reduced motion.
- Keep the selected light or dark theme across reloads and avoid a theme flash before React mounts.

## Non-Goals
- Changing homepage copy that is part of the existing test contract.
- Reordering or removing homepage sections.
- Replacing React, Tailwind, Framer Motion, or the GitHub Pages routing strategy.
- Adding project content outside the existing project constants.

## Visual Direction
- Retain the cream, ink, terracotta, and teal palette.
- Use large editorial type, rounded surfaces, hairline borders, and subtle grid/radial backgrounds.
- Use a two-column hero on large screens and a single-column layout on mobile.
- Let the first and fourth featured projects occupy wider grid positions on large screens while every card remains equal-width and readable on small screens.
- Use short transform/opacity transitions only; no motion is required to understand content.

## Technical Design

### Hero
- Keep the existing heading, subtitle, CTA labels, and anchor destinations.
- Add a decorative project activity panel made from semantic HTML and CSS.
- Continue sourcing repository statistics from `STATS`.

### Featured Projects
- Continue filtering `FEATURED_PROJECTS` by `featured`.
- Derive card placement from the project index only; never duplicate project data in the component.
- Keep project preview components, source links, demo links, language, stars, forks, highlights, and technologies.

### Navigation and Theme
- Keep all desktop/mobile labels and `aria-label` values unchanged.
- Keep the fixed navigation and mobile menu behavior.
- Initialize the root theme class in `index.html` from the `theme` localStorage key before the app loads.
- Keep `useTheme` as the source of truth for toggling and persistence.

### Scrolling and Motion
- Retain `scroll-behavior: smooth` and section hash links.
- Add `scroll-margin-top` so fixed navigation does not obscure anchored sections.
- Disable smooth scrolling, animations, and transition delays under `prefers-reduced-motion: reduce`.

## Accessibility
- Preserve the skip link and semantic section hierarchy.
- Keep touch targets at least 44px on interactive icon controls.
- Maintain visible focus styles and WCAG AA contrast in both themes.
- Mark purely decorative hero artwork as hidden from assistive technology.

## Responsive Acceptance Criteria
- At 375px, hero content, CTAs, project cards, and navigation fit without horizontal overflow.
- At tablet widths, project cards use two columns.
- At large widths, hero uses two columns and featured projects form an asymmetric three-column grid.

## Test Contract
- Preserve exact labels, headings, section IDs, routes, placeholders, and accessibility names asserted by:
  - `src/__tests__/App.test.tsx`
  - `e2e/portfolio.spec.ts`
- Keep the pinned tests unchanged and add the redesign acceptance contract at
  `e2e/homepage-redesign.spec.ts`.
- Verify the selected theme remains after `page.reload()`.

## Validation
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run test:coverage`
- `npm run build`
- `npm run test:e2e`
- `./scripts/validate.sh`
