import React from 'react'

const UserScheduleCard = () => {
    return (
        <section>
            <div className="flex items-center gap-2 mb-2.5">
                <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">Full Schedule</h2>
            </div>

            <button className="cursor-pointer group w-full bg-[#222422] border-2 border-[#2E302E] hover:border-[#FFC600] rounded-2xl px-4 py-3.5 flex items-center gap-3.5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)] transition-all duration-150">
                <div className="w-11 h-11 bg-[#FFC600] border-2 border-[#181A18] rounded-xl flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                    <path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/>
                    <path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
                </svg>
                </div>
                <div className="flex-1 min-w-0 text-left">
                <p className="font-[Poppins] font-black text-white text-[14px] leading-tight group-hover:text-[#FFC600] transition-colors">
                    View Schedule
                </p>
                <p className="text-[#A8ACA8] text-[11px] font-[Inter] mt-0.5 truncate">
                    All upcoming test dates at a glance
                </p>
                </div>
                <div className="w-8 h-8 bg-[#181A18] border-2 border-[#2E302E] group-hover:border-[#FFC600] group-hover:bg-[#FFC600] rounded-lg flex items-center justify-center shrink-0 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8] group-hover:text-[#181A18]">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
                </div>
            </button>
        </section>
    )
}

export default React.memo(UserScheduleCard)