import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../Axios/adminAxios";
import { toast } from "react-toastify";

const EditWorkoutModal = ({ isOpen, closeModal, setWorkOut }) => {
  const [selectedOption, setSelectedOption] = useState("timer");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    level: "Beginner",
    gif: "",
    count: 0,
    timer: 0,
  });
  const handleTimerChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, timer: value }));
  };

  const handleCountChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, count: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "level") {
      setFormData((prevData) => ({ ...prevData, level: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      level: e.target.level.value,
      // Add other fields as needed
    };

    setFormData(updatedFormData);

    adminAxios
      .post("/AddWorkout", updatedFormData)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);

        adminAxios.get("/getAllWorkouts").then((res) => {
          setWorkOut(res.data.workout);
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });

    closeModal();
  };
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-10 ${
        isOpen ? "flex justify-center items-center" : "hidden"
      } overflow-y-auto bg-gray-900 bg-opacity-50`}
    >
      <div
        className={`inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-3xl ${
          isOpen ? "sm:scale-100" : "sm:scale-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-100 px-6 py-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Add Workout
            </h2>

            {/* Workout Information */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="workout-name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Workout Name
                  </label>
                  <input
                    type="text"
                    id="workout-name"
                    name="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter workout name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    autoComplete="off"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter workout category"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="level"
                    className="text-sm font-medium text-gray-700"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                {/* ... Other fields ... */}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-8">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter workout description"
              />
            </div>

            {/* Media */}
            <div className="space-y-6 mb-8">
              <label
                htmlFor="image-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image-upload"
                name="image-upload"
                accept="image/*"
                // Rest of the input attributes...
              />
            </div>

            {/* Timer and Count */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="timerOrCount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Timer/Count
                  </label>
                  <select
                    id="timerOrCount"
                    name="timerOrCount"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="timer">Timer</option>
                    <option value="count">Count</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="timerOrCountValue"
                    className="text-sm font-medium text-gray-700"
                  >
                    {selectedOption === "timer" ? "Timer (sec)" : "Count"}
                  </label>
                  {selectedOption === "timer" ? (
                    <input
                      type="number"
                      id="timerOrCountValue"
                      name="timerOrCountValue"
                      autoComplete="off"
                      value={formData.timer}
                      onChange={handleTimerChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter timer duration"
                    />
                  ) : (
                    <input
                      type="number"
                      id="timerOrCountValue"
                      name="timerOrCountValue"
                      autoComplete="off"
                      value={formData.count}
                      onChange={handleCountChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter count"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
              >
                Add Workout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkoutModal;
