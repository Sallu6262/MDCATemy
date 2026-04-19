import React from 'react'

const MCQCard = () => {
    return (
        <article id="mcq-41021" tabIndex="-1" className="scroll-mt-36 rounded-2xl border border-white/10 bg-[#1A1A1A]/95 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
                {/* <input id="pick-41021" type="checkbox" name="mcq_ids" value="41021" className="mt-1 h-4 w-4 rounded border-white/20 bg-[#121212] text-[#FFC600] focus:ring-[#FFC600]/40" /> */}
                <div>
                <label htmlFor="pick-41021" className="text-sm font-semibold text-white">MCQ <span className="font-mono text-[#FFC600]">#41021</span></label>
                <p className="mt-1 text-xs text-white/40">Topics: Cell structure · Biology</p>
                </div>
            </div>
            <button type="button" className="cursor-pointer shrink-0 rounded-xl border border-[#FFC600]/35 bg-[#FFC600]/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#FFC600] transition hover:bg-[#FFC600]/20">Add to test</button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/90">Which organelle is primarily responsible for ATP synthesis in animal cells?</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">A.</span> Golgi apparatus</div>
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">B.</span> Mitochondrion</div>
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">C.</span> Lysosome</div>
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">D.</span> Peroxisome</div>
            </div>
        </article>
    )
}

export default MCQCard