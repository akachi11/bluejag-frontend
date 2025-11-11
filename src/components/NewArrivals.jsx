import React, { useEffect, useRef, useState } from "react";
import {
  BodyHeaderOne,
  NewArrivalItem,
  NewArrivalItemDesc,
  NewArrivalItemDescBottom,
  NewArrivalItemDescTop,
  NewArrivalItemImg,
  NewArrivalItemImgBg,
  NewArrivalsContainer,
  NewArrivalsFlexbox,
  NewArrivalSkeleton,
  SkeletonImg,
  SkeletonText,
  SpecialInfo,
} from "../Styles/HomeSlideStyles";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomeSlide = ({ title, products }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navigate = useNavigate();

  // Scroll detection
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
    container?.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [products]);

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

  const scrollBy = (offset) => {
    scrollContainerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <NewArrivalsContainer>
      <BodyHeaderOne className="text-white montserrat">{title}</BodyHeaderOne>

      {/* Wrapper to anchor arrows */}
      <div className="relative">
        {canScrollLeft && (
          <div
            onClick={() => scrollBy(-250)}
            className="absolute top-0 left-0 -ml-2 h-full w-12 bg-linear-to-r from-black/60 to-transparent flex items-center justify-start z-10 cursor-pointer transition-all duration-500 ease-out animate-fade-in"
          >
            <ChevronLeft className="text-white w-6 h-6 ml-2 animate-icon-pulse" />
          </div>
        )}

        <NewArrivalsFlexbox
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {!products || products.length === 0 ? (
            <>
              {[...Array(3)].map((_, i) => (
                <NewArrivalSkeleton key={i}>
                  <SkeletonImg />
                  <div className="mt-4 px-2 pb-2">
                    <SkeletonText width="70%" />
                    <SkeletonText width="50%" mt="0.3rem" />
                    <SkeletonText width="90%" mt="0.5rem" height="0.6rem" />
                  </div>
                </NewArrivalSkeleton>
              ))}
            </>
          ) : (
            products.map((item) => (
              <NewArrivalItem
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                {item.limitedEdition && (
                  <SpecialInfo className="bg-blue-900">
                    LIMITED EDITION
                  </SpecialInfo>
                )}

                <NewArrivalItemImgBg>
                  <NewArrivalItemImg
                    className="h-full rounded-lg"
                    src={item.thumbnail}
                    alt={item.name}
                  />
                </NewArrivalItemImgBg>

                <NewArrivalItemDesc>
                  <NewArrivalItemDescTop>
                    <div className="text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.name}
                    </div>
                    <div className="text-white text-sm font-bold">
                      {item.price.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </div>
                  </NewArrivalItemDescTop>

                  <NewArrivalItemDescBottom className="text-white text-xs">
                    {item.desc}
                  </NewArrivalItemDescBottom>
                </NewArrivalItemDesc>
              </NewArrivalItem>
            ))
          )}
        </NewArrivalsFlexbox>

        {canScrollRight && (
          <div
            onClick={() => scrollBy(250)}
            className="absolute top-0 right-0 -mr-2 h-full w-12 bg-linear-to-l from-black/60 to-transparent flex items-center justify-end z-10 cursor-pointer transition-all duration-500 ease-out animate-fade-in"
          >
            <ChevronRight className="text-white w-6 h-6 mr-2 animate-icon-pulse" />
          </div>
        )}
      </div>
    </NewArrivalsContainer>
  );
};

export default HomeSlide;
