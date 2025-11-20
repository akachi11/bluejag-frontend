import React, { useState, useEffect } from "react";
import axios from "axios";
import { localHost, renderAPI } from "../constants";
import { Star, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useHomeContext } from "../context/HomeContext";
import WriteReviewModal from "./WriteReviewModal";

const ReviewsSection = ({ productId }) => {
  const { loggedIn } = useHomeContext();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    avgRating: 0,
    totalReviews: 0,
    ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState("recent");
  const [canReview, setCanReview] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showWriteReview, setShowWriteReview] = useState(false);

  useEffect(() => {
    fetchReviews(1, true);
    if (loggedIn) {
      checkCanReview();
    }
  }, [productId, sort, loggedIn]);

  const fetchReviews = async (pageNum = 1, reset = false) => {
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
          params: { page: pageNum, limit: 10, sort },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (reset) {
        setReviews(res.data.reviews);
      } else {
        setReviews((prev) => [...prev, ...res.data.reviews]);
      }

      setStats(res.data.stats);
      setHasMore(res.data.pagination.page < res.data.pagination.pages);
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
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

      // Update local state
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
    } catch (err) {
      toast.error("Failed to vote");
    }
  };

  const handleReviewSubmitted = () => {
    setShowWriteReview(false);
    fetchReviews(1, true);
    checkCanReview();
    toast.success("Review submitted! It will be visible after admin approval.");
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
          <div className="md:col-span-2 bg-gray-900 rounded-lg p-6">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => renderRatingBar(star))}
            </div>
          </div>
        </div>

        {/* Write Review Button */}
        {loggedIn && canReview && (
          <button
            onClick={() => setShowWriteReview(true)}
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Write a Review
          </button>
        )}

        {/* Sort Options */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              fetchReviews(1, true);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating_high">Highest Rating</option>
            <option value="rating_low">Lowest Rating</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {loading && page === 1 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
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
            reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onVote={handleVote}
                loggedIn={loggedIn}
              />
            ))
          )}
        </div>

        {/* Load More */}
        {hasMore && !loading && reviews.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => fetchReviews(page + 1, false)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              Load More Reviews
              <ChevronDown size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <WriteReviewModal
          productId={productId}
          orderId={orderId}
          onClose={() => setShowWriteReview(false)}
          onSuccess={handleReviewSubmitted}
        />
      )}
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review, onVote, loggedIn }) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold">
              {review.userId.firstName} {review.userId.lastName}
            </span>
            {review.isVerifiedPurchase && (
              <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">
                Verified Purchase
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
