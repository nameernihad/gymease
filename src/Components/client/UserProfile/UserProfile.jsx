import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {
    // Fetch user data when the component mounts
    userAxios
      .get("/singView")
      .then((res) => {
        console.log(res.data.user);
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
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-full bg-white relative">
        {/* Background Image */}
        <div className="h-1/3 w-full">
          <img
            className="w-full h-full"
            src="https://media.istockphoto.com/id/996078852/photo/yellow-background.jpg?s=612x612&w=0&k=20&c=cERhT7bY6OWgqDP0r0kqoK2gU1nNhsXpQaUcyB8qGVQ="
            alt=""
          />
        </div>

        {/* Profile Box */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg sm:w-2/3 lg:w-1/2">
          <p className="text-amber-500 text-lg text-bold">
            Edit <FontAwesomeIcon icon={faPenToSquare} />
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

          {/* Image Upload Button */}
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

          {/* Profile Information */}
          <div className="text-start flex justify-center ">
            <div className="mt-2 ">
              {" "}
              {/* Reduced the margin-top */}
              <div className="text-lg text-gray-700 flex justify-between gap-20 ">
                <strong>Name:</strong>{" "}
                <input
                  type="text"
                  placeholder="Name"
                  value={userData.name}
                  className="form-input mt-1 block  text-start"
                  disabled
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Email:</strong>{" "}
                <input
                  type="text"
                  placeholder="Email"
                  value={userData.email}
                  className="form-input mt-1 block  text-start"
                  disabled
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Gender:</strong>{" "}
                <input
                  type="text"
                  placeholder="Gender"
                  value={userData.gender}
                  className="form-input mt-1 block  text-start"
                  disabled
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Height:</strong>{" "}
                <input
                  type="text"
                  placeholder="Height"
                  value={userData.height}
                  className="form-input mt-1 block  text-start"
                  disabled
                />
              </div>
              <div className="text-lg text-gray-700 flex justify-between gap-20">
                <strong>Weight:</strong>{" "}
                <input
                  type="text"
                  placeholder="Weight"
                  value={userData.weight}
                  className="form-input mt-1 block  text-start"
                  disabled
                />
              </div>
              <div className="text-lg text-gray-700 w-full flex justify-between gap-20">
                <strong>Phone:</strong>{" "}
                <input
                  type="text"
                  placeholder="Phone"
                  value={userData.phone}
                  className="form-input mt-1 block  text-start"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default UserProfile;
