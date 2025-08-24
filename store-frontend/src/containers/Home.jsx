import { useEffect, useState } from "react";
import { HomeContainer } from "../Styles/ComponentStyles";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import { useHomeContext } from "../context/HomeContext";
import HomeCard from "../components/HomeCard";
import WearsSlides from "../components/WearsSlides";
import Announcement from "../components/Announcement";
import HomeReview from "../components/HomeReview";
import HomeSlide from "../components/NewArrivals";
import HomeReview2 from "../components/HomeReview2";
import GoinBlue from "../components/GoinBlue";
import HomeRatings from "../components/HomeRatings";

const Home = () => {

  return (
    <HomeContainer>
        <HeroSection />
        <HomeSlide title={"New Arrivals"} />
        <HomeCard />
        <WearsSlides />
        <HomeReview />
        <HomeSlide title={"Best Sellers"} />
        <HomeReview2 />
        <GoinBlue />
        <HomeRatings />
        <Footer />
    </HomeContainer>
  );
};

export default Home;
