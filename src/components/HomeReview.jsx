import React from "react";
import {
  HRCButton,
  HRCComment,
  HRCFirst,
  HRCRater,
  HRCSecond,
  HRCStars,
  HomeReviewContainer,
} from "../Styles/HomeReviewStyles";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Img } from "../StaticStyle";
import img from "../assets/Female/review.jpeg";
import { StylesItemOverlay } from "../Styles/WearsSlides";

const HomeReview = () => {
  const rating = 5.0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  // Create an array of star elements
  const stars = [
    ...Array(fullStars).fill(<FaStar key={`full-${fullStars}`} />),
    ...(hasHalfStar ? [<FaStarHalfAlt key="half" />] : []),
    ...Array(emptyStars).fill(<FaRegStar key={`empty-${emptyStars}`} />),
  ];

  return (
    <HomeReviewContainer>
      <HRCFirst>
        <HRCStars>{stars}</HRCStars>

        <HRCComment>
          "I tried the other black active wear and i was wowed by the quality,
          you can literally see the intentionality in the cloth, the fit, the
          straps and how snug it is, you did your big one on this 🫶🏿🫶🏿
          Whatever you’re doing, keep on doing it and do it better!"
        </HRCComment>

        <HRCRater>- Alexandra.</HRCRater>

        <HRCButton>Shop Wears</HRCButton>
      </HRCFirst>

      <HRCSecond>
        <StylesItemOverlay className="bg-black/30"></StylesItemOverlay>
        <Img src={img} />
      </HRCSecond>
    </HomeReviewContainer>
  );
};

export default HomeReview;
