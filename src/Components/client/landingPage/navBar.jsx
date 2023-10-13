import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LandingPage from "../../../Pages/Client/landing";
import { ClientLogout } from "../../../Redux/ClientAuth";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isTop, setIsTop] = useState(true); // Added state for tracking scroll position
  const IsAuth = useSelector((state) => state.Client);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    dispatch(ClientLogout());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-10 w-full ${
        isTop ? "bg-transparent" : "bg-black" 
      }`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src="/Images/logoMain.png" className="h-10 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Gym Ease
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={isDropdownOpen}
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:w-auto ${isDropdownOpen ? "block" : ""} flex gap-10`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to="/home"
                className={`block py-2 pl-3 pr-4 text-white rounded md:p-0 ${activeLink === "Home" ? "md:text-amber-700 active-link" : ""}`}
                onClick={() => handleNavLinkClick("Home")}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0 ${activeLink === "About" ? "md:text-amber-700 active-link" : ""}`}
                onClick={() => handleNavLinkClick("About")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/ListTrainer"
                className={`block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0 ${activeLink === "Pricing" ? "md:text-amber-700 active-link" : ""}`}
                onClick={() => handleNavLinkClick("Pricing")}
              >
                MentorShip
              </Link>
            </li>
            <li>
              <Link
                to="/joinAsTrianer"
                className={`block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0 ${activeLink === "JoinAsTrainer" ? "md:text-amber-700 active-link" : ""}`}
                onClick={() => handleNavLinkClick("JoinAsTrainer")}
              >
                Join As Trainer
              </Link>
            </li>
            {IsAuth.Token ? (
              <li>
                <Link
                  to=""
                  className={`block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0`}
                  onClick={handleLogout}
                >
                  Sign Out
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={`block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0`}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
          <Link to="/profile">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
