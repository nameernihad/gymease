import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/user";
import AdminRoutes from "./Routes/admin";
import TrainerRoutes from "./Routes/trainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/trainer/*" element={<TrainerRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
