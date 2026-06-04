import React, { useState } from 'react'
import '../../src/animation.css';

const ExamLeavingWarning = ({setExamLeavingWarning, submitExam}) => {
    const [leaveExamLoading, setLeaveExamLoading] = useState(false);

    return (
        <div className="fade-in fixed inset-0 z-[90] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl border border-[#2E302E] bg-[#222422] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:p-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-400/35 bg-red-400/10">
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-400"
            >
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            </svg>
            </div>

            <h2 className="text-center text-lg font-black text-white [font-family:Poppins,sans-serif] lg:text-xl">
            Leave Exam?
            </h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-[#A8ACA8] lg:text-[15px]">
            If you leave this screen, your current exam session may be submitted automatically and
            unanswered MCQs can be marked as skipped.
            </p>

            <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3">
            <p className="text-center text-xs font-bold uppercase tracking-[0.08em] text-red-300">
                This action may affect your final score
            </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
            <button
                type="button"
                onClick={() => setExamLeavingWarning(false)}
                className="cursor-pointer rounded-xl border border-[#2E302E] bg-[#2A2C2A]/30 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition-colors hover:border-[#A8ACA8]/50"
            >
                Stay Here
            </button>
            <button
                type="button"
                disabled={leaveExamLoading}
                onClick={() => submitExam(false, setLeaveExamLoading)}
                className={`${leaveExamLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-xl border border-red-400/35 bg-red-500/15 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-red-300 transition-colors hover:bg-red-500/25`}
            >
                {leaveExamLoading ? 'Processing...' : 'Leave Exam'}
            </button>
            </div>
        </div>
        </div>
    )
}

export default ExamLeavingWarning
