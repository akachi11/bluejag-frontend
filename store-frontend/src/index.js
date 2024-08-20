import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HomeProvider } from "./context/HomeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomeProvider>
      <App />
    </HomeProvider>
  </React.StrictMode>
);
