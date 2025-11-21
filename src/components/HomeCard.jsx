import React from "react";
import { Link } from "react-router-dom";
import { FiTarget, FiZap, FiAward } from "react-icons/fi";
import logo from "../assets/head-01-01.png";

const HomeCard = () => {
  const features = [
    {
      icon: FiTarget,
      title: "No Excuses, Just Results",
      text: "Every rep counts. Every drop of sweat is proof. You don't stop till it's done.",
    },
    {
      icon: FiZap,
      title: "Discipline Is The Real Flex",
      text: "Forget motivation — show up. That's what separates the talkers from the doers.",
    },
    {
      icon: FiAward,
      title: "For Those Who Put In The Work",
      text: "If you know, you know. Gym is therapy, body is proof.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#0c1a3d] to-[#0a0f1a]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Logo */}
          <div className="w-fit m-auto text-center md:h-20 mb-6 rounded-2xl backdrop-blur-sm">
            <img
              src={logo}
              alt="Bluejag"
              className="w-20 md:w-30 object-contain"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
              Welcome to the Grind
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Gym Time!{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Welcome to Bluejag
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Premium athletic wear for those who take their training seriously.
            Built for performance, designed for style.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.text}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/category/men"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Shop Collection
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCard;
