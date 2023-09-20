import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import the Link component

function SuccessPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="w-20 h-20 bg-green-400 rounded-full mx-auto mb-4 flex justify-center items-center"
        >
          <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M416 128L192 384L96 288"
              stroke="white"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <p className="text-3xl font-semibold mb-4">Payment Successful</p>
        <p className="text-gray-600 text-lg">
          Your payment has been successfully processed.
        </p>

        {/* Use the Link component to navigate back to the home page */}
        <Link to="/home">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
