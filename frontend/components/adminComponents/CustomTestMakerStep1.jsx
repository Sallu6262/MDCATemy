import React from 'react'
import ExistingTestCard from './ExistingTestCard'
import { useState } from 'react'
import { useEffect } from 'react';
import { data } from 'react-router-dom';

const CustomTestMakerStep1 = ({nextStage, setIsTestCreated, selectedTestID, setSelectedTestID, setSelectedTest}) => {
    const [previousTests, setPreviousTests] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchTests = async () => {
            const res = await fetch(`${API_URL}/tests/names`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            // console.log(data.data);
            if(data.status === 'success'){
                setPreviousTests(data.data);
            }
        }

        fetchTests();
    },[]);

    const resumeTest = () => {
        if(selectedTestID){
            // setSelectedTest(previousTests?.find(test => test.id === selectedTestID));
            setIsTestCreated(false);
            setSelectedTest({...previousTests?.find(test => test.id === selectedTestID), test_date: new Date(Date.now() + 24 * 60 * 60 * 1000)});
            nextStage();
        }
    }

    const createTest = () => {
        setIsTestCreated(true);
        setSelectedTest({});
        nextStage();
    }

    return (
        <section className="text-white font-[Inter,sans-serif] antialiased">
            <div className="mx-auto flex max-w-5xl flex-col px-4 pb-4 pt-8 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Custom test maker</p>
                    <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Step 1 — Select existing tests or create new one</h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/55">Choose a test to edit it or create a new one.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                        <span className="font-semibold text-[#FFC600]">1</span> / 4
                    </div>
                </header>

                <section className="flex-1 rounded-2xl border border-white/10 bg-[#1A1A1A]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6">
                    <div className="mb-4 flex flex-col gap-2 border-b border-white/[0.06] pb-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFC600]">Saved / Upcoming tests</p>
                        </div>
                        <p className="text-xs text-white/40">{previousTests?.length || 'No'} records</p>
                    </div>

                    <ul className="space-y-3">
                        {
                            previousTests?.length !== 0 ? 
                            previousTests?.map((test, i)=> {
                                return  <li key={i} className={`rounded-xl border ${selectedTestID === test.id ? 'border-[#FFC600]' : 'border-white/10 hover:border-white/40'} bg-[#121212]/80 p-4 transition`}>
                                            <ExistingTestCard test={test} isSelected={selectedTestID === test.id}  setSelectedTestID={setSelectedTestID}/>
                                        </li>
                            }) : 
                            ''
                        }
                    </ul>

                    <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-end sm:gap-4">
                        {
                            selectedTestID ?
                            <button
                                type="button"
                                onClick={resumeTest}
                                className="cursor-pointer inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/[0.07]"
                            >
                                Resume Selected Test
                            </button>
                            : ''
                        }
                        <button
                            type="button"
                            onClick={createTest}
                            className="cursor-pointer inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#FFC600] px-5 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_28px_rgba(255,198,0,0.2)] transition hover:brightness-105"
                        >
                            Create New test
                        </button>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default CustomTestMakerStep1