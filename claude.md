# Claude Agent Instructions

> **This file is synchronized with `.github/copilot-instructions.md`**

## Pre-Task Protocol

**MANDATORY**: Before responding to ANY request, you MUST:

1. **Read Agent Instructions**: Review `docs/agent-instructions/` for core protocols
2. **Check ADRs**: Examine `docs/ADR/` for past architectural decisions
3. **Review Specs**: Look for existing specifications in `docs/specs/`
4. **Understand Context**: Read relevant documentation before making changes

## Project Overview

This is a React 19 + TypeScript portfolio website:

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
├── specs/                  # Technical specifications
├── architecture/           # System diagrams & patterns
├── ADR/                    # Architectural Decision Records
├── history/                # Deprecated feature docs
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
- **If unsure, search the internet**. Do not hallucinate APIs or patterns
- Verify library versions before using examples
- Check official documentation for current best practices
- Research until you reach information saturation

### 3. Test Everything
- Maintain **>90% code coverage**
- Write tests before or alongside implementation
- Run `./scripts/validate.sh` before committing

### 4. Self-Validate
- Always verify your own work before completion
- Run the full validation suite
- Check for regressions

## Commands Reference

```bash
# Development
npm install            # Install dependencies
npm run dev            # Development server

# Quality Checks
npm run typecheck      # Type checking
npm run lint           # Linting
npm test               # Unit tests
npm run test:coverage  # Coverage report
npm run build          # Build
npm run test:e2e       # E2E tests

# Full Validation
./scripts/validate.sh  # Run all quality checks
```

## Quality Gates

For EVERY change, ensure:

- [x] Type check passes (`npm run typecheck`)
- [x] Lint passes (`npm run lint`)
- [x] Unit tests pass (`npm test`)
- [x] Build succeeds (`npm run build`)
- [x] E2E tests pass (`npm run test:e2e`)
- [x] Coverage stays >90%

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

## File Organization

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

## Code Standards

### TypeScript
- Use strict mode
- Avoid `any` type
- Use explicit interfaces
- Add JSDoc for complex types

### React
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

## Testing Standards

### Unit Tests
- Location: `src/__tests__/`
- Framework: Vitest + React Testing Library
- Naming: `[component].test.tsx`

### E2E Tests
- Location: `e2e/`
- Framework: Playwright
- Naming: `[feature].spec.ts`

## Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Sanitize any user inputs
- Keep dependencies updated

## When Uncertain

1. **Search** - Look it up, don't guess
2. **Reference** - Check official documentation
3. **Ask** - Request clarification if needed
4. **Document** - Note the source of information

---

**Remember**: Quality over speed. Understand the codebase, write tests, maintain documentation.
