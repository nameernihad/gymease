import React from 'react';
import PieChartComponent from './pieGraph';
import BarChartComponent from './barGraph';
import DataCards from './ValueCard';

const now = new Date();

const pieChartData = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 300 },
  { name: 'Category D', value: 200 },
];

const barChartData = [
  {
    name: 'Jan',
    thisYear: 18,
    lastYear: 12,
  },
  {
    name: 'Feb',
    thisYear: 16,
    lastYear: 11,
  },
  // Add more data points for other months
];

const dataCardsData = [
  { title: 'User Count', value: 100 },
  { title: 'Trainer Count', value: 20 },
  { title: 'Payment Total', value: '$10,000' },
];

const Graph = () => (
  <>
    <head>
      <title>Dashboard | Your App</title>
    </head>
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>
        <div className="mb-4">
          <DataCards data={dataCardsData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <PieChartComponent data={pieChartData} />
          </div>
          <div>
            <BarChartComponent data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Graph;
