import { Link, useOutletContext } from 'react-router-dom';
import '../../src/animation.css';
import React, { use, useEffect, useState } from 'react'
import { subjectToColor } from '../../utils/HelperObjects';

//weekly activity remaining + all other things

// const subjectCircleLink = ({subject, color, accuracy, total}) => {
//     return (
//         <Link to={`/dashboard/analytics/${subject.toLowerCase()}`} className="group block w-[30%] md:w-[17%]">
//             <div className="relative flex flex-col items-center gap-1.5 py-1 cursor-pointer transition-transform duration-200 hover:-translate-y-1">
//                 <div className="relative rounded-full transition-all duration-200 group-hover:drop-shadow-[0_0_14px_rgba(255,198,0,0.45)]">
//                 <svg width="74" height="74" className="-rotate-90">
//                     <circle cx="37" cy="37" r="34" stroke="#2E302E" strokeWidth="6" fill="none"/>
//                     <circle cx="37" cy="37" r="34" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none"
//                             strokeDasharray="213.628" strokeDashoffset="89.72"/>
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="font-poppins font-black" style={{ color: `#38BDF8`, fontSize: "13px" }}>{accuracy}%</span>
//                 </div>
//                 <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#FFC600] border-2 border-[#181A18] flex items-center justify-center shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.5)] pulse-chevron" style={{ animationDelay: "0.15s" }}>
//                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
//                 </div>
//                 </div>
//                 <p className="font-poppins font-black text-[13px] text-white text-center leading-tight group-hover:text-[#FFC600] transition-colors">Chemistry</p>
//                 <span className="font-inter text-[13px] text-[#A8ACA8]">{total} MCQs</span>
//                 <span className="inline-flex items-center gap-0.5 text-[13px] font-poppins font-black px-1.5 py-0.5 rounded-md border text-red-400 bg-red-400/10 border-red-400/30">-1%</span>
//             </div>
//         </Link>
//     )
// }

