import React, { useEffect, useRef, useState } from "react";
import { HomeContainer } from "../Styles/ComponentStyles";
import HeroSection from "../components/HeroSection";
import HomeCard from "../components/HomeCard";
import WearsSlides from "../components/WearsSlides";
import HomeReview from "../components/HomeReview";
import HomeSlide from "../components/NewArrivals";
import GoinBlue from "../components/GoinBlue";
import HomeRatings from "../components/HomeRatings";
import axios from "axios";
import { toast } from "react-toastify";
import { localHost, renderAPI } from "../constants";

const Home = () => {
  const [products, setProducts] = useState([]);
  const newArrivalsRef = useRef(null);

  useEffect(() => {
    window.scroll(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/product/category/new`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(
        "❌ Error fetching products:",
        error.response?.data || error.message
      );
      toast.error("Error fetching products");
    }
  };

  return (
    <HomeContainer className="bg-gray-950">
      {/* 👇 pass scroll handler to HeroSection */}
      <HeroSection
        onShopNowClick={() => {
          const yOffset = -96; // 👈 6rem = 96px
          const element = newArrivalsRef.current;
          if (element) {
            const y =
              element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
      />

      {/* 👇 attach ref to New Arrivals section */}
      <div ref={newArrivalsRef}>
        <HomeSlide title={"New Arrivals"} products={products} />
      </div>

      <HomeCard />
      <WearsSlides />
      <HomeReview />
      <GoinBlue />
      <HomeRatings />
    </HomeContainer>
  );
};

export default Home;
