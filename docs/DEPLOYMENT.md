# Deployment Guide

This document explains how the website is deployed to GitHub Pages, including both production and preview deployments.

## Overview

The website uses GitHub Pages for hosting with two deployment modes:

1. **Production Deployment**: Deploys from `master`/`main` branch to `https://animeshkundu.github.io/`
2. **Preview Deployment**: Deploys feature branches to `https://animeshkundu.github.io/test-{branch-name}/`

## How It Works

### Vite Configuration

The `vite.config.ts` uses an environment variable for the base path:

```typescript
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  // ...
});
```

- **Production**: `VITE_BASE_PATH` is not set, defaults to `/`
- **Preview**: `VITE_BASE_PATH` is set to `/test-{branch-name}/`

This ensures all asset paths (CSS, JS, images) are correctly prefixed.

### React Router Configuration

The website uses different routing strategies based on deployment location:

**Production (root path `/`)**: Uses `BrowserRouter` for clean URLs
```
https://animeshkundu.github.io/projects
https://animeshkundu.github.io/project/youtube-audio
```

**Preview (subdirectory `/test-{branch}/`)**: Uses `HashRouter` to work around GitHub Pages limitations
```
https://animeshkundu.github.io/test-branch/#/projects
https://animeshkundu.github.io/test-branch/#/project/youtube-audio
```

```typescript
// In src/App.tsx
const rawBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const isSubdirectory = rawBasePath !== '';

function App() {
  // Use HashRouter for subdirectory deployments (preview builds)
  // Use BrowserRouter for root deployments (production)
  if (isSubdirectory) {
    return (
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    );
  }
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
```

Key points:
- `import.meta.env.BASE_URL` is set by Vite from `VITE_BASE_PATH`
- Production uses BrowserRouter for SEO-friendly URLs
- Preview uses HashRouter because GitHub Pages 404.html only works at repository root

### Why HashRouter for Previews?

GitHub Pages is a static file server. The `404.html` trick (copying `index.html` to `404.html`) only works at the repository root. For subdirectory deployments like `/test-branch/projects`, GitHub Pages will serve the root `404.html`, not the subdirectory's.

HashRouter solves this by putting the route after a `#` symbol, which browsers don't send to the server. The URL `/test-branch/#/projects` always loads `/test-branch/index.html` and React Router handles the routing client-side.

To handle this, we copy `index.html` to `404.html`:

```yaml
# In preview-deploy.yml (within "Update base path in built files" step)
cp dist/index.html dist/404.html

# In deploy.yml (separate step)
- name: Copy index.html to 404.html for SPA routing
  run: cp dist/index.html dist/404.html
```

When GitHub Pages can't find a file, it serves `404.html`, which loads the SPA. React Router then handles the routing on the client side.

## Workflow Files

### Production (`deploy.yml`)

Triggered on push to `master` or `main` branch:

1. Lint and type check
2. Run unit tests
3. Build the site
4. Copy `index.html` to `404.html`
5. Run E2E tests
6. Deploy to root of `gh-pages` branch

### Preview (`preview-deploy.yml`)

Triggered on push to any non-main branch or PRs:

1. Lint and type check
2. Run unit tests
3. Extract and sanitize branch name
4. Build with `VITE_BASE_PATH=/test-{branch-name}/`
5. Update asset paths in HTML files
6. Copy `index.html` to `404.html`
7. Deploy to `test-{branch-name}/` directory on `gh-pages` branch
8. Comment on PR with preview URL

## Testing a Preview

1. Push to any branch (not `master`/`main`)
2. Wait for CI to complete (~2 minutes)
3. Visit `https://animeshkundu.github.io/test-{branch-name}/`

Branch names are sanitized:
- `feature/dark-mode` becomes `test-feature-dark-mode`
- `copilot/improve-design` becomes `test-copilot-improve-design`

## Troubleshooting

### Preview shows blank page

1. **Check CI status**: Ensure the Preview Deployment workflow succeeded
2. **Check browser console**: Look for 404 errors on assets
3. **Verify base path**: The `VITE_BASE_PATH` must match the deployment directory

### Routes don't work on refresh

1. **Ensure 404.html exists**: Check that `index.html` was copied to `404.html`
2. **Check basename**: The BrowserRouter `basename` must match the subpath

### Assets not loading

1. **Check Vite base config**: `base` in `vite.config.ts` must use `VITE_BASE_PATH`
2. **Check HTML updates**: Asset paths in HTML should be prefixed with the deploy path

## Architecture Decisions

### Why BrowserRouter instead of HashRouter?

- **Clean URLs**: `/project/youtube-audio` vs `/#/project/youtube-audio`
- **Better SEO**: Search engines prefer path-based URLs
- **Standard practice**: Most modern SPAs use BrowserRouter

### Why copy to 404.html?

GitHub Pages serves `404.html` for unknown paths. By making it identical to `index.html`, we let the SPA handle routing while still supporting direct URL access and page refreshes.

### Why use environment variables for base path?

- **Single codebase**: Same code works for root and subpath deployments
- **Build-time configuration**: No runtime detection needed
- **Vite integration**: Works seamlessly with Vite's built-in base path handling

## Related Documentation

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Router Deployment Guide](https://reactrouter.com/en/main/guides/deployment)
- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
