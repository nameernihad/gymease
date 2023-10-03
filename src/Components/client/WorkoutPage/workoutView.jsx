import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import adminAxios from "../../../Axios/adminAxios";

function WorkoutView() {
  const Id = useParams();
  console.log(Id);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    adminAxios
      .get(`/filteredWorkout/${Id.id}/${Id.cateId}`)
      .then((response) => {
        console.log(response.data.filteredWorkout);
        console.log("response.data.filteredWorkout");
        setWorkouts(response.data.filteredWorkout);
        setCurrentWorkoutIndex(0);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }, []);

  const totalWorkouts = workouts.length;
  const currentWorkout = workouts[currentWorkoutIndex];

  const handleNext = () => {
    setCurrentWorkoutIndex((prevIndex) => (prevIndex + 1) % totalWorkouts);
  };

  const handlePrev = () => {
    setCurrentWorkoutIndex(
      (prevIndex) => (prevIndex - 1 + totalWorkouts) % totalWorkouts
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex w-full">
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 break-words">
            Workout View - {currentWorkout?.level?.name} -{" "}
            {currentWorkout?.category?.name}
          </h2>
          {currentWorkout && (
            <div className="text-center">
              <img
                src={currentWorkout.gif}
                alt={`Workout ${currentWorkout._id}`}
                className="mx-auto mb-4 rounded-lg  max-w-full h-auto"
              />
            </div>
          )}
        </div>

        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div className="h-full w-full grid place-items-center text-center">
            {currentWorkout && (
              <div>
                <p className="text-2xl font-semibold">{currentWorkout.name}</p>
                <p className="text-gray-600">{currentWorkout.description}</p>
              </div>
            )}
          </div>

          <div className="">
            <div className="flex justify-around mt-auto ">
              <button
                onClick={handlePrev}
                disabled={currentWorkoutIndex === 0}
                className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 focus:outline-none"
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                disabled={currentWorkoutIndex === totalWorkouts - 1}
                className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutView;
