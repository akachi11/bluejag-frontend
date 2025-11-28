import React, { useState } from "react";

// Interactive TTS Slider for writing reviews
export const TTSSlider = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const positions = [
    { value: -4, label: "Very Small" },
    { value: -3, label: "" },
    { value: -2, label: "Runs Small" },
    { value: -1, label: "" },
    { value: 0, label: "True to Size" },
    { value: 1, label: "" },
    { value: 2, label: "Runs Large" },
    { value: 3, label: "" },
    { value: 4, label: "Very Large" },
  ];

  const getLabel = (val) => {
    if (val <= -3) return "Runs Very Small";
    if (val === -2 || val === -1) return "Runs Small";
    if (val === 0) return "True to Size";
    if (val === 1 || val === 2) return "Runs Large";
    if (val >= 3) return "Runs Very Large";
    return "True to Size";
  };

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  // Calculate position percentage for display
  const getPositionPercentage = (val) => {
    return ((val + 4) / 8) * 100;
  };

  return (
    <div className="space-y-4">
      <div className="relative pt-8 pb-4">
        {/* Labels at top */}
        <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-1">
          <span>Runs Small</span>
          <span className="font-semibold text-white">True to Size</span>
          <span>Runs Large</span>
        </div>

        {/* Slider track with gradient */}
        <div className="relative h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full">
          {/* Tick marks */}
          <div className="absolute inset-0 flex justify-between px-1">
            {positions.map((pos, i) => (
              <div
                key={i}
                className="w-0.5 h-full bg-white/30"
                style={{ marginLeft: i === 0 ? 0 : -1 }}
              />
            ))}
          </div>

          {/* Slider thumb indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-200"
            style={{ left: `${getPositionPercentage(value)}%` }}
          >
            <div className="w-6 h-6 bg-white rounded-full shadow-lg border-4 border-gray-900" />
          </div>
        </div>

        {/* Hidden range input for interaction */}
        <input
          type="range"
          min="-4"
          max="4"
          step="1"
          value={value}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />

        {/* Bottom labels for major positions */}
        <div className="flex justify-between mt-4 text-xs">
          <span
            className={
              value <= -2 ? "text-red-400 font-semibold" : "text-gray-500"
            }
          >
            Very Small
          </span>
          <span
            className={
              value >= -1 && value <= 1
                ? "text-green-400 font-semibold"
                : "text-gray-500"
            }
          >
            Perfect Fit
          </span>
          <span
            className={
              value >= 2 ? "text-blue-400 font-semibold" : "text-gray-500"
            }
          >
            Very Large
          </span>
        </div>
      </div>

      {/* Current selection display */}
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-400 mb-1">Your fit rating:</p>
        <p className="text-lg font-semibold text-white">{getLabel(value)}</p>
      </div>
    </div>
  );
};

// Static TTS Display for showing average rating
export const TTSDisplay = ({ avgTTS, totalVotes, ttsBreakdown }) => {
  const getPositionPercentage = (val) => {
    return ((val + 4) / 8) * 100;
  };

  const getLabel = (val) => {
    if (val <= -2.5) return "Runs Very Small";
    if (val < -0.5) return "Runs Small";
    if (val >= -0.5 && val <= 0.5) return "True to Size";
    if (val > 0.5 && val < 2.5) return "Runs Large";
    if (val >= 2.5) return "Runs Very Large";
    return "True to Size";
  };

  const getColor = (val) => {
    if (val <= -1) return "text-red-400";
    if (val >= -0.5 && val <= 0.5) return "text-green-400";
    if (val >= 1) return "text-blue-400";
    return "text-white";
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="font-semibold text-white mb-4">Overall Fit</h3>

      <div className="relative pt-2 pb-8">
        {/* Static slider track */}
        <div className="relative h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full">
          {/* Tick marks */}
          <div className="absolute inset-0 flex justify-between px-1">
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((pos, i) => (
              <div
                key={i}
                className="w-0.5 h-full bg-white/30"
                style={{ marginLeft: i === 0 ? 0 : -1 }}
              />
            ))}
          </div>

          {/* Average position indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${getPositionPercentage(avgTTS)}%` }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-white rounded-full shadow-lg border-2 border-gray-900" />
              {/* Triangle pointer below */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-6 text-xs">
          <span className="text-gray-500">Runs Small</span>
          <span className="text-gray-500">True to Size</span>
          <span className="text-gray-500">Runs Large</span>
        </div>
      </div>

      {/* Rating summary */}
      <div className="text-center">
        <p className={`text-xl font-bold ${getColor(avgTTS)} mb-1`}>
          {getLabel(avgTTS)}
        </p>
        <p className="text-sm text-gray-400">
          Based on {totalVotes} review{totalVotes !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Breakdown percentages */}
      {ttsBreakdown && (
        <div className="mt-6 space-y-2">
          {[
            { key: "verySmall", label: "Runs Very Small", color: "bg-red-500" },
            { key: "small", label: "Runs Small", color: "bg-orange-500" },
            { key: "trueToSize", label: "True to Size", color: "bg-green-500" },
            { key: "large", label: "Runs Large", color: "bg-blue-500" },
            {
              key: "veryLarge",
              label: "Runs Very Large",
              color: "bg-purple-500",
            },
          ].map((item) => {
            const count = ttsBreakdown[item.key] || 0;
            const percentage =
              totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

            if (count === 0) return null;

            return (
              <div key={item.key} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-32">{item.label}</span>
                <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
