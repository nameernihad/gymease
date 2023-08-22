import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "male",
    height: "",
    weight: "",
    phone: "",
    profilePhoto: null,
  });

  useEffect(() => {
    userAxios
      .get("/singView/64e4813a0c624ce9db959f0b")
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  console.log(userDetails);
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: name === "profilePhoto" ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("profilePhoto", userData.profilePhoto);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("gender", userData.gender);
    formData.append("height", userData.height);
    formData.append("weight", userData.weight);
    formData.append("phone", userData.phone);

    try {
      await userAxios
        .put("/updateUser/64e4813a0c624ce9db959f0b", formData)
        .then((res) => {
          if (res.data.user) {
            console.log(res.data.user);
            toast.success(res.data.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: true,
            });
          }
          setUserDetails(res.data.user);
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
          });
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full sm:max-w-md bg-gray-800 rounded-lg overflow-hidden shadow-lg p-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-600 rounded-full overflow-hidden">
            {userData.profilePhoto ? (
              <img
                src={URL.createObjectURL(userData.profilePhoto)}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="w-full h-full text-gray-400"
              />
            )}
          </div>
          <div>
            <div className="mt-4">
              <label
                htmlFor="profilePhoto"
                className="block text-sm font-medium cursor-pointer"
              >
                Change Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                name="profilePhoto"
                id="profilePhoto"
                onChange={handleChange}
                className="hidden"
              />
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={userData.name}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="fullName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone Number
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <select
                  name="gender"
                  id="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  <option className="dark:text-gray-400" value="male">
                    Male
                  </option>
                  <option className="dark:text-gray-400" value="female">
                    Female
                  </option>
                  <option className="dark:text-gray-400" value="other">
                    Other
                  </option>
                </select>
                <label
                  htmlFor="gender"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Gender
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={userData.height}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="height"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Height (cm)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={userData.weight}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="weight"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Weight (kg)
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring focus:ring-amber-300 w-full"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
