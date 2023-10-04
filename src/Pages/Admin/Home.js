import React, { useState } from "react";
import AdminDashboard from "../../Components/admin/Home/adminDashboard";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/admin/Home/adminNav";

function Adminhome() {
  return (
    <div>
      <Navbar />
      
      <Outlet/>
    </div>
  );
}

export default Adminhome;
