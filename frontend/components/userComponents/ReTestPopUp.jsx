import { useEffect, useRef, useState } from 'react';
import '../../src/animation.css';
import { useNavigate } from 'react-router-dom';

const ReTestPopUp = ({setRetestPopUpHidden, pendingMistakes}) => {
    const popupRef = useRef(null);

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [removeMCQAfterCorrection, setRemoveMCQAfterCorrection] = useState(false);
    
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchMCQsForRetest = async () => {
        setSubmitLoading(true);

        const res = await fetch(`${API_URL}/mcqs/retest?start=${start}&end=${end}&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1`, {
            credentials: 'include'
        });

        if(res.ok){
            const data = await res.json();

            if(data.status === 'success'){
                const mcqs = data.data;
                let bio = 0, phy = 0, eng = 0, chem = 0, lr = 0;
                mcqs.forEach(mcq => {
                    const subject = mcq.subject_name;
                    if(subject === 'Biology') bio++;
                    else if(subject === 'Physics') phy++;
                    else if(subject === 'English') eng++;
                    else if(subject === 'Chemistry') chem++;
                    else lr++;
                })
                localStorage.setItem("exam", JSON.stringify({
                    isQuiz: true,
                    test_name: 'Mistake Copy Exam',
                    total_mcqs: mcqs.length,
                    timer: false,
                    answerAfterEach: false,
                    test_mode: 'Silent',
                    blind_mode: false,
                    isMistakeCopyExam: true,
                    removeMCQAfterCorrection,
                    mcqs,
                    biology: bio,
                    chemistry: chem,
                    physics: phy,
                    english: eng,
                    logical_reasoning: lr,
                    test_time: 0,
                    test_id: 0
                }));

                navigate('/dashboard/my-copy/exam/0');
            }
        }

        setSubmitLoading(false);
    }

    useEffect(() => {
        if(popupRef?.current) popupRef.current.focus();
    }, []);

    return (
        <section
            className="fade-in custom-mix-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="retest-popup-title"
        >
            <div tabIndex={-1} ref={popupRef} className="relative flex w-[calc(100%-24px)] max-w-lg max-h-[88vh] flex-col overflow-hidden rounded-2xl border border-[#2E302E] bg-[#222422] shadow-2xl">
                <button
                    type="button"
                    onClick={() => setRetestPopUpHidden(true)}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#2E302E] bg-[#1c1c1c] text-[#A8ACA8] transition-colors hover:border-[#FFC600]/40 hover:bg-[#2A2C2A]/40 hover:text-white"
                    aria-label="Close"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Header */}
                <div className="flex flex-shrink-0 items-start justify-between border-b border-[#2E302E] px-5 pb-3 pr-14 pt-4">
                    <div className="min-w-0">
                        <p className="mb-0.5 text-[12px] font-[Inter] font-black uppercase tracking-[0.14em] text-[#FFC600]">
                            Re-test from Mistakes
                        </p>
                        <h3 id="retest-popup-title" className="truncate text-[22px] font-black text-white sm:text-[24px]">
                            Create a practice test
                        </h3>
                        <p className="mt-0.5 text-[14px] font-[Inter] text-[#A8ACA8]">
                            Pick a range from your mistake copy and choose how corrections are handled. You can make a test of 100 mcqs max.
                        </p>
                    </div>
                </div>

                {/* Body */}
                <form className="flex flex-1 flex-col overflow-y-auto px-5 py-5">
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3.5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-white/45">Available in mistake copy</p>
                                <p className="mt-0.5 text-[15px] font-bold text-white/90">
                                    <span className="font-[Poppins] text-xl text-[#FFC600]">{pendingMistakes}</span>
                                    <span className="ml-1.5 text-[#A8ACA8]">MCQs ready for re-test</span>
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="lower_limit" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                                    Lower limit
                                </label>
                                <input
                                    value={start}
                                    onChange={e => setStart(e.target.value)}
                                    id="lower_limit"
                                    name="lower_limit"
                                    type="number"
                                    min="1"
                                    max={pendingMistakes}
                                    required
                                    placeholder="e.g. 1"
                                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                                />
                                <p className="mt-1.5 text-[12px] text-[#A8ACA8]">First mistake MCQ to include</p>
                            </div>

                            <div>
                                <label htmlFor="upper_limit" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                                    Upper limit
                                </label>
                                <input
                                    value={end}
                                    onChange={e => setEnd(e.target.value)}
                                    id="upper_limit"
                                    name="upper_limit"
                                    type="number"
                                    min="1"
                                    max={pendingMistakes}
                                    required
                                    placeholder="e.g. 20"
                                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                                />
                                <p className="mt-1.5 text-[12px] text-[#A8ACA8]">Last mistake MCQ to include</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-4">
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-white/45">
                                Mistake copy behaviour
                            </p>

                            <label
                                htmlFor="remove_on_correct"
                                className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#2E302E] bg-[#1c1c1c] p-4 transition hover:border-[#FFC600]/35"
                            >
                                <input
                                    checked={removeMCQAfterCorrection}
                                    onChange={() => setRemoveMCQAfterCorrection(prev => !prev)}
                                    id="remove_on_correct"
                                    name="remove_on_correct"
                                    type="checkbox"
                                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#FFC600]"
                                />
                                <span>
                                    <span className="block text-[15px] font-bold text-white/90">
                                        Remove corrected MCQs from my mistake copy
                                    </span>
                                    <span className="mt-1 block text-[13px] leading-relaxed text-[#A8ACA8]">
                                        If I answer an MCQ correctly in this test, remove it from my mistakes copy automatically.
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#2E302E] pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => setRetestPopUpHidden(true)}
                            className="w-full cursor-pointer rounded-xl border border-[#2E302E] bg-white/[0.06] px-4 py-3 text-[14px] font-[Inter] font-bold text-white transition-colors hover:border-[#FFC600]/40 sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={fetchMCQsForRetest}
                            disabled={submitLoading}
                            className="w-full cursor-pointer rounded-xl bg-[#FFC600] px-4 py-3 text-[14px] font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_32px_rgba(255,198,0,0.25)] transition hover:brightness-105 sm:w-auto"
                        >
                            Submit Details →
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ReTestPopUp;
