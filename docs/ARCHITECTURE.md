# Architecture

## Overview

The portfolio is an Astro 7 static site hosted on GitHub Pages. Astro renders complete route HTML at build time. Tailwind 4 compiles the CSS through Vite. React is available for narrow optional islands, but primary content and navigation do not depend on hydration.

```text
Public sources
  |  release-time snapshot scripts
  v
Committed typed snapshots
  |  Astro getStaticPaths and page rendering
  v
Static HTML + CSS + optional enhancement islands
  |  scoped GitHub Pages deployment
  v
animesh.kundus.in and /test-<branch>-<hash>/ previews
```

## Rendering model

- `output: 'static'`
- `site: 'https://animesh.kundus.in'`
- `base: VITE_BASE_PATH || '/'`
- canonical helpers ignore `base`
- link helpers include `base`
- route metadata and JSON-LD are rendered in `BaseLayout.astro`
- project pages are enumerated by `getStaticPaths()`

## Source layout

```text
src/
  components/        shared Astro presentation and optional islands
  data/              typed curated records and committed snapshots
  layouts/           document shell and metadata
  lib/               URL, SEO, repository, and essay helpers
  pages/             owned routes and build endpoints
  styles/            Tailwind 4 theme and global CSS
scripts/             snapshot, copy, screenshot, and validation tools
public/              CNAME, .nojekyll, crawler policy, icons, and OG art
```

## Data model

Changing public facts are not fetched in the critical browser rendering path. Release-time scripts produce committed JSON snapshots with an `asOf` date. The build reads those snapshots and emits durable content.

An optional client refresh may append newer repository information. A failed refresh leaves the committed content unchanged.

The writing snapshot script reads the essays RSS feed. A curated fallback is committed and used only when the feed cannot be read.

## SEO model

`BaseLayout.astro` owns shared head output. Each route provides a title, description, canonical path, schema graph, and optional social title.

Schema selection follows the artifact:

- home: `Person`, `WebSite`, `ProfilePage`
- runnable tool or extension: `SoftwareApplication`
- library, CLI, framework, or infrastructure: `SoftwareSourceCode`
- model: `CreativeWork`
- writing: `BlogPosting` or `Article` and `ItemList`

The sitemap endpoint emits production-absolute URLs and also references meaningful separately deployed same-origin surfaces.

## Same-origin deployment topology

The root user site and project repository Pages deployments share the custom domain. They do not share a build artifact.

The portfolio deploy owns root portfolio files. Project repositories continue to own paths such as `/essays/`, `/mermaid-editor/`, `/fix/`, and `/github-router/`.

A production clean-sync deletes stale root files but excludes `/test-*`. A preview clean-sync targets only its own subdirectory. The checked-in workflows implement these commands and serialize all `gh-pages` writes through the shared deployment concurrency group.

## Accessibility model

- semantic landmarks exist in the static document
- native anchors provide navigation
- a native `details` element provides mobile disclosure
- focus indication is never removed
- theme selection has a no-JavaScript default
- theme enhancement stores a preference when JavaScript is available
- reduced motion removes transitions without hiding content

## Security and privacy

- no secrets or authenticated API calls ship to the browser
- only allowlisted public artifacts are committed
- iframe capabilities are defined per tool
- direct fallback links are always present
- privacy claims require a public verification source
- external links use appropriate referrer and opener controls

## Decisions

- [ADR-0002](./ADR/0002-astro-islands-static-output.md)
- [ADR-0003](./ADR/0003-tailwind4-vite-and-scoped-pages-deploy.md)
