import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../Axios/adminAxios";
import { Link } from "react-router-dom";

const WorkoutLevel = () => {
  const [WorkoutLevels, setWorkoutLevels] = useState([]);

  useEffect(() => {
    adminAxios.get("/getAllLevel").then((res) => {
      console.log(res.data.allLevel);
      setWorkoutLevels(res.data.allLevel);
    });
  }, []);

  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-3 md:gap-6">
      {WorkoutLevels.map((level, index) => (
        <div
          key={index}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="rounded-t-lg h-60 md:h-80 object-cover"
              src={level.image}
              alt={level.name}
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {level.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {level.description}
            </p>
            <div className="flex mb-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`text-${
                    i <
                    (level.name === "Beginner"
                      ? 1
                      : level.name === "Intermediate"
                      ? 2
                      : 3)
                      ? "amber-500"
                      : "gray-300 opacity-50"
                  } mr-1`}
                />
              ))}
            </div>
            <Link
              to={`/category/${level._id}`}
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
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutLevel;
