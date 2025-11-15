import React from "react";

export default function OrderDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 sm:px-10 py-10">
      <div className="max-w-4xl mx-auto bg-[#0f172a] rounded-2xl p-6 sm:p-10 animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="h-6 w-40 bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded"></div>
            <div className="h-4 w-24 bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded"></div>
          </div>
          <div className="h-6 w-20 bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded-full"></div>
        </div>

        {/* Items */}
        <div className="mt-8 space-y-5">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[#1e293b] rounded-xl p-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a]"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded"></div>
                  <div className="h-3 w-28 bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded"></div>
                  <div className="h-3 w-16 bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded"></div>
                </div>
              </div>
              <div className="h-4 w-10 bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded"></div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-gradient-to-r from-[#0d1b3d] to-[#1e3a8a] rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
