import React from 'react'
import ChapterCard from './ChapterCard'

const SubjectCard = () => {
  return (
    <details className="subject-disclosure overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/90 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <summary className="cursor-pointer border-b border-white/[0.06] bg-white/[0.04] px-5 py-4 transition hover:bg-white/[0.07]">
        <div className="flex items-center gap-3">
            <span className="subject-chevron inline-flex h-6 w-6 shrink-0 items-center justify-center text-white/60 transition-transform">▸</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-white">C</span>
            <div className="min-w-0 text-left">
            <h2 className="text-lg font-bold text-white">Chemistry</h2>
            <p className="text-xs text-white/45">· tap to show chapters</p>
            </div>
        </div>
        </summary>
        <div className="space-y-0 divide-y divide-white/[0.06] px-3 py-2 sm:px-4">
            <ChapterCard />
        </div>
    </details>
  )
}

export default SubjectCard