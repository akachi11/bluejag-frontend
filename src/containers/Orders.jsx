import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader2, Copy, CheckCircle2, ArrowRight } from "lucide-react";
import { localHost, renderAPI } from "../constants";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";
import noOrderImg from "../assets/no-order.png";

const Orders = ({ profilePage }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState();

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // const handleScrollIndicators = () => {
  //   const el = scrollRef.current;
  //   if (!el) return;
  //   setCanScrollUp(el.scrollTop > 5);
  //   setCanScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 5);
  // };

  const displayOrders = profilePage
    ? orders.filter(
        (o) => o.status === "processing" || o.status === "confirmed"
      )
    : orders;

  useEffect(() => {
    if (profilePage && scrollRef.current) {
      const el = scrollRef.current;

      // Initial check after content is rendered
      const checkScroll = () => {
        setCanScrollUp(el.scrollTop > 5);
        setCanScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 5);
      };

      checkScroll(); // check on mount

      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, [profilePage, displayOrders]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${
            location.origin.includes("localhost") ? localHost : renderAPI
          }/api/order/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      className={`${
        profilePage
          ? "pt-4 overflow-auto h-full hide-scrollbar bg-gray-950"
          : "min-h-[70vh]"
      } bg-[#0a0a0a] text-gray-100 py-16 px-6 sm:px-12`}
      ref={scrollRef}
    >
      {canScrollUp && (
        <ChevronUp className="z-2 absolute top-2 left-1/2 transform -translate-x-1/2 text-blue-500 w-6 h-6 animate-bounce" />
      )}
      {canScrollDown && (
        <ChevronDown className="z-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 text-blue-500 w-6 h-6 animate-bounce" />
      )}
      {displayOrders.length > 1 && (
        <h1
          className={`${
            profilePage ? "text-xl lg:text-xl text-left" : ""
          } text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#02a6f2] to-[#0070c0] bg-clip-text text-transparent`}
        >
          {profilePage ? "Pending Orders" : "Your Orders"}
        </h1>
      )}

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Shimmer Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e293b]/40 to-transparent animate-[shimmer_1.4s_infinite_linear]" />

              {/* Order Header Skeleton */}
              <div className="flex justify-between mb-4 relative z-10">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-[#1e293b] rounded" />
                  <div className="h-3 w-24 bg-[#1e293b] rounded" />
                </div>
                <div className="h-6 w-20 bg-[#1e293b] rounded" />
              </div>

              {/* Item Rows */}
              <div className="space-y-3 mt-4 relative z-10">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#1e293b] rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-40 bg-[#1e293b] rounded" />
                      <div className="h-3 w-24 bg-[#1e293b] rounded" />
                    </div>
                    <div className="h-4 w-10 bg-[#1e293b] rounded" />
                  </div>
                ))}
              </div>

              {/* Footer Skeleton */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#1e293b] relative z-10">
                <div className="h-3 w-32 bg-[#1e293b] rounded" />
                <div className="h-5 w-16 bg-[#1e293b] rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : displayOrders.length === 0 ? (
        <div className="text-center">
          <img
            src={noOrderImg}
            className="m-auto w-full h-full lg:w-[30vw] lg:h-[40]"
            alt=""
          />
          <button
            onClick={() => navigate("/")}
            className="w-fit -mt-16 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid gap-8 max-w-4xl mx-auto">
          {displayOrders.map((order) => (
            <div
              key={order._id}
              onClick={() => {
                navigate(`/order/${order.trackingId}`);
              }}
              className="cursor-pointer bg-[#0f172a] border border-[#1e293b] rounded-2xl shadow-lg backdrop-blur-md p-6 hover:shadow-[#02a6f2]/20 hover:border-[#02a6f2]/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <p className="text-sm text-gray-400">
                    Order ID: <span className="text-gray-200">{order._id}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className="flex items-center gap-3"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex items-center gap-1 text-xs bg-[#1e293b] px-3 py-1.5 rounded-lg border border-[#2e3a52]">
                    <span className="text-gray-300">Tracking:</span>
                    <span className="font-medium text-[#02a6f2]">
                      {order.trackingId || "Pending"}
                    </span>
                    {order.trackingId && (
                      <button
                        onClick={() => handleCopy(order.trackingId)}
                        className="ml-2 text-gray-400 hover:text-white"
                      >
                        {copied === order.trackingId ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#1e293b]">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#1e293b]"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        {item.size} • {item.color}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₦{(item.price * item.qty).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">({item.qty} pcs)</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-between items-center border-t border-[#1e293b] pt-4">
                <div className="text-sm text-gray-400">
                  <p className="uppercase text-xs font-semibold mb-1">STATUS</p>
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                      order.status === "shipped"
                        ? "bg-green-600/20 text-green-400"
                        : order.status === "cancelled"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-blue-600/20 text-blue-400"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-lg font-bold text-[#02a6f2]">
                  ₦{order.total.toLocaleString()}
                </div>
              </div>
            </div>
          ))}

          <p
            className="flex gap-2 items-center text-blue-500 text-sm underline cursor-pointer"
            onClick={() => {
              navigate("/orders");
            }}
          >
            Go to my orders <ArrowRight size={20} />
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
