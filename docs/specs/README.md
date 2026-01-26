# Technical Specifications

This directory contains technical specifications that **MUST** be written before any implementation begins. This is a core tenet of the "Docs = Code" philosophy.

## Purpose

Technical specifications serve as:

1. **Pre-Implementation Contract**: A spec must be approved before code is written
2. **Design Documentation**: Captures technical decisions and trade-offs
3. **Implementation Guide**: Provides clear guidance for the Coding Agent
4. **Review Baseline**: Allows Review Agent to verify implementation matches spec

## When to Write a Spec

Create a technical specification when:

- Implementing a new feature
- Making significant architectural changes
- Adding new integrations or APIs
- Modifying existing behavior substantially
- Adding new dependencies

## Specification Template

Create specs using this template:

```markdown
# Spec: [Feature Name]

## Status
[Draft | In Review | Approved | Implemented | Deprecated]

## Author
[Agent or person name]

## Date
[YYYY-MM-DD]

## Summary
[1-2 sentence description of what this spec covers]

## Background
[Why is this needed? What problem does it solve?]

## Goals
- [Goal 1]
- [Goal 2]

## Non-Goals
- [What this spec explicitly does NOT address]

## Technical Design

### Overview
[High-level description of the approach]

### API/Interface
[Define the public interface, props, or API]

\`\`\`typescript
// Example interface
interface FeatureProps {
  // ...
}
\`\`\`

### Data Flow
[Describe how data flows through the feature]

### Component Structure
[If UI feature, describe component hierarchy]

### State Management
[How state will be managed]

### Error Handling
[How errors will be handled]

## Security Considerations
[Any security implications]

## Performance Considerations
[Performance impact and optimizations]

## Testing Strategy
- Unit tests: [What to test]
- E2E tests: [User flows to test]
- Coverage target: >90%

## Rollout Plan
[How will this be deployed/enabled]

## Open Questions
- [Any unresolved questions]

## References
- [Links to related ADRs, PRD sections, external docs]
```

## Current Specifications

| ID | Name | Status | Date |
|----|------|--------|------|
| 2026-01-github-pages-links | GitHub Pages Links & Mobile All Projects Layout | Implemented | 2026-01-26 |

## Workflow

1. **Draft**: Agent creates initial spec
2. **Review**: Spec is reviewed for completeness and feasibility
3. **Approved**: Ready for implementation
4. **Implemented**: Code has been written according to spec
5. **Deprecated**: Spec is no longer relevant (moved to history/)

## Best Practices

1. **Be Specific**: Vague specs lead to inconsistent implementations
2. **Include Examples**: Code snippets help clarify intent
3. **Consider Edge Cases**: Document how they should be handled
4. **Link to Context**: Reference PRD, ADRs, and other relevant docs
5. **Keep Updated**: Update spec if implementation requirements change
