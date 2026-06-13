import React, { useState } from 'react'
import '../../src/animation.css';

const SubmitExamConfirmation = ({unanswered, answered, flagged, setHidden, submitExam}) => {
  const [submitExamLoading, setSubmitExamLoading] = useState(false);

  return (
    <>
      <style>{`
        .sec-modal-scroll::-webkit-scrollbar { width: 6px; }
        .sec-modal-scroll::-webkit-scrollbar-track { background: #181A18; }
        .sec-modal-scroll::-webkit-scrollbar-thumb { background: #FFC600; border-radius: 3px; }
      `}</style>

      <div
        className="custom-mix-overlay fade-in fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-exam-title"
        className="exam-flow-page exam-flow-card fade-in sec-modal-scroll fixed bottom-3 left-3 right-3 z-[70] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#2E302E] bg-[#222422] p-5 shadow-2xl lg:inset-auto lg:left-1/2 lg:top-1/2 lg:w-[380px] lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <div className="exam-flow-icon-badge mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-400"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>

        <h3
          id="submit-exam-title"
          className="mb-2 text-center text-lg font-black text-white [font-family:Poppins,sans-serif]"
        >
          Submit Exam?
        </h3>

        <div className="exam-flow-alert mb-5 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.08] px-4 py-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0 text-amber-400"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p className="text-[13px] leading-relaxed text-amber-300 [font-family:Inter,sans-serif]">
            <span className="font-bold">{unanswered} questions</span> still unanswered. They will be marked as skipped.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-2">
          <div className="exam-flow-stat-tile exam-flow-stat-tile--neutral rounded-lg border border-[#2E302E] bg-[#181A18] py-2 text-center">
            <p className="text-lg font-black leading-none text-emerald-400 [font-family:Poppins,sans-serif]">{answered}</p>
            <p className="mt-0.5 text-[9px] text-[#A8ACA8] [font-family:Inter,sans-serif]">Answered</p>
          </div>
          <div className="exam-flow-stat-tile exam-flow-stat-tile--neutral rounded-lg border border-[#2E302E] bg-[#181A18] py-2 text-center">
            <p className="text-lg font-black leading-none text-amber-400 [font-family:Poppins,sans-serif]">{unanswered}</p>
            <p className="mt-0.5 text-[9px] text-[#A8ACA8] [font-family:Inter,sans-serif]">Unanswered</p>
          </div>
          <div className="exam-flow-stat-tile exam-flow-stat-tile--neutral rounded-lg border border-[#2E302E] bg-[#181A18] py-2 text-center">
            <p className="text-lg font-black leading-none text-orange-400 [font-family:Poppins,sans-serif]">{flagged}</p>
            <p className="mt-0.5 text-[9px] text-[#A8ACA8] [font-family:Inter,sans-serif]">Flagged</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setHidden(true)}
            className="quiz-btn-secondary cursor-pointer flex-1 rounded-xl border px-4 py-2.5 text-[13px] font-bold transition-colors [font-family:Inter,sans-serif]"
          >
            Keep Going
          </button>
          <button
            type="button"
            onClick={() => submitExam(false, setSubmitExamLoading)}
            disabled={submitExamLoading}
            className={`exam-flow-submit-btn ${submitExamLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/15 px-4 py-2.5 text-[13px] font-bold text-amber-300 transition-colors [font-family:Inter,sans-serif] hover:bg-amber-500/25`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {submitExamLoading ? 'Processing....' : 'Submit'}
          </button>
        </div>
      </div>
    </>
  )
}

export default SubmitExamConfirmation