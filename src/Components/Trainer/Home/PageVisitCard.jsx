import React from 'react';
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";

export default function PageVisitsCard({ subData }) {
    return (
        <Card>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">Si</th>
                                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">Name</th>
                                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">Amount</th>
                                <th className="px-4 py-2 text-teal-500 border-b border-gray-200 text-center">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subData.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border-b border-gray-200 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-center">{data?.user?.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-center">{`$${data.amount}`}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-center">{data.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}
