import React from 'react'
import AdminDashboardHeader from '../components/adminComponents/AdminDashboardHeader'

const AdminUploadMcqsPage = () => {
  return (
    <main className="flex-1 p-6 lg:p-10">
        <AdminDashboardHeader />

        <section className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8">

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[min(70vh,520px)] w-[min(90vw,560px)] rounded-full bg-[#FFC600]/[0.07] blur-[100px]"></div>
            </div>

            <div className="relative w-full max-w-xl">
                <div className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-l-2 border-t-2 border-[#FFC600]/25 rounded-tl-xl"></div>
                <div className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-[#FFC600]/25 rounded-br-xl"></div>

                <div className="rounded-2xl border border-white/10 bg-[#1A1A1A]/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur sm:p-10">
                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFC600]/30 bg-[#FFC600]/10">
                    <svg className="h-7 w-7 text-[#FFC600]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    </div>
                    <h1 className="mt-6 text-2xl font-black tracking-tight text-white sm:text-3xl">Import questions from Excel</h1>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
                        Select an excel file by clicking on the button below. One file at a time keeps the import clean and easy to review.
                    </p>
                </div>

                <div className="mt-10 rounded-xl border border-dashed border-white/15 bg-[#121212]/80 px-4 py-12 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">Upload area</p>
                    <p id="file-hint" className="mt-3 text-sm text-white/45">No file selected yet</p>

                    <div className="mt-8">
                    <input type="file" id="mcq-file" className="sr-only" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" />
                    <label
                        htmlFor="mcq-file"
                        className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#FFC600] px-10 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#181A18] shadow-[0_12px_40px_rgba(255,198,0,0.25)] transition hover:brightness-105 hover:shadow-[0_16px_48px_rgba(255,198,0,0.3)] active:scale-[0.98]"
                    >
                        Choose Excel file
                    </label>
                    </div>
                </div>

                <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-8 text-left text-sm text-white/50">
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
                </div>
            </div>
        </section>
    </main>
  )
}

export default AdminUploadMcqsPage