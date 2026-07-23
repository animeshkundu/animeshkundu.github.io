# Deployment

> The build, validation, preview, and scoped GitHub Pages deployment contract below is implemented in the checked-in workflows. Workflow changes require human review before merge.

## Requirements

- Node.js 24 or newer
- npm lockfile install
- GitHub Pages custom domain `animesh.kundus.in`

## Build modes

Production:

```bash
npm ci --ignore-scripts
npm run build
```

Preview:

```bash
VITE_BASE_PATH=/test-feature-name-a1b2c3d4/ npm run build
```

Astro prefixes local routes and assets with `base`. Canonical, Open Graph, and sitemap URLs remain rooted at `https://animesh.kundus.in`.

## Local inspection

```bash
npm run build
npm run preview -- --port 4173 --strictPort --host 127.0.0.1
```

## Production Pages sync

The production workflow checks out the `gh-pages` branch into a worktree and clean-syncs the build:

```bash
rsync -a --delete \
  --exclude '/test-*' \
  --exclude '/.git' \
  dist/ "$WORKTREE/"
```

This removes root ghost pages and old hashed assets while preserving branch previews. `public/CNAME` and `public/.nojekyll` are emitted into `dist/` on every build.

The production build crosses a GitHub Actions artifact boundary before deployment. Artifact upload must opt into hidden files so `.nojekyll` reaches the `gh-pages` root. Without it, GitHub Pages runs Jekyll, drops Astro's `_astro` asset directory, and publishes unstyled HTML. `npm run check:static` rejects any build that does not contain the marker.

## Preview Pages sync

Each branch owns one collision-resistant directory. The workflow combines a bounded readable slug with the first eight characters of the branch name's SHA-256 digest:

```bash
rsync -a --delete dist/ "$WORKTREE/test-$BRANCH_SLUG-$BRANCH_HASH/"
```

The production and preview jobs must share a `gh-pages-deploy` concurrency group so worktree writes are serialized. They must use Node.js 24, install all three Playwright engines with `--with-deps`, and run `./scripts/validate.sh`.

## Independent same-origin apps

Paths such as `/essays/`, `/mermaid-editor/`, `/fix/`, and `/github-router/` are deployed from their own repositories. The root portfolio build links to them but does not include or delete their artifacts.

## 404 behavior

`src/pages/404.astro` emits `dist/404.html`. The build does not copy `index.html` to `404.html` and does not rely on SPA fallback routing.

## Release checklist

1. Refresh repository, surface, and essay snapshots.
2. Run the copy check and quality commands.
3. Build at root and with a representative preview base.
4. Inspect canonical URLs in both outputs.
5. Capture full-page screenshots for owned canonical routes.
6. Clean-sync the intended deployment scope.
7. Obtain human review for workflow changes before merge.
