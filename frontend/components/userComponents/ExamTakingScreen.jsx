import React, { useEffect, useRef, useState } from 'react'
import '../../src/animation.css';

//timer becomes zero, submit quiz / test
//submit exam on URL change / reload / all mcqs submitted
//some UI needs to become dynamic
//keep track of correct mcqs to show result in the end of quiz / test
//navigator does not appear on mobile, fix needed

const Navigator = ({exam, setMcqNumber, flagged, submitted}) => {
    let mcqNumber = 0;

    const filteredMcqs = {
        biology: exam?.mcqs.filter(mcq => mcq.subject_name === 'Biology'),
        chemistry: exam?.mcqs.filter(mcq => mcq.subject_name === 'Chemistry'),
        physics: exam?.mcqs.filter(mcq => mcq.subject_name === 'Physics'),
        english: exam?.mcqs.filter(mcq => mcq.subject_name === 'English'),
        logical_reasoning: exam?.mcqs.filter(mcq => mcq.subject_name === 'Logical Reasoning'),
    }

    return (
        <aside className="hidden min-h-0 w-[240px] min-w-[240px] shrink-0 flex-col border-l border-[#2E302E] bg-[#222422] lg:flex lg:min-h-0">
            <div className="flex-shrink-0 border-b border-[#2E302E] px-4 py-3 lg:px-5 lg:py-4">
              <p className="text-sm font-black uppercase tracking-widest text-white [font-family:Poppins,sans-serif] lg:text-base">Questions</p>
              <p className="mt-1 text-sm text-[#A8ACA8] lg:text-base">
                <span className="text-[#FFC600]">{submitted.size}</span>/{exam?.total_mcqs} answered
              </p>
            </div>

            <div className="ets-nav-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 py-3 lg:px-3.5 lg:py-4">
              <div className="sticky top-0 z-10 mb-3 border-b border-[#2E302E] bg-[#222422] pb-3 pt-0.5">
                <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-[#A8ACA8] lg:text-xs">Status key</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[11px] leading-tight text-[#A8ACA8] lg:text-xs lg:leading-snug">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-3 w-3 shrink-0 rounded-sm border border-[#2E302E] bg-[#181A18]" />
                    <span className="min-w-0">Unanswered</span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-3 w-3 shrink-0 rounded-sm bg-[#FFC600]" />
                    <span className="min-w-0">Answered</span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ background: 'rgba(251,146,60,0.42)', border: '1px solid rgba(251,146,60,0.8)' }}
                    />
                    <span className="min-w-0">Flagged</span>
                  </div>
                </div>
              </div>

                <div className="space-y-5">
                    {
                        ['biology', 'physics', 'chemistry', 'english', 'logical_reasoning'].map((subject, i) => {
                            return exam[subject] !== 0 ?
                            <section key={i}>
                                <div className="mb-2.5 flex min-w-0 items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#A8ACA8] lg:text-sm">
                                    <span className="flex min-w-0 items-center gap-2 truncate">
                                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#A78BFA]" />
                                    {subject.replace('_', ' ')}
                                    </span>
                                    <span className="shrink-0">{exam[subject]} MCQs</span>
                                </div>
                                <div className="grid min-w-0 grid-cols-5 gap-1.5 sm:gap-2">
                                {
                                    filteredMcqs[subject].map((button, i) => {
                                        mcqNumber += 1;
                                        return <span onClick={(e) => setMcqNumber(Number(e.target.textContent))} key={i} id={mcqNumber} className={`cursor-pointer ets-q-chip ${flagged.has(mcqNumber) ? 'ets-flagged' : ''} ${submitted.has(mcqNumber) ? 'ets-answered' : ''}`}>{mcqNumber}</span>
                                    })
                                }
                                </div>
                            </section> : ''
                        })
                    }
              </div>
            </div>
        </aside>
    )
}

