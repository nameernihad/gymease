import React, { useState } from "react";
import Drawer from "../Home/sidebarAdmin";
import { AdminauthLogout } from "../../../Redux/AdminAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    dispatch(AdminauthLogout());
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-amber-500 text-white transition-all duration-500">
      <button
        className={`text-amber-500 bg-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-white focus:outline-none dark:focus:ring-amber-600 ${
          isDrawerOpen ? "active" : ""
        } transform hover:scale-105 transition-transform`}
        type="button"
        onClick={handleDrawerToggle}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="flex" >
        {/* <input
          type="text"
          className="px-3 py-2 mr-2 text-slate-500 bg-gray-200 rounded-lg dark:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-500"
          placeholder="Search"
        /> */}

        <button
          className="text-amber-500 bg-white font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-50 transition-all duration-500 transform hover:scale-105"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {isDrawerOpen && (
        <div className="drawer-wrapper transition-all duration-500 ease-in-out">
          <Drawer onClose={() => setIsDrawerOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
