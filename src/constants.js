export const formatCurrency = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const CATEGORIES = [
  "food", "housing", "utilities", "transport",
  "entertainment", "salary", "other"
];

export const CATEGORY_COLORS = {
  food: '#f59e0b',
  housing: '#3b82f6',
  utilities: '#10b981',
  transport: '#f97316',
  entertainment: '#8b5cf6',
  salary: '#22c55e',
  other: '#6b7280',
};
