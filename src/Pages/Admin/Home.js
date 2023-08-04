import React, { useState } from "react";
import Navbar from "../../Components/admin/Home/adminNav";
import UserList from "../../Components/admin/Home/userList";

function AdminHome() {
  return (
    <div>
      <Navbar />

      <UserList />
    </div>
  );
}

export default AdminHome;
