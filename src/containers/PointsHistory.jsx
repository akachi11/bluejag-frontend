import React, { useState } from "react";
import {
  Trophy,
  ShoppingBag,
  Users,
  Star,
  Gift,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react";

const PointsHistory = () => {
  // Mock data - replace with actual API call
  const [pointsData] = useState({
    totalPoints: 2450,
    lifetimePoints: 5780,
    currentTier: "Gold",
    history: [
      {
        id: 1,
        action: "Purchase",
        description: "Lift Seamless Two Piece",
        points: 403,
        date: "2025-11-15",
        icon: "shopping",
      },
      {
        id: 2,
        action: "Referral",
        description: "Friend joined using your code",
        points: 500,
        date: "2025-11-12",
        icon: "users",
      },
      {
        id: 3,
        action: "Purchase",
        description: "Everyday Tank",
        points: 134,
        date: "2025-11-10",
        icon: "shopping",
      },
      {
        id: 4,
        action: "Event Task",
        description: 'Completed "Summer Fitness Challenge"',
        points: 150,
        date: "2025-11-09",
        icon: "event",
      },
      {
        id: 5,
        action: "Review",
        description: "Product review submitted",
        points: 50,
        date: "2025-11-08",
        icon: "star",
      },
      {
        id: 6,
        action: "Birthday Bonus",
        description: "Happy Birthday from BlueJag!",
        points: 200,
        date: "2025-11-01",
        icon: "gift",
      },
      {
        id: 7,
        action: "Purchase",
        description: "Performance Shorts",
        points: 289,
        date: "2025-10-28",
        icon: "shopping",
      },
      {
        id: 8,
        action: "Event Task",
        description: 'Completed "New Year Kickoff" milestone',
        points: 100,
        date: "2025-10-26",
        icon: "event",
      },
      {
        id: 9,
        action: "Social Share",
        description: "Shared on Instagram",
        points: 25,
        date: "2025-10-25",
        icon: "trending",
      },
      {
        id: 10,
        action: "Referral",
        description: "Friend made first purchase",
        points: 250,
        date: "2025-10-20",
        icon: "users",
      },
    ],
  });

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
              <p className="text-sm text-gray-400">Current Points</p>
            </div>
            <p className="text-3xl font-bold">
              {pointsData.totalPoints.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">XP</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-purple-500" />
              <p className="text-sm text-gray-400">Tier Status</p>
            </div>
            <p className="text-3xl font-bold">{pointsData.currentTier}</p>
            <p className="text-xs text-gray-500 mt-1">Member</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <p className="text-sm text-gray-400">Lifetime Points</p>
            </div>
            <p className="text-3xl font-bold">
              {pointsData.lifetimePoints.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">XP Earned</p>
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
                <strong>Refer Friends:</strong> Get 500 XP when they sign up +
                250 XP on their first order
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <strong>Leave Reviews:</strong> Share your thoughts and earn 50
                XP per review
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                <strong>Social Sharing:</strong> Post about BlueJag and tag us
                for 25 XP
              </span>
            </li>
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
