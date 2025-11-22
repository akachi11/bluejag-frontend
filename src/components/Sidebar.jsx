import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  X,
  ChevronRight,
  Package,
  Search,
  User,
  HelpCircle,
  Gift,
  LogIn,
  Sparkles,
  Clock,
} from "lucide-react";
import { useHomeContext } from "../context/HomeContext";
import { clickedComingSoon } from "../utils";

const Sidebar = () => {
  const { sideBarOpen, toggleSideBar, loggedIn } = useHomeContext();
  const [openMenu, setOpenMenu] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "men",
      label: "Men",
      // links: [
      //   { label: "View All", href: "/category/men" },
      //   { label: "Bestsellers", href: "/category/men/bestsellers" },
      //   { label: "New Arrivals", href: "/category/men/new" },
      //   { label: "Compression", href: "/category/compression" },
      //   { label: "Hoodies", href: "/category/hoodies" },
      // ],
    },
    {
      id: "women",
      label: "Women",
      // links: [
      //   { label: "View All", href: "/category/women" },
      //   { label: "Bestsellers", href: "/category/women/bestsellers" },
      //   { label: "New Arrivals", href: "/category/women/new" },
      //   { label: "Sports Bras", href: "/category/sports-bras" },
      //   { label: "Leggings", href: "/category/leggings" },
      // ],
    },
  ];

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: {
      x: "-100%",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  useEffect(() => {
    document.body.style.overflow = sideBarOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [sideBarOpen]);

  const handleNavigate = (href) => {
    navigate(href);
    toggleSideBar(false);
  };

  const handleTrackOrder = () => {
    if (trackingId.length >= 6) {
      navigate(`/order/${trackingId}`);
      toggleSideBar(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sideBarOpen && (
        <React.Fragment key="sidebar">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => toggleSideBar(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed min-h-screen overflow-y-auto left-0 top-0 z-50 w-full md:w-[380px] lg:hidden bg-[#0a0f1a] text-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-lg font-bold tracking-tight">MENU</span>
              <button
                onClick={() => toggleSideBar(false)}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="min-h-[50%] overflow-y-auto">
              {/* Main Navigation */}
              <nav className="p-4">
                {menuItems.map((item) => (
                  <div
                    onClick={() => navigate(`/category/${item.id}`)}
                    key={item.id}
                    className="border-b border-slate-800/50"
                  >
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === item.id ? null : item.id)
                      }
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-lg font-semibold">
                        {item.label}
                      </span>
                      {/* <ChevronRight
                        size={20}
                        className={`text-slate-400 transition-transform duration-300 ${
                          openMenu === item.id ? "rotate-90" : ""
                        }`}
                      /> */}
                    </button>

                    {/* <AnimatePresence>
                      {openMenu === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pl-4 space-y-3">
                            {item.links.map((link, i) => (
                              <button
                                key={i}
                                onClick={() => handleNavigate(link.href)}
                                className={`block text-sm transition-colors ${
                                  link.label === "View All"
                                    ? "text-blue-400 font-medium"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                {link.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence> */}
                  </div>
                ))}

                {/* Special Links */}
                <button
                  onClick={() => handleNavigate("/category/sale")}
                  className="w-full flex items-center gap-3 py-4 border-b border-slate-800/50"
                >
                  <Sparkles size={18} className="text-red-400" />
                  <span className="text-lg font-semibold text-red-400">
                    Last Call
                  </span>
                </button>

                <button
                  onClick={clickedComingSoon}
                  className="w-full flex items-center gap-3 py-4 border-b border-slate-800/50"
                >
                  <Clock size={18} className="text-slate-500" />
                  <span className="text-lg font-semibold text-slate-500">
                    Pre-Order
                  </span>
                </button>
              </nav>

              {/* Track Order */}
              <div className="p-4 mx-4 mb-4 bg-slate-800/50 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} className="text-blue-400" />
                  <span className="text-sm font-medium">Track Your Order</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Tracking ID"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    onClick={handleTrackOrder}
                    disabled={trackingId.length < 6}
                    className={`px-4 rounded-lg font-medium text-sm transition-colors ${
                      trackingId.length >= 6
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-slate-700 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-slate-800 p-4 bg-[#070a10]">
              <div className="grid grid-cols-2 gap-3">
                {!loggedIn ? (
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <LogIn size={18} />
                    Log In
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigate("/account")}
                    className="flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <User size={18} />
                    Account
                  </button>
                )}

                <button
                  onClick={() => handleNavigate("/help")}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors"
                >
                  <HelpCircle size={18} />
                  Help
                </button>
              </div>

              <button
                onClick={() => handleNavigate("/account?referral=true")}
                className="w-full flex items-center justify-center gap-2 mt-3 py-3 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
              >
                <Gift size={18} className="text-blue-400" />
                Refer a Friend
              </button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
