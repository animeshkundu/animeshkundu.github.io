# Deployment

> The build, validation, preview, and scoped GitHub Pages deployment contract below is implemented in the checked-in workflows. Workflow changes require human review before merge.

## Requirements

- Node.js 24 or newer
- npm lockfile install
- GitHub Pages custom domain `animesh.kundus.in`

## Required repository configuration

GitHub Pages is served from the `gh-pages` branch:

- **Settings → Pages → Source**: `Deploy from a branch` → `gh-pages` / `(root)`.

The deploy, preview, and cleanup workflows push the built site to `gh-pages`.
GitHub only rebuilds a branch-sourced Pages site when the triggering push comes
from a real identity. Pushes authenticated with the workflow's default
`GITHUB_TOKEN` **do not** trigger the automatic `pages build and deployment`,
and the legacy `POST /pages/builds` API returns `403 Resource not accessible by
integration` for that token. Content therefore lands on `gh-pages` but never
goes live.

To make pushes trigger a rebuild, the workflows push over SSH using a repository
**deploy key**. Configure it once:

1. Generate a dedicated key pair (no passphrase):

   ```bash
   ssh-keygen -t ed25519 -C "gh-pages deploy" -f gh-pages-deploy -N ""
   ```

2. **Settings → Deploy keys → Add deploy key**: paste the contents of
   `gh-pages-deploy.pub`, tick **Allow write access**.
3. **Settings → Secrets and variables → Actions → New repository secret**: name
   it `ACTIONS_DEPLOY_KEY` with the contents of the private `gh-pages-deploy`
   file.
4. Delete the local key files.

The shared `.github/actions/setup-pages-push` composite action selects the SSH
transport when `ACTIONS_DEPLOY_KEY` is present. If the secret is missing it
falls back to the workflow token and prints a warning, because that path commits
to `gh-pages` but cannot trigger a Pages rebuild.

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

The production and preview jobs must share a `gh-pages-deploy` concurrency group so worktree writes are serialized. They must use Node.js 24, install all three Playwright engines with `--with-deps`, and run `./scripts/validate.sh`. The preview `deploy-preview` job additionally installs the Playwright engines because it re-runs the browser contract against the built preview artifact at its configured `VITE_BASE_PATH` before publishing.

## Triggering the Pages rebuild

Every workflow that writes to `gh-pages` (`deploy`, `preview-deploy`, and
`cleanup-preview`) first runs the `.github/actions/setup-pages-push` composite
action and then pushes with `git push "$PAGES_PUSH_REMOTE" HEAD:gh-pages`. When
the `ACTIONS_DEPLOY_KEY` deploy key is configured, `$PAGES_PUSH_REMOTE` is the
SSH remote, so the push is authored by the deploy key and GitHub automatically
runs `pages build and deployment` to publish the new commit. No Pages REST API
call is made.

Because GitHub only rebuilds a branch-sourced site when it receives a **new
push**, the deploy step pushes an **empty commit** over the deploy key whenever
the built output is byte-identical to what is already on `gh-pages`. This
guarantees the live site always reflects the current `gh-pages` tree, including
after a re-run or after content was previously committed by a push that did not
trigger a build. When no deploy key is configured the empty-commit fallback is
skipped, since a token-authored push cannot trigger a rebuild anyway.

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
