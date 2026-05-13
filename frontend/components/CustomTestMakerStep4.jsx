import React, { useCallback, useEffect, useState } from 'react'
import MCQCard from './adminComponents/AdminMCQCard'
import { useNavigate, useOutletContext } from 'react-router-dom';

const CustomTestMakerStep4 = ({selectedTest, isTestCreated}) => {
    // console.log(selectedTest);
    const API_URL = import.meta.env.VITE_API_URL;
    const {student, admin} = useOutletContext();
    const navigate = useNavigate();

    const [mcqs, setMCQs] = useState([]);
    const [mcqsPerPage, setMCQsPerPage] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchedMCQ, setSearchedMCQ] = useState("");

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
                setMCQs(tempMcqs);
                setMCQsPerPage(tempMcqs.slice(0, 10));
                setTotalPages(Math.ceil(tempMcqs.length / 10));
            }
        }

        fetchMCQs();
    }, []);

    return (
        <section className="text-white font-[Inter,sans-serif] antialiased">
            <div className="mx-auto flex max-w-4xl flex-col px-4 pb-12 pt-8 sm:px-6 lg:px-8">
                <header className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Custom test maker</p>
                    <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Step 4 — Pick MCQs for the test</h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/55">MCQs below mock a filtered API response by selected topics. Each row: select, stem, four options (two per row), add action.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                        <span className="font-semibold text-[#FFC600]">4</span> / 4
                    </div>
                </header>

                <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-white/[0.06] bg-[#121212]/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40" htmlFor="mcq-search">Search by MCQ ID</label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input value={searchedMCQ} onChange={e => {if(/^\d*$/.test(e.target.value)) setSearchedMCQ(e.target.value)}} onKeyDown={e => {if(e.key === 'Enter') setSearchedMCQ(e.target.value)}} id="mcq-search" type="search" name="q" placeholder="e.g. 100" autoComplete="off" className="w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FFC600]/40 focus:outline-none focus:ring-2 focus:ring-[#FFC600]/15" />
                    </div>
                </div>

                <section className="flex-1 space-y-5" aria-label="MCQ list">
                    {
                        mcqsPerPage?.map((mcq, i)=> <MCQCard key={i} mcq={mcq} mcqNo={i+1} isSearched={Number(searchedMCQ) === mcq.mcq_id} testID={selectedTest?.id}/>)
                    }
                </section>
            </div>
        </section>
    )
}

export default CustomTestMakerStep4