import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { faTv, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Try } from "@mui/icons-material";


function Sidebar({ onClose, onOpen }) {
  useEffect(() => {
    console.log(onClose,"hhhhhh")
  }, [onClose])
  

  const drawerRef = useRef(null);
  const [isShowing, setIsShowing] = useState(false);


  useEffect(() => {
    try {
       const showTimeout = setTimeout(() => {
      setIsShowing(true);
    }, 100);

    return () => clearTimeout(showTimeout);
    } catch (error) {
      console.log(error.message)
    }
   
  }, []);

  useEffect(() => {

    const handleCloseClick = () => {
    setIsShowing(false);
    const closeTimeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(closeTimeout);
  };
  
  }, [])
  
    
    
 
  return (
    <div
    ref={drawerRef}
    className={`fixed top-0 left-0 z-40 h-screen p-4  bg-white w-64 dark:bg-gray-800 transform transition-transform ease-in-out duration-300 ${
      isShowing ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <aside
      id="logo-sidebar"
      className="fixed mt-16 top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-800 z-50"
      aria-label="Sidebar"
    >
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="p-2 mt-2 mr-3 text-gray-500  sm:hidden hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-700 z-50"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/trainer/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group relative"
            >
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-gray-900 z-50"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/trainer/profile"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/trainer/create-room"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                icon={faTv}
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="ml-3">Video Chat</span>
            </Link>
          </li>
       
        </ul>
      </div>
    </aside>
    </div>
  );
}

export default Sidebar;
