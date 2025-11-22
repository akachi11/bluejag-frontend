import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Truck, Sparkles, Clock } from "lucide-react";

const Announcement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const announcements = [
    {
      icon: Truck,
      text: "FREE Delivery on Orders ₦70,000+",
      highlight: "🔥",
      link: null,
    },
    {
      icon: Sparkles,
      text: "New Arrivals Just Dropped",
      highlight: "Shop Now →",
      link: "/category/new",
    },
    {
      icon: Clock,
      text: "Limited Edition Items Available",
      highlight: "View Collection",
      link: "/category/limited",
    },
  ];

  // Auto-rotate announcements
  useEffect(() => {
    if (announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <div className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white z-20">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-2 text-sm">
          {/* Icon */}
          <current.icon size={16} className="text-blue-300 flex-shrink-0" />

          {/* Text */}
          <p className="font-medium text-center">
            {current.text}
            {current.link ? (
              <Link
                to={current.link}
                className="ml-2 text-blue-300 hover:text-white font-semibold underline underline-offset-2 transition-colors"
              >
                {current.highlight}
              </Link>
            ) : (
              <span className="ml-1">{current.highlight}</span>
            )}
          </p>

          {/* Dots indicator (if multiple announcements) */}
          {announcements.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 ml-4">
              {announcements.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentIndex === i ? "bg-white w-3" : "bg-white/40"
                  }`}
                  aria-label={`Go to announcement ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Close button (optional) */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X size={14} className="text-white/60" />
      </button>
    </div>
  );
};

export default Announcement;
