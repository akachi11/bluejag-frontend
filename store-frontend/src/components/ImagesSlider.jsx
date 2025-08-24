// src/components/ImageSlider.js
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { themeColors } from "../Themes/themeColors";
import { ImagesSliderContainer, ImagesSliderImg } from "../Styles/ImagesSlider";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),
    customPaging: (i) => (
      <div
        style={{
          display: "none",
        }}
      />
    ),
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "1px", width: "100%" }}>
        <ul
          style={{
            margin: "0",
            padding: "0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {dots.map((dot, index) =>
            React.cloneElement(dot, {
              style: {
                height: "1px",
                flex: "1",
                backgroundColor:
                  index === currentIndex ? themeColors.mainBlue : "grey",
              },
            })
          )}
        </ul>
      </div>
    ),
  };

  return (
    <>
      <Slider {...settings}>
        {images.map((image, index) => (
          <ImagesSliderContainer key={index}>
            <ImagesSliderImg src={image} alt={`Slide ${index}`} />
          </ImagesSliderContainer>
        ))}
      </Slider>
    </>
  );
};

export default ImageSlider;
