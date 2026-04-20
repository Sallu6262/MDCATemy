import React from 'react'
import TopicCard from './TopicCard'

const ChapterCard = () => {
    return (
        <details className="chapter-disclosure rounded-xl">
            <summary className="cursor-pointer px-2 py-3 text-left transition hover:bg-white/[0.03] sm:px-3">
            <div className="flex items-start gap-2">
                <span className="chapter-chevron mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-xs text-white/50 transition-transform">▸</span>
                <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Chapter 1</p>
                <p className="text-sm font-medium text-white/90">Organic chemistry</p>
                </div>
            </div>
            </summary>
            <ul className="space-y-2 border-l border-white/[0.06] pb-4 pl-8 pr-2 pt-1 sm:pl-10">
            <li className="flex items-start gap-3">
                <TopicCard />
            </li>
            <li className="flex items-start gap-3">
                <TopicCard />
            </li>
            </ul>
        </details>
    )
}

export default ChapterCard