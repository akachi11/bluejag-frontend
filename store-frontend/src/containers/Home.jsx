import { useEffect, useState } from "react";
import { HomeContainer } from "../Styles/ComponentStyles";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";
import { useHomeContext } from "../context/HomeContext";
import HomeCard from "../components/HomeCard";
import WearsSlides from "../components/WearsSlides";
import Announcement from "../components/Announcement";

const Home = () => {

  return (
    <HomeContainer>
      <Announcement />
      <Navbar />
        <HeroSection />
        <NewArrivals />
        <HomeCard />
        <WearsSlides />
        <Footer />
    </HomeContainer>
  );
};

export default Home;
