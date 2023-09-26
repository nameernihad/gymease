import React from "react";
import { Route, Routes } from "react-router-dom";
// import TrainerHome from "../Pages/Trainer/Home";

import Login from "../Pages/Trainer/Login";
import { useSelector } from "react-redux";
import Home from "../Components/Trainer/Home/Home";
import TrainerHome from "../Pages/Trainer/Home";
import TrainerProfile from "../Components/Trainer/Home/TrainerProfile";
import VideoCallPage from "../Pages/Trainer/videoCall";

function TrainerRoutes() {
  const IstrainerAuth = useSelector((state) => state.Trainer);

  return (
    <div>
      <Routes>
        <Route path="/" element={<TrainerHome />}>
          <Route
            path="/home"
            element={IstrainerAuth.Token ? <Home /> : <Login />}
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
