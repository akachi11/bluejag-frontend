import React, { useEffect, useRef, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { RiShoppingBag4Fill, RiShoppingBag4Line } from "react-icons/ri";
import img from "../assets/Female/Red-core-twoPc.JPG";
import { themeColors } from "../Themes/themeColors";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useHomeContext } from "../context/HomeContext";
import { localHost, renderAPI } from "../constants";

const Cart = () => {
  const [cartSelected, setCartSelected] = useState(0);
  const [showActionModal, setShowActionModal] = useState(false);
  const [isClearAction, setIsClearAction] = useState(false);
  const [activeProduct, setActiveProduct] = useState();
  const hasFetched = useRef(false);
  const { cart, removeProduct, updateqty, total, setCartDirectly, clearCart } =
    useCart();
  const { loggedIn } = useHomeContext();

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  const getUserCart = async () => {
    const response = await axios.get(
      `${
        location.origin.includes("localhost") ? localHost : renderAPI
      }/api/cart/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCartDirectly(response.data.items);
  };

  useEffect(() => {
    if (loggedIn && !hasFetched.current) {
      hasFetched.current = true;
      getUserCart();
    }
  }, [loggedIn]);

  return (
    <div className="mt-10 max-w-[600px] m-auto pb-16 h-full">
      <div className="flex justify-center bg-gray-800 w-fit m-auto rounded-3xl">
        <div
          onClick={() => {
            setCartSelected(0);
          }}
          className={`px-4 py-2 ${
            cartSelected === 0 ? "bg-blue-900 text-white" : ""
          }  rounded-2xl cursor-pointer`}
        >
          {cartSelected === 0 ? <RiShoppingBag4Fill /> : <RiShoppingBag4Line />}
        </div>

        <div
          onClick={() => {
            setCartSelected(1);
          }}
          className={`px-4 py-2 ${
            cartSelected === 1 ? "bg-blue-900 text-white" : ""
          }  rounded-2xl cursor-pointer`}
        >
          {cartSelected === 1 ? (
            <MdOutlineFavorite />
          ) : (
            <MdOutlineFavoriteBorder />
          )}
        </div>
      </div>
      <p className="font-bold mt-4 text-center montserrat uppercase">
        {cartSelected === 0 ? "Your bag" : "Your wishlist"}
      </p>

      {cartSelected === 0 ? (
        cart?.length > 0 ? (
          <div>
            <p
              className="text-right text-red-400 px-4 underline text-sm mt-4 cursor-pointer"
              onClick={() => {
                setIsClearAction(true);
                setShowActionModal(true);
              }}
            >
              Clear cart
            </p>
            <div className="px-4 flex items-center gap-1 text-sm">
              <p>Delivery & Shipping Information</p>
              <div className="cursor-pointer">
                <IoIosInformationCircleOutline />
              </div>
            </div>

            <div className="flex items-start gap-1 mt-4 bg-blue-950 p-4">
              <div className="text-xl p-1">
                <IoIosInformationCircleOutline />
              </div>
              <p className="text-xs">
                <strong>Your items are not reserved.</strong> Order quicky to
                make sure you don't lose them.
              </p>
            </div>

            {cart?.map((item, i) => (
              <div className="px-4 flex gap-4 mt-8">
                <img
                  src={item.image}
                  className="w-25 h-32 object-contain"
                  alt=""
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="bg-blue-500 p-1 rounded-sm text-xs font-semibold montserrat">
                      New
                    </p>
                    <div className="cursor-pointer">
                      <MdOutlineFavoriteBorder />
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.color} - {item.size}
                    </p>
                  </div>

                  <div className="flex justify-between items-center relative">
                    <p className="font-bold text-sm">
                      {item.price.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </p>
                    <div className="bg-blue-950 flex items-center gap-6 px-4 w-fit">
                      <p
                        className={`text-2xl ${
                          item.qty === 1
                            ? "text-gray-500 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          item.qty > 1 &&
                            updateqty(
                              item.productId,
                              item.color,
                              item.size,
                              false,
                              true
                            );
                        }}
                      >
                        -
                      </p>
                      <span className="text-sm">{item.qty}</span>
                      <p
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          updateqty(
                            item.productId,
                            item.color,
                            item.size,
                            true,
                            false
                          );
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-xs text-red-700 montserrat cursor-pointer font-semibold"
                    onClick={() => {
                      setActiveProduct(item);
                      setShowActionModal(true);
                    }}
                  >
                    Remove from cart
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-gray-800 p-4">
              <p className="font-bold text-sm montserrat">ADD A LITTLE EXTRA</p>
              <p className="text-xs mt-2">
                Add one or more of these items to earn XP and get free delivery.
              </p>

              <div className="mt-4">
                <div className="overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory -mx-4 px-4">
                  <div className="flex gap-4">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div className="snap-center shrink-0 w-[80%] bg-gray-900 p-3 rounded-lg shadow flex gap-2">
                        <img
                          src={img}
                          alt="extra-1"
                          className="w-20 h-28 object-contain rounded"
                        />
                        <div className="flex-1 flex justify-between">
                          <div className="w-full flex flex-col gap-4">
                            <p className="bg-blue-500 p-1 rounded-sm text-xs font-semibold w-fit montserrat">
                              New
                            </p>

                            <div className="mt-2 flex justify-between">
                              <div>
                                <p className="text-xs">Lever Lifting Belt</p>
                                <p className="font-semibold montserrat">$200</p>
                              </div>
                              <p className="cursor-pointer font-semibold text-xs montserrat">
                                + ADD
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="shrink-0 w-8" />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mt-8">
              <p className="font-bold montserrat text-sm">DISCOUNT CODE</p>

              <div className="flex items-center justify-between mt-4">
                <input
                  className="border border-gray-300 text-xs rounded-3xl px-4 py-2"
                  type="text"
                  placeholder="Enter code"
                />
                <button
                  className={`bg-blue-800 text-xs text-white font-bold px-4 py-2 rounded-3xl montserrat cursor-pointer`}
                >
                  APPLY
                </button>
              </div>
            </div>

            <div className="px-4 mt-8">
              <p className="font-bold montserrat text-sm">ORDER SUMMARY</p>

              <div className="flex flex-col gap-2">
                <div className="mt-4 flex items-center justify-between text-xs">
                  <p>Sub Total</p>
                  <p>
                    {total.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <p>Estimated delivery</p>
                  <p>$3.00</p>
                </div>

                <div className="flex items-center justify-between montserrat text-sm">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">$58.00</p>
                </div>
              </div>
            </div>

            <div className="max-w-[300px] m-auto mt-8">
              <button
                className={`bg-blue-800 montserrat cursor-pointer w-full text-center text-white font-bold py-2 rounded-3xl`}
              >
                CHECKOUT SECURELY
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="montserrat font-bold">YOUR BAG IS EMPTY</p>
            <p className="mt-2">You have not added any items to your bag</p>

            <button
              className={`mt-4 rounded-3xl bg-blue-900 text-white montserrat font-bold px-4 py-2`}
            >
              SHOP NOW
            </button>
          </div>
        )
      ) : (
        <div>
          {Array.from({ length: 3 }, (_, i) => (
            <div className="px-4 flex gap-4 mt-8">
              <img src={img} className="w-25 h-32 object-contain" alt="" />

              <div className="flex-1">
                <div className="mt-2">
                  <p className="">Cosy Luxe Straight Leg Joggers</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">$58.99</p>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className={`mt-4 rounded-3xl bg-[${themeColors.mainBlue}] text-white montserrat font-bold px-4 py-2 text-xs`}
                  >
                    ADD TO CART
                  </button>

                  <div className="cursor-pointer">
                    <Trash2 color={themeColors.lastCallRed} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showActionModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 text-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm animate-fadeIn">
            <h3 className="text-lg font-semibold mb-3">
              {isClearAction
                ? `Clear ${cartSelected === 0 ? "Cart" : "Favorites"}`
                : "Remove item"}{" "}
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              Are you sure you want to{" "}
              {isClearAction
                ? `clear your ${cartSelected === 0 ? "cart" : "wishlist"}`
                : "remove this item"}
            </p>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm transition-colors"
                onClick={() => {
                  setShowActionModal(false);
                  setIsClearAction(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setIsClearAction(false);
                  isClearAction
                    ? cartSelected === 0
                      ? clearCart()
                      : console.log("clear wishlist")
                    : cartSelected === 0
                    ? removeProduct(
                        activeProduct.productId,
                        activeProduct.color,
                        activeProduct.size
                      )
                    : console.log("remove");
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
