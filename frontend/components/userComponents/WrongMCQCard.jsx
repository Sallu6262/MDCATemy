import React, { useState } from 'react'
import sendErrorSuccessMessage from '../../utils/sendErrorSuccessMessage'
import '../../src/animation.css'

const WrongMCQCard = ({mcq, setNotMasteredMcqs, setPendingMistakes, setWrongMcqs}) => {
    // console.log(mcq);
    const [showOptions, setShowOptions] = useState(false);
    const [masterLoading, setMasterLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const subjectToColor = {
        'Biology' : '#10B981',
        'Chemistry' : '#A78BFA',
        'Physics' : '#38BDF8',
        'English' : '#F59E0B',
        'Logical Reasoning' : '#F472B6',
    }

    const difficultyToColor = {
        'EASY' : 'text-green-400 bg-green-400/10 border-green-400/25',
        'MEDIUM' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25',
        'HARD' : 'text-red-400 bg-red-400/10 border-red-400/25'
    }

    const optionToName = {
        'A' : mcq?.option_a,
        'B' : mcq?.option_b,
        'C' : mcq?.option_c,
        'D' : mcq?.option_d,
    }

    const displayMCQOption = (optionChar, optionValue) => {
        if(mcq?.selected_option === optionChar){
            return <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/30 bg-red-500/5">
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[14px] font-mono font-bold bg-red-500 text-white">{optionChar}</div>
                <span className="font-[Inter] text-[13px] flex-1 text-red-300">{optionValue}</span>
            </div>
        } else if(mcq?.correct_option === optionChar){
            return <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[14px] font-mono font-bold bg-emerald-500 text-white">{optionChar}</div>
                <span className="font-[Inter] text-[13px] flex-1 text-emerald-300">{optionValue}</span>
            </div>
        }   
        else {
            return <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#2E302E]/50 opacity-50">
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[14px] font-mono font-bold bg-[#2A2C2A] text-[#A8ACA8]">{optionChar}</div>
                <span className="font-[Inter] text-[13px] flex-1 text-[#A8ACA8]">{optionValue}</span>
            </div>
        }
    }

    const API_URL = import.meta.env.VITE_API_URL;

    const masterMCQ = async () => {
        setMasterLoading(true);

        const res = await fetch(`${API_URL}/users/mistakes/${mcq.mcq_id}`,{
            method: "DELETE",
            credentials: 'include'
        });

        if(res.status === 200){
            sendErrorSuccessMessage('success', 'MCQ mastered!');
            setNotMasteredMcqs(prev => prev.filter(mMcq => mMcq.mcq_id !== mcq.mcq_id));
            setPendingMistakes(prev => prev - 1);
            setWrongMcqs(prev => prev.map(wrongMcq => wrongMcq.mcq_id === mcq.mcq_id ? {...mcq, is_mastered: 1} : wrongMcq));
        } else {
            setError(true);
            setMessage('Operation failed! Try again later.');
        }

        setMasterLoading(false);
    }

    return (
        <div className="mistake-card bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden">
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: `${subjectToColor[mcq?.subject_name]}` }}></span>
                <span className="text-[14px] font-[Inter] font-bold text-[#A8ACA8] uppercase tracking-[0.1em]">{mcq?.subject_name}</span>
                <span className="text-[#2E302E]">·</span>
                <span className="text-[14px] font-[Inter] text-[#A8ACA8]/70">{mcq?.chapter_name}</span>
                <span className={`ml-auto px-2 py-0.5 rounded-full border text-[13px] font-[Inter] font-black uppercase tracking-[0.08em] ${difficultyToColor[mcq?.difficulty]}`}>{mcq?.difficulty}</span>
                </div>

                <p className="font-[Inter] text-white text-[14px] leading-relaxed mb-4">
                {mcq?.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-red-500/8 border border-red-500/25">
                        <div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </div>
                        <div>
                        <p className="text-[13px] font-[Inter] font-black uppercase tracking-[0.1em] text-red-400 mb-0.5">Your Answer</p>
                        <p className="text-red-300 font-[Inter] text-[14px] leading-snug">{mcq?.selected_option}. {optionToName[mcq?.selected_option]}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/25">
                        <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                        <p className="text-[13px] font-[Inter] font-black uppercase tracking-[0.1em] text-emerald-400 mb-0.5">Correct Answer</p>
                        <p className="text-emerald-300 font-[Inter] text-[14px] leading-snug">{mcq?.correct_option}. {optionToName[mcq?.correct_option]}</p>
                        </div>
                    </div>
                </div>

                <div className={`dropdown-menu mistake-expanded ${showOptions ? 'open' : ''}`}>
                    <div className="space-y-1.5 mb-3">

                        {displayMCQOption('A', mcq?.option_a)}
                        {displayMCQOption('B', mcq?.option_b)}
                        {displayMCQOption('C', mcq?.option_c)}
                        {displayMCQOption('D', mcq?.option_d)}

                    </div>
                    <div className="callout-yellow bg-[#181A18] rounded-r-xl p-3.5 mb-3">
                        <p className="text-[13px] font-[Inter] font-black uppercase tracking-[0.12em] text-[#FFC600] mb-1.5">Explanation</p>
                        <p className="text-white/85 font-[Inter] text-[13px] leading-relaxed">
                        {mcq?.explanation}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                <button onClick={() => setShowOptions(prev => !prev)} className="cursor-pointer mistake-toggle flex items-center gap-1.5 text-[13px] font-[Inter] font-bold text-[#FFC600] hover:underline">
                    <svg className="icon-eye" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    <svg className="icon-eye-off hidden" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                    <line x1="2" y1="2" x2="22" y2="22"/>
                    </svg>
                    <span className="label-default">{showOptions ? 'Hide' : 'Show'} options &amp; explanation</span>
                    <svg className="chev-down" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points={!showOptions ? "6 9 12 15 18 9" : "18 15 12 9 6 15"}/></svg>
                </button>
                <span className={`${error ? 'text-red-500' : 'text-green-500'}`}>{message}</span>
                {
                    !mcq?.is_mastered ?
                    <button onClick={masterMCQ} className={`${masterLoading ? 'cursor-not-allowed' : 'cursor-pointer'} flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[13px] font-[Inter] font-bold hover:bg-emerald-500/20 transition-all`}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                        {masterLoading ? 'Processing....' : 'Mark Mastered'}
                    </button> : '' 
                }
                </div>
            </div>
        </div>
    )
}

export default React.memo(WrongMCQCard)