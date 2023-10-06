import React from 'react';
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";

export default function PageVisitsCard() {
  return (
    <Card>
      <CardHeader color="blue" contentPosition="none">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl">Page Visits</h2>
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            style={{ padding: 0 }}
          >
            See More
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">ID</th>
                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">Name</th>
                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">Salary</th>
                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-center">1</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Dakota Rice</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">$36,738</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Niger</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-center">2</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Minerva Hooper</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">$23,789</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Curaçao</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-center">3</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Sage Rodriguez</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">$56,142</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Netherlands</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-center">4</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Philip Chaney</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">$38,735</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">Korea, South</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
