import React, { useEffect, useRef, useState } from 'react'

const SavedMCQCard = ({mcq, mcqNo}) => {
    const savedRef = useRef(null);
    // console.log(mcq.question, isSearched);
    // console.log(mcqNo, isSearched);

    const subjectToColor = {
        'Biology' : 'bg-emerald-400/10 text-emerald-400',
        'Chemistry' : 'bg-violet-400/10 text-violet-400',
        'Physics' : 'bg-sky-400/10 text-sky-400',
        'English' : 'bg-amber-400/10 text-amber-400',
        'Logical Reasoning' : 'bg-pink-400/10 text-pink-400',
    }

    const API_URL = import.meta.env.VITE_API_URL;

    const savedDate = new Date(mcq.saved_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const showMCQOption = (correctOption, mcqOption, optionValue) => {
        return <div className={`flex items-start gap-3 px-3 py-2.5 rounded-lg border ${correctOption === mcqOption ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-[#2A2C2A]/10 border-[#2E302E]/40'}`}>
            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[13px] font-mono font-bold mt-[1px] ${mcqOption === correctOption ? 'bg-emerald-500 text-white' : 'bg-[#2A2C2A]/30 text-[#A8ACA8]'}`}>A</span>
            <span className={`font-[Inter] text-[13px] leading-snug ${correctOption === mcqOption ? 'text-emerald-300 font-semibold' : 'text-[#A8ACA8]'}`}>
                {optionValue}
                {mcqOption === correctOption ? <span className="ml-2 text-[14px] font-bold text-emerald-400 uppercase">✓ Correct</span> : ''}
            </span>
        </div>
    }

    const [answerHidden, setAnswerHidden] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const deleteSavedMCQ = async () => {
        setDeleteLoading(true);

        const res = await fetch(`${API_URL}/users/bookmarks/${mcq.mcq_id}`,{
            method: 'DELETE',
            credentials: 'include'
        });

        if(res.status === 200){
            setMessage("MCQ removed from Saved Copy");
            setError(false);
        } else {
            setMessage("Something went wrong!");
            setError(true);
        }

        setDeleteLoading(false);
    }

    return (
        <div ref={savedRef} tabIndex={-1} className="bg-[#222422] border border-[#2E302E] rounded-xl overflow-hidden">
            <div className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-[Inter] font-semibold ${subjectToColor[mcq.subject_name]}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M19.5 9.5c1.4 1.4 1.4 3.6 0 5l-3.4 3.4c-1.4 1.4-3.6 1.4-5 0l-5-5c-1.4-1.4-1.4-3.6 0-5l3.4-3.4c1.4-1.4 3.6-1.4 5 0z"/></svg>
                    {mcq.subject_name}
                    </span>
                    <span className="text-[13px] font-[Inter] text-[#A8ACA8] bg-[#2A2C2A]/20 px-2.5 py-1 rounded-full">{mcq.chapter_name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`${error ? 'text-red-500' : 'text-green-500'}`}>{message}</span>
                    <span className="text-[14px] font-[Inter] text-[#A8ACA8] hidden sm:block">{savedDate}</span>
                    <button onClick={deleteSavedMCQ} className={`${deleteLoading ? 'cursor-not-allowed' : 'cursor-pointer'} w-7 h-7 flex items-center justify-center rounded-lg text-[#A8ACA8] hover:text-red-400 hover:bg-red-400/10 transition-all`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                        <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                    </svg>
                    </button>
                </div>
                </div>
                <p className="font-[Inter] font-medium text-white text-[14px] leading-relaxed">
                Q{mcqNo}. {mcq.question}
                </p>
            </div>
            <button onClick={() => setAnswerHidden(prev => !prev)} className="cursor-pointer w-full flex items-center justify-between px-4 py-2.5 border-t border-[#2E302E]/60 text-[#FFC600] bg-[#FFC600]/5 transition-all">
                <span className="font-[Inter] font-semibold text-[14px] uppercase tracking-wide">{answerHidden ? 'Show' : 'Hide'} Answer</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points={!answerHidden ? "18 15 12 9 6 15" : "18 9 12 15 6 9"}/></svg>
            </button>

            {
                !answerHidden ?
                <div className="px-4 pb-4 pt-1 space-y-3">
                    <div className="space-y-2">
                        {showMCQOption(mcq.correct_option, 'A', mcq.option_a)}
                        {showMCQOption(mcq.correct_option, 'B', mcq.option_b)}
                        {showMCQOption(mcq.correct_option, 'C', mcq.option_c)}
                        {showMCQOption(mcq.correct_option, 'D', mcq.option_d)}
                    </div>

                    <div className="callout-yellow rounded-r-lg py-3 px-4 bg-[#181A18]">
                    <p className="text-[13px] font-[Inter] font-bold text-[#FFC600] uppercase tracking-wide mb-1.5">Explanation</p>
                    <p className="font-[Inter] text-[13px] text-[#CCCCCC] leading-relaxed">
                        {mcq.explanation}
                    </p>
                    </div>
                </div> : '' 
            }
        </div>
    )
}

export default React.memo(SavedMCQCard)