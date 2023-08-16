import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Client/Register";
import Home from "../Pages/Client/Home";
import Login from "../Pages/Client/Login";
import { useSelector } from "react-redux";
import PasswordResetPage from "../Components/resetPassword/resetPassword";
import LandingPage from "../Pages/Client/landing";

function UserRoutes() {
  const IsAuth = useSelector((state) => state.Client);
  return (
    <div>
      <Routes>
        <Route path="/home" element={IsAuth.Token ? <Home /> : <Login />} />
        <Route path="/" element={IsAuth.Token ? <LandingPage /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={IsAuth.Token ? <Home /> : <Login />} />
        <Route path="/restPass/:id" element={<PasswordResetPage />} />
      </Routes>
    </div>
  );
}

export default UserRoutes;
