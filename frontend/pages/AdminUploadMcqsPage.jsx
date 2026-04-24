import React, { useState } from 'react'
import AdminDashboardHeader from '../components/adminComponents/AdminDashboardHeader'
import { useOutletContext } from 'react-router-dom';

const AdminUploadMcqsPage = () => {
    const [excelFile, setExcelFile] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const submitFile = async () => {
        setLoading(true);

        if(!excelFile){
            setMessage("Please select a file.");
            setLoading(false);
            setError(true);
            return;
        } else {
            setMessage('');
            setError(false);
        }

        const formData = new FormData();
        formData.append("file", excelFile);

        const res = await fetch(`${API_URL}/mcqs/upload`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        const data = await res.json();

        console.log(data);

        if(data.status === 'success'){
            setMessage('File successfully submitted! Test created!');
            setError(false);
        } else {
            setMessage(data.message || 'File submission failed! Please try again later!');
            setError(true);
        }

        setLoading(false);
    }

    return (
        <main className="flex-1 p-6 lg:p-10">
            <AdminDashboardHeader />

            <section className="relative flex flex-1 flex-col items-stretch justify-start px-2 py-6 sm:px-4 lg:px-6">

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-[min(70vh,520px)] w-[min(90vw,560px)] rounded-full bg-[#FFC600]/[0.07] blur-[100px]"></div>
                </div>

                <div className="relative mx-auto w-full max-w-5xl">
                    <div className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-l-2 border-t-2 border-[#FFC600]/25 rounded-tl-xl"></div>
                    <div className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-[#FFC600]/25 rounded-br-xl"></div>

                    <div className="rounded-2xl border border-white/10 bg-[#1A1A1A]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur sm:p-8 lg:p-10">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFC600]/30 bg-[#FFC600]/10">
                        <svg className="h-7 w-7 text-[#FFC600]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        </div>
                        <h1 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">Import questions from Excel</h1>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
                            Select an excel file by clicking on the button below. One file at a time keeps the import clean and easy to review.
                        </p>
                    </div>

                    <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-[#121212]/80 px-5 py-10 text-center sm:px-6 sm:py-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">Upload area</p>
                        <p id="file-hint" className="mt-3 text-sm text-white/45">{excelFile?.name || 'No file selected yet'}</p>

                        <div className="mt-8">
                        <input onChange={e => setExcelFile(e.target.files[0])} type="file" id="mcq-file" className="sr-only" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" />
                        <label
                            htmlFor="mcq-file"
                            className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#FFC600] px-10 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#181A18] shadow-[0_12px_40px_rgba(255,198,0,0.25)] transition hover:brightness-105 hover:shadow-[0_16px_48px_rgba(255,198,0,0.3)] active:scale-[0.98]"
                        >
                            Choose Excel file
                        </label>
                        </div>
                    </div>

                    <ul className="mt-7 space-y-3 border-t border-white/[0.06] pt-7 text-left text-sm text-white/50 sm:columns-2 sm:gap-10 sm:space-y-4">
                        <li className="flex gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-[#FFC600]">1</span>
                            <span>Use the template columns your team agreed on (topic, stem, options, answer key).</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-[#FFC600]">2</span>
                            <span>Save as <span className="font-medium text-white/70">.xlsx</span> before uploading for best compatibility.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-[#FFC600]">3</span>
                            <span>After upload, the system can validate rows — this screen is only the file picker.</span>
                        </li>
                    </ul>

                    <div className="mt-8 border-t border-white/[0.06] pt-8 text-right flex flex-col gap-3 md:flex-row justify-end items-center">
                        <span className={`${error ? 'text-red-500' : 'text-green-500'}`}>{message}</span>
                        <button
                        type="button"
                        onClick={submitFile}
                        disabled={loading}
                        className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} inline-flex items-center justify-center rounded-xl bg-[#FFC600] px-8 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#181A18] shadow-[0_12px_40px_rgba(255,198,0,0.22)] transition hover:brightness-105 hover:shadow-[0_16px_48px_rgba(255,198,0,0.3)] active:scale-[0.98]`}
                        >
                        {loading ? 'Processing....' : 'Submit file'}
                        </button>
                    </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminUploadMcqsPage