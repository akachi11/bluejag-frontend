import React, { useState } from "react";
import { X, Star, Upload, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { localHost, renderAPI } from "../constants";
import { toast } from "react-toastify";

const WriteReviewModal = ({ productId, orderId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    comment: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("bj_userData"))?.token;
      await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/reviews`,
        {
          productId,
          orderId,
          rating: formData.rating,
          title: formData.title,
          comment: formData.comment,
          image: formData.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={32}
            className={`cursor-pointer transition ${
              star <= (hoverRating || formData.rating)
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-600 hover:text-yellow-500"
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Write a Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-white font-semibold mb-3">
              Rating <span className="text-red-500">*</span>
            </label>
            {renderStars()}
            {formData.rating > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                {formData.rating === 1 && "Poor"}
                {formData.rating === 2 && "Fair"}
                {formData.rating === 3 && "Good"}
                {formData.rating === 4 && "Very Good"}
                {formData.rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Review Title (Optional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Sum up your experience"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Share your thoughts about this product..."
              rows="6"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.comment.length} characters
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Add Photo (Optional)
            </label>
            <p className="text-sm text-gray-400 mb-3">
              Earn extra 25 XP by adding a photo!
            </p>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-lg max-h-64 mx-auto"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, image: null }));
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition">
                <Upload size={48} className="text-gray-500 mb-3" />
                <p className="text-sm text-gray-400 mb-1">
                  Click to upload image
                </p>
                <p className="text-xs text-gray-500">Max 5MB (JPG, PNG)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* XP Info */}
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              <strong>Earn XP for your review!</strong>
              <br />• {formData.image ? "75 XP" : "50 XP"} -{" "}
              {formData.image ? "Review with photo" : "Text review"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;
