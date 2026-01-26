# Spec: GitHub Pages Links & Mobile All Projects Layout

## Status
Implemented

## Author
GitHub Copilot (Orchestrator)

## Date
2026-01-26

## Summary
Ensure GitHub Pages links are correctly surfaced for repositories and improve the All Projects layout for mobile/tablet while keeping desktop unchanged, plus feature the `oops` repository alongside `gist-preview` on the home page.

## Background
We recently enabled GitHub Pages on several repositories. The portfolio should surface accurate live links for any repo that has GitHub Pages (or a configured homepage). Additionally, the All Projects layout needs mobile/tablet refinements to make controls and cards easier to scan and tap.

## Goals
- Derive live/demo links from repository metadata so new GitHub Pages sites are reflected automatically.
- Add `oops` to featured projects alongside `gist-preview` on the homepage.
- Improve All Projects layout on mobile/tablet without altering desktop layout.

## Non-Goals
- No new backend services or APIs.
- No redesign of desktop layouts or global theming.
- No additions to the Live Demos carousel beyond existing entries.

## Technical Design

### Overview
- Add a helper to derive the demo URL from GitHub repository data (`homepage` preferred, `has_pages` fallback).
- Use the helper in the All Repositories section to render accurate live links.
- Update featured project data to include `oops`.
- Adjust mobile/tablet layout styles for the All Projects sections.

### API/Interface
```ts
export function getRepositoryDemoUrl(repo: Repository, username: string): string | null;
```

### Data Flow
1. `useGitHubRepos` fetches repositories.
2. `AllRepositories` calls `getRepositoryDemoUrl` for each repository.
3. If a URL is returned, render the Demo link pointing to that URL.

### Component Updates
- `AllRepositories`: responsive layout tweaks + demo URL helper.
- `FeaturedProjects`: add `oops` data entry.
- `ProjectsIndex`: adjust All Projects layout responsiveness for mobile/tablet.

### Error Handling
- If demo URL is missing, omit the Demo link.
- If homepage lacks protocol, prepend `https://`.

## Security Considerations
- Only render user-provided URLs with `rel="noopener noreferrer"` (already in use).

## Performance Considerations
- Demo URL helper is synchronous and cheap.
- No additional network requests.

## Testing Strategy
- Unit tests for `getRepositoryDemoUrl` in `src/__tests__/github.test.ts`.
- Existing E2E coverage remains.

## Rollout Plan
- Implement changes in a single PR and run existing validation scripts.

## Open Questions
- None.

## References
- docs/PRD.md (Responsiveness requirements)
- docs/DESIGN.md (Responsive layout guidance)
