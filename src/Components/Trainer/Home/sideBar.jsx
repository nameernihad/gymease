import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

const Drawer = ({ onClose }) => {
  const drawerRef = useRef(null);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    // Set a timeout to show the drawer with a slow transition
    const showTimeout = setTimeout(() => {
      setIsShowing(true);
    }, 100);

    return () => clearTimeout(showTimeout);
  }, []);

  const handleCloseClick = () => {
    setIsShowing(false);
    // Set a timeout to hide the drawer with a slow transition before closing
    const closeTimeout = setTimeout(() => {
      onClose();
    }, 300);

    return () => clearTimeout(closeTimeout);
  };

  return (
    <div
      ref={drawerRef}
      className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-64 dark:bg-gray-800 transform transition-transform ease-in-out duration-300 ${
        isShowing ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h1 className="flex text-center text-xl font-bold font-serif">GymEase</h1>
      <br />
      <br />
      <ul className="space-y-2 font-medium">
        <li>
          <Link
            to="/trainer/profile"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
            <span className="ml-3">Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/trainer/userList"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon
              icon={faUsers}
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
            <span className="ml-3">User List</span>
          </Link>
        </li>
        <li>
          <Link
            to="/trainer/dashboard"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon
              icon={faChartSimple}
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
            <span className="ml-3">Dashboard</span>
          </Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={handleCloseClick}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
    </div>
  );
};

export default Drawer;
