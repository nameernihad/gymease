import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../Pages/Admin/Home";
import Login from "../Pages/Admin/Login";
import { useSelector } from "react-redux";

function AdminRoutes() {
  const IsAdminAuth = useSelector((state) => state.Admin);

  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={IsAdminAuth.Token ? <AdminHome /> : <Login />}
        />
        <Route
          path="/login"
          element={IsAdminAuth.Token ? <AdminHome /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
