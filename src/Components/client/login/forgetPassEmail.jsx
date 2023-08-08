import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import userAxios from "../../../Axios/userAxios";

function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setmsg] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const res = await userAxios.post(`/sentMail`, { email });
    console.log(res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-md p-8 z-10 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-3 text-gray-600 hover:text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-amber-500">
            Forgot Password
          </h2>
          <p className="text-gray-600 mt-2">
            Add your email to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-amber-300 rounded focus:border-amber-300 focus:ring-amber-300"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-400 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
