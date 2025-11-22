import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

const ratings = [
  {
    id: 2,
    productId: "690593ef1b437ceae910cb38",
    title: "Perfect Fit",
    text: "The compression fit is exactly what I needed. It keeps everything in place during intense workouts without feeling restrictive. Already ordered two more!",
    reviewer: "Nazo K.",
    product: "LIFT SEAMLESS TWO PIECE - DARK BLUE",
  },
  {
    id: 3,
    productId: "690609daac3f2aa0b27ad04f",
    title: "Premium Quality",
    text: "I like how lightweight yet durable this compression shirt is.",
    reviewer: "James L.",
    product: "LONG SLEEVE COMPRESSION BODY SUIT - BLACK",
  },
  {
    id: 4,
    productId: "6905e6111b437ceae910cbd3",
    title: "Best Purchase Ever",
    text: "This rumper has to be one of the best pieces of clothing I have ever owned. It looks so good but I couldn't even care less about how it looks, how it feels trumps everything",
    reviewer: "Precious O.",
    product: "SHORT SLEEVE RUMPER - JUJUBE",
  },
  {
    id: 5,
    productId: "6905d6631b437ceae910cbbc",
    title: "Simple yet Effective",
    text: "Bro I never thought something so basic can feel so nice",
    reviewer: "Nzube A.",
    product: "EVERYDAY TANK - BLACK",
  },
];

const HomeRatings = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Desktop-only drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Track active card on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollLeft;
      const cardWidth = container.scrollWidth / ratings.length;
      const index = Math.round(scrollPos / cardWidth);
      setActiveIndex(Math.min(index, ratings.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0f1a] to-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Ratings Carousel */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-5 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          {ratings.map((rating, index) => (
            <div
              key={rating.id}
              className="group relative flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] snap-start"
            >
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-2 md:-left-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Quote className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                    {rating.title}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                    "{rating.text}"
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">
                        {rating.reviewer}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        Verified Buyer
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {rating.reviewer.charAt(0)}
                    </div>
                  </div>

                  {/* Product Link */}
                  <Link
                    to={`/product/${rating.productId}`}
                    className="mt-4 block group/link"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-400 group-hover/link:text-blue-400 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="uppercase tracking-wider font-medium truncate">
                        {rating.product}
                      </span>
                      <svg
                        className="w-3 h-3 ml-auto flex-shrink-0 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {ratings.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollContainerRef.current;
                const cardWidth = container.scrollWidth / ratings.length;
                container.scrollTo({
                  left: cardWidth * index,
                  behavior: "smooth",
                });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-blue-500 w-6"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeRatings;
