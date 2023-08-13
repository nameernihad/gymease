import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";
import { useSelector } from "react-redux";
import UserList from "../Components/admin/Home/userList";
import TrainerList from "../Components/admin/Home/trainerList";
import Navbar from "../Components/admin/Home/adminNav";
import WorkoutListing from "../Components/admin/Home/workOut";
import UserView from "../Components/client/userSingeView/userView";
import UserSingleView from "../Pages/Admin/userSingleView";

function AdminRoutes() {
  const IsAdminAuth = useSelector((state) => state.Admin);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/home"
          element={IsAdminAuth.Token ? <AdminHome /> : <Login />}
        />
        <Route
          path="/login"
          element={IsAdminAuth.Token ? <AdminHome /> : <Login />}
        />
        <Route
          path="/userList"
          element={IsAdminAuth.Token ? <UserList /> : <Login />}
        />
        <Route
          path="/trainersList"
          element={IsAdminAuth.Token ? <TrainerList /> : <Login />}
        />
        <Route
          path="/workoutsList"
          element={IsAdminAuth.Token ? <WorkoutListing /> : <Login />}
        />
        <Route
          path="/userView/:userId"
          element={IsAdminAuth.Token ? <UserSingleView /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
