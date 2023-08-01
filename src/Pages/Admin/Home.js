import React, { useState } from "react";
import Navbar from "../../Components/admin/Home/adminNav";
import Sidebar from "../../Components/admin/Home/sidebarAdmin";

function AdminHome() {
  const [ShowSideBar, setShowSideBar] = useState(false);

  const sideBarActive = (updatedValue) => {
    setShowSideBar(updatedValue);
  };

  return (
    <div>
      <Navbar onShowSideBar={sideBarActive} />

      {ShowSideBar && <Sidebar />}
    </div>
  );
}

export default AdminHome;
