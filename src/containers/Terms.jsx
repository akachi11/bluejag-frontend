import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const TermsPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      title: "Who we are and how to contact us",
      content: [
        "1.1 Who we are. We are BlueJag Ltd – a company incorporated in Nigeria. Our main office is at [Your Office Address], and our registered CAC number is [Your CAC Number].",
        "1.2 How to contact us. You can contact us via email at support@bluejag.com or through the support section on our app/website.",
        "1.3 How we may contact you. We may contact you via the email address provided during registration or purchase.",
      ],
    },
    {
      title: "Placing an order",
      content: [
        "2.1 Orders can be placed via our website or app. Ensure your contact, delivery, and billing information is accurate before confirming your order.",
        "2.2 Your order is an offer to buy our products. A contract is formed once we confirm dispatch via email.",
        "2.3 You must be at least 18 years old to place an order. Orders by minors require parental consent.",
      ],
    },
    {
      title: "Our rights to cancel your order",
      content: [
        "3.1 Out of stock or invalid orders. If we cannot fulfil your order, we will notify you and will not charge you.",
        "3.2 Suspicious activity. Orders for resale or commercial purposes may be canceled.",
        "3.3 We may suspend supply for technical reasons, regulatory updates, or product updates.",
      ],
    },
    {
      title: "Our products",
      content: [
        "4.1 We provide clothing, accessories, and other fashion items for men and women.",
        "4.2 Images and descriptions are illustrative. Colors may vary based on device display.",
        "4.3 Gift cards are valid for 12 months and can only be redeemed on the BlueJag store they were purchased from.",
      ],
    },
    {
      title: "Delivery",
      content: [
        "5.1 Delivery costs and options are shown at checkout. Any customs, duties, or extra charges are your responsibility.",
        "5.2 Delivery timelines depend on the chosen method. We are not responsible for delays outside our control.",
        "5.3 If you are unavailable at delivery, the courier will notify you for rearrangement.",
      ],
    },
    {
      title: "Your rights to end the contract",
      content: [
        "6.1 You may cancel your contract for faulty or misdescribed products or for other reasons such as upcoming changes to products.",
        "6.2 Change of mind is allowed within 30 days for most products, except health/hygiene items, custom products, or opened items.",
        "6.3 Return costs are generally borne by you unless the product is faulty.",
      ],
    },
    {
      title: "Returns and refunds",
      content: [
        "7.1 Contact customer support via our website or app to initiate returns.",
        "7.2 Follow our Returns Policy for returning products. Refunds are issued to the original payment method within 14 days after we receive the returned items.",
        "7.3 Discount adjustments will be applied if applicable.",
      ],
    },
    {
      title: "Price and payment",
      content: [
        "8.1 Prices include VAT and are displayed on the order pages.",
        "8.2 Payment options include Visa, Mastercard, PayPal, and others. You are not charged until dispatch.",
        "8.3 Pricing errors may result in order cancellation and refund.",
      ],
    },
    {
      title: "Discount codes",
      content: [
        "9.1 Codes are time-limited and store-specific. Only one code per order.",
        "9.2 Codes cannot be applied to gift cards, delivery fees, or combined with other offers.",
        "9.3 We reserve the right to withdraw or amend codes at any time.",
      ],
    },
    {
      title: "Liability",
      content: [
        "10.1 We are responsible for foreseeable loss and damage caused by our negligence.",
        "10.2 We are not liable for business losses or commercial use of our products.",
        "10.3 Your statutory rights are not affected.",
      ],
    },
    {
      title: "Personal information",
      content: [
        "11.1 We handle your data according to our Privacy Policy. View it here: /privacy",
      ],
      hasLink: true,
    },
    {
      title: "Other important terms",
      content: [
        "12.1 We may transfer our rights and obligations to another organisation, and we will notify you.",
        "12.2 You cannot transfer your rights without our consent.",
        "12.3 This contract is governed by Nigerian law and disputes are resolved in Nigerian courts.",
        "12.4 If part of the contract is deemed illegal, the rest remains valid.",
        "12.5 Delays in enforcing the contract do not waive our rights.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Hero */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <FileText size={28} className="text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Please read these terms carefully before placing an order. By using
            our services, you agree to these terms.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Last updated: November 8, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
        {/* Quick Summary Card */}
        <div className="mb-10 p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
          <h2 className="font-semibold mb-3">Quick Summary</h2>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Orders form a contract once we confirm dispatch via email
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              30-day returns on most products (some exclusions apply)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Refunds processed within 14 days of receiving returned items
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Nigerian law governs this contract
            </li>
          </ul>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections.map((section, index) => {
            const isOpen = openSection === index;
            return (
              <div
                key={index}
                className="border border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenSection(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-slate-800/30 transition-colors text-left"
                >
                  <span className="font-medium">
                    {index + 1}. {section.title}
                  </span>
                  {isOpen ? (
                    <ChevronUp
                      size={20}
                      className="text-slate-400 flex-shrink-0"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-slate-400 flex-shrink-0"
                    />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-3">
                    {section.content.map((item, i) => (
                      <p
                        key={i}
                        className="text-sm text-slate-400 leading-relaxed"
                      >
                        {section.hasLink && item.includes("/privacy") ? (
                          <>
                            11.1 We handle your data according to our Privacy
                            Policy.{" "}
                            <Link
                              to="/privacy"
                              className="text-blue-400 hover:underline"
                            >
                              View Privacy Policy →
                            </Link>
                          </>
                        ) : (
                          item
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Card */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl">
          <h2 className="font-semibold mb-4">Questions about these terms?</h2>
          <p className="text-sm text-slate-400 mb-6">
            We're here to help clarify anything. Reach out to us anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:bluejagltd@gmail.com"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 rounded-xl text-sm hover:bg-slate-800 transition-colors"
            >
              <Mail size={16} className="text-blue-400" />
              bluejagltd@gmail.com
            </a>
            <a
              href="tel:+2349151658995"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 rounded-xl text-sm hover:bg-slate-800 transition-colors"
            >
              <Phone size={16} className="text-blue-400" />
              09151658995
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
