import React, { useEffect, useRef, useState } from 'react'
// import '../../src/animation.css';
import '../frontend/src/animation.css';
import SubmitExamConfirmation from '../frontend/components/userComponents/SubmitExamConfirmation'
import { formatName, subjectToColor } from '../frontend/utils/HelperObjects';

const Navigator = ({ exam, setMcqNumber, flagged, submitted, mcqNumber }) => {
  let chipNumber = 0;

  const filteredMcqs = {
    biology: exam?.mcqs.filter(mcq => mcq.subject_name === 'Biology'),
    chemistry: exam?.mcqs.filter(mcq => mcq.subject_name === 'Chemistry'),
    physics: exam?.mcqs.filter(mcq => mcq.subject_name === 'Physics'),
    english: exam?.mcqs.filter(mcq => mcq.subject_name === 'English'),
    logical_reasoning: exam?.mcqs.filter(mcq => mcq.subject_name === 'Logical Reasoning'),
  };

  return (
    <aside className="desktop-navigator">
      <div className="flex-shrink-0 border-b border-[#2E302E] px-5 py-4">
        <p className="font-poppins text-[13px] font-black uppercase tracking-widest text-white">Questions</p>
        <p className="mt-1 text-sm text-[#A8ACA8]">
          <span className="text-[#FFC600]">{submitted.size}</span>/{exam?.total_mcqs} answered
        </p>
      </div>

      <div className="nav-scroll space-y-5">
        {['biology', 'physics', 'chemistry', 'english', 'logical_reasoning'].map((subject, i) => {
          return exam[subject] !== 0 ? (
            <section key={i}>
              <div className="subject-label">
                <span>
                  <i
                    className="subject-dot"
                    style={{ background: subjectToColor[formatName(subject)] || '#A78BFA' }}
                  />
                  {subject.replace('_', ' ')}
                </span>
                <span>{exam[subject]} MCQs</span>
              </div>
              <div className="question-grid">
                {filteredMcqs[subject].map((button, j) => {
                  chipNumber += 1;
                  const n = chipNumber;
                  const chipClass = [
                    'q-chip',
                    submitted.has(n) ? 'answered' : '',
                    flagged.has(n) ? 'flagged' : '',
                    n === mcqNumber ? 'current' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                  return (
                    <span
                      onClick={(e) => setMcqNumber(Number(e.target.textContent))}
                      key={j}
                      id={n}
                      className={`cursor-pointer ${chipClass}`}
                    >
                      {n}
                    </span>
                  );
                })}
              </div>
            </section>
          ) : (
            ''
          );
        })}
      </div>

      <div className="grid flex-shrink-0 grid-cols-1 gap-2 border-t border-[#2E302E] px-4 py-4 hidden sm:block">
        <div className="flex items-center gap-3 text-sm text-[#A8ACA8]">
          <span className="h-3 w-3 rounded-sm border border-[#2E302E] bg-[#181A18]" />
          Unanswered
        </div>
        <div className="flex items-center gap-3 text-sm text-[#A8ACA8]">
          <span className="h-3 w-3 rounded-sm bg-[#FFC600]" />
          Answered
        </div>
        <div className="flex items-center gap-3 text-sm text-[#A8ACA8]">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ background: 'rgba(251,146,60,0.42)', border: '1px solid rgba(251,146,60,0.8)' }}
          />
          Flagged
        </div>
      </div>
    </aside>
  );
};