const ExamTakingScreen = ({isQuiz, exam, isExamHappening}) => {
    //remove mcqStatuses and use seperate bookmarks, flagged and answered sets instead

    const examRef = useRef(null);
    // console.log(exam);
    const [mcqs, setMcqs] = useState(exam?.mcqs);
    const [mcqNumber, setMcqNumber] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(exam?.test_time);
    const [sixtySecondCountdown, setSixtySecondCountDown] = useState(0);

    const [bookmarks, setBookmarks] = useState(() => new Set());
    const [flagged, setFlagged] = useState(() => new Set());
    const [submitted, setSubmitted] = useState(() => new Set());

    const [saveLoading, setSaveLoading] = useState(false);

    window.scrollTo({top: 0, behavior: 'smooth'});

    const flagMCQ = () => {
        if(submitted.has(mcqNumber)) return;
        setFlagged(prev => {
            const newSet = new Set(prev);
            if(newSet.has(mcqNumber)) newSet.delete(mcqNumber);
            else newSet.add(mcqNumber);
            return newSet;
        });
    }

    const bookmarkMCQ = async () => {
        setSaveLoading(true);

        const res = await fetch(`${API_URL}/users/bookmarks/${mcqs[mcqNumber-1].mcq_id}`, {
            method: 'POST',
            credentials: 'include'
        });

        const data = await res.json();

        if(data.status === 'success'){
            setBookmarks(prev => {
                const newSet = new Set(prev);
                newSet.add(mcqNumber);
                return newSet;
            });
        }
        setSaveLoading(false);
    }

    const submitMCQ = async () => {
        if(submitted.has(mcqNumber)) return;

        setMcqStatus(2);
    }

    const moveToNextMcq = () => {
        setMcqNumber(prev => prev < exam?.total_mcqs ? prev + 1 : prev);
    }

    const formatTime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const secs = sixtySecondCountdown >= 60 ? 0 : sixtySecondCountdown;

        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const submitExam = async () => {

    }
    
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        
        if(isExamHappening){
            const startCountDown = setInterval(() => {
                setSixtySecondCountDown(prev => {
                    if(prev === 0){
                        setTimeRemaining(t => t - 1);
                        return 59;
                    } else {
                        return prev - 1;
                    }
                })
            }, 1000);

            return () => clearInterval(startCountDown); 
        }
    }, []);

  return (
    <>
      <style>{`
        .ets-nav-scroll::-webkit-scrollbar { width: 6px; }
        .ets-nav-scroll::-webkit-scrollbar-track { background: #181A18; }
        .ets-nav-scroll::-webkit-scrollbar-thumb { background: #FFC600; border-radius: 999px; }
        .ets-q-chip {
          position: relative;
          min-width: 0;
          width: 100%;
          height: 40px;
          border-radius: 7px;
          border: 1px solid #2E302E;
          background: #181A18;
          color: #A8ACA8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 13px;
          font-weight: 900;
        }
        .ets-q-chip.ets-answered { background: #FFC600; border-color: #FFC600; color: #181A18; }
        .ets-q-chip.ets-flagged { background: rgba(251, 146, 60, 0.22); border-color: rgba(251, 146, 60, 0.65); color: #FB923C; }
        .ets-q-chip.ets-skipped { background: #2A2C2A; color: #A8ACA8; }
        .ets-q-chip.ets-current { border: 2px solid #FFC600; color: #FFC600; box-shadow: 0 0 0 1px rgba(255, 198, 0, 0.25); }
        .ets-q-chip.ets-flagged::after {
          content: "";
          position: absolute;
          right: -4px;
          top: -4px;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #FB923C;
          border: 1px solid #222422;
        }
        .ets-option-card {
          min-height: 72px;
          border: 1px solid #2E302E;
          background: #222422;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 16px 18px;
        }
        .ets-option-key {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #2A2C2A;
          color: #A8ACA8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 14px;
          font-weight: 900;
          flex-shrink: 0;
        }
        .ets-action-chip {
          width: 108px;
          height: 56px;
          border-radius: 14px;
          border: 1px solid #2E302E;
          background: rgba(42, 44, 42, 0.25);
          color: #A8ACA8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .ets-action-chip.ets-submit {
          color: #FFC600;
          background: rgba(255, 198, 0, 0.11);
          border-color: rgba(255, 198, 0, 0.46);
        }
        @media (max-width: 1023px) {
          .ets-option-card { min-height: 58px; padding: 12px 16px; border-radius: 10px; gap: 14px; background: #111411; }
          .ets-option-key { width: 30px; height: 30px; font-size: 12px; }
          .ets-action-chip { width: auto; min-width: 0; flex: 1 1 0%; height: 44px; border-radius: 10px; font-size: 11px; }
          .ets-q-chip { height: 36px; font-size: 12px; }
        }
      `}</style>

      <main ref={examRef} className="fade-in flex h-[100dvh] min-h-0 w-full min-w-0 flex-col bg-[#181A18] text-white antialiased [font-family:Inter,sans-serif]">
        <section className="grid h-auto min-h-14 flex-shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-1 border-b border-[#2E302E] bg-[#222422] px-4 py-2.5 lg:h-[76px] lg:min-h-0 lg:px-7 lg:py-0">
          <div className="min-w-0 justify-self-start">
            <p className="truncate text-base font-bold leading-tight text-white lg:text-lg">Mixed Subjects</p>
            <p className="mt-0.5 text-sm text-[#A8ACA8]">{exam.total_mcqs} MCQs</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 justify-self-center rounded-lg border border-[#2E302E] bg-[#181A18] px-3 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8ACA8" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="whitespace-nowrap font-mono text-base font-black text-white">{formatTime(timeRemaining, sixtySecondCountdown)}</span>
            <span className="text-sm font-black text-[#A8ACA8]">II</span>
          </div>
          <p className="justify-self-end whitespace-nowrap text-sm font-black text-[#A8ACA8] lg:text-base">
            Q <span className="text-xl text-white [font-family:Poppins,sans-serif]">{mcqNumber}</span> / {exam?.total_mcqs}
          </p>
        </section>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#181A18]">
            <div className="mx-auto flex min-h-0 w-full max-w-[748px] flex-1 flex-col justify-center overflow-hidden px-4 py-4 lg:px-6 lg:py-5">
              {/* <div className="mb-4 flex flex-shrink-0 flex-wrap items-center gap-2 lg:mb-6">
                <span
                  className="rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-widest"
                  style={{
                    color: '#10B981',
                    borderColor: 'rgba(16,185,129,0.3)',
                    background: 'rgba(16,185,129,0.09)',
                  }}
                >
                  Easy
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-[#A8ACA8]">
                  Biology {' · '} Genetics
                </span>
              </div> */}

              <p className="mb-5 flex-shrink-0 text-lg font-medium leading-relaxed text-white lg:mb-7 lg:text-xl">
                Q. {mcqs[mcqNumber].question}
              </p>

              <div className="flex min-h-0 flex-shrink-0 flex-col gap-3 lg:gap-4">
                <div className="ets-option-card">
                  <span className="ets-option-key">A</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber].option_a}</span>
                </div>
                <div className="ets-option-card">
                  <span className="ets-option-key">B</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber].option_b}</span>
                </div>
                <div className="ets-option-card">
                  <span className="ets-option-key">C</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber].option_c}</span>
                </div>
                <div className="ets-option-card">
                  <span className="ets-option-key">D</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber].option_d}</span>
                </div>
              </div>
            </div>
          </section>

            <Navigator exam={exam} setMcqNumber={setMcqNumber} flagged={flagged} submitted={submitted}/>
        </div>

        <footer className="flex-shrink-0 border-t border-[#2E302E] bg-[#222422]">
          <div className="flex flex-wrap items-stretch justify-center gap-2 px-3 py-3 sm:flex-nowrap sm:items-center lg:px-6">
            <div className="ets-action-chip lg:hidden">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span className="text-[#FFC600]">{mcqNumber}/100</span>
            </div>
            <button onClick={flagMCQ} disabled={!isExamHappening} className="cursor-pointer ets-action-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {flagged.has(mcqNumber) ? 'Flagged' : 'Flag'}
            </button>
            <button onClick={bookmarkMCQ} disabled={saveLoading || bookmarks.has(mcqNumber) || !isExamHappening} className={`${saveLoading || bookmarks.has(mcqNumber) || !isExamHappening ? 'cursor-not-allowed' : 'cursor-pointer'} ets-action-chip`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              {saveLoading ? 'Processing....' : `${bookmarks.has(mcqNumber) ? 'Saved' : 'Save'}`}
            </button>
            <button onClick={submitMCQ} className="cursor-pointer ets-action-chip ets-submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              {submitted.has(mcqNumber) ? 'Submitted' : 'Submit'}
            </button>
          </div>
          <div className="flex items-center gap-2 border-t border-[#2E302E] px-3 py-3 sm:gap-4 sm:px-4 lg:px-7">
            <button
              type="button"
              onClick={() => setMcqNumber(prev => prev > 1 ? prev - 1 : prev)}
              className="cursor-pointer flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-black uppercase tracking-wide text-[#A8ACA8] opacity-40 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Prev
            </button>
            <div className="min-w-0 flex-1 px-0.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full border border-[#2E302E] bg-[#181A18]">
                <div className="h-full rounded-full bg-[#FFC600]" style={{ width: `${parseInt((submitted.size / exam?.total_mcqs) * 100)}%` }} />
              </div>
              <p className="mt-1.5 truncate text-center text-[10px] font-black uppercase tracking-widest text-[#A8ACA8] sm:mt-2 sm:text-xs lg:text-sm">
                {submitted.size} of {exam?.total_mcqs} answered
              </p>
            </div>
            <button
              type="button"
              onClick={moveToNextMcq}
              className="cursor-pointer flex shrink-0 items-center gap-1.5 rounded-xl bg-[#FFC600] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#181A18] shadow-lg sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
            >
              {submitted.size === exam.total_mcqs ? 'Finish' : 'Next'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </footer>
      </main>
    </>
  )
}

export default ExamTakingScreen
