import { createContext, useContext, useEffect, useState } from "react";

const HomeContext = createContext();

const useHomeContext = () => useContext(HomeContext);

const HomeProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState();

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const contextValue = {
    sideBarOpen,
    toggleSideBar,
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export { HomeProvider, useHomeContext };
