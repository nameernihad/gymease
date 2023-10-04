import React from 'react';

const DataCard = ({ title, value }) => (
  <div className="w-full sm:w-1/2 md:w-1/4 p-2">
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  </div>
);

const DataCards = ({ data }) => (
  <div className="flex justify-center">
    <div className="w-full md:w-3/4 xl:w-1/2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item) => (
          <DataCard key={item.title} title={item.title} value={item.value} />
        ))}
      </div>
    </div>
  </div>
);

export default DataCards;
