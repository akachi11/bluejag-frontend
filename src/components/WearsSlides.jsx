import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import img from "../assets/Female/everyday.jpeg";
import img1 from "../assets/Female/hard.jpeg";
import img2 from "../assets/Female/cute.jpeg";

const WearsSlides = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const slides = [
    {
      image: img,
      tag: "Lifestyle",
      title: "Everyday Fits That Slay",
      description: "Made for Her Hustle",
      link: "/category/lifestyle",
    },
    {
      image: img1,
      tag: "Performance",
      title: "Train Hard",
      description: "Look Harder",
      link: "/category/performance",
    },
    {
      image: img2,
      tag: "Athleisure",
      title: "Keep It Hot",
      description: "Too Cute to Quit",
      link: "/category/athleisure",
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth * 0.75;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, slides.length - 1));
  };

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 mb-6 md:mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mt-1 text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Shop by Style
            </h2>
          </div>
          <Link
            to="/category/women"
            className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Slides */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 lg:px-12 pb-4 snap-x snap-mandatory lg:snap-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {slides.map((slide, index) => (
          <Link
            key={index}
            to={slide.link}
            className="group relative flex-shrink-0 w-[75vw] md:w-[45vw] lg:flex-1 lg:w-auto aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden snap-start"
          >
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8">
              {/* Tag */}
              <span className="inline-block w-fit px-3 py-1 mb-3 text-[10px] font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white">
                {slide.tag}
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
                {slide.title}
              </h3>

              {/* Description */}
              <p className="mt-1 text-slate-300 text-sm md:text-base">
                {slide.description}
              </p>

              {/* CTA */}
              <div className="mt-4 flex items-center gap-2 text-white">
                <span className="text-sm font-semibold uppercase tracking-wide group-hover:underline">
                  Shop Now
                </span>
                <ArrowRight
                  size={16}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>

      {/* Mobile Dots */}
      <div className="flex lg:hidden justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-6 bg-blue-500"
                : "w-2 bg-slate-600 hover:bg-slate-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default WearsSlides;
