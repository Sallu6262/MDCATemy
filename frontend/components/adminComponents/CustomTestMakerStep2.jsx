import React from 'react'
import { useState } from 'react'

const CustomTestMakerStep2 = ({selectedTest, setSelectedTest, nextStage}) => {
    // console.log(selectedTest);
    const [name, setName] = useState(selectedTest?.name || "");
    const [time, setTime] = useState(selectedTest?.time || "");
    const [mcqCount, setMcqCount] = useState(selectedTest?.total_mcqs || "");
    const [excelFile, setExcelFile] = useState(selectedTest?.file || "");
    const [date, setDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const updateTest = (e) => {
        e.preventDefault();
        setSelectedTest(prev => ({...prev, name, time, total_mcqs: mcqCount, file: excelFile, date: new Date(date)}));
        nextStage();
    }

    return (
        <section className="text-white font-[Inter,sans-serif] antialiased">
            <div className="mx-auto flex max-w-2xl flex-col px-4 pb-12 pt-8 sm:px-6 lg:px-8">
                <header className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Custom test maker</p>
                <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Step 2 — New test details</h1>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                    <span className="font-semibold text-[#FFC600]">2</span> / 4
                </div>
                </header>

                <section className="flex-1 rounded-2xl border border-white/10 bg-[#1A1A1A]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFC600]">Test configuration</p>
                <form className="mt-8 space-y-6" onSubmit={updateTest}>
                    <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50" htmlFor="excel-file">Excel file — containing emails for allowed users</label>
                    <div className="rounded-xl border border-dashed border-white/15 bg-[#121212]/80 p-6 text-center">
                        <input onChange={e => {
                            setExcelFile(e.target.files[0]);
                        }} id="excel-file" required={!excelFile} name="excel" type="file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" className="sr-only" />
                        <label htmlFor="excel-file" className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#FFC600] px-6 py-3 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_28px_rgba(255,198,0,0.2)] transition hover:brightness-105">
                        Upload Excel file
                        </label>
                        <p className="mt-3 text-sm text-white/40">{excelFile?.name || 'No File Selected Yet'}</p>
                        <p className="mt-3 text-xs text-white/40">Accepts .xlsx · Max size enforced on server</p>
                    </div>
                    </div>

                    <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50" htmlFor="test-name">Test name</label>
                    <input value={name} onChange={e => {
                        setName(e.target.value);
                    }} id="test-name" required name="test_name" type="text" placeholder="e.g. March Bio–Chem combined" className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FFC600]/50 focus:outline-none focus:ring-2 focus:ring-[#FFC600]/20" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50" htmlFor="time-min">Time (minutes)</label>
                        <input value={time} onChange={e => {
                            setTime(e.target.value);
                        }} id="time-min" required name="time_minutes" type="number" min="1" placeholder="90" className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FFC600]/50 focus:outline-none focus:ring-2 focus:ring-[#FFC600]/20" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50" htmlFor="mcq-count">MCQ count</label>
                        <input value={mcqCount} onChange={e => {
                            setMcqCount(e.target.value);
                        }} id="mcq-count" required name="total_mcqs" type="number" min="1" placeholder="100" className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FFC600]/50 focus:outline-none focus:ring-2 focus:ring-[#FFC600]/20" />
                    </div>
                    </div>

                    <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50" htmlFor="test-date">Date for test</label>
                    <input min={date} max={new Date(new Date(date).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} value={date}
                        onChange={e => {
                            if(e.target.value){
                                setDate(e.target.value); 
                            }
                        }} id="test-date" required name="test_date" type="date" className="w-full rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white focus:border-[#FFC600]/50 focus:outline-none focus:ring-2 focus:ring-[#FFC600]/20 [color-scheme:dark]" />
                    </div>

                    <div className="flex justify-end border-t border-white/[0.06] pt-6">
                    <button
                        type="submit"
                        className="cursor-pointer inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#FFC600] px-6 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_28px_rgba(255,198,0,0.2)] transition hover:brightness-105"
                    >
                        Submit
                    </button>
                    </div>
                </form>
                </section>
            </div>
        </section>
    )
}

export default CustomTestMakerStep2