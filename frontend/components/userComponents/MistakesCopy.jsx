import React, { useState } from 'react'
import WrongMCQCard from './WrongMCQCard';
import '../../src/animation.css'
import { useEffect } from 'react';
import { pageFilter, subjectFilter, searchFilter } from '../../utils/filterAndSearch';
// import filterAndSearchMCQ from '../../utils/filterAndSearch';

const MistakesCopy = ({wrongMcqs, totalMistakes, pendingMistakes, setPendingMistakes, setWrongMcqs, totalWrong}) => {
    const API_URL = import.meta.env.VITE_API_URL;
    // console.log(wrongMcqs);
    const [subject, setSubject] = useState(0);
    const [notMasteredMcqs, setNotMasteredMcqs] = useState(
        wrongMcqs.filter(mcq => !Number(mcq.is_mastered))
    );
    
    const [url, setURL] = useState(`${API_URL}/users/mistakes?page=1&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1`);
    
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(pendingMistakes?.length / 10));
    const [search, setSearch] = useState('');
    // console.log(notMasteredMcqs?.filter(mcq => mcq.subject_name === 'Chemistry'));

    const filterBySubject = {
        0 : 'All',
        1 : 'Biology',
        2 : 'Chemistry',
        3 : 'Physics',
        4 : 'English',
        5 : 'Logical Reasoning'
    }

    const filterByNumber = {
        'All' : 0,
        'Biology' : 1,
        'Chemistry' : 2,
        'Physics' : 3,
        'English' : 4,
        'Logical Reasoning' : 5
    }

    const displaySubjectButton = (subjectName, subjectNumber, count) => {
        return <button onClick={async () => {
                await subjectFilter(true, url, setURL, subjectName, setPageNumber, setTotalPages, setWrongMcqs, totalWrong, setSubject, filterByNumber[subjectName]);
            }} className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[14px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 ${subjectName === filterBySubject[subjectNumber] ? 'bg-[#FFC600] text-[#181A18] shadow-[0_0_12px_rgba(255,198,0,0.25)]' : 'bg-[#222422] border border-[#2E302E] text-[#A8ACA8] hover:text-white'}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            {subjectName}
            <span className={`px-1.5 py-0.5 rounded-full text-[14px] font-bold ${subjectName === filterBySubject[subjectNumber] ? 'bg-[#181A18]/20 text-[#181A18]' : 'bg-[#2A2C2A]/30 text-[#A8ACA8]'}`}>{count}</span>
        </button>
    }

    // console.log(notMasteredMcqs);

    useEffect(() => {
        setTotalPages(Math.ceil(pendingMistakes / 10));
    }, [pendingMistakes]);

    useEffect(() => {
        setNotMasteredMcqs(wrongMcqs.filter(mcq => !Number(mcq.is_mastered)));
    }, [wrongMcqs]);

    return (
        <section id="section-mistakes" className="fade-in space-y-5">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                <h2 className="font-[Poppins] font-black text-white text-[14px] uppercase tracking-[0.14em]">Mistakes Copy</h2>
                <span className="text-[14px] font-[Inter] text-[#A8ACA8]">{pendingMistakes} logged · {totalMistakes - pendingMistakes} mastered</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                <div className="bg-[#222422] border border-red-500/15 bg-red-500/5 rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">{totalMistakes}</p>
                <p className="text-[14px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Total</p>
                </div>

                <div className="bg-[#222422] border border-[#2E302E] rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A8ACA8]">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">{pendingMistakes}</p>
                <p className="text-[14px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Pending</p>
                </div>

                <div className="bg-[#222422] border border-[#FFC600]/15 bg-[#FFC600]/5 rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFC600]">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">{totalMistakes - pendingMistakes}</p>
                <p className="text-[14px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Mastered</p>
                </div>

                <div className="bg-[#222422] border border-emerald-500/15 bg-emerald-500/5 rounded-xl p-3.5">
                <div className="mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                    </svg>
                </div>
                <p className="font-[Poppins] font-black text-white text-xl leading-none">{totalMistakes ? `${parseInt(((totalMistakes - pendingMistakes) / totalMistakes) * 100)}%` : 'No'}</p>
                <p className="text-[14px] font-[Inter] font-black uppercase tracking-[0.1em] text-[#A8ACA8] mt-1">Mastery</p>
                </div>
            </div>

            {
                pendingMistakes ?
                <div className="flex justify-center">
                    <button className="cursor-pointer flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FFC600] text-[#181A18] text-[15px] font-[Poppins] font-black uppercase tracking-wide hover:bg-[#FFC600]-dark transition-colors shadow-[0_0_28px_rgba(255,198,0,0.35)] w-full sm:w-auto sm:min-w-[320px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                    </svg>
                    Re-test All Mistakes
                    <span className="bg-[#181A18]/15 px-2.5 py-1 rounded-full text-[14px] font-black">{pendingMistakes}</span>
                    </button>
                </div> : ''
            }

            <div className="space-y-3">
                <div className="flex gap-2">
                <div onKeyDown={async (e) => {if(e.key === 'Enter') {await searchFilter(true, url, setURL, setPageNumber, setTotalPages, setWrongMcqs, search)}}} className="flex-1 relative">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8ACA8] pointer-events-none">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search a topic..."
                        className="w-full bg-[#222422] border border-[#2E302E] rounded-xl pl-9 pr-4 py-2.5 text-white font-[Inter] text-[13px] placeholder:text-[#A8ACA8]/50 focus:outline-none focus:border-[#FFC600]/50 transition-colors"/>
                </div>
                <button
                    type="button"
                    onClick={async () => {await searchFilter(true, url, setURL, setPageNumber, setTotalPages, setWrongMcqs, search)}} 
                    className="cursor-pointer rounded-xl border border-[#FFC600]/40 bg-[#FFC600] px-4 py-2.5 text-[13px] font-[Inter] font-bold text-[#181A18] transition-colors hover:bg-[#ffd84d]"
                >
                    Search
                </button>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">

            {displaySubjectButton('All', subject, pendingMistakes)}
            {displaySubjectButton('Biology', subject, totalWrong?.biology ?? 0)}
            {displaySubjectButton('Chemistry', subject, totalWrong?.chemistry ?? 0)}
            {displaySubjectButton('Physics', subject, totalWrong?.physics ?? 0)}
            {displaySubjectButton('English', subject, totalWrong?.english ?? 0)}
            {displaySubjectButton('Logical Reasoning', subject, totalWrong?.logical_reasoning ?? 0)}

            </div>

            <div className="space-y-3">

            {
                notMasteredMcqs?.length ?
                <>
                {
                    notMasteredMcqs?.map((mcq, i) => <WrongMCQCard key={i} mcq={mcq} setWrongMcqs={setWrongMcqs} setNotMasteredMcqs={setNotMasteredMcqs} setPendingMistakes={setPendingMistakes}/>)
                }
                    <div className="flex items-center justify-between gap-3">
                        {
                        pageNumber > 1 ?
                        <button
                            type="button"
                            onClick={async() => {await pageFilter(true, url, setURL, false, pageNumber, setPageNumber, setWrongMcqs)}}
                            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2E302E] bg-[#222422] text-[#A8ACA8] text-[13px] font-[Inter] font-bold hover:text-white hover:border-[#A8ACA8]/40 transition-all"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                            Page {pageNumber-1}
                        </button> : <div></div>
                    }

                    {
                        pageNumber < totalPages ?
                        <button
                            type="button"
                            onClick={async() => {await pageFilter(true, url, setURL, true, pageNumber, setPageNumber, setWrongMcqs)}}
                            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600] text-[13px] font-[Inter] font-bold hover:bg-[#FFC600]/15 transition-all"
                        >
                            Page {pageNumber+1}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </button> : <div></div>
                    }
                    </div>
                </>
                :
                <h1 className="text-center text-[#A8ACA8] text-xl mt-10">You haven't wronged any mcqs yet!</h1>
            }

            </div>

        </section>
    )
}

export default MistakesCopy
