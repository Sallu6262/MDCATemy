import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom"
import '../../src/animation.css';
import ImagePopUp from '../../components/ImagePopUp';

const SubjectCircleButton = ({accuracy, accentClass, subject}) => {
    return (
        <div className={`subject-circle-btn flex flex-col items-center gap-1 ${accentClass}`}>
            <div className="relative" style={{ width: "56px", height: "56px" }}>
                <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="28" cy="28" r="22" fill="none" stroke="rgb(var(--ui-text-rgb) / 0.08)" strokeWidth="6"/>
                    <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="138.23" strokeDashoffset={String(138.23 - (accuracy ?? 0))}/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-['Poppins'] font-medium text-[15px] leading-none">{Math.round(accuracy)}%</span>
                </div>
            </div>
            <span
              className="dash-subject-name font-['Inter'] font-medium text-[14px] text-center leading-tight max-w-[72px]"
            >
              {subject}
            </span>
        </div>
    )
}

const UserDashboardPage = () => {
    const {studentAnalytics : sa, leaderboard, student} = useOutletContext();
    const initials = sa?.name?.split(' ')?.map(n => n?.[0]?.toUpperCase())?.join(' ');

    const mdcatDate = new Date(import.meta.env.VITE_MDCAT_DATE);

    const [mdcatTimeRemaining, setMdcatTimeRemaining] = useState({days: '00', hours: '00', minutes: '00'});
    const [isPerformance, setIsPerformance] = useState(true);
    const [popUpHidden, setPopUpHidden] = useState(true);

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
            .card { background:var(--ui-panel); border:1px solid rgb(var(--ui-text-rgb) / 0.08); border-radius:1rem; box-shadow:0 2px 8px rgba(0,0,0,.30), 0 8px 24px rgba(0,0,0,.20); padding:1rem 1.25rem; }
            .card-sm { background:var(--ui-panel); border:1px solid rgb(var(--ui-text-rgb) / 0.08); border-radius:1rem; box-shadow:0 2px 8px rgba(0,0,0,.30), 0 8px 24px rgba(0,0,0,.20); padding:.75rem 1rem; }
            .inner-tile { background:var(--ui-panel-2); border:1px solid rgb(var(--ui-text-rgb) / 0.06); box-shadow:0 2px 8px rgba(0,0,0,.20); }
            .promo-quiz { background: linear-gradient(135deg, rgb(255 198 0 / 0.10), var(--ui-panel), var(--ui-panel-2)); }
            .promo-test { background: linear-gradient(135deg, var(--ui-panel-2), var(--ui-panel), var(--ui-bg)); }
        `}</style>

        {
          !popUpHidden &&
          <ImagePopUp setPopUpHidden={setPopUpHidden}/>
        }

        <section className="fade-in user-dashboard-page bg-[#181A18] text-white/90 min-h-screen">
            <div className="lg:hidden px-3 pt-5 pb-3 mx-auto max-w-lg space-y-3.5">

                <div className="flex items-center justify-between gap-2 px-0.5">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#FFC600]/20 border-2 border-[#FFC600]/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-['Poppins'] font-medium text-[#E0A800] text-[12px] leading-none">{initials}</span>
                    </div>
                    <div className="min-w-0">
                    <p className="text-white/40 text-[12px] font-['Inter'] leading-tight">Welcome Warrior</p>
                    <h2 className="font-['Poppins'] font-medium text-[18px] text-white/90 leading-tight truncate">{sa?.name}</h2>
                    <div className="flex items-center gap-1 mt-0.5">
                        
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                        <span className="font-['Poppins'] font-medium text-[12px] text-orange-500 leading-none">{sa?.streak}</span>
                        <span className="font-['Inter'] text-[11px] text-white/40">day streak</span>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    
                    <Link to="/dashboard/score-predictor" style={{animation: "vibrate 2s linear infinite"}} className="quiz-btn-secondary dashboard-surface-btn cursor-pointer flex items-center gap-1.5 rounded-lg border bg-white/[0.05] border-white/[0.08] px-2 py-1.5">
                    <div className="w-[26px] flex-shrink-0">
                        
                        <svg viewBox="0 0 200 108" className="w-full">
                        <path className="dash-gauge-red" d="M 14.00 100.00 A 86 86 0 0 1 39.21 39.21 L 52.62 52.62 A 67 67 0 0 0 33.00 100.00 Z" fill="#EF4444"/>
                        <path className="dash-gauge-orange" d="M 39.21 39.21 A 86 86 0 0 1 100.00 14.00 L 100.00 33.00 A 67 67 0 0 0 52.62 52.62 Z" fill="#F97316"/>
                        <path className="dash-gauge-amber" d="M 100.00 14.00 A 86 86 0 0 1 160.79 39.21 L 147.38 52.62 A 67 67 0 0 0 100.00 33.00 Z" fill="#EAB308"/>
                        <path className="dash-gauge-green" d="M 160.79 39.21 A 86 86 0 0 1 186.00 100.00 L 167.00 100.00 A 67 67 0 0 0 147.38 52.62 Z" fill="#22C55E"/>
                        <g transform={`translate(100 100) rotate(${-90 + (sa?.predicted_score ?? 0)})`}>
                            <path className="dash-gauge-needle" d="M 3,0 C 2.2,-28 1,-60 0,-62 C -1,-60 -2.2,-28 -3,0 C -1.5,3 1.5,3 3,0 Z"/>
                        </g>
                        <circle className="dash-gauge-needle" cx="100" cy="100" r="5.5"/>
                        <circle cx="100" cy="100" r="2.5" fill="#FFC600"/>
                        </svg>
                    </div>
                    <span className="dash-accent-amber font-['Poppins'] font-medium text-[12px] leading-none">{(sa?.predicted_score ?? 0)}</span>
                    </Link>
                    
                    <div className="quiz-btn-secondary dashboard-surface-btn flex items-center gap-1 rounded-lg border bg-white/[0.05] border-white/[0.08] px-1.5 py-1">
                    <span className="flex items-baseline gap-[2px]"><span className="font-['Poppins'] font-medium text-[12px] leading-none text-[#FFC600]">{mdcatTimeRemaining.days}</span><span className="font-['Inter'] text-[11px] text-white/40">d</span></span>
                    <span className="text-white/30 text-[11px] mx-0.5">·</span>
                    <span className="flex items-baseline gap-[2px]"><span className="font-['Poppins'] font-medium text-[12px] leading-none text-[#FFC600]">{mdcatTimeRemaining.hours}</span><span className="font-['Inter'] text-[11px] text-white/40">h</span></span>
                    <span className="text-white/30 text-[11px] mx-0.5">·</span>
                    <span className="flex items-baseline gap-[2px]"><span className="font-['Poppins'] font-medium text-[12px] leading-none text-[#FFC600]">{mdcatTimeRemaining.minutes}</span><span className="font-['Inter'] text-[11px] text-white/40">m</span></span>
                    </div>
                </div>
                </div>

                <div className="border-l-[3px] border-[#FFC600] pl-2.5 py-0.5">
                <p className="dash-quote-text font-['Inter'] italic text-[12px] leading-relaxed">&ldquo;So, surely with hardship comes ease.&rdquo;</p>
                <p className="dash-quote-cite font-['Inter'] text-[11px] mt-0.5">Surah Ash-Sharh 94:5</p>
                </div>

                <div className="flex items-center justify-between gap-2 px-0.5">
                <p className="font-['Inter'] font-semibold text-[11px] uppercase tracking-[0.1em] text-white/40 shrink-0">Overview</p>
                <Link to="/dashboard/analytics" className="cursor-pointer flex items-center gap-0.5 font-['Inter'] font-semibold text-[11px] text-[#E0A800] hover:text-[#FFC600] transition-colors min-w-0">
                    <span className="truncate">See Detailed Analytics</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
                </div>

                <div className="flex bg-white/[0.05] rounded-full p-0.5 border border-white/[0.06]">
                <button onClick={() => setIsPerformance(true)} className={`flex-1 font-['Poppins'] font-medium text-[12px] py-1.5 rounded-full ${isPerformance ? 'bg-[#FFC600] text-[#111827] shadow-[0_1px_3px_rgba(0,0,0,0.12)]' : 'dashboard-tab-inactive text-white/55'}`}>Performance</button>
                <button onClick={() => setIsPerformance(false)} className={`flex-1 font-['Poppins'] font-medium text-[12px] py-1.5 rounded-full ${!isPerformance ? 'bg-[#FFC600] text-[#111827] shadow-[0_1px_3px_rgba(0,0,0,0.12)]' : 'dashboard-tab-inactive text-white/55'}`}>Accuracy</button>
                </div>

                <section className="card !py-3 !px-3">
                <div className="grid grid-cols-3 gap-1.5">
                    
                    <div className="inner-tile rounded-lg p-2 flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FFC60018" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <span className="font-['Poppins'] font-medium text-[16px] leading-none" style={{ color: "#FFC600" }}>{sa?.total_attempt}</span>
                    <span className="font-['Inter'] text-[10px] text-white/40 uppercase tracking-wide text-center leading-tight">MCQs Attempted</span>
                    </div>
                    
                    <div className="inner-tile rounded-lg p-2 flex flex-col items-center gap-1">
                    <div className="dash-bg-violet w-7 h-7 rounded-lg flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-violet"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
                    </div>
                    <span className="dash-accent-violet font-['Poppins'] font-medium text-[16px] leading-none">{sa?.tests_attempted}</span>
                    <span className="font-['Inter'] text-[10px] text-white/40 uppercase tracking-wide text-center leading-tight">Tests Attempted</span>
                    </div>
                    
                    <div className="inner-tile rounded-lg p-2 flex flex-col items-center gap-1">
                    <div className="dash-bg-emerald w-7 h-7 rounded-lg flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-emerald"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    </div>
                    <span className="dash-accent-emerald font-['Poppins'] font-medium text-[16px] leading-none">{sa?.total_attempt ? parseInt((sa?.total_correct / sa?.total_attempt) * 100) : 0}%</span>
                    <span className="font-['Inter'] text-[10px] text-white/40 uppercase tracking-wide text-center leading-tight">Overall Accuracy</span>
                    </div>
                </div>
                </section>

                {
                    isPerformance ?
                    <>
                    <Link to="/dashboard/quiz-builder" className="cursor-pointer block">
                        <div className="promo-quiz relative overflow-hidden rounded-xl border border-[#FFC600]/25 px-3.5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.20),_0_8px_28px_rgba(255,198,0,0.10)] active:scale-[0.985] transition-all">
                            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FFC600]/25 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-20 h-[2px] bg-gradient-to-r from-transparent to-[#FFC600] rotate-[-35deg] origin-right translate-y-3 -translate-x-2 pointer-events-none opacity-60"></div>
                            <div className="relative flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#FFC600,#E0A800)", boxShadow: "0 4px 12px rgba(255,198,0,0.40), inset 0 1px 0 rgba(255,255,255,0.30)" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-['Inter'] font-bold text-[10px] uppercase tracking-[0.1em] text-[#E0A800] mb-0.5">Unlimited Practice</p>
                                <h3 className="font-['Poppins'] font-bold text-[16px] text-white/95 leading-tight">Quiz Builder</h3>
                                <p className="font-['Inter'] text-[11px] text-white/55 mt-0.5 leading-snug">Custom MCQ sessions by subject, chapter, or difficulty.</p>
                            </div>
                            </div>
                            <div className="relative mt-3 flex flex-col gap-2">
                            <span className="inline-flex w-full items-center justify-center gap-1 font-['Poppins'] font-semibold text-[12px] text-[#111827] bg-[#FFC600] px-3 py-2 rounded-full shadow-[0_1px_4px_rgba(255,198,0,0.22)]">
                                Take a Quiz
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                            <span className="font-['Inter'] text-[10px] text-white/40 text-center">5 subjects · 10,000+ MCQs</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/dashboard/test-series" className="cursor-pointer block">
                        <div className="promo-test relative overflow-hidden rounded-xl border border-white/[0.10] px-3.5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.30),_0_8px_28px_rgba(0,0,0,0.20)] active:scale-[0.985] transition-all">
                            <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#FFC600] via-[#FFC600] to-[#FFC600]/0"></div>
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFC600 0 1px,transparent 1px 14px)" }}></div>
                            <div className="relative flex items-start gap-3">
                            <div className="dashboard-icon-tile flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-['Inter'] font-bold text-[10px] uppercase tracking-[0.1em] text-[#FFC600] mb-0.5">Real Exam Simulation</p>
                                <h3 className="font-['Poppins'] font-bold text-[16px] text-white leading-tight">Mock Test Sessions</h3>
                                <p className="font-['Inter'] text-[11px] text-white/55 mt-0.5 leading-snug">Simulate official MDCAT under timed, exam-day conditions.</p>
                            </div>
                            </div>
                            <div className="relative mt-3 flex flex-col gap-2">
                            <span className="quiz-btn-secondary inline-flex w-full items-center justify-center gap-1 rounded-full border border-[#FFC600]/40 px-3 py-2 font-['Poppins'] font-semibold text-[12px] text-[#FFC600]">
                                Take a Test
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                            <span className="font-['Inter'] text-[10px] text-white/40 text-center">Timed · {sa?.tests_attempted} attempted</span>
                            </div>
                        </div>
                    </Link>
                    </>
                    :
                    <>
                        <div>
                            <SubjectCircleButton subject={"Biology"} accentClass="dash-accent-emerald" accuracy={sa?.subjects['biology']}/>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <SubjectCircleButton subject={"Chemistry"} accentClass="dash-accent-sky" accuracy={sa?.subjects['chemistry']}/>
                            <SubjectCircleButton subject={"Physics"} accentClass="dash-accent-violet" accuracy={sa?.subjects['physics']}/>
                            <SubjectCircleButton subject={"English"} accentClass="dash-accent-teal" accuracy={sa?.subjects['english']}/>
                            <SubjectCircleButton subject={"Logical Reasoning"} accentClass="dash-accent-orange" accuracy={sa?.subjects['logical_reasoning']}/>
                        </div>
                    </>
                }

                <section className="card !py-3 !px-3">
                <div className="flex items-center gap-1.5 mb-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M10 10l2 2 4-4"/></svg>
                    <h3 className="font-['Poppins'] font-medium text-white/80 text-[13px]">My Copy</h3>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                    <Link to="/dashboard/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", false))} className="block">
                    <div className="relative inner-tile rounded-lg p-2.5 flex flex-col items-center gap-1 active:scale-[0.97] transition-transform">
                        <svg className="absolute top-2 right-2" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--ui-text-rgb) / 0.30)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        <div className="dash-bg-red flex h-7 w-7 items-center justify-center rounded-lg">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-red"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><polyline points="14 2 14 8 20 8"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg>
                        </div>
                        <span className="dash-copy-label font-['Inter'] text-[11px] uppercase tracking-wide text-center">My Mistakes</span>
                    </div>
                    </Link>
                    <Link to="/dashboard/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", true))} className="block">
                    <div className="relative inner-tile rounded-lg p-2.5 flex flex-col items-center gap-1 active:scale-[0.97] transition-transform">
                        <svg className="absolute top-2 right-2" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--ui-text-rgb) / 0.30)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        <div className="dash-bg-sky flex h-7 w-7 items-center justify-center rounded-lg">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-sky"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        <span className="dash-copy-label font-['Inter'] text-[11px] uppercase tracking-wide text-center">Bookmarks</span>
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
                    <h2 className="font-['Poppins'] font-medium text-[24px] text-white/90 leading-tight">{sa?.name}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-full px-2.5 py-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                    <span className="font-['Poppins'] font-medium text-[14px] text-orange-500">{sa?.streak}</span>
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
                        <span className="font-['Poppins'] font-medium text-[19px] leading-none block" style={{ color: "#FFC600" }}>{sa?.total_attempt}</span>
                        <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide">MCQs Attempted</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-2.5 border-l border-white/[0.06] pl-4">
                    <div className="dash-bg-violet flex h-9 w-9 items-center justify-center rounded-xl">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-violet"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
                    </div>
                    <div>
                        <span className="dash-accent-violet block font-['Poppins'] font-medium text-[19px] leading-none">{sa?.tests_attempted}</span>
                        <span className="font-['Inter'] text-[15px] text-white/40 uppercase tracking-wide">Tests Attempted</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-2.5 border-l border-white/[0.06] pl-4">
                    <div className="dash-bg-emerald flex h-9 w-9 items-center justify-center rounded-xl">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-emerald"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    </div>
                    <div>
                        <span className="dash-accent-emerald block font-['Poppins'] font-medium text-[19px] leading-none">{sa?.total_attempt ? parseInt((sa?.total_correct / sa?.total_attempt) * 100) : 0}%</span>
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
                        <Link to="/dashboard/analytics" className="cursor-pointer ml-auto text-[15px] font-['Inter'] text-[#E0A800]">See Detailed Analytics</Link>
                    </div>
                    <div className="border-t border-white/[0.06] pt-2 flex-1 flex items-center justify-around">
                        
                        <div className="flex flex-col items-center md:flex-row gap-10">
                            <SubjectCircleButton subject={"Biology"} accentClass="dash-accent-emerald" accuracy={sa?.subjects['biology']}/>
                            <SubjectCircleButton subject={"Chemistry"} accentClass="dash-accent-sky" accuracy={sa?.subjects['chemistry']}/>
                            <SubjectCircleButton subject={"Physics"} accentClass="dash-accent-violet" accuracy={sa?.subjects['physics']}/>
                            <SubjectCircleButton subject={"English"} accentClass="dash-accent-teal" accuracy={sa?.subjects['english']}/>
                            <SubjectCircleButton subject={"Logical Reasoning"} accentClass="dash-accent-orange" accuracy={sa?.subjects['logical_reasoning']}/>
                        </div>

                    </div>
                    </section>

                    <Link to="/dashboard/quiz-builder" className="cursor-pointer block flex-[1.2] min-h-0">
                        <div className="promo-quiz relative overflow-hidden rounded-2xl h-full border border-[#FFC600]/25 px-5 py-4 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.20),_0_8px_28px_rgba(255,198,0,0.10)] flex flex-col">
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

                    <Link to="/dashboard/test-series" className="cursor-pointer block flex-[1.2] min-h-0">
                    <div className="promo-test relative overflow-hidden rounded-2xl h-full border border-white/[0.10] px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.30)] flex flex-col">
                        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#FFC600] via-[#FFC600] to-[#FFC600]/0"></div>
                        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFC600 0 1px,transparent 1px 14px)" }}></div>
                        <div className="relative flex items-center gap-3.5 flex-1">
                        <div className="dashboard-icon-tile flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.05]">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-['Inter'] font-bold text-[14px] uppercase tracking-[0.14em] text-[#FFC600] mb-0.5">Real Exam Simulation</p>
                            <h3 className="font-['Poppins'] font-bold text-[20px] text-white leading-tight">Mock Test Sessions</h3>
                            <p className="font-['Inter'] text-[14px] text-white/55 mt-0.5 leading-snug">Simulate official MDCAT under timed, exam-day conditions.</p>
                        </div>
                        </div>
                        <div className="relative mt-3 flex items-center justify-between">
                        <span className="quiz-btn-secondary inline-flex items-center gap-1.5 rounded-full border border-[#FFC600]/40 px-3.5 py-1.5 font-['Poppins'] font-semibold text-[14px] text-[#FFC600]">
                            Take a Test
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </span>
                        <span className="font-['Inter'] text-[14px] text-white/40">Timed · {sa?.tests_attempted} attempted</span>
                        </div>
                    </div>
                    </Link>

                    <section className="card-sm flex-[1.5] min-h-0 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        <h3 className="font-['Poppins'] font-medium text-white/80 text-[15px]">My Copy</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                        <Link to="/dashboard/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", false))} className="flex">
                        <div className="relative flex-1 inner-tile rounded-xl flex flex-col items-center justify-center gap-1.5 py-3 px-2">
                            <div className="dash-bg-red flex h-9 w-9 items-center justify-center rounded-xl">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-red"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg>
                            </div>
                            <span className="dash-copy-label font-['Inter'] text-[15px] uppercase tracking-wide">My Mistakes</span>
                            <span className="dash-accent-red dash-bg-red inline-flex items-center gap-0.5 rounded-md px-2 py-1 font-['Inter'] font-medium text-[14px]">
                            Review Now <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </span>
                        </div>
                        </Link>
                        <Link to="/dashboard/my-copy" onClick={() => JSON.stringify(sessionStorage.setItem("isSavedCopy", true))} className="flex">
                        <div className="relative flex-1 inner-tile rounded-xl flex flex-col items-center justify-center gap-1.5 py-3 px-2">
                            <div className="dash-bg-sky flex h-9 w-9 items-center justify-center rounded-xl">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-accent-sky"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </div>
                            <span className="dash-copy-label font-['Inter'] text-[15px] uppercase tracking-wide">Bookmarks</span>
                            <span className="dash-accent-sky dash-bg-sky inline-flex items-center gap-0.5 rounded-md px-2 py-1 font-['Inter'] font-medium text-[14px]">
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
                        <p className="dash-goal-text font-['Inter'] text-[15px]">Your goal should be to reach {sa?.target_marks ?? 0} / 180</p>
                        <button type='button' onClick={() => setPopUpHidden(false)} className="cursor-pointer quiz-btn-secondary dashboard-surface-btn mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#FFC600]/20 bg-[#FFC600]/[0.05] py-1.5 text-center font-['Inter'] text-[14px] font-semibold text-[#E0A800] transition-colors hover:bg-[#FFC600]/[0.11]">
                            Understand Score Predictor Algorithm
                        {/* <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg> */}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-h-0">
                        <div className="flex-shrink-0 w-[40%]">
                        <span className="dash-accent-amber block font-['Poppins'] font-medium leading-none" style={{ fontSize: "62px" }}>{(sa?.predicted_score ?? 0)}</span>
                        <span className="font-['Inter'] text-[15px] text-white/40 mt-1 block">Your Predicted Score</span>
                        </div>
                        <div className="w-[60%] flex-shrink-0">
                        <svg viewBox="0 -10 200 115" className="w-full">
                            <path d="M 14.00 100.00 A 86 86 0 0 1 39.21 39.21 L 52.62 52.62 A 67 67 0 0 0 33.00 100.00 Z" fill="#EF4444"/>
                            <path d="M 39.21 39.21 A 86 86 0 0 1 100.00 14.00 L 100.00 33.00 A 67 67 0 0 0 52.62 52.62 Z" fill="#F97316"/>
                            <path d="M 100.00 14.00 A 86 86 0 0 1 160.79 39.21 L 147.38 52.62 A 67 67 0 0 0 100.00 33.00 Z" fill="#EAB308"/>
                            <path d="M 160.79 39.21 A 86 86 0 0 1 186.00 100.00 L 167.00 100.00 A 67 67 0 0 0 147.38 52.62 Z" fill="#22C55E"/>
                            <text x="14" y="100" textAnchor="end" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgb(var(--ui-text-rgb) / 0.38)">0</text>
                            <text x="39.21" y="39.21" textAnchor="end" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgb(var(--ui-text-rgb) / 0.38)">45</text>
                            <text x="100" y="1" textAnchor="middle" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgb(var(--ui-text-rgb) / 0.38)">90</text>
                            <text x="160.79" y="39.21" textAnchor="start" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgb(var(--ui-text-rgb) / 0.38)">135</text>
                            <text x="186" y="100" textAnchor="start" dominantBaseline="middle" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgb(var(--ui-text-rgb) / 0.38)">180</text>
                            <g transform={`translate(100 100) rotate(${-90 + (sa?.predicted_score ?? 0)})`}>
                            <path className="dash-gauge-needle" d="M 3,0 C 2.2,-28 1,-60 0,-62 C -1,-60 -2.2,-28 -3,0 C -1.5,3 1.5,3 3,0 Z"/>
                            </g>
                            <circle className="dash-gauge-needle" cx="100" cy="100" r="6"/>
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
                        {
                            leaderboard?.slice(0,10).map((score, i) => {
                            let icon = i + 1;
                            if(i === 0) icon = '🥇';
                            else if(i === 1) icon = '🥈';
                            else if(i === 2) icon = '🥉';

                            return (
                                <div key={score.id} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${student.id === score.id && '!bg-[#FFC600]/10 border !border-[#FFC600]'}`}>
                                    <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">{icon}</span>
                                    <div className="dash-bg-emerald dash-accent-emerald flex h-8 w-8 items-center justify-center rounded-full font-['Poppins'] text-[10px] font-bold">{score?.name?.split(' ')?.map(n => n?.[0]?.toUpperCase())?.join('')}</div>
                                    <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">{score?.name}</span>
                                    <span className="dash-accent-emerald font-['Poppins'] text-[15px] font-bold">{score?.predicted_score ?? 0}</span>
                                </div>
                            )
                            })
                        }
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
