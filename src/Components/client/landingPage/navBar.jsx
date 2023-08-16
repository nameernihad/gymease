import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-transparent absolute top-0 z-10 w-full">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img src="/Images/logoMain.png" className="h-10 mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Gym Ease
            </span>
          </a>
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
            className={`w-full md:w-auto ${isDropdownOpen ? "block" : ""}`}
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white rounded md:text-amber-700 md:p-0 md:text-amber-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <div className="relative">
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-white hover:text-amber-700 rounded md:border-0  md:p-0 md:w-auto"
                    aria-controls="dropdownNavbar"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                  >
                    Dropdown
                    <FontAwesomeIcon className="ml-2" icon={faChevronDown} />
                  </button>
                  <div
                    className={`absolute z-10 ${
                      isDropdownOpen ? "block" : "hidden"
                    } font-normal divide-y divide-gray-100 rounded-lg shadow w-44`}
                    id="dropdownNavbar"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 "
                      aria-labelledby="dropdownNavbarLink"
                    >
                      <li>
                        <a href="#" className="block px-4 py-2 text-white">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2  text-white">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2  text-white">
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm  text-gray-700 text-white"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white rounded hover:text-amber-700 md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
