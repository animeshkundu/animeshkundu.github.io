# 02: Testing and Validation

This document establishes the testing standards and self-validation protocols for all AI agent work.

## 1. The 90% Rule

**Minimum 90% code coverage is mandatory for all code.**

### Coverage Requirements

| Metric | Minimum | Target |
|--------|---------|--------|
| Statements | 90% | 95% |
| Branches | 90% | 95% |
| Functions | 90% | 95% |
| Lines | 90% | 95% |

### Checking Coverage

```bash
# Run coverage report
npm run test:coverage

# Output shows coverage metrics
# Coverage must meet minimums before merging
```

### Coverage Exceptions

The only acceptable exceptions are:

- Configuration files (e.g., `vite.config.ts`)
- Type-only files (e.g., `types/index.ts`)
- Entry points with no logic (e.g., `main.tsx`)

Document exceptions in `vitest.config.ts`:

```typescript
coverage: {
  exclude: [
    'src/main.tsx',
    'src/types/**',
  ]
}
```

## 2. Test-Driven Development (TDD)

**Tests must be written before or alongside implementation.**

### The TDD Cycle

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  RED    │────▶│  GREEN  │────▶│ REFACTOR│
│ (Write  │     │ (Make   │     │ (Improve│
│  test)  │     │  pass)  │     │  code)  │
└─────────┘     └─────────┘     └────┬────┘
     ▲                               │
     └───────────────────────────────┘
```

### TDD in Practice

1. **Write the test first**
   ```typescript
   // ❌ Test fails - component doesn't exist yet
   it('renders user name', () => {
     render(<UserCard name="Alice" />);
     expect(screen.getByText('Alice')).toBeInTheDocument();
   });
   ```

2. **Write minimal code to pass**
   ```typescript
   // ✅ Test passes
   export const UserCard = ({ name }: { name: string }) => {
     return <div>{name}</div>;
   };
   ```

3. **Refactor while tests stay green**
   ```typescript
   // ✅ Improved, tests still pass
   export const UserCard: FC<UserCardProps> = ({ name }) => {
     return (
       <article className="p-4 rounded-lg shadow">
         <h2 className="font-bold">{name}</h2>
       </article>
     );
   };
   ```

## 3. Testing Hierarchy

### Unit Tests

**Location:** `src/__tests__/`  
**Framework:** Vitest + React Testing Library

```typescript
// src/__tests__/Component.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Component } from '../components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<Component />);
    
    await user.click(screen.getByRole('button'));
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Component error="Something went wrong" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
  });
});
```

### E2E Tests

**Location:** `e2e/`  
**Framework:** Playwright

```typescript
// e2e/feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Feature', () => {
  test('user can complete flow', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to section
    await page.click('text=Projects');
    await expect(page.locator('#projects')).toBeVisible();
    
    // Interact with feature
    await page.click('.project-card >> nth=0');
    await expect(page).toHaveURL(/.*github.com/);
  });
});
```

## 4. What to Test

### Must Test

| Category | What to Test |
|----------|--------------|
| Components | Rendering, props, interactions |
| Hooks | State changes, effects, return values |
| Utilities | Input/output, edge cases |
| Integration | Component combinations |
| User Flows | E2E critical paths |

### Test Coverage Checklist

For each component/function:

- [ ] Happy path (normal usage)
- [ ] Edge cases (empty, null, max values)
- [ ] Error states (failures, invalid input)
- [ ] User interactions (clicks, typing)
- [ ] Accessibility (roles, labels)
- [ ] Loading states (async operations)

### Example: Complete Test Suite

```typescript
describe('UserList', () => {
  // Happy path
  it('renders list of users', () => { /* ... */ });
  
  // Edge cases
  it('renders empty state when no users', () => { /* ... */ });
  it('handles single user', () => { /* ... */ });
  it('handles many users', () => { /* ... */ });
  
  // Error states
  it('shows error message on fetch failure', () => { /* ... */ });
  
  // User interactions
  it('filters users when searching', async () => { /* ... */ });
  it('sorts users when clicking header', async () => { /* ... */ });
  
  // Loading states
  it('shows loading spinner while fetching', () => { /* ... */ });
  
  // Accessibility
  it('has accessible table structure', () => { /* ... */ });
});
```

## 5. Self-Correction Protocol

**Agents must validate their own work before committing.**

### Validation Script

Use the validation script:

```bash
./scripts/validate.sh
```

Or run commands manually:

```bash
# Run all quality checks
npm run typecheck   # Type checking
npm run lint        # Linting
npm test            # Unit tests
npm run build       # Build verification
npm run test:e2e    # E2E tests
```

### Pre-Commit Checklist

Before committing any change:

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] `npm run test:coverage` shows >90%
- [ ] `npm run build` succeeds
- [ ] `npm run test:e2e` passes

### Self-Correction Flow

```
Make Change
     │
     ▼
Run Validation
     │
     ├─── Pass ───▶ Commit
     │
     └─── Fail ───▶ Diagnose
                        │
                        ▼
                   Fix Issue
                        │
                        ▼
                Run Validation (repeat)
```

## 6. Test Quality Standards

### Good Tests Are

1. **Isolated**: Don't depend on external state
2. **Deterministic**: Same result every time
3. **Fast**: Run quickly
4. **Readable**: Clear intent and assertions
5. **Maintainable**: Easy to update

### Test Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Testing implementation | Brittle tests | Test behavior, not implementation |
| Large test files | Hard to maintain | Split by feature/concern |
| Shared mutable state | Flaky tests | Reset state in beforeEach |
| Testing framework code | Waste of time | Focus on your code |
| Snapshot abuse | Changes ignored | Use sparingly, review diffs |

### Assertions Best Practices

```typescript
// ✅ Good: Specific, meaningful assertions
expect(screen.getByRole('heading')).toHaveTextContent('Welcome');
expect(result).toEqual({ name: 'Alice', age: 30 });

// ❌ Bad: Vague assertions
expect(element).toBeTruthy();
expect(result).toBeDefined();
```

## 7. Debugging Test Failures

### Systematic Approach

1. **Read the error message carefully**
2. **Check what's being rendered**
   ```typescript
   screen.debug(); // Prints DOM
   ```
3. **Verify assumptions**
   ```typescript
   console.log('State:', state);
   ```
4. **Isolate the failure**
   ```typescript
   it.only('isolated test', () => { /* ... */ });
   ```

### Common Issues

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| Element not found | Wrong query | Use `screen.debug()` |
| Async timeout | Missing await | Add `await` or `waitFor` |
| State mismatch | Race condition | Use `waitFor` assertions |
| Mock not working | Wrong setup | Verify mock path |

## Summary

| Principle | Requirement |
|-----------|-------------|
| 90% Coverage | All code must meet minimum |
| TDD | Write tests first or alongside |
| Comprehensive | Test happy paths, edge cases, errors |
| Self-Validate | Run all checks before committing |
| Quality | Tests should be isolated, deterministic, readable |
