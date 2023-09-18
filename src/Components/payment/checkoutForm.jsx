import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function CheckoutForm() {
  const [{ isPending }] = usePayPalScriptReducer();

  // Handle the payment completion
  const handlePaymentSuccess = (details) => {
    console.log("Payment completed successfully:", details);
    // Add your own logic here to handle a successful payment, e.g., update the order status.
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: 50,
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
    </div>
  );
}

export default CheckoutForm;
