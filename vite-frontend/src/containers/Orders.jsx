import React, { useEffect, useRef, useState } from "react";
import NoOrder from "../assets/no-order.png";
import { ChevronRight } from "lucide-react";

const Orders = () => {
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);

  // Check scroll position
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // Show arrow if not scrolled to the end
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setShowArrow(el.scrollLeft < maxScrollLeft - 1);
  };

  // Optional: scroll a bit when clicking the arrow
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll(); // initial check
  }, []);

  return (
    <div>
      <div className="p-2 montserrat">
        <div className="px-2 py-4 bg-gray-900 rounded-xl">
          <p className="text-xs montserrat text-zinc-400">
            Created: <span>2025-11-07</span>
          </p>

          <div className="flex flex-row items-center justify-between">
            <p className="text-sm">TrackingID:</p>
            <p className="font-semibold">123456789</p>
          </div>

          <div className="relative">
            {/* Scrollable images */}
            <div
              ref={scrollRef}
              className="flex flex-row overflow-auto gap-2 hide-scrollbar"
              onScroll={handleScroll}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <img
                  key={index}
                  src="https://bluejag-products-bucket.s3.eu-north-1.amazonaws.com/bluejag-thumbnails/c1ae4905-c4e9-45e0-a87e-ee76d68c7c02.jpg"
                  alt=""
                  className="w-16 h-16 object-contain"
                />
              ))}
            </div>

            {/* Arrow overlay */}
            {showArrow && (
              <div
                onClick={scrollRight}
                className="absolute top-0 right-0 h-full w-8 flex items-center justify-center bg-gradient-to-l from-black/70 to-transparent cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </div>
            )}
          </div>

          <p className="mt-4 text-right text-xs">
            Status: <span className="font-semibold text-sm">Paid</span>
          </p>
        </div>
      </div>
      {/* <div>
        <p className="montserrat font-semibold text-center mt-4">ORDERS</p>
        <div>
          <img src={NoOrder} className="w-[80%] m-auto md:w-[400px]" alt="" />
          <p className="w-[350px] text-center montserrat m-auto">
            You haven't made any orders yet. When you do they'll show up here
          </p>
        </div>

        <div className="text-center">
          <button className="uppercase bg-blue-900 montserrat font-semibold px-4 py-2 rounded-3xl mt-4 mb-8">
            Shop now
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Orders;
