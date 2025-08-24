import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const stars = (ratingVal) => {
    const fullStars = Math.floor(ratingVal);
    const hasHalfStar = ratingVal % 1 !== 0;
    const emptyStars = 5 - Math.ceil(ratingVal);
    return [
      ...Array(fullStars).fill(<FaStar key={`full-${fullStars}`} />),
      ...(hasHalfStar ? [<FaStarHalfAlt key="half" />] : []),
      ...Array(emptyStars).fill(<FaRegStar key={`empty-${emptyStars}`} />),
    ];
  };