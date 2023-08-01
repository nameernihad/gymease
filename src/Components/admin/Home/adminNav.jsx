import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminauthLogout } from "../../../Redux/AdminAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onShowSideBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUpdateState = () => {
    onShowSideBar(true);
  };
  const handleLogout = () => {
    dispatch(AdminauthLogout());
    navigate("/admin/login");
  };

  return (
    <nav className="bg-blue-900 text-white p-4 flex items-center justify-between fixed top-0 w-full">
      <div className="flex items-center ">
        <FontAwesomeIcon
          icon={faBars}
          className="mr-2"
          onClick={onUpdateState}
        />
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-blue-500">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Users
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Workouts
            </a>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
        <div className="ml-4">
          {/* Add search bar component here */}
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 bg-blue-800 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 ml-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
