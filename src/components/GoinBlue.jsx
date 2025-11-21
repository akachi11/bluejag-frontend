import React, { useRef, useState } from "react";
import { Instagram } from "lucide-react";
import photo1 from "../assets/goinblue1.jpg";
import photo2 from "../assets/goinblue2.jpeg";
import photo3 from "../assets/goinblue3.jpeg";
import photo4 from "../assets/goinblue4.jpeg";
import photo5 from "../assets/goinblue5.jpeg";
import photo6 from "../assets/HomeImg.jpg";

const GoinBlue = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);

  const photos = [
    { src: photo1, username: "@bluejag.athlete" },
    { src: photo2, username: "@fitnessjane" },
    { src: photo3, username: "@gym.lifestyle" },
    { src: photo4, username: "@trainwithme" },
    { src: photo5, username: "@activelife" },
    { src: photo6, username: "@bluejag.official" },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0f1a] to-[#0c1220]">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 border border-white/10 rounded-full">
          <Instagram size={16} className="text-pink-400" />
          <span className="text-sm font-medium text-white">
            Join the Community
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            #GOINBLUE
          </span>
        </h2>

        <p className="mt-3 text-slate-400 text-sm md:text-base max-w-md mx-auto">
          Tag us in your fit pics for a chance to be featured
        </p>
      </div>

      {/* Photo Grid */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-3 md:gap-4 overflow-x-auto px-4 md:px-8 lg:px-12 pb-4 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {photos.map((photo, index) => (
          <a
            key={index}
            href="https://instagram.com/bluejag"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[20vw] aspect-square rounded-2xl overflow-hidden"
            onClick={(e) => isDragging && e.preventDefault()}
          >
            {/* Image */}
            <img
              src={photo.src}
              alt={`#GOINBLUE community ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              draggable={false}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Hover Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Instagram size={32} className="text-white mb-2" />
              <span className="text-white text-sm font-medium">
                {photo.username}
              </span>
            </div>

            {/* Corner Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center px-4">
        <a
          href="https://instagram.com/bluejagco"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Instagram size={20} />
          Follow @bluejag
        </a>
      </div>
    </section>
  );
};

export default GoinBlue;
