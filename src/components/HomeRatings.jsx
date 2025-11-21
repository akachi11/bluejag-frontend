import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

const ratings = [
  {
    id: 1,
    productId: "prod_air_max_90",
    title: "Unmatched Comfort",
    text: "These are hands down the most comfortable gym shoes I've ever owned. The cushioning is perfect for long training sessions, and they look amazing too.",
    reviewer: "Marcus T.",
    product: "AIR FLEX TRAINING SHOES - BLACK",
  },
  {
    id: 2,
    productId: "prod_compression_top",
    title: "Perfect Fit",
    text: "The compression fit is exactly what I needed. It keeps everything in place during intense workouts without feeling restrictive. Already ordered two more!",
    reviewer: "Sarah K.",
    product: "PRO COMPRESSION TOP - NAVY",
  },
  {
    id: 3,
    productId: "prod_joggers_grey",
    title: "Premium Quality",
    text: "You can tell these are made with care. The stitching, the fabric, everything feels premium. Worth every penny and then some.",
    reviewer: "James L.",
    product: "ELITE JOGGERS - CHARCOAL",
  },
  {
    id: 4,
    productId: "prod_hoodie_red",
    title: "Game Changer",
    text: "This hoodie has become my go-to for everything. Gym, errands, lounging at home. The sleeveless design gives great mobility for lifting.",
    reviewer: "Thad J.",
    product: "SLEEVELESS JOHNNY HOODIE - RED",
  },
  {
    id: 5,
    productId: "prod_shorts_black",
    title: "Best Purchase Ever",
    text: "I was skeptical about the price but these shorts exceeded all expectations. The moisture-wicking is incredible and they've held up perfectly after dozens of washes.",
    reviewer: "Diana M.",
    product: "PERFORMANCE SHORTS - OBSIDIAN",
  },
  {
    id: 6,
    productId: "prod_tank_white",
    title: "Stylish & Functional",
    text: "Finally found gym wear that doesn't sacrifice style for function. I get compliments every time I wear this tank. The breathability is outstanding.",
    reviewer: "Chris R.",
    product: "BREATHE TANK TOP - WHITE",
  },
];

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

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-[#0a0f1a] to-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Ratings Carousel */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className={`flex gap-5 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {ratings.map((rating, index) => (
            <div
              key={rating.id}
              className="group relative shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] snap-start"
            >
              <div className="relative h-full p-6 md:p-8 rounded-2xl bg-linear-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-2 md:-left-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
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
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
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
                        className="w-3 h-3 ml-auto shrink-0 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all"
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
              className="w-2 h-2 rounded-full bg-slate-700 hover:bg-blue-500 transition-colors"
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeRatings;
