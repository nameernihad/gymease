import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import adminAxios from "../../../Axios/adminAxios";

function WorkoutView() {
  const Id = useParams();
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    adminAxios.get(`/getLevelById/${Id.id}`).then((res) => {
      setLevel(res.data.Level.name);
    });
  }, []);

  useEffect(() => {
    adminAxios.get(`/getCategoryById/${Id.cateId}`).then((res) => {
      setCategory(res.data.Category.name);
    });
  }, []);

  useEffect(() => {
    adminAxios
      .get(`/filteredWorkout/${level}/${category}`)
      .then((response) => {
        setWorkouts(response.data.filteredWorkout);
        setCurrentWorkoutIndex(0);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }, [level, category]);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 shadow-md max-w-4xl w-full">
        <h2 className="text-2xl font-semibold mb-4 break-words">
          Workout View - {level} - {category}
        </h2>

        <div className="mb-6">
          {currentWorkout && (
            <div className="text-center">
              <img
                src={currentWorkout.gif}
                alt={`Workout ${currentWorkout._id}`}
                className="mx-auto mb-4 rounded-lg shadow-lg max-w-full h-auto"
              />
              <p className="text-2xl font-semibold">{currentWorkout.name}</p>
              <p className="text-gray-600">{currentWorkout.description}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
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
  );
}

export default WorkoutView;
