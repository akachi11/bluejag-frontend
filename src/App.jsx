import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./fonts/fonts.css";

import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import ProductPage from "./containers/ProductPage";
import CartDrawer from "./containers/CartDrawer";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";

import { useHomeContext } from "./context/HomeContext";
import { ToastContainer } from "react-toastify";
import { getStoredUser, isTokenValid } from "./utils";
import Sidebar from "./components/Sidebar";
import CategoryPage from "./containers/CategoryPage";
import TermsPage from "./containers/Terms";
import PrivacyPage from "./containers/Privacy";
import Profile from "./containers/Profile";
import Orders from "./containers/Orders";
import AddressBook from "./containers/AddressBook";
import OrderDetails from "./containers/OrderDetail";
import Loyalty from "./containers/Loyalty";
import FourZeroFour from "./containers/FourZeroFour";

function App() {
  const { isCartOpen, toggleCart, setLoggedIn, loggedIn, sideBarOpen } =
    useHomeContext();
  const location = useLocation();

  const authRoutes = ["/signin", "/signup"];
  const hideLayout = authRoutes.includes(location.pathname.toLowerCase());

  useEffect(() => {
    const user = getStoredUser();

    if (user?.token) {
      const valid = isTokenValid(user.token);

      if (valid) {
        setLoggedIn(true);
      } else {
        // Token expired — clear it and log out
        localStorage.removeItem("bj_userData");
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      {!hideLayout && (
        <>
          <Announcement />
          <Navbar />
        </>
      )}

      {sideBarOpen && <Sidebar />}

      <main className="grow">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/loyalty-overview" element={<Loyalty />} />
          <Route path="/addresses" element={<AddressBook />} />
          <Route path="/category/:cat" element={<CategoryPage />} />
          <Route path="/order/:oid" element={<OrderDetails />} />
          <Route path="/product/:pid" element={<ProductPage />} />

          {/* Redirect logged-in users away from auth pages */}
          <Route
            path="/signup"
            element={loggedIn ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={loggedIn ? <Navigate to="/" replace /> : <SignIn />}
          />

          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Optional: 404 route */}
          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </main>

      {/* Global Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => toggleCart(false)} />

      {/* Footer */}
      {!hideLayout && <Footer />}

      {/* <div className="bg-blue-500"></div> */}

      <ToastContainer />
    </div>
  );
}

export default App;
