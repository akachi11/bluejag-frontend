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

const Navbar = () => {
  const iconStyle = {
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const { sideBarOpen, toggleSideBar, loggedIn, toggleCart } = useHomeContext();

  const navigate = useNavigate();

  const openSideBar = () => {
    toggleSideBar();
  };

  return (
    <NavbarContainer>
      <NavbarBox>
        <NavbarMenu>
          <MenuIcon onClick={openSideBar}>
            {sideBarOpen ? (
              <IoClose style={iconStyle} />
            ) : (
              <HiOutlineMenuAlt4 style={iconStyle} />
            )}
          </MenuIcon>
          <div className="gap-8 hidden lg:flex">
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
        <NavbarMobileRight>
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
          <HiOutlineShoppingCart onClick={toggleCart} style={iconStyle} />
        </NavbarMobileRight>
      </NavbarBox>
    </NavbarContainer>
  );
};

export default Navbar;
