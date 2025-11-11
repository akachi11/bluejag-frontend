// src/pages/Checkout.jsx
import React, { useState } from "react";
import axios from "axios";
import { useHomeContext } from "../context/HomeContext";
import { getStoredUser } from "../utils/helpers";

const Checkout = () => {
  const { cart, setCart } = useHomeContext(); // assuming you store cart in context
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const user = getStoredUser();
      if (!user?.token) throw new Error("You must be logged in.");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/create`,
        {
          paymentMethod: "paystack", // or bank, etc.
          discountCode: "", // optional
          shippingAddress: {
            street: "12 Kings Rd",
            city: "Lagos",
            state: "Lagos",
          },
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setMessage(
        `Order placed successfully! Tracking ID: ${res.data.order.trackingId}`
      );

      // clear local cart
      setCart({ items: [], subTotal: 0 });
      localStorage.removeItem("cartData"); // if you persist it
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <p className="text-gray-700 mb-2">
        You have {cart?.items?.length || 0} item(s) in your cart.
      </p>

      <button
        onClick={handleCheckout}
        disabled={loading || !cart?.items?.length}
        className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Placing order..." : "Confirm Order"}
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default Checkout;
