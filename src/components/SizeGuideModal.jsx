import React, { useState, useEffect } from "react";
import { X, Ruler } from "lucide-react";
import axios from "axios";
import { localHost, renderAPI } from "../constants";

const SizeGuideModal = ({ productId, onClose }) => {
  const [sizeChart, setSizeChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSizeChart();
  }, [productId]);

  const fetchSizeChart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/size-chart/product/${productId}`
      );
      setSizeChart(res.data);
    } catch (err) {
      console.error("Failed to fetch size chart:", err);
      setSizeChart(null);
    } finally {
      setLoading(false);
    }
  };

  const getMeasurementLabel = (key) => {
    const labels = {
      length: "Length",
      chest: "Chest",
      waist: "Waist",
      hips: "Hips",
      sleeve: "Sleeve",
      shoulder: "Shoulder",
      inseam: "Inseam",
      rise: "Rise",
      thigh: "Thigh",
      neck: "Neck",
      weight: "Weight",
    };
    return labels[key] || key;
  };

  const formatRange = (min, max, unit = "") => {
    if (min && max) return `${min}-${max}${unit}`;
    if (min) return `${min}+${unit}`;
    if (max) return `Up to ${max}${unit}`;
    return "-";
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl max-w-5xl w-full p-8">
          <p className="text-white text-center">Loading size guide...</p>
        </div>
      </div>
    );
  }

  if (!sizeChart) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl max-w-2xl w-full p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Size Guide</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>
          <div className="text-center py-8">
            <Ruler size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">
              No size guide available for this product
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get all available measurement fields
  const measurementFields = [
    "length",
    "chest",
    "waist",
    "hips",
    "sleeve",
    "shoulder",
    "inseam",
    "rise",
    "thigh",
    "neck",
  ].filter((field) => sizeChart.sizes.some((size) => size[field] != null));

  const hasRecommendedHeight = sizeChart.sizes.some(
    (s) => s.recommendedHeight?.min || s.recommendedHeight?.max
  );
  const hasRecommendedWeight = sizeChart.sizes.some(
    (s) => s.recommendedWeight?.min || s.recommendedWeight?.max
  );
  const hasWeight = sizeChart.sizes.some((s) => s.weight != null);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Size Guide</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">
                Measurements in {sizeChart.unit}
              </span>
              {sizeChart.fitType && (
                <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs uppercase">
                  {sizeChart.fitType} Fit
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-white bg-gray-800/50">
                    Size
                  </th>
                  {measurementFields.map((field) => (
                    <th
                      key={field}
                      className="text-center py-3 px-4 font-semibold text-white bg-gray-800/50"
                    >
                      {getMeasurementLabel(field)}
                    </th>
                  ))}
                  {hasRecommendedHeight && (
                    <th className="text-center py-3 px-4 font-semibold text-white bg-gray-800/50">
                      Recommended Height ({sizeChart.unit})
                    </th>
                  )}
                  {hasRecommendedWeight && (
                    <th className="text-center py-3 px-4 font-semibold text-white bg-gray-800/50">
                      Recommended Weight (kg)
                    </th>
                  )}
                  {hasWeight && (
                    <th className="text-center py-3 px-4 font-semibold text-white bg-gray-800/50">
                      Weight (g)
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sizeChart.sizes.map((size, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-white">
                      {size.size}
                    </td>
                    {measurementFields.map((field) => (
                      <td
                        key={field}
                        className="py-3 px-4 text-center text-gray-300"
                      >
                        {size[field] || "-"}
                      </td>
                    ))}
                    {hasRecommendedHeight && (
                      <td className="py-3 px-4 text-center text-gray-300">
                        {formatRange(
                          size.recommendedHeight?.min,
                          size.recommendedHeight?.max
                        )}
                      </td>
                    )}
                    {hasRecommendedWeight && (
                      <td className="py-3 px-4 text-center text-gray-300">
                        {formatRange(
                          size.recommendedWeight?.min,
                          size.recommendedWeight?.max
                        )}
                      </td>
                    )}
                    {hasWeight && (
                      <td className="py-3 px-4 text-center text-gray-300">
                        {size.weight || "-"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {sizeChart.notes && sizeChart.notes.length > 0 && (
            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h3 className="font-semibold text-blue-400 mb-2">Notes:</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {sizeChart.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Measure Guide */}
          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Ruler size={20} className="text-blue-400" />
              How to Measure
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-2">Chest:</p>
                <p>
                  Measure around the fullest part of your chest, keeping the
                  tape horizontal.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Waist:</p>
                <p>
                  Measure around your natural waistline, keeping the tape
                  comfortably loose.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Sleeve:</p>
                <p>
                  Measure from the center back of your neck to your wrist with
                  arm slightly bent.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Length:</p>
                <p>
                  Measure from the highest point of the shoulder to the bottom
                  hem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6">
          <p className="text-sm text-gray-400 text-center">
            Still unsure about sizing? Contact our support team for personalized
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
