// components/PointsHistory.jsx
import React, { useState, useEffect } from "react";
import {
  Trophy,
  ShoppingBag,
  Users,
  Star,
  Gift,
  TrendingUp,
  Calendar,
  Zap,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { localHost, renderAPI } from "../constants";
import axios from "axios";
import { getTierInfo } from "../Constants/Tiers";

const PointsHistory = () => {
  const [pointsData, setPointsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [tierInfo, setTierInfo] = useState({
    currentTier: "",
    nextTier: "",
    currentXP: 0,
    totalXP: 0,
    xpToGo: 0,
    percent: 0,
    img: "",
  });

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  // Fetch points history from API
  const fetchPointsHistory = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/user/points-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = res.data;

      if (result.success) {
        setPointsData(result.data);
        setPagination(result.data.pagination);
        setError(null);
      } else {
        throw new Error(result.message || "Failed to load points");
      }
    } catch (err) {
      console.error("Error fetching points:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPointsHistory(currentPage);
  }, [currentPage]);

  const getIcon = (iconType) => {
    const icons = {
      shopping: <ShoppingBag className="w-5 h-5" />,
      users: <Users className="w-5 h-5" />,
      star: <Star className="w-5 h-5" />,
      gift: <Gift className="w-5 h-5" />,
      trending: <TrendingUp className="w-5 h-5" />,
      event: <Zap className="w-5 h-5" />,
    };
    return icons[iconType] || <Trophy className="w-5 h-5" />;
  };

  const getIconBg = (iconType) => {
    const colors = {
      shopping: "bg-blue-500",
      users: "bg-purple-500",
      star: "bg-yellow-500",
      gift: "bg-pink-500",
      trending: "bg-green-500",
      event: "bg-orange-500",
    };
    return colors[iconType] || "bg-gray-500";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const info = getTierInfo(pointsData?.totalPoints);
    setTierInfo(info);
  }, [pointsData]);

  // Loading state
  if (loading && !pointsData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white font-['Montserrat'] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading your points history...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white font-['Montserrat'] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => fetchPointsHistory(currentPage)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-['Montserrat']">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-950 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Points History</h1>
          <p className="text-blue-100">Track your rewards and achievements</p>
        </div>
      </div>

      {/* Points Summary Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <p className="text-sm text-gray-400">Total XP</p>
            </div>
            <p className="text-3xl font-bold">
              {pointsData?.totalPoints?.toLocaleString() || 0} XP
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-purple-500" />
              <p className="text-sm text-gray-400">Current Tier</p>
            </div>
            <img className="w-15" src={tierInfo.img} alt="" />
          </div>
        </div>

        {/* Points History List */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
          </div>

          {pointsData?.history?.length > 0 ? (
            <>
              <div className="divide-y divide-gray-800">
                {pointsData.history.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`${getIconBg(
                          item.icon
                        )} rounded-full p-3 text-white flex-shrink-0`}
                      >
                        {getIcon(item.icon)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-white mb-1">
                              {item.action}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {item.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDate(item.date)}
                            </p>
                          </div>

                          {/* Points Badge */}
                          <div className="flex-shrink-0">
                            <div className="bg-blue-900 text-white px-4 py-2 rounded-full font-bold">
                              +{item.points} XP
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="p-6 border-t border-gray-800 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                      className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage === pagination.totalPages || loading
                      }
                      className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold mb-2">No activity yet</p>
              <p className="text-sm">
                Start earning points by making purchases and completing tasks!
              </p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-3">How to Earn More Points</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <strong>Make Purchases:</strong> Earn 1 XP for every ₦100 spent
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <strong>Refer Friends:</strong> Get 250 XP when they sign up +
                150 XP on their first order
              </span>
            </li>
            {/* <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <strong>Leave Reviews:</strong> Share your thoughts and earn 50
                XP per review
              </span>
            </li> */}
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <strong>Complete Event Tasks:</strong> Participate in special
                challenges for bonus XP
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PointsHistory;
