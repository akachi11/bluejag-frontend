import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "../assets/homelogo.jpg";
import deadweight from "../assets/deadweight.PNG";

// ─────────────────────────────────────────────
// DEFAULT SLIDES — edit / extend freely.
// Each slide supports:
//   image        : imported asset or URL string
//   badge        : { dot: bool, text: string }  (optional)
//   heading      : JSX or string
//   subheading   : string
//   ctas         : array of { label, variant: "primary"|"outline", action: fn | string (href) }
//   accent       : gradient overlay tweak (optional, falls back to default)
// ─────────────────────────────────────────────
const DEFAULT_SLIDES = [
  // {
  //   image: deadweight,
  //   badge: { dot: true, text: "New Collection Available" },
  //   heading: (
  //     <>
  //       <span className="bg-gradient-to-r from-red-400 via-rose-500 to-red-600 bg-clip-text text-transparent">
  //         Dead Weight
  //       </span>{" "}
  //       Tell No Tale.
  //     </>
  //   ),
  //   subheading: "The fit says everything. You don't have to.",
  //   ctas: [{ label: "Shop Now", variant: "primary", actionKey: "shopNow" }],
  // },
  {
    image: heroImg,
    // badge: { dot: true, text: "New Collection Available" },
    heading: (
      <>
        Unleash Your{" "}
        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Potential
        </span>
      </>
    ),
    subheading:
      "Skip right to the best parts of gym wear — lived-in comfort and excellent style, without the wait.",
    ctas: [{ label: "Shop Now", variant: "primary", actionKey: "shopNow" }],
  },
];

// ─────────────────────────────────────────────
// HeroSection
// Props:
//   slides          – array of slide configs (uses DEFAULT_SLIDES if omitted)
//   onShopNowClick  – handler wired to any CTA with actionKey: "shopNow"
//   interval        – ms between auto-advance (default 5000)
// ─────────────────────────────────────────────
const HeroSection = ({
  slides = DEFAULT_SLIDES,
  onShopNowClick,
  interval = 8000,
}) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);
  const paused = useRef(false);

  const goTo = useCallback(
    (index) => {
      if (transitioning || index === current) return;
      setPrev(current);
      setCurrent(index);
      setTransitioning(true);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 800);
    },
    [current, transitioning],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, slides.length, goTo],
  );
  const prev_ = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, slides.length, goTo],
  );

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      if (!paused.current) next();
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [next, interval, slides.length]);

  const handleCta = (cta) => {
    if (cta.actionKey === "shopNow" && onShopNowClick) onShopNowClick();
    else if (cta.href) window.location.href = cta.href;
    else if (typeof cta.action === "function") cta.action();
  };

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* ── Slide layers ── */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
              zIndex: isActive ? 2 : 1,
            }}
          >
            {/* Ken Burns zoom */}
            <div
              className="absolute inset-0"
              style={{
                animation: isActive ? "kenburns 8s ease-out forwards" : "none",
              }}
            >
              <img
                src={slide.image}
                alt="Hero"
                className="w-full h-full object-contain object-center"
                draggable={false}
              />
            </div>
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* ── Content ── */}
      {slides.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={`content-${i}`}
            className="absolute inset-0 z-10"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.8s ease-in-out 0.15s, transform 0.8s ease-in-out 0.15s",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <div className="h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-end pb-24 md:pb-28 lg:justify-center lg:pb-0">
              <div className="max-w-2xl">
                {/* Badge */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 md:mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                    {slide.badge.dot && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    )}
                    <span className="text-xs md:text-sm font-medium text-white/90">
                      {slide.badge.text}
                    </span>
                  </div>
                )}

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
                  {slide.heading}
                </h1>

                {/* Subheading */}
                <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl">
                  {slide.subheading}
                </p>

                {/* CTAs */}
                {slide.ctas && (
                  <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {slide.ctas.map((cta, ci) =>
                      cta.variant === "primary" ? (
                        <button
                          key={ci}
                          onClick={() => handleCta(cta)}
                          onMouseEnter={() => (paused.current = true)}
                          onMouseLeave={() => (paused.current = false)}
                          className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-white text-black font-semibold rounded-xl hover:bg-slate-100 transition-all"
                        >
                          {cta.label}
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      ) : (
                        <button
                          key={ci}
                          onClick={() => handleCta(cta)}
                          onMouseEnter={() => (paused.current = true)}
                          onMouseLeave={() => (paused.current = false)}
                          className="flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                        >
                          {cta.label}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Dot navigation + progress bar ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: i === current ? 32 : 12,
                background: "rgba(255,255,255,0.3)",
              }}
            >
              {i === current && (
                <span
                  className="absolute inset-0 bg-white rounded-full origin-left"
                  style={{
                    animation: `progressBar ${interval}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Scroll indicator (desktop) ── */}
      <div className="hidden lg:flex absolute bottom-8 right-12 flex-col items-center gap-2 text-white/30 z-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-white/20" />
          <span className="text-xs uppercase tracking-widest rotate-90 origin-center whitespace-nowrap">
            Est. 2024
          </span>
          <div className="w-px h-16 bg-white/20" />
        </div>
      </div>

      {/* ── Keyframe animations injected once ── */}
      <style>{`
        @keyframes kenburns {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
