import React, { useRef, useState } from "react";
import {
  GBFlexbox,
  GBHeader,
  GBPhoto,
  GoinBlueContainer,
} from "../Styles/GoinBlueStyles";
import {
  HomeRating,
  RatedProduct,
  Rater,
  RatingHead,
  RatingText,
} from "../Styles/HomeRatings";
import { HRCStars } from "../Styles/HomeReviewStyles";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { stars } from "../utils";
const HomeRatings = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <GoinBlueContainer>
      <GBHeader className="ratings">GYM WEARS FOR EVERYONE</GBHeader>

      <GBFlexbox
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <HomeRating>
            <HRCStars className="ratings">{stars(4.5)}</HRCStars>

            <RatingHead>Comfort and quality</RatingHead>

            <RatingText>
              My number one concern when it comes to product is quality and
              comfort. It is my top concern and these boots hit all the spots. I
              will absolutely purchase of another pair of boot again.
            </RatingText>

            <Rater>THAD J.</Rater>

            <RatedProduct>
              <p>SLEVELESS JOHNNY HOODIE - RED</p>
            </RatedProduct>
          </HomeRating>
        ))}
      </GBFlexbox>
    </GoinBlueContainer>
  );
};

export default HomeRatings;
