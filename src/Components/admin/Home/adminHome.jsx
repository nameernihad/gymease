import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminauthLogout } from "../../../Redux/AdminAuth";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(AdminauthLogout());

    navigate("/admin/login");
  };

  return (
    <div>
      <h1>Welcome to UserHome!</h1>
      <button className="w-60 bg-ambere-500 rounded-xl" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
