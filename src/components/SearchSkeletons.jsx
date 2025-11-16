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

const SkeletonLine = styled.div`
  height: ${({ height }) => height || "0.8rem"};
  width: ${({ width }) => width || "80%"};
  ${baseShimmer};
`;

const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  ${baseShimmer};
`;

// Suggestions Skeleton
export const SuggestionsSkeleton = () => (
  <div className="flex flex-col gap-4 lg:flex-1 min-w-0">
    <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-4">
      <div className="flex gap-2 items-center lg:gap-1">
        <SkeletonLine width="100px" height="1rem" />
      </div>
    </div>
  </div>
);

// Products Skeleton
export const ProductsSkeleton = () => (
  <div className="flex flex-col gap-8 lg:flex-3 min-w-0">
    <div>
      <div className="grid gap-y-8 grid-cols-2 gap-2 mt-4 lg:grid-cols-4 lg:gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx}>
            <SkeletonImage />
            <div className="montserrat mt-4 flex flex-col gap-2">
              <SkeletonLine width="90%" height="1rem" />
              <SkeletonLine width="60%" height="1rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Combined Autocomplete Skeleton (Suggestions + Products)
export const AutocompleteSkeleton = () => (
  <>
    <SuggestionsSkeleton />
    <ProductsSkeleton />
  </>
);
