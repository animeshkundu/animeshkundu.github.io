# GitHub Copilot Instructions

> **This file is synchronized with `claude.md` in the repository root.**

This file provides repository-specific instructions for GitHub Copilot to ensure consistent, high-quality code generation.

## Pre-Task Protocol (MANDATORY)

**Before responding to ANY request, you MUST:**

1. **Read Agent Instructions**: Review `docs/agent-instructions/` for core protocols
   - `00-core-philosophy.md` - Fundamental principles
   - `01-research-and-web.md` - Research requirements
   - `02-testing-and-validation.md` - Testing standards
   - `03-tooling-and-pipelines.md` - Automation guidelines
2. **Check ADRs**: Examine `docs/ADR/` for past architectural decisions
3. **Review Specs**: Look for existing specifications in `docs/specs/`
4. **If Unsure, Search**: Use web search to verify best practices - do NOT hallucinate APIs

## Project Overview

This is a React 19 + TypeScript portfolio website using:
- **Framework**: React 19, TypeScript 5.9, Vite 7
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Testing**: Vitest, React Testing Library, Playwright
- **Deployment**: GitHub Pages via GitHub Actions

## Documentation Hierarchy

```
docs/
├── agent-instructions/     # 🔴 READ FIRST - Agent protocols
│   ├── 00-core-philosophy.md
│   ├── 01-research-and-web.md
│   ├── 02-testing-and-validation.md
│   └── 03-tooling-and-pipelines.md
├── specs/                  # Technical specifications (write before code)
├── architecture/           # System diagrams & patterns
├── ADR/                    # Architectural Decision Records
├── history/                # Deprecated feature documentation
├── PRD.md                  # Product requirements
├── ARCHITECTURE.md         # System architecture
├── DESIGN.md               # Design system
└── AGENT.md                # Detailed agent workflow
```

## Core Principles

### 1. Docs = Code
- **Never** write code without updating documentation first
- Create specs in `docs/specs/` before implementation
- Update `docs/architecture/` for structural changes
- Create ADRs in `docs/ADR/` for significant decisions

### 2. Research First
- **If unsure, search the internet** - do not hallucinate APIs or patterns
- Verify library versions before using examples
- Research until you reach information saturation

### 3. Test Everything
- Maintain **>90% code coverage**
- Write tests before or alongside implementation (TDD)
- Run `./scripts/validate.sh` before committing

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

# Full Validation (run before committing)
./scripts/validate.sh
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
scripts/                 # Automation scripts
docs/                    # Documentation
```

## Modification Protocol

When modifying code:

1. **Identify Affected Docs**: What documentation needs updating?
2. **Check for Specs**: Does a spec exist? Follow it or update it
3. **Verify No ADR Conflicts**: Ensure changes don't contradict past decisions
4. **Update Docs First**: Documentation before implementation
5. **Write Tests**: TDD approach - tests first or alongside
6. **Implement**: Make the code changes
7. **Validate**: Run `./scripts/validate.sh`
8. **Document Changes**: Update any remaining documentation

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

## When Uncertain

1. **Search** - Look it up, don't guess
2. **Reference** - Check official documentation
3. **Ask** - Request clarification if needed
4. **Document** - Note the source of information

---

**Priority**: Quality > Speed. Understand the codebase, write tests, maintain docs.
