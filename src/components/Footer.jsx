import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa";
import { Package, Mail, Phone, MapPin, ArrowRight, Search } from "lucide-react";
import logo from "../assets/head-01-01.png";

const Footer = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/bluejagco",
      label: "Instagram",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@bluejag3",
      label: "TikTok",
    },
    {
      icon: FaSnapchat,
      href: "https://snapchat.com/t/eg0YAIau",
      label: "Snapchat",
    },
  ];

  const shopLinks = [
    { label: "Men", href: "/category/men" },
    { label: "Women", href: "/category/women" },
    { label: "New Arrivals", href: "/category/new" },
    { label: "Limited Edition", href: "/category/limited" },
  ];

  const supportLinks = [
    { label: "Track Order", href: "/track" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
  ];

  const handleTrackOrder = () => {
    if (trackingId.length >= 6) {
      navigate(`/order/${trackingId}`);
    }
  };

  return (
    <footer className="bg-[#070a10] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Bluejag"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold tracking-tight">BLUEJAG</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Premium athletic wear for those who take their training seriously.
              Built for performance, designed for style.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Track Order */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Track Your Order
            </h4>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking ID"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Package
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
              <button
                onClick={handleTrackOrder}
                disabled={trackingId.length < 6}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  trackingId.length >= 6
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Search size={16} />
                Find Order
              </button>
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:bluejagltd@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Mail size={14} />
                bluejagltd@gmail.com
              </a>
              <a
                href="tel:+2349151658995"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} />
                09151658995
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Bluejag, Inc. All Rights Reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link
                to="/terms"
                className="text-slate-500 hover:text-white text-xs md:text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-slate-500 hover:text-white text-xs md:text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <button className="text-slate-500 hover:text-white text-xs md:text-sm transition-colors">
                Do Not Sell My Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
