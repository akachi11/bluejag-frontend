import styled, { keyframes } from "styled-components";
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
  text-transform: uppercase;
`;

export const NewArrivalsFlexbox = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  will-change: transform;
  margin: 0.5rem 0 1rem;
  gap: 1rem;
  scroll-snap-type: inline mandatory;
  padding-bottom: 1rem;
  position: relative;

  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const NewArrivalItem = styled.div`
  position: relative;
  cursor: pointer;
  min-width: 35vw;
  max-width: 35vw;

  @media only screen and (min-width: 600px) {
    min-width: 27%;
    max-width: 27%;
  }

  @media only screen and (${devices.tablet}) {
    min-width: 27vw;
    max-width: 27vw;
  }

  @media only screen and (${devices.laptop}) {
    min-width: 15vw;
    max-width: 15vw;
  }
`;

export const SpecialInfo = styled.p`
  font-family: "redux", sans-serif;
  letter-spacing: 0.1rem;
  font-size: 0.5rem;
  z-index: 2;
  position: absolute;
  top: 0;
  padding: 0.5rem;
  border-radius: 5px;
  left: 0;
  margin: 0.5rem;
`;

export const NewArrivalItemImgBg = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
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
  object-fit: cover;
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
  flex-direction: column;
`;
export const NewArrivalItemDescBottom = styled.p`
`;

// Skeleton styles
const shimmer = keyframes`
  0% {
    background-position: -300px 0;
  }
  100% {
    background-position: 300px 0;
  }
`;

export const NewArrivalSkeleton = styled.div`
  position: relative;
  min-width: 35vw;
  max-width: 35vw;
  border-radius: 5px;
  overflow: hidden;
  background: transparent;

  @media only screen and (min-width: 600px) {
    min-width: 27%;
    max-width: 27%;
  }

  @media only screen and (${devices.tablet}) {
    min-width: 27vw;
    max-width: 27vw;
  }

  @media only screen and (${devices.laptop}) {
    min-width: 15vw;
    max-width: 15vw;
  }
`;

export const SkeletonImg = styled.div`
  height: 11rem;
  border-radius: 5px;
  background: linear-gradient(
    90deg,
    #0f172a 0px,
    #1e293b 40px,
    #0f172a 80px
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.6s infinite linear;

  @media only screen and (${devices.tablet}) {
    height: 16rem;
  }

  @media only screen and (${devices.laptop}) {
    height: 18rem;
  }
`;

export const SkeletonText = styled.div`
  height: ${({ height }) => height || "0.8rem"};
  width: ${({ width }) => width || "80%"};
  margin-top: ${({ mt }) => mt || "0.5rem"};
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #0f172a 0px,
    #1e293b 40px,
    #0f172a 80px
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.6s infinite linear;
`;

