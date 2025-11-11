import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const HomeRating = styled.div`
  min-width: 70%;
  position: relative;
  padding: 1rem;
  color: ${themeColors.aeroBlue};
  font-family: "Poppins", sans-serif;

  @media only screen and (${devices.tablet}) {
    min-width: 40%;
  }

  @media only screen and (${devices.laptop}) {
    min-width: 20%;
  }
`;

export const RatingHead = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const RatingText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

export const Rater = styled.p`
  margin-top: 1rem;
  font-family: "lindenHill", sans-serif;
  font-size: .8rem;
`;

export const RatedProduct = styled.div`
  font-size: 0.7rem;
  margin-top: 1.5rem;
  cursor: pointer;
  font-family: "redux", sans-serif;
`;
