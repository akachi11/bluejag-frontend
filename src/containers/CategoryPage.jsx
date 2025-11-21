import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { localHost, renderAPI } from "../constants";

const baseURL = location.origin.includes("localhost") ? localHost : renderAPI;

// Gender aliases - these use /gender/:gender endpoint
const genderMap = {
  men: true,
  male: true,
  women: true,
  female: true,
  unisex: true,
  kids: true,
};

const isGenderCategory = (cat) => genderMap[cat?.toLowerCase()] || false;

// Category descriptions
const categoryInfo = {
  men: {
    title: "Men's Collection",
    description:
      "Elevate your performance and style with Bluejag's men's collection — crafted for those who move with purpose. Our workout tops and athletic wear are built to deliver peak comfort, confidence, and versatility.",
  },
  male: {
    title: "Men's Collection",
    description:
      "Elevate your performance and style with Bluejag's men's collection — crafted for those who move with purpose. Our workout tops and athletic wear are built to deliver peak comfort, confidence, and versatility.",
  },
  women: {
    title: "Women's Collection",
    description:
      "Discover Bluejag's women's collection — designed for strength, movement, and elegance. From studio to street, our pieces empower you to perform at your best while looking effortlessly stylish.",
  },
  female: {
    title: "Women's Collection",
    description:
      "Discover Bluejag's women's collection — designed for strength, movement, and elegance. From studio to street, our pieces empower you to perform at your best while looking effortlessly stylish.",
  },
  unisex: {
    title: "Unisex Collection",
    description:
      "Performance wear without boundaries. Our unisex collection delivers versatile, inclusive designs that fit every body and every workout.",
  },
  kids: {
    title: "Kids Collection",
    description:
      "Built for young athletes on the move. Durable, comfortable, and stylish gear that keeps up with their energy.",
  },
};

// === Skeleton Styles ===
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
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
  border-radius: ${(p) => p.$radius || "6px"};
`;

const CardSkeleton = () => (
  <div className="w-full">
    {/* Image skeleton */}
    <SkeletonBase className="w-full h-[300px] rounded-xl" />

    {/* Text skeletons */}
    <div className="mt-3 flex flex-col gap-2">
      <SkeletonBase className="h-[14px] w-[85%]" />
      <SkeletonBase className="h-[12px] w-1/2" />
      <SkeletonBase className="h-[14px] w-[35%]" />
    </div>
  </div>
);

const CategoryPage = () => {
  const { cat } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const observerRef = useRef(null);
  const lastProductRef = useRef(null);

  const normalizedCat = cat?.toLowerCase();
  const isGender = isGenderCategory(normalizedCat);
  const info = categoryInfo[normalizedCat] || {
    title: cat,
    description: `Explore our ${cat} collection — premium athletic wear designed for peak performance and unmatched style.`,
  };

  const fetchProducts = useCallback(
    async (pageNum, isInitial = false) => {
      if ((!hasMore && !isInitial) || loadingMore) return;

      try {
        isInitial ? setInitialLoading(true) : setLoadingMore(true);

        const limit = isInitial ? 20 : 10;
        const endpoint = isGender
          ? `${baseURL}/api/product/gender/${normalizedCat}`
          : `${baseURL}/api/product/category/${normalizedCat}`;

        const res = await axios.get(endpoint, {
          params: { page: pageNum, limit },
        });

        const { products: fetched, pagination } = res.data;

        setProducts((prev) => (isInitial ? fetched : [...prev, ...fetched]));
        setHasMore(pagination.hasNextPage);
        setTotalProducts(pagination.totalProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        // setInitialLoading(false);
        // setLoadingMore(false);
      }
    },
    [normalizedCat, isGender, hasMore, loadingMore]
  );

  // Reset and fetch on category change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    fetchProducts(1, true);
  }, [cat]);

  // Fetch more on page change
  useEffect(() => {
    if (page > 1) fetchProducts(page);
  }, [page]);

  // Intersection Observer
  useEffect(() => {
    if (initialLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;
    if (lastProductRef.current) observer.observe(lastProductRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadingMore, initialLoading, products]);

  // Skeleton counts based on grid
  const getSkeletonCount = (rows) => {
    if (typeof window === "undefined") return rows * 4;
    const width = window.innerWidth;
    if (width >= 1280) return rows * 5;
    if (width >= 1024) return rows * 4;
    if (width >= 768) return rows * 3;
    return rows * 2;
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative px-4 md:px-8 lg:px-12 pt-12 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
              Collection
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight capitalize">
              {info.title}
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {info.description}
            </p>

            {!initialLoading && (
              <p className="mt-6 text-sm text-slate-500">
                {totalProducts} {totalProducts === 1 ? "Product" : "Products"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 md:px-8 lg:px-12 pb-16">
        <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Initial Loading Skeleton - 2 rows */}
          {initialLoading &&
            Array.from({ length: getSkeletonCount(2) }).map((_, i) => (
              <CardSkeleton key={`initial-skeleton-${i}`} />
            ))}

          {/* Products */}
          {!initialLoading &&
            products.map((product, index) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                ref={index === products.length - 1 ? lastProductRef : null}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-slate-900/50">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {product.limitedEdition && (
                    <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded">
                      Limited
                    </span>
                  )}

                  {/* Quick color preview */}
                  {product.colors?.length > 0 && (
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {product.colors.slice(0, 4).map((color, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hexCode }}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="w-3 h-3 rounded-full bg-black/50 text-[8px] text-white flex items-center justify-center">
                          +{product.colors.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-medium text-sm text-white truncate group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {product.categories?.[0] || product.gender}
                  </p>
                  <p className="font-semibold text-sm">
                    {product.price?.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </p>
                </div>
              </Link>
            ))}

          {/* Loading More Skeleton - 1 row */}
          {loadingMore &&
            Array.from({ length: getSkeletonCount(1) }).map((_, i) => (
              <CardSkeleton key={`more-skeleton-${i}`} />
            ))}
        </div>

        {/* End of Results */}
        {!initialLoading && !hasMore && products.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-slate-400">
                You've viewed all {totalProducts} products
              </span>
            </div>
          </div>
        )}

        {/* No Products */}
        {!initialLoading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-slate-800 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No products found
            </h3>
            <p className="text-slate-500 max-w-md">
              We couldn't find any products in this category. Check back soon or
              explore other collections.
            </p>
            <Link
              to="/"
              className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
