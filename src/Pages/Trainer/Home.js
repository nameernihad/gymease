import { Outlet } from "react-router-dom";
import Home from "../../Components/Trainer/Home/Home";
import Navbar from "../../Components/Trainer/NavBar";

import Sidebar from "../../Components/Trainer/Sidebar";

function TrainerHome() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default TrainerHome;
