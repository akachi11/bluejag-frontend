import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("bj_userData"));
  } catch {
    return null;
  }
};

export const clearStoredUser = () => {
  localStorage.removeItem("bj_userData");
};

export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp && decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const stars = (ratingVal) => {
  const fullStars = Math.floor(ratingVal);
  const hasHalfStar = ratingVal % 1 !== 0;
  const emptyStars = 5 - Math.ceil(ratingVal);
  return [
    ...Array(fullStars).fill(<FaStar key={`full-${fullStars}`} />),
    ...(hasHalfStar ? [<FaStarHalfAlt key="half" />] : []),
    ...Array(emptyStars).fill(<FaRegStar key={`empty-${emptyStars}`} />),
  ];
};

export const clickedComingSoon = () => {
  toast.info("Coming soon");
};
