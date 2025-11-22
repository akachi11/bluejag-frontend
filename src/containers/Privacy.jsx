import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Shield,
  Eye,
  Database,
  Share2,
  Cookie,
  UserCheck,
  Lock,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";

const PrivacyPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      icon: Eye,
      title: "Scope of this notice",
      content: (
        <>
          <p className="mb-3">
            This privacy notice applies to you if you interact with BlueJag
            through our website, including:
          </p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Purchasing products from our website
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Signing up for newsletters or marketing emails
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Participating in promotions or competitions
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Interacting with us on social media
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Submitting inquiries via our contact forms
            </li>
          </ul>
          <p>
            It explains how we collect, use, store, and protect your personal
            information.
          </p>
        </>
      ),
    },
    {
      icon: Database,
      title: "Information we collect",
      content: (
        <>
          <p className="mb-3">We may collect personal information including:</p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Name, email, phone number, and delivery address
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Payment information for processing orders
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Interaction data such as browsing behavior, clicks, and page
              visits
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Marketing preferences
            </li>
          </ul>
          <p>
            We do not collect more information than necessary to provide our
            services or improve your experience.
          </p>
        </>
      ),
    },
    {
      icon: Database,
      title: "How we use your information",
      content: (
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
            To process and fulfill orders
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
            To communicate about your account, orders, or support requests
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
            To send marketing and promotional communications if you have opted
            in
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
            To improve our website, products, and services
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
            To detect and prevent fraud or unauthorized activity
          </li>
        </ul>
      ),
    },
    {
      icon: Share2,
      title: "Sharing your information",
      content: (
        <>
          <p className="mb-3">We may share your information with:</p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Payment processors to complete transactions
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Delivery services to fulfill orders
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Marketing and analytics providers to improve our services
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Law enforcement or regulators if required by law
            </li>
          </ul>
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm font-medium">
              We do not sell your personal information to third parties.
            </p>
          </div>
        </>
      ),
    },
    {
      icon: Cookie,
      title: "Cookies and tracking",
      content: (
        <p>
          Our website uses cookies and pixels to improve user experience, track
          website performance, and show relevant advertisements. You can manage
          cookies in your browser settings.
        </p>
      ),
    },
    {
      icon: UserCheck,
      title: "Your rights",
      content: (
        <>
          <p className="mb-3">
            Depending on your jurisdiction, you may have rights to:
          </p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Access your personal data
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Correct inaccurate or incomplete information
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Request deletion of your data
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Withdraw consent for marketing communications
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              Object to processing of your data in certain situations
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:bluejagltd@gmail.com"
              className="text-blue-400 hover:underline"
            >
              bluejagltd@gmail.com
            </a>
            .
          </p>
        </>
      ),
    },
    {
      icon: Lock,
      title: "Data security",
      content: (
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information from unauthorized access,
          alteration, disclosure, or destruction.
        </p>
      ),
    },
    {
      icon: RefreshCw,
      title: "Changes to this privacy notice",
      content: (
        <p>
          We may update this notice from time to time. The most recent version
          will always be available on our website.
        </p>
      ),
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
            <Shield size={28} className="text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Privacy Notice
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Your privacy matters to us. Here's how we collect, use, and protect
            your personal information.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Last updated: November 8, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
        {/* Key Points Card */}
        <div className="mb-10 p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
          <h2 className="font-semibold mb-4">Key Points</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Shield size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Data Protection</p>
                <p className="text-xs text-slate-400">
                  Your data is encrypted and secured
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <UserCheck size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Your Control</p>
                <p className="text-xs text-slate-400">
                  Access, correct, or delete your data
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Share2 size={16} className="text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium">No Selling</p>
                <p className="text-xs text-slate-400">
                  We never sell your personal data
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Cookie size={16} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Cookie Control</p>
                <p className="text-xs text-slate-400">
                  Manage your cookie preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections.map((section, index) => {
            const isOpen = openSection === index;
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="border border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenSection(isOpen ? null : index)}
                  className="w-full flex items-center gap-3 p-4 md:p-5 hover:bg-slate-800/30 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue-400" />
                  </div>
                  <span className="font-medium flex-1">
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
                  <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-slate-400 leading-relaxed">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Card */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl">
          <h2 className="font-semibold mb-2">Questions about your privacy?</h2>
          <p className="text-sm text-slate-400 mb-6">
            If you have any questions or concerns about how we handle your data,
            we're here to help.
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

        {/* Related Links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/terms"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            View Terms & Conditions →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
