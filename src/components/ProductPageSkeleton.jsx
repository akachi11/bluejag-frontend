import React from "react";
import styled, { keyframes } from "styled-components";
import {
  MobileProductPage,
  DPPImages,
  DPPInfo,
  ProductNamePrice,
  ProductImg,
  MaterialInfo,
  ProductColors,
  ProductSize,
  ProductDetails,
} from "../Styles/ProductPage"; // adjust path as needed

// === Shimmer animation ===
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
  border-radius: ${(p) => p.radius || "6px"};
`;

const ImgSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 350px;
  margin-bottom: 1rem;
  border-radius: 12px;

  @media only screen and (min-width: 768px) {
    height: 400px;
  }
`;

const TextSkeleton = styled(SkeletonBase)`
  height: ${(p) => p.height || "16px"};
  width: ${(p) => p.width || "100%"};
  margin-bottom: ${(p) => p.mb || "0.6rem"};
`;

const ColorSkeleton = styled(SkeletonBase)`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

const SizeSkeleton = styled(SkeletonBase)`
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

const AccordionSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 30px;
  margin-top: 0.8rem;
`;

export default function ProductSkeleton() {
  return (
    <MobileProductPage>
      {/* Desktop images */}
      <DPPImages>
        {[...Array(4)].map((_, i) => (
          <SkeletonBase
            key={i}
            style={{
              width: "calc(50% - 0.25rem)",
              height: "250px",
              borderRadius: "10px",
            }}
          />
        ))}
      </DPPImages>

      <DPPInfo>
        {/* Name + Price */}
        <ProductNamePrice>
          <div>
            <TextSkeleton width="60%" height="20px" />
            <TextSkeleton width="40%" height="18px" />
          </div>
        </ProductNamePrice>

        {/* Mobile Image */}
        <ProductImg>
          <ImgSkeleton />
        </ProductImg>

        {/* Color info */}
        <MaterialInfo>
          <TextSkeleton width="25%" height="14px" />
          <TextSkeleton width="35%" height="14px" />
        </MaterialInfo>

        {/* Colors */}
        <ProductColors>
          {[...Array(5)].map((_, i) => (
            <ColorSkeleton key={i} />
          ))}
        </ProductColors>

        {/* Sizes */}
        <ProductSize>
          <TextSkeleton width="80%" height="14px" mb="1rem" />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[...Array(6)].map((_, i) => (
              <SizeSkeleton key={i} />
            ))}
          </div>
        </ProductSize>

        {/* Description */}
        <ProductDetails>
          <TextSkeleton width="40%" height="18px" />
          <TextSkeleton width="100%" height="14px" />
          <TextSkeleton width="95%" height="14px" />
          <TextSkeleton width="90%" height="14px" />
        </ProductDetails>

        {/* Accordion placeholders */}
        {[...Array(3)].map((_, i) => (
          <AccordionSkeleton key={i} />
        ))}
      </DPPInfo>
    </MobileProductPage>
  );
}
