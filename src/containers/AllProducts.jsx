import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Grid3X3,
  LayoutGrid,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { localHost, renderAPI } from "../constants";
import { useCart } from "../context/CartContext";
import { useHomeContext } from "../context/HomeContext";

const baseURL = location.origin.includes("localhost") ? localHost : renderAPI;

// === Skeleton ===
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
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  height: 250px;
  border-radius: 12px;

  @media (min-width: 768px) {
    height: 300px;
  }
`;

const SkeletonText = styled(SkeletonBase)`
  height: ${(p) => p.$height || "14px"};
  width: ${(p) => p.$width || "100%"};
  border-radius: 6px;
`;

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [gridSize, setGridSize] = useState("default"); // "default" or "large"

  const observerRef = useRef(null);
  const lastProductRef = useRef(null);

  const { favoriteItem, favIds, removeFavorites } = useCart();
  const { loggedIn } = useHomeContext();

  const genderOptions = ["Men", "Women"];
  const categoryOptions = [
    "Compression",
    "Hoodies",
    "Shorts",
    "Leggings",
    "Sports Bras",
    "Tanks",
  ];
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-az", label: "Name: A-Z" },
  ];

  const fetchProducts = useCallback(
    async (pageNum, isInitial = false) => {
      if ((!hasMore && !isInitial) || loadingMore) return;

      try {
        isInitial ? setInitialLoading(true) : setLoadingMore(true);

        const limit = isInitial ? 20 : 10;
        const res = await axios.get(`${baseURL}/api/product/get-products`, {
          params: {
            page: pageNum,
            limit,
            gender: selectedGender || undefined,
            categories: selectedCategory || undefined,
            keyword: searchQuery || undefined,
            new: sortBy === "newest" ? true : undefined,
          },
        });

        let fetched = res.data.products || res.data;

        // Client-side sorting (if API doesn't support it)
        if (sortBy === "price-low") {
          fetched = [...fetched].sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
          fetched = [...fetched].sort((a, b) => b.price - a.price);
        } else if (sortBy === "name-az") {
          fetched = [...fetched].sort((a, b) => a.name.localeCompare(b.name));
        }

        const pagination = res.data.pagination;

        setProducts((prev) => (isInitial ? fetched : [...prev, ...fetched]));
        setHasMore(
          pagination ? pagination.hasNextPage : fetched.length === limit
        );
        setTotalProducts(
          pagination ? pagination.totalProducts : fetched.length
        );
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
      }
    },
    [
      selectedGender,
      selectedCategory,
      sortBy,
      searchQuery,
      hasMore,
      loadingMore,
    ]
  );

  // Initial fetch
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [selectedGender, selectedCategory, sortBy]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  };

  const clearFilters = () => {
    setSelectedGender("");
    setSelectedCategory("");
    setSortBy("newest");
    setSearchQuery("");
  };

  const activeFiltersCount = [selectedGender, selectedCategory].filter(
    Boolean
  ).length;

  const toggleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (favIds?.includes(item._id)) {
      removeFavorites(item._id);
    } else {
      favoriteItem({
        name: item.name,
        price: item.price,
        thumbnail: item.thumbnail,
        _id: item._id,
      });
    }
  };

  const getSkeletonCount = (rows) => {
    if (typeof window === "undefined") return rows * 4;
    const width = window.innerWidth;
    if (gridSize === "large") return rows * 2;
    if (width >= 1280) return rows * 5;
    if (width >= 1024) return rows * 4;
    if (width >= 768) return rows * 3;
    return rows * 2;
  };

  const CardSkeleton = () => (
    <div className="w-full">
      <SkeletonImage />
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <SkeletonText $width="85%" $height="14px" />
        <SkeletonText $width="50%" $height="12px" />
        <SkeletonText $width="35%" $height="14px" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative px-4 md:px-8 lg:px-12 pt-12 pb-6 md:pt-16 md:pb-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
              Shop
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              All Products
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Explore our complete collection of premium athletic wear. Built
              for performance, designed for style.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-0 z-30 bg-[#0a0f1a]/95 backdrop-blur-sm border-b border-slate-800">
        <div className="px-4 md:px-8 lg:px-12 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex-1 min-w-[200px] max-w-md"
            >
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </form>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800/50 border border-slate-700 hover:bg-slate-800"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-white text-blue-600 rounded-full text-xs flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-800/50 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-slate-800/50 border border-slate-700 rounded-xl p-1">
              <button
                onClick={() => setGridSize("default")}
                className={`p-2 rounded-lg transition-colors ${
                  gridSize === "default"
                    ? "bg-slate-700"
                    : "hover:bg-slate-700/50"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridSize("large")}
                className={`p-2 rounded-lg transition-colors ${
                  gridSize === "large"
                    ? "bg-slate-700"
                    : "hover:bg-slate-700/50"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Product Count */}
            {!initialLoading && (
              <span className="text-sm text-slate-500 ml-auto">
                {totalProducts} products
              </span>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap gap-6">
                {/* Gender */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Gender
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {genderOptions.map((g) => (
                      <button
                        key={g}
                        onClick={() =>
                          setSelectedGender(selectedGender === g ? "" : g)
                        }
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          selectedGender === g
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 hover:bg-slate-700"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((c) => (
                      <button
                        key={c}
                        onClick={() =>
                          setSelectedCategory(selectedCategory === c ? "" : c)
                        }
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          selectedCategory === c
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 hover:bg-slate-700"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors self-end"
                  >
                    <X size={14} />
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div
          className={`grid gap-4 sm:gap-6 ${
            gridSize === "large"
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          }`}
        >
          {/* Initial Loading */}
          {initialLoading &&
            Array.from({ length: getSkeletonCount(2) }).map((_, i) => (
              <CardSkeleton key={`skeleton-${i}`} />
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
                  <div
                    className={`overflow-hidden ${
                      gridSize === "large" ? "aspect-[4/5]" : "aspect-[3/4]"
                    }`}
                  >
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

                  {loggedIn && (
                    <button
                      onClick={(e) => toggleFavorite(e, product)}
                      className="absolute top-3 right-3 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                    >
                      {favIds?.includes(product._id) ? (
                        <IoHeart className="text-red-500" size={18} />
                      ) : (
                        <IoHeartOutline className="text-white" size={18} />
                      )}
                    </button>
                  )}

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

          {/* Loading More */}
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
              <Search size={32} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No products found
            </h3>
            <p className="text-slate-500 max-w-md mb-6">
              Try adjusting your filters or search query to find what you're
              looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
