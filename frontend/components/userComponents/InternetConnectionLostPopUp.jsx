import React from 'react'
import '../../src/animation.css'
import { useNavigate, useParams } from 'react-router-dom'
import sendErrorSuccessMessage from '../../utils/sendErrorSuccessMessage'

const InternetConnectionLostPopUp = ({ connectionRestored = false, isQuiz, setIsOnline, setIsExamHappeningParent, startTimer, exam}) => {
    const navigate = useNavigate();
    const {examType} = useParams();
    const API_URL = import.meta.env.VITE_API_URL;

    const quizExam = async () => {
        if(!isQuiz){
            const res = await fetch(`${API_URL}/tests/discard`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    test_id: exam?.test_id
                })
            });

            if(res.ok){
                sendErrorSuccessMessage('success', `${isQuiz ? 'Quiz' : 'Test'} quitted. Redirecting...`);
            }
        }

        setIsExamHappeningParent(false);
        navigate(`/dashboard/${examType}`);
    }

    const submitOfflineExam = async () => {
        localStorage.setItem("exam", JSON.stringify({
            ...exam,
            examStatus: "NOT_SUBMITTED"
        }))

        setIsExamHappeningParent(false);
        navigate(`/dashboard/${examType}`);
    }

    return (
        <div className="fade-in fixed inset-0 z-[95] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="connection-lost-title"
                className="w-full max-w-md rounded-2xl border border-[#2E302E] bg-[#222422] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:p-6"
            >
                {!connectionRestored ? (
                    <>
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
                                <line x1="2" y1="2" x2="22" y2="22" />
                                <path d="M8.5 16.5a5 5 0 0 1 7 0" />
                                <path d="M2 8.82a15 15 0 0 1 20 0" />
                                <path d="M5 12.55a11 11 0 0 1 14 0" />
                            </svg>
                        </div>

                        <h2
                            id="connection-lost-title"
                            className="text-center text-lg font-black text-white [font-family:Poppins,sans-serif] lg:text-xl"
                        >
                            Connection Lost
                        </h2>
                        <p className="mt-2 text-center text-sm leading-relaxed text-[#A8ACA8] lg:text-[15px]">
                            You have lost your internet connection. Your progress is saved locally, but you
                            cannot continue the quiz until you are back online — or you can submit or quit now.
                        </p>

                        <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3">
                            <p className="text-center text-xs font-bold uppercase tracking-[0.08em] text-red-300">
                                Waiting for connection to resume
                            </p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={submitOfflineExam}
                                className="cursor-pointer rounded-xl border border-amber-500/40 bg-amber-500/15 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-amber-300 transition-colors hover:bg-amber-500/25"
                            >
                                Submit Quiz
                            </button>
                            <button
                                type="button"
                                onClick={quizExam}
                                className="cursor-pointer rounded-xl border border-red-400/35 bg-red-500/15 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-red-300 transition-colors hover:bg-red-500/25"
                            >
                                Quit Quiz
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-400/10">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-emerald-400"
                            >
                                <path d="M5 12.55a11 11 0 0 1 14 0" />
                                <path d="M8.5 16.5a5 5 0 0 1 7 0" />
                                <path d="M12 20h.01" />
                            </svg>
                        </div>

                        <h2
                            id="connection-lost-title"
                            className="text-center text-lg font-black text-white [font-family:Poppins,sans-serif] lg:text-xl"
                        >
                            Connection Restored
                        </h2>
                        <p className="mt-2 text-center text-sm leading-relaxed text-[#A8ACA8] lg:text-[15px]">
                            Your internet connection has been restored. You can safely continue your quiz.
                        </p>

                        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                            <p className="text-center text-xs font-bold uppercase tracking-[0.08em] text-emerald-300">
                                You are back online
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setIsOnline(true);
                                startTimer();
                            }}
                            className="mt-5 w-full cursor-pointer rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-emerald-300 transition-colors hover:bg-emerald-500/25"
                        >
                            Continue
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default InternetConnectionLostPopUp
