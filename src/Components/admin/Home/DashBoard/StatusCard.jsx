import React from 'react';

export default function StatusCard({
    icon,
    title,
    amount,
    // You can remove the color prop from here
}) {
    const colorMappings = {
        Traffic: 'red',
        'New Users': 'blue',
        Sales: 'green',
        Performance: 'yellow'
    };

    // Determine the color based on the title (or any other condition)
    const titleColor = colorMappings[title] || 'red'; // Default to 'red' if title is not found in mappings

    return (
        <div className="px-4 mb-10">
            <div className={`bg-gray-100 h-32 p-4 rounded-lg shadow-xl mb-4 `}>
                <div className={`text-3xl  text-${titleColor}-500`}>
                    {icon} {/* Display the icon component here */}
                </div>
                <div className="text-lg font-semibold text-amber-500">{title}</div>
                <div className="text-xl text-amber-500">{amount}</div>
            </div>
        </div>
    );
}
