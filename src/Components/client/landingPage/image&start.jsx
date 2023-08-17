import React from "react";

const WorkWithUsSection = () => {
  return (
    <div className="relative bg-gray-900 py-48 sm:py-64">
      {/* Image */}
      <img
        src="https://i.shgcdn.com/d61f124a-5eb2-41c7-abd1-ace0dd6f7d97/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-right md:object-center shadow-blue"
      />
      {/* Blue Shade Overlay */}
      <div className="absolute inset-0 bg-blue-950 opacity-40"></div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl shadow-blue-md">
            Join Our Fitness Family
          </h2>
          <p className="mt-6 text-lg text-white shadow-blue-md">
            Elevate your fitness journey with GymEase!
          </p>
          <p className="text-lg text-white shadow-blue-md">
            Explore exciting opportunities to be a part of our dedicated team
            and shape the future of online fitness.
          </p>
        </div>
        <button className="mt-8 bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600">
          Get In Touch
        </button>
      </div>
    </div>
  );
};

export default WorkWithUsSection;
