import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutForm from "../../Components/payment/checkoutForm";

function Payment() {
  const initialOptions = {
    clientId:
      "AY77L9LTOMQw_3GWULV1AEH3TVQ3wo3Bmb68wEx-iymLc1DvI_KPd5_ddfMINzFwRAhH0WpN3qPqoO5o",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div>
        <CheckoutForm />
      </div>
    </PayPalScriptProvider>
  );
}

export default Payment;
