# Animesh Kundu public work index

[animesh.kundus.in](https://animesh.kundus.in) is an Astro static site that connects public products, models, agent systems, essays, browser tools, repositories, and source records.

Primary content is rendered as HTML and works without JavaScript. Separately deployed same-origin apps, including the essays site and browser tools, remain independent.

## Stack

- Astro 7 static output
- TypeScript 5.9
- Tailwind CSS 4 through the Vite plugin
- React 19 for optional enhancements
- Vitest and Playwright
- GitHub Pages

## Requirements

- Node.js 24 or newer
- npm

## Commands

```bash
npm ci --ignore-scripts
npm run dev
npm run typecheck
npm run lint
npm test
npm run check:copy
npm run build
npm run check:static
npm run test:e2e
./scripts/validate.sh
npm run preview -- --port 4173 --strictPort --host 127.0.0.1
```

For a branch-style local build:

```bash
VITE_BASE_PATH=/test-feature/ npm run build
```

## Structure

```text
src/
  data/       curated public records and committed snapshots
  layouts/    document and metadata shell
  lib/        URL, SEO, and data helpers
  pages/      static routes and sitemap endpoint
  styles/     Tailwind 4 theme and global design system
scripts/      snapshots, copy checks, and screenshot tooling
docs/         product, architecture, design, decisions, and specification
```

See [the redesign specification](./docs/specs/2026-07-redesign.md), [architecture](./docs/ARCHITECTURE.md), [design system](./docs/DESIGN.md), and [deployment guide](./docs/DEPLOYMENT.md).
