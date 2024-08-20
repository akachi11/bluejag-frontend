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
import Sidebar from "./Sidebar";
import { useHomeContext } from "../context/HomeContext";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const iconStyle = {
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const { sideBarOpen, toggleSideBar, toggleHideElements, hideElements } =
    useHomeContext();

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
          <DesktopMenu>
            <Paragraph>MEN</Paragraph>
            <Paragraph>WOMEN</Paragraph>
            <Paragraph>EXPLORE</Paragraph>
          </DesktopMenu>
        </NavbarMenu>
        <LogoText src={logo} />
        <NavbarMobileRight>
          <HiOutlineSearch style={iconStyle} />
          <Paragraph>LOG IN</Paragraph>
          <HiOutlineShoppingCart style={iconStyle} />
        </NavbarMobileRight>
      </NavbarBox>
      <Sidebar />
    </NavbarContainer>
  );
};

export default Navbar;
