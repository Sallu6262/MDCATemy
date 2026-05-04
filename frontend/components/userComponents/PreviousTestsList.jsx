import React from 'react'
import { Link } from 'react-router-dom'

const PreviousTestsList = ({previousTests}) => {
    // console.log(previousTests);
    return (
        <>
        {
            previousTests?.length ?
            <section>
                <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                    <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">Previous Tests</h2>
                </div>

                <Link to="/dashboard/test-series/previous-tests" className="cursor-pointer group w-full bg-[#222422] border-2 border-[#2E302E] hover:border-[#FFC600] rounded-2xl px-4 py-3.5 flex items-center gap-3.5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)] transition-all duration-150">
                    <div className="w-11 h-11 bg-[#FFC600] border-2 border-[#181A18] rounded-xl flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                    <p className="font-[Poppins] font-black text-white text-[14px] leading-tight group-hover:text-[#FFC600] transition-colors">
                        See All Previous Tests
                    </p>
                    <p className="text-[#A8ACA8] text-[11px] font-[Inter] mt-0.5 truncate">
                        {previousTests?.length} tests - scores, syllabus &amp; answers
                    </p>
                    </div>
                    <div className="w-8 h-8 bg-[#181A18] border-2 border-[#2E302E] group-hover:border-[#FFC600] group-hover:bg-[#FFC600] rounded-lg flex items-center justify-center shrink-0 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8] group-hover:text-[#181A18]">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    </div>
                </Link>
            </section>
            :
            ''
        }
        </>
    )
}

export default React.memo(PreviousTestsList)