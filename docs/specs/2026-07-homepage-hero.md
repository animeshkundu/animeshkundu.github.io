# Spec: Homepage Hero

## Status
Implemented

## Author
GitHub Copilot

## Date
2026-07-18

## Summary
Refine the existing homepage hero into a prominent, accessible introduction that leads visitors to featured projects and live demos without duplicating the section or changing its established navigation contract.

## Background
The homepage already renders `Hero` as the first section in `<main>`. This work formalizes that behavior and strengthens the section's visual hierarchy, semantic labeling, and responsive presentation while preserving the copy and destinations visitors and tests already rely on.

## Goals
- Keep the hero as the first homepage section and the page's only level-one heading.
- Present a clear headline containing "I build tools" and a concise introduction beginning "Full-stack developer".
- Keep prominent CTA links named "Explore Projects" and "Try Live Demos" targeting `#projects` and `#demos`.
- Improve visual prominence with a responsive editorial layout and supporting proof points.
- Ensure decorative elements are hidden from assistive technologies.

## Non-Goals
- Adding a second hero or changing homepage section order.
- Introducing new dependencies, application state, or network requests.
- Renaming the established CTA links or changing their destinations.
- Changing the featured projects or live demos themselves.

## Technical Design

### Overview
Enhance `src/components/Hero.tsx` in place. The section will use `aria-labelledby` to expose its heading as the region name, retain the existing Framer Motion entrance pattern, and use Tailwind utilities for a responsive split layout. The primary content remains first in source order; a compact capability panel supplements it on larger screens and stacks below it on smaller screens.

### API/Interface
`Hero` remains a prop-free named export:

```ts
export function Hero(): JSX.Element;
```

No public API or shared type changes are required.

### Data Flow
Static hero copy and CTA destinations render directly in `Hero`. The existing `STATS.totalStars` constant supplies the GitHub proof point; no new data source is introduced.

### Component Structure
- Labeled hero `<section>` as the first child of homepage `<main>`.
- Primary content: status badge, single `<h1>`, introduction, and CTA group.
- Supporting content: an accessible feature list and visual capability panel.
- Decorative background and accent elements marked `aria-hidden="true"`.

### State Management
No state is required.

### Error Handling
The hero has no asynchronous work or expected runtime error state.

## Security Considerations
All CTA destinations are same-page fragments. No user input or external URL is introduced.

## Performance Considerations
The enhancement uses CSS utilities, existing icon components, and transform/opacity animations. It adds no image assets, network requests, or dependencies.

## Testing Strategy
- Unit tests: verify the labeled section, single level-one heading, introduction, and CTA names/destinations.
- E2E tests: verify the hero is the first homepage section and both CTA destinations remain correct.
- Coverage target: maintain the repository's >90% target.

## Rollout Plan
Ship as a single homepage enhancement with no feature flag or migration.

## Open Questions
- None.

## References
- [Product Requirements: Hero Section](../PRD.md#1-hero-section)
- [Design: Hero Section](../DESIGN.md#hero-section)
- [ADR-0001: Initial Technology Stack Selection](../ADR/0001-initial-tech-stack.md)
