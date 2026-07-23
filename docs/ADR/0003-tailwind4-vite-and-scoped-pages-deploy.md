# ADR-0003: Tailwind 4 Vite integration and scoped Pages deployment

## Status

Accepted, 2026-07-22.

## Context

Astro 7 is incompatible with the deprecated Astro Tailwind integration. Tailwind 4 supports a Vite plugin and CSS-first tokens. The existing Pages workflow retains stale root output when files disappear, while branch previews must survive production deploys.

## Decision

Use `@tailwindcss/vite` and a single `src/styles/global.css` token source. Dark mode is a CSS custom variant. PostCSS and Autoprefixer configuration are removed from the production path.

Production deployment clean-syncs `dist/` into the `gh-pages` worktree root using `rsync --delete`, excluding `.git` and `/test-*`. Preview deployment clean-syncs only its `/test-<branch>-<hash>/` directory. `CNAME` and `.nojekyll` ship from `public/`.

## Consequences

- Design tokens and utilities compile through Astro's Vite pipeline.
- Removed root routes and hashed assets do not become ghost pages.
- Preview directories remain intact during production release.
- Separately deployed project Pages repositories remain independent.
- The SPA index-to-404 copy is not part of the Astro deployment model.

## Workflow implementation

The checked-in production, preview, and cleanup workflows implement this decision:

1. All jobs use Node.js 22 and `npm ci --ignore-scripts`.
2. CI installs Chromium, Firefox, and WebKit with their operating-system dependencies before running the multi-browser gate.
3. Production checks out `gh-pages` into a worktree and runs `rsync -a --delete --exclude '/test-*' --exclude '/.git' dist/ "$WORKTREE/"`.
4. Preview clean-syncs only `dist/` into its `test-<branch>-<hash>` directory. The readable branch slug is bounded and an eight-character SHA-256 suffix prevents distinct branch names from colliding.
5. Astro's generated `404.html` is deployed unchanged.
6. Production, preview, and cleanup writes share the `gh-pages-deploy` concurrency group.

Because these files control repository publishing, changes to `.github/workflows/` require human review before merge.
