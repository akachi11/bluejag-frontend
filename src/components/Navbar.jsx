import React from "react";
import {
  HiOutlineMenuAlt4,
  HiOutlineShoppingCart,
  HiOutlineSearch,
} from "react-icons/hi";
import {
  DesktopMenu,
  LogoText,
  MenuIcon,
  NavbarBox,
  NavbarContainer,
  NavbarMenu,
  NavbarMobileRight,
} from "../Styles/NavbarStyles";
import { Paragraph } from "../Styles/FooterStyles";
import logo from "../assets/logo.png";
import { useHomeContext } from "../context/HomeContext";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { User2Icon } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const iconStyle = {
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const { sideBarOpen, toggleSideBar, loggedIn, toggleCart } = useHomeContext();
  const { cart } = useCart();

  const navigate = useNavigate();

  const openSideBar = () => {
    toggleSideBar();
  };

  return (
    <NavbarContainer className="z-20">
      <NavbarBox>
        <NavbarMenu>
          <MenuIcon onClick={openSideBar}>
            {sideBarOpen ? (
              <IoClose style={iconStyle} />
            ) : (
              <HiOutlineMenuAlt4 style={iconStyle} />
            )}
          </MenuIcon>
          <div className="gap-6 hidden lg:flex xl:gap-8">
            <Paragraph
              onClick={() => {
                navigate("/category/men");
              }}
            >
              MEN
            </Paragraph>
            <Paragraph
              onClick={() => {
                navigate("/category/women");
              }}
            >
              WOMEN
            </Paragraph>
            <Paragraph>PRE ORDER</Paragraph>
            <Paragraph className="text-red-400 font-semibold">
              LAST CALL
            </Paragraph>
          </div>
        </NavbarMenu>
        <LogoText
          onClick={() => {
            navigate("/");
          }}
          src={logo}
        />
        <NavbarMobileRight className="relative flex items-center gap-4">
          {loggedIn ? (
            <div
              onClick={() => navigate("/account")}
              className="cursor-pointer hover:text-blue-400 transition-colors"
            >
              <User2Icon />
            </div>
          ) : (
            <>
              <p
                onClick={() => navigate("/signin")}
                className="hidden cursor-pointer hover:text-blue-400 transition-colors md:block"
              >
                LOG IN
              </p>
              <div className="md:hidden" onClick={() => navigate("/signin")}>
                <User2Icon />
              </div>
            </>
          )}

          <div
            className="relative cursor-pointer hover:text-blue-400"
            onClick={toggleCart}
          >
            <HiOutlineShoppingCart style={iconStyle} />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </NavbarMobileRight>
      </NavbarBox>
    </NavbarContainer>
  );
};

export default Navbar;
