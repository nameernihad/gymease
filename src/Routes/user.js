import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Client/Register";
import Home from "../Pages/Client/Home";
import Login from "../Pages/Client/Login";
import { useSelector } from "react-redux";

function UserRoutes() {
  const IsAuth = useSelector((state) => state.Client);
  return (
    <div>
      <Routes>
        <Route path="/home" element={IsAuth.Token ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={IsAuth.Token ? <Home /> : <Login />} />
      </Routes>
    </div>
  );
}

export default UserRoutes;
