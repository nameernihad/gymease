import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ data }) => (
  <div style={{ textAlign: 'center' }}>
    <h2>Bar Chart</h2>
    <BarChart
      width={window.innerWidth / 2}
      height={window.innerHeight / 2}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="thisYear" fill="#8884d8" />
      <Bar dataKey="lastYear" fill="#82ca9d" />
    </BarChart>
  </div>
);

export default BarChartComponent;
