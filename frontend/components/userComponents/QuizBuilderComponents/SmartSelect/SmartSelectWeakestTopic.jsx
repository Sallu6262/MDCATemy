import React, { useState } from 'react'

const SmartSelectWeakestTopic = ({filteredChapterIDs, filteredSubjectIDs, setQuizMakingStep, selectedTopics, setSelectedTopics, mcqDistributionPerTopic}) => {
    const [numberOfWeakestTopics, setNumberOfWeakestTopics] = useState(5);
    const [numberChoice, setNumberChoice] = useState("5");

    // console.log(filteredChapterIDs);
    // console.log(filteredSubjectIDs);

    return (
        <>
            <div className="flex items-center justify-between border-b border-[#2D302D] px-5 py-3">
                <button onClick={() => setQuizMakingStep(0)} className="cursor-pointer flex items-center gap-2" type='button'>
                    <div
                        aria-label="Back"
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-[#0E0F0E]/40 text-[#8B8E8B]"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </div>
                    <span className="[font-family:Poppins,sans-serif] text-[15px] font-black text-white">
                        Top N Weakest Topics
                    </span>
                </button>
            </div>

            <div className="space-y-5 p-5">
                <div>
                    <p className="mb-2 [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.12em] text-[#8B8E8B]">
                        How many weakest topics?
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        {["3", "5", "10", "Custom"].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => {
                                    setNumberChoice(num);
                                    if (num !== "Custom") setNumberOfWeakestTopics(+num);
                                }}
                                className={`cursor-pointer rounded-lg border px-4 py-2 [font-family:Poppins,sans-serif] text-[13px] font-black ${
                                    numberChoice === num
                                        ? 'border-[#FFC600] bg-[#FFC600] text-[#0E0F0E]'
                                        : 'border-[#2D302D] text-[#8B8E8B]'
                                }`}
                            >
                                {num}
                            </button>
                        ))}
                        {numberChoice === "Custom" ? (
                            <input
                                type="number"
                                min={1}
                                max={20}
                                step={1}
                                value={numberOfWeakestTopics}
                                onChange={e => setNumberOfWeakestTopics(Math.min(+e.target.value, 20))}
                                className="h-9 w-16 rounded-lg border border-[#2D302D] bg-[#181A18] px-3 text-center [font-family:Poppins,sans-serif] text-sm font-black text-white focus:border-[#FFC600] focus:outline-none"
                                aria-label="Custom number of weakest topics"
                            />
                        ) : null}
                    </div>
                </div>

                <div>
                    <p className="mb-2 [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.12em] text-[#8B8E8B]">
                        Preview — {numberOfWeakestTopics} topics
                    </p>
                    <div className="max-h-[36vh] space-y-1.5 overflow-y-auto pr-1">
                        <div className="flex items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-3.5 py-2.5">
                            <span className="w-5 text-right [font-family:Poppins,sans-serif] text-[10px] font-black text-[#8B8E8B]/40">1</span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate [font-family:Poppins,sans-serif] text-[12px] font-black text-white">Transistors</p>
                                <p className="truncate text-[10px] text-[#8B8E8B]/60">Physics · Electronics</p>
                            </div>
                            <span className="rounded-full border border-red-400/25 bg-red-400/10 px-2 py-0.5 [font-family:Poppins,sans-serif] text-[10px] font-black text-red-400">48%</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-3.5 py-2.5">
                            <span className="w-5 text-right [font-family:Poppins,sans-serif] text-[10px] font-black text-[#8B8E8B]/40">2</span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate [font-family:Poppins,sans-serif] text-[12px] font-black text-white">Paper Folding</p>
                                <p className="truncate text-[10px] text-[#8B8E8B]/60">Logical Reasoning · Spatial Reasoning</p>
                            </div>
                            <span className="rounded-full border border-red-400/25 bg-red-400/10 px-2 py-0.5 [font-family:Poppins,sans-serif] text-[10px] font-black text-red-400">48%</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-3.5 py-2.5">
                            <span className="w-5 text-right [font-family:Poppins,sans-serif] text-[10px] font-black text-[#8B8E8B]/40">3</span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate [font-family:Poppins,sans-serif] text-[12px] font-black text-white">Gibbs Free Energy</p>
                                <p className="truncate text-[10px] text-[#8B8E8B]/60">Chemistry · Thermochemistry</p>
                            </div>
                            <span className="rounded-full border border-red-400/25 bg-red-400/10 px-2 py-0.5 [font-family:Poppins,sans-serif] text-[10px] font-black text-red-400">44%</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-3.5 py-2.5">
                            <span className="w-5 text-right [font-family:Poppins,sans-serif] text-[10px] font-black text-[#8B8E8B]/40">4</span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate [font-family:Poppins,sans-serif] text-[12px] font-black text-white">Doppler Effect</p>
                                <p className="truncate text-[10px] text-[#8B8E8B]/60">Physics · Waves &amp; Sound</p>
                            </div>
                            <span className="rounded-full border border-red-400/25 bg-red-400/10 px-2 py-0.5 [font-family:Poppins,sans-serif] text-[10px] font-black text-red-400">55%</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-3.5 py-2.5">
                            <span className="w-5 text-right [font-family:Poppins,sans-serif] text-[10px] font-black text-[#8B8E8B]/40">5</span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate [font-family:Poppins,sans-serif] text-[12px] font-black text-white">Solvay Process</p>
                                <p className="truncate text-[10px] text-[#8B8E8B]/60">Chemistry · Industrial Chemistry</p>
                            </div>
                            <span className="rounded-full border border-red-400/25 bg-red-400/10 px-2 py-0.5 [font-family:Poppins,sans-serif] text-[10px] font-black text-red-400">55%</span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="block w-full cursor-pointer rounded-xl border-2 border-[#0E0F0E] bg-[#FFC600] py-3 text-center [font-family:Poppins,sans-serif] text-[13px] font-black text-[#0E0F0E] shadow-[3px_3px_0px_rgba(0,0,0,0.4)]"
                >
                    Add {numberOfWeakestTopics} Topics to Test
                </button>
            </div>
        </>
    )
}

export default SmartSelectWeakestTopic