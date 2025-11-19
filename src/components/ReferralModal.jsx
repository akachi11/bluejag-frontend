import React, { useState } from "react";
import { X, Copy, Check, Share2, Mail, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

const ReferralModal = ({ isOpen, onClose, referralCode, userName }) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

  const handleCopy = (isLink) => {
    navigator.clipboard.writeText(isLink ? referralLink : referralCode);
    if (isLink) {
      setCopiedLink(true);
    } else {
      setCopied(true);
    }
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform) => {
    const message = `Hey! Join BlueJag using my referral code ${referralCode} and we both get rewards! Sign up here: ${referralLink}`;

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            message
          )}`,
          "_blank"
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=Join BlueJag with my referral code&body=${encodeURIComponent(
          message
        )}`;
        break;
      case "native":
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Join BlueJag",
              text: message,
            });
          } catch (err) {
            console.log("Share cancelled");
          }
        } else {
          handleCopy(true);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Refer a Friend</h2>
            <p className="text-gray-400 text-sm mt-1">Share the rewards!</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Rewards Info */}
          <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Share2 size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Earn Rewards Together!</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-200">🎁</span>
                <span>
                  You get <strong>200 XP</strong> when they sign up
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-200">🎁</span>
                <span>
                  Your friend gets <strong>100 XP</strong> when they sign up
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-200">💰</span>
                <span>
                  You get <strong>150 XP</strong> when they make their first
                  purchase
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-200">🔥</span>
                <span>No limit! Refer as many friends as you want</span>
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Your Referral Code
            </label>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-400 tracking-wider">
                  {referralCode}
                </span>
              </div>
              <button
                onClick={() => handleCopy(false)}
                className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg transition flex items-center gap-2"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Referral Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleCopy(true)}
                className="bg-gray-800 hover:bg-gray-700 px-4 rounded-lg transition"
              >
                {copiedLink ? (
                  <Check size={20} className="text-green-500" />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-3">
              Share via
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShare("whatsapp")}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </button>
              <button
                onClick={() => handleShare("email")}
                className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Email
              </button>
              <button
                onClick={() => handleShare("native")}
                className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                More
              </button>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="font-semibold text-white mb-3">How it works:</p>
            <ol className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Share your referral code or link with friends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>
                  They sign up using your code and get <strong>500 XP</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>
                  When they make their first purchase, you get{" "}
                  <strong>250 XP</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Repeat and watch your XP grow! 🚀</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
