import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={"/trainer/login"}>
        <h1>Welcome to AdminHome!</h1>
      </Link>
    </div>
  );
};

export default Home;
