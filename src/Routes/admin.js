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
import CategoryListing from "../Components/admin/Home/categoryList";
import LevelListing from "../Components/admin/Home/level";
import TrainerEntry from "../Components/admin/Home/trainerList";
import TrainerRequestList from "../Components/admin/Home/trainerEntry";

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
          path="/Catogory"
          element={IsAdminAuth.Token ? <CategoryListing /> : <Login />}
        />
        <Route
          path="/Level"
          element={IsAdminAuth.Token ? <LevelListing /> : <Login />}
        />
        <Route
          path="/userView/:userId"
          element={IsAdminAuth.Token ? <UserSingleView /> : <Login />}
        />
        <Route
          path="/newEntry"
          element={IsAdminAuth.Token ? <TrainerRequestList /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
