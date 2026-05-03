import React, { useEffect, useRef, useState } from 'react'
import '../../src/animation.css';

//0 for flagged
//1 for unanswered
//2 for submitted

const ExamTakingScreen = ({isQuiz, exam}) => {
    const examRef = useRef(null);
    // console.log(exam);
    const [mcqs, setMcqs] = useState(exam?.mcqs);
    const [mcqNumber, setMcqNumber] = useState(1);
    const [mcqStatuses, setMcqStatuses] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(exam?.test_time);
    const [sixtySecondCountdown, setSixtySecondCountDown] = useState(0);

    const [mcqStatus, setMcqStatus] = useState(1);

    console.log(mcqStatuses);

    const [saveLoading, setSaveLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setSelectedOption(null);
    }, [mcqNumber]);

    const flagMCQ = () => {
        if(mcqStatuses[mcqNumber] === 2) return;
        setMcqStatus(0);
    }

    const bookmarkMCQ = async () => {
        if(mcqStatuses[mcqNumber] === 2) return;
    }

    const submitMCQ = async () => {
        if(mcqStatuses[mcqNumber] === 2) return;
        setMcqStatus(2);
    }

    const moveToNextMcq = () => {
        setMcqStatuses(prev => ({...prev, [mcqNumber]: mcqStatus}));
        setMcqNumber(prev => prev < exam?.total_mcqs ? prev + 1 : prev);
    }

    const formatTime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const secs = sixtySecondCountdown >= 60 ? 0 : sixtySecondCountdown;

        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});

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
          appearance: none;
          font: inherit;
          color: inherit;
          margin: 0;
        }
        .ets-option-card.ets-option-selected {
          border-color: #FFC600;
          background: rgba(255, 198, 0, 0.12);
          box-shadow: 0 0 0 1px rgba(255, 198, 0, 0.28);
        }
        .ets-option-card.ets-option-selected .ets-option-key {
          background: #FFC600;
          color: #181A18;
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
          .ets-option-card.ets-option-selected { background: rgba(255, 198, 0, 0.14); }
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
                Q. {mcqs[mcqNumber-1].question}
              </p>

              <div className="flex min-h-0 flex-shrink-0 flex-col gap-3 lg:gap-4">
                <button
                  type="button"
                  className={`ets-option-card w-full cursor-pointer text-left transition-[border-color,background,box-shadow] duration-150 ${selectedOption === 'A' ? 'ets-option-selected' : ''}`}
                  onClick={() => setSelectedOption('A')}
                >
                  <span className="ets-option-key">A</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber-1].option_a}</span>
                </button>
                <button
                  type="button"
                  className={`ets-option-card w-full cursor-pointer text-left transition-[border-color,background,box-shadow] duration-150 ${selectedOption === 'B' ? 'ets-option-selected' : ''}`}
                  onClick={() => setSelectedOption('B')}
                >
                  <span className="ets-option-key">B</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber-1].option_b}</span>
                </button>
                <button
                  type="button"
                  className={`ets-option-card w-full cursor-pointer text-left transition-[border-color,background,box-shadow] duration-150 ${selectedOption === 'C' ? 'ets-option-selected' : ''}`}
                  onClick={() => setSelectedOption('C')}
                >
                  <span className="ets-option-key">C</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber-1].option_c}</span>
                </button>
                <button
                  type="button"
                  className={`ets-option-card w-full cursor-pointer text-left transition-[border-color,background,box-shadow] duration-150 ${selectedOption === 'D' ? 'ets-option-selected' : ''}`}
                  onClick={() => setSelectedOption('D')}
                >
                  <span className="ets-option-key">D</span>
                  <span className="text-lg font-bold">{mcqs[mcqNumber-1].option_d}</span>
                </button>
              </div>
            </div>
          </section>

          <aside className="hidden min-h-0 w-[240px] min-w-[240px] shrink-0 flex-col border-l border-[#2E302E] bg-[#222422] lg:flex lg:min-h-0">
            <div className="flex-shrink-0 border-b border-[#2E302E] px-4 py-3 lg:px-5 lg:py-4">
              <p className="text-sm font-black uppercase tracking-widest text-white [font-family:Poppins,sans-serif] lg:text-base">Questions</p>
              <p className="mt-1 text-sm text-[#A8ACA8] lg:text-base">
                <span className="text-[#FFC600]">30</span>/100 answered
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
                <section>
                  <div className="mb-2.5 flex min-w-0 items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#A8ACA8] lg:text-sm">
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#A78BFA]" />
                      Physics
                    </span>
                    <span className="shrink-0">30 MCQs</span>
                  </div>
                  <div className="grid min-w-0 grid-cols-5 gap-1.5 sm:gap-2">
                    <span className="ets-q-chip ets-answered">1</span>
                    <span className="ets-q-chip ets-answered">2</span>
                    <span className="ets-q-chip">3</span>
                    <span className="ets-q-chip ets-answered">4</span>
                    <span className="ets-q-chip ets-flagged">5</span>
                    <span className="ets-q-chip">6</span>
                    <span className="ets-q-chip ets-answered">7</span>
                    <span className="ets-q-chip">8</span>
                    <span className="ets-q-chip ets-skipped">9</span>
                    <span className="ets-q-chip ets-answered">10</span>
                    <span className="ets-q-chip">11</span>
                    <span className="ets-q-chip ets-flagged">12</span>
                    <span className="ets-q-chip ets-answered">13</span>
                    <span className="ets-q-chip">14</span>
                    <span className="ets-q-chip">15</span>
                    <span className="ets-q-chip ets-answered">16</span>
                    <span className="ets-q-chip">17</span>
                    <span className="ets-q-chip ets-flagged">18</span>
                    <span className="ets-q-chip ets-answered">19</span>
                    <span className="ets-q-chip">20</span>
                    <span className="ets-q-chip">21</span>
                    <span className="ets-q-chip ets-answered">22</span>
                    <span className="ets-q-chip ets-flagged">23</span>
                    <span className="ets-q-chip">24</span>
                    <span className="ets-q-chip ets-answered">25</span>
                    <span className="ets-q-chip">26</span>
                    <span className="ets-q-chip">27</span>
                    <span className="ets-q-chip ets-answered">28</span>
                    <span className="ets-q-chip ets-skipped">29</span>
                    <span className="ets-q-chip">30</span>
                  </div>
                </section>
                <section>
                  <div className="mb-2.5 flex min-w-0 items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#A8ACA8] lg:text-sm">
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#10B981]" />
                      Biology
                    </span>
                    <span className="shrink-0">10 MCQs</span>
                  </div>
                  <div className="grid min-w-0 grid-cols-5 gap-1.5 sm:gap-2">
                    <span className="ets-q-chip ets-current">31</span>
                    <span className="ets-q-chip">32</span>
                    <span className="ets-q-chip ets-flagged">33</span>
                    <span className="ets-q-chip ets-answered">34</span>
                    <span className="ets-q-chip">35</span>
                    <span className="ets-q-chip">36</span>
                    <span className="ets-q-chip ets-answered">37</span>
                    <span className="ets-q-chip ets-flagged">38</span>
                    <span className="ets-q-chip ets-skipped">39</span>
                    <span className="ets-q-chip">40</span>
                  </div>
                </section>
                <section>
                  <div className="mb-2.5 flex min-w-0 items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#A8ACA8] lg:text-sm">
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#38BDF8]" />
                      Chemistry
                    </span>
                    <span className="shrink-0">20 MCQs</span>
                  </div>
                  <div className="grid min-w-0 grid-cols-5 gap-1.5 sm:gap-2">
                    <span className="ets-q-chip ets-answered">41</span>
                    <span className="ets-q-chip">42</span>
                    <span className="ets-q-chip ets-answered">43</span>
                    <span className="ets-q-chip ets-flagged">44</span>
                    <span className="ets-q-chip">45</span>
                    <span className="ets-q-chip ets-skipped">46</span>
                    <span className="ets-q-chip ets-answered">47</span>
                    <span className="ets-q-chip">48</span>
                    <span className="ets-q-chip">49</span>
                    <span className="ets-q-chip ets-answered">50</span>
                    <span className="ets-q-chip ets-flagged">51</span>
                    <span className="ets-q-chip">52</span>
                    <span className="ets-q-chip ets-answered">53</span>
                    <span className="ets-q-chip">54</span>
                    <span className="ets-q-chip">55</span>
                    <span className="ets-q-chip ets-answered">56</span>
                    <span className="ets-q-chip ets-flagged">57</span>
                    <span className="ets-q-chip">58</span>
                    <span className="ets-q-chip ets-answered">59</span>
                    <span className="ets-q-chip">60</span>
                  </div>
                </section>
                <section>
                  <div className="mb-2.5 flex min-w-0 items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#A8ACA8] lg:text-sm">
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#2DD4BF]" />
                      English
                    </span>
                    <span className="shrink-0">20 MCQs</span>
                  </div>
                  <div className="grid min-w-0 grid-cols-5 gap-1.5 sm:gap-2">
                    <span className="ets-q-chip ets-answered">61</span>
                    <span className="ets-q-chip ets-answered">62</span>
                    <span className="ets-q-chip">63</span>
                    <span className="ets-q-chip">64</span>
                    <span className="ets-q-chip ets-flagged">65</span>
                    <span className="ets-q-chip">66</span>
                    <span className="ets-q-chip ets-skipped">67</span>
                    <span className="ets-q-chip ets-answered">68</span>
                    <span className="ets-q-chip">69</span>
                    <span className="ets-q-chip ets-answered">70</span>
                    <span className="ets-q-chip">71</span>
                    <span className="ets-q-chip ets-flagged">72</span>
                    <span className="ets-q-chip ets-answered">73</span>
                    <span className="ets-q-chip">74</span>
                    <span className="ets-q-chip">75</span>
                    <span className="ets-q-chip ets-answered">76</span>
                    <span className="ets-q-chip">77</span>
                    <span className="ets-q-chip ets-flagged">78</span>
                    <span className="ets-q-chip">79</span>
                    <span className="ets-q-chip ets-answered">80</span>
                  </div>
                </section>
                <section>
                  <div className="mb-2.5 flex min-w-0 items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#A8ACA8] lg:text-sm">
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#FB923C]" />
                      Logical
                    </span>
                    <span className="shrink-0">20 MCQs</span>
                  </div>
                  <div className="grid min-w-0 grid-cols-5 gap-1.5 sm:gap-2">
                    <span className="ets-q-chip ets-answered">81</span>
                    <span className="ets-q-chip">82</span>
                    <span className="ets-q-chip ets-flagged">83</span>
                    <span className="ets-q-chip ets-answered">84</span>
                    <span className="ets-q-chip">85</span>
                    <span className="ets-q-chip">86</span>
                    <span className="ets-q-chip ets-answered">87</span>
                    <span className="ets-q-chip ets-skipped">88</span>
                    <span className="ets-q-chip">89</span>
                    <span className="ets-q-chip ets-flagged">90</span>
                    <span className="ets-q-chip ets-answered">91</span>
                    <span className="ets-q-chip">92</span>
                    <span className="ets-q-chip">93</span>
                    <span className="ets-q-chip ets-answered">94</span>
                    <span className="ets-q-chip ets-flagged">95</span>
                    <span className="ets-q-chip">96</span>
                    <span className="ets-q-chip ets-answered">97</span>
                    <span className="ets-q-chip">98</span>
                    <span className="ets-q-chip">99</span>
                    <span className="ets-q-chip ets-answered">100</span>
                  </div>
                </section>
              </div>
            </div>
          </aside>
        </div>

        <footer className="flex-shrink-0 border-t border-[#2E302E] bg-[#222422]">
          <div className="flex flex-wrap items-stretch justify-center gap-2 px-3 py-3 sm:flex-nowrap sm:items-center lg:px-6">
            <div className="ets-action-chip lg:hidden">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span className="text-[#FFC600]">{mcqNumber}/100</span>
            </div>
            <button onClick={flagMCQ} className="cursor-pointer ets-action-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              Flag
            </button>
            <button onClick={bookmarkMCQ} className="cursor-pointer ets-action-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              Save
            </button>
            <button onClick={submitMCQ} className="cursor-pointer ets-action-chip ets-submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Submit
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
                <div className="h-full rounded-full bg-[#FFC600]" style={{ width: '31%' }} />
              </div>
              <p className="mt-1.5 truncate text-center text-[10px] font-black uppercase tracking-widest text-[#A8ACA8] sm:mt-2 sm:text-xs lg:text-sm">
                30 of 100 answered
              </p>
            </div>
            <button
              type="button"
              onClick={moveToNextMcq}
              className="cursor-pointer flex shrink-0 items-center gap-1.5 rounded-xl bg-[#FFC600] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#181A18] shadow-lg sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
            >
              Next
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
