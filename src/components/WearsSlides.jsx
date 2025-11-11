import React from "react";
import {
  StylesFlexbox,
  StylesItem,
  StylesItemLink,
  StylesItemOverlay,
  StylesItemText,
  StylesTextDesc,
  StylesTextTop,
  WearsSlidesContainer,
} from "../Styles/WearsSlides";
import { Img } from "../StaticStyle";
import img from "../assets/Female/everyday.jpeg";
import img1 from "../assets/Female/hard.jpeg";
import img2 from "../assets/Female/cute.jpeg";

const WearsSlides = () => {
  return (
    <WearsSlidesContainer>
      <StylesFlexbox>
        <StylesItem>
          <StylesItemOverlay className="bg-black/50"></StylesItemOverlay>
          <Img src={img} />
          <StylesItemText>
            <StylesTextTop className="montserrat">
              EVERYDAY FITS THAT SLAY
            </StylesTextTop>
            <StylesTextDesc>Made for Her Hustle 💃</StylesTextDesc>
            <StylesItemLink>SHOP NOW</StylesItemLink>
          </StylesItemText>
        </StylesItem>

        <StylesItem>
          <StylesItemOverlay className="bg-black/50"></StylesItemOverlay>
          <Img src={img1} />
          <StylesItemText>
            <StylesTextTop>TRAIN HARD</StylesTextTop>
            <StylesTextDesc>Look Harder 🔥</StylesTextDesc>
            <StylesItemLink>SHOP NOW</StylesItemLink>
          </StylesItemText>
        </StylesItem>

        <StylesItem>
          <StylesItemOverlay className="bg-black/50"></StylesItemOverlay>
          <Img src={img2} />
          <StylesItemText>
            <StylesTextTop>KEEP IT HOT</StylesTextTop>
            <StylesTextDesc>Too Cute to Quit ✨</StylesTextDesc>
            <StylesItemLink>SHOP NOW</StylesItemLink>
          </StylesItemText>
        </StylesItem>
      </StylesFlexbox>
    </WearsSlidesContainer>
  );
};

export default WearsSlides;
