import React, { useEffect, useState } from 'react'
import TestSyllabusPopUp from './TestSyllabusPopUp';
import TestReviewCard from './TestReviewCard'

const PreviousTestCard = ({previousTest}) => {
    const testDate = new Date(previousTest?.test_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }); 

    const [syllabusHidden, setSyllabusHidden] = useState(true);
    const [testReviewHidden, setTestReviewHidden] = useState(true);
    const [syllabus, setSyllabus] = useState({});
    const [mcqs, setMcqs] = useState({});

    const sum = previousTest?.correct + previousTest?.wrong;

    // console.log(previousTest);
    const [attempted, setAttempted] = useState(previousTest?.correct !== 0 && previousTest?.mistakes !== 0);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchSyllabus = async() => {
            const res = await fetch(`${API_URL}/tests/attempted/${previousTest?.test_id}`,{
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            if(data.status === 'success'){
                // console.log(data.data);
                setSyllabus(data.data.syllabus);
                setMcqs(data.data.mcqs);
            }
        }

        fetchSyllabus();
    },[]);

    return (
        <>
            {
                !syllabusHidden ? <TestSyllabusPopUp test={{...previousTest, syllabus}} setSyllabusHidden={setSyllabusHidden}/> : ''
            }
            {
                !testReviewHidden ? <TestReviewCard test={{...previousTest, mcqs}} setTestReviewHidden={setTestReviewHidden} attempted={attempted}/> : ''
            }
            <div className="bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden">
                <button onClick={() => setTestReviewHidden(false)} className={`cursor-pointer w-full px-4 py-4 flex items-center gap-3 text-left hover:bg-[#2A2C2A]/10 transition-colors`}>
                    <div className="flex-shrink-0">
                        {
                            attempted ?
                            <div className="w-20 h-14 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex flex-col items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#10B981]">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                                <span className="text-[10px] font-[Inter] font-black text-[#10B981] mt-0.5 uppercase tracking-[0.08em]">Attempted</span>
                            </div> :
                            <div className="w-20 h-14 rounded-xl bg-red-500/10 border border-red-500/30 flex flex-col items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                                <span className="text-[10px] font-[Inter] font-black text-red-400 mt-0.5 uppercase tracking-[0.08em]">Missed</span>
                            </div>
                        }
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="font-[Poppins] font-black text-white text-[16px] leading-tight">{previousTest?.test_name}</p>
                    <div className="flex items-center gap-2.5 mt-1 text-[12px] font-[Inter] text-[#A8ACA8]">
                        <span className="flex items-center gap-0.5">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                            </svg>
                            {testDate}
                            </span>
                            <span className="flex items-center gap-0.5 text-emerald-400">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            {previousTest?.correct}
                            </span>
                            <span className="flex items-center gap-0.5 text-red-400">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                            {previousTest?.mistakes}
                        </span>
                    </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8]/60 flex-shrink-0">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
                <div className="border-t border-[#2E302E]/60 px-4 py-2">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-[Inter] font-bold text-[#FFC600] hover:underline">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 7v14"/>
                            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                        </svg>
                        <button type="button" onClick={() => setSyllabusHidden(false)} className="cursor-pointer inline-flex items-center gap-1.5 text-[13px] font-[Inter] font-bold text-[#FFC600] hover:underline">View Syllabus</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(PreviousTestCard)