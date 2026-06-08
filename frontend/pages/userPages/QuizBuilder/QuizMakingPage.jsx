import React, { useEffect, useState } from 'react'
import QuizMakingStep1 from '../../../components/userComponents/QuizBuilderComponents/QuizMakingStep1';
import QuizMakingStep2 from '../../../components/userComponents/QuizBuilderComponents/QuizMakingStep2';
import QuizMakingStep3 from '../../../components/userComponents/QuizBuilderComponents/QuizMakingStep3';
import QuizMakingStep4 from '../../../components/userComponents/QuizBuilderComponents/QuizMakingStep4';
import ExamTakingScreen from '../../../components/userComponents/ExamTakingScreen';
import { useNavigate, useOutletContext } from 'react-router-dom';
import SmartSelect from '../../../components/userComponents/QuizBuilderComponents/SmartSelect/SmartSelect';

const QuizMakingPage = () => {
    const [step, setStep] = useState(1);
    const [selectedSubjects, setSelectedSubjects] = useState(() => new Set());
    const [selectedChapters, setSelectedChapters] = useState(() => new Set());
    const [selectedTopics, setSelectedTopics] = useState(() => new Set());

    const [performance, setPerformance] = useState({});

    const [filteredSubjects, setFilteredSubjects] = useState({});
    const [filteredChapters, setFilteredChapters] = useState({});

    const [syllabus, setSyllabus] = useState([]);
    const [mcqDistributionPerTopic, setMcqDistributionPerTopic] = useState({});
    const [subjectIDs, setSubjectIDs] = useState({});
    const [chapterIDs, setChapterIDs] = useState({});

    const [errorMessage, setErrorMessage] = useState("");
    const [showAccuracy, setShowAccuracy] = useState(true);

    const [smartSelectHidden, setSmartSelectHidden] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;
    const {syllabusAndIDs} = useOutletContext();
    const navigate = useNavigate();

    // console.log(Object.keys(syllabus));
    // console.log(quizInfo)

    useEffect(() => {
        setSyllabus(syllabusAndIDs?.syllabus);
        setSubjectIDs(syllabusAndIDs?.subject_ids);
        setChapterIDs(syllabusAndIDs?.chapter_ids);
    }, [syllabusAndIDs]);

    useEffect(() => {
        const fetchMCQDistributionPerTopic = async () => {
            const res = await fetch(`${API_URL}/mcqs/distribution-per-topic`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            if(data.status === 'success'){
                const tempSet = {};
                data.data.forEach(topic => tempSet[topic.topic_id] = topic.count);
                setMcqDistributionPerTopic(tempSet);
            }
        }

        fetchMCQDistributionPerTopic();
    }, []);

    useEffect(() => {
        const fetchAccuracy = async () => {
            const res = await fetch(`${API_URL}/users/performance`, {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if(data.status === 'success'){
                // console.log(data.data)
                setPerformance(data.data);
            }
        }

        fetchAccuracy();
    }, []);

    const filterSubjectIDs = () => {
        let filtered = new Set();
        Object.keys(subjectIDs).forEach(subject => {
            if(selectedSubjects?.has(subject)) filtered.add(subjectIDs[subject]);
        })
        return filtered;
    }

    const filterChapterIDs = () => {
        let filtered = new Set();
        Object.keys(chapterIDs).forEach(chapter => {
            if(selectedChapters?.has(chapter)) filtered.add(chapterIDs[chapter]);
        })
        // console.log(filtered);
        return filtered;
    }
    // console.log(selectedSubjects);
    // console.log(selectedTopics);

    const moveToNextStepAndFilter = (setErrorMessage, isWeakestChapterOrSubject) => { 
        if(selectedSubjects.size === 0 && step === 1){
            setErrorMessage("Please select atleast 1 subject");
            return 0;
        }
        else if(selectedChapters.size === 0 && step === 2){
            setErrorMessage("Please select atleast 1 chapter");
            return 0;
        } 
        else if(selectedTopics.size === 0 && step === 3){
            setErrorMessage("Please select atleast 1 topic");
            return 0;
        } 
        else {
            setErrorMessage("");
            setStep(prev => {
                //going to step 2
                if(prev === 1){
                    const subjectSet = [];
                    Object.keys(syllabus).forEach(subject => {
                        if(selectedSubjects.has(subject)) subjectSet.push({[subject]: syllabus[subject]});
                    })
                    
                    setFilteredSubjects(Object.assign({}, ...subjectSet));
                    
                    Object.keys(syllabus).forEach(subject => {
                        if(!(selectedSubjects.has(subject))){
                            Object.keys(syllabus[subject]).forEach(chapter => {
                                selectedChapters.delete(chapter);
                            })
                        }
                    })

                    // console.log(selectedSubjects);
                } 

                //going to step 3
                else if(prev === 2){
                    const chapterSet = [];
                    // console.log(Object.keys(filteredSubjects).length);
                    Object.keys(filteredSubjects).forEach(subject => {
                        Object.keys(filteredSubjects[subject]).forEach(chapter => {
                            if(selectedChapters.has(chapter)) chapterSet.push({[chapter]: filteredSubjects[subject][chapter]});
                        })
                    })
                    setFilteredChapters(Object.assign({}, ...chapterSet));

                    Object.keys(filteredSubjects).forEach(subject => {
                        Object.keys(filteredSubjects[subject]).forEach(chapter => {
                            // console.log(filteredChapters)
                            if(!(selectedChapters.has(chapter)) && (chapter in filteredChapters)){
                                filteredChapters[chapter].forEach(topic => {
                                    selectedTopics.delete(topic.id);
                                })
                            }
                        })
                    })
                }

                // console.log(smartSelectHidden, prev, isWeakestChapterOrSubject);

                if(!smartSelectHidden && prev === 1){
                    if(isWeakestChapterOrSubject === 1) return prev + 2;
                    else if(isWeakestChapterOrSubject === 2) return prev + 1;
                }

                return prev < 5 ? prev + 1 : prev
            });
        }
        // console.log(step);
        if(!smartSelectHidden && isWeakestChapterOrSubject === 1 && step === 1) return 2;
        return 1;
    }

    const resetData = (smartSelectHidden) => {
        setStep(smartSelectHidden ? 1 : 0);
        setFilteredSubjects({});
        setFilteredChapters({});
        setSelectedSubjects(() => new Set());
        setSelectedChapters(() => new Set());
        setSelectedTopics(() => new Set());
    }

    return (
        <>
            {
                !smartSelectHidden ? 
                <SmartSelect 
                    quizMakingStep={step}
                    smartSelectHidden={smartSelectHidden}
                    setSmartSelectHidden={setSmartSelectHidden}
                    setQuizMakingStep={setStep}
                    filteredSubjects={filteredSubjects}
                    selectedChapters={selectedChapters}
                    setSelectedChapters={setSelectedChapters}
                    selectedSubjects={selectedSubjects}
                    setSelectedSubjects={setSelectedSubjects}
                    moveToNextStepAndFilter={moveToNextStepAndFilter}
                    resetData={resetData}
                    filteredChapters={filteredChapters}
                    selectedTopics={selectedTopics}
                    setSelectedTopics={setSelectedTopics}
                    mcqDistributionPerTopic={mcqDistributionPerTopic}
                    filterChapterIDs={filterChapterIDs}
                    filterSubjectIDs={filterSubjectIDs}
                    subjectAccuracy={performance?.subjects}
                    chapterAccuracy={performance?.chapters}
                    topicAccuracy={performance?.topics}
                />
                : ''
            }

            <main className="flex min-h-0 flex-1 flex-col overflow-hidden text-white [font-family:Inter,sans-serif] antialiased">
                <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
                    <header className="mb-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#FFC600]/25 bg-[#FFC600]/10">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-[#FFC600]"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    </div>
                    <div>
                        <h1 className="[font-family:Poppins,sans-serif] text-xl font-black">Quiz Builder</h1>
                        <p className="text-sm text-[#8B8E8B]">Pick subjects, chapters and settings - then generate.</p>
                    </div>
                    </header>

                    <div className="mx-auto flex max-w-3xl flex-col gap-4">
                        <div className="grid grid-cols-4 items-start gap-1 sm:flex sm:items-center sm:gap-2">
                            <div className="flex flex-1 items-center gap-2">
                                <div className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0E0F0E] [font-family:Poppins,sans-serif] text-sm font-black ${step >= 1 ? 'text-[#0E0F0E] shadow-[2px_2px_0px_rgba(0,0,0,0.5)] bg-[#FFC600]' : 'text-[#8B8E8B] bg-[#0E0F0E]'} sm:mx-0`}>1</div>
                                <span className={`hidden [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em] sm:inline ${step >= 1 ? '' : 'text-[#8B8E8B]'}`}>Subjects</span>
                                <span className={`mt-1 block w-full text-center [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.06em] sm:hidden ${step >= 1 ? '' : 'text-[#8B8E8B]'}`}>Subj</span>
                                <div className="hidden h-[2px] flex-1 bg-[#2D302D] sm:block"></div>
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                                <div className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2D302D] [font-family:Poppins,sans-serif] text-sm font-black ${step >= 2 ? 'text-[#0E0F0E] shadow-[2px_2px_0px_rgba(0,0,0,0.5)] bg-[#FFC600]' : 'text-[#8B8E8B] bg-[#0E0F0E]'} sm:mx-0`}>2</div>
                                <span className={`hidden [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em] sm:inline ${step >= 2 ? '' : 'text-[#8B8E8B]'} `}>Chapters</span>
                                <span className={`mt-1 block w-full text-center [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.06em] sm:hidden ${step >= 2 ? '' : 'text-[#8B8E8B]'}`}>Chap</span>
                                <div className="hidden h-[2px] flex-1 bg-[#2D302D] sm:block"></div>
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                                <div className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2D302D] [font-family:Poppins,sans-serif] text-sm font-black ${step >= 3 ? 'text-[#0E0F0E] shadow-[2px_2px_0px_rgba(0,0,0,0.5)] bg-[#FFC600]' : 'text-[#8B8E8B] bg-[#0E0F0E]'} sm:mx-0`}>3</div>
                                <span className={`hidden [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em] sm:inline ${step >= 3 ? '' : 'text-[#8B8E8B]'} `}>Topics</span>
                                <span className={`mt-1 block w-full text-center [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.06em] sm:hidden ${step >= 3 ? '' : 'text-[#8B8E8B]'}`}>Topic</span>
                                <div className="hidden h-[2px] flex-1 bg-[#2D302D] sm:block"></div>
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                                <div className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2D302D] [font-family:Poppins,sans-serif] text-sm font-black ${step >= 4 ? 'text-[#0E0F0E] shadow-[2px_2px_0px_rgba(0,0,0,0.5)] bg-[#FFC600]' : 'text-[#8B8E8B] bg-[#0E0F0E]'} sm:mx-0`}>4</div>
                                <span className={`hidden [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em] sm:inline ${step >= 4 ? '' : 'text-[#8B8E8B]'} `}>Settings</span>
                                <span className={`mt-1 block w-full text-center [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.06em] sm:hidden ${step >= 4 ? '' : 'text-[#8B8E8B]'}`}>Set</span>
                            </div>
                        </div>

                        {
                            step < 4 ? 
                            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2 px-1">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-[#FFC600]"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                <span className="text-sm font-semibold text-[#8B8E8B]/70">Show accuracy</span>
                                <button onClick={() => setShowAccuracy(prev => !prev)} className={`cursor-pointer relative h-5 w-9 rounded-full ${showAccuracy ? 'bg-[#FFC600]' : 'bg-gray-800'}`}><span className={`absolute ${showAccuracy ? 'left-[18px]' : 'left-[0px]'} top-[3px] h-3.5 w-3.5 rounded-full bg-white`}></span></button>
                                </div>

                                <button type='button' 
                                    onClick={() => {
                                        setSmartSelectHidden(false);
                                        resetData(false);
                                    }} 
                                    className="cursor-pointer inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#2D302D] bg-[#0E0F0E]/30 px-3 py-1.5 [font-family:Poppins,sans-serif] text-xs font-black uppercase tracking-[0.06em] text-[#8B8E8B] transition hover:border-[#FFC600]/60 hover:bg-[#FFC600]/5 hover:text-white sm:w-auto">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-[#FFC600]"><path d="M12 3l1.9 5.6L19.5 10l-4.6 2.4L13 18l-1-5.6L7.5 10l5.6-1.4L12 3z"/></svg>
                                        Smart Select  
                                    <span className="rounded-full bg-[#FFC600]/20 px-1.5 py-0.5 text-[10px] text-[#FFC600]">NEW</span>
                                </button>
                            </div> : ''
                        }

                        {step === 1 || !smartSelectHidden ? <QuizMakingStep1 subjectAccuracy={performance?.subjects} showAccuracy={showAccuracy} smartSelectHidden={smartSelectHidden} selectedSubjects={selectedSubjects} setSelectedSubjects={setSelectedSubjects}/> : ''}
                        {step === 2 && smartSelectHidden ? <QuizMakingStep2 chapterAccuracy={performance?.chapters} filteredSubjects={filteredSubjects} selectedChapters={selectedChapters} setSelectedChapters={setSelectedChapters}/> : ''}
                        {step === 3 && smartSelectHidden ? <QuizMakingStep3 topicAccuracy={performance?.topics} filteredChapters={filteredChapters} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} mcqDistributionPerTopic={mcqDistributionPerTopic}/> : ''}
                        {step === 4 && smartSelectHidden ? <QuizMakingStep4 selectedTopics={selectedTopics} mcqDistributionPerTopic={mcqDistributionPerTopic} setStep={setStep} selectedSubjects={filterSubjectIDs()}/> : ''}

                        {
                            step < 5 ?
                            <div className='w-full flex flex-col items-center justify-center gap-4'>
                                {errorMessage ? <span className='text-red-500'>{errorMessage}</span> : null}
                                <div className="w-full flex flex-col gap-2 sm:flex-row">
                                    {
                                        step > 1 ?
                                        <button
                                            onClick={() => {setErrorMessage(""); setStep(prev => prev > 1 ? prev - 1 : prev)}}
                                            className="inline-block cursor-pointer items-center rounded-xl border-2 border-[#2D302D] px-5 py-3 [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.08em] text-[#8B8E8B]"
                                            >Back
                                        </button> : ''
                                    }
                                
                                    {
                                        step < 4 ? 
                                        <button
                                            onClick={() => moveToNextStepAndFilter(setErrorMessage)}
                                            className="w-full flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-[#0E0F0E] bg-[#FFC600] px-5 py-3 [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em] text-[#0E0F0E]"
                                            >Next
                                        </button> : ''
                                    }
                                </div>
                            </div> : ''
                        }
                    </div>
                </div>
                </div>
            </main> 
        </>
    )
}

export default QuizMakingPage