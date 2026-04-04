# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

React app with no routing, no state management library, and no backend. `transactions` state lives in `App` and is passed down to child components.

**Components:**
- `App` — holds `transactions` state, passes it to children
- `Summary` — receives `transactions`, computes and displays totalIncome, totalExpenses, balance
- `TransactionForm` — owns its own form state (description, amount, type, category), calls `onAdd` prop with new transaction object
- `TransactionList` — receives `transactions`, owns filter state (filterType, filterCategory) internally
- `SpendingChart` — receives `transactions`, renders a recharts `BarChart` of expense totals grouped by category; each category has a fixed color defined in `CATEGORY_COLORS`

**Dependencies:**
- `recharts` — used for the spending chart (`BarChart`, `Bar`, `Cell`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `ResponsiveContainer`)

**Data model** — each transaction: `{ id, description, amount, type, category, date }`. `type` is `"income"` or `"expense"`. `amount` is a number.

**Categories** (fixed list, duplicated in `TransactionForm` and `TransactionList`): `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`

**Known issues (intentional for course exercises):**
- One transaction ("Freelance Work") is incorrectly typed as `"expense"` instead of `"income"`

**Notes:**
- `Cell` from recharts triggers a TypeScript deprecation warning in the IDE (recharts v3 type definitions issue); it still works correctly at runtime
