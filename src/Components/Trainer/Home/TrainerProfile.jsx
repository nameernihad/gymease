import React, { useState, useEffect } from "react";
import trainerAxios from "../../../Axios/trainerAxios";

function TrainerProfile() {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    trainerAxios
      .get("/getTrainer")
      .then((res) => {
        console.log(res.data);
        setTrainer(res.data.trainer.trainerDetailsById); // Assuming the response data is the trainer object
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="ml-4 md:ml-8 lg:ml-16 xl:ml-20 2xl:ml-24 mt-4 md:mt-8 lg:mt-16 xl:mt-20 2xl:mt-24 flex justify-center items-center">
      <section className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 bg-white shadow-xl p-3 pt-16 rounded-lg">
        <div className="cover-photo relative">
          <img
            className="absolute w-full h-36 object-cover rounded-t-lg"
            src={trainer?.coverPhoto || "https://via.placeholder.com/600x150"}
            alt="Cover Photo"
          />
        </div>
        <div className="flex flex-col justify-center items-center relative">
          <div className="profile-photo relative z-10">
            <img
              className="rounded-xl w-40 h-auto -mt-20"
              src={
                trainer?.profilePhoto ||
                "https://www.shareicon.net/data/128x128/2016/09/15/829452_user_512x512.png"
              }
              alt="Profile Photo"
            />
          </div>
          <div className="signUp-form flex flex-col justify-center items-center mt-4">
            <h2 className="form-title text-lavender">PROFILE</h2>
            <div className="form-group">
              <label htmlFor="name">
                <i className="zmdi zmdi-account material-icons-name"></i>
              </label>
              <p className="profile-field">
                Name : {trainer?.user?.name || ""}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="name">
                <i className="zmdi zmdi-account material-icons-name"></i>
              </label>
              <p className="profile-field">
                Email : {trainer?.user?.email || ""}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>
              </label>
              <p className="profile-field">
                Phone : {trainer?.user?.phone || ""}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>
              </label>
              <p className="profile-field">
                Specialization : {trainer?.field || ""}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>
              </label>
              <p className="profile-field">Height : {trainer?.height} cm</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>
              </label>
              <p className="profile-field">Weight : {trainer?.weight} kg</p>
            </div>
          </div>
        </div>
        <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-24 text-center">
          <div className="flex flex-wrap justify-center">
            <h1 className="text-2xl font-extrabold mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12">
              About Me
            </h1>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {trainer?.about || ""}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TrainerProfile;
