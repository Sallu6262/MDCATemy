import React from 'react'

const ExistingTestCard = () => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex shrink-0 items-start gap-3 pt-0.5">
            <input id="t1" type="checkbox" name="test_ids" value="ct-2025-001" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#1A1A1A] text-[#FFC600] focus:ring-[#FFC600]/40" />
            <label htmlFor="t1" className="sr-only">Select Full Syllabus Mock 01</label>
            </div>
            <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">Full Syllabus Mock 01</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                <span><span className="text-white/35">Date</span> · 12 Mar 2026</span>
                <span><span className="text-white/35">MCQs</span> · 200</span>
                <span><span className="text-white/35">Time</span> · 150 min</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/70">Biology</span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/70">Chemistry</span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/70">Physics</span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/70">English</span>
            </div>
            </div>
        </div>
    )
}

export default ExistingTestCard