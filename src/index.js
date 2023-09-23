import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { Store, persistor } from "./Redux/Store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HMSRoomProvider } from "@100mslive/react-sdk";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <HMSRoomProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_Client_Id}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            <ToastContainer position="bottom-right" />
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </HMSRoomProvider>
  </StrictMode>
);
