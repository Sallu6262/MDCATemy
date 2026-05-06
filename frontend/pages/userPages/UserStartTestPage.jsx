import React, { useEffect, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import '../../src/animation.css';
import ExamTakingScreen from '../../components/userComponents/ExamTakingScreen';

const TestModeButton = ({icon, name, desc, isSelected, modes, setTestMode}) => {
  return (
    <button onClick={() => setTestMode(modes[name])} className={`cursor-pointer flex flex-col items-center gap-2 p-4 rounded-xl border ${isSelected ? 'bg-[#FFC600]/10 border-[#FFC600]/40' : 'bg-[#222422] border-[#2E302E] hover:border-[#A8ACA8]/30'} transition-all duration-200`}>
      <span className="text-2xl">{icon}</span>
      <div className="text-center">
        <p className="font-[Inter] font-bold text-[12px] text-[#A8ACA8]">{name}</p>
        <p className="font-[Inter] text-[12px] text-[#A8ACA8]/60 mt-0.5 leading-tight">{desc}</p>
      </div>
    </button>
  )
}

const UserStartTestPage = () => {
  const {testID} = useParams();
  const {upcomingTests} = useOutletContext();
  const API_URL = import.meta.env.VITE_API_URL;

  const [testToBegin, setTestToBegin] = useState(null);
  const [testMode, setTestMode] = useState(0);
  const [blindMode, setBlindMode] = useState(false);
  const [condition, setCondition] = useState(false);
  const [totalActualMcqs, setTotalActualMcqs] = useState(0);

  const [testStarted, setTestStarted] = useState(false);

  const modes = {
    'Silent' : 0,
    'Exam Hall' : 1,
    'Focus Rain' : 2,
    'Full Chaos' : 3
  }

  const numberToModes = {
    0 : 'Silent',
    1 : 'Exam Hall',
    2 : 'Focus Rain',
    3 : 'Full Chaos',
  }

  const calculateWidth = (subjectCount) => {
    const numerator = subjectCount ?? 0;
    const denominator = totalActualMcqs || 1;
    return parseInt((numerator / denominator) * 100);
  }

  useEffect(() => {
    const fetchTestInfo = async () => {
      const res = await fetch(`${API_URL}/tests/live/${testID}`, {
        method: "GET",
        credentials: 'include'
      });

      const data = await res.json();

      if(data.status === 'success'){
        setTestToBegin(data.data);
        setTotalActualMcqs((data.data.biology ?? 0) +
          (data.data.physics ?? 0) +
          (data.data.chemistry ?? 0) +
          (data.data.english ?? 0) +
          (data.data.logical_reasoning ?? 0));
        }
    }

    fetchTestInfo();
  }, []);

  return (
    <>
    {
      !testStarted ? 
      <main className="fade-in flex-1 overflow-hidden pb-[58px] lg:pb-0">
        <div className="h-full overflow-y-auto">

          <div className="relative overflow-hidden border-b border-[#2E302E]">
            
            <div className="absolute inset-0 pointer-events-none"
                  style={{ opacity: 0.025, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,#FFC600 39px,#FFC600 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#FFC600 39px,#FFC600 40px)' }}>
            </div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ width: 600, height: 300, opacity: 0.1, background: 'radial-gradient(ellipse at top, #FFC600, transparent 70%)' }}>
            </div>

            <div className="relative max-w-3xl mx-auto px-4 pt-6 pb-10 text-center">
              
              <div className="flex items-center justify-between mb-6">
                <Link to="/dashboard/test-series" className="inline-flex items-center gap-1.5 text-[#A8ACA8] text-[14px] font-[Inter] hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Test Series
                </Link>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-[Inter] font-black uppercase tracking-[0.14em] text-[#FFC600] bg-[#FFC600]/10 border border-[#FFC600]/30 rounded-full px-3 py-1">
                  
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
                    <line x1="13" y1="19" x2="19" y2="13"/>
                    <line x1="16" y1="16" x2="20" y2="20"/>
                    <line x1="19" y1="21" x2="21" y2="19"/>
                  </svg>
                  Full PMDC Mock
                </span>
              </div>

              
              <div className="inline-flex items-center gap-2 bg-[#FFC600]/10 border border-[#FFC600]/25 rounded-full px-4 py-1.5 mb-5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                  <path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>
                </svg>
                <span className="text-[#FFC600] text-[13px] font-[Inter] font-black uppercase tracking-[0.18em]">
                  PMDC Pattern · All Subjects
                </span>
              </div>

              
              <h1 className="font-[Poppins] font-black text-white mb-3"
                  style={{ fontSize: 'clamp(2rem, 5.5vw, 3.6rem)', lineHeight: 1 }}>
                {testToBegin?.test_name}
                <br/>
                {/* <span className="text-[#FFC600]">Mock</span> */}
              </h1>

              
              <p className="text-[#A8ACA8] font-[Inter] text-[14px] max-w-md mx-auto leading-relaxed mb-7">
                {testToBegin?.total_mcqs} MCQs. {testToBegin?.test_time} minutes. Built by MDCATEMY mentors. Official PMDC pattern — treat it like the real exam.
              </p>

              
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-[13px] font-[Inter] font-bold px-3 py-1 rounded-full border"
                      style={{ color: '#FFC600', borderColor: '#FFC60040', background: '#FFC60012' }}>{testToBegin?.total_mcqs} MCQs</span>
                <span className="text-[13px] font-[Inter] font-bold px-3 py-1 rounded-full border"
                      style={{ color: '#FFC600', borderColor: '#FFC60040', background: '#FFC60012' }}>{testToBegin?.test_time} Minutes</span>
                <span className="text-[13px] font-[Inter] font-bold px-3 py-1 rounded-full border"
                      style={{ color: '#10B981', borderColor: '#10B98140', background: '#10B98112' }}>Full PMDC Mock</span>
                <span className="text-[13px] font-[Inter] font-bold px-3 py-1 rounded-full border"
                      style={{ color: '#10B981', borderColor: '#10B98140', background: '#10B98112' }}>Expert-Made</span>
                <span className="text-[13px] font-[Inter] font-bold px-3 py-1 rounded-full border"
                      style={{ color: '#FB923C', borderColor: '#FB923C40', background: '#FB923C12' }}>Real Pressure</span>
              </div>
            </div>
          </div>

          
          <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">

            
            <div>
              <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.18em] text-[#A8ACA8] mb-3">
                📋 PMDC Subject Distribution
              </p>

              
              <div className="grid grid-cols-5 gap-2 mb-3">
                <div className="bg-[#222422] border rounded-xl p-3 text-center"
                      style={{ borderColor: '#10B98135' }}>
                  <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: '#10B981' }}></div>
                  <p className="font-[Poppins] font-black text-xl text-white">{testToBegin?.biology ?? 0}</p>
                  <p className="text-[13px] font-[Inter] text-[#A8ACA8] mt-0.5">Bio</p>
                </div>
                <div className="bg-[#222422] border rounded-xl p-3 text-center"
                      style={{ borderColor: '#F59E0B35' }}>
                  <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: '#F59E0B' }}></div>
                  <p className="font-[Poppins] font-black text-xl text-white">{testToBegin?.chemistry ?? 0}</p>
                  <p className="text-[13px] font-[Inter] text-[#A8ACA8] mt-0.5">Chem</p>
                </div>
                <div className="bg-[#222422] border rounded-xl p-3 text-center"
                      style={{ borderColor: '#38BDF835' }}>
                  <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: '#38BDF8' }}></div>
                  <p className="font-[Poppins] font-black text-xl text-white">{testToBegin?.physics ?? 0}</p>
                  <p className="text-[13px] font-[Inter] text-[#A8ACA8] mt-0.5">Phys</p>
                </div>
                <div className="bg-[#222422] border rounded-xl p-3 text-center"
                      style={{ borderColor: '#A78BFA35' }}>
                  <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: '#A78BFA' }}></div>
                  <p className="font-[Poppins] font-black text-xl text-white">{testToBegin?.english ?? 0}</p>
                  <p className="text-[13px] font-[Inter] text-[#A8ACA8] mt-0.5">Eng</p>
                </div>
                <div className="bg-[#222422] border rounded-xl p-3 text-center"
                      style={{ borderColor: '#F472B635' }}>
                  <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: '#F472B6' }}></div>
                  <p className="font-[Poppins] font-black text-xl text-white">{testToBegin?.logical_reasoning ?? 0}</p>
                  <p className="text-[13px] font-[Inter] text-[#A8ACA8] mt-0.5">LR</p>
                </div>
              </div>

              
              <div className="flex h-2.5 rounded-full overflow-hidden">
                <div style={{ width: `${calculateWidth(testToBegin?.biology)}%`, backgroundColor: '#10B981' }}></div>
                <div style={{ width: `${calculateWidth(testToBegin?.chemistry)}%`, backgroundColor: '#F59E0B' }}></div>
                <div style={{ width: `${calculateWidth(testToBegin?.physics)}%`, backgroundColor: '#38BDF8' }}></div>
                <div style={{ width: `${calculateWidth(testToBegin?.english)}%`, backgroundColor: '#A78BFA' }}></div>
                <div style={{ width: `${calculateWidth(testToBegin?.logical_reasoning)}%`, backgroundColor: '#F472B6' }}></div>
              </div>

              
              <div className="flex justify-between mt-1.5">
                <span className="text-[13px] font-[Inter] text-[#A8ACA8]">{calculateWidth(testToBegin?.biology)}%</span>
                <span className="text-[13px] font-[Inter] text-[#A8ACA8]">{calculateWidth(testToBegin?.chemistry)}%</span>
                <span className="text-[13px] font-[Inter] text-[#A8ACA8]">{calculateWidth(testToBegin?.physics)}%</span>
                <span className="text-[13px] font-[Inter] text-[#A8ACA8]">{calculateWidth(testToBegin?.english)}%</span>
                <span className="text-[13px] font-[Inter] text-[#A8ACA8]">{calculateWidth(testToBegin?.logical_reasoning)}%</span>
              </div>
            </div>

            
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.18em] text-[#A8ACA8]">
                  ⚔️ Rules of Engagement
                </p>
                <span className="text-[13px] font-[Inter] font-black uppercase tracking-[0.14em] text-[#FFC600] bg-[#FFC600]/10 border border-[#FFC600]/25 rounded-full px-2.5 py-0.5">
                  MDCAT Simulation
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">

                <div className="flex items-start gap-3 bg-[#222422] border border-[#2E302E] rounded-xl px-4 py-3.5">
                  <span className="text-[18px] flex-shrink-0 mt-0.5">⏱️</span>
                  <div>
                    <p className="font-[Inter] font-bold text-white text-[13px]">No Pausing</p>
                    <p className="font-[Inter] text-[#A8ACA8] text-[13px] leading-relaxed mt-0.5">
                      150 minutes. Clock runs the moment you begin. Just like the real MDCAT — no exceptions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#222422] border border-[#2E302E] rounded-xl px-4 py-3.5">
                  <span className="text-[18px] flex-shrink-0 mt-0.5">📵</span>
                  <div>
                    <p className="font-[Inter] font-bold text-white text-[13px]">Tab Monitoring</p>
                    <p className="font-[Inter] text-[#A8ACA8] text-[13px] leading-relaxed mt-0.5">
                      Every tab switch is logged. Three strikes triggers a final warning displayed on screen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#222422] border border-[#2E302E] rounded-xl px-4 py-3.5">
                  <span className="text-[18px] flex-shrink-0 mt-0.5">🚫</span>
                  <div>
                    <p className="font-[Inter] font-bold text-white text-[13px]">Answers Hidden</p>
                    <p className="font-[Inter] text-[#A8ACA8] text-[13px] leading-relaxed mt-0.5">
                      No explanations during the exam. Right and wrong are revealed only after you submit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#222422] border border-[#2E302E] rounded-xl px-4 py-3.5">
                  <span className="text-[18px] flex-shrink-0 mt-0.5">🚩</span>
                  <div>
                    <p className="font-[Inter] font-bold text-white text-[13px]">Flag &amp; Return</p>
                    <p className="font-[Inter] text-[#A8ACA8] text-[13px] leading-relaxed mt-0.5">
                      Mark uncertain questions with a flag. Revisit them any time before final submission.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#222422] border border-[#2E302E] rounded-xl px-4 py-3.5">
                  <span className="text-[18px] flex-shrink-0 mt-0.5">⚡</span>
                  <div>
                    <p className="font-[Inter] font-bold text-white text-[13px]">Auto-Submit</p>
                    <p className="font-[Inter] text-[#A8ACA8] text-[13px] leading-relaxed mt-0.5">
                      When the timer hits zero, your paper is submitted automatically — answer every question.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#222422] border border-[#2E302E] rounded-xl px-4 py-3.5">
                  <span className="text-[18px] flex-shrink-0 mt-0.5">📊</span>
                  <div>
                    <p className="font-[Inter] font-bold text-white text-[13px]">Full Analytics</p>
                    <p className="font-[Inter] text-[#A8ACA8] text-[13px] leading-relaxed mt-0.5">
                      After submission: section scores, time-per-question, percentile estimate, and improvement areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div>
              <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.18em] text-[#A8ACA8] mb-3">
                🎧 Battlefield Conditions
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                <TestModeButton icon={'🔇'} name={'Silent'} desc={'Pure focus, no distractions'} isSelected={testMode === 0} modes={modes} setTestMode={setTestMode}/>
                <TestModeButton icon={'🏛️'} name={'Exam Hall'} desc={'Chairs, rustling, writing sounds'} isSelected={testMode === 1} modes={modes} setTestMode={setTestMode}/>
                <TestModeButton icon={'🌧️'} name={'Focus Rain'} desc={'Soft white noise for concentration'} isSelected={testMode === 2} modes={modes} setTestMode={setTestMode}/>
                <TestModeButton icon={'🔊'} name={'Full Chaos'} desc={'Announcements, coughing, phones ringing'} isSelected={testMode === 3} modes={modes} setTestMode={setTestMode}/>

              </div>
            </div>

            
            <div>
              <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.18em] text-[#A8ACA8] mb-3">
                🧠 Warrior Extras
              </p>
              <button className="w-full flex items-start gap-4 bg-[#222422] border border-[#2E302E] hover:border-[#A8ACA8]/30 rounded-xl px-5 py-4 text-left transition-all duration-200">
                <input type="checkbox" checked={blindMode} onChange={e => setBlindMode(e.target.checked)} className="cursor-pointer accent-black w-5 h-5 rounded border border-[#A8ACA8]/40 flex-shrink-0 flex items-center justify-center mt-0.5"/>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-[Inter] font-bold text-white text-[13px]">Blind Mode</p>
                    <span className="text-[13px] font-[Inter] font-black uppercase tracking-[0.12em] text-[#FFC600] bg-[#FFC600]/10 border border-[#FFC600]/20 rounded-full px-2 py-0.5">
                      Advanced
                    </span>
                  </div>
                  <p className="font-[Inter] text-[#A8ACA8] text-[12px] leading-relaxed mt-1">
                    Hides your question number and overall progress during the exam. Fight anxiety. Conquer each question independently — exactly as top students approach the real exam hall.
                  </p>
                </div>
              </button>
            </div>

            
            <div>
              <button className="w-full flex items-start gap-4 rounded-xl px-5 py-4 text-left border-l-4 border-l-[#2E302E] bg-[#222422] border border-[#2E302E] transition-all duration-200">
              <input type="checkbox" checked={condition} onChange={e => setCondition(e.target.checked)} className="cursor-pointer accent-black w-5 h-5 rounded border border-[#A8ACA8]/40 flex-shrink-0 flex items-center justify-center mt-0.5"/>
                <p className="font-[Inter] text-[13px] leading-relaxed text-white/80">
                  I understand this is a full timed simulation. The clock runs continuously without pause. I will treat this as my real MDCAT.
                  <span className="text-[#FFC600] font-bold">I am ready to be a Warrior.</span>
                </p>
              </button>
            </div>

            
            <div className="text-center pb-6">
              <button onClick={() => setTestStarted(true)} disabled={!condition} className={`${condition ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-25'} inline-flex items-center gap-3 px-8 py-4 rounded-xl text-black text-[13px] font-[Inter] font-black uppercase tracking-[0.1em] shadow-lg shadow-[#FFC600]/30`}
                      style={{ background: 'linear-gradient(135deg, #FFE27A 0%, #FFC600 45%, #E5B200 100%)' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
                  <line x1="13" y1="19" x2="19" y2="13"/>
                  <line x1="16" y1="16" x2="20" y2="20"/>
                  <line x1="19" y1="21" x2="21" y2="19"/>
                </svg>
                Enter the Arena
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
              <p className="text-[#A8ACA8]/50 text-[13px] font-[Inter] mt-3">
                {testToBegin?.total_mcqs} MCQs · {testToBegin?.test_time} minutes · No pausing once started
              </p>
            </div>

          </div>
        </div>
      </main> :
      <ExamTakingScreen isQuiz={false} 
        exam={{
          test_name: testToBegin?.test_name,
          total_mcqs: testToBegin?.total_mcqs,
          test_time: testToBegin?.test_time,
          mcqs: testToBegin?.mcqs,
          biology: testToBegin?.biology ?? 0,
          chemistry: testToBegin?.chemistry ?? 0,
          physics: testToBegin?.physics ?? 0,
          english: testToBegin?.english ?? 0,
          logical_reasoning: testToBegin?.logical_reasoning ?? 0,
          test_mode: numberToModes[testMode],
          blind_mode: blindMode,
          test_id: testID
        }}
        isExamHappening={true}
      />
    }
    </>
  )
}

export default UserStartTestPage

