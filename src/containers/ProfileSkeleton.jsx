// ProfileSkeleton.jsx
import React from "react";
import styled, { keyframes, css } from "styled-components";

/* =====================
   SHIMMER ANIMATION
   ===================== */
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

/* =====================
   BASE SKELETON STYLE
   ===================== */
const SkeletonBase = styled.div`
  background: #0f172a;
  background-image: linear-gradient(
    90deg,
    #0f172a 0px,
    #1e293b 40px,
    #0f172a 80px
  );
  background-size: 600px 100%;
  animation: ${css`
    ${shimmer} 1.4s infinite linear
  `};
  border-radius: ${(p) => p.radius || "6px"};
`;

/* =====================
   REUSABLE VARIANTS
   ===================== */
const SkeletonText = styled(SkeletonBase)`
  height: ${(p) => p.height || "1rem"};
  width: ${(p) => p.width || "100%"};
  margin-top: ${(p) => p.mt || "0"};
`;

const SkeletonCircle = styled(SkeletonBase)`
  width: ${(p) => p.size || "40px"};
  height: ${(p) => p.size || "40px"};
  border-radius: 50%;
`;

const SkeletonBox = styled(SkeletonBase)`
  height: ${(p) => p.height || "100px"};
  width: ${(p) => p.width || "100%"};
`;

/* =====================
   FULL PROFILE SKELETON
   ===================== */
export const MobileProfileSkeleton = () => {
  return (
    <div className="">
      {/* Name */}
      <SkeletonText width="40%" height="1rem" className="mx-auto" />

      {/* XP Number */}
      <div className="mt-6 flex flex-col items-center justify-center">
        <SkeletonText width="30%" height="3rem" />
        <SkeletonText width="10%" height="1rem" mt="0.5rem" />
      </div>

      {/* XP Progress Bar */}
      <div className="w-[70vw] max-w-md mx-auto mt-6">
        <SkeletonText width="100%" height="1rem" radius="999px" />
      </div>

      {/* Rewards Scroll */}
      <div className="flex gap-2 overflow-x-scroll hide-scrollbar px-8 mt-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 p-4 flex flex-col gap-3 min-w-[50vw]"
          >
            <SkeletonCircle size="20px" />
            <SkeletonText width="70%" height="1rem" />
          </div>
        ))}
      </div>

      {/* Tier image placeholder */}
      <div className="mt-8 h-30 overflow-hidden flex justify-center">
        <SkeletonBox width="60%" height="120px" radius="12px" />
      </div>
    </div>
  );
};
