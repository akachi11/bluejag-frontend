import React, { useRef, useState } from "react";
import {
  HiOutlineMenuAlt4,
  HiOutlineShoppingCart,
  HiOutlineSearch,
} from "react-icons/hi";
import {
  DesktopMenu,
  LogoText,
  MenuIcon,
  NavbarBox,
  NavbarContainer,
  NavbarMenu,
  NavbarMobileRight,
} from "../Styles/NavbarStyles";
import { Paragraph } from "../Styles/FooterStyles";
import logo from "../assets/logo.png";
import { useHomeContext } from "../context/HomeContext";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  HeartIcon,
  SearchIcon,
  ShoppingCartIcon,
  TrendingUp,
  User2Icon,
  XIcon,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import noResultImg from "../assets/no-results.png";
import axios from "axios";
import { localHost, renderAPI } from "../constants";
import { useEffect } from "react";
import { p } from "framer-motion/client";
import { ProductsSkeleton, SuggestionsSkeleton } from "./SearchSkeletons";
import { clickedComingSoon } from "../utils";

const Navbar = () => {
  const iconStyle = {
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const { sideBarOpen, toggleSideBar, loggedIn, toggleCart } = useHomeContext();
  const { cart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchInputRef = useRef();
  const [autocomplete, setAutocomplete] = useState({
    suggestions: [],
    products: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  const openSideBar = () => {
    toggleSideBar();
  };

  const fetchTrendingSearches = async () => {
    try {
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/search/trending`
      );

      setTrendingSearches(() => res.data.map((item) => item.query));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentSearches = async () => {
    try {
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/search/recent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecentSearches(() => res.data.map((item) => item.query));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    setLoadingSearchResults(true);
    setLoadingAutoComplete(false);
    setSearched(true);
    setSearchQuery(query);
    try {
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/search/`,
        {
          params: { q: query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setSearchResults(res.data.results);
      setLoadingSearchResults(false);
    } catch (error) {
      setLoadingSearchResults(false);
      setSearchResults([]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchQuery || searched) {
      return;
    }

    setSearched(false);

    const debounce = setTimeout(async () => {
      setLoadingAutoComplete(true);
      try {
        const res = await axios.get(
          `${
            location.origin.includes("localhost") ? localHost : renderAPI
          }/api/search/autocomplete`,
          {
            params: { q: searchQuery },
          }
        );
        setAutocomplete(res.data);
        setLoadingAutoComplete(false);
      } catch (err) {
        setLoadingAutoComplete(false);
        console.error("Search fetch failed", err);
        setAutocomplete({ suggestions: [], products: [] });
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    if (searchOverlayOpen) {
      fetchTrendingSearches();
      loggedIn && fetchRecentSearches();
      searchInputRef.current.focus();
    }
  }, [searchOverlayOpen]);

  return (
    <div>
      <NavbarContainer className="z-20">
        <NavbarBox>
          <NavbarMenu>
            <div className="flex flex-row items-center gap-6">
              <MenuIcon onClick={openSideBar}>
                {sideBarOpen ? (
                  <IoClose style={iconStyle} />
                ) : (
                  <HiOutlineMenuAlt4 style={iconStyle} />
                )}
              </MenuIcon>

              <div
                onClick={() => {
                  setSearchOverlayOpen(true);
                }}
                className="lg:hidden"
              >
                <SearchIcon />
              </div>
            </div>
            <div className="gap-6 hidden lg:flex xl:gap-8">
              <Paragraph
                onClick={() => {
                  navigate("/category/men");
                }}
              >
                MEN
              </Paragraph>
              <Paragraph
                onClick={() => {
                  navigate("/category/women");
                }}
              >
                WOMEN
              </Paragraph>
              <Paragraph onClick={clickedComingSoon} className="text-zinc-500">
                PRE ORDER
              </Paragraph>
              <Paragraph
                onClick={clickedComingSoon}
                className="text-zinc-500 font-semibold"
              >
                LAST CALL
              </Paragraph>
            </div>
          </NavbarMenu>
          <LogoText
            onClick={() => {
              navigate("/");
            }}
            src={logo}
          />
          <NavbarMobileRight className="relative flex items-center gap-4">
            <div className="hidden flex-1 gap-4 lg:flex items-center bg-gray-500 px-4 py-2 rounded-2xl">
              <SearchIcon size={15} />
              <input
                placeholder="Search"
                type="text"
                className="flex-1 text-xs focus:outline-none cursor-pointer"
                onClick={() => {
                  setSearchOverlayOpen(true);
                }}
              />
            </div>
            {loggedIn ? (
              <div
                onClick={() => navigate("/account")}
                className="cursor-pointer hover:text-blue-400 transition-colors"
              >
                <User2Icon />
              </div>
            ) : (
              <>
                <p
                  onClick={() => navigate("/signin")}
                  className="hidden cursor-pointer hover:text-blue-400 transition-colors md:block"
                >
                  LOG IN
                </p>
                <div className="md:hidden" onClick={() => navigate("/signin")}>
                  <User2Icon />
                </div>
              </>
            )}

            <div
              className="relative cursor-pointer hover:text-blue-400"
              onClick={toggleCart}
            >
              <HiOutlineShoppingCart style={iconStyle} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </NavbarMobileRight>
        </NavbarBox>
      </NavbarContainer>

      {searchOverlayOpen && (
        <>
          {/* Black transparent overlay - only visible on lg screens */}
          <div
            className="hidden lg:block fixed inset-0 z-20 bg-black/50 animate-fadeIn"
            onClick={() => setSearchOverlayOpen(false)}
          />

          {/* Main search container */}
          <div className="fixed h-screen lg:h-[60vh] top-0 w-screen z-30 bg-gray-800 p-6 overflow-y-scroll animate-slideDown">
            <div className="flex items-center gap-4 lg:w-[40vw] pb-4 m-auto border-b-2 border-gray-700">
              <div
                onClick={() => {
                  setSearchOverlayOpen(false);
                }}
              >
                <ChevronLeft />
              </div>
              <div className="flex-1 gap-4 flex items-center bg-gray-500 px-4 py-2 rounded-2xl">
                <SearchIcon />
                <input
                  placeholder="What are you looking for"
                  type="text"
                  ref={searchInputRef}
                  className="flex-1 focus:outline-none bg-transparent text-white"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearched(false);
                  }}
                />
                <div
                  onClick={() => {
                    setSearchQuery("");
                  }}
                  className={`${searchQuery.length > 0 ? "" : "hidden"}`}
                >
                  <XIcon />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row mt-8 lg:mx-50">
              {searchQuery.length > 0 ? (
                <>
                  {!searched && (
                    <div className="flex flex-col gap-4 lg:flex-1 min-w-0">
                      <p className="montserrat font-semibold border-b-2 border-gray-700">
                        SUGGESTIONS
                      </p>

                      {loadingAutoComplete ? (
                        <SuggestionsSkeleton />
                      ) : autocomplete.suggestions.length > 0 ? (
                        <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-4">
                          {autocomplete.suggestions.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex gap-2 items-center lg:gap-1"
                              onClick={() => {
                                handleSearch(item);
                              }}
                            >
                              <SearchIcon size={15} />
                              <p>{item}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="italic">Try typing something else</p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col gap-8 lg:flex-3 min-w-0">
                    <div>
                      <p className="montserrat font-semibold border-b-2 border-gray-700">
                        PRODUCTS
                      </p>

                      {loadingAutoComplete || loadingSearchResults ? (
                        <ProductsSkeleton />
                      ) : (searched ? searchResults : autocomplete.products)
                          .length > 0 ? (
                        <>
                          <div className="grid gap-y-8 grid-cols-2 gap-2 mt-4 lg:grid-cols-4 lg:gap-4 border-b-2 border-gray-700 pb-4">
                            {(searched
                              ? searchResults
                              : autocomplete.products
                            ).map((item, idx) => (
                              <div key={idx} className="">
                                <div className="relative">
                                  <img
                                    src={item.thumbnail}
                                    alt=""
                                    className="w-full h-auto object-cover"
                                  />
                                  <HeartIcon
                                    size={35}
                                    className="absolute top-2 right-2 text-white bg-[rgba(0,0,0,0.38)] rounded-full p-2 cursor-pointer"
                                  />
                                </div>

                                <div className="montserrat mt-4 flex flex-col gap-1">
                                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {item.name}
                                  </p>
                                  <p className="font-semibold">
                                    {" "}
                                    {item.price.toLocaleString("en-NG", {
                                      style: "currency",
                                      currency: "NGN",
                                    })}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <p className="mt-12 text-right montserrat underline mb-8">
                            View All <strong>"{searchQuery}"</strong>
                          </p>
                        </>
                      ) : (
                        <img
                          src={noResultImg}
                          className="w-100 m-auto"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : searchQuery.length < 1 ? (
                <>
                  <div className="flex flex-col gap-8 lg:flex-1 min-w-0">
                    <div>
                      <p className="montserrat font-semibold">
                        TRENDING SEARCHES
                      </p>
                      <div className="flex items-center gap-2 overflow-x-auto mt-2 hide-scrollbar lg:flex-wrap">
                        <TrendingUp size={20} className="shrink-0" />
                        {trendingSearches.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-400 w-fit text-xs rounded-3xl px-2 py-1 text-black font-semibold uppercase montserrat whitespace-nowrap shrink-0"
                            onClick={() => {
                              handleSearch(item);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {loggedIn && (
                      <div>
                        <div className="flex justify-between items-center lg:gap-8 lg:justify-start">
                          <p className="montserrat font-semibold">
                            RECENT SEARCHES
                          </p>
                          {recentSearches.length > 0 && (
                            <p className="bg-red-300 w-fit text-xs rounded-3xl px-2 py-1 text-black font-semibold uppercase montserrat cursor-pointer">
                              Clear
                            </p>
                          )}
                        </div>

                        {recentSearches.length > 0 ? (
                          <div className="flex flex-col gap-2 mt-4 lg:flex-row lg:flex-wrap lg:gap-4">
                            {recentSearches.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex gap-2 items-center lg:gap-1"
                                onClick={() => {
                                  handleSearch(item);
                                }}
                              >
                                <SearchIcon size={15} />
                                <p>{item}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-4 italic text-zinc-400">
                            You have no recent searches
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* <div className="lg:flex-1 min-w-0">
                  <div className="flex justify-between items-center lg:justify-start lg:gap-8">
                    <p className="montserrat font-semibold">RECENTLY VIEWED</p>
                    <p className="bg-red-300 w-fit text-xs rounded-3xl px-2 py-1 text-black font-semibold uppercase montserrat cursor-pointer">
                      Clear
                    </p>
                  </div>

                  <div className="flex flex-row overflow-x-auto gap-2 mt-4 hide-scrollbar lg:flex-wrap">
                    {trendingSearches.map((item, idx) => (
                      <img
                        key={idx}
                        src="https://www.freepik.com/free-photos-vectors/clothes"
                        alt=""
                        className="w-15 h-18 shrink-0 object-cover"
                      />
                    ))}
                  </div>
                </div> */}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
