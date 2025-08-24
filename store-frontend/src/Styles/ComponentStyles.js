import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";

export const HomeContainer = styled.div`
  background-color: ${themeColors.lightestBlue};
`;

export const IconContainer = styled.div`
  &.bookmark {
    color: ${themeColors.aeroBlue};
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    margin: 0.5rem;
    font-size: 1.5rem;
  }
`
