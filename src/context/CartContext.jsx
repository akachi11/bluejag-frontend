import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHomeContext } from "./HomeContext";
import { localHost, renderAPI } from "../constants";
import { toast } from "react-toastify";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bj_cart")) || [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const { loggedIn } = useHomeContext();
  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  useEffect(() => {
    localStorage.setItem("bj_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setFavIds(() => favorites.map((fav) => fav.productId));
  }, [favorites]);

  const addProduct = async (product) => {
    setCart((prev) => [...prev, product]);

    if (loggedIn) {
      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/cart/`,
        product,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  const removeProduct = async (id, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === id && item.color === color && item.size === size)
      )
    );

    if (loggedIn) {
      const res = await axios.delete(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }api/cart/item`,
        {
          data: {
            productId: id,
            color: color,
            size: size,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  const updateqty = async (id, color, size, add = false, subtract = false) => {
    const item = cart?.find((it) => it.productId === id);

    if (loggedIn) {
      const res = await axios.patch(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/cart/item`,
        {
          productId: id,
          color: color,
          size: size,
          qty: add ? item?.qty + 1 : item?.qty - 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId !== id || item.color !== color || item.size !== size)
          return item;

        const current = item.qty || 1;
        let next = current;

        if (add) next = current + 1;
        if (subtract) next = Math.max(1, current - 1);

        return { ...item, qty: next };
      })
    );
  };

  const setCartDirectly = (newCart) => {
    localStorage.setItem("bj_cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem("bj_cart");

    if (loggedIn) {
      const res = await axios.delete(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/cart/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  const favoriteItem = async ({ name, price, thumbnail, _id }) => {
    setFavorites((prev) => [
      ...prev,
      { name, price, thumbnail, productId: _id },
    ]);
    try {
      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/favorite/`,
        { productId: _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Added to favorites");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchFavorites = async (itemId) => {
    const res = await axios.get(
      `${
        location.origin.includes("localhost") ? localHost : renderAPI
      }/api/favorite/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const cleanedFavorites = res.data.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      thumbnail: item.thumbnail,
    }));
    setFavorites(cleanedFavorites);
  };

  const removeFavorites = async (itemId) => {
    setFavorites((prev) => prev.filter((item) => item.productId !== itemId));
    try {
      const res = await axios.delete(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/favorite/`,
        {
          data: { productId: itemId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.info("Removed favorites");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const clearFavorites = async (itemId) => {
    setFavorites([]);
    try {
      const res = await axios.delete(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/favorite/clear`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info("Wishlist cleared");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // --- Derived total ---
  const total = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0)
    : 0;

  const applyDiscount = (discount) => {
    if (!discount || !discount.discountPercent) return total;

    const discountPercent = discount.discountPercent;
    const discountedTotal = total - Math.round((total * discountPercent) / 100);

    return discountedTotal;
  };
  const value = {
    cart,
    total,
    addProduct,
    removeProduct,
    updateqty,
    setCartDirectly,
    clearCart,
    applyDiscount,
    favoriteItem,
    fetchFavorites,
    removeFavorites,
    clearFavorites,
    favorites,
    favIds,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
