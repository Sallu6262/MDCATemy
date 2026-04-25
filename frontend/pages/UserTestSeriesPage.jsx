import React, { useState, useEffect } from 'react'
import UpcomingTestCard from '../components/userComponents/UpcomingTestCard'
import { useNavigate } from 'react-router-dom';

const UserTestSeriesPage = () => {
    // const [recentUpcomingTest, setRecentUpcomingTest] = useState(null);
    const [upcomingTests, setUpcomingTests] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUpcomingTests = async () => {
            const res = await fetch(`${API_URL}/tests/upcoming`,{
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();
            
            if(data.status === 'success'){
                setUpcomingTests(data.data);
            }
        }

        fetchUpcomingTests();
    },[]);
    
    return (
        <>
            <style>
                {
                    `
                        * { box-sizing: border-box; }
                        ::-webkit-scrollbar { width: 6px; }
                        ::-webkit-scrollbar-track { background: #181A18; }
                        ::-webkit-scrollbar-thumb { background: #FFC600; border-radius: 3px; }
                        ::selection { background: rgba(255,198,0,0.3); color: #fff; }
                    `
                }
            </style>
            <main className="flex-1 overflow-hidden pb-[58px] lg:pb-0 w-full flex justify-center items-center">
                <div className="h-full overflow-y-auto w-[80%]">
                <div className="w-full px-4 pt-4 pb-6 space-y-5 lg:max-w-5xl lg:ml-0 lg:mr-auto lg:px-8">

                    <div>
                    <div className="flex items-center gap-2 mb-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/>
                        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
                        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
                        </svg>
                        <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.16em] text-[#FFC600]">
                        Test Series
                        </p>
                    </div>
                    <h1 className="font-[Poppins] font-black text-white text-[22px] leading-tight">
                        MDCATEMY Test Series
                    </h1>
                    <p className="text-[#A8ACA8] text-[14px] font-[Inter] mt-1">
                        A rolling mix of chapter drills, topic quizzes and full PMDC-style mocks.
                        Schedule shifts - show up when your test does.
                    </p>
                    </div>

                    <UpcomingTestCard upcomingTest={upcomingTests[upcomingTests?.length-1]}/>

                   <section>
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                        <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">More Coming Up</h2>
                    </div>

                    <button className="group w-full bg-[#222422] border-2 border-[#2E302E] hover:border-[#FFC600] rounded-2xl px-4 py-3.5 flex flex-col gap-3 shadow-[4px_4px_0px_rgba(255,198,0,0.12)] transition-all duration-150">

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
                            3 more tests scheduled ahead
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
                            <span className="font-[Inter] font-bold text-white text-[11.5px] truncate">Hybridization Topic Drill</span>
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-[Inter] font-bold text-[#A8ACA8] shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                            </svg>
                            Apr 25
                            <span className="text-[#A8ACA8]/60">- 1d</span>
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-2 text-left">
                            <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[9px] font-[Poppins] font-black uppercase tracking-[0.14em] text-[#FFC600] shrink-0">Full</span>
                            <span className="font-[Inter] font-bold text-white text-[11.5px] truncate">Sunday Full PMDC Mock</span>
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-[Inter] font-bold text-[#A8ACA8] shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                            </svg>
                            Apr 26
                            <span className="text-[#A8ACA8]/60">- 2d</span>
                            </span>
                        </div>

                        <p className="text-[10px] font-[Inter] font-bold text-[#A8ACA8]/70 text-left">+1 more...</p>
                        </div>
                    </button>
                    </section>

                    <section>
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                        <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">Previous Tests</h2>
                    </div>

                    <button className="group w-full bg-[#222422] border-2 border-[#2E302E] hover:border-[#FFC600] rounded-2xl px-4 py-3.5 flex items-center gap-3.5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)] transition-all duration-150">
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
                            4 tests - scores, syllabus &amp; answers
                        </p>
                        </div>
                        <div className="w-8 h-8 bg-[#181A18] border-2 border-[#2E302E] group-hover:border-[#FFC600] group-hover:bg-[#FFC600] rounded-lg flex items-center justify-center shrink-0 transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8] group-hover:text-[#181A18]">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                        </div>
                    </button>
                    </section>

                    <section>
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                        <h2 className="font-[Poppins] font-black text-white text-[12px] uppercase tracking-[0.14em]">Full Schedule</h2>
                    </div>

                    <button className="group w-full bg-[#222422] border-2 border-[#2E302E] hover:border-[#FFC600] rounded-2xl px-4 py-3.5 flex items-center gap-3.5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)] transition-all duration-150">
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

                </div>
                </div>
            </main>
        </>
    )
}

export default UserTestSeriesPage