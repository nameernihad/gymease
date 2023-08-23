import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import { Navigate } from "react-router-dom";

const TrainerCard = ({ logout }) => {
  const [trainerdetails, settrainerdetails] = useState([]);
  useEffect(() => {
    userAxios
      .get("/getAllTrainer")
      .then((res) => {
        console.log(res);
        settrainerdetails(res.data.Trainerdetails);
      })
      .catch((err) => {
        console.log(err.response.status, "hgggggggggggggggggggggggggggggggggg");
        if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem("persist:Client");
          Navigate("/login");
        }
      });
  }, []);

  return (
    <div className="overflow-x-auto bg-black p-4">
      <div className="flex overflow-x-scroll scrollbar-hide">
        {trainerdetails.map((trainer, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-80 h-96 p-4 shadow dark:bg-gray-800 dark:border-gray-700 border  rounded-lg shadow-md mx-2"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
              <img
                src="https://media.istockphoto.com/id/1401908127/photo/portrait-of-one-serious-asian-trainer-alone-in-gym-handsome-focused-coach-standing-with-arms.webp?b=1&s=170667a&w=0&k=20&c=tzWSAc5SBE-yNedN4L95JLoBwDZ3oT09oFPu-eDvRuk="
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
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
              {trainer.name}
            </h3>
          </div>
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
