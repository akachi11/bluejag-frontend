import { styled } from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const ProductPageContainer = styled.div`
  /* padding: 1rem; */
`;

export const MobileProductPage = styled.div`
padding: 1rem;
  @media only screen and (${devices.tablet}) {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const ProductTop = styled.div``;

export const ProductNamePrice = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media only screen and (${devices.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0;
  }

  p {
    font-weight: 700;

    &.name {
      font-size: 1.3rem;
    }

    &.price {
      font-size: 1.2rem;
    }
  }
`;

export const ProductRating = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: fit-content;
  margin: 0.3rem 0 1rem;

  &.summary {
    margin: auto;
  }

  p {
    font-size: 0.8rem;

    &.raters {
      text-decoration: underline;
    }
  }
`;

export const ProductKey = styled.p`
  font-weight: 700;

  &.shipping {
    font-size: 1rem;
    margin: 1rem 0;
  }
`;

export const ProductValue = styled.p`
  font-weight: 700;

  &.small {
    font-size: 0.6rem;
  }

  &.fit-guide {
    text-decoration: underline;
  }

  &.red {
    color: ${themeColors.lastCallRed};
  }
`;

export const ProductImg = styled.div`
  position: relative;

  @media only screen and (${devices.tablet}) {
    display: none;
  }
`;

export const MaterialInfo = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
`;

export const ProductColors = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.4rem;
`;

export const ProductSize = styled.div`
  margin-top: 1rem;
`;

export const SizeTop = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const PColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  /* border: 1px solid ${(props) => props.color}; */
  width: fit-content;
  border-radius: 50%;

  &.active {
    border: 3px solid ${(props) => props.color};
  }

  div {
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.color};
    border-radius: 50%;

    &::after {
      content: "";
    }
  }
`;

export const SizesFlexbox = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  row-gap: 0.5rem;
`;

export const SizeBox = styled.div`
  width: fit-content;
  /* padding: 0.3rem; */
  border-width: 1px;
  border-radius: 5px;

  &.active {
    border-width: 3px;
  }

  div {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &.sold-out {
    border-color: ${themeColors.textBlue};
    opacity: 0.6;
    position: relative;

    div {
      position: relative;
      z-index: 0;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to top right,
          transparent 47%,
          #9CA3AF 50%,
          #9CA3AF 50%,
          transparent 53%
        );
        z-index: 2;
        pointer-events: none;
        border-radius: inherit;
      }
    }
  }
`;

export const ProductDetails = styled.div`
  margin-top: 3rem;

  p {
    line-height: 1.4rem;
    font-size: .9rem;

    &.title {
      font-weight: 700;
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export const ProductsAccordionContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProductAccordion = styled.div`
  max-height: 1.3rem;
  overflow: hidden;
  transition: max-height 0.3s ease-out;

  &.open {
    max-height: 1000px;
    transition: max-height 0.3s ease-in;
  }
`;

export const AccordionClickable = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    text-transform: uppercase;
    font-weight: 700;
  }
`;

export const DPPImages = styled.div`
  display: none;

  @media only screen and (${devices.tablet}) {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    img {
      width: calc(50% - 0.25rem);
      border-radius: 10px;
    }
  }
`;

export const DPPInfo = styled.div`
  @media only screen and (${devices.tablet}) {
    flex: 1;
  }
`;

export const RatingSection = styled.div`
  padding: 1rem;
`
