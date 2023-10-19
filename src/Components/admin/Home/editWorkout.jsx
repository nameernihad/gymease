import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../Axios/adminAxios";
import { toast } from "react-toastify";

const EditWorkoutModal = ({ isOpen, closeModal, workout, setWorkouts }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(workout.gif);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    adminAxios.get("/getAllCategory").then((res) => {
      setCategories(res.data.allcategory);
    });

    adminAxios.get("/getAllLevel").then((res) => {
      setLevels(res.data.allLevel);
    });
  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertBase64(file);
      setLoading(true);
      const response = await adminAxios.post("uploadImage", { image: base64 });
      setImageUrl(response.data);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: workout.name,
    description: workout.description,
    category: workout.category,
    level: workout.level,
    gif: imageUrl,
    count: workout.count,
    timer: workout.timer,
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    adminAxios
      .put(`/updateWorkout/${workout._id}`, updatedFormData)
      .then((res) => {
        toast.success(res.data.message);
        adminAxios.get("/getAllWorkouts").then((res) => {
          setWorkouts(res.data.workout);
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
              Edit Workout
            </h2>

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
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                    {levels.map((level) => (
                      <option key={level._id} value={level.name}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

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

            {loading ? (
              <div className="flex item-center justify-center w-14 h-14">
                <img src="/Images/Pulse-1s-200px.gif" alt="" />
              </div>
            ) : (
              <div className="space-y-6 mb-8">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Image Preview"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                )}
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
                  onChange={handleImageUpload}
                />
              </div>
            )}

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
                    value={formData.timer ? "timer" : "count"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prevData) => ({
                        ...prevData,
                        timer: value === "timer" ? 0 : "",
                        count: value === "count" ? 0 : "",
                      }));
                    }}
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
                    {formData.timer ? "Timer (sec)" : "Count"}
                  </label>
                  <input
                    type="number"
                    id="timerOrCountValue"
                    name="timerOrCountValue"
                    autoComplete="off"
                    value={formData.timer || formData.count}
                    onChange={formData.timer ? handleTimerChange : handleCountChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={
                      formData.timer ? "Enter timer duration" : "Enter count"
                    }
                  />
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
                className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md shadow-md hover-bg-amber-600 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
              >
                Update Workout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkoutModal;
