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
    <div className="relative w-full h-[28rem] md:h-[40vh] lg:h-[55vh] text-white overflow-hidden flex flex-col md:flex-row">
      {/* Mobile background image */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={img}
          alt="review"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Text section */}
      <div className="relative z-10 flex h-full flex-col justify-end items-start text-left max-w-[80%] sm:max-w-[60%] px-6 py-10 md:py-12 md:justify-center md:items-center md:text-center md:w-1/2 md:max-w-none">
        <div className="flex text-xl sm:text-2xl mb-2">{stars}</div>

        <p className="font-serif text-sm sm:text-base mb-2 leading-snug lg:text-xl px-8">
          "I tried the other black active wear and I was wowed by the quality,
          you can literally see the intentionality in the cloth, the fit, the
          straps and how snug it is. You did your big one on this 🫶🏿🫶🏿.
          Whatever you’re doing, keep on doing it and do it better!"
        </p>

        <p className="italic text-xs sm:text-sm mb-3">- Alexandra.</p>

        <button className="uppercase border border-white px-4 py-1.5 rounded text-xs sm:text-sm tracking-wide hover:bg-white hover:text-black transition-all mt-8">
          Shop Wears
        </button>
      </div>

      {/* Desktop image section */}
      <div className="hidden md:block md:w-1/2 h-full relative px-16">
        <img
          src={img}
          alt="review"
          className="w-full h-full object-cover brightness-100 rounded-lg"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </div>
  );
};

export default HomeReview;
