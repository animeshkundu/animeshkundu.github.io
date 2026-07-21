# Spec: Homepage Visual Redesign

## Status

Implemented

## Date

2026-07-21

## Summary

Redesign the existing homepage into a restrained, product-focused landing page with an editorial hero, responsive work showcase, generous spacing, tactile surfaces, and persistent light/dark themes. The direction emphasizes clarity, material restraint, and subtle depth rather than decorative effects.

## Goals

- Lead with a concise value proposition and a visually dominant primary CTA.
- Make featured work the main proof point through a responsive, preview-led card system.
- Establish a coherent type, spacing, radius, surface, and interaction system across every homepage section.
- Keep light and dark modes equally legible and persist the visitor's explicit choice.
- Respect operating-system reduced-motion preferences in CSS and Motion for React.
- Preserve all existing routes, section anchors, labels, links, data states, and test-coupled content.

## Non-Goals

- No new runtime dependencies, content management system, or backend.
- No changes to project data, GitHub API behavior, routes, or embedded demo sources.
- No replacement of the existing Inter and JetBrains Mono fonts.
- No changes to pinned unit or E2E acceptance tests.

## Visual System

### Color

The existing cream, ink, terracotta, and teal brand colors remain, but are applied through semantic surfaces:

- Light canvas: warm cream with white elevated surfaces.
- Dark canvas: near-black with graphite elevated surfaces.
- Primary action: terracotta with high-contrast foreground.
- Secondary accent: teal, reserved for small status and privacy signals.
- Borders: low-contrast hairlines that become more visible on hover and focus.

### Typography

- Inter remains the only display and body face.
- Hero type uses a responsive `clamp()` scale, tight tracking, and balanced wrapping.
- Section headings use a consistent editorial scale with short line lengths.
- Eyebrows use compact uppercase text with generous tracking.
- Body copy remains at least 16px with relaxed line height.

### Layout and Surfaces

- Content width is capped at 1280px with fluid mobile gutters.
- Sections use generous responsive vertical rhythm.
- Cards use large radii, quiet borders, and soft shadows rather than strong gradients.
- The fixed navigation becomes a floating translucent capsule on larger screens and a full-width glass bar on mobile.
- Featured projects use a responsive two-column work grid with preview-first cards.

### Motion

- Entrance motion is limited to short opacity and vertical-offset transitions.
- Hover motion is subtle and never required to understand state.
- `MotionConfig reducedMotion="user"` disables transform and layout animation when requested by the operating system.
- CSS animations and smooth scrolling are disabled under `prefers-reduced-motion: reduce`.

## Component Changes

- `App`: apply the semantic page canvas and global Motion accessibility policy.
- `Navbar`: add floating glass treatment, larger touch targets, and a clearer theme control.
- `Hero`: use a responsive split layout with editorial copy and a product-principles visual.
- `FeaturedProjects`: make project previews the dominant visual and use rounded work cards.
- `LiveDemos`: present demo tabs and iframe inside one cohesive elevated product frame.
- `AllRepositories`: refine search, filters, cards, loading, error, and empty states.
- `About`: use a two-column narrative with a compact metric panel.
- `FAQ`: use a responsive editorial header and accessible accordion panel.
- `Contact`: turn the final CTA into a high-contrast rounded surface with clear contact rows.
- `Footer`: simplify spacing and retain all existing navigation and social links.

## Accessibility

- Preserve one `main` landmark, semantic sections, heading order, skip link, and navigation label.
- Keep all interactive controls at least 44px in both dimensions.
- Preserve the exact theme and menu `aria-label` values required by acceptance tests.
- Add `aria-pressed` to theme toggles and `aria-controls` to the mobile menu.
- Ensure focus-visible outlines remain clearly distinguishable in both themes.
- Preserve WCAG AA contrast for body text, controls, and interactive states.

## Responsive Behavior

- Mobile: stacked hero, full-width CTAs, horizontal overflow-safe tabs, single-column cards.
- Tablet: flexible two-column content where space permits.
- Desktop: split hero, floating navigation, two-column work showcase, three-column repository grid.
- No horizontal page overflow at 320px.

## Testing Strategy

- Keep `src/__tests__/App.test.tsx` unchanged as the homepage rendering contract.
- Keep `e2e/portfolio.spec.ts` unchanged as the interaction, content, theme, and responsive contract.
- Use `e2e/homepage-redesign.acceptance.spec.ts` as the executable acceptance contract for the redesigned hero, work showcase, persistent theme, mobile layout, touch targets, and reduced-motion behavior.
- Run the acceptance contract with `npx playwright test e2e/homepage-redesign.acceptance.spec.ts --reporter=line`.
- Run typecheck, lint, unit tests, coverage, production build, and Playwright E2E.
- Inspect the rendered homepage at desktop and mobile viewport sizes in both color schemes.

## References

- [Motion accessibility](https://motion.dev/docs/react-accessibility)
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [Tailwind dark mode](https://tailwindcss.com/docs/dark-mode)
