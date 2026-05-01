import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom"
import '../../src/animation.css';

const SubjectCircleButton = ({accuracy, color, subject}) => {
    const percentage = accuracy ? parseInt((accuracy.correct / accuracy.attempt) * 100) : 0;

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="relative" style={{ width: "56px", height: "56px" }}>
                <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
                    <circle cx="28" cy="28" r="22" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray="138.23" strokeDashoffset={138.23 * (1 - percentage / 100)}/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-['Poppins'] font-medium text-[15px] leading-none" style={{ color: `${color}` }}>{percentage}%</span>
                </div>
            </div>
            <span className="font-['Inter'] font-medium text-[14px] text-white/55 text-center leading-tight max-w-[72px]">{subject}</span>
        </div>
    )
}

const UserDashboardPage = () => {
    const {studentAnalytics, predictedScore} = useOutletContext();
    // console.log(studentAnalytics);
    const initials = studentAnalytics?.name?.split(' ').map(n => n.slice(0,1).toUpperCase()).join(' ');
    // console.log(studentAnalytics);

    const mdcatDate = new Date(import.meta.env.VITE_MDCAT_DATE);

    const [mdcatTimeRemaining, setMdcatTimeRemaining] = useState({days: '00', hours: '00', minutes: '00'});
    const [isPerformance, setIsPerformance] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
        const actualTime = mdcatDate - Date.now();
        const days = `${parseInt((actualTime) / (24 * 60 * 60 * 1000))}`;
        const hours = `${parseInt((actualTime - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000))}`;
        const minutes = `${parseInt((actualTime - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / (60 * 1000))}`;
        setMdcatTimeRemaining({days: days.padStart(2, '0'), hours: hours.padStart(2, `0`), minutes: minutes.padStart(2, `0`)});
    }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <style>{`
            .card { background:#222422; border:1px solid rgba(255,255,255,0.08); border-radius:1rem; box-shadow:0 2px 8px rgba(0,0,0,.30), 0 8px 24px rgba(0,0,0,.20); padding:1rem 1.25rem; }
            .card-sm { background:#222422; border:1px solid rgba(255,255,255,0.08); border-radius:1rem; box-shadow:0 2px 8px rgba(0,0,0,.30), 0 8px 24px rgba(0,0,0,.20); padding:.75rem 1rem; }
            .inner-tile { background:#2a2e2a; border:1px solid rgba(255,255,255,0.06); box-shadow:0 2px 8px rgba(0,0,0,.20); }
        `}</style>

        <section className="fade-in bg-[#181A18] text-white/90 min-h-screen">
            <div className="lg:hidden px-4 pt-6 pb-10 mx-auto max-w-lg space-y-4">

                <div className="flex items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-[50px] h-[50px] rounded-full bg-[#FFC600]/20 border-2 border-[#FFC600]/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-['Poppins'] font-medium text-[#E0A800] text-[14px] leading-none">{initials}</span>
                    </div>
                    <div className="min-w-0">
                    <p className="text-white/40 text-[15px] font-['Inter'] leading-tight">Welcome Warrior</p>
                    <h2 className="font-['Poppins'] font-medium text-[24px] text-white/90 leading-tight truncate">{studentAnalytics?.name}</h2>
                    <div className="flex items-center gap-1 mt-0.5">
                        
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                        <span className="font-['Poppins'] font-medium text-[14px] text-orange-500 leading-none">{studentAnalytics?.streak}</span>
                        <span className="font-['Inter'] text-[14px] text-white/40">day streak</span>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    
                    <Link to="/dashboard/score-predictor" className="cursor-pointer flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-lg px-2 py-1.5">
                    <div className="w-[26px] flex-shrink-0">
                        
                        <svg viewBox="0 0 200 108" className="w-full">
                        <path d="M 14.00 100.00 A 86 86 0 0 1 39.21 39.21 L 52.62 52.62 A 67 67 0 0 0 33.00 100.00 Z" fill="#EF4444"/>
                        <path d="M 39.21 39.21 A 86 86 0 0 1 100.00 14.00 L 100.00 33.00 A 67 67 0 0 0 52.62 52.62 Z" fill="#F97316"/>
                        <path d="M 100.00 14.00 A 86 86 0 0 1 160.79 39.21 L 147.38 52.62 A 67 67 0 0 0 100.00 33.00 Z" fill="#EAB308"/>
                        <path d="M 160.79 39.21 A 86 86 0 0 1 186.00 100.00 L 167.00 100.00 A 67 67 0 0 0 147.38 52.62 Z" fill="#22C55E"/>
                        <g transform={`translate(100 100) rotate(${180 - predictedScore})`}>
                            <path d="M 3,0 C 2.2,-28 1,-60 0,-62 C -1,-60 -2.2,-28 -3,0 C -1.5,3 1.5,3 3,0 Z" fill="rgba(255,255,255,0.85)"/>
                        </g>
                        <circle cx="100" cy="100" r="5.5" fill="rgba(255,255,255,0.85)"/>
                        <circle cx="100" cy="100" r="2.5" fill="#FFC600"/>
                        </svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-[14px] leading-none" style={{ color: "#EAB308" }}>{predictedScore}</span>
                    </Link>
                    
                    <div className="flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-2 py-1.5">
                    <span className="flex items-baseline gap-[2px]"><span className="font-['Poppins'] font-medium text-[14px] leading-none text-[#FFC600]">{mdcatTimeRemaining.days}</span><span className="font-['Inter'] text-[15px] text-white/40">d</span></span>
                    <span className="text-white/30 text-[14px] mx-0.5">·</span>
                    <span className="flex items-baseline gap-[2px]"><span className="font-['Poppins'] font-medium text-[14px] leading-none text-[#FFC600]">{mdcatTimeRemaining.hours}</span><span className="font-['Inter'] text-[15px] text-white/40">h</span></span>
                    <span className="text-white/30 text-[14px] mx-0.5">·</span>
                    <span className="flex items-baseline gap-[2px]"><span className="font-['Poppins'] font-medium text-[14px] leading-none text-[#FFC600]">{mdcatTimeRemaining.minutes}</span><span className="font-['Inter'] text-[15px] text-white/40">m</span></span>
                    </div>
                </div>
                </div>

                <div className="border-l-[3px] border-[#FFC600] pl-3 py-0.5">
                <p className="font-['Inter'] italic text-[14px] text-white/55 leading-relaxed">&ldquo;So, surely with hardship comes ease.&rdquo;</p>
                <p className="font-['Inter'] text-[14px] text-white/40 mt-0.5">Surah Ash-Sharh 94:5</p>
                </div>

                <div className="flex items-center justify-between px-0.5">
                <p className="font-['Inter'] font-semibold text-[14px] uppercase tracking-[0.12em] text-white/40">Overview</p>
                <Link to="/analytics" className="cursor-pointer flex items-center gap-1 font-['Inter'] font-semibold text-[15px] text-[#E0A800] hover:text-[#FFC600] transition-colors">
                    See Detailed Analytics
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
                </div>

                <div className="flex bg-white/[0.05] rounded-full p-0.5 border border-white/[0.06]">
                <button onClick={() => setIsPerformance(true)} className={`flex-1 font-['Poppins'] font-medium text-[14px] py-2 rounded-full ${isPerformance ? 'bg-[#FFC600] text-[#111827] shadow-[0_1px_3px_rgba(0,0,0,0.12)]' : 'text-white/55'}`}>Performance</button>
                <button onClick={() => setIsPerformance(false)} className={`flex-1 font-['Poppins'] font-medium text-[14px] py-2 rounded-full ${!isPerformance ? 'bg-[#FFC600] text-[#111827] shadow-[0_1px_3px_rgba(0,0,0,0.12)]' : 'text-white/55'}`}>Accuracy</button>
                </div>

                <section className="card">
                <div className="grid grid-cols-3 gap-2">
                    
                    <div className="inner-tile rounded-xl p-3 flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FFC60018" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-[20px] leading-none" style={{ color: "#FFC600" }}>{studentAnalytics?.total_attempt}</span>
                    <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide text-center leading-tight whitespace-pre-line">MCQs
            Attempted</span>
                    </div>
                    
                    <div className="inner-tile rounded-xl p-3 flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#A78BFA18" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-[20px] leading-none" style={{ color: "#A78BFA" }}>{studentAnalytics?.tests_attempted}</span>
                    <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide text-center leading-tight whitespace-pre-line">Tests
            Attempted</span>
                    </div>
                    
                    <div className="inner-tile rounded-xl p-3 flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#10B98118" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-[20px] leading-none" style={{ color: "#10B981" }}>{studentAnalytics?.total_attempt ? parseInt((studentAnalytics?.total_correct / studentAnalytics?.total_attempt) * 100) : 0}%</span>
                    <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide text-center leading-tight whitespace-pre-line">Overall
            Accuracy</span>
                    </div>
                </div>
                </section>

                {
                    isPerformance ?
                    <>
                    <Link to="/quiz-builder" className="cursor-pointer block">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFC600]/[0.10] via-[#222422] to-[#1d1f1d] border border-[#FFC600]/25 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.20),_0_8px_28px_rgba(255,198,0,0.10)] active:scale-[0.985] transition-all">
                            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FFC600]/25 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-20 h-[2px] bg-gradient-to-r from-transparent to-[#FFC600] rotate-[-35deg] origin-right translate-y-3 -translate-x-2 pointer-events-none opacity-60"></div>
                            <div className="relative flex items-center gap-3.5">
                            <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#FFC600,#E0A800)", boxShadow: "0 4px 12px rgba(255,198,0,0.40), inset 0 1px 0 rgba(255,255,255,0.30)" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-['Inter'] font-bold text-[14px] uppercase tracking-[0.14em] text-[#E0A800] mb-0.5">Unlimited Practice</p>
                                <h3 className="font-['Poppins'] font-bold text-[20px] text-white/95 leading-tight">Quiz Builder</h3>
                                <p className="font-['Inter'] text-[14px] text-white/55 mt-0.5 leading-snug">Custom MCQ sessions by subject, chapter, or difficulty.</p>
                            </div>
                            </div>
                            <div className="relative mt-3.5 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 font-['Poppins'] font-semibold text-[14px] text-[#111827] bg-[#FFC600] px-3.5 py-1.5 rounded-full shadow-[0_1px_4px_rgba(255,198,0,0.22)]">
                                Take a Quiz
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                            <span className="font-['Inter'] text-[14px] text-white/40">5 subjects · 10,000+ MCQs</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/test-series" className="cursor-pointer block">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1C1E] via-[#222422] to-[#181A18] border border-white/[0.10] px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.30),_0_8px_28px_rgba(0,0,0,0.20)] active:scale-[0.985] transition-all">
                            <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#FFC600] via-[#FFC600] to-[#FFC600]/0"></div>
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFC600 0 1px,transparent 1px 14px)" }}></div>
                            <div className="relative flex items-center gap-3.5">
                            <div className="w-[52px] h-[52px] rounded-xl bg-white/[0.05] border border-white/[0.10] flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-['Inter'] font-bold text-[14px] uppercase tracking-[0.14em] text-[#FFC600] mb-0.5">Real Exam Simulation</p>
                                <h3 className="font-['Poppins'] font-bold text-[20px] text-white leading-tight">Mock Test Sessions</h3>
                                <p className="font-['Inter'] text-[14px] text-white/55 mt-0.5 leading-snug">Simulate official MDCAT under timed, exam-day conditions.</p>
                            </div>
                            </div>
                            <div className="relative mt-3.5 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 font-['Poppins'] font-semibold text-[14px] text-[#FFC600] border border-[#FFC600]/40 px-3.5 py-1.5 rounded-full">
                                Take a Test
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                            <span className="font-['Inter'] text-[14px] text-white/40">Timed · {studentAnalytics?.tests_attempted} attempted</span>
                            </div>
                        </div>
                    </Link>
                    </>
                    :
                    <>
                        <div>
                            <SubjectCircleButton subject={"Biology"} color={"#10B981"} accuracy={studentAnalytics?.subjects.biology}/>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <SubjectCircleButton subject={"Chemistry"} color={"#38BDF8"} accuracy={studentAnalytics?.subjects.chemistry}/>
                            <SubjectCircleButton subject={"Physics"} color={"#A78BFA"} accuracy={studentAnalytics?.subjects.physics}/>
                            <SubjectCircleButton subject={"English"} color={"#2DD4BF"} accuracy={studentAnalytics?.subjects.english}/>
                            <SubjectCircleButton subject={"Logical Reasoning"} color={"#FB923C"} accuracy={studentAnalytics?.subjects.logical_reasoning}/>
                        </div>
                    </>
                }

                <section className="card">
                <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M10 10l2 2 4-4"/></svg>
                    <h3 className="font-['Poppins'] font-medium text-white/80 text-[15px]">My Copy</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Link to="/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", false))} className="block">
                    <div className="relative inner-tile rounded-xl p-3 flex flex-col items-center gap-1.5 active:scale-[0.97] transition-transform">
                        <svg className="absolute top-2.5 right-2.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#EF444418" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><polyline points="14 2 14 8 20 8"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg>
                        </div>
                        {/* <span className="font-['Poppins'] font-medium text-[22px] leading-none" style={{ color: "#EF4444" }}>31</span> */}
                        <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide text-center">My Mistakes</span>
                    </div>
                    </Link>
                    <Link to="/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", true))} className="block">
                    <div className="relative inner-tile rounded-xl p-3 flex flex-col items-center gap-1.5 active:scale-[0.97] transition-transform">
                        <svg className="absolute top-2.5 right-2.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#38BDF818" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        {/* <span className="font-['Poppins'] font-medium text-[22px] leading-none" style={{ color: "#38BDF8" }}>47</span> */}
                        <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide text-center">Bookmarks</span>
                    </div>
                    </Link>
                </div>
                </section>

            </div>

            <div className="hidden lg:flex min-h-screen flex-col px-6 pt-5 pb-6 gap-3 overflow-visible max-w-[1040px] mx-auto w-full">

                <div className="flex items-center justify-between gap-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FFC600]/20 border-2 border-[#FFC600]/50 flex items-center justify-center">
                    <span className="font-['Poppins'] font-medium text-[#E0A800] text-[15px]">{initials}</span>
                    </div>
                    <div>
                    <p className="text-white/40 text-[14px] font-['Inter'] leading-none mb-0.5">Good Evening, Warrior</p>
                    <h2 className="font-['Poppins'] font-medium text-[24px] text-white/90 leading-tight">{studentAnalytics?.name}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-full px-2.5 py-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                    <span className="font-['Poppins'] font-medium text-[14px] text-orange-500">{studentAnalytics?.streak}</span>
                    <span className="font-['Inter'] text-[14px] text-white/40">day streak</span>
                </div>
                </div>

                <div className="flex gap-4 flex-shrink-0 items-stretch">
                <div className="flex-1 card-sm flex items-center gap-0">
                    
                    <div className="flex-1 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FFC60018" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <div>
                        <span className="font-['Poppins'] font-medium text-[19px] leading-none block" style={{ color: "#FFC600" }}>{studentAnalytics?.total_attempt}</span>
                        <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide">MCQs Attempted</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-2.5 border-l border-white/[0.06] pl-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#A78BFA18" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
                    </div>
                    <div>
                        <span className="font-['Poppins'] font-medium text-[19px] leading-none block" style={{ color: "#A78BFA" }}>{studentAnalytics?.tests_attempted}</span>
                        <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide">Tests Attempted</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-2.5 border-l border-white/[0.06] pl-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#10B98118" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    </div>
                    <div>
                        <span className="font-['Poppins'] font-medium text-[19px] leading-none block" style={{ color: "#10B981" }}>{studentAnalytics?.total_attempt ? parseInt((studentAnalytics?.total_correct / studentAnalytics?.total_attempt) * 100) : 0}%</span>
                        <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide">Overall Accuracy</span>
                    </div>
                    </div>
                </div>
                
                <div className="w-[248px] flex-shrink-0">
                    <div className="card-sm flex-shrink-0 text-center">
                    <p className="font-['Poppins'] font-medium text-[15px] text-white/80 mb-3">MDCAT Count Down</p>
                    <div className="flex items-start justify-center gap-1">
                        <div className="flex flex-col items-center">
                        <span className="font-['Poppins'] font-medium text-[32px] leading-none text-[#FFC600]">{mdcatTimeRemaining.days}</span>
                        <span className="font-['Inter'] text-[14px] text-white/40 mt-1">Days</span>
                        </div>
                        <span className="font-['Poppins'] font-medium text-[28px] leading-none text-[#FFC600] mt-0.5">:</span>
                        <div className="flex flex-col items-center">
                        <span className="font-['Poppins'] font-medium text-[32px] leading-none text-[#FFC600]">{mdcatTimeRemaining.hours}</span>
                        <span className="font-['Inter'] text-[14px] text-white/40 mt-1">Hours</span>
                        </div>
                        <span className="font-['Poppins'] font-medium text-[28px] leading-none text-[#FFC600] mt-0.5">:</span>
                        <div className="flex flex-col items-center">
                        <span className="font-['Poppins'] font-medium text-[32px] leading-none text-[#FFC600]">{mdcatTimeRemaining.minutes}</span>
                        <span className="font-['Inter'] text-[14px] text-white/40 mt-1">Minutes</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="flex gap-4 flex-1 min-h-0">

                <div className="flex-1 flex flex-col gap-2.5 min-h-0">

                    <section className="card-sm flex-[1.4] min-h-0 flex flex-col">
                    <div className="flex items-center gap-2 flex-shrink-0 mb-1">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                        <h3 className="font-['Poppins'] font-medium text-white/80 text-[15px]">Subjects Preparation</h3>
                        <Link to="/analytics" className="cursor-pointer ml-auto text-[15px] font-['Inter'] text-[#E0A800]">See Detailed Analytics</Link>
                    </div>
                    <div className="border-t border-white/[0.06] pt-2 flex-1 flex items-center justify-around">
                        
                        <div className="flex flex-col items-center md:flex-row gap-10">
                            <SubjectCircleButton subject={"Biology"} color={"#10B981"} accuracy={studentAnalytics?.subjects.biology}/>
                            <SubjectCircleButton subject={"Chemistry"} color={"#38BDF8"} accuracy={studentAnalytics?.subjects.chemistry}/>
                            <SubjectCircleButton subject={"Physics"} color={"#A78BFA"} accuracy={studentAnalytics?.subjects.physics}/>
                            <SubjectCircleButton subject={"English"} color={"#2DD4BF"} accuracy={studentAnalytics?.subjects.english}/>
                            <SubjectCircleButton subject={"Logical Reasoning"} color={"#FB923C"} accuracy={studentAnalytics?.subjects.logical_reasoning}/>
                        </div>

                    </div>
                    </section>

                    <Link to="/quiz-builder" className="cursor-pointer block flex-[1.2] min-h-0">
                    <div className="relative overflow-hidden rounded-2xl h-full bg-gradient-to-br from-[#FFC600]/[0.10] via-[#222422] to-[#1d1f1d] border border-[#FFC600]/25 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.20),_0_8px_28px_rgba(255,198,0,0.10)] flex flex-col">
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FFC600]/25 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative flex items-center gap-3.5 flex-1">
                        <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#FFC600,#E0A800)", boxShadow: "0 4px 12px rgba(255,198,0,0.40), inset 0 1px 0 rgba(255,255,255,0.30)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-['Inter'] font-bold text-[14px] uppercase tracking-[0.14em] text-[#E0A800] mb-0.5">Unlimited Practice</p>
                            <h3 className="font-['Poppins'] font-bold text-[20px] text-white/95 leading-tight">Quiz Builder</h3>
                            <p className="font-['Inter'] text-[14px] text-white/55 mt-0.5 leading-snug">Custom MCQ sessions by subject, chapter, or difficulty.</p>
                        </div>
                        </div>
                        <div className="relative mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 font-['Poppins'] font-semibold text-[14px] text-[#111827] bg-[#FFC600] px-3.5 py-1.5 rounded-full shadow-[0_1px_4px_rgba(255,198,0,0.22)]">
                            Take a Quiz
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </span>
                        <span className="font-['Inter'] text-[14px] text-white/40">5 subjects · 10,000+ MCQs</span>
                        </div>
                    </div>
                    </Link>

                    <Link to="/test-series" className="cursor-pointer block flex-[1.2] min-h-0">
                    <div className="relative overflow-hidden rounded-2xl h-full bg-gradient-to-br from-[#1C1C1E] via-[#222422] to-[#181A18] border border-white/[0.10] px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.30)] flex flex-col">
                        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#FFC600] via-[#FFC600] to-[#FFC600]/0"></div>
                        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFC600 0 1px,transparent 1px 14px)" }}></div>
                        <div className="relative flex items-center gap-3.5 flex-1">
                        <div className="w-[52px] h-[52px] rounded-xl bg-white/[0.05] border border-white/[0.10] flex items-center justify-center flex-shrink-0">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-['Inter'] font-bold text-[14px] uppercase tracking-[0.14em] text-[#FFC600] mb-0.5">Real Exam Simulation</p>
                            <h3 className="font-['Poppins'] font-bold text-[20px] text-white leading-tight">Mock Test Sessions</h3>
                            <p className="font-['Inter'] text-[14px] text-white/55 mt-0.5 leading-snug">Simulate official MDCAT under timed, exam-day conditions.</p>
                        </div>
                        </div>
                        <div className="relative mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 font-['Poppins'] font-semibold text-[14px] text-[#FFC600] border border-[#FFC600]/40 px-3.5 py-1.5 rounded-full">
                            Take a Test
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </span>
                        <span className="font-['Inter'] text-[14px] text-white/40">Timed · {studentAnalytics?.tests_attempted} attempted</span>
                        </div>
                    </div>
                    </Link>

                    <section className="card-sm flex-[1.5] min-h-0 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        <h3 className="font-['Poppins'] font-medium text-white/80 text-[15px]">My Copy</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                        <Link to="/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", false))} className="flex">
                        <div className="relative flex-1 inner-tile rounded-xl flex flex-col items-center justify-center gap-1.5 py-3 px-2">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#EF444418" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg>
                            </div>
                            <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide">My Mistakes</span>
                            <span className="inline-flex items-center gap-0.5 font-['Inter'] font-medium text-[14px] px-2 py-1 rounded-md" style={{ color: "#EF4444", background: "#EF444418" }}>
                            Review Now <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                        </div>
                        </Link>
                        <Link to="/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", true))} className="flex">
                        <div className="relative flex-1 inner-tile rounded-xl flex flex-col items-center justify-center gap-1.5 py-3 px-2">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#38BDF818" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </div>
                            <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide">Bookmarks</span>
                            <span className="inline-flex items-center gap-0.5 font-['Inter'] font-medium text-[14px] px-2 py-1 rounded-md" style={{ color: "#38BDF8", background: "#38BDF818" }}>
                            Practice Now <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                        </div>
                        </Link>
                    </div>
                    </section>

                </div>

                <div className="w-[248px] flex-shrink-0 flex flex-col gap-2.5 min-h-0">

                    <div className="card-sm flex flex-col flex-shrink-0">
                    <div className="flex-shrink-0 mb-1">
                        <h3 className="font-['Poppins'] font-medium text-white/80 text-[15px]">Score predictor</h3>
                        <p className="font-['Inter'] text-[15px] text-white/40">Your goal should be to reach 175 / 180</p>
                        <a href="#" className="mt-1.5 flex items-center justify-center gap-1 w-full py-1.5 rounded-lg border border-[#FFC600]/20 bg-[#FFC600]/[0.05] font-['Inter'] font-semibold text-[14px] text-center text-[#E0A800] hover:bg-[#FFC600]/[0.11] transition-colors">
                        Understand Score Predictor Algorithm
                        {/* <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg> */}
                        </a>
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-h-0">
                        <div className="flex-shrink-0 w-[40%]">
                        <span className="font-['Poppins'] font-medium leading-none block" style={{ color: "#EAB308", fontSize: "62px" }}>{predictedScore}</span>
                        <span className="font-['Inter'] text-[15px] text-white/40 mt-1 block">Your Predicted Score</span>
                        </div>
                        <div className="w-[60%] flex-shrink-0">
                        <svg viewBox="0 -10 200 115" className="w-full">
                            <path d="M 14.00 100.00 A 86 86 0 0 1 39.21 39.21 L 52.62 52.62 A 67 67 0 0 0 33.00 100.00 Z" fill="#EF4444"/>
                            <path d="M 39.21 39.21 A 86 86 0 0 1 100.00 14.00 L 100.00 33.00 A 67 67 0 0 0 52.62 52.62 Z" fill="#F97316"/>
                            <path d="M 100.00 14.00 A 86 86 0 0 1 160.79 39.21 L 147.38 52.62 A 67 67 0 0 0 100.00 33.00 Z" fill="#EAB308"/>
                            <path d="M 160.79 39.21 A 86 86 0 0 1 186.00 100.00 L 167.00 100.00 A 67 67 0 0 0 147.38 52.62 Z" fill="#22C55E"/>
                            <text x="14" y="100" textAnchor="end" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.38)">0</text>
                            <text x="39.21" y="39.21" textAnchor="end" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.38)">45</text>
                            <text x="100" y="1" textAnchor="middle" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.38)">90</text>
                            <text x="160.79" y="39.21" textAnchor="start" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.38)">135</text>
                            <text x="186" y="100" textAnchor="start" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.38)">180</text>
                            <g transform={`translate(100 100) rotate(${180 - predictedScore})`}>
                            <path d="M 3,0 C 2.2,-28 1,-60 0,-62 C -1,-60 -2.2,-28 -3,0 C -1.5,3 1.5,3 3,0 Z" fill="rgba(255,255,255,0.85)"/>
                            </g>
                            <circle cx="100" cy="100" r="6" fill="rgba(255,255,255,0.85)"/>
                            <circle cx="100" cy="100" r="2.8" fill="#FFC600"/>
                        </svg>
                        </div>
                    </div>
                    </div>

                    <section className="card-sm flex-1 min-h-0 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                        <h3 className="font-['Poppins'] font-medium text-white/80 text-[15px]">Leaderboard</h3>
                    </div>
                    <div className="border-t border-white/[0.06] pt-2 flex-1 overflow-y-auto min-h-0 space-y-1">
                        
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">🥇</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#10B98122", color: "#10B981" }}>FN</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Fatima Noor</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#22C55E" }}>178</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">🥈</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#38BDF822", color: "#38BDF8" }}>AR</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Ahmed Raza</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#22C55E" }}>174</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">🥉</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#A78BFA22", color: "#A78BFA" }}>SM</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Sara Malik</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#22C55E" }}>169</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">4</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#FB923C22", color: "#FB923C" }}>OS</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Omar Sheikh</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#22C55E" }}>162</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">5</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#2DD4BF22", color: "#2DD4BF" }}>ZA</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Zainab Ali</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#22C55E" }}>155</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">6</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#F59E0B22", color: "#F59E0B" }}>BY</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Bilal Yousaf</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#22C55E" }}>148</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FFC600]/10 border border-[#FFC600]/25">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">7</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#FFC60022", color: "#FFC600" }}>HK</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate font-bold text-white/95">Hayan Khan (You)</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#EAB308" }}>131</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">8</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#8B5CF622", color: "#8B5CF6" }}>AT</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Ayesha Tariq</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#EAB308" }}>124</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">9</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#06B6D422", color: "#06B6D4" }}>IQ</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Imran Qureshi</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#EAB308" }}>112</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
                        <span className="font-['Poppins'] font-bold text-[15px] w-4 text-center text-white/35">10</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[15px]" style={{ background: "#EF444422", color: "#EF4444" }}>NF</div>
                        <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/65">Noor Fatima</span>
                        <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: "#F97316" }}>98</span>
                        </div>
                    </div>
                    </section>

                </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default UserDashboardPage;
