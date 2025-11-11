import React from "react";
import {
  HeroButton,
  HeroImg,
  HeroMainText,
  HeroSectionContainer,
  HeroSubText,
  HeroTextContainer,
} from "../Styles/HeroSectionStyles";
import BigButton from "./BigButton";
import heroImg from "../assets/homelogo.jpg";
import heroMobile from "../assets/HomeImg.jpg";

const HeroSection = ({ onShopNowClick }) => {
  return (
    <HeroSectionContainer>
      <HeroImg src={heroImg} />
      <HeroTextContainer>
        <HeroMainText>
          UNLEASH YOUR POTENTIAL WITH OUR ATHLETIC GEAR
        </HeroMainText>
        <HeroSubText>
          Skip right to the best parts of gym wears &mdash; lived-in comfort and
          excellent style, without the wait.
        </HeroSubText>

        {/* 👇 trigger scroll on click */}
        <BigButton title={"SHOP NOW"} onClick={onShopNowClick} />
      </HeroTextContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection;
