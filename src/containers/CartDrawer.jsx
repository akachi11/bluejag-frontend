import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // clean close icon
import Cart from "./Cart";

const CartDrawer = ({ isOpen, onClose }) => {
  const mobileVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
    exit: {
      y: "100%",
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
  };

  const desktopVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Mobile Drawer */}
          <motion.div
            className="fixed z-50 bg-gray-950 w-full h-[80vh] bottom-0 rounded-t-3xl overflow-y-auto sm:hidden"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Close Cart"
            >
              <X size={22} />
            </button>

            <Cart />
          </motion.div>

          {/* Desktop Drawer */}
          <motion.div
            className="hidden sm:block fixed z-50 bg-gray-950 h-screen right-0 top-0 overflow-y-auto w-[420px] shadow-lg"
            variants={desktopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:bg-blue-800 transition"
              aria-label="Close Cart"
            >
              <X size={22} />
            </button>

            <Cart />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
