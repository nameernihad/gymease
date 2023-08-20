import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function WorkoutCategory() {
  const categories = [
    {
      level: "Beginner",
      imageUrl:
        "https://t3.ftcdn.net/jpg/02/56/17/92/360_F_256179223_FDWWNhqs8afJPs2W0iUUptiFXte4K8gP.jpg",
      filledStars: 1,
      totalStars: 3,
    },
    {
      level: "Intermediate",
      imageUrl:
        "https://w0.peakpx.com/wallpaper/928/844/HD-wallpaper-motivation-fitness-workout-dark-ultra-sports-fitness-dark-motivation-workout.jpg",
      filledStars: 2,
      totalStars: 3,
    },
    {
      level: "Advanced",
      imageUrl:
        "https://e0.pxfuel.com/wallpapers/884/790/desktop-wallpaper-shadow-figure-iron-muscle-muscle-rod-background-black-muscles-athlete-bodybuilding-bodybuilder-training-weight-bodybuilder-barbell-background-black-for-section-%D1%81%D0%BF%D0%BE%D1%80%D1%82.jpg",
      filledStars: 3,
      totalStars: 3,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-black">
      {categories.map((category, index) => (
        <div key={index} className="relative w-full md:w-1/3 h-80">
          <img
            src={category.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-0 right-0 flex flex-col items-center text-white">
            <h3 className="text-xl mb-2">{category.level}</h3>
            <div className="mb-2">
              {Array.from({ length: category.totalStars }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`text-${
                    i < category.filledStars
                      ? "amber-500"
                      : "gray-300 opacity-50"
                  } mr-1`}
                />
              ))}
            </div>
            <button className="px-2 py-1 text-sm bg-amber-500 bg-opacity-75 hover:bg-opacity-100 transition duration-300 rounded">
              <span className="font-semibold">Let's Go</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkoutCategory;
