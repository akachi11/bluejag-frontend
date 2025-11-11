import React, { useEffect, useState } from "react";
import {
  SideBarContainer,
  SideBarFlexbox,
  SideBarFlexboxItem,
  SideBarFooter,
  SideBarFooterLinks,
  SideBarMainLink,
  SideBarMainLinks,
} from "../Styles/SideBarStyles";
import {
  NewsletterContainer,
  NewsletterEmailBtn,
  NewsletterEmailContainer,
  NewsletterEmailInput,
} from "../Styles/FooterStyles";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Div, Img, Paragraph } from "../StaticStyle";
import male from "../assets/goinblue5.jpeg";
import female from "../assets/Female/review.jpeg";
import { useHomeContext } from "../context/HomeContext";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { sideBarOpen, toggleSideBar } = useHomeContext();
  const [openMenu, setOpenMenu] = useState();

  useEffect(() => {
    document.body.style.overflow = sideBarOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [sideBarOpen]);

  const handleMenuToggle = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:block`}>
      <SideBarContainer
        className={`${
          sideBarOpen ? "open" : ""
        } bg-gray-900 text-white transition-all duration-300`}
      >
        <div
          className="w-full flex justify-end p-4 pb-0 cursor-pointer"
          onClick={() => toggleSideBar()}
        >
          <X />
        </div>

        <SideBarMainLinks>
          {/* MEN SECTION */}
          <div>
            <SideBarMainLink
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleMenuToggle("men")}
            >
              <Paragraph>MEN</Paragraph>
              <MdOutlineArrowRightAlt
                className={`transition-transform duration-300 ${
                  openMenu === "men" ? "rotate-90" : ""
                }`}
              />
            </SideBarMainLink>

            <AnimatePresence>
              {openMenu === "men" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-zinc-400 flex flex-col gap-2 mt-2 overflow-hidden"
                >
                  <Paragraph className="cursor-pointer hover:underline">
                    Bestsellers
                  </Paragraph>
                  <Paragraph className="cursor-pointer hover:underline">
                    New Arrivals
                  </Paragraph>
                  <Paragraph className="cursor-pointer hover:underline">
                    Vital
                  </Paragraph>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* WOMEN SECTION */}
          <div>
            <SideBarMainLink
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleMenuToggle("women")}
            >
              <Paragraph>WOMEN</Paragraph>
              <MdOutlineArrowRightAlt
                className={`transition-transform duration-300 ${
                  openMenu === "women" ? "rotate-90" : ""
                }`}
              />
            </SideBarMainLink>

            <AnimatePresence>
              {openMenu === "women" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-zinc-400 flex flex-col gap-2 mt-2 overflow-hidden"
                >
                  <Paragraph className="cursor-pointer hover:underline">
                    Bestsellers
                  </Paragraph>
                  <Paragraph className="cursor-pointer hover:underline">
                    New Arrivals
                  </Paragraph>
                  <Paragraph className="cursor-pointer hover:underline">
                    Vital
                  </Paragraph>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LAST CALL */}
          <SideBarMainLink className="last-call">
            <Paragraph>LAST CALL</Paragraph>
          </SideBarMainLink>
        </SideBarMainLinks>

        {/* PRE-ORDER SECTION */}
        <SideBarFlexbox>
          <SideBarFlexboxItem>
            <Img src={male} />
            <Paragraph>MEN'S PRE ORDER</Paragraph>
          </SideBarFlexboxItem>
          <SideBarFlexboxItem>
            <Img src={female} />
            <Paragraph>WOMEN'S PRE ORDER</Paragraph>
          </SideBarFlexboxItem>
        </SideBarFlexbox>

        {/* FOOTER */}
        <SideBarFooter className="bg-gray-950">
          <NewsletterContainer>
            <Paragraph>JOIN OUR NEWSLETTER</Paragraph>
            <Paragraph className="footer-email">EMAIL ADDRESS:</Paragraph>
            <NewsletterEmailContainer>
              <NewsletterEmailInput placeholder="ENTER YOUR EMAIL ADDRESS" />
              <NewsletterEmailBtn>SUBSCRIBE</NewsletterEmailBtn>
            </NewsletterEmailContainer>
          </NewsletterContainer>

          <SideBarFooterLinks>
            <Paragraph>LOG IN</Paragraph>
            <Paragraph>ABOUT US</Paragraph>
            <Paragraph>STORES</Paragraph>
            <Paragraph>EVENTS</Paragraph>
            <Paragraph>HELP</Paragraph>
            <Paragraph>REFER A FRIEND</Paragraph>
          </SideBarFooterLinks>
        </SideBarFooter>
      </SideBarContainer>
    </div>
  );
};

export default Sidebar;
