import React, { useEffect, useRef, useState } from 'react'
import SavedMCQCard from './SavedMCQCard'
import '../../src/animation.css'
import { pageFilter, searchFilter, subjectFilter } from '../../utils/filterAndSearch'

const SavedCopy = ({savedMcqs, totalSaved, setSavedMcqs}) => {
    const API_URL = import.meta.env.VITE_API_URL;
    // console.log('in saved');
    const [url, setURL] = useState(`${API_URL}/users/bookmarks?page=1&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1`);
    // const [searchMCQ, setSearchMCQ] = useState("");
    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(totalSaved?.all / 10));

    // console.log(url);

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
            // setSubject(filterByNumber[subjectName]);
            await subjectFilter(false, url, setURL, subjectName, setPageNumber, setTotalPages, setSavedMcqs, totalSaved, setSubject, filterByNumber[subjectName]);
        }} className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[14px] font-[Inter] font-semibold whitespace-nowrap flex-shrink-0 ${subjectName === filterBySubject[subjectNumber] ? 'bg-[#FFC600] text-[#181A18] shadow-[0_0_12px_rgba(255,198,0,0.25)]' : 'bg-[#222422] border border-[#2E302E] text-[#A8ACA8] hover:text-white'}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            {subjectName}
            <span className={`px-1.5 py-0.5 rounded-full text-[14px] font-bold ${subjectName === filterBySubject[subjectNumber] ? 'bg-[#181A18]/20 text-[#181A18]' : 'bg-[#2A2C2A]/30 text-[#A8ACA8]'}`}>{count}</span>
        </button>
    }

    useEffect(() => {
        setTotalPages(Math.ceil(totalSaved?.all / 10));
    }, [totalSaved]);

    return (
        <section id="section-saved" className="fade-in space-y-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-[#FFC600] rounded-full"></div>
                <h2 className="font-[Poppins] font-black text-white text-[14px] uppercase tracking-[0.14em]">Saved Copy</h2>
                <span className="text-[14px] font-[Inter] text-[#A8ACA8]">showing {savedMcqs?.length} results</span>
            </div>

            <div onKeyDown={(e) => {if(e.key === 'Enter') {searchFilter(false, url, setURL, setPageNumber, setTotalPages, setSavedMcqs, search)}}} className="flex items-center gap-2">
                <div className="relative flex-1">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8ACA8] pointer-events-none">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search questions, chapters, topics..."
                        className="w-full bg-[#222422] border border-[#2E302E] rounded-xl pl-9 pr-4 py-2.5 text-[13px] font-[Inter] text-white placeholder-[#A8ACA8] focus:outline-none focus:border-[#FFC600]/50 transition-colors"/>
                </div>
                <button
                    type="button"
                    onClick={() => searchFilter(false, url, setURL, setPageNumber, setTotalPages, setSavedMcqs, search)}
                    className="cursor-pointer rounded-xl border border-[#FFC600]/40 bg-[#FFC600] px-4 py-2.5 text-[13px] font-[Inter] font-bold text-[#181A18] transition-colors hover:bg-[#ffd84d]"
                >
                    Search
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">

            {displaySubjectButton('All', subject, totalSaved?.all)}
            {displaySubjectButton('Biology', subject, totalSaved?.biology)}
            {displaySubjectButton('Chemistry', subject, totalSaved?.chemistry)}
            {displaySubjectButton('Physics', subject, totalSaved?.physics)}
            {displaySubjectButton('English', subject, totalSaved?.english)}
            {displaySubjectButton('Logical Reasoning', subject, totalSaved?.logical_reasoning)}

            </div>

            <div className="space-y-3">
            {
                savedMcqs?.length ?
                <>
                {
                    savedMcqs?.map((savedMcq, i) => {
                        return <SavedMCQCard key={i} mcq={savedMcq} mcqNo={i+1}/>
                    }) 
                }
                <div className="flex items-center justify-between gap-3">
                    {
                        pageNumber > 1 ?
                        <button
                            type="button"
                            onClick={async () => {await pageFilter(false, url, setURL, false, pageNumber, setPageNumber, setSavedMcqs)}}
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
                            onClick={async () => await pageFilter(false, url, setURL, true, pageNumber, setPageNumber, setSavedMcqs)}
                            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600] text-[13px] font-[Inter] font-bold hover:bg-[#FFC600]/15 transition-all"
                        >
                            Page {pageNumber+1}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </button> : <div></div>
                    }
                </div>
                </> :
                <h1 className="text-center text-[#A8ACA8] text-xl mt-10">You haven't saved any mcqs yet!</h1>
            }
            </div>


        </section>
    )
}

export default SavedCopy