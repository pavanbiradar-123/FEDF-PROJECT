import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function PriceChart({ chartData }) {
  return (
    <div style={{ width: '100%', height: 430, marginTop: '10px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <YAxis stroke="#9CA3AF" domain={[0, 'auto']} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
          <Legend wrapperStyle={{ paddingTop: '15px' }} />
          
          {/* Categorical line parameters mimicking your high-velocity analytic model mapping */}
          <Line type="monotone" dataKey="Electronics" stroke="#3B82F6" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 7 }} />
          <Line type="monotone" dataKey="Jewelery" stroke="#F59E0B" strokeWidth={3} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Men's Clothing" stroke="#10B981" strokeWidth={3} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Women's Clothing" stroke="#EC4899" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}