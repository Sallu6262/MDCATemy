import React from 'react'
import SubjectCard from '../SubjectCard'

const CustomTestMakerStep3 = () => {
    return (
        <>
            <style>
                {
                    `
                        details > summary { list-style: none; }
                        details > summary::-webkit-details-marker { display: none; }
                        details.subject-disclosure[open] > summary .subject-chevron { transform: rotate(90deg); }
                        details.chapter-disclosure[open] > summary .chapter-chevron { transform: rotate(90deg); }
                    `
                }
            </style>

            <section className="text-white font-[Inter,sans-serif] antialiased">
                <div className="mx-auto flex max-w-4xl flex-col px-4 pb-12 pt-8 sm:px-6 lg:px-8">
                    <header className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Custom test maker</p>
                    <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Step 3 — Topics from syllabus</h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/55">Open a subject to see its chapters, then a chapter to select topics (checkboxes). Mock data from database.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                        <span className="font-semibold text-[#FFC600]">3</span> / 4
                    </div>
                    </header>

                    <section className="flex-1 space-y-4">

                        <SubjectCard />
                        <SubjectCard />
                        <SubjectCard />
                        <SubjectCard />
                        <SubjectCard />
                        
                    </section>
                </div>
            </section>
        </>
    )
}

export default CustomTestMakerStep3