import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { FiTruck, FiPackage, FiRefreshCw } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { localHost, renderAPI } from "../constants";
import { useHomeContext } from "../context/HomeContext";
import { toast } from "react-toastify";
import GoinBlue from "../components/GoinBlue";
import ReviewsSection from "../components/ReviewSection";

const baseURL = location.origin.includes("localhost") ? localHost : renderAPI;

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

const ProductPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [selection, setSelection] = useState({
    color: "",
    size: "",
    hexCode: "",
  });
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipe = 50;
    if (distance > minSwipe && activeImageIndex < images.length - 1) {
      setActiveImageIndex((i) => i + 1);
    } else if (distance < -minSwipe && activeImageIndex > 0) {
      setActiveImageIndex((i) => i - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const accordionItems = [
    { key: "details", title: "Product Details" },
    { key: "materials", title: "Materials" },
    { key: "care", title: "Care Instructions" },
    { key: "notes", title: "Notes" },
  ];

  const { pid } = useParams();
  const { addProduct, favoriteItem, favIds, removeFavorites } = useCart();
  const { loggedIn } = useHomeContext();

  useEffect(() => {
    const onKey = (e) => {
      if (!previewOpen) return;
      if (e.key === "Escape") setPreviewOpen(false);
      if (e.key === "ArrowRight")
        setPreviewIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setPreviewIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewOpen, images.length]);

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, [pid]);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/api/product/get-product/${pid}`
      );
      const data = response.data;
      setProduct(data);

      if (data?.colors?.length > 0 && data?.images?.length > 0) {
        setColors(data.colors);
        const firstColor = data.colors[0];
        setSelection((s) => ({
          ...s,
          hexCode: firstColor.hexCode,
          color: firstColor.name,
        }));
        const filtered = data.images.filter(
          (img) => img.color?.toLowerCase() === firstColor.hexCode.toLowerCase()
        );
        setImages(filtered.map((img) => img.url));
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleColorSelect = (colorObj) => {
    setSelection((s) => ({
      ...s,
      hexCode: colorObj.hexCode,
      color: colorObj.name,
      size: "",
    }));
    const filtered = product.images.filter(
      (img) => img.color?.toLowerCase() === colorObj.hexCode.toLowerCase()
    );
    if (filtered.length > 0) {
      setImages(filtered.map((img) => img.url));
      setActiveImageIndex(0);
    }
  };

  const handleAddToCart = () => {
    if (!selection.size) return;
    setAddingToCart(true);
    setTimeout(() => {
      addProduct({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: 1,
        color: selection.color,
        size: selection.size,
        image: product.descriptionImage || product.thumbnail,
      });
      setAddingToCart(false);
      toast.success("Added to cart");
    }, 800);
  };

  const isFavorited = favIds?.includes(product?._id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFavorites(product._id);
    } else {
      favoriteItem({
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
        _id: product._id,
      });
    }
  };

  // Skeleton Component
  const ProductSkeleton = () => (
    <div className="min-h-screen bg-[#0a0f1a] px-4 md:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images Skeleton */}
          <div className="space-y-4">
            <SkeletonBase className="w-full aspect-[3/4] rounded-2xl" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <SkeletonBase
                  key={i}
                  className="w-20 h-20 rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          </div>
          {/* Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <SkeletonBase className="h-8 w-3/4" />
              <SkeletonBase className="h-5 w-1/2" />
              <SkeletonBase className="h-7 w-1/3" />
            </div>
            <div className="space-y-3">
              <SkeletonBase className="h-4 w-20" />
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <SkeletonBase key={i} className="w-10 h-10 rounded-full" />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <SkeletonBase className="h-4 w-24" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <SkeletonBase key={i} className="h-12 rounded-lg" />
                ))}
              </div>
            </div>
            <SkeletonBase className="h-14 w-full rounded-xl" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <SkeletonBase key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <ProductSkeleton />;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          {product.gender && (
            <>
              <Link
                to={`/category/${product.gender.toLowerCase()}`}
                className="hover:text-white transition-colors capitalize"
              >
                {product.gender}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-slate-300 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-[3/4] bg-slate-900 rounded-2xl overflow-hidden cursor-zoom-in group"
              onClick={() => {
                setPreviewIndex(activeImageIndex);
                setPreviewOpen(true);
              }}
            >
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Limited Edition Badge */}
              {product.limitedEdition && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Limited Edition
                  </span>
                </div>
              )}

              {/* Favorite Button */}
              {loggedIn && (
                <button
                  onClick={toggleFavorite}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  {isFavorited ? (
                    <IoHeart className="text-red-500" size={22} />
                  ) : (
                    <IoHeartOutline className="text-white" size={22} />
                  )}
                </button>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 pb-2 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    activeImageIndex === i
                      ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0a0f1a]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Desktop: Description Image */}
            {product.descriptionImage && (
              <div className="hidden lg:block mt-6">
                <img
                  src={product.descriptionImage}
                  alt=""
                  className="w-full rounded-2xl"
                />
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                {product.name}
              </h1>
              <p className="mt-1 text-slate-400">{product.subDesc}</p>
              <p className="mt-3 text-2xl font-semibold">
                {product.price?.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Color:{" "}
                  <span className="text-white font-medium">
                    {selection.color}
                  </span>
                </span>
                <span className="text-sm text-slate-500">
                  {colors.length} colors
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((colorObj, i) => (
                  <button
                    key={i}
                    onClick={() => handleColorSelect(colorObj)}
                    className={`relative w-11 h-11 rounded-full transition-all ${
                      selection.hexCode === colorObj.hexCode
                        ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0a0f1a] scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: colorObj.hexCode }}
                    title={colorObj.name}
                  >
                    {selection.hexCode === colorObj.hexCode && (
                      <IoMdCheckmark
                        className={`absolute inset-0 m-auto ${
                          colorObj.hexCode.toLowerCase() === "#ffffff" ||
                          colorObj.hexCode.toLowerCase() === "#fff"
                            ? "text-black"
                            : "text-white"
                        }`}
                        size={18}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Size:{" "}
                  <span className="text-white font-medium">
                    {selection.size || "Select"}
                  </span>
                </span>
                {product.modelSize && (
                  <span className="text-sm text-slate-500">
                    Model wears {product.modelSize}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes?.map((size, i) => {
                  const isAvailable = product.variants?.some(
                    (v) =>
                      v.size === size &&
                      v.color === selection.hexCode &&
                      v.units > 0
                  );
                  const isSelected = selection.size === size;

                  return (
                    <button
                      key={i}
                      onClick={() =>
                        isAvailable && setSelection((s) => ({ ...s, size }))
                      }
                      disabled={!isAvailable}
                      className={`relative h-12 rounded-lg font-medium text-sm transition-all ${
                        isSelected
                          ? "bg-white text-black"
                          : isAvailable
                          ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                          : "bg-slate-900/50 text-slate-600 cursor-not-allowed line-through"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-slate-400">
                Size sold out?{" "}
                <button className="text-blue-400 font-medium hover:underline">
                  PRE-ORDER
                </button>{" "}
                at discounted rates
              </p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selection.size || addingToCart}
              className={`w-full h-14 rounded-xl font-semibold text-base uppercase tracking-wide transition-all ${
                selection.size
                  ? "bg-white text-black hover:bg-slate-200"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              } ${addingToCart ? "opacity-70" : ""}`}
            >
              {addingToCart ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Adding...
                </span>
              ) : selection.size ? (
                "Add to Cart"
              ) : (
                "Select Your Size"
              )}
            </button>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FiTruck, text: "Free shipping ₦70k+" },
                { icon: FiPackage, text: "Easy returns" },
                { icon: FiRefreshCw, text: "30-day exchange" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 p-3 bg-slate-800/50 rounded-xl text-center"
                >
                  <item.icon className="text-blue-400" size={20} />
                  <span className="text-xs text-slate-400">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.description && (
              <div className="pt-4 border-t border-slate-800">
                <h3 className="font-semibold mb-2">
                  {product.description.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {product.description.desc}
                </p>
              </div>
            )}

            {/* Accordions */}
            <div className="space-y-2">
              {accordionItems.map(({ key, title }, i) => {
                const content = product[key];
                if (
                  !content ||
                  (Array.isArray(content) && content.length === 0)
                )
                  return null;

                const isOpen = openAccordion === i;

                return (
                  <div
                    key={i}
                    className="border border-slate-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="font-medium">{title}</span>
                      {isOpen ? (
                        <HiOutlineChevronUp size={20} />
                      ) : (
                        <HiOutlineChevronDown size={20} />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-sm text-slate-400">
                        {Array.isArray(content) ? (
                          <ul className="space-y-2">
                            {content.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 mt-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>{content}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Description Image */}
        {product.descriptionImage && (
          <div className="lg:hidden mt-8">
            <img
              src={product.descriptionImage}
              alt=""
              className="w-full rounded-2xl"
            />
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setPreviewOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewIndex((i) => (i - 1 + images.length) % images.length);
            }}
            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <span className="text-2xl">‹</span>
          </button>

          <img
            src={images[previewIndex]}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewIndex((i) => (i + 1) % images.length);
            }}
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <span className="text-2xl">›</span>
          </button>

          <button
            onClick={() => setPreviewOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            ×
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  previewIndex === i
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {product && <ReviewsSection productId={product._id} />}

      {/* Related Products */}
      <GoinBlue />
    </div>
  );
};

export default ProductPage;
