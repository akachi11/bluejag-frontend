import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, XCircle, ShoppingBag } from "lucide-react";
import OrderDetailsSkeleton from "./OrderDetailSkeleton";
import { localHost, renderAPI } from "../constants";
import { toast } from "react-toastify";
import notFound from "../assets/not-found.png";

export default function OrderDetails() {
  const { oid } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${
            location.origin.includes("localhost") ? localHost : renderAPI
          }/api/order/${oid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(data);
      } catch (err) {
        console.error(err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [oid]);

  const handleCancelOrder = async () => {
    setCancelling(true);
    try {
      const res = await axios.put(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/order/${order._id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCancelling(false);
      toast.success("Order cancelled");
      setOrder((prev) => ({ ...prev, status: "cancelled" }));
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  if (loading) return <OrderDetailsSkeleton />;

  return (
    <div className="min-h-[70vw] bg-[#0a0a0a] text-white px-4 sm:px-10 py-10">
      {!order ? (
        <div className="pb-20 text-center">
          <img
            src={notFound}
            alt=""
            className="m-auto md:w-[70vw] lg:w-[40vw]"
          />

          <button
            className="bg-blue-950 montserrat px-8 py-4 rounded-3xl font-semibold"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Homepage
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-[#0f172a] rounded-2xl p-6 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Order #{order.trackingId?.slice(4)?.toUpperCase()}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                order.status === "shipped"
                  ? "bg-green-600/20 text-green-400"
                  : order.status === "cancelled"
                  ? "bg-red-600/20 text-red-400"
                  : "bg-blue-600/20 text-blue-400"
              }`}
            >
              {order.status?.toUpperCase()}
            </span>
          </div>

          {/* Items */}
          <div className="mt-8 space-y-5">
            {order.items?.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between bg-[#1e293b] rounded-xl p-4 sm:p-5"
              >
                <div
                  onClick={() => {
                    navigate(`/product/${item.productId._id}`);
                  }}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-white/10"
                  />
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white">
                      {item.name}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      Qty: {item.qty}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-100">
                  ₦{item.price * item.qty}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 bg-[#1e293b] rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-3 border-b border-white/10 pb-2">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{order.subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₦{order.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₦{order.tax}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-₦{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold mt-3 border-t border-white/10 pt-3">
                <span>Total</span>
                <span>₦{order.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          {order.status !== "cancelled" && (
            <div className="mt-8 bg-[#1e293b] rounded-xl p-5">
              <h3 className="font-semibold text-lg mb-3 border-b border-white/10 pb-2">
                Shipping Address
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {order.shippingAddress?.line1}
                <br />
                {order.shippingAddress?.line2 && (
                  <>
                    {order.shippingAddress.line2}
                    <br />
                  </>
                )}
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
                <br />
                {order.shippingAddress?.phone}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {(order.status === "processing" || order.status === "confirmed") && (
            <div className="flex justify-end gap-4 mt-10">
              {order.status !== "cancelled" && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-lg font-medium hover:bg-red-700/30 transition-all duration-300"
                >
                  <XCircle className="w-5 h-5" />
                  Cancel Order
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0f172a] rounded-2xl shadow-2xl p-8 max-w-sm w-[90%]"
          >
            <h2 className="text-xl font-semibold mb-3 text-center">
              Cancel Order?
            </h2>

            <p className="text-gray-400 text-sm text-center mb-6">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-5 py-2.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-gray-200 text-sm font-semibold transition-all"
              >
                No, Keep It
              </button>

              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className={`${
                  cancelling ? "bg-red-300" : ""
                } px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all`}
              >
                Yes, Cancel
              </button>
            </div>

            <p className="text-gray-500 text-xs text-center mt-8 italic">
              Refunds for cancelled orders are processed within 8–14 working
              days.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
