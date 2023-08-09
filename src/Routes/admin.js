import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";
import { useSelector } from "react-redux";
import UserList from "../Components/admin/Home/userList";
import TrainerList from "../Components/admin/Home/trainerList";
import Navbar from "../Components/admin/Home/adminNav";
import WorkoutListing from "../Components/admin/Home/workOut";

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
      </Routes>
    </>
  );
}

export default AdminRoutes;
