import styled, { keyframes } from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
`;

export const SideBarContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  position: fixed;
  z-index: 9;
  transform: translateX(-100%);
  height: 100vh;
  overflow: auto;

  /* &.closed {
    transform: translateX(-100%);
    animation: .5s ${slideOut} ease;
  } */

  &.open {
    animation: .5s ${slideIn} ease;
    transform: translateX(0);
  }

  @media only screen and (${devices.tablet}) {
    width: 70vw;
  }

  @media only screen and (${devices.desktop}) {
    display: none;
  }
`;

export const SideBarFooter = styled.div`
  color: ${themeColors.white};
  padding: 1rem;
`;

export const SideBarFooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0 6rem;

  p {
    font-weight: 700;
    cursor: pointer;
  }
`;

export const SideBarMainLinks = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SideBarMainLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  &.last-call {
    color: ${themeColors.lastCallRed};
  }
`;

export const SideBarFlexbox = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 1rem;
`;

export const SideBarFlexboxItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  img {
    width: 100%;
    border-radius: 5px;
  }

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;
