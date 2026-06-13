const MCQListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Repeat multiple MCQs */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 p-5 space-y-4"
        >
          {/* Question */}
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-white/10 animate-pulse rounded" />
            <div className="h-5 w-2/3 bg-white/10 animate-pulse rounded" />
          </div>

          {/* Options */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, j) => (
              <div
                key={j}
                className="flex items-center gap-3"
              >
                {/* Radio circle */}
                <div className="h-4 w-4 rounded-full bg-white/10 animate-pulse" />

                {/* Option text */}
                <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-end pt-2">
            <div className="h-9 w-28 bg-white/10 animate-pulse rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MCQListSkeleton;