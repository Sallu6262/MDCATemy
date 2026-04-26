import React from 'react'
import { Link } from 'react-router-dom';

const UpcomingTestsList = ({upcomingTests}) => {
    return (
        <>
            {
                upcomingTests?.length - 1 ?
                <section>
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                        <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">More Coming Up</h2>
                    </div>

                    <Link to="/test-series/all-upcoming-tests" className="cursor-pointer group w-full bg-[#222422] border-2 border-[#2E302E] hover:border-[#FFC600] rounded-2xl px-4 py-3.5 flex flex-col gap-3 shadow-[4px_4px_0px_rgba(255,198,0,0.12)] transition-all duration-150">

                        <div className="flex items-center gap-3.5 w-full">
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
                            See All Upcoming Tests
                            </p>
                            <p className="text-[#A8ACA8] text-[11px] font-[Inter] mt-0.5 truncate">
                            {upcomingTests?.length - 1} more tests scheduled ahead
                            </p>
                        </div>
                        <div className="w-8 h-8 bg-[#181A18] border-2 border-[#2E302E] group-hover:border-[#FFC600] group-hover:bg-[#FFC600] rounded-lg flex items-center justify-center shrink-0 transition-all">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8] group-hover:text-[#181A18]">
                            <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </div>
                        </div>

                        <div className="w-full flex flex-col gap-1.5 pt-2 border-t-2 border-dashed border-[#2E302E]/70">
                        <div className="flex items-center justify-between gap-2 text-left">
                            <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[9px] font-[Poppins] font-black uppercase tracking-[0.14em] text-[#FFC600] shrink-0">Topic</span>
                            <span className="font-[Inter] font-bold text-white text-[11.5px] truncate">{upcomingTests?.[1]?.test_name}</span>
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-[Inter] font-bold text-[#A8ACA8] shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                            </svg>
                            {
                                new Date(upcomingTests?.[1]?.test_date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })
                            }
                            </span>
                        </div>

                        {
                            upcomingTests?.length >= 3 ? 
                            <div className="flex items-center justify-between gap-2 text-left">
                                <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[9px] font-[Poppins] font-black uppercase tracking-[0.14em] text-[#FFC600] shrink-0">Full</span>
                                <span className="font-[Inter] font-bold text-white text-[11.5px] truncate">{upcomingTests?.[2]?.test_name}</span>
                                </div>
                                <span className="flex items-center gap-1 text-[10px] font-[Inter] font-bold text-[#A8ACA8] shrink-0">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                                    <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                                </svg>
                                {
                                    new Date(upcomingTests?.[2]?.test_date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                }
                                </span>
                            </div> :
                            ''
                        }

                        {upcomingTests?.length > 3 ? <p className="text-[10px] font-[Inter] font-bold text-[#A8ACA8]/70 text-left">+{upcomingTests?.length - 3} more...</p> : ''}
                        </div>
                    </Link>
                </section>
                :
                ''
            }
        </>
    )
}

export default React.memo(UpcomingTestsList)