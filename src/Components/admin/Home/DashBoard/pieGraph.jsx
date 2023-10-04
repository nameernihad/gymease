import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ data }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Pie Chart</h2>
    <div className="w-1/2 h-1/2 mx-auto">
      <PieChart width={window.innerWidth / 2} height={window.innerHeight / 2}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={Math.min(window.innerWidth, window.innerHeight) / 4}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  </div>
);

export default PieChartComponent;
