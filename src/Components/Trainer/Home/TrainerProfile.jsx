import React, { useState, useEffect } from "react";
import trainerAxios from "../../../Axios/trainerAxios";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfileModal from "./editProfile";
import EditTrainerProfile from "./editProfile";

function TrainerProfile() {
  const [trainer, setTrainer] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

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

  const handleEditUserClick = () => {
    setIsEditProfileModalOpen(true);
  };

  return (
    <div className="ml-4 md:ml-8 lg:ml-16 xl:ml-20 2xl:ml-24 mt-4 md:mt-8 lg:mt-16 xl:mt-20 2xl:mt-24 flex justify-center items-center">
      <section className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/3 bg-white shadow-xl p-3 pt-16 rounded-lg relative">
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
              <p className="profile-field">Height : {trainer?.user?.height} cm</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email"></i>
              </label>
              <p className="profile-field">Weight : {trainer?.user?.weight} kg</p>
            </div>
          </div>
        </div>
        <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-24 text-center">
          <div className="mt-4">
            <h2 className="text-xl font-bold">About</h2>
            <p>{trainer?.about || "N/A"}</p>
            <h2 className="text-xl font-bold mt-4">Certifications</h2>
            <ul className="list-disc ml-6">
              {trainer &&
                trainer.certifications.map((certification, index) => (
                  <li key={index}>
                    <a
                      href={certification}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Certification {index + 1}
                    </a>
                  </li>
                ))}
            </ul>
            <h2 className="text-xl font-bold mt-4">Experience</h2>
            <p>
              {trainer
                ? `${trainer?.experience?.years} years, ${trainer?.experience?.months} months, ${trainer?.experience?.days} days`
                : "N/A"}
            </p>
            <h2 className="text-xl font-bold mt-4">Payment Details</h2>
            <p>One Month: ${trainer?.paymentDetails ? trainer.paymentDetails.oneMonth : "N/A"}</p>
            <p>Six Months: ${trainer?.paymentDetails ? trainer.paymentDetails.sixMonths : "N/A"}</p>
            <p>One Year: ${trainer?.paymentDetails ? trainer.paymentDetails.oneYear : "N/A"}</p>
          </div>
        </div>
        
        <button className="edit-button   absolute top-4 left-4" onClick={handleEditUserClick}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </section>
      {/* {isEditProfileModalOpen && (
      <EditTrainerProfile
        isOpen={isEditProfileModalOpen}
        onRequestClose={() => setIsEditProfileModalOpen(false)}
        defaultData={trainer} 
      />
    )} */}
  
    </div>
  );
}

export default TrainerProfile;
