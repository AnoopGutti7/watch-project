// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import Home from "./pages/Home/Home";
import Watches from "./pages/Watches/Watches";
import Brand from "./pages/Brand/Brand";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import VerifyPaymentPage from "../VerifyPaymentPage";

/* ScrollToTopOnRouteChange */
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent horizontal scrolling
  useEffect(() => {
    const prevOverflowX = document.documentElement.style.overflowX;
    const prevBodyMargin = document.body.style.margin;

    document.documentElement.style.overflowX = "hidden";
    document.body.style.margin = "0";

    return () => {
      document.documentElement.style.overflowX = prevOverflowX || "";
      document.body.style.margin = prevBodyMargin || "";
    };
  }, []);

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <div className="min-h-screen w-screen overflow-x-hidden antialiased">
      <ScrollToTopOnRouteChange />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/watches" element={<Watches />} />

        <Route
          path="/brands/:brandName"
          element={<Brand />}
        />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        {/* Cart without login protection */}
        <Route path="/cart" element={<Cart />} />

        {/* Orders page */}
        <Route path="/my-orders" element={<Orders />} />

        {/* Payment pages */}
        <Route
          path="/orders/success"
          element={<VerifyPaymentPage />}
        />

        <Route
          path="/orders/cancel"
          element={<VerifyPaymentPage />}
        />
      </Routes>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-6 bottom-6 z-50 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300
          ${
            showButton
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-6 pointer-events-none"
          }
          bg-gray-400 text-white hover:bg-amber-700`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}