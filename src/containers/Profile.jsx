import { CheckIcon, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import tier1img from "../assets/tier1.png";
import tier2img from "../assets/tier2.png";
import tier3img from "../assets/tier3.png";
import tier4img from "../assets/tier4.png";
import { useHomeContext } from "../context/HomeContext";
import { useNavigate } from "react-router-dom";
import {
  DesktopProfileSkeleton,
  MobileProfileSkeleton,
} from "./ProfileSkeleton";
import Orders from "./Orders";
import { localHost, renderAPI } from "../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { getTierInfo } from "../Constants/Tiers";
import noAddrImg from "../assets/no-address.png";

const Profile = () => {
  const { logOut } = useHomeContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [tierInfo, setTierInfo] = useState({
    currentTier: "",
    nextTier: "",
    currentXP: 0,
    totalXP: 0,
    xpToGo: 0,
    percent: 0,
  });
  const [mainAddress, setMainAddress] = useState();

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setUserInfo(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const info = getTierInfo(userInfo?.xp);
    setTierInfo(info);
  }, [userInfo?.xp]);

  useEffect(() => {
    const mainAddr = userInfo?.addresses.find(
      (addr) => addr.isDefault === true
    );
    setMainAddress(mainAddr);
  }, [userInfo]);

  return (
    <div>
      {/* MOBILE PROFILE HERO */}
      <div className="bg-gray-950 pb-12 pt-16 lg:pt-8 lg:hidden">
        {loading ? (
          <MobileProfileSkeleton />
        ) : (
          <>
            <p className="text-white montserrat text-center font-bold text-sm">
              {userInfo?.firstName} {userInfo?.lastName}
            </p>

            <p class="text-white text-[5rem] m-auto text-center anton mt-4 w-fit relative">
              {tierInfo.currentXP}
              <sup class="absolute top-0 mt-4 -mr-4 right-0 text-sm ml-1 montserrat font-semibold">
                xp
              </sup>
            </p>

            <div className="w-[70vw] max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-300 font-bold montserrat mb-1">
                <span>
                  {tierInfo.currentXP} / {tierInfo.totalXP} XP
                </span>
                <span>{tierInfo.totalXP - tierInfo.currentXP} XP to go</span>
              </div>

              <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${tierInfo.percent}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-scroll hide-scrollbar px-8 mt-8 montserrat">
              {tierInfo?.benefits?.map((benefit) => (
                <div className="bg-gray-800 p-4 flex flex-col gap-2 min-w-[50vw]">
                  <CheckIcon size={20} />
                  <p className="text-sm">{benefit}</p>
                </div>
              ))}
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

        <div className="montserrat bg-gray-950  uppercase font-semibold text-xs">
          <p
            className="p-6"
            onClick={() => {
              navigate("/points-history");
            }}
          >
            Points history
          </p>
          <p
            className="p-6"
            onClick={() => {
              navigate("/loyalty-overview");
            }}
          >
            Loyalty overview
          </p>
          <hr className="border-zinc-800" />
          <p
            className="p-6"
            onClick={() => {
              navigate("/orders");
            }}
          >
            Orders
          </p>
          <p
            className="p-6"
            onClick={() => {
              navigate("/addresses");
            }}
          >
            Address Book
          </p>
          <p className="p-6">Refer a friend</p>
          <button
            className="flex gap-1 font-semibold underline ml-6 mt-4 items-center text-lg bg-red-800 px-4 py-2 rounded-2xl"
            onClick={logOut}
          >
            <LogOut size={15} />
            <p>Signout</p>
          </button>
        </div>
      </div>

      {/* DESKTOP PROFILE HERO */}
      {loading ? (
        <DesktopProfileSkeleton />
      ) : (
        <div className="hidden lg:block">
          <div className="flex justify-between bg-gray-950 montserrat px-12 items-center xl:px-32">
            {/* Left section */}
            <div className="flex-1">
              <p className="font-semibold">OGOGOR</p>
              <p className="font-semibold">CHIMADIKA</p>

              <div className="mt-4 w-full flex-1 flex items-start flex-col gap-1 text-xs font-semibold">
                <button
                  onClick={() => {
                    navigate("/points-history");
                  }}
                  className="bg-blue-900 text-white py-2 px-4 w-full text-left"
                >
                  POINTS HISTORY
                </button>
                <button
                  onClick={() => {
                    navigate("/loyalty-overview");
                  }}
                  className="bg-blue-900 text-white py-2 px-4 w-full text-left"
                >
                  LOYALTY OVERVIEW
                </button>
              </div>
            </div>

            {/* Middle section (bigger) */}
            <div className="flex-2 mx-12">
              <p className="text-white text-[5rem] m-auto text-center anton mt-4 w-fit relative">
                {tierInfo.currentXP}
                <sup className="absolute top-0 mt-4 -mr-4 right-0 text-sm ml-1 montserrat font-semibold">
                  xp
                </sup>
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-300 font-bold montserrat mb-1">
                  <span>
                    {tierInfo.currentXP} / {tierInfo.totalXP} XP
                  </span>
                  <span>{tierInfo.totalXP - tierInfo.currentXP} XP to go</span>
                </div>

                <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${tierInfo.percent}%` }}
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
              <p className="font-extralight text-xs">
                {tierInfo.currentTier} Benefits
              </p>
              <div className="mt-4 flex items-start flex-col gap-1 text-xs">
                {tierInfo?.benefits?.map((benefit) => (
                  <div className="bg-gray-900 text-white flex items-center gap-2 py-2 px-4 w-full text-left">
                    <CheckIcon size={15} />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-8 items-center">
            {/* // ORDERS */}
            <div className="flex-1 relative h-[80vh]">
              <Orders profilePage={true} />
            </div>

            {/* OTHER ITEMS */}
            <div className="flex-1 h-[80vh] flex pt-10 flex-col gap-6">
              {/* Addresses Container */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-4">
                {mainAddress ? (
                  <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                    <p className="text-white text-lg font-bold tracking-wide">
                      MAIN ADDRESS
                    </p>

                    {/* Info panels */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Name */}
                      <div className="bg-gray-800 p-4 rounded-xl flex flex-col">
                        <p className="text-white font-semibold text-sm">Name</p>
                        <p className="text-zinc-300">
                          {mainAddress.firstName} {mainAddress.lastName}
                        </p>
                      </div>

                      {/* Street Address */}
                      <div className="bg-gray-800 p-4 rounded-xl flex flex-col">
                        <p className="text-white font-semibold text-sm">
                          Address
                        </p>
                        <p className="text-zinc-300">{mainAddress.line1}</p>
                        {mainAddress.line2 && (
                          <p className="text-zinc-300">{mainAddress.line2}</p>
                        )}
                        <p className="text-zinc-300">
                          {mainAddress.postalCode} {mainAddress.state}
                        </p>
                      </div>

                      {/* Contact */}
                      <div className="bg-gray-800 p-4 rounded-xl flex flex-col">
                        <p className="text-white font-semibold text-sm">
                          Contact
                        </p>
                        <p className="text-zinc-300">{mainAddress.email}</p>
                        <p className="text-zinc-300">{mainAddress.phone}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/addresses")}
                      className="mt-auto w-fit  bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center"
                    >
                      Manage Addresses
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-900 rounded-2xl shadow-2xl flex-1 flex flex-col justify-center items-center gap-6 p-8">
                    <img src={noAddrImg} className="-mt-30 scale-75" alt="" />

                    <button
                      onClick={() => navigate("/addresses")}
                      className="w-fit -mt-28 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center"
                    >
                      Add Address
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Sign Out */}
              <div className="px-4 flex justify-end">
                <button
                  onClick={logOut}
                  className="w-fit bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
