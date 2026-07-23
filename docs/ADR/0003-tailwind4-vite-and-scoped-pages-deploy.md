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

1. All jobs use Node.js 24 and `npm ci --ignore-scripts`.
2. CI installs Chromium, Firefox, and WebKit with their operating-system dependencies before running the multi-browser gate.
3. Production checks out `gh-pages` into a worktree and runs `rsync -a --delete --exclude '/test-*' --exclude '/.git' dist/ "$WORKTREE/"`.
4. Preview clean-syncs only `dist/` into its `test-<branch>-<hash>` directory. The readable branch slug is bounded and an eight-character SHA-256 suffix prevents distinct branch names from colliding.
5. Astro's generated `404.html` is deployed unchanged.
6. Production, preview, and cleanup writes share the `gh-pages-deploy` concurrency group.
7. Production artifact upload includes hidden files, and the static contract requires `dist/.nojekyll`, so GitHub Pages serves Astro's `_astro` assets without Jekyll filtering.
8. After updating `gh-pages`, each publishing workflow explicitly requests a Pages build. Commits created with the workflow token do not recursively trigger the branch-source Pages workflow. The request is best effort: it enables the `gh-pages` branch source if the site reports as missing, retries, and downgrades a persistent failure to a warning so an otherwise-correct deployment is not marked failed.
9. Preview artifacts run the browser contract at their configured `VITE_BASE_PATH` before publication.

Because these files control repository publishing, changes to `.github/workflows/` require human review before merge.
