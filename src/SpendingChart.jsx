import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS } from './constants';

function SpendingChart({ transactions }) {
  const categoryTotals = {};

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1c1c1c" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#666', fontFamily: 'IBM Plex Mono', letterSpacing: 2, textTransform: 'uppercase' }}
            axisLine={{ stroke: '#222' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 10, fill: '#666', fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'amount']}
            contentStyle={{ background: '#0f0f0f', border: '1px solid #333', fontFamily: 'IBM Plex Mono', fontSize: 12 }}
            labelStyle={{ color: '#888', letterSpacing: 2, textTransform: 'uppercase', fontSize: 10 }}
            itemStyle={{ color: '#00ff87' }}
            cursor={{ fill: '#ffffff08' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] ?? '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
