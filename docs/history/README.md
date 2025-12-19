# History: Deprecated and Removed Features

This directory documents features that have been deprecated, removed, or significantly changed in the portfolio project. This historical record helps:

- Understand why certain decisions were made
- Avoid repeating past mistakes
- Provide context for future development
- Document migration paths for deprecated features

## Directory Structure

Each deprecated feature should have its own markdown file:

```
history/
├── README.md                    # This file
├── YYYY-MM-feature-name.md      # Deprecated feature documentation
└── ...
```

## Document Template

When documenting a deprecated or removed feature, use this template:

```markdown
# [Feature Name]

## Status
[Deprecated | Removed | Replaced]

## Date
[YYYY-MM-DD]

## Summary
[Brief description of what the feature was]

## Reason for Deprecation/Removal
[Why was this feature deprecated or removed?]

## Migration Path
[How to migrate away from this feature, if applicable]

## Historical Context
[Why was this feature originally added? What problem did it solve?]

## Related
- [Links to related ADRs, PRs, or issues]
```

## Current History

| Date | Feature | Status | Description |
|------|---------|--------|-------------|
| - | - | - | No deprecated features yet |

## Guidelines

### When to Document

Create a history document when:
- Removing a feature that users/developers relied on
- Deprecating an API or component
- Making significant architectural changes
- Removing dependencies with notable impact

### What to Include

1. **Clear Summary**: What was the feature?
2. **Reasoning**: Why was it removed?
3. **Migration**: How to adapt to the change?
4. **Timeline**: When did this happen?

### Best Practices

- Keep documents focused and concise
- Include code examples if helpful
- Link to relevant PRs and issues
- Update ADRs if the change relates to an architectural decision
