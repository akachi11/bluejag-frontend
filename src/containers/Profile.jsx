import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CheckIcon,
  LogOut,
  ChevronRight,
  Package,
  MapPin,
  Gift,
  Trophy,
  History,
  Crown,
  Sparkles,
} from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useHomeContext } from "../context/HomeContext";
import { localHost, renderAPI } from "../constants";
import { getTierInfo } from "../Constants/Tiers";
import Orders from "./Orders";
import ReferralModal from "../components/ReferralModal";
import noAddrImg from "../assets/no-address.png";

const baseURL = location.origin.includes("localhost") ? localHost : renderAPI;

// Skeleton Animation
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonBase = styled.div`
  background: #0f172a;
  background-image: linear-gradient(
    90deg,
    #0f172a 0px,
    #1e293b 40px,
    #0f172a 80px
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: 6px;
`;

const Profile = () => {
  const { logOut } = useHomeContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referral = searchParams.get("referral");

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [tierInfo, setTierInfo] = useState({
    currentTier: "",
    nextTier: "",
    currentXP: 0,
    totalXP: 0,
    xpToGo: 0,
    percent: 0,
    img: "",
    benefits: [],
  });
  const [mainAddress, setMainAddress] = useState(null);
  const [referralModal, setReferralModal] = useState(referral ?? false);

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    setTierInfo(getTierInfo(userInfo?.xp));
  }, [userInfo?.xp]);
  useEffect(() => {
    const mainAddr = userInfo?.addresses?.find(
      (addr) => addr.isDefault === true
    );
    setMainAddress(mainAddr);
  }, [userInfo]);

  const menuItems = [
    { icon: History, label: "Points History", href: "/points-history" },
    { icon: Trophy, label: "Loyalty Overview", href: "/loyalty-overview" },
    { icon: Package, label: "Orders", href: "/orders", divider: true },
    { icon: MapPin, label: "Address Book", href: "/addresses" },
    {
      icon: Gift,
      label: "Refer a Friend",
      onClick: () => setReferralModal(true),
    },
  ];

  // Mobile Skeleton
  const MobileSkeleton = () => (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center gap-4">
        <SkeletonBase
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
        <SkeletonBase style={{ width: "150px", height: "20px" }} />
        <SkeletonBase style={{ width: "100px", height: "60px" }} />
      </div>
      <SkeletonBase
        style={{ width: "100%", height: "12px", borderRadius: "999px" }}
      />
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <SkeletonBase
            key={i}
            style={{
              width: "150px",
              height: "80px",
              flexShrink: 0,
              borderRadius: "12px",
            }}
          />
        ))}
      </div>
    </div>
  );

  // Desktop Skeleton
  const DesktopSkeleton = () => (
    <div className="hidden lg:flex gap-8 p-12">
      <div className="flex-1 space-y-4">
        <SkeletonBase style={{ width: "60%", height: "24px" }} />
        <SkeletonBase style={{ width: "40%", height: "24px" }} />
        <div className="space-y-2 mt-6">
          {[1, 2].map((i) => (
            <SkeletonBase key={i} style={{ width: "100%", height: "40px" }} />
          ))}
        </div>
      </div>
      <div className="flex-[2] flex flex-col items-center gap-4">
        <SkeletonBase style={{ width: "120px", height: "80px" }} />
        <SkeletonBase
          style={{ width: "100%", height: "8px", borderRadius: "999px" }}
        />
        <SkeletonBase
          style={{ width: "200px", height: "200px", borderRadius: "16px" }}
        />
      </div>
      <div className="flex-1 space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBase key={i} style={{ width: "100%", height: "40px" }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* ===== MOBILE VIEW ===== */}
      <div className="lg:hidden">
        {loading ? (
          <MobileSkeleton />
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative pt-12 pb-8 px-6 bg-gradient-to-b from-slate-900 to-[#0a0f1a]">
              {/* Decorative */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="relative text-center">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold">
                  {userInfo?.firstName?.charAt(0)}
                  {userInfo?.lastName?.charAt(0)}
                </div>

                {/* Name & Tier */}
                <h1 className="text-xl font-bold">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h1>
                <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-slate-800/50 rounded-full">
                  <Crown size={14} className="text-amber-400" />
                  <span className="text-sm text-slate-300">
                    {tierInfo.currentTier}
                  </span>
                </div>

                {/* XP Display */}
                <div className="mt-6">
                  <p className="text-6xl font-bold tracking-tight">
                    {tierInfo.currentXP}
                    <span className="text-lg text-slate-400 ml-1">XP</span>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 max-w-xs mx-auto">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>
                      {tierInfo.currentXP} / {tierInfo.totalXP} XP
                    </span>
                    <span>
                      {tierInfo.totalXP - tierInfo.currentXP} XP to{" "}
                      {tierInfo.nextTier}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${tierInfo.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Carousel */}
            <div className="px-4 -mt-2">
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {tierInfo.benefits?.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[160px] p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl"
                  >
                    <Sparkles size={16} className="text-blue-400 mb-2" />
                    <p className="text-sm text-slate-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier Image */}
            {tierInfo.img && (
              <div className="px-6 py-4">
                <img
                  src={tierInfo.img}
                  alt={tierInfo.currentTier}
                  className="w-48 mx-auto"
                />
              </div>
            )}

            {/* Menu Items */}
            <nav className="mt-4">
              {menuItems.map((item, i) => (
                <React.Fragment key={i}>
                  {item.divider && <div className="h-px bg-slate-800 my-2" />}
                  <button
                    onClick={item.onClick || (() => navigate(item.href))}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-slate-400" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-600" />
                  </button>
                </React.Fragment>
              ))}
            </nav>

            {/* Sign Out */}
            <div className="p-6 pt-4 pb-24">
              <button
                onClick={logOut}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/20 transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>

      {/* ===== DESKTOP VIEW ===== */}
      {loading ? (
        <DesktopSkeleton />
      ) : (
        <div className="hidden lg:block">
          {/* Hero */}
          <div className="relative bg-gradient-to-b from-slate-900 to-[#0a0f1a] px-12 xl:px-20 py-12">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative flex items-center gap-12 max-w-7xl mx-auto">
              {/* Left - User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold">
                    {userInfo?.firstName?.charAt(0)}
                    {userInfo?.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {userInfo?.firstName} {userInfo?.lastName}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Crown size={14} className="text-amber-400" />
                      <span className="text-sm text-slate-400">
                        {tierInfo.currentTier} Member
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => navigate("/points-history")}
                    className="w-full flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <History size={16} className="text-blue-400" />
                      <span className="text-sm font-medium">
                        Points History
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-slate-600" />
                  </button>
                  <button
                    onClick={() => navigate("/loyalty-overview")}
                    className="w-full flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Trophy size={16} className="text-blue-400" />
                      <span className="text-sm font-medium">
                        Loyalty Overview
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Center - XP */}
              <div className="flex-[2] text-center">
                <p className="text-7xl font-bold tracking-tight">
                  {tierInfo.currentXP}
                  <span className="text-2xl text-slate-400 ml-2">XP</span>
                </p>

                <div className="mt-6 max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>
                      {tierInfo.currentXP} / {tierInfo.totalXP} XP
                    </span>
                    <span>
                      {tierInfo.totalXP - tierInfo.currentXP} XP to{" "}
                      {tierInfo.nextTier}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${tierInfo.percent}%` }}
                    />
                  </div>
                </div>

                {tierInfo.img && (
                  <img
                    src={tierInfo.img}
                    alt={tierInfo.currentTier}
                    className="w-48 mx-auto mt-8"
                  />
                )}
              </div>

              {/* Right - Benefits */}
              <div className="flex-1">
                <p className="text-sm text-slate-400 mb-4">
                  {tierInfo.currentTier} Benefits
                </p>
                <div className="space-y-2">
                  {tierInfo.benefits?.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl"
                    >
                      <CheckIcon size={16} className="text-green-400" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex gap-8 px-12 xl:px-20 py-8 max-w-7xl mx-auto">
            {/* Orders */}
            <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h2 className="font-semibold flex items-center gap-2">
                  <Package size={18} className="text-blue-400" />
                  Recent Orders
                </h2>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                <Orders profilePage={true} />
              </div>
            </div>

            {/* Address & Actions */}
            <div className="flex-1 space-y-6">
              {/* Address Card */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h2 className="font-semibold flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-blue-400" />
                  Default Address
                </h2>

                {mainAddress ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-xl">
                      <p className="font-medium">
                        {mainAddress.firstName} {mainAddress.lastName}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        {mainAddress.line1}
                      </p>
                      {mainAddress.line2 && (
                        <p className="text-sm text-slate-400">
                          {mainAddress.line2}
                        </p>
                      )}
                      <p className="text-sm text-slate-400">
                        {mainAddress.postalCode} {mainAddress.state}
                      </p>
                      <p className="text-sm text-slate-400 mt-2">
                        {mainAddress.phone}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/addresses")}
                      className="text-sm text-blue-400 hover:underline"
                    >
                      Manage Addresses →
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <img
                      src={noAddrImg}
                      alt=""
                      className="w-32 mx-auto mb-4 opacity-50"
                    />
                    <p className="text-slate-500 text-sm mb-4">
                      No address saved
                    </p>
                    <button
                      onClick={() => navigate("/addresses")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add Address
                    </button>
                  </div>
                )}
              </div>

              {/* Referral Card */}
              <button
                onClick={() => setReferralModal(true)}
                className="w-full p-6 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl text-left hover:from-blue-600/30 hover:to-indigo-600/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Gift size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Refer a Friend</p>
                    <p className="text-sm text-slate-400">
                      Earn XP for every referral
                    </p>
                  </div>
                </div>
              </button>

              {/* Sign Out */}
              <button
                onClick={logOut}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/20 transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {referralModal && (
        <ReferralModal
          isOpen={referralModal}
          onClose={() => setReferralModal(false)}
          userName={userInfo?.firstName}
          referralCode={userInfo?.referralCode}
        />
      )}
    </div>
  );
};

export default Profile;
