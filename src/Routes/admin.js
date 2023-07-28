import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";

function adminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default adminRoutes;
