# Spec: Persistent Theme Preference

## Status
Implemented

## Author
GitHub Copilot

## Date
2026-07-21

## Summary
Harden the existing header theme toggle so the initial theme is applied before
paint, explicit choices persist in `localStorage`, and the operating-system
preference remains authoritative until the user makes a choice.

## Background
The shared `Navbar` already exposes accessible light/dark controls and
`useTheme` already applies the `dark` class. The class is currently applied
after React mounts, which can briefly paint the light theme for dark-mode
visitors. The hook also writes its initial system-derived value to storage, so
later operating-system changes are no longer followed even though the user has
not explicitly selected a theme.

## Goals
- Apply the saved or system theme before the first paint.
- Keep `dark` on `document.documentElement` as the Tailwind theme contract.
- Persist only an explicit light or dark choice under the `theme` key.
- Follow `prefers-color-scheme` changes while no explicit choice exists.
- Preserve the existing desktop/mobile controls and accessible labels.

## Non-Goals
- Add a third, user-facing "system" control.
- Change the dark or light color palettes.
- Synchronize theme changes between already-open browser tabs.

## Technical Design

### Overview
A small blocking script in `index.html` reads a valid saved value (`dark` or
`light`), falls back to `matchMedia('(prefers-color-scheme: dark)')`, and
toggles the root `dark` class before styles and React render the page.

`useTheme` initializes from the same precedence rules. It updates the root
class after state changes, stores a value only after an explicit toggle, and
listens for operating-system changes only while its preference state is
unset.

### API/Interface
The existing hook contract remains unchanged:

```ts
useTheme(): {
  isDark: boolean;
  toggle: () => void;
}
```

Storage contract:

```text
key: theme
values: dark | light
```

### Data Flow
1. Before paint, `index.html` applies a valid stored theme or the current OS
   theme to the root element.
2. `useTheme` initializes React state using the same precedence.
3. A header toggle updates React state, the root class, and `localStorage`.
4. Without a stored choice, an OS theme change updates React state and the
   root class without creating a stored choice.

### Component Structure
No component structure changes are required. `Navbar` continues to consume
`useTheme` and render one control per responsive layout.

### State Management
The hook tracks both the effective dark-mode boolean and an optional explicit
preference. A `null` preference means the effective value comes from the
operating system.

### Error Handling
- Invalid stored values are ignored and treated as no preference.
- Unavailable or denied storage access does not block system-theme detection;
  the hook reports the storage error and continues with in-memory state.
- Missing `matchMedia` support falls back to light mode.

## Security Considerations
The inline script uses only fixed storage values and does not inject stored
content into markup. Storage access is narrowly guarded because browsers can
deny it in privacy-restricted contexts.

## Performance Considerations
The blocking script is intentionally small and runs before paint to prevent a
light-theme flash. It performs no network requests and adds no dependency.

## Testing Strategy
- Unit tests: saved-value precedence, OS fallback and changes, explicit
  persistence, cleanup, invalid values, and storage failures.
- E2E tests: OS dark mode on first load, root-class toggling, saved-value
  persistence, and reload behavior.
- Coverage target: >90%.

## Rollout Plan
Ship the static HTML, hook, and tests together with no feature flag because the
public hook and UI contracts are unchanged.

## Open Questions
- None.

## References
- [Product theme requirements](../PRD.md#9-theme-support)
- [Design theme behavior](../DESIGN.md#dark-mode-implementation)
- [Tailwind dark mode](https://tailwindcss.com/docs/dark-mode)
- [MDN prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)
