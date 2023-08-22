import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Client/Register";
import Home from "../Pages/Client/Home";
import Login from "../Pages/Client/Login";
import { useSelector } from "react-redux";
import PasswordResetPage from "../Components/resetPassword/resetPassword";
import LandingPage from "../Pages/Client/landing";
import About from "../Pages/Client/About";
import UploadImage from "../Components/uploadImage";
import UserProfile from "../Components/client/UserProfile/UserProfile";

function UserRoutes() {
  const IsAuth = useSelector((state) => state.Client);
  return (
    <div>
      <Routes>
        <Route path="/home" element={IsAuth.Token ? <Home /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={IsAuth.Token ? <Home /> : <LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={IsAuth.Token ? <Home /> : <Login />} />
        <Route path="/restPass/:id" element={<PasswordResetPage />} />
        <Route path="/uploadImage" element={<UploadImage />} />
        <Route
          path="/profile"
          element={IsAuth.Token ? <UserProfile /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default UserRoutes;
