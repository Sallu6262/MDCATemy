import React, { useEffect, useState } from 'react'
import TestSyllabusPopUp from './TestSyllabusPopUp';
import { useNavigate } from 'react-router-dom';

const UpcomingTestCard = ({upcomingTest}) => {
    const [syllabusHidden, setSyllabusHidden] = useState(true);

    const navigate = useNavigate();

    const todayDate = new Date(Date.now()).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const testDate = new Date(upcomingTest?.test_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }); 

    return (
        <>
        {
            upcomingTest ?
            <>
            {
                !syllabusHidden ? <TestSyllabusPopUp test={upcomingTest} setSyllabusHidden={setSyllabusHidden}/> : ''
            }
            <section>
                <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                    <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">Next Up</h2>
                </div>

                <div className="relative bg-[#222422] border-2 border-[#2E302E] rounded-2xl overflow-hidden shadow-[6px_6px_0px_rgba(255,198,0,0.2)]">

                    <div className="bg-[#FFC600] border-b-2 border-[#181A18] px-4 py-2 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[12px] font-[Poppins] font-black uppercase tracking-[0.14em] text-[#181A18] min-w-0">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                        </svg>
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-[Poppins] font-black uppercase tracking-[0.12em] text-[#181A18] bg-[#181A18]/10 rounded-full px-2 py-0.5 border border-[#181A18]/20 shrink-0">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                        <path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>
                        </svg>
                        CHAPTER
                    </span>
                    </div>

                    <div className="px-5 pt-4 pb-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h2 className="font-black text-white text-[22px] leading-tight flex-1">
                        {upcomingTest?.test_name}
                        </h2>
                        <span className="flex items-center gap-1 text-[9px] font-[Poppins] font-black uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border-2 shrink-0 bg-[#FFC600] text-[#181A18] border-[#181A18]">
                        {testDate === todayDate ? 'LIVE' : 'COMING SOON'}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#A8ACA8] text-[11px] font-[Inter] mb-4">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                        </svg>
                        <span>{testDate === todayDate ? 'Available now' : 'Not Available Yet'} - {testDate}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                        <div className="bg-[#181A18] border-2 border-[#2E302E] rounded-xl p-2.5 flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-[#FFC600] border-2 border-[#181A18] rounded-lg flex items-center justify-center shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>
                            <path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="font-[Poppins] font-black text-white text-[18px] leading-none">{upcomingTest?.mcq_count}</p>
                            <p className="text-[#A8ACA8] text-[9px] font-[Inter] uppercase tracking-[0.1em] mt-1">MCQs</p>
                        </div>
                        </div>
                        <div className="bg-[#181A18] border-2 border-[#2E302E] rounded-xl p-2.5 flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-[#FFC600] border-2 border-[#181A18] rounded-lg flex items-center justify-center shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="10" y1="2" x2="14" y2="2"/>
                            <line x1="12" y1="14" x2="15" y2="11"/>
                            <circle cx="12" cy="14" r="8"/>
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="font-[Poppins] font-black text-white text-[18px] leading-none">{upcomingTest?.test_time}</p>
                            <p className="text-[#A8ACA8] text-[9px] font-[Inter] uppercase tracking-[0.1em] mt-1">Minutes</p>
                        </div>
                        </div>
                    </div>

                    <div className="flex gap-2.5">
                        <button onClick={() => setSyllabusHidden(false)} className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 px-4 py-3 bg-[#181A18] border-2 border-[#2E302E] rounded-xl text-white text-[12px] font-[Poppins] font-black uppercase tracking-[0.08em] shadow-[3px_3px_0px_rgba(255,198,0,0.12)] hover:border-[#FFC600] hover:text-[#FFC600] transition-all duration-150">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 7v14"/>
                            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                        </svg>
                        Syllabus
                        </button>
                        {
                            todayDate === testDate ?
                            <button onClick={() => {navigate(`/test-series/start-test/${upcomingTest?.test_id}`)}} disabled={testDate !== todayDate} className={`cursor-pointer flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-[12px] font-[Poppins] font-black uppercase tracking-[0.08em] bg-[#FFC600] text-[#181A18] border-2 border-[#181A18] shadow-[3px_3px_0px_rgba(0,0,0,0.55)] transition-all duration-150`}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="6 3 20 12 6 21 6 3"/>
                                </svg>
                                Start Test
                            </button>
                            : ''
                        }
                    </div>
                    </div>
                </div>
            </section>
            </>
            : 
            ''
        }
        </>
    )
}

export default React.memo(UpcomingTestCard)