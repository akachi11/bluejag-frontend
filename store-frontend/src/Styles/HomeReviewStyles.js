import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const HomeReviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (${devices.laptop}) {
    flex-direction: row;
    height: 40vh;
  }

  @media only screen and (${devices.laptopLarge}) {
    flex-direction: row;
    height: 55vh;
  }
`;

export const HRCFirst = styled.div`
  background-color: ${themeColors.mainBlue};
  padding: 3rem 2.5rem;
  text-align: center;
  color: ${themeColors.white};

  @media only screen and (${devices.laptop}) {
    flex: 1;
  }

  @media only screen and (${devices.laptopLarge}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const HRCSecond = styled.div`
  height: 15rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (${devices.laptop}) {
    flex: 1;
    height: 100%;
  }
`;

export const HRCStars = styled.div`
  color: ${themeColors.white};
  font-size: 1.8rem;
  margin-bottom: 0.5rem;

  &.ratings {
    color: ${themeColors.aeroBlue};
    font-size: 1rem;
  }

  &.product {
    color: ${themeColors.mainBlue};
    font-size: .8rem;
    margin: auto;
  }
`;

export const HRCComment = styled.p`
  font-family: "lindenHill", sans-serif;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;

  @media only screen and (${devices.tablet}) {
    padding: 0 7rem;
    font-size: 1.8rem;
  }
`;

export const HRCRater = styled.p`
  font-style: italic;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;

  &.text {
    font-style: normal;
  }
`;

export const HRCButton = styled.div`
  font-family: "redux", sans-serif;
  text-transform: uppercase;
  border: 2px solid ${themeColors.white};
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: .8rem;
`;

export const HRCFind = styled.div`
    text-decoration: underline;
    font-size: 1rem;
    font-family: "redux", sans-serif;
    cursor: pointer;
`


