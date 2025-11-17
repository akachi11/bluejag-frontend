import React from "react";
import styled, { keyframes, css } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -300px 0; }
  100% { background-position: 300px 0; }
`;

const baseShimmer = css`
  background: linear-gradient(90deg, #0f172a 0px, #1e293b 40px, #0f172a 80px);
  background-size: 600px 100%;
  animation: ${shimmer} 1.6s infinite linear;
  border-radius: 6px;
`;

export const AddressSkeletonWrapper = styled.div`
  gap: 1.5rem;
`;

export const AddressCardSkeleton = styled.div`
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const SkeletonLine = styled.div`
  height: ${({ height }) => height || "0.8rem"};
  width: ${({ width }) => width || "80%"};
  ${baseShimmer};
`;

export const SkeletonButton = styled.div`
  width: 8rem;
  height: 2.2rem;
  border-radius: 9999px;
  margin: auto;
  margin-top: 1rem;
  ${baseShimmer};
`;

export const AddressBookSkeleton = () => (
  <AddressSkeletonWrapper className="px-4 flex flex-col gap-8 md:flex-row md:justify-between">
    {/* Main Address */}
    <div className="flex-1">
      <AddressCardSkeleton>
        <SkeletonLine width="30%" height="1rem" />
        <div style={{ marginTop: "0.5rem" }}>
          <SkeletonLine width="60%" />
          <SkeletonLine width="50%" />
          <SkeletonLine width="70%" />
          <SkeletonLine width="40%" />
        </div>
      </AddressCardSkeleton>

      {/* Add Address Button */}
      <SkeletonButton />
    </div>

    <div className="flex-1 flex flex-col gap-2">
      {/* Address List */}
      {[...Array(2)].map((_, i) => (
        <AddressCardSkeleton key={i}>
          <SkeletonLine width="50%" />
          <SkeletonLine width="80%" />
          <SkeletonLine width="70%" />
          <SkeletonLine width="60%" />
        </AddressCardSkeleton>
      ))}
    </div>
  </AddressSkeletonWrapper>
);
