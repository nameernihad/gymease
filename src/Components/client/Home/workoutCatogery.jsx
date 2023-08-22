import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const WorkoutCatogery = () => {
  const workoutCategories = [
    {
      title: "Beginner Workouts",
      imageUrl:
        "https://t3.ftcdn.net/jpg/02/56/17/92/360_F_256179223_FDWWNhqs8afJPs2W0iUUptiFXte4K8gP.jpg",
      description:
        "Kickstart your fitness journey with these beginner-level workout routines designed to help you build a solid foundation.",
      stars: 1,
    },
    {
      title: "Intermediate Workouts",
      imageUrl:
        "https://w0.peakpx.com/wallpaper/928/844/HD-wallpaper-motivation-fitness-workout-dark-ultra-sports-fitness-dark-motivation-workout.jpg",
      description:
        "Ready to challenge yourself? These intermediate-level workout routines will take your fitness to the next level.",
      stars: 2,
    },
    {
      title: "Advanced Workouts",
      imageUrl:
        "https://e0.pxfuel.com/wallpapers/884/790/desktop-wallpaper-shadow-figure-iron-muscle-muscle-rod-background-black-muscles-athlete-bodybuilding-bodybuilder-training-weight-bodybuilder-barbell-background-black-for-section-%D1%81%D0%BF%D0%BE%D1%80%D1%82.jpg",
      description:
        "Push your limits with these advanced workout routines. Perfect for experienced fitness enthusiasts looking for intense challenges.",
      stars: 3,
    },
  ];

  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-3 md:gap-6">
      {workoutCategories.map((category, index) => (
        <div
          key={index}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="rounded-t-lg h-60 md:h-80 object-cover"
              src={category.imageUrl}
              alt={category.title}
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {category.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {category.description}
            </p>
            <div className="flex mb-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`text-${
                    i < category.stars ? "amber-500" : "gray-300 opacity-50"
                  } mr-1`}
                />
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Explore Workouts
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutCatogery;
