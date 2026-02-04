# Preview Deployments

This repository automatically deploys preview environments for all branches (except `main`/`master`) to GitHub Pages.

## ⚠️ Initial Setup Required

**Important**: For preview deployments to work, GitHub Pages must be configured to serve from the `gh-pages` branch:

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **gh-pages** branch and **/ (root)** folder
4. Click **Save**

After this one-time setup, both production (from main) and preview deployments will work automatically.

## How It Works

### Automatic Deployment

When you push to any branch other than `main`/`master`:

1. **Tests Run**: TypeScript, ESLint, and unit tests are executed
2. **Build**: The site is built with a base path specific to your branch
3. **Deploy**: The built site is deployed to `https://animesh.kundus.in/test-{branch-name}/`

### Branch Name Sanitization

Branch names are automatically sanitized for URLs:
- Special characters are replaced with hyphens
- Converted to lowercase
- Slashes become hyphens

**Examples:**
- Branch `feature/dark-mode` → `https://animesh.kundus.in/test-feature-dark-mode/`
- Branch `fix-bug-123` → `https://animesh.kundus.in/test-fix-bug-123/`
- Branch `copilot/improve-dark-mode-design` → `https://animesh.kundus.in/test-copilot-improve-dark-mode-design/`

### Pull Request Comments

For pull requests, a bot comment is automatically posted with:
- Direct link to the preview environment
- Deploy path information
- Auto-updates with each push

### Automatic Cleanup

When a branch is deleted, its preview deployment is automatically removed from GitHub Pages to keep things tidy.

## Production Deployment

The `main`/`master` branch deploys to the root: `https://animesh.kundus.in/`

Only production builds are deployed after:
- ✅ All tests pass
- ✅ Build succeeds
- ✅ E2E tests pass

## Testing Your Changes

1. **Push to your branch**
   ```bash
   git push origin your-branch-name
   ```

2. **Wait for deployment** (usually 1-2 minutes)

3. **Visit your preview**
   ```
   https://animesh.kundus.in/test-your-branch-name/
   ```

4. **Check PR comments** for the direct link (if working in a PR)

## Troubleshooting

### Preview not working?

- Check that the GitHub Actions workflow completed successfully
- Ensure GitHub Pages is enabled in repository settings
- Verify the `gh-pages` branch exists

### Assets not loading?

The build process automatically updates asset paths. If you encounter issues:
- Check that `vite.config.ts` uses `process.env.VITE_BASE_PATH`
- Verify the workflow's base path configuration

## Workflow Files

- `.github/workflows/preview-deploy.yml` - Handles preview deployments
- `.github/workflows/cleanup-preview.yml` - Cleans up deleted branches
- `.github/workflows/deploy.yml` - Production deployment

## Notes

- Preview deployments use the `gh-pages` branch with subdirectories
- Each branch gets its own isolated preview
- Previews persist until the branch is deleted
- Multiple branches can have active previews simultaneously
