import React from 'react'

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
                <input id="top-chem-1" type="checkbox" name="topics" value="chem-hydrocarbons" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#121212] text-[#FFC600] focus:ring-[#FFC600]/40" />
                <label htmlFor="top-chem-1" className="text-sm leading-snug text-white/90">Hydrocarbons &amp; nomenclature</label>
            </li>
            <li className="flex items-start gap-3">
                <input id="top-chem-2" type="checkbox" name="topics" value="chem-functional" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#121212] text-[#FFC600] focus:ring-[#FFC600]/40" />
                <label htmlFor="top-chem-2" className="text-sm leading-snug text-white/90">Functional groups</label>
            </li>
            </ul>
        </details>
        <details className="chapter-disclosure rounded-xl">
            <summary className="cursor-pointer px-2 py-3 text-left transition hover:bg-white/[0.03] sm:px-3">
            <div className="flex items-start gap-2">
                <span className="chapter-chevron mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-xs text-white/50 transition-transform">▸</span>
                <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Chapter 2</p>
                <p className="text-sm font-medium text-white/90">Chemical equilibrium</p>
                </div>
            </div>
            </summary>
            <ul className="space-y-2 border-l border-white/[0.06] pb-4 pl-8 pr-2 pt-1 sm:pl-10">
            <li className="flex items-start gap-3">
                <input id="top-chem-3" type="checkbox" name="topics" value="chem-acid-base" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#121212] text-[#FFC600] focus:ring-[#FFC600]/40" />
                <label htmlFor="top-chem-3" className="text-sm leading-snug text-white/90">Acids, bases &amp; pH</label>
            </li>
            </ul>
        </details>
        </div>
    </details>
  )
}

export default SubjectCard