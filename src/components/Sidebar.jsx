import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NewsletterContainer,
  NewsletterEmailBtn,
  NewsletterEmailContainer,
  NewsletterEmailInput,
} from "../Styles/FooterStyles";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useHomeContext } from "../context/HomeContext";
import { X } from "lucide-react";
import { clickedComingSoon } from "../utils";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { sideBarOpen, toggleSideBar, loggedIn } = useHomeContext();
  const [openMenu, setOpenMenu] = useState();
  const [trackingId, setTrackingId] = useState("");

  const navigate = useNavigate();

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
    exit: {
      x: "-100%",
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
  };

  useEffect(() => {
    document.body.style.overflow = sideBarOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [sideBarOpen]);

  const handleMenuToggle = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <AnimatePresence mode="wait">
      {sideBarOpen && (
        <React.Fragment key="sidebar">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => toggleSideBar(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar-drawer"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 z-50 h-screen overflow-auto bg-gray-900 text-white w-full md:w-[70vw] lg:hidden flex flex-col justify-between font-['Montserrat']"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              {/* Close Button */}
              <div
                className="w-full flex justify-end p-4 pb-0 cursor-pointer"
                onClick={() => toggleSideBar(false)}
              >
                <X />
              </div>

              {/* Main Links */}
              <div className="p-6 flex flex-col gap-6">
                {/* MEN SECTION */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer font-medium"
                    onClick={() => handleMenuToggle("men")}
                  >
                    <p>MEN</p>
                    <MdOutlineArrowRightAlt
                      className={`transition-transform duration-300 ${
                        openMenu === "men" ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {openMenu === "men" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-zinc-400 flex flex-col gap-2 mt-2 overflow-hidden"
                      >
                        <p className="cursor-pointer hover:underline">
                          Bestsellers
                        </p>
                        <p className="cursor-pointer hover:underline">
                          New Arrivals
                        </p>
                        <p className="cursor-pointer hover:underline">Vital</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* WOMEN SECTION */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer font-medium"
                    onClick={() => handleMenuToggle("women")}
                  >
                    <p>WOMEN</p>
                    <MdOutlineArrowRightAlt
                      className={`transition-transform duration-300 ${
                        openMenu === "women" ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {openMenu === "women" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-zinc-400 flex flex-col gap-2 mt-2 overflow-hidden"
                      >
                        <p className="cursor-pointer hover:underline">
                          Bestsellers
                        </p>
                        <p className="cursor-pointer hover:underline">
                          New Arrivals
                        </p>
                        <p className="cursor-pointer hover:underline">Vital</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* LAST CALL */}
                <div className="flex justify-between items-center font-medium">
                  <p
                    onClick={clickedComingSoon}
                    className="text-red-300 cursor-pointer"
                  >
                    LAST CALL
                  </p>
                </div>

                {/* PRE ORDER */}
                <div className="flex justify-between items-center font-medium">
                  <p
                    onClick={clickedComingSoon}
                    className="text-zinc-500 cursor-pointer"
                  >
                    PRE ORDER
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="bg-gray-950 text-white p-4">
              <NewsletterContainer>
                <p className="footer-email text-sm mb-2">TRACK YOUR ORDER:</p>
                <NewsletterEmailContainer>
                  <NewsletterEmailInput
                    onChange={(e) => {
                      setTrackingId(e.target.value);
                    }}
                    placeholder="ENTER YOUR TRACKING ID"
                  />
                  <NewsletterEmailBtn
                    className={`${
                      trackingId.length < 6 ? "bg-blue-300" : "bg-blue-800"
                    }`}
                    disabled={trackingId.length < 6}
                    onClick={() => {
                      navigate(`/order/${trackingId}`);
                      toggleSideBar();
                    }}
                  >
                    FIND ORDER
                  </NewsletterEmailBtn>
                </NewsletterEmailContainer>
              </NewsletterContainer>

              <div className="flex flex-col gap-6 my-6 mb-24">
                {!loggedIn && (
                  <p className="font-bold cursor-pointer">LOG IN</p>
                )}
                <p className="font-bold cursor-pointer">HELP</p>
                <p className="font-bold cursor-pointer">REFER A FRIEND</p>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
