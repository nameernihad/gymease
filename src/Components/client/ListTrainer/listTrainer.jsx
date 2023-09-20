import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import userAxios from "../../../Axios/userAxios";
import PaymentModal from "./subscriptionModal";

const paymentOptions = [
  { value: "oneMonth", label: "One Month" },
  { value: "sixMonths", label: "Six Months" },
  { value: "oneYear", label: "One Year" },
];

function ListTrainer() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [trainerDetails, setTrainerDetails] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [trainerId, setTrainerId] = useState();
  const [selectedPayment, setSelectedPayment] = useState(
    paymentOptions[0].value
  );

  // Function to handle payment selection
  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const openPaymentModal = (userId) => {
    setTrainerId(userId);
    setModalOpen(true);
  };

  useEffect(() => {
    // Fetch trainer details from the backend
    userAxios.get("/getAllTrainer").then((res) => {
      setTrainerDetails(res.data.Trainerdetails);
    });
  }, []);

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  // useEffect(() => {
  //   console.log(selectedPayment);
  // }, [selectedPayment]);

  return (
    <div className="bg-black min-h-screen p-5 py-24">
      {/* Horizontal Navigation Bar */}
      <div className="bg-amber-500 p-4 rounded-xl flex justify-between">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-white p-2 rounded-full w-1/4"
        />

        <div>
          <div className="relative inline-block text-white me-4">
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              className="bg-gray-700 text-white py-2 px-4 rounded-md"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
              {/* Add more sorting options */}
            </select>
          </div>

          {/* Filter Dropdown */}
          <div className="relative inline-block text-white">
            <label htmlFor="filter" className="mr-2">
              Filter by:
            </label>
            <select
              id="filter"
              className="bg-gray-700 text-white py-2 px-4 rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* Add more filter options */}
            </select>
          </div>
        </div>
      </div>

      {/* List of Trainers */}
      <div className="flex justify-between">
        <div className="flex-grow p-4 w-full">
          {trainerDetails.map((trainer) => (
            <div
              key={trainer.id}
              className="flex flex-col items-center bg-black border border-gray-300 rounded-lg shadow-md md:flex-row md:max-w-4xl hover:bg-gray-950 mb-4 p-6 w-full h-80 overflow-hidden"
            >
              {/* Trainer Image */}
              <img
                className="object-cover h-40 w-auto rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                src={trainer.profilePhoto}
                alt={trainer.user.name}
              />
              {/* Trainer Details */}
              <div className="flex flex-col justify-between p-4 leading-normal text-white w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight">
                  {trainer.user.name}
                </h5>
                <p className="mb-3 font-normal">Gender: {trainer.gender}</p>
                <p className="mb-3 font-normal">
                  Experience: {trainer.experience.years}
                </p>
                <div className="mb-3 flex">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "8px",
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={trainer.avgRating}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon style={{ color: "gray", opacity: 0.55 }} />
                      }
                    />
                  </Box>
                  <span className="text-white">({trainer.avgRating || 0})</span>
                </div>

                <p
                  className="mb-3 font-normal overflow-ellipsis"
                  style={{
                    maxHeight: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Description: {trainer.about}
                </p>

                {/* Payment Dropdown */}
                <div className="relative inline-block text-white">
                  <button
                    onClick={() => openPaymentModal(trainer._id)}
                    className="bg-gray-700 text-white py-2 px-4 rounded-md"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Filters and Sort Option */}
        <div className="bg-slate-950 text-white rounded-md my-3 p-4 w-1/4 ml-4">
          <h2 className="text-2xl font-semibold mb-2">Applied Filters</h2>
          <ul>
            {selectedFilters.map((filter) => (
              <li key={filter} className="mb-2">
                {filter}{" "}
                <button
                  className="text-amber-500 ml-2"
                  onClick={() => removeFilter(filter)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-4">Sort By</h2>
          <p>{sortBy === "rating" ? "Rating" : "Experience"}</p>
        </div>
      </div>
      {isModalOpen && (
        <PaymentModal
          closeModal={() => setModalOpen(false)}
          paymentOptions={paymentOptions}
          trainerId={trainerId}
        />
      )}
    </div>
  );
}

export default ListTrainer;
