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

  // Two cart entries are "the same line item" only if they match on all
  // three: productId, size, and color. This matters especially now that
  // multiple colorways of a style can share the same product name but have
  // different productIds — matching by name would wrongly merge a black pair
  // and a burgundy pair into one line.
  const sameCartIdentity = (a, b) =>
    String(a.productId) === String(b.productId) &&
    (a.size || "") === (b.size || "") &&
    (a.color || "").toLowerCase() === (b.color || "").toLowerCase();

  const addProduct = async (product) => {
    const qtyToAdd = Number(product.qty) || 1;

    if (loggedIn) {
      try {
        const res = await axios.post(
          `${
            location.origin.includes("localhost") ? localHost : renderAPI
          }/api/cart/`,
          { ...product, qty: qtyToAdd },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        // The backend already merges a duplicate productId+size+color line
        // into the existing one (incrementing qty) rather than creating a
        // second line item. Mirror that response exactly instead of
        // re-deriving it locally, so the client never drifts out of sync
        // with the source of truth.
        if (res.data?.items) {
          setCart(res.data.items);
        }
      } catch (err) {
        console.error("❌ addProduct error:", err);
        toast.error("Failed to add to cart");
      }
      return;
    }

    // Guests: the cart only ever lives in localStorage, so merge duplicate
    // lines ourselves the same way the backend does for logged-in users.
    setCart((prev) => {
      const existingIdx = prev.findIndex((it) => sameCartIdentity(it, product));
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          qty: (Number(next[existingIdx].qty) || 1) + qtyToAdd,
          price: product.price,
          name: product.name,
          image: product.image,
        };
        return next;
      }
      return [...prev, { ...product, qty: qtyToAdd }];
    });
  };

  const removeProduct = async (id, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === id &&
            item.color === color &&
            item.size === size
          ),
      ),
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
        },
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
        },
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
      }),
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
        },
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
        },
      );
      toast.success("Added to favorites");
    } catch (error) {
      toast.error("Something went wrong");
    }
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
        },
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
        { headers: { Authorization: `Bearer ${token}` } },
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
    removeFavorites,
    clearFavorites,
    setFavorites,
    favorites,
    favIds,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
