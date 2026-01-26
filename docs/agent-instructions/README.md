# Agent Instructions

This directory contains the core operating protocols for AI agents working on this repository. **Every agent MUST read these files before performing any task.**

## Purpose

These instructions establish:

1. **Shared Philosophy**: Core principles all agents must follow
2. **Quality Standards**: Non-negotiable requirements for all work
3. **Workflow Protocols**: How agents should approach tasks
4. **Tooling Guidelines**: When and how to create automation

## Required Reading Order

Agents should read these files in order:

1. **[00-core-philosophy.md](./00-core-philosophy.md)** - Fundamental principles
2. **[01-research-and-web.md](./01-research-and-web.md)** - Research requirements
3. **[02-testing-and-validation.md](./02-testing-and-validation.md)** - Testing standards
4. **[03-tooling-and-pipelines.md](./03-tooling-and-pipelines.md)** - Automation guidelines

## Quick Reference

### The Golden Rules

1. **Docs = Code**: Never write code without updating documentation first
2. **Research First**: Use web search to verify best practices before implementation
3. **90% Coverage**: Maintain minimum 90% test coverage
4. **Self-Validate**: Always run tests before committing

### Before Any Task

```
1. Read agent-instructions/
2. Check docs/ADR/ for past decisions
3. Review docs/specs/ for existing specs
4. Search web for current best practices
5. Write/update spec before coding
```

### After Any Task

```
1. Run scripts/validate.sh
2. Update documentation if needed
3. Create ADR if architecturally significant
4. Update docs/history/ if deprecating anything
```

## Agent Hierarchy

### The CEO Model

```
                    ┌─────────────────────┐
                    │  Orchestrator Agent │
                    │     (CEO Role)      │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
   │   Planner   │      │   Coder     │      │   Reviewer  │
   │   Agent     │      │   Agent     │      │   Agent     │
   └─────────────┘      └─────────────┘      └─────────────┘
```

- **Orchestrator**: Delegates work, makes priority decisions, ensures quality
- **Planner**: Research, analysis, creates implementation plans
- **Coder**: Implements features following TDD
- **Reviewer**: Verifies quality, approves changes

## Compliance Checklist

Every agent must verify:

- [ ] Read all agent instructions
- [ ] Checked for existing specs
- [ ] Verified no conflicting ADRs
- [ ] Researched current best practices
- [ ] Updated/created necessary documentation
- [ ] All quality gates pass
- [ ] Self-validated work before handoff

## Consequences of Non-Compliance

Work that does not follow these protocols:

- Will be rejected by Review Agent
- May introduce technical debt
- Could cause regressions
- Creates documentation drift

## Updating These Instructions

These files should be updated when:

- New patterns emerge that should be standardized
- Quality standards change
- New tools are introduced
- Workflow improvements are identified

Create an ADR when making significant changes to these protocols.
