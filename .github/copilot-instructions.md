# GitHub Copilot Instructions

This file provides repository-specific instructions for GitHub Copilot to ensure consistent, high-quality code generation.

## Project Overview

This is a React 19 + TypeScript portfolio website using:
- **Framework**: React 19, TypeScript 5.9, Vite 7
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Testing**: Vitest, React Testing Library, Playwright
- **Deployment**: GitHub Pages via GitHub Actions

## Documentation First

Before making changes, read relevant documentation:
- `docs/PRD.md` - Product requirements
- `docs/ARCHITECTURE.md` - System architecture
- `docs/DESIGN.md` - Design system
- `docs/ADR/` - Architectural decision records
- `docs/AGENT.md` - Detailed agent instructions

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Unit tests
npm test

# Coverage (maintain >90%)
npm run test:coverage

# Build
npm run build

# E2E tests
npm run test:e2e
```

## Quality Requirements

For EVERY change:
1. ✅ Type check passes (`npm run typecheck`)
2. ✅ Lint passes (`npm run lint`)
3. ✅ Unit tests pass (`npm test`)
4. ✅ Build succeeds (`npm run build`)
5. ✅ E2E tests pass (`npm run test:e2e`)
6. ✅ Coverage stays >90%

## Testing Requirements

### Unit Tests
- Add tests for every new component/function
- Location: `src/__tests__/`
- Naming: `[component].test.tsx` or `[module].test.ts`

### E2E Tests
- Add tests for user-facing features
- Location: `e2e/`
- Naming: `[feature].spec.ts`

## Code Standards

### TypeScript
- Use strict mode
- Avoid `any` type
- Use explicit interfaces
- Add JSDoc for complex types

### React Components
- Functional components with hooks
- Define props interfaces
- Keep components small and focused
- Extract logic to custom hooks

### Styling
- Use Tailwind CSS utilities
- Follow design system in `docs/DESIGN.md`
- Mobile-first responsive design
- Support dark/light themes

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `FeaturedProjects.tsx` |
| Hooks | camelCase + `use` | `useGitHubRepos.ts` |
| Utilities | camelCase | `fetchRepos.ts` |
| Types | PascalCase | `Repository` |

## Component Pattern

```tsx
import { type FC } from 'react';

interface ComponentProps {
  title: string;
  items: string[];
}

export const Component: FC<ComponentProps> = ({ title, items }) => {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
```

## Documentation Updates

Update docs when:
- Adding features → `docs/PRD.md`
- Changing architecture → `docs/ARCHITECTURE.md`
- Modifying design → `docs/DESIGN.md`
- Major decisions → Create ADR in `docs/ADR/`
- Removing features → Add to `docs/history/`

## File Structure

```
src/
├── App.tsx              # Root component
├── main.tsx             # Entry point
├── index.css            # Global styles
├── components/          # React components
│   └── index.ts         # Barrel exports
├── hooks/               # Custom hooks
├── lib/                 # Utilities
├── types/               # TypeScript types
└── __tests__/           # Unit tests

e2e/                     # E2E tests
docs/                    # Documentation
```

## Security

- Never commit secrets
- Use environment variables
- Sanitize user inputs
- Keep dependencies updated

## Performance

- Keep bundle size small
- Use lazy loading appropriately
- Optimize images
- Monitor Core Web Vitals

---

**Priority**: Quality > Speed. Understand the codebase, write tests, maintain docs.
