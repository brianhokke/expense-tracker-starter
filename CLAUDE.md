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

This is a single-file React app (`src/App.jsx`) with no routing, no state management library, and no backend. All state lives in `App` via `useState`.

**Data model** — each transaction has: `{ id, description, amount, type, category, date }`. `type` is `"income"` or `"expense"`. `amount` is stored as a string (known bug).

**Known issues (intentional for course exercises):**
- `amount` stored as string causes incorrect totals (string concatenation instead of numeric addition)
- `App.jsx` is a monolithic component — no child components extracted yet
- CSS class `.delete-btn` exists in `App.css` but the delete feature is not yet implemented
- One transaction ("Freelance Work") is incorrectly typed as `"expense"` instead of `"income"`

**Categories** (fixed list, defined in `App.jsx`): `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`
