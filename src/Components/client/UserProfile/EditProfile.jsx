import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import userAxios from "../../../Axios/userAxios";

function EditProfileModal({ setIsEditing, userData, handleChange, handleSubmit, setImageUrl }) {
  const [loading, setLoading] = useState(false);


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
      const response = await userAxios.post("uploadImage", { image: base64 });
      setImageUrl(response.data);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
        <div className="relative bg-white rounded-lg shadow-lg w-3/6">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover-text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={() => setIsEditing(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Setup Profile
            </h3>
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter new name"
                  value={userData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue block w-full p-2.5 dark:bg-gray dark:border-gray-500 dark:placeholder-gray-400 dark:text-lavender"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter new email"
                  value={userData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue block w-full p-2.5 dark:bg-gray dark:border-gray-500 dark:placeholder-gray-400 dark:text-lavender"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Gender:
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-900 ">
                    Current Gender: {userData.gender}
                  </span>
                  <input
                    type="radio"
                    name="gender" // This should be "gender"
                    id="male"
                    value="male"
                    checked={userData.gender === 'male'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400"
                  />

                  <label htmlFor="male" className="text-sm text-gray-900 ">
                    Men
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={userData.gender === 'female'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-pink-600 dark:text-pink-400"
                  />
                  <label htmlFor="female" className="text-sm text-gray-900 ">
                    Women
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    checked={userData.gender === 'other'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-purple-600 dark:text-purple-400"
                  />
                  <label htmlFor="other" className="text-sm text-gray-900 ">
                    Other
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Height:
                </label>
                <input
                  type="text"
                  name="height"
                  id="height"
                  placeholder="Enter new height"
                  value={userData.height}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue block w-full p-2.5 dark:bg-gray dark:border-gray-500 dark:placeholder-gray-400 dark:text-lavender"
                  required
                />
              </div>
              <div>
                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Weight:
                </label>
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  placeholder="Enter new weight"
                  value={userData.weight}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue block w-full p-2.5 dark:bg-gray dark:border-gray-500 dark:placeholder-gray-400 dark:text-lavender"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Phone:
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter new phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue block w-full p-2.5 dark:bg-gray dark:border-gray-500 dark:placeholder-gray-400 dark:text-lavender"
                  required
                />
              </div>
              <div>
                <label htmlFor="profilePhoto" className="block mb-2 text-sm font-medium text-gray-900">
                  Profile Photo:
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e)}
                  className="text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-violet hover:bg-lavender font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-500 dark:hover-bg-amber-600"
              >
                SAVE DATAS
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default EditProfileModal;
