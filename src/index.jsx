import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { HomeProvider } from "./context/HomeContext";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </HomeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
