import React, { useCallback, useEffect, useRef, useState } from 'react'
import MCQCard from './AdminMCQCard'
import { useNavigate, useOutletContext } from 'react-router-dom';

const CustomTestMakerStep4 = ({selectedTest, isTestCreated}) => {
    // console.log(selectedTest);
    const testRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL;
    const {student, admin} = useOutletContext();
    const navigate = useNavigate();

    const [mcqs, setMCQs] = useState([]);
    const [mcqsToShow, setMcqsToShow] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchedMCQ, setSearchedMCQ] = useState("");

    const [mcqsAddedCount, setMcqsAddedCount] = useState(selectedTest?.current_mcqs ?? 0);

    // console.log(mcqs);

    useEffect(() => {
        const fetchMCQs = async () => {
            const res = await fetch(`${API_URL}/quizzes/generate`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    topic_ids: selectedTest?.topics,
                    easy: 10000,
                    medium: 10000,
                    hard: 10000
                })
            });

            const data = await res.json();

            if(data.status === 'success'){
                // let tempMcqs = Object.keys(data.data?.mcqs).map(difficulty => data.data?.mcqs[difficulty].map(mcq_per_ => mcq_per_));
                let tempMcqs = [];
                Object.keys(data.data.mcqs).forEach(difficulty => data.data?.mcqs[difficulty].forEach(mcq => tempMcqs.push(mcq)));
                tempMcqs = tempMcqs.filter(mcq => !selectedTest?.mcq_ids?.includes(mcq.mcq_id));
                
                setMCQs(tempMcqs);
                setMcqsToShow(tempMcqs.slice(0, 10));
                setTotalPages(Math.ceil(tempMcqs.length / 10));
            }
        }

        fetchMCQs();
    }, []);

    useEffect(() => {
        testRef?.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setMCQs(mcqs.slice((pageNumber - 1) * 10, (pageNumber) * 10));
    }, [pageNumber]);

    return (
        <section ref={testRef} className="text-white font-[Inter,sans-serif] antialiased">
            <div className="mx-auto flex max-w-4xl flex-col px-4 pb-12 pt-8 sm:px-6 lg:px-8">
                <header className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Custom test maker</p>
                    <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Step 4 — Pick MCQs for the test</h1>
                    <p className="mt-2 max-w-2xl text-xl text-white/55">MCQ added to this test: {mcqsAddedCount}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                        <span className="font-semibold text-[#FFC600]">4</span> / 4
                    </div>
                </header>

                <div className="top-0 -mx-4 mb-6 border-b border-white/[0.06] bg-[#121212]/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40" htmlFor="mcq-search">Search by MCQ ID</label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                        onChange={e => {
                            if(/^\d*$/.test(e.target.value)){
                                let tempMcqs = mcqs.filter(mcq => !e.target.value || String(mcq.mcq_id).includes(String(e.target.value)));
                                setMcqsToShow(tempMcqs);
                                setTotalPages(tempMcqs.length / 10);
                            }
                        }} 
                        id="mcq-search" type="search" name="q" placeholder="e.g. 100" autoComplete="off" className="w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FFC600]/40 focus:outline-none focus:ring-2 focus:ring-[#FFC600]/15" />
                    </div>
                </div>

                {
                    mcqsAddedCount >= selectedTest?.total_mcqs ?
                    <h1 className='text-center w-full text-xl text-gray-400'>Note: You have already added all the mcqs for this Test.</h1>
                    :
                    <>
                    <section className="flex-1 space-y-5" aria-label="MCQ list">
                        {
                            mcqsToShow.length ? 
                            mcqsToShow?.map((mcq, i)=> <MCQCard key={mcq.mcq_id} mcq={mcq} mcqNo={mcq.mcq_id} testID={selectedTest?.id} setMcqsAddedCount={setMcqsAddedCount}/>) :
                            <div className='w-full text-center text-lg text-gray-400'>No mcqs found!</div>
                        }
                    </section>
                    <div className="mt-6 flex items-center justify-between gap-3">
                        {
                            pageNumber > 1 ?
                            <button
                                type="button"
                                onClick={() => setPageNumber(prev => prev - 1)}
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
                                onClick={() => setPageNumber(prev => prev + 1)}
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
                }
            </div>
        </section>
    )
}

export default CustomTestMakerStep4