const UserAnalyticsPage = () => {
    const {studentAnalytics : sa} = useOutletContext();

    const isSameCalendarDay = (a, b) => {
        const d1 = new Date(a)
        const d2 = new Date(b)
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        )
    }

    const attemptCountToTier = (count) => {
        const n = Number(count) || 0
        if (n === 0) return 0
        if (n < 10) return 1
        if (n < 30) return 2
        if (n < 60) return 3
        return 4
    }

    const attemptCountToColor = {
        0: {
            card: 'border-2 bg-[#181A18] border-[#2E302E]',
            day: 'text-[13px] font-poppins font-black uppercase tracking-[0.08em] text-[#A8ACA8]/55',
            date: 'text-[13px] font-inter text-[#A8ACA8]/55',
            count: 'font-poppins font-black text-[16px] leading-none mt-1 text-[#2E302E]',
            label: 'text-[10px] font-inter font-bold uppercase tracking-wider text-[#A8ACA8]/40',
        },
        1: {
            card: 'border-2 bg-[#FFC600]/15 border-[#FFC600]/25',
            day: 'text-[13px] font-poppins font-black uppercase tracking-[0.08em] text-[#A8ACA8]',
            date: 'text-[13px] font-inter text-[#A8ACA8]',
            count: 'font-poppins font-black text-[16px] leading-none mt-1 text-white',
            label: 'text-[10px] font-inter font-bold uppercase tracking-wider text-[#A8ACA8]',
        },
        2: {
            card: 'border-2 bg-[#FFC600]/35 border-[#FFC600]/45',
            day: 'text-[13px] font-poppins font-black uppercase tracking-[0.08em] text-white/75',
            date: 'text-[13px] font-inter text-white/75',
            count: 'font-poppins font-black text-[16px] leading-none mt-1 text-white',
            label: 'text-[10px] font-inter font-bold uppercase tracking-wider text-white/60',
        },
        3: {
            card: 'border-2 bg-[#FFC600]/70 border-[#FFC600]/80',
            day: 'text-[13px] font-poppins font-black uppercase tracking-[0.08em] text-[#181A18]/70',
            date: 'text-[13px] font-inter text-[#181A18]/70',
            count: 'font-poppins font-black text-[16px] leading-none mt-1 text-[#181A18]',
            label: 'text-[10px] font-inter font-bold uppercase tracking-wider text-[#181A18]/65',
        },
        4: {
            card: 'border-2 bg-[#FFC600] border-[#FFC600]',
            day: 'text-[13px] font-poppins font-black uppercase tracking-[0.08em] text-[#181A18]/75',
            date: 'text-[13px] font-inter text-[#181A18]/75',
            count: 'font-poppins font-black text-[16px] leading-none mt-1 text-[#181A18]',
            label: 'text-[10px] font-inter font-bold uppercase tracking-wider text-[#181A18]/65',
        },
    }

    const [weekActivity, setWeekActivity] = useState([]);
    const [performanceActivity, setPerformanceActivity] = useState([]);
    const [totalWeekMcqs, setTotalWeekMcqs] = useState(0);
    const [frequency, setFrequency] = useState(0);

    const frequencyToWord = {
        0 : 'Daily',
        1 : 'Weekly',
        2 : 'Monthly'
    }
    
    const numberToDay = {0:'SUN',1:'MON',2:'TUE',3:'WED',4:'THU',5:'FRI',6:'SAT'};

    const API_URL = import.meta.env.VITE_API_URL;
    const MDCATEMY_DATE = import.meta.env.VITE_MDCATEMY_DATE;

    const formatActivityDate = (index) => {
        return new Date(sa?.activity?.[index]?.activity_date ?? Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    const fillMissingDates = (data) => {
        if(!data) return;

        let dates = [];
        let date = new Date(data[data.length - 1]?.activity_date ?? Date.now());

        let counter = 0, recent = Date.now();
        const diff = parseInt((Date.now() - new Date(data[0]?.activity_date ?? Date.now())) / (3600 * 24 * 1000));
        if(diff > 6){
            recent -= 3600 * 24 * 1000 * (diff - 6);
        }

        while(!isSameCalendarDay(recent, date)){
            dates.push(formatDate(date));
            date.setDate(date.getDate()+1);
            counter++;
        }

        for(let i=0 ; i<7-counter ; i++){
            dates.push(formatDate(date));
            date.setDate(date.getDate()-1);
        }

        dates.forEach(date => {
            if(!data.some(activity => activity?.activity_date === date)){
                data.push({attempt_count: 0, correct_count: 0, activity_date: date});
            }
        });
        
        // console.log(data);
        data.sort((a, b) => new Date(a?.activity_date) - new Date(b?.activity_date));
        data = data.filter(activity => new Date(activity?.activity_date) >= new Date(MDCATEMY_DATE));
        return data;
    }

    const updateActivity = async (isNext, isActivity) => {
        let startDate = isActivity ? new Date(weekActivity[0]?.activity_date) : new Date(performanceActivity[0]?.activity_date);
        startDate.setDate(startDate.getDate() + (isNext ? 1 : -1));
        
        let endDate = isActivity ? new Date(weekActivity[weekActivity?.length-1]?.activity_date) : new Date(performanceActivity[performanceActivity?.length-1]?.activity_date);;
        endDate.setDate(endDate.getDate() + (isNext ? 1 : -1));
        
        startDate = `${startDate.getFullYear()}-${String(startDate.getMonth()+1).padStart(2,'0')}-${String(startDate.getDate()).padStart(2,'0')}`;
        endDate = `${endDate.getFullYear()}-${String(endDate.getMonth()+1).padStart(2,'0')}-${String(endDate.getDate()).padStart(2,'0')}`;
        
        const res = await fetch(`${API_URL}/users/activity?start_date=${startDate}&end_date=${endDate}`, {credentials: 'include'});
        
        const data = await res.json();
        
        if(data.status === 'success'){
            if(isActivity){ 
                setWeekActivity(fillMissingDates(data.data));
                setTotalWeekMcqs(data.data.reduce((acc, val) => acc + val.attempt_count, 0));
            }
            else setPerformanceActivity(fillMissingDates(data.data));
        }
    }

    const getPredictedScorePerSubject = (subject, total) => {
        return Math.round(0.25 + 0.7 * (((sa?.subjects[subject] ?? 0) / 100) * total));
    }

    useEffect(() => {
        setWeekActivity(fillMissingDates(sa?.activity));
        setPerformanceActivity(fillMissingDates(sa?.activity));
        setTotalWeekMcqs(sa?.activity?.reduce((acc, val) => acc + val.attempt_count, 0));
    }, [sa]);

    // console.log(sa?.activity);

    return (
        <>
        <style>
            {
                `
                * { box-sizing: border-box; }
                .font-poppins { font-family: "Poppins", sans-serif; }
                .font-inter   { font-family: "Inter",   sans-serif; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #181A18; }
                ::-webkit-scrollbar-thumb { background: #FFC600; border-radius: 3px; }
                ::selection { background: rgba(255,198,0,0.3); color: #fff; }

                /* Yellow gradient text used in headings */
                .text-gradient-yellow {
                background: linear-gradient(135deg, #FFC600 0%, #FFA500 100%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                }

                /* Pulsing chevron on subject ring (mobile / tablet) */
                @keyframes pulse-chevron {
                0%, 100% { transform: scale(1); }
                50%      { transform: scale(1.12); }
                }
                .pulse-chevron { animation: pulse-chevron 1.4s ease-in-out infinite; }
                `
            }
        </style>
        <main className="fade-in bg-[#181A18] min-h-screen">

            <div className="flex min-h-screen bg-[#181A18] overflow-x-hidden">

                <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">

                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 lg:px-8 py-6 space-y-6 max-w-5xl mx-auto">

                    <div>
                        <div className="flex items-center justify-between mb-4">
                        <h2 className="font-poppins font-black text-white text-[14px] uppercase tracking-[0.08em]">Your Stats</h2>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">

                        <div className="relative bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-3 flex flex-col gap-2 shadow-[3px_3px_0px_rgba(255,198,0,0.12)] hover:shadow-[1px_1px_0px_rgba(255,198,0,0.12)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                            <div className="flex items-start justify-between gap-1.5">
                            <p className="text-[12px] font-poppins font-black uppercase tracking-[0.06em] text-[#A8ACA8] leading-tight">Total MCQs</p>
                            <div className="w-7 h-7 bg-[#FFC600] border-2 border-[#181A18] rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                                </svg>
                            </div>
                            </div>
                            <div>
                            <p className="font-poppins font-black text-[20px] leading-none text-white">{sa?.total_attempt ?? 0}</p>
                            <p className="text-[#A8ACA8] text-[12px] font-inter mt-1 truncate">Lifetime</p>
                            </div>
                        </div>

                        <div className="relative bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-3 flex flex-col gap-2 shadow-[3px_3px_0px_rgba(255,198,0,0.12)] hover:shadow-[1px_1px_0px_rgba(255,198,0,0.12)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                            <div className="flex items-start justify-between gap-1.5">
                            <p className="text-[12px] font-poppins font-black uppercase tracking-[0.06em] text-[#A8ACA8] leading-tight">Accuracy</p>
                            <div className="w-7 h-7 bg-[#FFC600] border-2 border-[#181A18] rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                                </svg>
                            </div>
                            </div>
                            <div>
                            <p className="font-poppins font-black text-[20px] leading-none text-amber-400">{sa?.total_attempt ? parseInt((sa?.total_correct / sa?.total_attempt) * 100) : 0}%</p>
                            <p className="text-[#A8ACA8] text-[12px] font-inter mt-1 truncate">Correct rate</p>
                            </div>
                        </div>

                        <div className="relative bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-3 flex flex-col gap-2 shadow-[3px_3px_0px_rgba(255,198,0,0.12)] hover:shadow-[1px_1px_0px_rgba(255,198,0,0.12)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                            <div className="flex items-start justify-between gap-1.5">
                            <p className="text-[12px] font-poppins font-black uppercase tracking-[0.06em] text-[#A8ACA8] leading-tight">Streak</p>
                            <div className="w-7 h-7 bg-[#FFC600] border-2 border-[#181A18] rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                                </svg>
                            </div>
                            </div>
                            <div>
                            <p className="font-poppins font-black text-[20px] leading-none text-orange-400">{sa?.streak ?? 0}d</p>
                            <p className="text-[#A8ACA8] text-[12px] font-inter mt-1 truncate">{sa?.streak ? 'Keep it alive' : 'Begin your streak'}</p>
                            </div>
                        </div>

                        <div className="relative bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-3 flex flex-col gap-2 shadow-[3px_3px_0px_rgba(255,198,0,0.12)] hover:shadow-[1px_1px_0px_rgba(255,198,0,0.12)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                            <div className="flex items-start justify-between gap-1.5">
                            <p className="text-[12px] font-poppins font-black uppercase tracking-[0.06em] text-[#A8ACA8] leading-tight">Today</p>
                            <div className="w-7 h-7 bg-[#FFC600] border-2 border-[#181A18] rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>
                                </svg>
                            </div>
                            </div>
                            <div>
                            <p className="font-poppins font-black text-[20px] leading-none text-white">{sa?.today_attempt ?? 0} / 50</p>
                            <p className="text-[#A8ACA8] text-[12px] font-inter mt-1 truncate">{(sa?.today_attempt ?? 0) * 2}% of goal</p>
                            </div>
                        </div>

                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                        <h2 className="font-poppins font-black text-white text-[14px] uppercase tracking-[0.08em]">Score Predictor</h2>
                        </div>

                        <div className="bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)]">
                        <div className="flex items-start justify-between mb-1">
                            <div>
                            <p className="text-[12px] font-poppins font-black uppercase tracking-[0.14em] text-[#A8ACA8]">Score Predictor</p>
                            <p className="text-[#A8ACA8] text-[13px] font-inter mt-0.5">Accuracy × MDCAT subject weights</p>
                            </div>
                            <div className="text-right">
                            <p className="text-[12px] font-poppins font-black uppercase tracking-[0.1em] text-[#A8ACA8]">Target</p>
                            <p className="font-poppins font-black text-white text-lg leading-none">{sa?.target_marks ?? 0}</p>
                            </div>
                        </div>

                        <div className="relative w-full flex justify-center">
                            <svg width="100%" height="170" viewBox="0 0 280 170" preserveAspectRatio="xMidYMid meet" className="overflow-visible max-w-[320px]">
                                <defs>
                                    <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#D9534F"/>
                                    <stop offset="50%" stopColor="#FFA500"/>
                                    <stop offset="100%" stopColor="#28A745"/>
                                    </linearGradient>
                                    <filter id="gauge-glow" x="-40%" y="-40%" width="180%" height="180%">
                                    <feGaussianBlur stdDeviation="4"/>
                                    </filter>
                                </defs>

                                <path d="M 32 140 A 108 108 0 0 1 248 140" fill="none" stroke="var(--ui-border)" strokeWidth="18" strokeLinecap="round"/>

                                <path d="M 32 140 A 108 108 0 0 1 248 140" fill="none" stroke="url(#gauge-grad)"
                                        strokeWidth="18" strokeLinecap="round"
                                        strokeDasharray="339.292" strokeDashoffset={339.292 * (1 - (sa?.predicted_score ?? 0) / 180)}/>

                                {/* <circle cx="233.53" cy="86" r="6" fill="#FFC600" stroke="#222422" strokeWidth="3"/>

                                <circle cx="181.19" cy="40.17" r="11" fill="#FFC600" opacity="0.25" filter="url(#gauge-glow)"/>
                                <circle cx="181.19" cy="40.17" r="8" fill="#FFFFFF" stroke="#181A18" strokeWidth="3"/> */}

                                <text x="32"  y="162" textAnchor="middle" fill="#A8ACA8" fontSize="11" fontFamily="Inter" fontWeight="600">0</text>
                                <text x="248" y="162" textAnchor="middle" fill="#A8ACA8" fontSize="11" fontFamily="Inter" fontWeight="600">180</text>
                            </svg>

                            <div className="absolute inset-x-0 top-[44%] -translate-y-1/2 flex flex-col items-center pointer-events-none">
                            <div className="flex items-baseline gap-1.5">
                                <span className="mt-6 ml-2 font-poppins font-black text-4xl text-[#FFC600] leading-none">{(sa?.predicted_score ?? 0)}</span>
                                <span className="font-inter text-[#A8ACA8] text-sm">/ 180</span>
                            </div>
                            <span className="text-[13px] font-poppins font-black mt-1 text-amber-400">{parseInt(((sa?.predicted_score ?? 0) / 180) * 100)}%</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3 justify-center">
                            <div className="flex items-center gap-1.5 bg-[#181A18] border-2 border-[#2E302E] rounded-xl px-2.5 py-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981" }}></div>
                            <span className="text-[12px] font-poppins font-black text-[#A8ACA8]">Bio</span>
                            <span className="text-[12px] font-inter text-white font-bold">{getPredictedScorePerSubject('biology',81)}</span>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">/ 81</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#181A18] border-2 border-[#2E302E] rounded-xl px-2.5 py-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#38BDF8" }}></div>
                            <span className="text-[12px] font-poppins font-black text-[#A8ACA8]">Chem</span>
                            <span className="text-[12px] font-inter text-white font-bold">{getPredictedScorePerSubject('chemistry',45)}</span>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">/ 45</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#181A18] border-2 border-[#2E302E] rounded-xl px-2.5 py-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#A78BFA" }}></div>
                            <span className="text-[12px] font-poppins font-black text-[#A8ACA8]">Phys</span>
                            <span className="text-[12px] font-inter text-white font-bold">{getPredictedScorePerSubject('physics',36)}</span>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">/ 36</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#181A18] border-2 border-[#2E302E] rounded-xl px-2.5 py-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2DD4BF" }}></div>
                            <span className="text-[12px] font-poppins font-black text-[#A8ACA8]">Eng</span>
                            <span className="text-[12px] font-inter text-white font-bold">{getPredictedScorePerSubject('english',9)}</span>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">/ 9</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#181A18] border-2 border-[#2E302E] rounded-xl px-2.5 py-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FB923C" }}></div>
                            <span className="text-[12px] font-poppins font-black text-[#A8ACA8]">LR</span>
                            <span className="text-[12px] font-inter text-white font-bold">{getPredictedScorePerSubject('logical_reasoning',9)}</span>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">/ 9</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div data-section="subjects-prep">
                        <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                        <h2 className="font-poppins font-black text-white text-[15px] uppercase tracking-[0.04em]">Subjects Preparation</h2>

                        <div className="flex items-center gap-1 bg-[#181A18] border-2 border-[#2E302E] rounded-xl p-0.5" data-trend-filter>
                            {
                                [0,1,2].map(freq => {
                                    return (
                                        <button key={freq} onClick={() => setFrequency(freq)}
                                                className={`cursor-pointer px-2.5 py-1 rounded-lg text-[12px] font-poppins font-black uppercase tracking-[0.08em] transition-all ${frequency === freq ? 'bg-[#FFC600] text-[#181A18] shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.4)]' : 'text-[#A8ACA8] hover:text-white'}`}>
                                        {frequencyToWord[freq]}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        </div>
                        <p className="text-[#A8ACA8] font-inter text-[12px] mb-4">
                        Tap a subject to drill in. Each ring shows accuracy <span data-trend-label>vs last week</span>.
                        </p>

                        <div className="bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-4 shadow-[4px_4px_0px_rgba(255,198,0,0.1)]">
                        <div className="flex flex-wrap justify-center gap-y-4 gap-x-3 md:gap-x-4">

                            {
                                sa?.performance?.map((perf, i) => {
                                    let freqToAccess = perf.prev_day_increase ?? 0;
                                    if(frequency === 1){
                                        freqToAccess = perf.prev_week_increase ?? 0;
                                    } else if(frequency === 2){
                                        freqToAccess = perf.prev_month_increase ?? 0;
                                    }

                                    const percentage = sa?.subjects[perf.subject_name.replace(' ', '_').toLowerCase()] ?? 0;

                                    return (
                                        <Link key={i} to={`/dashboard/analytics/${perf.subject_name.toLowerCase().replace(' ','-')}`} className="group block w-[30%] md:w-[17%]">
                                            <div className="relative flex flex-col items-center gap-1.5 py-1 cursor-pointer transition-transform duration-200 hover:-translate-y-1">
                                                <div className="relative rounded-full transition-all duration-200 group-hover:drop-shadow-[0_0_14px_rgba(255,198,0,0.45)]">
                                                <svg width="74" height="74" className="-rotate-90">
                                                    <circle cx="37" cy="37" r="34" stroke="var(--ui-border)" strokeWidth="6" fill="none"/>
                                                    <circle cx="37" cy="37" r="34" stroke={subjectToColor[perf.subject_name] ?? '#10B981'} strokeWidth="6" strokeLinecap="round" fill="none"
                                                            strokeDasharray="213.628" strokeDashoffset={213.628 - percentage}/>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="font-poppins font-black" style={{ color: `${subjectToColor[perf.subject_name] ?? '#10B981'}`, fontSize: "13px" }}>{percentage ?? 0}%</span>
                                                </div>
                                                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#FFC600] border-2 border-[#181A18] flex items-center justify-center shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.5)] pulse-chevron" style={{ animationDelay: "0s" }}>
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                                                </div>
                                                </div>
                                                <p className="font-poppins font-black text-[13px] text-white text-center leading-tight group-hover:text-[#FFC600] transition-colors">{perf.subject_name ?? 'None'}</p>
                                                <span className="font-inter text-[13px] text-[#A8ACA8]">{sa?.subjects?.biology?.attempt ?? 0} MCQs</span>
                                                <span className="inline-flex items-center gap-0.5 text-[13px] font-poppins font-black px-1.5 py-0.5 rounded-md border text-emerald-400 bg-emerald-400/10 border-emerald-400/30">{freqToAccess}%</span>
                                            </div>
                                        </Link>
                                    )
                                })
                            }

                        </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4 gap-3">
                        <div className="flex items-baseline gap-3 min-w-0">
                            <h2 className="font-poppins font-black text-white text-[14px] uppercase tracking-[0.08em] flex-shrink-0">Recent Activity</h2>
                            <span className="text-[#A8ACA8] font-inter text-[13px] tracking-wide truncate">{formatActivityDate(0)} – {formatActivityDate(6)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button onClick={() => updateActivity(false, true)} aria-label="Previous week"
                                    disabled={!(weekActivity?.length && !isSameCalendarDay(weekActivity?.[0]?.activity_date, MDCATEMY_DATE))}
                                    className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center  ${weekActivity?.length && !isSameCalendarDay(weekActivity?.[0]?.activity_date, MDCATEMY_DATE) ? 'transition-all bg-[#222422] border-[#2E302E] text-white hover:border-[#FFC600] hover:text-[#FFC600] hover:shadow-[2px_2px_0px_rgba(255,198,0,0.25)] cursor-pointer' : 'bg-[#181A18]/40 border-[#2E302E]/50 text-[#2E302E] cursor-not-allowed opacity-50'}`}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                            </button>
                            <button onClick={() => updateActivity(true, true)} aria-label="Next week"
                                    disabled={!(weekActivity?.length && !isSameCalendarDay(weekActivity?.[weekActivity?.length-1]?.activity_date, Date.now()))}
                                    className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center ${weekActivity?.length && !isSameCalendarDay(weekActivity?.[weekActivity?.length-1]?.activity_date, Date.now()) ? 'transition-all bg-[#222422] border-[#2E302E] text-white hover:border-[#FFC600] hover:text-[#FFC600] hover:shadow-[2px_2px_0px_rgba(255,198,0,0.25)] cursor-pointer' : 'bg-[#181A18]/40 border-[#2E302E]/50 text-[#2E302E] cursor-not-allowed opacity-50'}`}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                            </button>
                        </div>
                        </div>

                        <div className="bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)]">

                        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                            <div className="flex items-center gap-4">
                            <div>
                                <p className="text-[13px] font-poppins font-black uppercase tracking-[0.14em] text-[#A8ACA8]">Total</p>
                                <p className="font-poppins font-black text-white text-[18px] leading-none mt-0.5">
                                {totalWeekMcqs} <span className="text-[#A8ACA8] text-[13px] font-inter font-normal">MCQs</span>
                                </p>
                            </div>
                            <div className="w-px h-8 bg-[#2E302E]"></div>
                            <div>
                                <p className="text-[13px] font-poppins font-black uppercase tracking-[0.14em] text-[#A8ACA8]">Active</p>
                                <p className="font-poppins font-black text-white text-[18px] leading-none mt-0.5">
                                {weekActivity?.reduce((acc, val) => val.attempt_count ? acc + 1 : acc, 0)}<span className="text-[#A8ACA8] text-[13px] font-inter font-normal">/7 days</span>
                                </p>
                            </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-orange-400 bg-orange-400/10 border border-orange-400/30 rounded-full px-2.5 py-1">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                            </svg>
                            <span className="text-[13px] font-poppins font-black">{sa?.streak}d streak</span>
                            </div>
                        </div>
                        
                        {
                            weekActivity?.length ? 
                            <div className="grid grid-cols-7 gap-1.5">

                                {
                                    weekActivity?.map((activity, i) => {
                                        const tier = attemptCountToTier(activity?.attempt_count)
                                        const styles = attemptCountToColor[tier]
                                        const isToday = activity?.activity_date && isSameCalendarDay(activity?.activity_date, new Date())
                                        return (
                                            <div
                                                key={i}
                                                className={`relative rounded-xl py-2.5 px-1 flex flex-col items-center gap-0.5 ${styles.card} ${isToday ? 'ring-2 ring-[#FFC600]/30 border-[#FFC600]' : ''}`}
                                            >
                                                {isToday ? (
                                                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-px rounded-full bg-[#FFC600] text-[#181A18] text-[7px] font-poppins font-black uppercase tracking-wider border border-[#181A18]">
                                                        Today
                                                    </span>
                                                ) : null}
                                                <span className={styles.day}>{numberToDay[new Date(activity?.activity_date).getDay()]}</span>
                                                <span className={styles.date}>{new Date(activity?.activity_date).getDate()}</span>
                                                <span className={styles.count}>{activity?.attempt_count ?? 0}</span>
                                                <span className={styles.label}>MCQs</span>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            :
                            <span className='w-full inline-block text-center text-xl'>No data to show yet!</span>
                        }

                        <div className="flex items-center gap-x-3 gap-y-2 mt-4 flex-wrap">
                            <span className="text-[12px] font-poppins font-black uppercase tracking-[0.12em] text-[#A8ACA8]">Legend</span>
                            <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded border bg-[#181A18] border-[#2E302E]"></div>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">0</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded border bg-[#FFC600]/15 border-[#FFC600]/25"></div>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">1–9</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded border bg-[#FFC600]/35 border-[#FFC600]/45"></div>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">10–29</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded border bg-[#FFC600]/70 border-[#FFC600]/80"></div>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">30–59</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded border bg-[#FFC600] border-[#FFC600]"></div>
                            <span className="text-[12px] font-inter text-[#A8ACA8]">60+</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4 gap-3">
                        <div className="flex items-baseline gap-3 min-w-0">
                            <h2 className="font-poppins font-black text-white text-[14px] uppercase tracking-[0.08em] flex-shrink-0">Performance — Last 7 Days</h2>
                            <span className="text-[#A8ACA8] font-inter text-[13px] tracking-wide truncate">{formatActivityDate(0)} – {formatActivityDate(6)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button onClick={() => updateActivity(false, false)} aria-label="Previous week"
                                    disabled={!(performanceActivity?.length && !isSameCalendarDay(performanceActivity?.[0]?.activity_date, MDCATEMY_DATE))}
                                    className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center  ${performanceActivity?.length && !isSameCalendarDay(performanceActivity?.[0]?.activity_date, MDCATEMY_DATE) ? 'transition-all bg-[#222422] border-[#2E302E] text-white hover:border-[#FFC600] hover:text-[#FFC600] hover:shadow-[2px_2px_0px_rgba(255,198,0,0.25)] cursor-pointer' : 'bg-[#181A18]/40 border-[#2E302E]/50 text-[#2E302E] cursor-not-allowed opacity-50'}`}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                            </button>
                            <button onClick={() => updateActivity(true, false)} aria-label="Next week"
                                    disabled={!(performanceActivity?.length && !isSameCalendarDay(performanceActivity?.[performanceActivity?.length-1]?.activity_date, Date.now()))}
                                    className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center  ${performanceActivity?.length && !isSameCalendarDay(performanceActivity?.[performanceActivity?.length-1]?.activity_date, Date.now()) ? 'transition-all bg-[#222422] border-[#2E302E] text-white hover:border-[#FFC600] hover:text-[#FFC600] hover:shadow-[2px_2px_0px_rgba(255,198,0,0.25)] cursor-pointer' : 'bg-[#181A18]/40 border-[#2E302E]/50 text-[#2E302E] cursor-not-allowed opacity-50'}`}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                            </button>
                        </div>
                        </div>

                        <div className="bg-[#222422] border-2 border-[#2E302E] rounded-2xl p-5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)]">
                        
                        {
                            performanceActivity?.length ? 
                            <div className="flex items-end gap-2 h-[200px]">
                                {
                                    performanceActivity?.map((activity, i) => {
                                        let bgColor = '#FFA500';
                                        let textColor = 'text-amber-400';
                                        let height = parseInt((activity.correct_count / (activity.attempt_count || 1)) * 100);
    
                                        if(height > 75){
                                            bgColor = '#10B981';
                                            textColor = 'text-emerald-400';
                                        }
                                        else if(height < 50){
                                            bgColor = '#FF0000';
                                            textColor = 'text-red-400';
                                        }
                                        return (
                                            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                                                <span className={`text-[12px] font-poppins font-black ${textColor}`}>{height}%</span>
                                                <div className="w-full rounded-t-md" style={{height: `${height / 2}%` , background: `${bgColor}`, opacity: "0.65" }}></div>
                                                <span className="text-[12px] font-poppins font-black text-[#A8ACA8]">{numberToDay[new Date(activity.activity_date).getDay()]}</span>
                                                <span className="text-[13px] font-inter text-[#A8ACA8]/70">{new Date(activity.activity_date).getDate()}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : 
                            <span className='w-full inline-block text-center text-xl'>No data to show yet!</span>
                        }


                        <div className="mt-4 pt-4 border-t border-[#2E302E] flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-2.5 py-1">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                            </svg>
                            <span className="text-[13px] font-poppins font-black">{sa?.performance?.reduce((acc, perf) => parseInt(acc + (perf.prev_week_increase ?? 0) / 5), 0)}% from last week</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-poppins font-black uppercase tracking-[0.1em] text-[#A8ACA8]">Avg</span>
                            <span className="font-poppins font-black text-[15px] text-amber-400">{weekActivity?.reduce((acc, activity) => acc + parseInt(((activity.correct_count / (activity.attempt_count || 1)) * 100) / 7), 0)}%</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                        <h2 className="font-poppins font-black text-white text-[14px] uppercase tracking-[0.08em]">Focus Here — Weak Topics</h2>
                        <Link to="/dashboard/quiz-builder" className="text-[#FFC600] text-xs font-poppins font-black hover:underline flex items-center gap-1">
                            Go to Quiz Builder
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </Link>
                        </div>

                        <div className="bg-[#222422] border border-[#2E302E] rounded-xl divide-y divide-[#2E302E]">


                        {
                            sa?.weak_topics?.map((topic, i) => {
                                return (
                                    <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#2A2C2A]/20 transition-colors">
                                        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: `${subjectToColor[topic.subject_name]}` }}></div>
                                        <div className="flex-1 min-w-0">
                                        <p className="font-inter font-bold text-[13px] text-white truncate">{topic.topic_name}</p>
                                        <p className="text-[#A8ACA8] text-[13px] font-inter">{topic.subject_name} · {topic.chapter_name}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                        <p className="font-poppins font-black text-red-400 text-base">{topic.tmi}%</p>
                                        <p className="text-[#A8ACA8] text-[12px] font-inter">correct</p>
                                        </div>
                                        <Link to="/dashboard/quiz-builder" className="w-7 h-7 bg-[#FFC600]/10 border border-[#FFC600]/20 rounded-md flex items-center justify-center text-[#FFC600] hover:bg-[#FFC600]/20 transition-colors">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6"/>
                                            </svg>
                                        </Link>
                                    </div>
                                )
                            })
                        }

                        </div>
                    </div>

                    <div className="h-4"></div>
                    </div>
                </div>
                </div>
            </div>

        </main>
        </>
    )
}

export default UserAnalyticsPage