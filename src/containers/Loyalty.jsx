import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/loyalty-overview.png";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import { TIERS } from "../Constants/Tiers";

// Example props; replace with actual user data
const activeEvents = [
  { name: "Complete 1st purchase", xp: 50, done: true },
  { name: "Write a product review", xp: 30, done: false },
  { name: "Upload photo review", xp: 50, done: true },
  { name: "Share referral link", xp: 20, done: false },
  { name: "Complete 1st purchase", xp: 50, done: true },
  { name: "Write a product review", xp: 30, done: false },
  { name: "Upload photo review", xp: 50, done: true },
  { name: "Share referral link", xp: 20, done: false },
];

const alwaysEarnXP = [
  { name: "Refer a friend", xp: 200 },
  { name: "Buy a product", xp: 50 },
  { name: "Buy 5 products in one order", xp: 250 },
];

const Loyalty = () => {
  const scrollRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const handleScrollIndicators = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 5);
    setCanScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Check initial scroll state
    handleScrollIndicators();

    el.addEventListener("scroll", handleScrollIndicators);
    return () => el.removeEventListener("scroll", handleScrollIndicators);
  }, [activeEvents]);

  return (
    <div className="px-4 lg:px-16 mt-8 text-white font-montserrat">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-3xl font-semibold">BLUEJAG LOYALTY</p>
        <img
          src={img1}
          alt="Loyalty Overview"
          className="w-[60%] md:w-[30vw] m-auto mt-4"
        />
        <p className="mt-6 text-gray-300 text-md md:text-lg max-w-3xl mx-auto">
          Unlock exclusive benefits and rewards by earning XP for the things you
          buy, friends you invite, events you complete, and more. The more you
          engage with BlueJag, the higher your tier and the better your rewards.
          Every action counts—your loyalty is your power.
        </p>
      </div>

      {/* XP Events & Always Earn XP */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Left: Active XP Events */}
        <div className="flex-3 bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Active XP Events</h3>
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex flex-col gap-3 max-h-[400px] overflow-y-auto hide-scrollbar pr-2"
            >
              {activeEvents.map((event, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="text-sm md:text-base">{event.name}</div>
                  <div className="flex items-center gap-2">
                    {event.done && (
                      <CheckIcon size={16} className="text-green-400" />
                    )}
                    <span className="text-blue-400 font-semibold">
                      {event.xp} XP
                    </span>
                  </div>
                </div>
              ))}

              {canScrollUp && (
                <ChevronUp className="absolute top-2 left-1/2 transform -translate-x-1/2 text-blue-500 w-6 h-6 animate-bounce z-10" />
              )}
              {canScrollDown && (
                <ChevronDown className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-blue-500 w-6 h-6 animate-bounce z-10" />
              )}
            </div>
          </div>
        </div>

        {/* Right: Always Earn XP */}
        <div className=" bg-gray-900 flex-2 h-fit p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Always Earn XP</h3>
          <div className="flex flex-col gap-3">
            {alwaysEarnXP.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="text-sm md:text-base">{item.name}</div>
                <span className="text-blue-400 font-semibold">
                  {item.xp} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tiers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TIERS.map((tier, i) => (
          <div
            key={i}
            className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col"
          >
            {/* Tier Name & XP */}
            <div className="mb-4">
              <p className="text-xl font-bold">{tier.name}</p>
              <p className="text-gray-400">{tier.xp} XP</p>
            </div>

            {/* Tier Image */}
            <img
              src={tier.img || "/placeholder-tier.png"}
              alt={tier.name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover mb-4 rounded-lg"
            />

            {/* Tier Benefits */}
            <div className="flex flex-col gap-2 w-full">
              {tier.benefits?.map((benefit, j) => (
                <div
                  key={j}
                  className="flex items-center gap-2 text-sm text-gray-200"
                >
                  <CheckIcon size={16} className="text-green-400" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loyalty;
