// src/components/ImageSlider.js
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ImagesSliderContainer, ImagesSliderImg } from "../Styles/ImagesSlider";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),

    // return a visible small element - not display:none
    customPaging: () => <div style={{ height: "2px", width: "100%" }} />,

    // render custom progress bars - positioned absolute and full-width
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "1px",
          left: 0,
          right: 0,
          width: "100%",
          pointerEvents: "none", // allow clicks through to the slider if needed
        }}
      >
        <ul
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            gap: "6px",
            justifyContent: "space-between",
            width: "100%",
            listStyle: "none",
          }}
        >
          {dots.map((_, index) => (
            <li
              key={index}
              style={{
                height: "3px",
                flex: 1,
                backgroundColor: index === currentIndex ? "#1c398e" : "#ffffff",
                transition: "background-color 200ms ease",
                borderRadius: 2,
              }}
            />
          ))}
        </ul>
      </div>
    ),
  };

  return (
    // wrapping div prevents slick from pushing page horizontally
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <ImagesSliderContainer key={index}>
            <ImagesSliderImg src={image} alt={`Slide ${index}`} />
          </ImagesSliderContainer>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
