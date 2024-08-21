import React from "react";
import {
  HRCFirst,
  HRCStars,
  HomeReviewContainer,
} from "../Styles/HomeReviewStyles";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const HomeReview = () => {

    const rating = 4.5

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
        <HRCStars>
            {stars}
        </HRCStars>
      </HRCFirst>
    </HomeReviewContainer>
  );
};

export default HomeReview;
