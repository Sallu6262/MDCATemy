import { useEffect, useRef, useState } from 'react'
import logoImg from '../../assets/Images/logo.svg'

const AggregateCalculatorPage = () => {
    const resultRef = useRef(null);

    const [sscObtained, setSscObtained] = useState("");
    const [sscTotal, setSscTotal] = useState("");
    const [fscObtained, setFscObtained] = useState("");
    const [fscTotal, setFscTotal] = useState("");
    const [mdcatScore, setMdcatScore] = useState("");

    const [aggregateCalculated, setAggregateCalculated] = useState(false);
    const [aggregate, setAggregate] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        resultRef?.current?.scrollIntoView({behaviour: 'smooth', block: 'center'});
    }, [aggregate]);

    const calculateAggregate = () => {
        if(!sscObtained || !sscTotal || !fscObtained || !fscTotal || !mdcatScore){
            setError("Please fill out every field.");
            return;
        }
        
        setAggregateCalculated(true);
        setError("");
        setAggregate(((sscObtained / sscTotal) * 10 + (fscObtained / fscTotal) * 40 + (mdcatScore / 180) * 50).toFixed(2));
    }

    const calculateContribution = (obtained, total, weight) => {
        return ((obtained / total) * weight).toFixed(2);
    }

    return (
        <div className="aggregate-calculator-page font-[Inter] antialiased overflow-x-hidden bg-[#f5f5f5] text-[#1a1a1a]">

            {/* Hero */}
            <section className="bg-[#1a1a1a] px-6 py-12 pb-10 text-center sm:px-6">
                <div className="mx-auto max-w-[640px]">
                    <h1 className="mb-3.5 text-[clamp(2rem,6vw,3.8rem)] font-black uppercase leading-none tracking-[-2px] text-[#ffffff]">
                        MDCAT AGGREGATE
                        <br />
                        CALCULATOR
                    </h1>
                    <p className="text-[0.95rem] leading-[1.65] text-[#ffffff]">
                        Calculate your MBBS/BDS aggregate using the official 10% Matric, 40% FSc, and 50% MDCAT formula.
                    </p>
                </div>
            </section>

            {/* Calculator section */}
            <section className="bg-[#ffffff] px-4 py-10 sm:px-6 md:px-6">
                <div className="mx-auto max-w-[760px]">

                    {/* Weightage breakdown — hidden on mobile */}
                    <div className="mb-8 hidden rounded-2xl bg-[#1a1a1a] p-7 px-8 md:block">
                        <div className="mb-5 text-[0.7rem] font-extrabold uppercase tracking-[2px] text-[rgba(255,255,255,0.4)]">⚖️ &nbsp;Aggregate Weightage Breakdown</div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-[10px] bg-[rgba(255,255,255,0.06)] px-2 py-4 text-center">
                                <div className="text-[2.5rem] font-black leading-none text-[#F6C90E]">10%</div>
                                <div className="mt-1.5 text-[0.75rem] uppercase tracking-[1px] text-[rgba(255,255,255,0.5)]">Matric</div>
                            </div>
                            <div className="rounded-[10px] bg-[rgba(255,255,255,0.06)] px-2 py-4 text-center">
                                <div className="text-[2.5rem] font-black leading-none text-[#F6C90E]">40%</div>
                                <div className="mt-1.5 text-[0.75rem] uppercase tracking-[1px] text-[rgba(255,255,255,0.5)]">FSc / Intermediate</div>
                            </div>
                            <div className="rounded-[10px] bg-[rgba(255,255,255,0.06)] px-2 py-4 text-center">
                                <div className="text-[2.5rem] font-black leading-none text-[#F6C90E]">50%</div>
                                <div className="mt-1.5 text-[0.75rem] uppercase tracking-[1px] text-[rgba(255,255,255,0.5)]">MDCAT</div>
                            </div>
                        </div>
                    </div>

                    {/* Input card */}
                    <div className="rounded-2xl bg-[#ffffff] p-9 shadow-[0_8px_48px_rgba(0,0,0,0.08)]">

                        {/* Matric */}
                        <div className="mb-7">
                            <div className="mb-4 flex items-center gap-2.5">
                                <span className="text-[1.1rem]">🎓</span>
                                <span className="text-[0.95rem] font-extrabold uppercase tracking-[0.3px] text-[#1a1a1a]">Matric (SSC)</span>
                                <span className="rounded-full bg-[#F6C90E]/20 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.8px] text-[#7a6000]">10% Weight</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-[0.75rem] font-bold uppercase tracking-[0.5px] text-[#555]">Marks Obtained</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="e.g., 1050"
                                        required
                                        value={sscObtained}
                                        onChange={e => setSscObtained(e.target.value)}
                                        className="w-full rounded-lg border-[1.5px] border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 font-[Inter] text-[0.95rem] text-[#1a1a1a] outline-none transition-[border-color,box-shadow,background] focus:border-[#F6C90E] focus:bg-[#ffffff] focus:shadow-[0_0_0_3px_rgba(246,201,14,0.15)]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[0.75rem] font-bold uppercase tracking-[0.5px] text-[#555]">Total Marks</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={sscTotal}
                                        required
                                        onChange={e => setSscTotal(e.target.value)}
                                        placeholder="e.g., 1100"
                                        className="w-full rounded-lg border-[1.5px] border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 font-[Inter] text-[0.95rem] text-[#1a1a1a] outline-none transition-[border-color,box-shadow,background] focus:border-[#F6C90E] focus:bg-[#ffffff] focus:shadow-[0_0_0_3px_rgba(246,201,14,0.15)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-7 h-px bg-[#f0f0f0]" />

                        {/* FSc */}
                        <div className="mb-7">
                            <div className="mb-4 flex items-center gap-2.5">
                                <span className="text-[1.1rem]">📘</span>
                                <span className="text-[0.95rem] font-extrabold uppercase tracking-[0.3px] text-[#1a1a1a]">FSc / Intermediate (HSSC)</span>
                                <span className="rounded-full bg-[#F6C90E]/20 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.8px] text-[#7a6000]">40% Weight</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-[0.75rem] font-bold uppercase tracking-[0.5px] text-[#555]">Marks Obtained</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={fscObtained}
                                        required
                                        onChange={e => setFscObtained(e.target.value)}
                                        placeholder="e.g., 1050"
                                        className="w-full rounded-lg border-[1.5px] border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 font-[Inter] text-[0.95rem] text-[#1a1a1a] outline-none transition-[border-color,box-shadow,background] focus:border-[#F6C90E] focus:bg-[#ffffff] focus:shadow-[0_0_0_3px_rgba(246,201,14,0.15)]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[0.75rem] font-bold uppercase tracking-[0.5px] text-[#555]">Total Marks</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={fscTotal}
                                        required
                                        onChange={e => setFscTotal(e.target.value)}
                                        placeholder="e.g., 1100"
                                        className="w-full rounded-lg border-[1.5px] border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 font-[Inter] text-[0.95rem] text-[#1a1a1a] outline-none transition-[border-color,box-shadow,background] focus:border-[#F6C90E] focus:bg-[#ffffff] focus:shadow-[0_0_0_3px_rgba(246,201,14,0.15)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-7 h-px bg-[#f0f0f0]" />

                        {/* MDCAT */}
                        <div>
                            <div className="mb-4 flex items-center gap-2.5">
                                <span className="text-[1.1rem]">📝</span>
                                <span className="text-[0.95rem] font-extrabold uppercase tracking-[0.3px] text-[#1a1a1a]">MDCAT Score</span>
                                <span className="rounded-full bg-[#F6C90E]/20 px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.8px] text-[#7a6000]">50% Weight</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-[0.75rem] font-bold uppercase tracking-[0.5px] text-[#555]">Target / Obtained Marks</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={mdcatScore}
                                        required
                                        onChange={e => setMdcatScore(e.target.value)}
                                        placeholder="e.g., 170"
                                        className="w-full rounded-lg border-[1.5px] border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 font-[Inter] text-[0.95rem] text-[#1a1a1a] outline-none transition-[border-color,box-shadow,background] focus:border-[#F6C90E] focus:bg-[#ffffff] focus:shadow-[0_0_0_3px_rgba(246,201,14,0.15)]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-[0.75rem] font-bold uppercase tracking-[0.5px] text-[#555]">Total Marks</label>
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue="180"
                                        readOnly
                                        className="w-full rounded-lg border-[1.5px] border-[#e0e0e0] bg-[#fafafa] px-4 py-3.5 font-[Inter] text-[0.95rem] text-[#1a1a1a] outline-none transition-[border-color,box-shadow,background] focus:border-[#F6C90E] focus:bg-[#ffffff] focus:shadow-[0_0_0_3px_rgba(246,201,14,0.15)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <span className='inline-block text-center text-red-500 text-lg pt-4 w-full'>{error}</span>

                        <button
                            type="button"
                            onClick={() => {
                                calculateAggregate();
                            }}
                            className="mt-7 block w-full cursor-pointer rounded-full border-none bg-[#F6C90E] px-5 py-5 font-[Inter] text-base font-black uppercase tracking-[1.5px] text-[#1a1a1a] transition-[background,color,transform] hover:-translate-y-px hover:bg-[#1a1a1a] hover:!text-[#FFC600]"
                        >
                            Calculate My Aggregate
                        </button>
                    </div>

                    {/* Result card — hardcoded sample values */}
                    {
                        aggregateCalculated &&
                        <div ref={resultRef} className="mt-5 rounded-2xl border-2 border-[#F6C90E] bg-[#ffffff] p-7 px-8 shadow-[0_8px_48px_rgba(0,0,0,0.08)] sm:p-7">
                            <div className="mb-2 text-[0.68rem] font-extrabold uppercase tracking-[2px] text-[#888]">Your MDCAT Aggregate</div>
                            <div className="mb-4">
                                <div className="text-[clamp(3.5rem,6vw,5.5rem)] font-black leading-none tracking-[-3px] text-[#1a1a1a] max-[640px]:tracking-[-2px]">{aggregate}%</div>
                            </div>
                            <div className="mb-5 h-[5px] overflow-hidden rounded-[3px] bg-[#e0e0e0]">
                                <div className="h-full rounded-[3px] bg-[#F6C90E]" style={{width: `${aggregate}%`}}/>
                            </div>

                            <div className="mb-4 rounded-[10px] bg-[#f5f5f5] px-4 py-3.5">
                                <div className="mb-2.5 text-[0.68rem] font-extrabold uppercase tracking-[1.5px] text-[#888]">Score Breakdown</div>
                                <div className="flex items-center justify-between border-b border-[#e8e8e8] py-1.5">
                                    <span className="text-[0.85rem] text-[#555]">Matric Contribution (10%)</span>
                                    <span className="text-[0.9rem] font-extrabold text-[#1a1a1a]">{calculateContribution(sscObtained, sscTotal, 10)}%</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#e8e8e8] py-1.5">
                                    <span className="text-[0.85rem] text-[#555]">FSc Contribution (40%)</span>
                                    <span className="text-[0.9rem] font-extrabold text-[#1a1a1a]">{calculateContribution(fscObtained, fscTotal, 40)}%</span>
                                </div>
                                <div className="flex items-center justify-between py-1.5">
                                    <span className="text-[0.85rem] text-[#555]">MDCAT Contribution (50%)</span>
                                    <span className="text-[0.9rem] font-extrabold text-[#1a1a1a]">{calculateContribution(mdcatScore, 180, 50)}%</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="cursor-pointer rounded-full border-[1.5px] border-[#1a1a1a] bg-transparent px-6 py-2.5 font-[Inter] text-[0.85rem] font-bold text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:!text-[#ffffff]"
                            >
                                📋 &nbsp;Copy Result
                            </button>
                        </div>
                    }

                </div>
            </section>

            {/* SEO content */}
            <section className="bg-[#ffffff] px-6 py-16">
                <div className="mx-auto max-w-[760px]">

                    <h2 className="mb-8 text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase leading-[1.1] tracking-[-0.5px] text-[#1a1a1a]">
                        MDCAT AGGREGATE — EVERYTHING YOU NEED TO KNOW
                    </h2>

                    <h3 className="mb-2 mt-7 text-[1.05rem] font-extrabold uppercase tracking-[0.3px] text-[#1a1a1a] first:mt-0">What is MDCAT Aggregate?</h3>
                    <p className="text-[0.95rem] leading-[1.75] text-[#444]">MDCAT aggregate is a combined percentage calculated from your Matric, FSc, and MDCAT marks using official weightage. It is the primary number used by medical universities in Pakistan to rank applicants for MBBS and BDS admission. Your raw MDCAT score alone does not determine admission — the aggregate does.</p>

                    <h3 className="mb-2 mt-7 text-[1.05rem] font-extrabold uppercase tracking-[0.3px] text-[#1a1a1a]">MDCAT Aggregate Formula</h3>
                    <p className="text-[0.95rem] leading-[1.75] text-[#444]">The official formula is: <strong>Aggregate = (Matric Obtained ÷ Matric Total × 10) + (FSc Obtained ÷ FSc Total × 40) + (MDCAT Obtained ÷ MDCAT Total × 50)</strong>. Matric carries 10% weight, FSc carries 40%, and MDCAT carries 50%. This formula is standardized across Pakistan under PMC regulations.</p>

                    <h3 className="mb-2 mt-7 text-[1.05rem] font-extrabold uppercase tracking-[0.3px] text-[#1a1a1a]">How to Calculate MDCAT Aggregate</h3>
                    <p className="text-[0.95rem] leading-[1.75] text-[#444]">Enter your Matric marks (e.g., 1050/1100), FSc marks (e.g., 1050/1100), and MDCAT marks (e.g., 170/180) in the calculator above. The tool instantly computes your aggregate and shows each component&apos;s contribution. For example: Matric contribution = 1050/1100 × 10 = 9.55%, FSc contribution = 1050/1100 × 40 = 38.18%, MDCAT contribution = 170/180 × 50 = 47.22%, giving an aggregate of 94.95%.</p>

                    <h3 className="mb-2 mt-7 text-[1.05rem] font-extrabold uppercase tracking-[0.3px] text-[#1a1a1a]">How to Calculate Your Target MDCAT Marks</h3>
                    <p className="text-[0.95rem] leading-[1.75] text-[#444]">Once you know your target aggregate (e.g., the previous year&apos;s closing merit for your desired college), you can work backwards to find exactly how many MDCAT marks you need. Use the following formula:</p>
                    <p className="mt-3.5 text-[0.95rem] leading-[1.75] text-[#444]"><strong>Required MDCAT Marks = MDCAT Total × (Target Aggregate − Matric Contribution − FSc Contribution) ÷ 50</strong></p>
                    <p className="mt-3.5 text-[0.95rem] leading-[1.75] text-[#444]">Where:</p>
                    <ul className="ml-5 mt-2 list-disc text-[0.95rem] leading-8 text-[#444]">
                        <li><strong>Matric Contribution</strong> = (Matric Obtained ÷ Matric Total) × 10</li>
                        <li><strong>FSc Contribution</strong> = (FSc Obtained ÷ FSc Total) × 40</li>
                        <li><strong>Target Aggregate</strong> = the closing merit of your target college (e.g., 91.50%)</li>
                    </ul>
                    <p className="mt-3.5 text-[0.95rem] leading-[1.75] text-[#444]"><strong>Example:</strong> Matric 1050/1100, FSc 1050/1100, MDCAT total 180, target aggregate 91.50%.</p>
                    <p className="mt-2 text-[0.95rem] leading-[1.75] text-[#444]">Matric Contribution = (1050 ÷ 1100) × 10 = 9.55 &nbsp;|&nbsp; FSc Contribution = (1050 ÷ 1100) × 40 = 38.18</p>
                    <p className="mt-1.5 text-[0.95rem] leading-[1.75] text-[#444]">Required MDCAT = 180 × (91.50 − 9.55 − 38.18) ÷ 50 = 180 × 43.77 ÷ 50 = <strong>157.57 ≈ 158 marks</strong></p>
                    <p className="mt-2.5 text-[0.95rem] leading-[1.75] text-[#444]">Always add a buffer of 2–4 extra marks on top of this number as your practical preparation target, to account for exam-day variation and rounding.</p>

                </div>
            </section>

            {/* FAQ */}
            <section className="bg-[#f5f5f5] px-6 py-16">
                <div className="mx-auto max-w-[760px]">

                    <h2 className="mb-2 text-[clamp(1.5rem,3.5vw,2rem)] font-black uppercase leading-[1.1] tracking-[-0.5px] text-[#1a1a1a]">Frequently Asked Questions</h2>
                    <p className="mb-9 mt-2 text-base leading-[1.6] text-[#666]">Common questions about MDCAT aggregate and merit comparison.</p>

                    <details className="group border-b border-[#e0e0e0]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Inter] text-[0.95rem] font-bold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                            What is the MDCAT aggregate formula?
                            <span className="shrink-0 text-[1.1rem] text-[#F6C90E] transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="pb-[18px] text-[0.92rem] leading-[1.75] text-[#555]">
                            The formula is: Aggregate = (Matric/MatricTotal × 10) + (FSc/FScTotal × 40) + (MDCAT/MDCATTotal × 50). Matric contributes up to 10%, FSc up to 40%, and MDCAT up to 50% of your total aggregate.
                        </div>
                    </details>

                    <details className="group border-b border-[#e0e0e0]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Inter] text-[0.95rem] font-bold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                            Is the aggregate formula the same for MBBS and BDS?
                            <span className="shrink-0 text-[1.1rem] text-[#F6C90E] transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="pb-[18px] text-[0.92rem] leading-[1.75] text-[#555]">
                            Yes. The aggregate formula — 10% Matric, 40% FSc, 50% MDCAT — is the same for both MBBS and BDS admissions in Pakistan. However, the closing merits for MBBS and BDS are different due to varying levels of competition and seat availability.
                        </div>
                    </details>

                    <details className="group border-b border-[#e0e0e0]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Inter] text-[0.95rem] font-bold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                            Why are MBBS and BDS closing merits different?
                            <span className="shrink-0 text-[1.1rem] text-[#F6C90E] transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="pb-[18px] text-[0.92rem] leading-[1.75] text-[#555]">
                            MBBS has a significantly higher number of applicants compared to available seats, making it more competitive. BDS generally has relatively fewer applicants, leading to slightly lower closing merits. However, prestigious BDS colleges in competitive provinces can still have high merits.
                        </div>
                    </details>

                    <details className="group border-b border-[#e0e0e0]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Inter] text-[0.95rem] font-bold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                            Does this calculator confirm my admission?
                            <span className="shrink-0 text-[1.1rem] text-[#F6C90E] transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="pb-[18px] text-[0.92rem] leading-[1.75] text-[#555]">
                            No. This calculator is an estimation tool only. Actual admission depends on official merit lists released by admitting bodies, your domicile, seat category, available seats, eligibility verification, and document review. Closing merits can also change every year.
                        </div>
                    </details>

                    <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[Inter] text-[0.95rem] font-bold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                            How can I calculate my target MDCAT score?
                            <span className="shrink-0 text-[1.1rem] text-[#F6C90E] transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="pb-[18px] text-[0.92rem] leading-[1.75] text-[#555]">
                            <p className="mb-2.5">Once your Matric and FSc marks are fixed, use this formula to find the exact MDCAT marks you need for a given target aggregate:</p>
                            <div className="mb-2.5 rounded-lg bg-[#f5f5f5] px-3.5 py-3 font-mono text-[0.82rem] text-[#1a1a1a]">Required MDCAT = MDCAT Total × (Target Aggregate − Matric Contribution − FSc Contribution) ÷ 50</div>
                            <p className="mb-2">Where:</p>
                            <p className="mb-1.5">• <strong>Matric Contribution</strong> = (Matric Obtained ÷ Matric Total) × 10</p>
                            <p className="mb-1.5">• <strong>FSc Contribution</strong> = (FSc Obtained ÷ FSc Total) × 40</p>
                            <p className="mb-2">• <strong>Target Aggregate</strong> = the closing merit of your desired college (e.g., 91.50%)</p>
                            <p>Always add 2–4 marks on top of the result as a buffer for exam-day variation and rounding.</p>
                        </div>
                    </details>

                </div>
            </section>
        </div>
    )
}

export default AggregateCalculatorPage