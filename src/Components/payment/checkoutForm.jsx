import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import userAxios from "../../Axios/userAxios";

function CheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async () => {
    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.error("Card element not found.");
        return;
      }

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      const response = await userAxios.post(
        "/create-subscription",
        {
          paymentMethod: paymentMethod.id,
          name,
          email,
          priceId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const confirmPayment = await stripe.confirmCardPayment(
          response.data.clientSecret
        );

        if (confirmPayment.error) {
          alert(confirmPayment.error.message);
        } else {
          alert("Success! Check your email for the invoice.");
        }
      } else {
        alert("Failed to create subscription.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-4 m-auto">
      <input
        placeholder="Price Id"
        type="text"
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
      />
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CardElement />
      <button onClick={createSubscription} disabled={!stripe}>
        Subscribe
      </button>
    </div>
  );
}

export default CheckoutForm;
