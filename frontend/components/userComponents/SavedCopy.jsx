import React from 'react'

const SavedCopy = () => {
    return (
        <section id="section-saved" className="space-y-4">

            <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">Saved Copy</h2>
                <span className="text-[10px] font-[Inter] text-[#A8ACA8]">8 bookmarked</span>
            </div>

            <div className="relative">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8ACA8] pointer-events-none">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" placeholder="Search questions, chapters, topics..."
                    className="w-full bg-[#222422] border border-[#2E302E] rounded-xl pl-9 pr-4 py-2.5 text-[13px] font-[Inter] text-white placeholder-[#A8ACA8] focus:outline-none focus:border-[#FFC600]/50 transition-colors"/>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 bg-[#FFC600] text-[#181A18] shadow-[0_0_12px_rgba(255,198,0,0.25)]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                All
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#181A18]/20 text-[#181A18]">8</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 bg-[#222422] border border-[#2E302E] text-[#A8ACA8] hover:text-white">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
                Biology
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2A2C2A]/30 text-[#A8ACA8]">3</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 bg-[#222422] border border-[#2E302E] text-[#A8ACA8] hover:text-white">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M19.5 9.5c1.4 1.4 1.4 3.6 0 5l-3.4 3.4c-1.4 1.4-3.6 1.4-5 0l-5-5c-1.4-1.4-1.4-3.6 0-5l3.4-3.4c1.4-1.4 3.6-1.4 5 0z"/></svg>
                Chemistry
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2A2C2A]/30 text-[#A8ACA8]">2</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 bg-[#222422] border border-[#2E302E] text-[#A8ACA8] hover:text-white">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Physics
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2A2C2A]/30 text-[#A8ACA8]">2</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 bg-[#222422] border border-[#2E302E] text-[#A8ACA8] hover:text-white">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                English
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2A2C2A]/30 text-[#A8ACA8]">1</span>
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 bg-[#222422] border border-[#2E302E] text-[#A8ACA8] hover:text-white">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                LR
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2A2C2A]/30 text-[#A8ACA8]">0</span>
                </button>

            </div>

            <div className="space-y-3">

                <div className="bg-[#222422] border border-[#2E302E] rounded-xl overflow-hidden">
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-[Inter] font-semibold bg-emerald-400/10 text-emerald-400">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
                        Biology
                        </span>
                        <span className="text-[11px] font-[Inter] text-[#A8ACA8] bg-[#2A2C2A]/20 px-2.5 py-1 rounded-full">Cell Biology</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-[Inter] text-[#A8ACA8] hidden sm:block">Today</span>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#A8ACA8] hover:text-red-400 hover:bg-red-400/10 transition-all" title="Remove bookmark">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                            <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                        </button>
                    </div>
                    </div>
                    <p className="font-[Inter] font-medium text-white text-[14px] leading-relaxed">
                    Which organelle is responsible for producing ATP through aerobic respiration and is often called the 'powerhouse of the cell'?
                    </p>
                </div>
                <button className="w-full flex items-center justify-between px-4 py-2.5 border-t border-[#2E302E]/60 text-[#A8ACA8] hover:text-[#FFC600] hover:bg-[#FFC600]/5 transition-all">
                    <span className="font-[Inter] font-semibold text-[12px] uppercase tracking-wide">Show Answer</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                </div>

                <div className="bg-[#222422] border border-[#2E302E] rounded-xl overflow-hidden">
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-[Inter] font-semibold bg-violet-400/10 text-violet-400">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M19.5 9.5c1.4 1.4 1.4 3.6 0 5l-3.4 3.4c-1.4 1.4-3.6 1.4-5 0l-5-5c-1.4-1.4-1.4-3.6 0-5l3.4-3.4c1.4-1.4 3.6-1.4 5 0z"/></svg>
                        Chemistry
                        </span>
                        <span className="text-[11px] font-[Inter] text-[#A8ACA8] bg-[#2A2C2A]/20 px-2.5 py-1 rounded-full">Chemical Bonding</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-[Inter] text-[#A8ACA8] hidden sm:block">Today</span>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#A8ACA8] hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                            <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                        </button>
                    </div>
                    </div>
                    <p className="font-[Inter] font-medium text-white text-[14px] leading-relaxed">
                    What is the hybridization of the central carbon atom in ethyne (C₂H₂)?
                    </p>
                </div>
                <button className="w-full flex items-center justify-between px-4 py-2.5 border-t border-[#2E302E]/60 text-[#FFC600] bg-[#FFC600]/5 transition-all">
                    <span className="font-[Inter] font-semibold text-[12px] uppercase tracking-wide">Hide Answer</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                </button>

                <div className="px-4 pb-4 pt-1 space-y-3">
                    <div className="space-y-2">
                    <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg border bg-[#2A2C2A]/10 border-[#2E302E]/40">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold mt-[1px] bg-[#2A2C2A]/30 text-[#A8ACA8]">A</span>
                        <span className="font-[Inter] text-[13px] leading-snug text-[#A8ACA8]">sp³</span>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg border bg-[#2A2C2A]/10 border-[#2E302E]/40">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold mt-[1px] bg-[#2A2C2A]/30 text-[#A8ACA8]">B</span>
                        <span className="font-[Inter] text-[13px] leading-snug text-[#A8ACA8]">sp²</span>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg border bg-emerald-500/10 border-emerald-500/40">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold mt-[1px] bg-emerald-500 text-white">C</span>
                        <span className="font-[Inter] text-[13px] leading-snug text-emerald-300 font-semibold">
                        sp
                        <span className="ml-2 text-[10px] font-bold text-emerald-400 uppercase">✓ Correct</span>
                        </span>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-2.5 rounded-lg border bg-[#2A2C2A]/10 border-[#2E302E]/40">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold mt-[1px] bg-[#2A2C2A]/30 text-[#A8ACA8]">D</span>
                        <span className="font-[Inter] text-[13px] leading-snug text-[#A8ACA8]">sp³d</span>
                    </div>
                    </div>
                    <div className="callout-yellow rounded-r-lg py-3 px-4 bg-[#181A18]">
                    <p className="text-[11px] font-[Inter] font-bold text-[#FFC600] uppercase tracking-wide mb-1.5">Explanation</p>
                    <p className="font-[Inter] text-[13px] text-[#CCCCCC] leading-relaxed">
                        In ethyne (acetylene), each carbon forms one sigma bond with hydrogen and one sigma + two pi bonds with the other carbon (triple bond). This requires only two hybrid orbitals → sp hybridization. Bond angle = 180°, linear geometry.
                    </p>
                    </div>
                </div>
                </div>

                <div className="bg-[#222422] border border-[#2E302E] rounded-xl overflow-hidden">
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-[Inter] font-semibold bg-sky-400/10 text-sky-400">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        Physics
                        </span>
                        <span className="text-[11px] font-[Inter] text-[#A8ACA8] bg-[#2A2C2A]/20 px-2.5 py-1 rounded-full">Waves</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-[Inter] text-[#A8ACA8] hidden sm:block">Yesterday</span>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#A8ACA8] hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                            <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                        </button>
                    </div>
                    </div>
                    <p className="font-[Inter] font-medium text-white text-[14px] leading-relaxed">
                    An ambulance moving toward a stationary observer emits a siren at 500 Hz. If the speed of sound is 340 m/s and the ambulance speed is 40 m/s, what frequency does the observer hear?
                    </p>
                </div>
                <button className="w-full flex items-center justify-between px-4 py-2.5 border-t border-[#2E302E]/60 text-[#A8ACA8] hover:text-[#FFC600] hover:bg-[#FFC600]/5 transition-all">
                    <span className="font-[Inter] font-semibold text-[12px] uppercase tracking-wide">Show Answer</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                </div>

                <div className="bg-[#222422] border border-[#2E302E] rounded-xl overflow-hidden">
                <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-[Inter] font-semibold bg-emerald-400/10 text-emerald-400">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
                        Biology
                        </span>
                        <span className="text-[11px] font-[Inter] text-[#A8ACA8] bg-[#2A2C2A]/20 px-2.5 py-1 rounded-full">Genetics</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-[Inter] text-[#A8ACA8] hidden sm:block">Yesterday</span>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#A8ACA8] hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                            <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                        </button>
                    </div>
                    </div>
                    <p className="font-[Inter] font-medium text-white text-[14px] leading-relaxed">
                    In a dihybrid cross between two heterozygous parents (AaBb × AaBb), what is the expected phenotypic ratio?
                    </p>
                </div>
                <button className="w-full flex items-center justify-between px-4 py-2.5 border-t border-[#2E302E]/60 text-[#A8ACA8] hover:text-[#FFC600] hover:bg-[#FFC600]/5 transition-all">
                    <span className="font-[Inter] font-semibold text-[12px] uppercase tracking-wide">Show Answer</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                </div>

            </div>
        </section>
    )
}

export default SavedCopy