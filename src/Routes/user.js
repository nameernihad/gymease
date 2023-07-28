import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Client/Register";
import Home from "../Pages/Client/Home";
import Login from "../Pages/Client/Login";

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default UserRoutes;
