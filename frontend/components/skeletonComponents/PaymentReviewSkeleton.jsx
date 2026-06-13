const PaymentReviewSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-[#0b0b0f] text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Payment Screenshot Skeleton */}
        <div className="lg:col-span-2 bg-[#111118] border border-white/10 rounded-2xl p-4">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
          </div>

          {/* Image placeholder */}
          <div className="w-full h-[420px] bg-white/5 rounded-xl animate-pulse flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>

        {/* RIGHT: User Details Skeleton */}
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-4 space-y-4">

          {/* Title */}
          <div className="h-4 w-32 bg-white/10 rounded animate-pulse mb-4" />

          {/* Name */}
          <div className="space-y-2">
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse" />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse" />
          </div>

          {/* Coupon */}
          <div className="space-y-2">
            <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
            <div className="h-16 w-full bg-white/5 rounded-lg animate-pulse" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <div className="h-12 flex-1 bg-yellow-500/20 rounded-lg animate-pulse" />
            <div className="h-12 flex-1 bg-red-500/20 rounded-lg animate-pulse" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default PaymentReviewSkeleton;