const TempScreen = ({ isQuiz, exam, isExamHappening }) => {
  const examRef = useRef(null);
  const [mcqs, setMcqs] = useState(exam?.mcqs);
  const [mcqNumber, setMcqNumber] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(exam?.test_time);
  const [sixtySecondCountdown, setSixtySecondCountDown] = useState(0);

  const [bookmarks, setBookmarks] = useState(() => new Set());
  const [flagged, setFlagged] = useState(() => new Set());
  const [submitted, setSubmitted] = useState(() => new Set());

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctMCQsCount, setCorrectMCQsCount] = useState(0);
  const [wrongMCQsCount, setWrongMCQsCount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  const flagMCQ = () => {
    if (submitted.has(mcqNumber)) return;
    setFlagged(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mcqNumber)) newSet.delete(mcqNumber);
      else newSet.add(mcqNumber);
      return newSet;
    });
  };

  const bookmarkMCQ = async () => {
    setSaveLoading(true);

    const res = await fetch(`${API_URL}/users/bookmarks/${mcqs[mcqNumber - 1]?.mcq_id}`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data.status === 'success') {
      setBookmarks(prev => {
        const newSet = new Set(prev);
        newSet.add(mcqNumber);
        return newSet;
      });
    }
    setSaveLoading(false);
  };

  const submitMCQ = async () => {
    if (submitted.has(mcqNumber)) return;

    if (!selectedOption) return;

    setSubmitLoading(true);

    const currentMcq = mcqs[mcqNumber - 1];
    const res = await fetch(`${API_URL}/${isQuiz ? 'quizzes' : 'tests'}/record-answer`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [isQuiz ? 'quiz_id' : 'test_id']: isQuiz ? exam?.quiz_id : exam?.test_id,
        attempts: [
          {
            id: currentMcq?.mcq_id,
            selected_option: selectedOption,
            correct_option: currentMcq?.correct_option,
          },
        ],
      }),
    });

    const data = await res.json();

    if (data.status === 'success') {
      setSubmitted(prev => {
        const newSet = new Set(prev);
        newSet.add(mcqNumber);
        return newSet;
      });

      if (mcqs[mcqNumber - 1]?.correct_option === mcqs[mcqNumber - 1]?.selected_option)
        setCorrectMCQsCount(prev => prev + 1);
      else setWrongMCQsCount(prev => prev + 1);
    }

    setSubmitLoading(false);
  };

  useEffect(() => {
    setSelectedOption(null);
  }, [mcqNumber]);

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const secs = sixtySecondCountdown >= 60 ? 0 : sixtySecondCountdown;

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const submitExam = async () => {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isExamHappening) {
      const startCountDown = setInterval(() => {
        setSixtySecondCountDown(prev => {
          if (prev === 0) {
            setTimeRemaining(t => t - 1);
            return 59;
          } else {
            return prev - 1;
          }
        });
      }, 1000);

      return () => clearInterval(startCountDown);
    }
  }, []);

  const showSolution =
    !isExamHappening || (exam.answerAfterEach && submitted.has(mcqNumber));

  return (
    <>
      <style>{`
        .font-poppins { font-family: "Poppins", sans-serif; }

        .main-area { min-width: 0; flex: 1; display: flex; flex-direction: column; background: #181A18; color: #fff; font-family: "Inter", sans-serif; -webkit-font-smoothing: antialiased; }
        .topbar { height: 72px; background: #222422; border-bottom: 1px solid #2E302E; }
        .quiz-subbar { height: 76px; background: #222422; border-bottom: 1px solid #2E302E; }
        .quiz-body {min-height: 0; display: flex; overflow: auto; max-height: 365px; flex: 1;}
        .question-pane {
          flex: 1;
          min-width: 0;
          min-height: 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          background: #181A18;
        }
        .question-inner {
          width: 100%;
          margin: 0 auto;
          padding: 26px 24px;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }
        .question-box {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          overflow: auto;
          border: 1px solid #2E302E;
          border-radius: 14px;
          background: #1E201E;
          padding: 20px 22px;
        }
        .question-box:has(.question-box-scroll) {
          flex: 1 1 0%;
          min-height: 0;
          max-height: 100%;
        }
        .question-box-core {
          flex-shrink: 0;
        }
        .question-box-scroll {
          flex: 1 1 0%;
          min-height: 0;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #2E302E;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding-right: 4px;
        }
        .question-box-scroll::-webkit-scrollbar { width: 6px; }
        .question-box-scroll::-webkit-scrollbar-track { background: #181A18; }
        .question-box-scroll::-webkit-scrollbar-thumb { background: #3A3D3A; border-radius: 999px; }
        .desktop-navigator { width: 240px; background: #222422; border-left: 1px solid #2E302E; display: flex; flex-direction: column; }
        .bottom-bar { background: #222422; border-top: 1px solid #2E302E; flex-shrink: 0; }

        .option-card {
          min-height: 74px;
          border: 1px solid #2E302E;
          background: #222422;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 18px 20px;
          width: 100%;
          text-align: left;
          color: #fff;
        }
        .option-card.selected {
          border-color: #FFC600;
          background: rgba(255, 198, 0, 0.12);
          box-shadow: 0 0 0 1px rgba(255, 198, 0, 0.28);
        }
        .option-card.selected .option-key {
          background: #FFC600;
          color: #181A18;
        }
        .option-card:disabled { cursor: not-allowed; opacity: 0.7; }
        .option-key {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #2A2C2A;
          color: #A8ACA8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 12px;
          font-weight: 900;
          flex-shrink: 0;
        }

        .action-chip {
          width: 100%;
          height: 58px;
          border-radius: 14px;
          border: 1px solid #2E302E;
          background: rgba(42, 44, 42, 0.25);
          color: #A8ACA8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .action-chip.submit {
          color: #FFC600;
          background: rgba(255, 198, 0, 0.11);
          border-color: rgba(255, 198, 0, 0.46);
        }
        .action-chip:disabled { cursor: not-allowed; opacity: 0.5; }

        .nav-scroll { flex: 1; overflow-y: auto; padding: 16px 14px; min-height: 0; }
        .nav-scroll::-webkit-scrollbar { width: 6px; }
        .nav-scroll::-webkit-scrollbar-track { background: #181A18; }
        .nav-scroll::-webkit-scrollbar-thumb { background: #FFC600; border-radius: 999px; }
        .question-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }
        .q-chip {
          position: relative;
          height: 38px;
          border-radius: 7px;
          border: 1px solid #2E302E;
          background: #181A18;
          color: #A8ACA8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 12px;
          font-weight: 900;
        }
        .q-chip.answered { background: #FFC600; border-color: #FFC600; color: #181A18; }
        .q-chip.flagged { background: rgba(251, 146, 60, 0.22); border-color: rgba(251, 146, 60, 0.65); color: #FB923C; }
        .q-chip.skipped { background: #2A2C2A; color: #A8ACA8; }
        .q-chip.current { border: 2px solid #FFC600; color: #FFC600; box-shadow: 0 0 0 1px rgba(255, 198, 0, 0.25); }
        .q-chip.flagged::after {
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
        .subject-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          color: #A8ACA8;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }
        .subject-label span:first-child { display: flex; align-items: center; gap: 8px; }
        .subject-dot { width: 7px; height: 7px; border-radius: 999px; display: inline-block; }

        .solution-card {
          margin-top: 0;
          border: 1px solid #2E302E;
          background: #222422;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .solution-label {
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #A8ACA8;
        }
        .solution-value {
          font-size: 15px;
          line-height: 1.6;
          color: #FFFFFF;
          font-weight: 600;
        }
        .solution-value.correct { color: #34D399; }

        @media (max-width: 1023px) {
          .topbar { height: 56px; }
          .quiz-subbar { height: 56px; padding-left: 16px; padding-right: 16px; }
          .question-inner { padding: 20px 16px; }
          .question-box { padding: 14px 16px; border-radius: 12px; }
          .question-box-scroll { margin-top: 14px; padding-top: 12px; }
          .option-card { min-height: 56px; padding: 12px 16px; border-radius: 10px; gap: 14px; background: #111411; }
          .option-key { width: 28px; height: 28px; font-size: 10px; }
          .action-chip { width: auto; flex: 1; height: 38px; border-radius: 10px; font-size: 8px; }
        }

        @media (max-width: 640px) {
            .desktop-navigator { position: fixed; z-index: 5; bottom: 0; left: 0; right: 0; width: 100%; max-height: 200px; overflow-y: auto;}
        }
      `}</style>

      {/* <SubmitExamConfirmation /> */}

      <main ref={examRef} className="main-area fade-in">
        
        <div></div>

        <section className="quiz-subbar flex flex-shrink-0 items-center justify-between px-4 lg:px-7">
          <div>
            <p className="text-sm font-bold leading-tight text-white lg:text-base">Mixed Subjects</p>
            <p className="text-xs text-[#A8ACA8]">{exam.total_mcqs} MCQs</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#2E302E] bg-[#181A18] px-3 py-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A8ACA8" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-mono text-sm font-black text-white">
              {formatTime(timeRemaining, sixtySecondCountdown)}
            </span>
            <span className="text-xs font-black text-[#A8ACA8]">II</span>
          </div>
          <p className="text-sm font-black text-[#A8ACA8]">
            Q <span className="font-poppins text-lg text-white">{mcqNumber}</span> / {exam?.total_mcqs}
          </p>
        </section>

        <div className="quiz-body">
          <section className="question-pane">
            <div className="question-inner">
              <div className="question-box">
                <div className="question-box-core">
                  <p className="mb-9 font-medium leading-relaxed text-white" style={{ fontSize: '21px' }}>
                    Q. {mcqs[mcqNumber - 1]?.question}
                  </p>

                  <div className="space-y-4 mt-2">
                    <button
                      type="button"
                      disabled={!isExamHappening}
                      onClick={() => setSelectedOption('A')}
                      className={`cursor-pointer option-card ${selectedOption === 'A' ? 'selected' : ''}`}
                    >
                      <span className="option-key">A</span>
                      <span className="text-lg font-bold">{mcqs[mcqNumber - 1]?.option_a}</span>
                    </button>
                    <button
                      type="button"
                      disabled={!isExamHappening}
                      onClick={() => setSelectedOption('B')}
                      className={`cursor-pointer option-card ${selectedOption === 'B' ? 'selected' : ''}`}
                    >
                      <span className="option-key">B</span>
                      <span className="text-lg font-bold">{mcqs[mcqNumber - 1]?.option_b}</span>
                    </button>
                    <button
                      type="button"
                      disabled={!isExamHappening}
                      onClick={() => setSelectedOption('C')}
                      className={`cursor-pointer option-card ${selectedOption === 'C' ? 'selected' : ''}`}
                    >
                      <span className="option-key">C</span>
                      <span className="text-lg font-bold">{mcqs[mcqNumber - 1]?.option_c}</span>
                    </button>
                    <button
                      type="button"
                      disabled={!isExamHappening}
                      onClick={() => setSelectedOption('D')}
                      className={`cursor-pointer option-card ${selectedOption === 'D' ? 'selected' : ''}`}
                    >
                      <span className="option-key">D</span>
                      <span className="text-lg font-bold">{mcqs[mcqNumber - 1]?.option_d}</span>
                    </button>
                  </div>

                </div>

                <button
                type="button"
                onClick={submitMCQ}
                disabled={
                    submitLoading || submitted.has(mcqNumber) || !selectedOption || !isExamHappening
                }
                className={`action-chip mt-4 submit cursor-pointer`}
                >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                {submitLoading ? 'Processing....' : `${submitted.has(mcqNumber) ? 'Submitted' : 'Submit MCQ'}`}
                </button>
                {showSolution ? (
                  <div className="mt-4">
                    <div className="solution-card">
                      <div>
                        <p className="solution-label">Correct Answer</p>
                        <p className="solution-value correct">
                          {mcqs[mcqNumber - 1]?.correct_option}
                          {mcqs[mcqNumber - 1]?.[`option_${mcqs[mcqNumber - 1]?.correct_option?.toLowerCase?.()}`]
                            ? ` - ${mcqs[mcqNumber - 1][`option_${mcqs[mcqNumber - 1]?.correct_option.toLowerCase()}`]}`
                            : ''}
                        </p>
                      </div>
                      <div>
                        <p className="solution-label">Explanation</p>
                        <p className="solution-value">
                          {mcqs[mcqNumber - 1]?.explanation || 'No explanation available for this MCQ.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </section>

          <Navigator
            exam={exam}
            setMcqNumber={setMcqNumber}
            flagged={flagged}
            submitted={submitted}
            mcqNumber={mcqNumber}
          />
        </div>

        <footer className="bottom-bar flex-shrink-0">
          <div className="flex items-center justify-center gap-2 px-3 py-3 lg:px-6">
            <button type='button' className="action-chip lg:!hidden cursor-pointer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span className="text-[#FFC600]">
                {mcqNumber}/{exam?.total_mcqs}
              </span>
            </button>
            <button
              type="button"
              onClick={flagMCQ}
              disabled={!isExamHappening}
              className={`action-chip ${!isExamHappening ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {flagged.has(mcqNumber) ? 'Flagged' : 'Flag'}
            </button>
            <button
              type="button"
              onClick={bookmarkMCQ}
              disabled={saveLoading || bookmarks.has(mcqNumber) || !isExamHappening}
              className={`action-chip ${saveLoading || bookmarks.has(mcqNumber) || !isExamHappening ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              {saveLoading ? 'Processing....' : `${bookmarks.has(mcqNumber) ? 'Saved' : 'Save'}`}
            </button>

            <button
              type="button"
              onClick={() => {}}
              disabled={!isExamHappening}
              className={`action-chip submit ${!isExamHappening ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Finish
            </button>
          </div>
          <div className="flex items-center gap-4 border-t border-[#2E302E] px-4 py-3 lg:px-7">
            <button
              type="button"
              onClick={() => setMcqNumber(prev => (prev > 1 ? prev - 1 : prev))}
              className="flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 font-black uppercase tracking-wide text-[#A8ACA8] opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Prev
            </button>
            <div className="min-w-0 flex-1">
              <div className="h-1.5 overflow-hidden rounded-full border border-[#2E302E] bg-[#181A18]">
                <div
                  className="h-full rounded-full bg-[#FFC600]"
                  style={{ width: `${parseInt((submitted.size / exam?.total_mcqs) * 100)}%` }}
                />
              </div>
              <p
                className="mt-2 text-center font-black uppercase tracking-widest text-[#A8ACA8]"
                style={{ fontSize: '10px' }}
              >
                {submitted.size} of {exam?.total_mcqs} answered
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMcqNumber(prev => (prev < exam?.total_mcqs ? prev + 1 : prev))}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#FFC600] px-6 py-3 font-black uppercase tracking-wide text-[#181A18] shadow-lg"
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
  );
};

export default TempScreen;
