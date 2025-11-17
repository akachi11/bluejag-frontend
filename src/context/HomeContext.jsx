import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeContext = createContext();

const useHomeContext = () => useContext(HomeContext);

const HomeProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const toggleSideBar = (state) => {
    setSideBarOpen(state ?? !sideBarOpen);
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("bj_userData");
    navigate("/");
  };

  const toggleCart = (state) => {
    setIsCartOpen(state ?? !isCartOpen);
  };

  const contextValue = {
    sideBarOpen,
    toggleSideBar,
    isCartOpen,
    toggleCart,
    loggedIn,
    setLoggedIn,
    logOut,
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export { HomeProvider, useHomeContext };
