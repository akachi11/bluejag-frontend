import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import {
  FiPackage,
  FiTruck,
  FiRefreshCw,
  FiCreditCard,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiClock,
  FiMapPin,
  FiShield,
  FiHelpCircle,
} from "react-icons/fi";
import { IoShirtOutline } from "react-icons/io5";

const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("orders");

  const categories = [
    { id: "orders", label: "Orders & Shipping", icon: FiPackage },
    { id: "returns", label: "Returns & Exchanges", icon: FiRefreshCw },
    { id: "payments", label: "Payments", icon: FiCreditCard },
    { id: "sizing", label: "Sizing & Fit", icon: IoShirtOutline },
    { id: "account", label: "Account", icon: FiShield },
  ];

  const faqs = {
    orders: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery within Lagos takes 1-3 business days. Nationwide delivery takes 3-7 business days depending on your location. You'll receive a tracking number once your order ships.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive an email with your tracking number. You can also track your order by logging into your account and viewing your order history.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free shipping on all orders above ₦70,000. Orders below this amount have a flat shipping rate based on your location.",
      },
      {
        q: "Can I change my delivery address after placing an order?",
        a: "If your order hasn't shipped yet, contact us immediately and we'll update your address. Once shipped, address changes may not be possible.",
      },
    ],
    returns: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for unworn items with original tags attached. Items must be in their original condition and packaging.",
      },
      {
        q: "How do I initiate a return?",
        a: "Log into your account, go to your order history, select the item you want to return, and follow the prompts. You'll receive a return shipping label via email.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method.",
      },
      {
        q: "Can I exchange an item for a different size?",
        a: "Yes! Exchanges are free within 30 days. Simply initiate a return and select 'Exchange' as your reason. We'll ship your new size once we receive the original item.",
      },
    ],
    payments: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major debit/credit cards, bank transfers, and popular payment platforms including Paystack and Flutterwave.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. All transactions are encrypted using SSL technology. We never store your full card details on our servers.",
      },
      {
        q: "Can I pay on delivery?",
        a: "Pay on delivery is available for orders within Lagos only. A verification call will be made before dispatch.",
      },
      {
        q: "Why was my payment declined?",
        a: "Payments can be declined for various reasons including insufficient funds, incorrect card details, or bank restrictions. Please try again or use a different payment method.",
      },
    ],
    sizing: [
      {
        q: "How do I find my size?",
        a: "Check our size guide on each product page. We recommend measuring yourself and comparing with our size charts for the best fit.",
      },
      {
        q: "What if I'm between sizes?",
        a: "For compression wear, we recommend sizing down for maximum support. For relaxed fits like hoodies, size up for a looser feel.",
      },
      {
        q: "Do your sizes run true to size?",
        a: "Yes, our products are designed to fit true to size. Each product page includes the model's measurements and the size they're wearing for reference.",
      },
      {
        q: "Can I get custom sizing?",
        a: "Currently, we don't offer custom sizing. However, our range of sizes (XS-3XL) is designed to accommodate most body types.",
      },
    ],
    account: [
      {
        q: "How do I create an account?",
        a: "Click the account icon in the navigation bar and select 'Sign Up'. You can register with your email or social media accounts.",
      },
      {
        q: "I forgot my password. What do I do?",
        a: "Click 'Forgot Password' on the login page. Enter your email and we'll send you a link to reset your password.",
      },
      {
        q: "How do I update my account information?",
        a: "Log into your account, go to 'Account Settings', and you can update your personal information, addresses, and preferences.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes. Contact our support team with your request and we'll process your account deletion within 48 hours.",
      },
    ],
  };

  const contactMethods = [
    {
      icon: FiMessageCircle,
      title: "Live Chat",
      desc: "Chat with our team",
      action: "Start Chat",
      available: true,
    },
    {
      icon: FiMail,
      title: "Email",
      desc: "support@bluejag.com",
      action: "Send Email",
      available: true,
    },
    {
      icon: FiPhone,
      title: "Phone",
      desc: "+234 800 123 4567",
      action: "Call Now",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative px-4 md:px-8 lg:px-12 pt-12 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <FiHelpCircle className="text-blue-400" size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              How can we help?
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
              Find answers to common questions or get in touch with our support
              team.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FiTruck, label: "Track Order", link: "/orders" },
              { icon: FiRefreshCw, label: "Start Return", link: "/returns" },
              {
                icon: IoShirtOutline,
                label: "Size Guide",
                link: "/size-guide",
              },
              { icon: FiMapPin, label: "Find Store", link: "/stores" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="group flex flex-col items-center gap-3 p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-slate-700 group-hover:bg-blue-500/20 rounded-xl transition-colors">
                  <item.icon
                    className="text-slate-400 group-hover:text-blue-400 transition-colors"
                    size={22}
                  />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            Frequently Asked Questions
          </h2>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenFaq(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-3">
            {faqs[activeCategory].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="border border-slate-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors text-left"
                  >
                    <span className="font-medium pr-4">{faq.q}</span>
                    {isOpen ? (
                      <HiOutlineChevronUp
                        className="flex-shrink-0 text-slate-400"
                        size={20}
                      />
                    ) : (
                      <HiOutlineChevronDown
                        className="flex-shrink-0 text-slate-400"
                        size={20}
                      />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-4 md:px-8 lg:px-12 py-12 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Still need help?</h2>
            <p className="mt-2 text-slate-400">
              Our support team is available 24/7 to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {contactMethods.map((method, i) => (
              <div
                key={i}
                className="relative group p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-xl">
                    <method.icon className="text-blue-400" size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{method.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{method.desc}</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors">
                  {method.action}
                </button>
              </div>
            ))}
          </div>

          {/* Operating Hours */}
          <div className="mt-8 p-6 bg-slate-800/30 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FiClock className="text-blue-400" size={20} />
              <h3 className="font-semibold">Operating Hours</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Monday - Friday</span>
                <span>8:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Saturday - Sunday</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-slate-400 mb-8">
            Browse our complete collection or reach out directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/product/all "
              className="px-8 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-slate-800 border border-slate-700 font-semibold rounded-xl hover:bg-slate-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
