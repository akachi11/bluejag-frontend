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
import img from "../assets/Boots/The Beth/Brown/boot44.webp";

const WearsSlides = () => {
  return (
    <WearsSlidesContainer>
      <StylesFlexbox>
        <StylesItem>
          <StylesItemOverlay></StylesItemOverlay>
          <Img src={img} />
          <StylesItemText>
            <StylesTextTop>EASY TO WEAR</StylesTextTop>
            <StylesTextDesc>EASY TO LOVE ROPERS</StylesTextDesc>
            <StylesItemLink>SHOP NOW</StylesItemLink>
          </StylesItemText>
        </StylesItem>

        <StylesItem>
          <StylesItemOverlay></StylesItemOverlay>
          <Img src={img} />
          <StylesItemText>
            <StylesTextTop>EASY TO WEAR</StylesTextTop>
            <StylesTextDesc>EASY TO LOVE ROPERS</StylesTextDesc>
            <StylesItemLink>SHOP NOW</StylesItemLink>
          </StylesItemText>
        </StylesItem>

        <StylesItem>
          <StylesItemOverlay></StylesItemOverlay>
          <Img src={img} />
          <StylesItemText>
            <StylesTextTop>EASY TO WEAR</StylesTextTop>
            <StylesTextDesc>EASY TO LOVE ROPERS</StylesTextDesc>
            <StylesItemLink>SHOP NOW</StylesItemLink>
          </StylesItemText>
        </StylesItem>
      </StylesFlexbox>
    </WearsSlidesContainer>
  );
};

export default WearsSlides;
