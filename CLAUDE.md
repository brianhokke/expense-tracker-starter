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
- `App` — holds `transactions` state, passes it to children; handles `handleAdd` and `handleDelete`
- `Summary` — receives `transactions`, computes and displays totalIncome, totalExpenses, balance
- `TransactionForm` — owns its own form state (description, amount, type, category), calls `onAdd` prop with new transaction object; generates `id` via `Date.now()` and `date` via `new Date().toISOString().split('T')[0]`
- `TransactionList` — receives `transactions` and `onDelete`; owns filter state (filterType, filterCategory) internally; delete button uses `window.confirm` before calling `onDelete(id)`
- `SpendingChart` — receives `transactions`, filters to `type === "expense"` only, renders a recharts `BarChart` grouped by category; each category has a fixed color defined in `CATEGORY_COLORS`

**Dependencies:**
- `recharts` — used for the spending chart (`BarChart`, `Bar`, `Cell`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `ResponsiveContainer`)

**Data model** — each transaction: `{ id, description, amount, type, category, date }`. `type` is `"income"` or `"expense"`. `amount` is a number.

**Categories** (fixed list, duplicated in `TransactionForm` and `TransactionList`): `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`

## Design

**Style:** Neon brutalism — dark background with high-contrast neon accents, hard edges, monospace typography, and glow effects.

**Fonts** (loaded via Google Fonts in `index.html`):
- `Bebas Neue` — display/headings and large numbers
- `IBM Plex Mono` — all body text, labels, inputs, table cells

**Color tokens** (CSS custom properties in `App.css`):
- `--bg: #080808`, `--surface: #0f0f0f`, `--surface-2: #141414`
- Neon accents: green `#00ff87`, pink `#ff0080`, cyan `#00d4ff`, yellow `#ffe600`
- Each neon color has a matching `--glow-*` box-shadow variable

**Section panels** — each section (chart, form, list) has a colored neon border + glow and a `::before` pseudo-element label (`// spending analysis`, `// new transaction`, `// transaction log`). The `h2` inside each section is hidden (`display: none`) in favour of the CSS label.

**Known issues (intentional for course exercises):**
- One transaction ("Freelance Work") is incorrectly typed as `"expense"` instead of `"income"`

**Notes:**
- Transaction IDs are `Date.now()` timestamps — do not assume sequential integers
- `SpendingChart` only reflects expenses; income categories will not appear in the chart
- `Cell` from recharts triggers a TypeScript deprecation warning in the IDE (recharts v3 type definitions issue); it still works correctly at runtime
