import React from "react";

const Skeleton = ({ className = "", rounded = "rounded-md" }) => {
  return (
    <div className="animate-pulse min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-10 w-64 rounded-xl bg-white/10"></div>
        <div className="h-10 w-32 rounded-xl bg-white/10"></div>
      </div>

      {/* Main Hero Card */}
      <div className="h-64 w-full rounded-3xl bg-white/10"></div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-32 rounded-2xl bg-white/10"></div>
        <div className="h-32 rounded-2xl bg-white/10"></div>
        <div className="h-32 rounded-2xl bg-white/10"></div>
        <div className="h-32 rounded-2xl bg-white/10"></div>
      </div>

      {/* Two-column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-3xl bg-white/10"></div>
        <div className="h-80 rounded-3xl bg-white/10"></div>
      </div>

      {/* List/Table Skeleton */}
      <div className="rounded-3xl bg-white/5 p-6 space-y-4">
        <div className="h-8 w-48 rounded-lg bg-white/10"></div>

        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 w-full rounded-xl bg-white/10"></div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
