import React from "react";
import { Route, Routes } from "react-router-dom";
// import TrainerHome from "../Pages/Trainer/Home";

import Login from "../Pages/Trainer/Login";
import { useSelector } from "react-redux";
import Home from "../Components/Trainer/Home/Home";
import TrainerHome from "../Pages/Trainer/Home";
import TrainerProfile from "../Components/Trainer/Home/TrainerProfile";
import VideoCallPage from "../Pages/Trainer/videoCall";
import Dashboard from "../Pages/Trainer/DashBoard";

function TrainerRoutes() {
  const IstrainerAuth = useSelector((state) => state.Trainer);

  return (
    <div>
      <Routes>
        <Route path="/" element={<TrainerHome />}>
          <Route
            path="/dashboard"
            element={IstrainerAuth.Token ? <Dashboard /> : <Login />}
          />
          <Route path="/profile" element={<TrainerProfile />} />
        </Route>
        <Route
          path="/create-room"
          element={IstrainerAuth.Token ? <VideoCallPage /> : <Login />}
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
