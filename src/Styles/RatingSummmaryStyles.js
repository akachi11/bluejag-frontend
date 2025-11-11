import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";

export const RSContainer = styled.div`
  & > p {
    font-family: "Montserrat";
    font-size: 1.3rem;
    color: ${themeColors.mainBlue};
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  p {
    &.small {
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }
`;

export const RSItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: "Montserrat", sans-serif;
  max-width: 300px;
  margin: auto;
`;

export const RSBar = styled.div`
  position: relative;
  width: 100%;
  height: 0.5rem;
  border-radius: 10px;
  background-color: ${themeColors.grey2};

  &::after {
    content: "";
  }
`;

export const RSFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 0.5rem;
  border-radius: 10px;
  width: ${(props) => `${props.width}%`};
  background-color: ${themeColors.mainBlue};

  &::after {
    content: "";
  }
`;

export const RatingSliderContainer = styled.div`
  margin-top: 1rem;
  p {
    font-size: 0.7rem;
    font-family: "redux", sans-serif;

    &.title {
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
  }
`;

export const RSSizes = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;

  p {
    font-family: "redux", sans-serif;
    font-size: 0.5rem;
    flex: 1;

    &.rs {
      text-align: left;
    }

    &.tts {
      text-align: center;
    }

    &.rb {
      text-align: right;
    }
  }
`;
