import React from 'react'

const SmartSelectStep1 = ({setStep, setIsWeakestChapterOrSubject}) => {
    return (
        <div className="space-y-3 p-5">
            <p className="text-[11px] text-[#8B8E8B]/70">
                Let the algorithm pick — build a test targeting your weakest areas.
            </p>

            <button
                type="button"
                onClick={() => setStep(3)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-4 py-3 text-left"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 20V10M18 20V4M6 20v-4" />
                    </svg>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="[font-family:Poppins,sans-serif] text-[13px] font-black">
                        Top N Weakest Topics
                        <span className="ml-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-emerald-400">
                            Most popular
                        </span>
                    </p>
                    <p className="text-[11px] text-[#8B8E8B]/60">
                        Weakest across all subjects &amp; chapters
                    </p>
                </div>
                <span className="shrink-0 text-[#8B8E8B]/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </span>
            </button>

            <button
                type="button"
                onClick={() => {
                    setStep(prev => prev + 1);
                    setIsWeakestChapterOrSubject(1);
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-4 py-3 text-left"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="[font-family:Poppins,sans-serif] text-[13px] font-black">
                        Weakest by Subject
                    </p>
                    <p className="text-[11px] text-[#8B8E8B]/60">
                        Pick subjects, then top N weak topics
                    </p>
                </div>
                <span className="shrink-0 text-[#8B8E8B]/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </span>
            </button>

            <button
                type="button"
                onClick={() => {
                    setStep(prev => prev + 1);
                    setIsWeakestChapterOrSubject(2);
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-4 py-3 text-left"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="[font-family:Poppins,sans-serif] text-[13px] font-black">
                        Weakest in Chapter
                    </p>
                    <p className="text-[11px] text-[#8B8E8B]/60">
                        Pick subject → chapter → top N topics
                    </p>
                </div>
                <span className="shrink-0 text-[#8B8E8B]/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </span>
            </button>

            <button
                type="button"
                onClick={() => setStep(prev => prev + 1)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-4 py-3 text-left"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                        <path d="M5 19l1 2M19 19l-1 2" />
                    </svg>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="[font-family:Poppins,sans-serif] text-[13px] font-black">
                        Mystery Test
                        <span className="ml-1.5 rounded-full bg-purple-400/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] text-purple-300">
                            Surprise me
                        </span>
                    </p>
                    <p className="text-[11px] text-[#8B8E8B]/60">
                        35% weak · 45% improving · 20% strong
                    </p>
                </div>
                <span className="shrink-0 text-[#8B8E8B]/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </span>
            </button>
        </div>
    )
}

export default SmartSelectStep1