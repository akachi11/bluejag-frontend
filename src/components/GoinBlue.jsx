import React, { useRef, useState } from "react";
import photo1 from "../assets/goinblue1.jpg";
import photo2 from "../assets/goinblue2.jpeg";
import photo3 from "../assets/goinblue3.jpeg";
import photo4 from "../assets/goinblue4.jpeg";
import photo5 from "../assets/goinblue5.jpeg";
import photo6 from "../assets/HomeImg.jpg";
import { StylesItemOverlay } from "../Styles/WearsSlides";

const GoinBlue = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);

  const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="mt-8 pl-4">
      <p className="text-center text-[1.3rem] font-semibold font-poppins montserrat">
        #GOINBLUE
      </p>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="
          flex overflow-x-scroll gap-4 py-4
          scroll-smooth snap-x snap-mandatory
          no-scrollbar cursor-grab
        "
      >
        {photos.map((img, index) => (
          <div
            key={index}
            className="w-[80vw] sm:w-[40vw] relative lg:w-[20vw] shrink-0 snap-start scroll-mx-4"
          >
            <StylesItemOverlay className="bg-black/30"></StylesItemOverlay>
            <img
              src={img}
              alt={`#GOINBLUE item ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoinBlue;
