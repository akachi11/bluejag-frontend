import React, { useRef } from "react";
import {
  BodyHeaderOne,
  NewArrivalItem,
  NewArrivalItemDesc,
  NewArrivalItemDescBottom,
  NewArrivalItemDescTop,
  NewArrivalItemImg,
  NewArrivalItemImgBg,
  NewArrivalItemName,
  NewArrivalItemPrice,
  NewArrivalsContainer,
  NewArrivalsFlexbox,
  SpecialInfo,
} from "../Styles/HomeSlideStyles";
import boot from "../assets/Boots/The Annie/Cafe/Annie1.webp";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const HomeSlide = ({ title }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <NewArrivalsContainer>
      <BodyHeaderOne>{title}</BodyHeaderOne>

      <NewArrivalsFlexbox
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <NewArrivalItem>
          <SpecialInfo>LIMITED EDITION</SpecialInfo>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>
      </NewArrivalsFlexbox>
    </NewArrivalsContainer>
  );
};

export default HomeSlide;
