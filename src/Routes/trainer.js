import React from "react";
import { Route, Routes } from "react-router-dom";
import TrainerHome from "../Pages/Trainer/Home";
import Login from "../Pages/Trainer/Login";
import { useSelector } from "react-redux";

function TrainerRoutes() {
  const IstrainerAuth = useSelector((state) => state.Trainer);

  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={IstrainerAuth.Token ? <TrainerHome /> : <Login />}
        />
        <Route
          path="/login"
          element={IstrainerAuth.Token ? <TrainerHome /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default TrainerRoutes;
