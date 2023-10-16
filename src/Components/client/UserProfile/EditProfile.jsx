import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function EditProfileModal({ setIsEditing, userData, handleChange, handleSubmit }) {
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
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                  <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Gender:
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    placeholder="Enter new gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue block w-full p-2.5 dark:bg-gray dark:border-gray-500 dark:placeholder-gray-400 dark:text-lavender"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                  <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                    onChange={handleChange}
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
