import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { useHomeContext } from "../context/HomeContext";

// === Skeleton Styles ===
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonBase = styled.div`
  background: #0f172a;
  background-image: linear-gradient(
    90deg,
    #0f172a 0px,
    #1e293b 40px,
    #0f172a 80px
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: 6px;
`;

const HomeSlide = ({ title, products, subtitle }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const { favoriteItem, favIds, removeFavorites } = useCart();
  const { loggedIn } = useHomeContext();
  const navigate = useNavigate();

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(
      container.scrollWidth - container.scrollLeft - container.clientWidth > 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [products]);

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

  const scrollBy = (offset) => {
    scrollContainerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const toggleFavorite = (e, item) => {
    e.stopPropagation();
    if (favIds?.includes(item._id)) {
      removeFavorites(item._id);
    } else {
      favoriteItem({
        name: item.name,
        price: item.price,
        thumbnail: item.thumbnail,
        _id: item._id,
      });
    }
  };

  const CardSkeleton = () => (
    <div className="flex-shrink-0 w-[280px] md:w-[320px]">
      <SkeletonBase
        style={{ width: "100%", height: "360px", borderRadius: "16px" }}
      />
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <SkeletonBase style={{ height: "16px", width: "75%" }} />
        <SkeletonBase style={{ height: "14px", width: "50%" }} />
        <SkeletonBase style={{ height: "18px", width: "35%" }} />
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-16">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-12 mb-6 md:mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-slate-400 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollBy(-350)}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "hover:bg-white hover:text-black hover:border-white text-white"
                  : "text-slate-600 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollBy(350)}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center transition-all ${
                canScrollRight
                  ? "hover:bg-white hover:text-black hover:border-white text-white"
                  : "text-slate-600 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Mobile Gradient Edges */}
        {canScrollLeft && (
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0f1a] to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0f1a] to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 lg:px-12 pb-4 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {!products || products.length === 0
            ? [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
            : products.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="group/card flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      draggable={false}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                    {/* Limited Edition Badge */}
                    {item.limitedEdition && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                          Limited Edition
                        </span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    {loggedIn && (
                      <button
                        onClick={(e) => toggleFavorite(e, item)}
                        className="absolute top-3 right-3 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all hover:scale-110"
                      >
                        {favIds?.includes(item._id) ? (
                          <IoHeart className="text-red-500" size={18} />
                        ) : (
                          <IoHeartOutline className="text-white" size={18} />
                        )}
                      </button>
                    )}

                    {/* Quick View on Hover */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${item._id}`);
                        }}
                        className="w-full py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        Quick View
                      </button>
                    </div>

                    {/* Color Swatches */}
                    {item.colors?.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex gap-1 group-hover/card:opacity-0 transition-opacity">
                        {item.colors.slice(0, 4).map((color, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border-2 border-white/30"
                            style={{ backgroundColor: color.hexCode }}
                          />
                        ))}
                        {item.colors.length > 4 && (
                          <span className="w-4 h-4 rounded-full bg-black/60 text-[8px] text-white flex items-center justify-center font-medium">
                            +{item.colors.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 space-y-1">
                    <h3 className="font-medium text-white text-sm md:text-base truncate group-hover/card:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm truncate">
                      {item.categories?.[0] || item.gender || item.desc}
                    </p>
                    <p className="font-semibold text-white text-sm md:text-base">
                      {item.price?.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSlide;
