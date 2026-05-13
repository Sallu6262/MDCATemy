import React, { useEffect, useRef, useState } from 'react'
import MCQPdf from '../MCQpdf';
import { pdf } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

const TestReviewCard = ({test, setTestReviewHidden, attempted}) => {
  // console.log(test);
  const reviewRef = useRef(null);

  const navigate = useNavigate();

  const sum = test?.correct + test?.mistakes;

  const testDate = new Date(test?.test_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); 

  const [result, setResult] = useState({});

  const showResult = (percentage) => {
    if(percentage > 75) setResult({percentage, color: '#10B981', remark: 'Excellent Work'});
    else if(percentage > 50) setResult({percentage, color: 'yellow', remark: 'Adequate Understanding Of Concepts.'});
    else setResult({percentage, color: 'red', remark: 'Need Improvement.'});
  }

  const downloadTestAsPDF = async () => {
    const blob = await pdf(<MCQPdf test={test} mcqs={test?.mcqs}/>).toBlob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${test?.test_name}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  }

  const reviewPreviousTestMCQs = () => {
    localStorage.setItem("previous-test-mcqs", JSON.stringify({
      test_name: test.test_name,
      total_mcqs: test.total_mcqs,
      test_time: test.test_time,
      mcqs: test.mcqs,
      biology: test.biology ?? 0,
      chemistry: test.chemistry ?? 0,
      physics: test.physics ?? 0,
      english: test.english ?? 0,
      logical_reasoning: test.logical_reasoning ?? 0,
      test_mode: "Silent",
      blind_mode: 0,
      test_id: test?.test_id,
      answerAfterEach: false
    }));

    navigate(`${test?.test_id}`);
  }
  
  useEffect(() => {
    reviewRef?.current?.focus();
    showResult(parseInt((test?.correct / (sum ? sum : 1)) * 100));
  },[]);

    return (
      <>
        {/* <div id='pdf-root' className="fixed -left-[10000px] top-0 w-[794px] min-h-[1123px] bg-white">
        {
          <DownloadPDFComponent test={test}/>
        }
        </div> */}


        <section tabIndex={-1} ref={reviewRef} onClick={() => setTestReviewHidden(true)} className="absolute inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-[calc(100%-24px)] max-w-[980px] max-h-[88vh] bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2E302E] px-5 py-3">
              <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.14em] text-[#FFC600]">Test Review</p>
              <button onClick={() => setTestReviewHidden(true)} type="button" className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-[#A8ACA8] hover:text-white hover:bg-[#2A2C2A]/30 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="h-full overflow-y-auto">
            <div className="px-4 pt-4 pb-6 max-w-lg mx-auto lg:max-w-2xl space-y-4">
              <div>
                <h1 className="font-[Poppins] font-black text-white text-[22px] leading-tight mt-0.5">
                  {test?.test_name}
                </h1>
                <p className="text-[#A8ACA8] text-[11px] font-[Inter] mt-1 flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                  </svg>
                  {testDate}
                </p>
              </div>

              <div className="bg-[#222422] border border-[#2E302E] rounded-2xl p-4">
                <div className="flex items-center gap-4 mb-4">
                  {
                    attempted ?
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="#2A2C2A" strokeWidth="6"/>
                        <circle cx="40" cy="40" r="36" fill="none"
                                stroke={`${result.color}`} strokeWidth="6" strokeLinecap="round"
                                strokeDasharray="176.43 226.19"/>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-[Poppins] font-black text-white text-[20px] leading-none">{result.percentage}%</span>
                        <span className="text-[#A8ACA8] text-[9px] font-[Inter] mt-0.5">{test?.correct}/{test?.mcq_count}</span>
                      </div>
                    </div> : 
                    <div className="w-20 h-14 rounded-xl bg-red-500/10 border border-red-500/30 flex flex-col items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/>
                          <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      <span className="text-[10px] font-[Inter] font-black text-red-400 mt-0.5 uppercase tracking-[0.08em]">Missed</span>
                    </div>
                  }

                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-[Inter] font-black uppercase tracking-[0.12em] text-[#A8ACA8] mb-0.5">
                      Your Performance
                    </p>
                    <p className="font-[Poppins] font-black text-white text-[15px] leading-tight">
                      {attempted ? result.remark : 'You Missed This Test'}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] font-[Inter] text-[#A8ACA8] mt-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                      </svg>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-[#181A18]/60 border border-emerald-500/20 bg-emerald-500/5 rounded-lg py-2 text-center">
                    <p className="font-[Poppins] font-black text-[15px] leading-none text-emerald-400">{test?.correct}</p>
                    <p className="text-[#A8ACA8] text-[9px] font-[Inter] mt-1 uppercase tracking-[0.08em]">Correct</p>
                  </div>
                  <div className="bg-[#181A18]/60 border border-red-500/20 bg-red-500/5 rounded-lg py-2 text-center">
                    <p className="font-[Poppins] font-black text-[15px] leading-none text-red-400">{test?.mistakes}</p>
                    <p className="text-[#A8ACA8] text-[9px] font-[Inter] mt-1 uppercase tracking-[0.08em]">Wrong</p>
                  </div>
                  <div className="bg-[#181A18]/60 border border-[#2E302E] rounded-lg py-2 text-center">
                    <p className="font-[Poppins] font-black text-[15px] leading-none text-[#A8ACA8]">{test?.skipped}</p>
                    <p className="text-[#A8ACA8] text-[9px] font-[Inter] mt-1 uppercase tracking-[0.08em]">Skipped</p>
                  </div>
                  <div className="bg-[#181A18]/60 border border-sky-500/20 bg-sky-500/5 rounded-lg py-2 text-center">
                    <p className="font-[Poppins] font-black text-[15px] leading-none text-sky-400">142m</p>
                    <p className="text-[#A8ACA8] text-[9px] font-[Inter] mt-1 uppercase tracking-[0.08em]">Time</p>
                  </div>
                </div>
              </div>

              <button onClick={() => downloadTestAsPDF()} className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-[#FFC600]/10 border border-[#FFC600]/35 rounded-xl text-[#FFC600] text-[12px] font-[Inter] font-black uppercase tracking-[0.08em] hover:bg-[#FFC600]/15 active:scale-[0.98] transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Test as PDF
              </button>

              <button onClick={reviewPreviousTestMCQs} className="cursor-pointer w-full flex items-center justify-between gap-3 px-4 py-4 rounded-xl bg-[#FFC600] text-[#181A18] border-2 border-[#181A18] shadow-[3px_3px_0px_rgba(0,0,0,0.55)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.55)] active:scale-[0.98] transition-all duration-150">
                <div className="flex items-center gap-3 min-w-0 text-left">
                  <div className="w-10 h-10 bg-[#181A18] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 17 9 11l4 4 8-8"/>
                      <polyline points="14 7 21 7 21 14"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-[Poppins] font-black text-[14px] uppercase tracking-[0.08em] leading-none">Review MCQs</p>
                    <p className="font-[Inter] font-bold text-[10.5px] text-[#181A18]/75 mt-1">
                      Walk through every question with answers &amp; explanations
                    </p>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>

              <p className="text-center text-[#A8ACA8] text-[10px] font-[Inter]">
                All {test.mcq_count} questions with your answers and full explanations open on the next screen.
              </p>

            </div>
          </div>
          </div>
        </section>
      </>
    )
}

export default TestReviewCard