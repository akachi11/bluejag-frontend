import React from "react";
import { usePaystackPayment } from "react-paystack";

const PayButton = ({
  email,
  amount,
  metadata,
  disabled,
  publicKey,
  createOrder,
}) => {
  const metadataObj = {
    name: "",
    referrer: "http://localhost:5173/product/6905d6631b437ceae910cbbc",
  };

  const config = {
    email,
    amount,
    metadata: metadataObj,
    publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (response) => {
    createOrder();
  };

  const onClose = () => {
    console.log("❌ Payment closed");

    // Fix: Clean Paystack leftover overlay & iframe
    const overlays = document.querySelectorAll(
      ".paystack-overlay, iframe[src*='paystack']"
    );
    overlays.forEach((el) => el.remove());

    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
  };

  return (
    <button
      onClick={() =>
        initializePayment({ onSuccess: onSuccess, onClose: onClose })
      }
      disabled={disabled}
      className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#02a6f2] to-[#0070c0] rounded-lg text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img
        src="https://cdn.brandfetch.io/idM5mrwtDs/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B"
        alt="Paystack"
        className="w-5 h-5 object-contain"
      />
      <span>
        Pay{" "}
        {(amount / 100).toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        })}
      </span>
    </button>
  );
};

export default PayButton;
