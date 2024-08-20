import styled from "styled-components";
import { devices } from "../responsiveness";
import { themeColors } from "../Themes/themeColors";

export const AnnouncementContainer = styled.div`
  background-color: ${themeColors.textBlue};
  font-family: "lindenHill", sans-serif;
  color: ${themeColors.white} !important;
  padding: 0.7rem;
  font-size: 1rem;
`;

export const AnnouncementInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export const AnnouncementText = styled.p`
  font-weight: 500;
`;

export const AnnouncementShopBtn = styled.p`
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
`;

export const AnnouncementMenu = styled.div`
  display: none;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem 1rem 0.5rem 0;
  font-size: 0.6rem;
  gap: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.05rem;

  @media (${devices.laptop}) {
    display: flex;
  }
`;

export const AnnouncementMenuItem = styled.p`
  cursor: pointer;
`;

export const AnnouncementHr = styled.hr``;

export const NavbarContainer = styled.div`
  background-color: ${themeColors.white};
  position: sticky;
  top: 0;
  z-index: 3;
`;

export const NavbarBox = styled.div`
  padding: 0.5rem 0.8rem;
  color: ${themeColors.mainBlue};
  display: flex;
  justify-content: space-between;
  align-content: center;
  font-family: "Montserrat", sans-serif;
  background-color: ${themeColors.white};

  @media only screen and (${devices.tablet}) {
    padding: 1rem 4rem;
  }
`;

export const NavbarMenu = styled.div``;

export const MenuIcon = styled.div`
  @media only screen and (${devices.tablet}) {
    display: none;
  }
`;

export const DesktopMenu = styled.div`
  display: none;

  p {
    cursor: pointer;
  }

  @media only screen and (${devices.tablet}) {
    display: flex;
    font-weight: 700;
    gap: 2rem;
  }
`;

export const LogoText = styled.img`
cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  color: ${themeColors.mainBlue};
  margin: auto;
  height: 7rem;
`;

export const NavbarMobileRight = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: 700;

  p {
    display: none;
  }

  @media only screen and (${devices.tablet}) {
    p {
      display: block;
    }
  }
`;
