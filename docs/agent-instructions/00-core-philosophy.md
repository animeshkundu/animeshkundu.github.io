# 00: Core Philosophy

This document establishes the fundamental principles that govern all AI agent work in this repository.

## 1. Docs = Code

**Documentation is not an afterthought—it drives implementation.**

### The Principle

Before any code is written, the corresponding documentation MUST be created or updated. This includes:

- **Specifications** (`docs/specs/`): Technical design documents
- **Architecture** (`docs/architecture/`): System diagrams and patterns
- **ADRs** (`docs/ADR/`): Architectural Decision Records
- **PRD** (`docs/PRD.md`): Product requirements

### Why This Matters

1. **Prevents Drift**: Code stays aligned with documented intent
2. **Enables Parallel Work**: Multiple agents can work from the same source of truth
3. **Reduces Rework**: Issues are caught at design time, not implementation time
4. **Creates History**: Documentation captures the "why" behind decisions

### Implementation

```
Before Code:
1. Does a spec exist for this feature? 
   → No: Create one in docs/specs/
   → Yes: Read and follow it

2. Does this change architecture?
   → Yes: Update docs/architecture/ and create ADR
   → No: Proceed

3. Does this deprecate anything?
   → Yes: Add to docs/history/
   → No: Proceed
```

## 2. Sync Protocol

**After work is complete, documentation MUST be synchronized.**

### Post-Implementation Checklist

1. **Update Status**: Mark specs as "Implemented"
2. **History**: Document any deprecated patterns in `docs/history/`
3. **ADR**: Create if significant architectural decisions were made
4. **README**: Update if user-facing behavior changed

### Handoff Documentation

When completing work, provide:

```markdown
## Handoff Summary

### Changes Made
- [List of changes]

### Documentation Updated
- [ ] Spec status updated
- [ ] Architecture docs updated (if applicable)
- [ ] ADR created (if applicable)
- [ ] History updated (if deprecating)

### Tests Added/Modified
- [List test files]

### Remaining Work
- [Any follow-up items]
```

## 3. The CEO Model

**The initiating agent acts as CEO, delegating to specialized workers.**

### Hierarchy

The **Orchestrator Agent** (CEO) coordinates all work:

```
Orchestrator (CEO)
├── Receives requests
├── Delegates to specialists
├── Makes priority decisions
├── Ensures quality gates
└── Approves final delivery

Specialized Agents (Workers)
├── Planner: Research and planning
├── Coder: Implementation and testing
└── Reviewer: Quality verification
```

### Decision Authority

| Decision Type | Authority |
|---------------|-----------|
| Priority | Orchestrator |
| Technical approach | Planner → Orchestrator approval |
| Implementation details | Coder |
| Quality acceptance | Reviewer |
| Final merge | Orchestrator |

### Communication Protocol

1. **Clear Delegation**: Orchestrator provides context, scope, and constraints
2. **Status Updates**: Workers report progress and blockers
3. **Handoffs**: Explicit transitions between phases with documentation
4. **Escalation**: Blockers escalated to Orchestrator immediately

## 4. First Principles Thinking

**Every decision must be reasoned from first principles.**

### The Process

1. **Understand the Problem**: What exactly are we solving?
2. **Question Assumptions**: Why do we think this is the right approach?
3. **Research Alternatives**: What other approaches exist?
4. **Evaluate Trade-offs**: What are the pros/cons of each approach?
5. **Document Reasoning**: Capture the decision and rationale

### Avoid

- ❌ "This is how it's always been done"
- ❌ "I saw this pattern somewhere"
- ❌ Assumptions without verification
- ❌ Decisions without documented reasoning

### Embrace

- ✅ "The problem is X, so we need Y"
- ✅ "Research shows Z is the current best practice"
- ✅ Explicit trade-off analysis
- ✅ Documented decision rationale in ADRs

## 5. Step-by-Step Planning

**Complex tasks must be broken down into discrete, verifiable steps.**

### Planning Template

```markdown
## Task: [Name]

### Objective
[What we're trying to achieve]

### Prerequisites
- [ ] Prerequisite 1
- [ ] Prerequisite 2

### Steps
1. [ ] Step 1: [Description]
   - Verify: [How to verify completion]
2. [ ] Step 2: [Description]
   - Verify: [How to verify completion]
3. [ ] Step 3: [Description]
   - Verify: [How to verify completion]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Risks
- Risk 1: [Mitigation]
- Risk 2: [Mitigation]
```

### Verification at Each Step

Before moving to the next step:

1. Verify the current step is complete
2. Run relevant tests
3. Check for unintended side effects
4. Document any deviations from plan

## 6. No Hallucination Policy

**Never invent APIs, patterns, or best practices.**

### When Uncertain

1. **Search**: Use web search to verify
2. **Reference**: Check official documentation
3. **Ask**: If still uncertain, request clarification
4. **Document**: Note the source of information

### Red Flags

Watch for these signs of potential hallucination:

- "I believe the API works like..."
- "Typically, this pattern..."
- "Usually, you would..."
- Specific version numbers without verification
- API methods that "should" exist

### Correct Approach

- "According to [source], the API..."
- "The official docs at [URL] state..."
- "After searching, I found [pattern] is recommended because..."

## Summary

| Principle | Key Action |
|-----------|------------|
| Docs = Code | Write documentation before code |
| Sync | Update docs after completing work |
| CEO Model | Orchestrator delegates, workers execute |
| First Principles | Reason from fundamentals, document decisions |
| Step-by-Step | Break down tasks, verify each step |
| No Hallucination | Search and verify, never invent |
