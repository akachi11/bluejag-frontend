import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import img from "../assets/Female/review.jpeg";

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
    <div className="relative w-full h-112 md:h-[40vh] lg:h-[55vh] text-white overflow-hidden">
      {/* Background image */}
      <img
        src={img}
        alt="review"
        className="absolute inset-0 w-full h-full object-cover brightness-75 md:brightness-100"
      />
      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-black/30 md:hidden"></div>

      {/* Text content */}
      <div
        className="
          absolute bottom-6 left-6 z-10
          flex flex-col items-start justify-end
          max-w-[45%] sm:max-w-[60%]
          text-left
          md:static md:flex md:items-center md:justify-center md:text-center md:w-1/2 md:px-8 md:py-12
        "
      >
        <div className="flex text-xl sm:text-2xl mb-2">{stars}</div>

        <p className="font-serif text-sm sm:text-base mb-2 leading-snug">
          "I tried the other black active wear and I was wowed by the quality,
          you can literally see the intentionality in the cloth, the fit, the
          straps and how snug it is. You did your big one on this 🫶🏿🫶🏿.
          Whatever you’re doing, keep on doing it and do it better!"
        </p>

        <p className="italic text-xs sm:text-sm mb-3">- Alexandra.</p>

        <button className="uppercase border border-white px-4 py-1.5 rounded text-xs sm:text-sm tracking-wide hover:bg-white hover:text-black transition-all">
          Shop Wears
        </button>
      </div>
    </div>
  );
};

export default HomeReview;
