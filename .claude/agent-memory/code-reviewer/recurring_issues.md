---
name: Recurring Issues
description: Bugs and anti-patterns identified across components — updated after third review (2026-04-04)
type: project
---

## Fixed in Second Pass (no longer issues)
- parseFloat applied in TransactionForm before storing amount
- CATEGORIES and CATEGORY_COLORS extracted to src/constants.js
- handleAdd/handleDelete use functional updater form in App.jsx
- Summary.jsx uses toLocaleString for currency formatting
- TransactionList has an empty-state row when filtered results are empty
- Form inputs have sr-only labels with htmlFor/id pairs
- Amount input has min="0.01" and step="0.01"
- SpendingChart imports CATEGORY_COLORS from constants, uses radius={[4,4,0,0]}

## Remaining Issues After Third Review (2026-04-04)

### Major
- TransactionList amount column renders raw `t.amount` without formatting:
  `{t.type === "income" ? "+" : "-"}${t.amount}` will show "$1200" not "$1,200.00"
  and can show float imprecision e.g. "$65.10000000000001".
  Fix: move formatCurrency out of Summary into constants.js (or a utils.js) and
  import it in TransactionList.

- Summary.jsx defines `formatCurrency` as a private module-level function — it
  is not exported. TransactionList needs the same formatter but cannot reuse it.
  Fix: export formatCurrency from constants.js so both components share one source
  of truth.

- TransactionForm validation gap: description is trimmed nowhere. A user can submit
  a transaction with description = "   " (whitespace only). The !description guard
  passes because the string is truthy.
  Fix: change guard to `!description.trim()` and call `description.trim()` when
  building the transaction object.

- SpendingChart categoryTotals computation runs unconditionally on every render with
  no memoization. For a course project this is low risk, but it is a teachable useMemo
  pattern.

### Minor
- TransactionList filter selects have no accessible labels — they rely solely on
  placeholder option text ("All Types", "All Categories") which screen readers may
  not announce correctly. Fix: add sr-only <label> elements the same way the form
  inputs do.
- The three section h2 elements (.spending-chart h2, .add-transaction h2,
  .transactions h2) are hidden with `display: none` in CSS. Screen readers skip
  display:none content, so the visible section labels (CSS ::before pseudo-elements)
  are purely decorative and never announced. Preferred pattern: use aria-label on the
  wrapping <div> and remove the hidden h2, or use aria-labelledby pointing to an
  off-screen element rather than display:none.
- SpendingChart has no accessible title/description for the chart — a screen reader
  user gets nothing from the <svg> block. A role="img" + aria-label on the
  ResponsiveContainer wrapper would fix this.
- `window.confirm` in TransactionList still present — blocks main thread, not
  styleable; acceptable for course project level.
- Seed transactions use integer IDs (1–8) while runtime uses Date.now() — harmless
  but inconsistent.
- index.html title is "finance-tracker" (kebab-case, lower) while the visible h1
  says "Finance Tracker" — minor brand inconsistency.
- App.css uses a `::before` pattern for section labels but the content rule is split
  across two selectors (the shared rule sets `position/top/left/padding/font/transform`
  but omits `content` — so without the per-section rule the pseudo-element renders
  nothing). This is intentional but unusual — a future dev could add a section and
  forget the content rule.
