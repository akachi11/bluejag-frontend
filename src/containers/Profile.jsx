import { CheckIcon, LogOut } from "lucide-react";
import React, { useState } from "react";
import tier1img from "../assets/tier1.png";
import tier2img from "../assets/tier2.png";
import tier3img from "../assets/tier3.png";
import tier4img from "../assets/tier4.png";
import { useHomeContext } from "../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { MobileProfileSkeleton } from "./ProfileSkeleton";

const currentXP = 103;
const totalXP = 1250;
const percent = (currentXP / totalXP) * 100;

const Profile = () => {
  const { logOut } = useHomeContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  return (
    <div>
      {/* MOBILE PROFILE HERO */}
      <div className="bg-gray-950 pt-16 lg:pt-8 lg:hidden">
        {loading ? (
          <MobileProfileSkeleton />
        ) : (
          <>
            <p className="text-white montserrat text-center font-bold text-sm">
              OGOGOR CHIMADIKA
            </p>

            <p class="text-white text-[5rem] m-auto text-center anton mt-4 w-fit relative">
              {currentXP}
              <sup class="absolute top-0 mt-4 -mr-4 right-0 text-sm ml-1 montserrat font-semibold">
                xp
              </sup>
            </p>

            <div className="w-[70vw] max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-300 font-bold montserrat mb-1">
                <span>
                  {currentXP} / {totalXP} XP
                </span>
                <span>{totalXP - currentXP} XP to go</span>
              </div>

              <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-scroll hide-scrollbar px-8 mt-8 montserrat">
              <div className="bg-gray-800 p-4 flex flex-col gap-2 min-w-[50vw]">
                <CheckIcon size={20} />
                <p className="text-sm">15% Birthday reward</p>
              </div>

              <div className="bg-gray-800 p-4 flex flex-col gap-2 min-w-[50vw]">
                <CheckIcon size={20} />
                <p className="text-sm">15% Birthday reward</p>
              </div>

              <div className="bg-gray-800 p-4 flex flex-col gap-2 min-w-[50vw]">
                <CheckIcon size={20} />
                <p className="text-sm">15% Birthday reward</p>
              </div>
            </div>

            <div className="mt-8 h-30 overflow-hidden">
              <img
                src={tier1img}
                alt=""
                className="w-[60%] m-auto object-top object-cover"
              />
            </div>
          </>
        )}

        <div className="montserrat uppercase font-semibold text-xs">
          <p className="p-6">Rewards</p>
          <p className="p-6">Points history</p>
          <p className="p-6">Loyalty overview</p>
          <hr className="border-zinc-800" />
          <p className="p-6">Orders</p>
          <p
            className="p-6"
            onClick={() => {
              navigate("/addresses");
            }}
          >
            Address Book
          </p>
          <p className="p-6">Returns</p>
          <p className="p-6">Refer a friend</p>
        </div>

        <button
          className="flex gap-1 text-sm font-semibold underline ml-6 mt-4 items-center"
          onClick={logOut}
        >
          <LogOut size={15} />
          <p>Signout</p>
        </button>
      </div>

      {/* DESKTOP PROFILE HERO */}
      <div className="hidden justify-between bg-gray-950 montserrat px-12 items-center lg:flex xl:px-32">
        {/* Left section */}
        <div className="flex-1">
          <p className="font-semibold">OGOGOR</p>
          <p className="font-semibold">CHIMADIKA</p>

          <div className="mt-4 w-full flex-1 flex items-start flex-col gap-1 text-xs font-semibold">
            <button className="bg-blue-900 text-white py-2 px-4 w-full text-left">
              REWARDS
            </button>
            <button className="bg-blue-900 text-white py-2 px-4 w-full text-left">
              POINTS HISTORY
            </button>
            <button className="bg-blue-900 text-white py-2 px-4 w-full text-left">
              LOYALTY OVERVIEW
            </button>
          </div>
        </div>

        {/* Middle section (bigger) */}
        <div className="flex-2 mx-12">
          <p className="text-white text-[5rem] m-auto text-center anton mt-4 w-fit relative">
            {currentXP}
            <sup className="absolute top-0 mt-4 -mr-4 right-0 text-sm ml-1 montserrat font-semibold">
              xp
            </sup>
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-300 font-bold montserrat mb-1">
              <span>
                {currentXP} / {totalXP} XP
              </span>
              <span>{totalXP - currentXP} XP to go</span>
            </div>

            <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-8 h-30 lg:h-40 xl:h-60 overflow-hidden">
            <img
              src={tier1img}
              alt=""
              className="w-[30%] lg:w-full m-auto object-top object-cover"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex-1">
          <p className="font-extralight text-xs">Tier 1 Benefits</p>
          <div className="mt-4 flex items-start flex-col gap-1 text-xs">
            <button className="bg-gray-900 text-white flex items-center gap-2 py-2 px-4 w-full text-left">
              <CheckIcon size={15} />
              15% Birthday rewards
            </button>
            <button className="bg-gray-900 text-white flex items-center gap-2 py-2 px-4 w-full text-left">
              <CheckIcon size={15} />
              15% Birthday rewards
            </button>
            <button className="bg-gray-900 text-white flex items-center gap-2 py-2 px-4 w-full text-left">
              <CheckIcon size={15} />
              15% Birthday rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
