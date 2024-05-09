import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains"
import { ToastContainer } from "react-toastify";
// import dotenv from 'dotenv'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain =  Sepolia ;
const container = document.getElementById("root");
const root = createRoot(container);
const clientID = process.env.REACT_APP_TEMPLATE_CLIENT_ID;
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={clientID}
    >
      <ToastContainer />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();
