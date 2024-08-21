import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const NewArrivalsContainer = styled.div`
  margin: 2rem 1rem 0 1rem;

  @media only screen and (${devices.tablet}) {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  @media only screen and (${devices.laptop}) {
    width: 80%;
    margin: auto;
    margin-top: 2rem;
  }
`;

export const BodyHeaderOne = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  color: ${themeColors.mainBlue};
`;

export const NewArrivalsFlexbox = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 0.5rem 0 1rem;
  gap: 1rem;
  scroll-snap-type: inline mandatory;
  padding: 0 3rem 1rem;
  justify-content: space-between;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const NewArrivalItem = styled.div`
  position: relative;
  min-width: 35vw;

  &:first-child {
    scroll-snap-align: start;
  }

  &:not(:first-child):not(:last-child) {
    scroll-snap-align: start;
  }

  &:last-child {
    scroll-snap-align: end;
  }

  @media only screen and (min-width: 600px) {
    min-width: 27%;
  }

  @media only screen and (${devices.tablet}) {
    min-width: 27vw;
  }

  @media only screen and (${devices.laptop}) {
    min-width: 21vw;
  }
`;

export const SpecialInfo = styled.p`
  font-family: "redux", sans-serif;
  letter-spacing: 0.1rem;
  font-size: 0.5rem;
  background-color: ${themeColors.white};
  z-index: 2;
  position: absolute;
  top: 0;
  padding: 0.5rem;
  border-radius: 5px;
  left: 0;
  margin: 0.5rem;
`;

export const NewArrivalItemImgBg = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  height: 11rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  @media only screen and (${devices.tablet}) {
    height: 16rem;
  }

  @media only screen and (${devices.laptop}) {
    height: 18rem;
  }
`;

export const NewArrivalItemImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media only screen and (min-width: 600px) {
    width: 50%;
  }

  @media only screen and (${devices.tablet}) {
    width: 80%;
  }

  @media only screen and (${devices.laptop}) {
    width: 80%;
  }

  @media only screen and (${devices.laptopLarge}) {
    width: 70%;
  }
`;

export const NewArrivalItemDesc = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const NewArrivalItemDescTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const NewArrivalItemName = styled.p`
  color: ${themeColors.mainBlue};
`;

export const NewArrivalItemPrice = styled.p`
  color: ${themeColors.textBlue};
`;
export const NewArrivalItemDescBottom = styled.p`
  font-size: 0.7rem;
  font-weight: 700;
  color: ${themeColors.textBlue};
`;
