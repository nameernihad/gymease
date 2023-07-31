import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
// import dotenv from "dotenv";
import { Store, persistor } from "./Redux/Store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// dotenv.config();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="117068928825-itj672k758dm99b2ndblrg8luntpsikj.apps.googleusercontent.com">
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer position="bottom-right" />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
