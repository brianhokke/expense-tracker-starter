---
name: Project Conventions
description: Coding style, naming patterns, and architectural decisions observed in this codebase
type: project
---

## Naming
- App-level handlers use `handleX` (e.g., `handleAdd`, `handleDelete`)
- Props passed to children use `onX` (e.g., `onAdd`, `onDelete`) — convention is consistent and correct
- Transaction row variable uses short alias `t` throughout — acceptable given small scope

## Style
- Arrow function components are NOT used — all components are `function Foo()` declarations
- Default exports at end of each file, no named exports
- No PropTypes, no TypeScript — plain JS with JSX
- Inline onChange handlers `(e) => setState(e.target.value)` used throughout (not extracted to named handlers)

## Architecture
- All `transactions` state lives in App.jsx — intentional, no state library
- Filter state (filterType, filterCategory) lives locally in TransactionList — correct encapsulation
- Form state lives locally in TransactionForm — correct encapsulation
- recharts is a real dependency (listed in package.json ^3.8.1) despite CLAUDE.md note saying otherwise — note was wrong
- `Date.now()` used for IDs — not sequential integers

## Known Intentional Issues
- "Freelance Work" seed transaction has type "expense" instead of "income" — course exercise bug, do not fix
- `Cell` from recharts triggers TypeScript deprecation warning in IDE (recharts v3 type defs) — works at runtime, do not flag
