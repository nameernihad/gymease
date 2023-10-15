import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import Navbar from "../../client/landingPage/navBar";
import RatingModal from "../RatingModal";

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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    userAxios
      .get("/singView")
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

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
      const response = await userAxios.put("/updateUser", formData);

      if (response.data.user) {
        toast.success(response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }

      setUserDetails(response.data.user);
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
      console.error(error.message);
    }

    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-full bg-white relative">
        <div className="h-1/3 w-full">
          <img
            className="w-full h-full"
            src="https://media.istockphoto.com/id/996078852/photo/yellow-background.jpg?s=612x612&w=0&k=20&c=cERhT7bY6OWgqDP0r0kqoK2gU1nNhsXpQaUcyB8qGVQ="
            alt=""
          />
        </div>

        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg sm:w-2/3 lg:w-1/2">
          <p className="text-amber-500 text-lg font-bold">
            Profile{" "}
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => setIsEditing(true)}
              className="cursor-pointer"
            />
          </p>
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <img
              className="w-full h-full rounded-full"
              src={
                userData.profilePhoto ||
                "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
              }
              alt="Avatar"
            />
          </div>

          <div className="text-center mb-4">
            <label htmlFor="profilePhoto" className="cursor-pointer">
              <div className="text-amber-500 font-bold px-4 rounded">
                Upload Photo
              </div>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="text-start flex justify-center">
            <div className="mt-2">
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Name:</strong>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={userData.name}
                  className="form-input mt-1 block"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Email:</strong>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  className="form-input mt-1 block"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Gender:</strong>
                <input
                  type="text"
                  placeholder="Gender"
                  name="gender"
                  value={userData.gender}
                  className="form-input mt-1 block"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Height:</strong>
                <input
                  type="text"
                  placeholder="Height"
                  name="height"
                  value={userData.height}
                  className="form-input mt-1 block"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Weight:</strong>
                <input
                  type="text"
                  placeholder="Weight"
                  name="weight"
                  value={userData.weight}
                  className="form-input mt-1 block"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="text-lg text-gray-700 w-full flex justify-between gap-20">
                <strong>Phone:</strong>
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={userData.phone}
                  className="form-input mt-1 block"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-black bg-opacity-25 absolute inset-0"></div>
    <div className="bg-white rounded-lg p-4 sm:w-2/3 lg:w-1/2 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <button
          onClick={() => setIsEditing(false)}
          className="text-amber-500 hover:text-amber-600 cursor-pointer"
        >
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-gray-700 font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-700 font-bold">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="gender" className="text-gray-700 font-bold">
              Gender:
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="height" className="text-gray-700 font-bold">
              Height:
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={userData.height}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="weight" className="text-gray-700 font-bold">
              Weight:
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="phone" className="text-gray-700 font-bold">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="profilePhoto" className="text-gray-700 font-bold">
              Profile Photo:
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}



    </>
  );
}

export default UserProfile;
