// src/components/PasswordResetPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import userAxios from "../../Axios/userAxios";

const PasswordResetPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userAxios.patch(`/resetPass/${id}`, { password });
    console.log(res.data);
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Password reset successful.");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block font-medium">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-amber-300"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-amber-300"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-400 focus:outline-none"
            >
              Reset Password
            </button>
          </div>
        </form>
        {message === "Password reset successful." ? (<h2 className="mt-4 text-sm text-center text-green-500">{message}</h2>) : (<h2 className="mt-4 text-sm text-center text-red-500">{message}</h2>)}
      </div>
    </div>
  );
};

export default PasswordResetPage;
