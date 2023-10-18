import React from 'react';

export default function StatusCard({
    icon,
    title,
    amount,
}) {
    const colorMappings = {
        Traffic: 'red',
        'New Users': 'blue',
        Sales: 'green',
        Performance: 'yellow'
    };

    const titleColor = colorMappings[title] || 'red'; 

    return (
        <div className="px-4 mb-10">
            <div className={`bg-gray-100 h-32 p-4 rounded-lg shadow-xl mb-4 `}>
                <div className={`text-3xl  text-${titleColor}-500`}>
                    {icon} 
                </div>
                <div className="text-lg font-semibold text-amber-500">{title}</div>
                <div className="text-xl text-amber-500">{amount}</div>
            </div>
        </div>
    );
}
