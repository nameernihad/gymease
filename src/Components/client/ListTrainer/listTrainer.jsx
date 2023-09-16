import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Navbar from "../landingPage/navBar";
import userAxios from "../../../Axios/userAxios";

function ListTrainer() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [trainerdetails, setTrainerDetails] = useState([]);

  useEffect(() => {
    userAxios.get("/getAllTrainer").then((res) => {
      setTrainerDetails(res.data.Trainerdetails);
    });
  }, []);

  const addFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

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
          {trainerdetails.map((trainer) => (
            <div
              key={trainer.id}
              className="flex flex-col items-center bg-black border border-gray-300 rounded-lg shadow-md md:flex-row md:max-w-4xl hover:bg-gray-950 mb-4 p-6 w-full"
              style={{ height: "350px" }} // Set a fixed card height
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
                <div
                  className="mb-3 flex"
                  style={{ maxHeight: "100px", overflow: "hidden" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "8px", // Add margin-right to create a small gap
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
                  className="mb-3 font-normal"
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  Description: {trainer.about}
                </p>
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
    </div>
  );
}

export default ListTrainer;
