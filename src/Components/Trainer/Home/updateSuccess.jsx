import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileUpdateSuccessModal({
  showModal,
  setShowModal,
  successMessage,
  content,
}) {
  const closeModal = () => {
    setShowModal(false);
  };

  const handleBackToHome = () => {
    closeModal();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-4xl mx-auto">
            <div className="relative bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold text-green-500 text-center w-full">
                  Success!
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6">
                <p className="text-lg text-green-500 text-center mb-4">
                  {successMessage}
                </p>
                <p className="text-lg text-amber-500 text-center">{content}</p>
              </div>
              <div className="flex items-center justify-center p-6 border-t border-solid border-gray-300 rounded-b">
                <Link to="/">
                  <button
                    className="text-black bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-4 mb-2 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleBackToHome}
                  >
                    Back to Home
                  </button>
                </Link>
                <button
                  className="text-black bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-2 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
