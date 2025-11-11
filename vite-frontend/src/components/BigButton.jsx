import React from "react";
import { HeroButton } from "../Styles/HeroSectionStyles";

const BigButton = ({ title, onClick, disabled }) => {
  return (
    <HeroButton
      className={disabled ? "bg-gray-500" : "bg-blue-950"}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </HeroButton>
  );
};

export default BigButton;
