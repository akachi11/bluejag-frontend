import React, { useEffect, useRef, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { RiShoppingBag4Fill, RiShoppingBag4Line } from "react-icons/ri";
import img from "../assets/Female/femaleHard.JPG";
import { themeColors } from "../Themes/themeColors";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useHomeContext } from "../context/HomeContext";
import { localHost, renderAPI } from "../constants";
import { PaystackButton } from "react-paystack";
import PayButton from "../components/PaystackButton";
import CartSkeleton from "../components/CartSkeleton";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartSelected, setCartSelected] = useState(0);
  const [showActionModal, setShowActionModal] = useState(false);
  const [isClearAction, setIsClearAction] = useState(false);
  const [activeProduct, setActiveProduct] = useState();
  const hasFetched = useRef(false);
  const {
    cart,
    removeProduct,
    updateqty,
    total,
    setCartDirectly,
    clearCart,
    applyDiscount,
  } = useCart();
  const { loggedIn } = useHomeContext();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showOtherAddresses, setShowOtherAddresses] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [discountCode, setDiscountCode] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [discountTotal, setDiscountTotal] = useState();

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const verifyDiscountCode = async () => {
    setVerifyingCode(true);
    try {
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/discount/validate/${discountCode}`,
        loggedIn ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setVerifyingCode(false);
      setCodeVerified(true);
      const discount = applyDiscount(res.data.discount);
      setDiscountTotal(discount);
      toast.success("Discount code applied");
    } catch (err) {
      setVerifyingCode(false);
      toast.error(err.response.data.message);
    }
  };

  const handleOrderSummary = async () => {
    try {
      setLoadingOrder(true);

      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/order/summary`,
        {
          cartItems: cart,
          shippingAddress: selectedAddress,
          discountCode: discountCode,
        },
        loggedIn ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );

      setOrderData(res.data.summary); // summary instead of actual order
      setShowOrderModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrder(false);
    }
  };

  const handleCreateOrder = async () => {
    try {
      setLoadingOrder(true);

      const endpoint = loggedIn ? "create" : "guest/create";

      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/order/${endpoint}`,
        {
          cartItems: cart,
          paymentMethod: "paystack",
          shippingAddress: selectedAddress,
          guestInfo: loggedIn
            ? undefined
            : { name: guestName, email: guestEmail, phone: guestPhone },
          discountCode: discountCode,
        },
        loggedIn ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );

      setOrderData(res.data.order);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrder(false);
    }
  };

  const getUserCart = async () => {
    const response = await axios.get(
      `${
        location.origin.includes("localhost") ? localHost : renderAPI
      }/api/cart/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setLoadingCart(false);
    setCartDirectly(response.data.items);
  };

  const getAddresses = async (e) => {
    try {
      const response = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/user/addresses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddresses(response.data);
      return response.data; // array of addresses
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    }
  };

  useEffect(() => {
    if (loggedIn && !hasFetched.current) {
      setLoadingCart(true);
      hasFetched.current = true;
      getUserCart();
    }
  }, [loggedIn]);

  useEffect(() => {
    const mainAddress = addresses.find((addr) => addr.isDefault === true);
    setSelectedAddress(mainAddress);
  }, [addresses]);

  useEffect(() => {
    if (showOrderModal && addresses.length < 1) {
      getAddresses();
    }
  }, [showOrderModal]);

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
        loadingCart ? (
          <CartSkeleton />
        ) : cart?.length > 0 ? (
          <div className="pb-12">
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
                    className="text-xs text-red-700 montserrat cursor-pointer font-semibold underline"
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

            {/* <div className="mt-8 bg-gray-800 p-4">
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
            </div> */}

            <div className="px-4 mt-8">
              <p className="font-bold montserrat text-sm">DISCOUNT CODE</p>

              <div className="flex items-center justify-between mt-4">
                <input
                  className={`${
                    codeVerified ? "text-gray-400" : ""
                  } border border-gray-300 text-xs rounded-3xl px-4 py-2`}
                  type="text"
                  onChange={(e) => {
                    setDiscountCode(e.target.value);
                  }}
                  value={discountCode}
                  disabled={codeVerified}
                  placeholder="Enter code"
                />
                <div className="flex flex-row items-center gap-2">
                  <button
                    onClick={verifyDiscountCode}
                    disabled={
                      verifyingCode || codeVerified || discountCode?.length < 6
                    }
                    className={`${
                      verifyingCode || codeVerified || discountCode?.length < 6
                        ? "bg-gray-500"
                        : ""
                    } bg-blue-800 text-xs text-white font-bold px-4 py-2 rounded-3xl montserrat cursor-pointer`}
                  >
                    {verifyingCode
                      ? "APPLYING"
                      : codeVerified
                      ? "APPLIED"
                      : "APPLY"}
                  </button>

                  {codeVerified && (
                    <button
                      onClick={() => {
                        setCodeVerified(false);
                        setDiscountCode("");
                        setDiscountTotal(0);
                      }}
                      className={
                        "bg-red-400 text-xs text-white font-bold px-4 py-2 rounded-3xl montserrat cursor-pointer"
                      }
                    >
                      REMOVE
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 mt-8">
              <div className="flex flex-col gap-2">
                <div className="mt-4 flex items-center justify-between text-xs">
                  <p className="font-semibold text-lg">Sub Total</p>
                  <p className="font-semibold text-lg">
                    {(codeVerified ? discountTotal : total).toLocaleString(
                      "en-NG",
                      {
                        style: "currency",
                        currency: "NGN",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-[300px] m-auto mt-8">
              <button
                onClick={handleOrderSummary}
                disabled={loadingOrder}
                className={`bg-blue-800 montserrat cursor-pointer w-full text-center text-white font-bold py-2 rounded-3xl ${
                  loadingOrder ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loadingOrder ? "Creating Order..." : "CHECKOUT SECURELY"}
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

      {showOrderModal && orderData && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-[#1e293b] text-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-[#f8fafc] tracking-wide">
              Order Summary
            </h3>

            {/* Order Items */}
            <div className="mt-2">
              <p className="font-semibold mb-3 text-gray-100 text-sm">Items</p>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {orderData.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border-b border-[#1e293b] pb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md border border-[#1e293b]"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-200">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.size} • {item.color}
                      </p>
                      <p className="text-xs text-gray-300">
                        ₦{item.price.toLocaleString()} × {item.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🧾 Total Section */}
            {/* 🧾 Total Section */}
            <div className="mt-6 border-t border-[#1e293b] pt-4">
              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-400">Subtotal</p>
                <p className="text-gray-100 font-medium">
                  ₦{orderData.subTotal?.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm mt-1">
                <p className="text-gray-400">Tax</p>
                <p className="text-gray-100 font-medium">
                  ₦{orderData.tax?.toLocaleString()}
                </p>
              </div>

              {/* If discount applied */}
              {orderData.discountAmount > 0 && (
                <>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <p className="text-gray-400">
                      Discount{" "}
                      {orderData.discountCode && (
                        <span className="text-xs text-green-400 ml-1">
                          ({orderData.discountCode.toUpperCase()})
                        </span>
                      )}
                    </p>
                    <p className="text-green-400 font-medium">
                      -₦{orderData.discountAmount.toLocaleString()}
                    </p>
                  </div>

                  {/* Original Total (slashed) */}
                  <div className="flex items-center justify-between text-sm mt-2">
                    <p className="text-gray-400">Original Total</p>
                    <p className="text-gray-500 line-through font-medium">
                      ₦
                      {(
                        orderData.total + orderData.discountAmount
                      ).toLocaleString()}
                    </p>
                  </div>
                </>
              )}

              {/* Final Total */}
              <div className="flex items-center justify-between mt-2 border-t border-[#1e293b] pt-2">
                <p className="text-gray-100 font-semibold">Total</p>
                <p className="text-[#22c55e] font-bold text-lg">
                  ₦{orderData.total?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-6">
              {loggedIn ? (
                <>
                  {addresses.length > 0 && (
                    <div className="border border-[#1e293b] rounded-lg p-4 mb-2">
                      <p className="text-gray-100 font-semibold">
                        {addresses.find((a) => a.isDefault)?.firstName}{" "}
                        {addresses.find((a) => a.isDefault)?.lastName}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {addresses.find((a) => a.isDefault)?.line1}
                      </p>
                      {addresses.find((a) => a.isDefault)?.line2 && (
                        <p className="text-gray-400 text-sm">
                          {addresses.find((a) => a.isDefault)?.line2}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm">
                        {addresses.find((a) => a.isDefault)?.city},{" "}
                        {addresses.find((a) => a.isDefault)?.state}{" "}
                        {addresses.find((a) => a.isDefault)?.postalCode}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {addresses.find((a) => a.isDefault)?.phone}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 mb-2">
                    {addresses.length > 1 && (
                      <button
                        className="text-sm underline text-blue-400"
                        onClick={() =>
                          setShowOtherAddresses(!showOtherAddresses)
                        }
                      >
                        Change Address
                      </button>
                    )}
                    <button
                      className="text-sm underline text-blue-400"
                      onClick={() => navigate("/addresses")}
                    >
                      Add Address
                    </button>
                  </div>

                  {showOtherAddresses && (
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {addresses
                        .filter((a) => !a.isDefault)
                        .map((addr) => (
                          <button
                            key={addr.id}
                            className={`w-full text-left p-2 rounded-lg border ${
                              selectedAddress?.id === addr.id
                                ? "border-blue-500"
                                : "border-[#1e293b]"
                            }`}
                            onClick={() => setSelectedAddress(addr)}
                          >
                            {addr.firstName} {addr.lastName}, {addr.line1}{" "}
                            {addr.line2}, {addr.city}, {addr.state},{" "}
                            {addr.postalCode}
                          </button>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="border-2 border-[#1e293b] p-4 rounded-lg">
                  <p className="text-gray-100 font-semibold mb-2 text-sm">
                    Enter your address
                  </p>
                  {addNew && <NewAddressForm />}
                </div>
              )}
            </div>

            {/* Paystack + Close */}
            <div className="flex justify-between items-center mt-6">
              <PayButton
                email={"ogogorchimadika@gmail.com"}
                amount={orderData.total * 100}
                metadata={{ name }}
                disabled={!selectedAddress}
                publicKey={publicKey}
                createOrder={handleCreateOrder}
              />
              <button
                className="px-5 py-2.5 bg-[#1e293b] hover:bg-[#334155] rounded-lg text-sm font-semibold transition-all duration-300 text-gray-100 shadow-md hover:shadow-lg"
                onClick={() => {
                  setShowOrderModal(false);
                  setOrderData(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
