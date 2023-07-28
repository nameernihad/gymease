import React from "react";
import { Route, Routes } from "react-router-dom";
import TrainerHome from "../Pages/Trainer/Home";
import Login from "../Pages/Trainer/Login";

function TrainerRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<TrainerHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default TrainerRoutes;
