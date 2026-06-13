import { useState } from 'react'
import '../../src/animation.css'

const QuitExamWarning = ({setQuitExamPopupHidden, quitExam}) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div
                className="custom-mix-overlay fade-in fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm"
                aria-hidden="true"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="quit-exam-title"
                className="exam-flow-page exam-flow-card fade-in fixed bottom-3 left-3 right-3 z-[100] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#2E302E] bg-[#222422] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:inset-auto lg:left-1/2 lg:top-1/2 lg:w-[400px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:p-6"
            >
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
                        aria-hidden="true"
                    >
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                    </svg>
                </div>

                <h2
                    id="quit-exam-title"
                    className="text-center text-lg font-black text-white [font-family:Poppins,sans-serif] lg:text-xl"
                >
                    Quit Exam?
                </h2>

                <p className="mt-2 text-center text-sm leading-relaxed text-[#A8ACA8] [font-family:Inter,sans-serif] lg:text-[15px]">
                    Are you sure you want to quit? Your current progress will be lost.
                </p>

                <div className="exam-flow-alert mt-5 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.08] px-4 py-3">
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
                        aria-hidden="true"
                    >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <p className="text-[13px] leading-relaxed text-amber-300 [font-family:Inter,sans-serif]">
                        <span className="font-bold">This test can only be given once</span> unless you quit before submitting. If you submit, you cannot retake it.
                    </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setQuitExamPopupHidden(true)}
                        className="quiz-btn-secondary cursor-pointer rounded-xl border border-[#2E302E] bg-[#2A2C2A]/30 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition-colors hover:border-[#A8ACA8]/50"
                    >
                        Keep Going
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            quitExam(setLoading);
                        }}
                        className="cursor-pointer rounded-xl border border-red-400/35 bg-red-500/15 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-red-300 transition-colors hover:bg-red-500/25"
                    >
                        {loading ? 'Processing....' : 'Quit Exam'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default QuitExamWarning
