import React, { useEffect, useState } from "react";
import {
  AccordionClickable,
  DPPImages,
  DPPInfo,
  MaterialInfo,
  MobileProductPage,
  PColor,
  ProductAccordion,
  ProductColors,
  ProductDetails,
  ProductImg,
  ProductKey,
  ProductNamePrice,
  ProductPageContainer,
  ProductSize,
  ProductTop,
  ProductValue,
  ProductsAccordionContainer,
  SizeBox,
  SizeTop,
  SizesFlexbox,
} from "../Styles/ProductPage";
import ImageSlider from "../components/ImagesSlider";
import { IconContainer } from "../Styles/ComponentStyles";
import { SpecialInfo } from "../Styles/HomeSlideStyles";
import BigButton from "../components/BigButton";
import { LiaPlusSolid, LiaMinusSolid } from "react-icons/lia";
import GoinBlue from "../components/GoinBlue";
import HomeSlide from "../components/NewArrivals";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { localHost, renderAPI } from "../constants";
import ProductSkeleton from "../components/ProductPageSkeleton";
import { toast } from "react-toastify";
import { useHomeContext } from "../context/HomeContext";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import ReviewsSection from "../components/ReviewSection";

const ProductPage = () => {
  const [openAccordion, setOpenAccordion] = useState();
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
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const accordionTitles = ["details", "materials", "care", "notes"];
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
  }, [previewOpen]);

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, []);

  const openPreview = (index = 0) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  const nextPreview = () => setPreviewIndex((i) => (i + 1) % images.length);

  const prevPreview = () =>
    setPreviewIndex((i) => (i - 1 + images.length) % images.length);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/product/get-product/${pid}`
      );
      const data = response.data;
      setProduct(data);

      if (data?.colors?.length > 0 && data?.images?.length > 0) {
        // set available colors
        setColors(data.colors);

        // pick the first color
        const firstColor = data.colors[0];
        setSelection((s) => ({
          ...s,
          hexCode: firstColor.hexCode,
          color: firstColor.name,
        }));

        // filter images that match the first color
        const filtered = data.images.filter(
          (img) => img.color?.toLowerCase() === firstColor.hexCode.toLowerCase()
        );

        setImages(filtered.map((img) => img.url));
      }
      setLoading(false);
    } catch (error) {
      console.error(
        "❌ Error fetching product:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddToCart = () => {
    setAddingToCart(true);
    setTimeout(() => {
      setAddingToCart(false);
      toast.success("Added to cart");
    }, 1000);
    const { color, size, hexCode } = selection;

    const itemObj = {
      productId: product._id, // Important: matches the context’s `_id` reference
      name: product.name,
      price: product.price,
      qty: 1,
      color: color,
      size,
      image: product.descriptionImage,
    };

    addProduct(itemObj);
  };

  return (
    <ProductPageContainer className="montserrat">
      {loading ? (
        <ProductSkeleton />
      ) : (
        <MobileProductPage>
          <DPPImages>
            {images.map((img, i) => (
              <img
                src={img}
                alt=""
                onClick={() => openPreview(i)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </DPPImages>

          <DPPInfo>
            <ProductTop>
              <ProductNamePrice>
                <p className="name uppercase mr-4">{product?.name}</p>
                <p className="price">
                  {product?.price.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </p>
              </ProductNamePrice>

              {/* <ProductRating>
              <p className="rating">4.85</p>
              <HRCStars className="product">{stars(4.5)}</HRCStars>
              <p className="raters">5,668</p>
            </ProductRating> */}
            </ProductTop>

            <ProductImg>
              <IconContainer className="bookmark">
                {loggedIn &&
                  (favIds?.includes(product?._id) ? (
                    <IoHeart
                      size={35}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorites(product._id);
                      }}
                      className="absolute top-2 right-2 text-white bg-[rgba(0,0,0,0.38)] rounded-full p-2 cursor-pointer"
                    />
                  ) : (
                    <IoHeartOutline
                      size={35}
                      onClick={(e) => {
                        e.stopPropagation();
                        favoriteItem({
                          name: product.name,
                          price: product.price,
                          thumbnail: product.thumbnail,
                          _id: product._id,
                        });
                      }}
                      className="absolute top-2 right-2 text-white bg-[rgba(0,0,0,0.38)] rounded-full p-2 cursor-pointer"
                    />
                  ))}
              </IconContainer>
              <SpecialInfo className="bg-blue-900">LIMITED EDITION</SpecialInfo>
              <div onClick={() => openPreview(0)} style={{ cursor: "zoom-in" }}>
                <ImageSlider images={images} />
              </div>
            </ProductImg>

            <MaterialInfo>
              <div>
                <ProductKey>COLOR: &nbsp;</ProductKey>
                <ProductValue>
                  {colors.find((c) => c.hexCode === selection.hexCode)?.name ||
                    selection.hexCode}
                </ProductValue>
              </div>
            </MaterialInfo>

            <ProductColors className="bg-gray-400 px-4 py-2 w-fit rounded-2xl">
              {colors.map((colorObj, i) => (
                <PColor
                  key={i}
                  className={
                    selection.hexCode === colorObj.hexCode ? "active" : ""
                  }
                  onClick={() => {
                    // Always update color selection
                    setSelection((s) => ({
                      ...s,
                      hexCode: colorObj.hexCode,
                      color: colorObj.name,
                    }));

                    // Filter images for the selected color
                    const filtered = product.images.filter(
                      (img) =>
                        img.color?.toLowerCase() ===
                        colorObj.hexCode.toLowerCase()
                    );

                    // Only set new images if any exist for that color
                    if (filtered.length > 0) {
                      setImages(filtered.map((img) => img.url));
                    }
                  }}
                  color={colorObj.hexCode}
                >
                  <div></div>
                </PColor>
              ))}
            </ProductColors>

            <ProductSize>
              <SizeTop>
                <div>
                  <ProductValue className="montserrat">
                    Size sold out?{" "}
                    <strong className="text-blue-400 cursor-pointer hover:underline">
                      PRE-ORDER
                    </strong>{" "}
                    at discounted rates and gain XP
                  </ProductValue>
                </div>

                {/* <ProductValue className="fit-guide">FIT GUIDE</ProductValue> */}
              </SizeTop>

              <SizesFlexbox>
                {product?.sizes.map((size, i) => {
                  // ✅ Check if this size exists in variants for the selected color
                  const isAvailable = product.variants.some(
                    (v) =>
                      v.size === size &&
                      v.color === selection.hexCode &&
                      v.units > 0
                  );

                  return (
                    <SizeBox
                      key={i}
                      onClick={() =>
                        isAvailable && setSelection((s) => ({ ...s, size }))
                      }
                      className={`
                      ${selection.size === size ? "active" : ""}
                      ${
                        isAvailable
                          ? "border-blue-900"
                          : "sold-out opacity-40 cursor-not-allowed border-gray-400 border-2"
                      }
                    `}
                    >
                      <div>{size}</div>
                    </SizeBox>
                  );
                })}
              </SizesFlexbox>
            </ProductSize>

            <p className="mt-2 text-sm">Model wears {product?.modelSize}</p>

            <ProductKey className="shipping">
              Free shipping on orders of ₦70,000+
            </ProductKey>

            <BigButton
              title={
                addingToCart
                  ? "ADDING TO CART..."
                  : selection.size !== ""
                  ? "ADD TO CART"
                  : "SELECT YOUR SIZE"
              }
              disabled={addingToCart || selection.size === ""}
              onClick={handleAddToCart}
            />

            <ProductDetails>
              <div>
                <p className="title">{product?.description.title}</p>
                <p className="montserrat">{product?.description.desc}</p>
              </div>

              <ProductsAccordionContainer>
                {accordionTitles.map((title, i) => {
                  const content = product?.[title]; // dynamic access (e.g. product.details)

                  // Skip if not populated
                  if (
                    !content ||
                    (Array.isArray(content) && content.length === 0)
                  )
                    return null;

                  return (
                    <ProductAccordion
                      key={i}
                      className={openAccordion === i ? "open" : ""}
                    >
                      <AccordionClickable
                        onClick={() =>
                          openAccordion === i
                            ? setOpenAccordion(undefined)
                            : setOpenAccordion(i)
                        }
                        className="cursor-pointer"
                      >
                        <p className="capitalize">{title}</p>
                        {openAccordion === i ? (
                          <LiaMinusSolid />
                        ) : (
                          <LiaPlusSolid />
                        )}
                      </AccordionClickable>

                      {/* Display content */}
                      {Array.isArray(content) ? (
                        <ul className="list-disc ml-5 mt-2">
                          {content.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-gray-700">{content}</p>
                      )}
                    </ProductAccordion>
                  );
                })}
              </ProductsAccordionContainer>
            </ProductDetails>
          </DPPInfo>
        </MobileProductPage>
      )}

      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPreview();
            }}
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: 20,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 32,
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <img
            src={images[previewIndex]}
            alt=""
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPreview();
            }}
            aria-label="Next image"
            style={{
              position: "absolute",
              right: 20,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 32,
              cursor: "pointer",
            }}
          >
            ›
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewOpen(false);
            }}
            aria-label="Close preview"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 28,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      )}

      {!loading && product && <ReviewsSection productId={product._id} />}

      <HomeSlide title={"Throw in one or two"} />
      <GoinBlue />
      {/* <RatingSection>
        <RatingSummary ratings={Ratings} />
      </RatingSection> */}
    </ProductPageContainer>
  );
};

export default ProductPage;
