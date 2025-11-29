import React, { useState, useEffect } from "react";
import { X, Star, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";
import axios from "axios";
import { localHost, renderAPI } from "../constants";
import { toast } from "react-toastify";

const AllReviewsModal = ({
  productId,
  userReview,
  onClose,
  onVote,
  loggedIn,
}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    fetchReviews(1, true);
  }, [sort]);

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

      setHasMore(res.data.pagination.page < res.data.pagination.pages);
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
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

      // Also update parent component
      onVote(reviewId, voteType);
    } catch (err) {
      toast.error("Failed to vote");
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">All Reviews</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sort Options */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
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
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User's Review First */}
          {userReview && (
            <div className="bg-gray-800 border-2 border-blue-500 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">
                      {userReview.userId.firstName} {userReview.userId.lastName}
                    </span>
                    <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">
                      You
                    </span>
                    {userReview.isVerifiedPurchase && (
                      <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                    {!userReview.isApproved && (
                      <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded">
                        Pending Approval
                      </span>
                    )}
                    {userReview.sizePurchased && (
                      <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        Size: {userReview.sizePurchased}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {renderStars(userReview.rating)}
                    <span className="text-sm text-gray-400">
                      {formatDate(userReview.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {userReview.ttsRating !== undefined && (
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTTSColor(
                      userReview.ttsRating
                    )} bg-gray-700`}
                  >
                    Fit: {getTTSLabel(userReview.ttsRating)}
                  </span>
                </div>
              )}

              {userReview.title && (
                <h4 className="font-semibold text-lg mb-2">
                  {userReview.title}
                </h4>
              )}

              <p className="text-gray-300 mb-4">{userReview.comment}</p>

              {userReview.image && (
                <img
                  src={userReview.image}
                  alt="Review"
                  className="rounded-lg mb-4 max-w-xs cursor-pointer hover:opacity-90 transition"
                  onClick={() => window.open(userReview.image, "_blank")}
                />
              )}

              {userReview.adminResponse && userReview.adminResponse.text && (
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-blue-400">
                      BlueJag Response
                    </span>
                  </div>
                  <p className="text-gray-300">
                    {userReview.adminResponse.text}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Was this helpful?</span>
                <button
                  onClick={() => handleVote(userReview._id, "upvote")}
                  disabled={!loggedIn}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                    userReview.userVote === "upvote"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  } ${!loggedIn && "opacity-50 cursor-not-allowed"}`}
                >
                  <ThumbsUp size={16} />
                  <span className="text-sm">{userReview.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote(userReview._id, "downvote")}
                  disabled={!loggedIn}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                    userReview.userVote === "downvote"
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  } ${!loggedIn && "opacity-50 cursor-not-allowed"}`}
                >
                  <ThumbsDown size={16} />
                  <span className="text-sm">{userReview.downvotes}</span>
                </button>
              </div>
            </div>
          )}

          {/* Other Reviews */}
          {loading && page === 1 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading reviews...</p>
            </div>
          ) : (
            reviews
              .filter((r) => r._id !== userReview?._id)
              .map((review) => (
                <div key={review._id} className="bg-gray-800 rounded-lg p-6">
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
                        {review.sizePurchased && (
                          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
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

                  {review.ttsRating !== undefined && (
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTTSColor(
                          review.ttsRating
                        )} bg-gray-700`}
                      >
                        Fit: {getTTSLabel(review.ttsRating)}
                      </span>
                    </div>
                  )}

                  {review.title && (
                    <h4 className="font-semibold text-lg mb-2">
                      {review.title}
                    </h4>
                  )}

                  <p className="text-gray-300 mb-4">{review.comment}</p>

                  {review.image && (
                    <img
                      src={review.image}
                      alt="Review"
                      className="rounded-lg mb-4 max-w-xs cursor-pointer hover:opacity-90 transition"
                      onClick={() => window.open(review.image, "_blank")}
                    />
                  )}

                  {review.adminResponse && review.adminResponse.text && (
                    <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-blue-400">
                          BlueJag Response
                        </span>
                      </div>
                      <p className="text-gray-300">
                        {review.adminResponse.text}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      Was this helpful?
                    </span>
                    <button
                      onClick={() => handleVote(review._id, "upvote")}
                      disabled={!loggedIn}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                        review.userVote === "upvote"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      } ${!loggedIn && "opacity-50 cursor-not-allowed"}`}
                    >
                      <ThumbsUp size={16} />
                      <span className="text-sm">{review.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(review._id, "downvote")}
                      disabled={!loggedIn}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                        review.userVote === "downvote"
                          ? "bg-red-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      } ${!loggedIn && "opacity-50 cursor-not-allowed"}`}
                    >
                      <ThumbsDown size={16} />
                      <span className="text-sm">{review.downvotes}</span>
                    </button>
                  </div>
                </div>
              ))
          )}

          {/* Load More */}
          {hasMore && !loading && (
            <div className="text-center pt-4">
              <button
                onClick={() => fetchReviews(page + 1, false)}
                disabled={loading}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
              >
                {loading ? "Loading..." : "Load More"}
                <ChevronDown size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsModal;
