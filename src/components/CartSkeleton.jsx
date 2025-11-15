import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
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
  border-radius: ${(p) => p.radius || "6px"};
`;

const CartSkeleton = () => {
  return (
    <div className="pb-12 px-4">
      {/* Clear cart */}
      <div className="flex justify-end mt-4">
        <SkeletonBase className="w-20 h-4" />
      </div>

      {/* Delivery Info */}
      <div className="mt-6 flex items-center gap-2">
        <SkeletonBase className="w-44 h-4" />
        <SkeletonBase className="w-5 h-5 rounded-full" />
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2 mt-4 p-4 rounded-md bg-[#0f172a]">
        <SkeletonBase className="w-6 h-6 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonBase className="w-3/4 h-3" />
          <SkeletonBase className="w-2/3 h-3" />
        </div>
      </div>

      {/* Cart items */}
      {Array.from({ length: 2 }, (_, i) => (
        <div key={i} className="flex gap-4 mt-8">
          <SkeletonBase className="w-24 h-32 rounded-lg" />
          <div className="flex-1 space-y-3">
            <SkeletonBase className="w-12 h-4" />
            <SkeletonBase className="w-32 h-3" />
            <SkeletonBase className="w-20 h-3" />
            <div className="flex justify-between items-center">
              <SkeletonBase className="w-16 h-4" />
              <SkeletonBase className="w-20 h-6 rounded-lg" />
            </div>
            <SkeletonBase className="w-24 h-3" />
          </div>
        </div>
      ))}

      {/* Extras Section */}
      <div className="mt-8 space-y-2">
        <SkeletonBase className="w-40 h-4" />
        <SkeletonBase className="w-3/4 h-3" />
        <div className="flex gap-4 mt-4 overflow-hidden">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-[80%] bg-[#0f172a] p-3 rounded-lg flex gap-2"
            >
              <SkeletonBase className="w-20 h-28 rounded" />
              <div className="flex-1 space-y-3">
                <SkeletonBase className="w-16 h-4" />
                <SkeletonBase className="w-20 h-3" />
                <SkeletonBase className="w-8 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discount section */}
      <div className="mt-8 space-y-3">
        <SkeletonBase className="w-28 h-4" />
        <div className="flex items-center gap-3">
          <SkeletonBase className="flex-1 h-8 rounded-3xl" />
          <SkeletonBase className="w-20 h-8 rounded-3xl" />
        </div>
      </div>

      {/* Order summary */}
      <div className="mt-8 space-y-3">
        <SkeletonBase className="w-32 h-4" />
        <SkeletonBase className="w-full h-3" />
        <SkeletonBase className="w-full h-3" />
        <SkeletonBase className="w-full h-3" />
      </div>

      {/* Checkout button */}
      <div className="max-w-[300px] m-auto mt-8">
        <SkeletonBase className="w-full h-10 rounded-3xl" />
      </div>
    </div>
  );
};

export default CartSkeleton;
