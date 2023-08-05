import React, { useState } from "react";
import Navbar from "../../Components/admin/Home/adminNav";
import UserList from "../../Components/admin/Home/userList";
import TrainerList from "../../Components/admin/Home/trainerList";

function AdminHome() {
  return (
    <div>
      <UserList />
      <TrainerList />
    </div>
  );
}

export default AdminHome;
