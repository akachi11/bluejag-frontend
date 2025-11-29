import React, { useState, useEffect } from "react";
import axios from "axios";
import { localHost, renderAPI } from "../constants";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Eye,
  Edit2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useHomeContext } from "../context/HomeContext";
import WriteReviewModal from "./WriteReviewModal";
import AllReviewsModal from "./AllReviewsModal";
import { TTSDisplay } from "./TTSSlider";

const ReviewsSection = ({ productId }) => {
  const { loggedIn } = useHomeContext();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [stats, setStats] = useState({
    avgRating: 0,
    avgTTS: 0,
    ttsLabel: "True to Size",
    totalReviews: 0,
    ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    ttsBreakdown: {},
  });
  const [loading, setLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const PREVIEW_LIMIT = 3; // Show 3 reviews on main page

  useEffect(() => {
    fetchReviews();
    if (loggedIn) {
      checkCanReview();
      fetchUserReview();
    }
  }, [productId, loggedIn]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const token = loggedIn
        ? JSON.parse(localStorage.getItem("bj_userData"))?.token
        : null;

      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/reviews/product/${productId}`,
        {
          params: { page: 1, limit: PREVIEW_LIMIT, sort: "recent" },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setReviews(res.data.reviews);
      setStats(res.data.stats);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReview = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("bj_userData"))?.token;
      const userId = JSON.parse(localStorage.getItem("bj_userData"))?.id;

      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/reviews/product/${productId}`,
        {
          params: { page: 1, limit: 100 }, // Get enough to find user's review
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Find user's review
      const myReview = res.data.reviews.find((r) => r.userId._id === userId);
      setUserReview(myReview || null);
    } catch (err) {
      console.error("Failed to fetch user review:", err);
    }
  };

  const checkCanReview = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("bj_userData"))?.token;
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/reviews/can-review/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCanReview(res.data.canReview);
      setOrderId(res.data.orderId);
    } catch (err) {
      console.error("Failed to check review eligibility:", err);
    }
  };

  const handleVote = async (reviewId, voteType) => {
    if (!loggedIn) {
      toast.error("Please login to vote");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("bj_userData"))?.token;
      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/reviews/${reviewId}/vote`,
        { voteType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update reviews list
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? {
                ...review,
                upvotes: res.data.upvotes,
                downvotes: res.data.downvotes,
                userVote: res.data.userVote,
              }
            : review
        )
      );

      // Update user review if it's theirs
      if (userReview?._id === reviewId) {
        setUserReview((prev) => ({
          ...prev,
          upvotes: res.data.upvotes,
          downvotes: res.data.downvotes,
          userVote: res.data.userVote,
        }));
      }
    } catch (err) {
      toast.error("Failed to vote");
    }
  };

  const handleReviewSubmitted = () => {
    setShowWriteReview(false);
    setEditingReview(null);
    fetchReviews();
    fetchUserReview();
    checkCanReview();
    toast.success("Review submitted! It will be visible after admin approval.");
  };

  const handleEditClick = () => {
    setEditingReview(userReview);
    setShowWriteReview(true);
  };

  const handleDeleteReview = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const token = JSON.parse(localStorage.getItem("bj_userData"))?.token;
      await axios.delete(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/reviews/${userReview._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Review deleted");
      setUserReview(null);
      fetchReviews();
      checkCanReview();
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-600"
            }
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (starCount) => {
    const percentage =
      stats.totalReviews > 0
        ? (stats.ratingBreakdown[starCount] / stats.totalReviews) * 100
        : 0;

    return (
      <div className="flex items-center gap-3">
        <span className="text-sm w-12">{starCount} star</span>
        <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-yellow-500 h-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-400 w-12 text-right">
          {stats.ratingBreakdown[starCount]}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-950 text-white py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Overall Rating */}
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold mb-2">{stats.avgRating}</div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(stats.avgRating))}
            </div>
            <div className="text-sm text-gray-400">
              Based on {stats.totalReviews} review
              {stats.totalReviews !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => renderRatingBar(star))}
            </div>
          </div>

          {/* TTS Display */}
          {stats.totalReviews > 0 && (
            <TTSDisplay
              avgTTS={stats.avgTTS}
              totalVotes={stats.totalReviews}
              ttsBreakdown={stats.ttsBreakdown}
            />
          )}
        </div>

        {/* User's Review (if exists) - Show First */}
        {loggedIn && userReview && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Your Review</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={handleDeleteReview}
                  className="px-4 py-2 bg-red-900 hover:bg-red-800 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
            <ReviewCard
              review={userReview}
              onVote={handleVote}
              loggedIn={loggedIn}
              isUserReview={true}
            />
          </div>
        )}

        {/* Write Review Button */}
        {loggedIn && canReview && !userReview && (
          <button
            onClick={() => setShowWriteReview(true)}
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Write a Review
          </button>
        )}

        {/* Other Reviews */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 && !userReview ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg">
              <p className="text-gray-400 mb-4">No reviews yet</p>
              {loggedIn && canReview && (
                <button
                  onClick={() => setShowWriteReview(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Be the first to review
                </button>
              )}
            </div>
          ) : (
            <>
              {reviews
                .filter((r) => r._id !== userReview?._id) // Don't show user's review twice
                .map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onVote={handleVote}
                    loggedIn={loggedIn}
                  />
                ))}
            </>
          )}
        </div>

        {/* View All Button */}
        {stats.totalReviews > PREVIEW_LIMIT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllReviews(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              <Eye size={20} />
              View All {stats.totalReviews} Reviews
            </button>
          </div>
        )}
      </div>

      {/* Write/Edit Review Modal */}
      {showWriteReview && (
        <WriteReviewModal
          productId={productId}
          orderId={orderId}
          existingReview={editingReview}
          onClose={() => {
            setShowWriteReview(false);
            setEditingReview(null);
          }}
          onSuccess={handleReviewSubmitted}
        />
      )}

      {/* All Reviews Modal */}
      {showAllReviews && (
        <AllReviewsModal
          productId={productId}
          userReview={userReview}
          onClose={() => setShowAllReviews(false)}
          onVote={handleVote}
          loggedIn={loggedIn}
        />
      )}
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review, onVote, loggedIn, isUserReview = false }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-600"
            }
          />
        ))}
      </div>
    );
  };

  const getTTSLabel = (val) => {
    if (val <= -3) return "Runs Very Small";
    if (val === -2 || val === -1) return "Runs Small";
    if (val === 0) return "True to Size";
    if (val === 1 || val === 2) return "Runs Large";
    if (val >= 3) return "Runs Very Large";
    return "True to Size";
  };

  const getTTSColor = (val) => {
    if (val <= -2) return "text-red-400";
    if (val >= -1 && val <= 1) return "text-green-400";
    if (val >= 2) return "text-blue-400";
    return "text-white";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`bg-gray-900 rounded-lg p-6 ${
        isUserReview ? "border-2 border-blue-500" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold">
              {review.userId.firstName} {review.userId.lastName}
            </span>
            {isUserReview && (
              <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">
                You
              </span>
            )}
            {review.isVerifiedPurchase && (
              <span className="bg-green-900 text-green-300 text-[10px] whitespace-nowrap overflow-hidden text-ellipsis px-2 py-1 rounded">
                Verified Purchase
              </span>
            )}
            {!review.isApproved && (
              <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded">
                Pending Approval
              </span>
            )}
            {review.sizePurchased && (
              <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                Size: {review.sizePurchased}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {renderStars(review.rating)}
            <span className="text-sm text-gray-400">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* TTS Badge */}
      {review.ttsRating !== undefined && (
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTTSColor(
              review.ttsRating
            )} bg-gray-800`}
          >
            Fit: {getTTSLabel(review.ttsRating)}
          </span>
        </div>
      )}

      {/* Title */}
      {review.title && (
        <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
      )}

      {/* Comment */}
      <p className="text-gray-300 mb-4">{review.comment}</p>

      {/* Image */}
      {review.image && (
        <img
          src={review.image}
          alt="Review"
          className="rounded-lg mb-4 max-w-xs cursor-pointer hover:opacity-90 transition"
          onClick={() => window.open(review.image, "_blank")}
        />
      )}

      {/* Admin Response */}
      {review.adminResponse && review.adminResponse.text && (
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-blue-400">
              BlueJag Response
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(review.adminResponse.respondedAt)}
            </span>
          </div>
          <p className="text-gray-300">{review.adminResponse.text}</p>
        </div>
      )}

      {/* Vote Buttons */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Was this helpful?</span>
        <button
          onClick={() => onVote(review._id, "upvote")}
          disabled={!loggedIn}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
            review.userVote === "upvote"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
          } ${!loggedIn && "opacity-50 cursor-not-allowed"}`}
        >
          <ThumbsUp size={16} />
          <span className="text-sm">{review.upvotes}</span>
        </button>
        <button
          onClick={() => onVote(review._id, "downvote")}
          disabled={!loggedIn}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
            review.userVote === "downvote"
              ? "bg-red-600 text-white"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
          } ${!loggedIn && "opacity-50 cursor-not-allowed"}`}
        >
          <ThumbsDown size={16} />
          <span className="text-sm">{review.downvotes}</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
