import React, { useEffect, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutForm from "../../../Components/payment/checkoutForm";
import userAxios from "../../../Axios/userAxios";

const initialOptions = {
  clientId:
    "AY77L9LTOMQw_3GWULV1AEH3TVQ3wo3Bmb68wEx-iymLc1DvI_KPd5_ddfMINzFwRAhH0WpN3qPqoO5o",
  currency: "USD",
  intent: "capture",
};

function PaymentModal({ closeModal, trainerId }) {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [trainerDetails, setTrainerDetails] = useState(null);
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(null);

  const handlePaymentChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPayment(selectedValue);

    // Find the corresponding amount for the selected payment key from trainerDetails
    const amount = trainerDetails?.paymentDetails[selectedValue] || 0;
    setPaymentAmount(amount);
  };

  useEffect(() => {
    // Fetch trainer details based on trainerId
    const fetchTrainerDetails = async () => {
      try {
        const response = await userAxios.get(`/getTrainerById/${trainerId}`);
        setTrainerDetails(response.data.trainer.singleTrainer);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching trainer details:", error);
      }
    };

    fetchTrainerDetails();
  }, [trainerId]);

  useEffect(() => {
    console.log(paymentAmount);
    setShowPayPalButton(paymentAmount > 0);
  }, [paymentAmount]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="custom-modal z-10 bg-gray-900 text-white p-8 rounded-lg shadow-lg w-2/4">
        {/* Center Content */}
        <div className="flex flex-col items-center">
          {/* Round Profile Photo */}
          {trainerDetails && (
            <img
              src={trainerDetails.profilePhoto} // Replace with the actual URL of the profile photo
              alt="Trainer Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
          )}

          <h2 className="text-2xl font-bold mb-4">Select Payment Option</h2>
          {/* Check if trainerDetails is not null or undefined before accessing properties */}
          {trainerDetails && (
            <>
              <p className="mb-2">Trainer Name: {trainerDetails.user.name}</p>
              <p className="mb-2">Trainer Email: {trainerDetails.user.email}</p>
            </>
          )}

          {/* Payment Options */}
          <div className="relative inline-block text-white mb-4">
            <label htmlFor="payment" className="mr-2">
              Payment:
            </label>
            <select
              id="payment"
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
              value={selectedPayment}
              onChange={handlePaymentChange}
            >
              <option value="">Select Payment Option</option>
              {trainerDetails &&
                Object.entries(trainerDetails.paymentDetails).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {key} - {value}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Show PayPal button if a payment option is selected */}
          {showPayPalButton && (
            <PayPalScriptProvider options={initialOptions}>
              <CheckoutForm
                selectedAmount={paymentAmount}
                selectedDuration={selectedPayment}
                selectedTrainerId={trainerId}
              />
            </PayPalScriptProvider>
          )}

          <button
            onClick={closeModal}
            className="bg-amber-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-amber-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
