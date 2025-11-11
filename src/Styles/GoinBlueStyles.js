import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const GoinBlueContainer = styled.div`
  margin-top: 2rem;
  padding-left: 1rem;
`;

export const GBHeader = styled.p`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;

  &.ratings {
    text-align: left;
  }

  @media only screen and (${devices.tablet}) {
    font-size: 1.2rem;
  }
`;

export const GBFlexbox = styled.div`
  /* cursor: grab; */
  display: flex;
  overflow-x: scroll;
  margin: 0.5rem 0 1rem;
  gap: 1rem;
  scroll-snap-type: inline mandatory;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const GBPhoto = styled.img`
  object-fit: cover;
  position: relative;
  border-radius: 10px;

  /* &:first-child {
    scroll-snap-align: start;
  }

  &:not(:first-child):not(:last-child) {
    scroll-snap-align: start;
  }

  &:last-child {
    scroll-snap-align: end;
  } */

  @media only screen and (${devices.tablet}) {
    width: 40%;
  }

  @media only screen and (${devices.laptop}) {
    width: 20%;
  }
`;
