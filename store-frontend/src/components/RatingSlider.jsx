import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the slider's CSS
import { themeColors } from "../Themes/themeColors";
import "../Styles/RatingSlider.css";
import { RSSizes, RatingSliderContainer } from "../Styles/RatingSummmaryStyles";

const RatingSlider = ({ disabled = false, sizeVal }) => {
  const snapPoints = [0, 25, 50, 75, 100];
  const [value, setValue] = useState();

  const handleSliderChange = (val) => {
    setValue(val);
  };

  return (
    <RatingSliderContainer>
      <p className="title">OVERALL FIT</p>
      <Slider
        disabled={disabled}
        value={value ?? sizeVal}
        min={0}
        max={100}
        step={25}
        marks={{
          0: "Too small",
          25: "Small",
          50: "True to Size",
          75: "Runs Big",
          100: "Runs Big",
        }}
        onChange={handleSliderChange}
        trackStyle={{ backgroundColor: themeColors.aeroBlue }}
        handleStyle={{
          borderColor: themeColors.grey1,
          backgroundColor: themeColors.aeroBlue,
        }}
      />
      <RSSizes>
        <p className="rs">Runs Small</p>
        <p className="tts">True to Size</p>
        <p className="rb">Runs Big</p>
      </RSSizes>
    </RatingSliderContainer>
  );
};

export default RatingSlider;
