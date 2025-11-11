import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
// ...existing code...

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bj_cart")) || [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bj_favorites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("bj_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("bj_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addProduct = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) =>
          p._id === product._id &&
          p.color === product.color &&
          p.size === product.size
      );

      if (exists) {
        return prev.map((p) =>
          p._id === product._id &&
          p.color === product.color &&
          p.size === product.size
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }

      const item = { ...product, quantity: product.quantity || 1 };
      return [item, ...prev];
    });
  };

  const removeProduct = (id, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item._id === id && item.color === color && item.size === size)
      )
    );
  };

  const updateQuantity = (id, color, size, add = false, subtract = false) => {
    setCart((prev) =>
      prev.map((item) => {
        // Match product, color, and size
        if (item._id !== id || item.color !== color || item.size !== size)
          return item;

        const current = item.quantity || 1;
        let next = current;

        if (add) next = current + 1;
        if (subtract) next = Math.max(1, current - 1);

        return { ...item, quantity: next };
      })
    );
  };

  // Directly set quantity (useful for inputs)
  const setQuantity = (id, quantity) => {
    const q = Math.max(1, Math.floor(Number(quantity) || 1));
    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity: q } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Favorites handling (toggle or explicit add/remove)
  const addFavorite = (product) => {
    setFavorites((prev) => {
      if (prev.find((p) => p._id === product._id)) return prev;
      return [product, ...prev];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p._id !== id));
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) =>
      prev.find((p) => p._id === product._id)
        ? prev.filter((p) => p._id !== product._id)
        : [product, ...prev]
    );
  };

  // Helpers
  const getCartCount = () =>
    cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const getCartTotal = () =>
    cart.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

  const contextValue = {
    cart,
    favorites,
    addProduct,
    removeProduct,
    updateQuantity,
    setQuantity,
    clearCart,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    getCartCount,
    getCartTotal,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
