import {
  faStar,
  faUser,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import adminAxios from "../../../Axios/adminAxios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Login from "../../../Pages/Client/Login";
import LandingPage from "../../../Pages/Client/landing";
import { toast } from "react-toastify";

const TrainerCard = ({ logout }) => {
  const navigate = useNavigate();

  const [trainerdetails, setTrainerDetails] = useState([]);

  useEffect(() => {
    try {
      const response = userAxios.get("/getAllTrainer");
      console.log(response.data);
      setTrainerDetails(response.data.Trainerdetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <div className="overflow-x-auto bg-black p-4 pt-5">
      <div className="flex overflow-x-scroll p-5 scrollbar-hide">
        {trainerdetails.map((trainer, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center w-80 h-96 p-4 shadow dark:bg-gray-800 dark:border-gray-700 border rounded-lg shadow-md mx-2"
            whileHover={{ scale: 1.05 }} // Scale up on hover
          >
            <div
              key={index}
              className="flex flex-col items-center w-80 h-96 p-4 shadow dark:bg-gray-800 dark:border-gray-700 border rounded-lg shadow-md mx-2"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                {trainer.profilePhoto ? (
                  <img
                    src={trainer.profilePhoto}
                    alt={trainer.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-full h-full text-gray-500 bg-gray-300"
                  />
                )}
              </div>
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`text-${
                      i < 3 ? "amber-500" : "gray-300 opacity-50"
                    } mr-1`}
                  />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-300">
                {trainer.user.name}
              </h3>
              <p className="text-gray-500">Gender: {trainer.gender}</p>
              <p className="text-gray-500">
                Experience:
                {trainer.experience.years && (
                  <span>
                    {trainer.experience.years} years{" "}
                    {trainer.experience.months && trainer.experience.months > 0
                      ? `${trainer.experience.months} months`
                      : ""}
                  </span>
                )}
              </p>
              <button
                type="button"
                className="text-amber-400 mt-3 text-xs hover:text-white border border-amber-400 hover:bg-amber-500  focus:outline-none focus:ring-amber-300 font-medium rounded-lg px-2.5 py-1.5 text-center mr-2 mb-2 dark:border-amber-300 dark:text-amber-300 dark:hover:text-white dark:hover:bg-amber-400"
              >
                Payment{" "}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="ml-1 text-white"
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <style>
        {`
          .overflow-x-scroll::-webkit-scrollbar {
            width: 5px;
          }
          .overflow-x-scroll::-webkit-scrollbar-thumb {
            background-color: #f59e0b;
            border-radius: 2.5px;
          }
          .overflow-x-scroll::-webkit-scrollbar-thumb:hover {
            background-color: #c8790a;
          }
          .overflow-x-scroll::-webkit-scrollbar-track {
            background-color: #1f2937;
            border-radius: 2.5px;
          }
        `}
      </style>
    </div>
  );
};

export default TrainerCard;
