# ADR-0002: Astro static output with narrow islands

## Status

Accepted, 2026-07-22. Supersedes the rendering decision in ADR-0001.

## Context

The previous React SPA required JavaScript for primary content and route metadata. Viewport animations could leave full-page captures blank. GitHub Pages provides static files without a server runtime, and the required route set must work at the production root and in branch subdirectories.

## Decision

Use Astro 7 with `output: 'static'`. Astro components render the complete document and primary interaction surfaces. React remains available only for optional enhancements that cannot improve by replacing static content.

`site` is the production origin. `base` comes from `VITE_BASE_PATH`. Canonical helpers always use the production origin.

## Alternatives

- React Router framework prerendering could emit static routes, but introduces a framework-mode migration and client data files for a content-first site.
- Browser-based post-build prerendering adds a fragile second rendering system.
- The existing SPA cannot satisfy initial-HTML and no-JavaScript requirements.

## Consequences

- Every route has crawlable HTML by default.
- Navigation and project links do not depend on hydration.
- JavaScript is an enhancement, not a content delivery requirement.
- Route data and metadata are generated at build time.
- The prior CSR entry is no longer the production entry.
