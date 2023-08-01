import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="bg-amber-500 text-white w-64 p-4 h-screen flex flex-col">
      <div className="flex justify-end">
        <FontAwesomeIcon icon={faXmark} size="lg" />
      </div>
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link
            to="/users"
            className="block px-4 py-2 rounded hover:bg-white hover:text-amber-500"
          >
            User List
          </Link>
        </li>
        <li>
          <Link
            to="/trainers"
            className="block px-4 py-2 rounded hover:bg-white hover:text-amber-500"
          >
            Trainer List
          </Link>
        </li>
        <li>
          <Link
            to="/workouts"
            className="block px-4 py-2 rounded hover:bg-white hover:text-amber-500"
          >
            Workout Management
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded hover:bg-white hover:text-amber-500"
          >
            Dashboard
          </Link>
        </li>
        {/* Add more sidebar links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
