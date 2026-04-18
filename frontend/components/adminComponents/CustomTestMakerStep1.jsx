import React from 'react'
import ExistingTestCard from '../components/ExistingTestCard'

const CustomTestMakerStep1 = ({nextStage}) => {
    return (
        <section className="text-white font-[Inter,sans-serif] antialiased">
            <div className="mx-auto flex max-w-5xl flex-col px-4 pb-4 pt-8 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Custom test maker</p>
                    <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Step 1 — Select existing / upcoming tests</h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/55">Choose one or more tests from the database to include in this flow. Mock data below simulates API payload.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                        <span className="font-semibold text-[#FFC600]">1</span> / 4
                    </div>
                </header>

                <section className="flex-1 rounded-2xl border border-white/10 bg-[#1A1A1A]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6">
                    <div className="mb-4 flex flex-col gap-2 border-b border-white/[0.06] pb-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFC600]">Saved / Upcoming tests</p>
                        </div>
                        <p className="text-xs text-white/40">6 records</p>
                    </div>

                    <ul className="space-y-3">
                        <ExistingTestCard />
                    </ul>

                    <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-end sm:gap-4">
                        <button
                            type="button"
                            onClick={nextStage}
                            className="cursor-pointer inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/[0.07]"
                        >
                            Resume Selected Test
                        </button>
                        <button
                            type="button"
                            onClick={nextStage}
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