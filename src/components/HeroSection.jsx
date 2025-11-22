import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import heroImg from "../assets/homelogo.jpg";

const HeroSection = ({ onShopNowClick }) => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute left-0 inset-0">
        <img
          src={heroImg}
          alt="Bluejag Athletic Wear"
          className="w-full h-full object-cover object-bottom-right"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-end pb-16 md:pb-20 lg:justify-center lg:pb-0">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 md:mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-white/90">
              New Collection Available
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
            Unleash Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Potential
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl">
            Skip right to the best parts of gym wear — lived-in comfort and
            excellent style, without the wait.
          </p>

          {/* CTAs */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onShopNowClick}
              className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-white text-black font-semibold rounded-xl hover:bg-slate-100 transition-all"
            >
              Shop Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* <Link
              to="/category/new"
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              <Play size={18} />
              View Lookbook
            </Link> */}
          </div>

          {/* Stats */}
          {/* <div className="mt-10 md:mt-12 flex items-center gap-8 md:gap-12">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">500+</p>
              <p className="text-xs md:text-sm text-white/50">Happy Athletes</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">50+</p>
              <p className="text-xs md:text-sm text-white/50">Products</p>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-2xl md:text-3xl font-bold text-white">4.9</p>
              <p className="text-xs md:text-sm text-white/50">Avg Rating</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      {/* Side Accent */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 text-white/20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-white/20" />
          <span className="text-xs uppercase tracking-widest rotate-90 origin-center whitespace-nowrap">
            Est. 2024
          </span>
          <div className="w-px h-20 bg-white/20" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
