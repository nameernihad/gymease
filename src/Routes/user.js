import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Client/Register";
import Home from "../Pages/Client/Home";
import Login from "../Pages/Client/Login";
import { useSelector } from "react-redux";
import PasswordResetPage from "../Components/resetPassword/resetPassword";
import LandingPage from "../Pages/Client/landing";
import About from "../Pages/Client/About";
import UserProfile from "../Components/client/UserProfile/UserProfile";
import CategoryPage from "../Pages/Client/category";
import Workout from "../Pages/Client/workout";
import JoinAsTrainer from "../Components/client/joinAsTrainer/joinAsTrainer";
import TrainerList from "../Pages/Client/ListTrainer";
import Payment from "../Pages/payment/Payment";
import CheckoutForm from "../Components/payment/checkoutForm";
import PaymentSuccessMessage from "../Components/client/ListTrainer/paymentSuccess";

function UserRoutes() {
  const IsAuth = useSelector((state) => state.Client);
  return (
    <div>
      <Routes>
        <Route path="/home" element={IsAuth.Token ? <Home /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={IsAuth.Token ? <Home /> : <LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={IsAuth.Token ? <Home /> : <Login />} />
        <Route path="/restPass/:id" element={<PasswordResetPage />} />
        <Route
          path="/profile"
          element={IsAuth.Token ? <UserProfile /> : <LandingPage />}
        />
        <Route
          path="/Category/:id"
          element={IsAuth.Token ? <CategoryPage /> : <LandingPage />}
        />
        <Route
          path="/workout/:cateId/:id"
          element={IsAuth.Token ? <Workout /> : <LandingPage />}
        />
        <Route
          path="/joinAsTrianer"
          element={IsAuth.Token ? <JoinAsTrainer /> : <LandingPage />}
        />
        <Route
          path="/ListTrainer"
          element={IsAuth.Token ? <TrainerList /> : <LandingPage />}
        />
        <Route
          path="/Payment"
          element={IsAuth.Token ? <Payment /> : <LandingPage />}
        />
        <Route
          path="/payment-success"
          element={IsAuth.Token ? <PaymentSuccessMessage /> : <LandingPage />}
        />
      </Routes>
    </div>
  );
}

export default UserRoutes;
