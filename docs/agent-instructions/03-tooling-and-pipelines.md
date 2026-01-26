# 03: Tooling and Pipelines

This document establishes guidelines for tool creation and CI/CD pipeline maintenance.

## 1. Tool Creation Rule

**If you perform a verification task twice, you MUST create a script for it.**

### Why Automate?

1. **Consistency**: Scripts always run the same way
2. **Efficiency**: Faster than manual execution
3. **Documentation**: Scripts document the process
4. **Handoff**: Other agents can use the same tools

### When to Create Scripts

| Situation | Action |
|-----------|--------|
| Running multiple commands in sequence | Create script |
| Checking multiple conditions | Create script |
| Complex verification steps | Create script |
| One-off simple command | Use directly |

### Script Location

```
scripts/
├── validate.sh       # Run all quality checks
├── build.sh          # Build commands
├── test-*.sh         # Specialized test scripts
└── utils/            # Helper utilities
```

## 2. Standard Scripts

### validate.sh

The primary validation script that all agents must use:

```bash
#!/bin/bash
set -e

echo "🔍 Running validation..."

echo "📝 Type checking..."
npm run typecheck

echo "🔍 Linting..."
npm run lint

echo "🧪 Running unit tests..."
npm test

echo "📦 Building..."
npm run build

echo "🎭 Running E2E tests..."
npm run test:e2e

echo "✅ All validations passed!"
```

### Script Best Practices

1. **Use `set -e`**: Exit on first error
2. **Add progress messages**: Show what's happening
3. **Use meaningful exit codes**: 0 for success, non-zero for failure
4. **Make executable**: `chmod +x scripts/*.sh`
5. **Document usage**: Add comments or help flags

### Script Template

```bash
#!/bin/bash
# Description: [What this script does]
# Usage: ./scripts/script-name.sh [options]

set -e  # Exit on error
set -o pipefail  # Catch pipe failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Main logic
main() {
    log_info "Starting script..."
    
    # Your commands here
    
    log_info "Complete!"
}

main "$@"
```

## 3. CI/CD Pipeline

### Pipeline Philosophy

1. **Fast Feedback**: Fail fast on obvious errors
2. **Comprehensive**: Check everything that matters
3. **Reliable**: No flaky tests or random failures
4. **Informative**: Clear error messages and logs

### Pipeline Stages

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Push/PR                                                        │
│     │                                                           │
│     ▼                                                           │
│  ┌─────────────────┐                                            │
│  │  Lint & Type    │  Fast checks first                         │
│  │  Check          │  (typecheck, lint)                         │
│  └────────┬────────┘                                            │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  Unit Tests     │  Test business logic                       │
│  │                 │  (npm test)                                │
│  └────────┬────────┘                                            │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  Build          │  Verify build works                        │
│  │                 │  (npm run build)                           │
│  └────────┬────────┘                                            │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  E2E Tests      │  Test user flows                           │
│  │                 │  (npm run test:e2e)                        │
│  └────────┬────────┘                                            │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  Deploy         │  Only on main branch                       │
│  │  (Production)   │  (GitHub Pages)                            │
│  └─────────────────┘                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### GitHub Actions Best Practices

```yaml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  # Fast checks first
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint

  # Unit tests (can run in parallel with lint)
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage
      - name: Check coverage threshold
        run: |
          # Verify coverage meets minimum
          npm run test:coverage

  # Build depends on lint and test
  build:
    needs: [lint-and-typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  # E2E tests use built artifact
  e2e:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run test:e2e

  # Deploy only on main/master
  deploy:
    needs: [build, e2e]
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest
    # ... deployment steps
```

## 4. Pipeline Maintenance

### When to Update Pipeline

| Trigger | Action |
|---------|--------|
| New test type added | Add pipeline step |
| New quality check | Add to lint stage |
| Build process change | Update build step |
| New deployment target | Add deploy step |

### Pipeline Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Running everything sequentially | Slow feedback | Parallelize independent jobs |
| Not caching dependencies | Slow builds | Use npm/yarn cache |
| Skipping tests for speed | Broken deploys | Never skip quality gates |
| Flaky tests | False failures | Fix flaky tests immediately |
| No artifacts | Can't debug failures | Upload logs and reports |

## 5. Local Development Tools

### Required Tools

```bash
# Verify Node.js version
node --version  # Should be 20.x

# Verify npm version
npm --version

# Install dependencies
npm install

# Verify everything works
npm run typecheck
npm run lint
npm test
npm run build
```

### IDE Configuration

Recommended VS Code extensions:

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "vitest.explorer"
  ]
}
```

### Pre-commit Hooks (Optional)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "./scripts/validate.sh"
    }
  }
}
```

## 6. Debugging Pipeline Failures

### Investigation Steps

1. **Read the error message** - Most failures have clear messages
2. **Check the failed step** - Which stage failed?
3. **Review logs** - Expand the failed step logs
4. **Reproduce locally** - Run the same commands locally
5. **Check recent changes** - What changed since last success?

### Common Pipeline Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Module not found" | Missing dependency | Run `npm ci` |
| "Type error" | TypeScript issue | Run `npm run typecheck` locally |
| "Test timeout" | Slow or hanging test | Check async operations |
| "E2E flaky" | Race condition | Add proper waits |
| "Build failed" | Compilation error | Check build output |

### Debugging Commands

```bash
# Verbose npm output
npm ci --verbose

# Debug test failures
npm test -- --reporter=verbose

# Debug E2E
npm run test:e2e -- --debug

# Check what would be built
npm run build -- --dry-run
```

## Summary

| Principle | Implementation |
|-----------|---------------|
| Automate Repetition | Create scripts for repeated tasks |
| Fast Feedback | Parallelize independent CI jobs |
| Quality Gates | Never skip tests or type checks |
| Local Parity | Local scripts match CI behavior |
| Debug-Friendly | Upload artifacts, verbose logs |
