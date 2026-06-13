import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../../src/animation.css';

const ExamResult = ({isQuiz, correct, wrong, saved, skipped, total, exam}) => {
    const percentage = parseInt((correct / total) * 100);

    const navigate = useNavigate();
    const {examType} = useParams();
    // console.log(exam);

    return (
        <>
        <style>{`
            .card { background:var(--ui-panel); border:1px solid rgb(var(--ui-text-rgb) / 0.08); border-radius:1rem; box-shadow:0 2px 8px rgba(0,0,0,.30), 0 8px 24px rgba(0,0,0,.20); padding:1rem 1.25rem; }
        `}</style>

        <div className="exam-result-page exam-flow-page user-dashboard-page fade-in flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden lg:pb-0">
            <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 lg:px-8">
                <div className="card !p-6 text-center lg:!p-8">
                <div className="relative mx-auto mb-5 h-32 w-32">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle className="exam-result-ring-bg" cx="50" cy="50" r="40" fill="none" strokeWidth="8" />
                    <circle className="exam-result-ring-progress" cx="50" cy="50" r="40" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(percentage / 100) * 251.33} 251.33`} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black leading-none text-white [font-family:Poppins,sans-serif]">{correct}</span>
                    <span className="text-xs text-[#A8ACA8]">/ {total}</span>
                    </div>
                </div>

                <div className="mb-3 inline-block rounded-full border-2 border-red-400 bg-red-400/10 px-4 py-1.5 text-sm font-black uppercase tracking-[0.1em] text-red-400">
                    Battle Stations
                </div>

                <p className="mb-1 text-4xl font-black text-white [font-family:Poppins,sans-serif]">{percentage}%</p>
                <p className="text-sm text-[#A8ACA8]">Mixed Subjects</p>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                <div className="exam-flow-stat-tile rounded-xl border border-emerald-500/20 bg-emerald-500/5 py-4 text-center">
                    <p className="text-2xl font-black leading-none text-emerald-400 [font-family:Poppins,sans-serif]">{correct}</p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.08em] text-[#A8ACA8]">Correct</p>
                </div>
                <div className="exam-flow-stat-tile rounded-xl border border-red-500/20 bg-red-500/5 py-4 text-center">
                    <p className="text-2xl font-black leading-none text-red-400 [font-family:Poppins,sans-serif]">{wrong}</p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.08em] text-[#A8ACA8]">Wrong</p>
                </div>
                <div className="exam-flow-stat-tile exam-flow-stat-tile--neutral rounded-xl border border-[#2E302E] py-4 text-center">
                    <p className="text-2xl font-black leading-none text-[#A8ACA8] [font-family:Poppins,sans-serif]">{skipped}</p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.08em] text-[#A8ACA8]">Skipped</p>
                </div>
                <div className="exam-flow-stat-tile rounded-xl border border-[#FFC600]/20 bg-[#FFC600]/5 py-4 text-center">
                    <p className="text-2xl font-black leading-none text-[#FFC600] [font-family:Poppins,sans-serif]">{saved}</p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.08em] text-[#A8ACA8]">Saved</p>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                <button type='button' 
                    onClick={() => {  
                        navigate(`/dashboard/${examType}`);
                    }} 
                    className="quiz-btn-secondary cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-[13px] font-black uppercase tracking-[0.08em] transition-all">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                    </svg>
                    {isQuiz ? (exam?.isMistakeCopyExam ? 'Back To My Copy' : 'New Quiz') : 'Back To Test Series'}
                </button>

                <Link to={`/dashboard/${examType}/previous-exam/${exam?.test_id}`} 
                    onClick={() => {
                        localStorage.setItem("previous-exam-mcqs", JSON.stringify({
                            test_id: exam?.test_id,
                            test_name: exam?.test_name,
                            total_mcqs: exam?.mcq_count ?? exam?.total_mcqs,
                            test_time: exam?.test_time ?? 0,
                            mcqs: exam?.mcqs,
                            biology: exam?.biology,
                            chemistry: exam?.chemistry,
                            physics: exam?.physics,
                            english: exam?.english,
                            logical_reasoning: exam?.logical_reasoning,
                            test_mode: "Silent",
                            blind_mode: 0,
                            answerAfterEach: true,
                            comingFromExamResult: true,
                            isQuiz,
                            isMistakeCopyExam: exam?.isMistakeCopyExam,
                            selectedOptions: exam?.selectedOptions
                        }));
                    }}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-[#FFC600] px-4 py-3.5 text-[13px] font-black uppercase tracking-[0.08em] text-[#181A18] shadow-lg shadow-[#FFC600]/15 transition-all hover:scale-[1.01]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                    </svg>
                    Review Answers
                </Link>
                </div>
            </div>
            </div>
        </main>
        </div>
        </>
    )
}

export default ExamResult