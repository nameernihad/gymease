import React, { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import PaymentSuccessPage from "../../Components/client/ListTrainer/paymentSuccess"; // Import the PaymentSuccessPage component
import userAxios from "../../Axios/userAxios";

function CheckoutForm({ selectedAmount, selectedDuration, selectedTrainerId }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSuccess = (details) => {
    console.log("Payment completed successfully:", details);
    setPaymentCompleted(true);

    const postData = {
      duration: selectedDuration,
      amount: selectedAmount,
    };

    userAxios
      .post(`/subscription/${selectedTrainerId}`, postData)
      .then((response) => {
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        console.error("POST request failed:", error);
      });

    navigate("/payment-success");
  };

  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: selectedAmount,
                  currency_code: "USD",
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(handlePaymentSuccess);
        }}
        style={{ layout: "horizontal" }}
        disabled={isPending}
      />

      {/* Render the PaymentSuccessPage component if payment is completed */}
      {paymentCompleted && <PaymentSuccessPage />}
    </div>
  );
}

export default CheckoutForm;
