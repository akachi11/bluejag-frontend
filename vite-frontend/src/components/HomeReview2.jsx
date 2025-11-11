// import React from "react";
// import {
//   HRCButton,
//   HRCComment,
//   HRCFind,
//   HRCFirst,
//   HRCRater,
//   HRCSecond,
//   HomeReviewContainer,
// } from "../Styles/HomeReviewStyles";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { Img } from "../StaticStyle";
// import img from "../assets/Shirts/shirt10.webp";
// import { StylesItemOverlay } from "../Styles/WearsSlides";

// const HomeReview2 = () => {
//   const rating = 4.5;

//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;
//   const emptyStars = 5 - Math.ceil(rating);

//   // Create an array of star elements
//   const stars = [
//     ...Array(fullStars).fill(<FaStar key={`full-${fullStars}`} />),
//     ...(hasHalfStar ? [<FaStarHalfAlt key="half" />] : []),
//     ...Array(emptyStars).fill(<FaRegStar key={`empty-${emptyStars}`} />),
//   ];

//   return (
//     <HomeReviewContainer>
//       <HRCSecond>
//         <StylesItemOverlay className="bg-black/30"></StylesItemOverlay>
//         <Img src={img} />
//       </HRCSecond>

//       <HRCFirst>
//         <HRCComment>WORK OUT IN STYLE</HRCComment>

//         <HRCRater className="text">
//           Our stores are a feast for the senses – the smell of leather, a
//           friendly smile, free boot shines, and a cool beverage to enjoy while
//           you take it all in. Come see us, friends!
//         </HRCRater>

//         <HRCFind>Find Your Store</HRCFind>
//       </HRCFirst>
//     </HomeReviewContainer>
//   );
// };

// export default HomeReview2;
