import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Quote, ArrowRight } from "lucide-react";
import img from "../assets/Female/review.jpeg";

const HomeReview = () => {
  const navigate = useNavigate();

  const review = {
    rating: 5.0,
    text: "I tried the other black active wear and I was wowed by the quality, you can literally see the intentionality in the cloth, the fit, the straps and how snug it is. You did your big one on this 🫶🏿🫶🏿. Whatever you're doing, keep on doing it and do it better!",
    author: "Adaugo, A.",
    location: "Lagos, NG",
    productId: "6905e6111b437ceae910cbd3",
    productName: "Black Active Set",
  };

  return (
    <section className="py-12 md:py-0">
      <div className="md:min-h-[70vh] lg:min-h-[80vh] flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto order-1 md:order-2">
          <img
            src={img}
            alt="Customer review"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/50 to-transparent" />

          {/* Floating Rating Badge */}
          <div className="absolute top-6 right-6 md:top-8 md:left-8 md:right-auto flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={12} />
              ))}
            </div>
            <span className="text-white text-sm font-medium">
              {review.rating}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative w-full md:w-1/2 flex items-center order-2 md:order-1 bg-[#0a0f1a]">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative w-full px-6 py-12 md:px-12 lg:px-16 xl:px-20">
            {/* Quote Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20">
              <Quote className="w-6 h-6 text-blue-400" />
            </div>

            {/* Tag */}
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-semibold tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400">
              Customer Story
            </span>

            {/* Review Text */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed mb-8">
              "{review.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {review.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{review.author}</p>
                <p className="text-sm text-slate-500">
                  {review.location} • Verified Buyer
                </p>
              </div>
            </div>

            {/* Product Link */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(`/product/${review.productId}`)}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Shop This Look
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeReview;
