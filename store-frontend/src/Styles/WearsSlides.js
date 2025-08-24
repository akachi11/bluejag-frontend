import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const WearsSlidesContainer = styled.div`
  margin: 1rem;

  @media only screen and (${devices.laptopLarge}) {
    padding: 0 7rem;
  }
`;

export const StylesFlexbox = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  padding: 0.5rem 2rem;
  scroll-snap-type: inline mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media only screen and (${devices.laptop}) {
    justify-content: space-between;
  }
`;

export const StylesItem = styled.div`
  position: relative;
  min-width: 70vw;
  z-index: 2;

  &:first-child {
    scroll-snap-align: start;
  }

  &:not(:first-child):not(:last-child) {
    scroll-snap-align: start;
  }

  &:last-child {
    scroll-snap-align: end;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    z-index: 1;
  }

  @media only screen and (${devices.tablet}) {
    height: 60vh;
  }

  @media only screen and (${devices.laptop}) {
    flex: 1;
    min-width: auto;

    @media only screen and (min-height: 1366px) {
      height: 40vw;
    }
  }
`;

export const StylesItemOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  border-radius: 5px;
`;

export const StylesItemText = styled.div`
  position: absolute;
  color: ${themeColors.white};
  bottom: 0;
  left: 0;
  margin: 1rem;
  z-index: 3;
  width: 60%;
`;

export const StylesTextTop = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const StylesTextDesc = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  line-height: 1.7rem;
  margin-bottom: 0.5rem;
`;

export const StylesItemLink = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  text-decoration: underline;
`;
