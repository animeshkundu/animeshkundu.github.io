# 01: Research and Web Search

This document establishes protocols for using web search and research in AI agent workflows.

## 1. Internet is First-Class

**Web search is not optional—it is a required tool for informed decisions.**

### Why Research Matters

1. **Best Practices Evolve**: What was correct 6 months ago may be outdated
2. **Prevent Hallucination**: Verify information instead of assuming
3. **Discover Alternatives**: Find solutions you might not have considered
4. **Version Verification**: Ensure compatibility with current library versions

### When to Search

| Situation | Search Required? |
|-----------|-----------------|
| Using a library/API | ✅ Yes - verify current API |
| Implementing a pattern | ✅ Yes - find current best practices |
| Making architectural decisions | ✅ Yes - research alternatives |
| Fixing a bug | ✅ Yes - check for known issues |
| Standard language features | ⚠️ Maybe - if unsure about syntax |
| Project-specific code | ❌ No - read project docs instead |

## 2. Research Workflow

### Before Implementation

```
1. Identify what you need to know
2. Search for current best practices
3. Verify library versions and APIs
4. Document findings
5. Apply to implementation
```

### Search Strategy

```
Broad → Specific → Verify

1. Broad: "React 19 best practices 2024"
2. Specific: "React 19 useEffect cleanup pattern"
3. Verify: Check official React docs
```

### Search Queries Best Practices

**Good Queries:**
- "TypeScript 5.9 strict mode configuration"
- "Tailwind CSS 4 dark mode best practices 2024"
- "Vitest coverage configuration React Testing Library"
- "GitHub Actions Node.js 20 workflow example"

**Poor Queries:**
- "how to code" (too vague)
- "TypeScript" (too broad)
- "best way to do things" (not specific)

## 3. Validation Protocol

**All external information must be validated before use.**

### Validation Steps

1. **Source Credibility**: Is this from official docs or a reliable source?
2. **Recency**: Is this information current?
3. **Applicability**: Does this apply to our specific versions?
4. **Cross-Reference**: Do multiple sources agree?

### Trust Hierarchy

| Source | Trust Level | Action |
|--------|-------------|--------|
| Official documentation | High | Use directly |
| GitHub issues/discussions | Medium | Verify with docs |
| Stack Overflow | Medium | Verify recency |
| Blog posts | Low | Cross-reference |
| AI-generated content | Very Low | Always verify |

### Version Verification

Always verify library versions before using examples:

```bash
# Check installed versions
npm list react
npm list typescript
npm list vitest

# Verify compatibility
npm info react versions
```

## 4. Information Saturation

**Research until you reach information saturation before implementing.**

### What is Saturation?

Information saturation is reached when:

1. Multiple sources agree on the approach
2. You understand the trade-offs
3. You've considered alternatives
4. New searches return familiar information
5. You can explain the "why" behind the approach

### Saturation Checklist

```markdown
## Research: [Topic]

### Key Questions Answered
- [ ] What is the current best practice?
- [ ] What are the alternatives?
- [ ] What are the trade-offs?
- [ ] What version requirements exist?
- [ ] Are there known issues or gotchas?

### Sources Consulted
1. [Source 1]: [Key finding]
2. [Source 2]: [Key finding]
3. [Source 3]: [Key finding]

### Consensus
[What do sources agree on?]

### Decision
[What approach will we use and why?]
```

### Saturation Indicators

**Not Saturated:**
- "I found one example that does this..."
- "This seems like it might work..."
- "I'm not sure about the trade-offs..."

**Saturated:**
- "Multiple sources recommend this approach because..."
- "The trade-offs are X, Y, Z and we're choosing this because..."
- "Official docs confirm this is the intended usage..."

## 5. Documentation of Research

**Research findings must be documented for future reference.**

### Inline Documentation

When implementing based on research:

```typescript
/**
 * Uses the recommended React 19 pattern for data fetching
 * @see https://react.dev/reference/react/useEffect
 * 
 * Note: This follows the cleanup pattern documented in the React 19
 * migration guide to prevent stale closure issues.
 */
useEffect(() => {
  // Implementation based on documented pattern
}, [deps]);
```

### ADR for Significant Decisions

For architectural decisions based on research, create an ADR:

```markdown
# ADR-XXXX: [Decision Title]

## Context
After researching [topic], we found...

## Research Findings
- Source 1: [Finding]
- Source 2: [Finding]
- Source 3: [Finding]

## Decision
Based on research, we will...

## Consequences
...
```

## 6. Common Research Areas

### For This Repository

| Area | What to Research |
|------|------------------|
| React | Hooks patterns, React 19 features |
| TypeScript | Strict mode patterns, type utilities |
| Tailwind | Utility classes, dark mode, responsive |
| Vite | Build configuration, plugins |
| Testing | Vitest patterns, RTL queries |
| E2E | Playwright selectors, assertions |
| CI/CD | GitHub Actions best practices |

### Research Triggers

**Always research when:**

- Adding a new dependency
- Using an unfamiliar API
- Implementing a common pattern
- Encountering an error you don't understand
- Making performance optimizations
- Implementing security features

## 7. Anti-Patterns

### Avoid These Research Mistakes

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Skipping research | May use outdated patterns | Always research first |
| Single source | May be wrong or outdated | Cross-reference sources |
| Ignoring versions | May use incompatible APIs | Verify versions |
| Copying without understanding | Can't debug or modify | Understand before using |
| Not documenting | Knowledge is lost | Document findings |

## Summary

| Principle | Implementation |
|-----------|---------------|
| Internet is First-Class | Use web search before coding |
| Validation | Verify all external information |
| Saturation | Research until consensus is clear |
| Documentation | Record findings for future reference |
| Version Awareness | Always verify library versions |
