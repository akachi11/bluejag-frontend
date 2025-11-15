import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
// ...existing code...

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const contextValue = {};

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
