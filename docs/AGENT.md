# AGENT.md - LLM Agent Instructions

This document provides instructions for Large Language Model (LLM) agents working on the Animesh Kundu Portfolio project.

## Getting Started

### First Steps

Before making any changes, always:

1. **Read the Documentation**
   ```
   docs/
   ├── PRD.md           # Product requirements and features
   ├── ARCHITECTURE.md  # System architecture and decisions
   ├── DESIGN.md        # Design system and UI guidelines
   ├── ADR/             # Architectural decision records
   └── history/         # Deprecated features documentation
   ```

2. **Understand the Project Structure**
   ```
   src/
   ├── components/      # Shared Astro presentation
   ├── data/            # Typed records and dated snapshots
   ├── layouts/         # Static document shell
   ├── lib/             # Utilities and schema helpers
   ├── pages/           # Owned routes and endpoints
   └── __tests__/       # Unit and render tests
   
   e2e/                 # End-to-end tests
   ```

3. **Check Existing Patterns**
   - Review similar components before creating new ones
   - Follow established naming conventions
   - Maintain consistency with existing code style

## Development Workflow

### For Every Change

Execute these steps in order:

```bash
# 1. Install the committed dependency graph
npm ci --ignore-scripts

# 2. Type check
npm run typecheck

# 3. Lint
npm run lint

# 4. Run unit and Astro render tests with enforced coverage
npm test

# 5. Build
npm run build

# 6. Run E2E tests
npm run test:e2e
```

### Quality Gates

All changes MUST:
- ✅ Pass TypeScript type checking (`npm run typecheck`)
- ✅ Pass linting (`npm run lint`)
- ✅ Pass all unit tests (`npm test`)
- ✅ Build successfully (`npm run build`)
- ✅ Pass all E2E tests (`npm run test:e2e`)

## Testing Requirements

### Coverage Target

Maintain **>90% code coverage** for all code.

```bash
# Check coverage
npm run test:coverage
```

### Unit Tests

- Location: `src/__tests__/`
- Framework: Vitest + Astro Container API
- Naming: `[surface].test.ts`

**For every new component or function:**
```typescript
// Example: src/__tests__/NewComponent.test.ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import NewComponent from '../components/NewComponent.astro';

describe('NewComponent', () => {
  it('renders correctly', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NewComponent);
    expect(html).toContain('Expected content');
  });

  // Test edge cases
  // Test user interactions
  // Test error states
});
```

### E2E Tests

- Location: `e2e/`
- Framework: Playwright
- Naming: `[feature].spec.ts`

**For every new feature:**
```typescript
// Example: e2e/new-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('New Feature', () => {
  test('should work as expected', async ({ page }) => {
    await page.goto('/');
    // Test user flows
  });
});
```

## Documentation Requirements

### When to Update Docs

Update documentation when:
- Adding new features → Update PRD.md
- Changing architecture → Update ARCHITECTURE.md
- Modifying design system → Update DESIGN.md
- Making architectural decisions → Create new ADR
- Removing/deprecating features → Add to history/

### Creating ADRs

For significant architectural decisions:

1. Create: `docs/ADR/XXXX-descriptive-title.md`
2. Follow the template in `docs/ADR/README.md`
3. Update the ADR index in README.md

### Recording History

For deprecated/removed features:

1. Create: `docs/history/YYYY-MM-feature-name.md`
2. Follow the template in `docs/history/README.md`
3. Update the history index in README.md

## Code Standards

### TypeScript

- Use strict mode (already configured)
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Document complex types with JSDoc comments

### Astro and optional islands

- Render primary content in `.astro` files
- Keep navigation and fallbacks functional without JavaScript
- Use React only for progressive enhancement
- Use explicit TypeScript props interfaces

### Styling

- Use Tailwind CSS utility classes
- Follow the design system in `docs/DESIGN.md`
- Maintain responsive design (mobile-first)
- Support both light and dark themes

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProjectCard.astro` |
| Pages | Route directories | `pages/repositories/index.astro` |
| Utilities | camelCase | `canonicalUrl.ts` |
| Types | PascalCase | `Repository` |
| Files | PascalCase (components), camelCase (others) | - |

## Common Tasks

### Adding a New Component

1. Create component in `src/components/`
2. Add a Container API render test in `src/__tests__/`
3. Add E2E tests if user-facing
4. Update documentation if needed

### Adding a New Feature

1. Review PRD.md for requirements
2. Check ARCHITECTURE.md for patterns
3. Create/update components
4. Add comprehensive tests
5. Update documentation
6. Create ADR if architecturally significant

### Fixing a Bug

1. Write failing test that reproduces bug
2. Fix the bug
3. Verify test passes
4. Add regression tests if needed
5. Run full test suite

## Project-Specific Notes

### Public snapshots

- Refresh repository, surface, and essay snapshots for releases
- Keep `asOf` and source provenance on changeable values
- Never replace durable published content with a failed live request

### Theme System

- Uses an inline no-FOUC initializer and a small progressive enhancement
- Respects system preference
- Persists user choice
- Keeps a readable no-JavaScript default

### Animations

- Respect `prefers-reduced-motion`
- Keep CSS motion subtle and non-essential
- See DESIGN.md for guidelines

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Tests fail after changes | Check if mocks need updating |
| Build fails | Run `npm run typecheck` for type errors |
| Styles not applying | Check Tailwind class names |
| E2E tests flaky | Add proper waits/assertions |

### Getting Help

1. Check existing documentation
2. Review similar code in the project
3. Look at test files for usage examples
4. Check ADRs for decision context

## Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Sanitize any user inputs
- Keep dependencies updated

## Performance

- Keep bundle size small
- Use lazy loading where appropriate
- Optimize images
- Monitor Core Web Vitals

---

**Remember**: Quality over speed. Take time to understand the codebase, write good tests, and maintain documentation.
