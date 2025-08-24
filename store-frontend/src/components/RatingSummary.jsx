import React from "react";
import {
  RSBar,
  RSContainer,
  RSFill,
  RSItem,
} from "../Styles/RatingSummmaryStyles";
import RatingSlider from "./RatingSlider";
import { ProductRating } from "../Styles/ProductPage";
import { HRCStars } from "../Styles/HomeReviewStyles";
import { stars } from "../utils";

const RatingSummary = ({ ratings }) => {
  const sortedRatings = Object.entries(ratings).sort(
    ([keyA], [keyB]) => Number(keyB) - Number(keyA)
  );
  console.log(sortedRatings);
  return (
    <RSContainer>
      <p>TAKE IT FROM OUR CUSTOMERS</p>
      <ProductRating className="summary">
        <p className="rating">4.85</p>
        <HRCStars className="product">{stars(4.5)}</HRCStars>
      </ProductRating>

      <p className="small">Overall ratings based on 5,690 reviews</p>

      {sortedRatings.map(([key, value]) => (
        <RSItem>
          {key}
          <RSBar>
            <RSFill width={value * 100}></RSFill>
          </RSBar>
        </RSItem>
      ))}

      <RatingSlider sizeVal={75} disabled/>
    </RSContainer>
  );
};

export default RatingSummary;
