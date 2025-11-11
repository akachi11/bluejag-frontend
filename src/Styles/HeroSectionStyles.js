import styled from "styled-components";
import { themeColors } from "../Themes/themeColors"
import { devices } from "../responsiveness"

export const HeroSectionContainer = styled.div`
  position: relative;
  color: white;
  height: 40vh;
  overflow: hidden;

  @media only screen and (${devices.laptop}) {
    height: 80vh;
  }

  /* Black overlay */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media only screen and (${devices.laptop}) {
    object-fit: cover;
  }
`;

export const HeroTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0 2rem 2rem 1rem;
  z-index: 2; /* ✅ Keeps text above the overlay */

  @media only screen and (${devices.tablet}) {
    width: 65%;
    height: 100%;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  @media only screen and (${devices.laptop}) {
    margin: auto auto 0 8rem;
    width: 40%;
  }
`;

export const HeroMainText = styled.p`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin-bottom: .5rem;

  @media only screen and (${devices.tablet}) {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`;

export const HeroSubText = styled.p`
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    margin-bottom: .5rem;
    font-size: .8rem;

    @media only screen and (${devices.tablet}) {
    font-size: 1rem;
    line-height: 2rem;
  }
`;

export const HeroButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: .9rem;
  cursor: pointer;

  @media only screen and (${devices.tablet}) {
    width: 70%;
  }
`;
