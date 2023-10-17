import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import Navbar from "../../client/landingPage/navBar";
import EditProfileModal from './EditProfile'; 

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
    const fetchUserData = async () => {
      try {
        const response = await userAxios.get("/singView");
        setUserData(response.data.user);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchUserData();
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

    try {
      console.log(userData);
      const response = await userAxios.put("/userUpdate", userData);

      if (response.data.user) {
        toast.success(response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }

      setUserDetails(response.data.user);
    } catch (error) {
      console.log(error);
      console.error(error);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
      console.error(error.message);
    }

    // setIsEditing(false);
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
              src={userData.profilePhoto || "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"}
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

      {isEditing && (
        <EditProfileModal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          userData={userData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )
      }
    </>
  );
}

export default UserProfile;
