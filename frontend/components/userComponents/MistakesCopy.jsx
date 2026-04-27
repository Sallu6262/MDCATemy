import React from 'react'

const MistakesCopy = () => {
    return (
        <section id="section-mistakes" className="space-y-5">

            <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">Mistakes Copy</h2>
                <span className="text-[10px] font-[Inter] text-[#A8ACA8]">10 logged · 2 mastered</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                <div className="bg-[#222422] border border-red-500/15 bg-red-500/5 rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">10</p>
                <p className="text-[10px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Total</p>
                </div>

                <div className="bg-[#222422] border border-[#2E302E] rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8]">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">8</p>
                <p className="text-[10px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Pending</p>
                </div>

                <div className="bg-[#222422] border border-[#FFC600]/15 bg-[#FFC600]/5 rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFC600]">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">2</p>
                <p className="text-[10px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Mastered</p>
                </div>

                <div className="bg-[#222422] border border-emerald-500/15 bg-emerald-500/5 rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">20%</p>
                <p className="text-[10px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Mastery</p>
                </div>
            </div>

            <div className="flex justify-center">
                <button className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FFC600] text-[#181A18] text-[15px] font-[Poppins] font-black uppercase tracking-wide hover:bg-[#FFC600]-dark transition-colors shadow-[0_0_28px_rgba(255,198,0,0.35)] w-full sm:w-auto sm:min-w-[320px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                </svg>
                Re-test All Mistakes
                <span className="bg-[#181A18]/15 px-2.5 py-1 rounded-full text-[12px] font-black">8</span>
                </button>
            </div>

            <div className="space-y-3">
                <div className="flex gap-2">
                <div className="flex-1 relative">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8ACA8] pointer-events-none">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input type="text" placeholder="Search question, chapter or topic..."
                        className="w-full bg-[#222422] border border-[#2E302E] rounded-xl pl-9 pr-4 py-2.5 text-white font-[Inter] text-[13px] placeholder:text-[#A8ACA8]/50 focus:outline-none focus:border-[#FFC600]/50 transition-colors"/>
                </div>
                <button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border font-[Inter] text-[12px] font-bold border-[#2E302E] text-[#A8ACA8] hover:border-[#A8ACA8]/40 transition-all">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                    Filters
                </button>
                </div>
            </div>

            <div className="space-y-3">

                <div className="mistake-card bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#10B981' }}></span>
                    <span className="text-[10px] font-[Inter] font-bold text-[#A8ACA8] uppercase tracking-[0.1em]">Biology</span>
                    <span className="text-[#2E302E]">·</span>
                    <span className="text-[10px] font-[Inter] text-[#A8ACA8]/70">Bioenergetics</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full border text-[9px] font-[Inter] font-black uppercase tracking-[0.08em] text-red-400 bg-red-400/10 border-red-400/25">Hard</span>
                    </div>

                    <p className="font-[Inter] text-white text-[14px] leading-relaxed mb-4">
                    The oxygen released during photosynthesis comes from the splitting of:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-red-500/8 border border-red-500/25">
                        <div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-red-400 mb-0.5">Your Answer</p>
                        <p className="text-red-300 font-[Inter] text-[12px] leading-snug">A. Carbon dioxide</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/25">
                        <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-emerald-400 mb-0.5">Correct Answer</p>
                        <p className="text-emerald-300 font-[Inter] text-[12px] leading-snug">B. Water</p>
                        </div>
                    </div>
                    </div>

                    <div className="mistake-expanded hidden">
                    <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/30 bg-red-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-red-500 text-white">A</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-red-300">Carbon dioxide</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-emerald-500 text-white">B</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-emerald-300">Water</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">C</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">Glucose</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">D</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">ATP</span>
                        </div>
                    </div>
                    <div className="callout-yellow bg-[#181A18] rounded-r-xl p-3.5 mb-3">
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.12em] text-[#FFC600] mb-1.5">Explanation</p>
                        <p className="text-white/85 font-[Inter] text-[13px] leading-relaxed">
                        During the light-dependent reactions, water molecules are split by photolysis (2H₂O → 4H⁺ + 4e⁻ + O₂). The oxygen released is entirely from water, not CO₂.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                    <button className="mistake-toggle flex items-center gap-1.5 text-[11px] font-[Inter] font-bold text-[#FFC600] hover:underline">
                        <svg className="icon-eye" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg className="icon-eye-off hidden" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" y1="2" x2="22" y2="22"/>
                        </svg>
                        <span className="label-default">All options &amp; explanation</span>
                        <span className="label-expanded hidden">Collapse</span>
                        <svg className="chev-down" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        <svg className="chev-up hidden" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-[Inter] font-bold hover:bg-emerald-500/20 transition-all">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                        Mark Mastered
                    </button>
                    </div>
                </div>
                </div>

                <div className="mistake-card bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#38BDF8' }}></span>
                    <span className="text-[10px] font-[Inter] font-bold text-[#A8ACA8] uppercase tracking-[0.1em]">Chemistry</span>
                    <span className="text-[#2E302E]">·</span>
                    <span className="text-[10px] font-[Inter] text-[#A8ACA8]/70">Electrochemistry</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full border text-[9px] font-[Inter] font-black uppercase tracking-[0.08em] text-amber-400 bg-amber-400/10 border-amber-400/25">Medium</span>
                    </div>

                    <p className="font-[Inter] text-white text-[14px] leading-relaxed mb-4">
                    In a galvanic cell, the salt bridge serves to:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-red-500/8 border border-red-500/25">
                        <div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-red-400 mb-0.5">Your Answer</p>
                        <p className="text-red-300 font-[Inter] text-[12px] leading-snug">A. Transfer electrons between half-cells</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/25">
                        <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-emerald-400 mb-0.5">Correct Answer</p>
                        <p className="text-emerald-300 font-[Inter] text-[12px] leading-snug">B. Maintain electrical neutrality in both solutions</p>
                        </div>
                    </div>
                    </div>

                    <div className="mistake-expanded hidden">
                    <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/30 bg-red-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-red-500 text-white">A</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-red-300">Transfer electrons between half-cells</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-emerald-500 text-white">B</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-emerald-300">Maintain electrical neutrality in both solutions</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">C</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">Conduct heat between the two cells</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">D</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">Store excess electrons</span>
                        </div>
                    </div>
                    <div className="callout-yellow bg-[#181A18] rounded-r-xl p-3.5 mb-3">
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.12em] text-[#FFC600] mb-1.5">Explanation</p>
                        <p className="text-white/85 font-[Inter] text-[13px] leading-relaxed">
                        The salt bridge contains an inert electrolyte that lets ions migrate between half-cells, balancing the charge buildup as electrons flow through the external circuit. Electrons themselves never travel through the salt bridge.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                    <button className="mistake-toggle flex items-center gap-1.5 text-[11px] font-[Inter] font-bold text-[#FFC600] hover:underline">
                        <svg className="icon-eye" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg className="icon-eye-off hidden" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" y1="2" x2="22" y2="22"/>
                        </svg>
                        <span className="label-default">All options &amp; explanation</span>
                        <span className="label-expanded hidden">Collapse</span>
                        <svg className="chev-down" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        <svg className="chev-up hidden" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-[Inter] font-bold hover:bg-emerald-500/20 transition-all">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                        Mark Mastered
                    </button>
                    </div>
                </div>
                </div>

                <div className="mistake-card bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#A78BFA' }}></span>
                    <span className="text-[10px] font-[Inter] font-bold text-[#A8ACA8] uppercase tracking-[0.1em]">Physics</span>
                    <span className="text-[#2E302E]">·</span>
                    <span className="text-[10px] font-[Inter] text-[#A8ACA8]/70">Waves &amp; Sound</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full border text-[9px] font-[Inter] font-black uppercase tracking-[0.08em] text-red-400 bg-red-400/10 border-red-400/25">Hard</span>
                    </div>

                    <p className="font-[Inter] text-white text-[14px] leading-relaxed mb-4">
                    A sound source moves AWAY from a stationary observer at half the speed of sound. The observed frequency will be:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-red-500/8 border border-red-500/25">
                        <div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-red-400 mb-0.5">Your Answer</p>
                        <p className="text-red-300 font-[Inter] text-[12px] leading-snug">C. Half the original</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/25">
                        <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-emerald-400 mb-0.5">Correct Answer</p>
                        <p className="text-emerald-300 font-[Inter] text-[12px] leading-snug">B. Two-thirds of the original</p>
                        </div>
                    </div>
                    </div>

                    <div className="mistake-expanded hidden">
                    <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">A</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">Same as the original frequency</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-emerald-500 text-white">B</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-emerald-300">Two-thirds of the original</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/30 bg-red-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-red-500 text-white">C</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-red-300">Half the original</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">D</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">Twice the original</span>
                        </div>
                    </div>
                    <div className="callout-yellow bg-[#181A18] rounded-r-xl p-3.5 mb-3">
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.12em] text-[#FFC600] mb-1.5">Explanation</p>
                        <p className="text-white/85 font-[Inter] text-[13px] leading-relaxed">
                        For a receding source: f' = f · v / (v + v′). With v′ = v/2, denominator becomes 1.5v, so f' = f · (v / 1.5v) = ⅔ f. "Half" is a common trap when students confuse "half the speed" with "half the frequency".
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                    <button className="mistake-toggle flex items-center gap-1.5 text-[11px] font-[Inter] font-bold text-[#FFC600] hover:underline">
                        <svg className="icon-eye" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg className="icon-eye-off hidden" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" y1="2" x2="22" y2="22"/>
                        </svg>
                        <span className="label-default">All options &amp; explanation</span>
                        <span className="label-expanded hidden">Collapse</span>
                        <svg className="chev-down" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        <svg className="chev-up hidden" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-[Inter] font-bold hover:bg-emerald-500/20 transition-all">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                        Mark Mastered
                    </button>
                    </div>
                </div>
                </div>

                <div className="mistake-card bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#2DD4BF' }}></span>
                    <span className="text-[10px] font-[Inter] font-bold text-[#A8ACA8] uppercase tracking-[0.1em]">English</span>
                    <span className="text-[#2E302E]">·</span>
                    <span className="text-[10px] font-[Inter] text-[#A8ACA8]/70">Vocabulary</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full border text-[9px] font-[Inter] font-black uppercase tracking-[0.08em] text-emerald-400 bg-emerald-400/10 border-emerald-400/25">Easy</span>
                    </div>

                    <p className="font-[Inter] text-white text-[14px] leading-relaxed mb-4">
                    The antonym of 'LOQUACIOUS' is:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-red-500/8 border border-red-500/25">
                        <div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-red-400 mb-0.5">Your Answer</p>
                        <p className="text-red-300 font-[Inter] text-[12px] leading-snug">B. Eloquent</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/25">
                        <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.1em] text-emerald-400 mb-0.5">Correct Answer</p>
                        <p className="text-emerald-300 font-[Inter] text-[12px] leading-snug">C. Taciturn</p>
                        </div>
                    </div>
                    </div>

                    <div className="mistake-expanded hidden">
                    <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">A</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">Verbose</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/30 bg-red-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-red-500 text-white">B</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-red-300">Eloquent</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-emerald-500 text-white">C</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-emerald-300">Taciturn</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">D</div>
                        <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">Articulate</span>
                        </div>
                    </div>
                    <div className="callout-yellow bg-[#181A18] rounded-r-xl p-3.5 mb-3">
                        <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.12em] text-[#FFC600] mb-1.5">Explanation</p>
                        <p className="text-white/85 font-[Inter] text-[13px] leading-relaxed">
                        'Loquacious' means very talkative; its antonym is 'Taciturn' — reserved or silent. 'Verbose', 'Eloquent', and 'Articulate' are all near-synonyms that describe expressive speech.
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                    <button className="mistake-toggle flex items-center gap-1.5 text-[11px] font-[Inter] font-bold text-[#FFC600] hover:underline">
                        <svg className="icon-eye" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg className="icon-eye-off hidden" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" y1="2" x2="22" y2="22"/>
                        </svg>
                        <span className="label-default">All options &amp; explanation</span>
                        <span className="label-expanded hidden">Collapse</span>
                        <svg className="chev-down" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        <svg className="chev-up hidden" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-[Inter] font-bold hover:bg-emerald-500/20 transition-all">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                        Mark Mastered
                    </button>
                    </div>
                </div>
                </div>

            </div>

            <div className="border border-[#2E302E] rounded-2xl overflow-hidden">
                <button className="w-full flex items-center justify-between px-5 py-4 bg-[#222422] hover:bg-[#2A2C2A]/20 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                    </div>
                    <span className="font-[Inter] font-bold text-[13px] text-white">Mastered</span>
                    <span className="text-[11px] font-[Inter] text-emerald-400 font-bold">2 cleared</span>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8]"><polyline points="18 15 12 9 6 15"/></svg>
                </button>

                <div className="divide-y divide-[#2E302E]/40">
                <div className="px-5 py-3 flex items-center justify-between gap-3 bg-[#222422]/50">
                    <div className="min-w-0">
                    <p className="font-[Inter] text-[13px] text-[#A8ACA8]/70 truncate">When resistors are connected in parallel, the total resistance is:</p>
                    <p className="text-[10px] font-[Inter] text-[#A8ACA8]/50 mt-0.5">Physics · Electricity</p>
                    </div>
                    <button className="text-[#A8ACA8] hover:text-[#FFC600] whitespace-nowrap flex-shrink-0" title="Move back to pending">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                    </button>
                </div>
                <div className="px-5 py-3 flex items-center justify-between gap-3 bg-[#222422]/50">
                    <div className="min-w-0">
                    <p className="font-[Inter] text-[13px] text-[#A8ACA8]/70 truncate">After 3 half-lives, the fraction of a radioactive sample remaining is:</p>
                    <p className="text-[10px] font-[Inter] text-[#A8ACA8]/50 mt-0.5">Physics · Nuclear Physics</p>
                    </div>
                    <button className="text-[#A8ACA8] hover:text-[#FFC600] whitespace-nowrap flex-shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                    </button>
                </div>
                </div>
            </div>

        </section>
    )
}

export default MistakesCopy