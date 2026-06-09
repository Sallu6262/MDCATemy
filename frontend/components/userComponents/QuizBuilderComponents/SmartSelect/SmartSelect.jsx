import React, { useState } from 'react'
import '../../../../src/animation.css';
import SmartSelectStep1 from './SmartSelectStep1'
import QuizMakingStep2 from '../QuizMakingStep2';
import QuizMakingStep1 from '../QuizMakingStep1';
import QuizMakingStep3 from '../QuizMakingStep3';
import SmartSelectWeakestTopic from './SmartSelectWeakestTopic';

const SmartSelect = ({subjectAccuracy, chapterAccuracy, topicAccuracy, filterChapterIDs, filterSubjectIDs, quizMakingStep, smartSelectHidden, resetData, setSmartSelectHidden, setQuizMakingStep, setSelectedSubjects, selectedSubjects, filteredSubjects, selectedChapters, setSelectedChapters, moveToNextStepAndFilter, filteredChapters, selectedTopics, setSelectedTopics, mcqDistributionPerTopic}) => {
    //step is starting from zero to sync with quiz making without smart select.
    const [errorMessage, setErrorMessage] = useState("");

    //0 means nothing
    //1 means user selected weakest by subject
    //2 means user selected weakest by chapter
    const [isWeakestChapterOrSubject, setIsWeakestChapterOrSubject] = useState(0);

    const [subjectCache, setSubjectCache] = useState(() => new Set());
    const [chapterCache, setChapterCache] = useState(() => new Set());
    const [topicsCache, setTopicsCache] = useState([]);
    // console.log(selectedSubjects);
    
    return (
        <>
            <div
                type="button"
                aria-label="Close Smart Select"
                className="fade-in cursor-pointer smart-select-overlay fixed inset-0 z-[60] cursor-default bg-black/70 backdrop-blur-sm"
            />

            <div className="animate-up fixed inset-x-0 bottom-0 z-[70] max-h-[90vh] rounded-t-2xl border-t-2 border-[#2D302D] bg-[#181A18] text-white">
                <div className="flex justify-center pt-3">
                    <div className="h-1 w-10 rounded-full bg-[#2D302D]" />
                </div>

                <div className="flex items-center justify-between border-b border-[#2D302D] px-5 py-3">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex text-[#FFC600]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </span>
                        <span className="[font-family:Poppins,sans-serif] text-[15px] font-black">Smart Select</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setSmartSelectHidden(true);
                            resetData(true);
                        }}
                        aria-label="Close"
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-[#0E0F0E]/40 text-[#8B8E8B]"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {
                    quizMakingStep === 0 ? 
                    <SmartSelectStep1 
                        setStep={setQuizMakingStep} 
                        setIsWeakestChapterOrSubject={setIsWeakestChapterOrSubject}
                    /> : ''
                }
                
                {
                    quizMakingStep === 1 ? 
                    <QuizMakingStep1 
                        smartSelectHidden={smartSelectHidden}
                        selectedSubjects={selectedSubjects}
                        setSelectedSubjects={setSelectedSubjects}
                        subjectAccuracy={subjectAccuracy}
                    /> :
                    ''
                }
                {
                    quizMakingStep === 2 ? 
                    <QuizMakingStep2 
                        filteredSubjects={filteredSubjects}
                        selectedChapters={selectedChapters}
                        setSelectedChapters={setSelectedChapters}
                        chapterAccuracy={chapterAccuracy}
                    />
                    : ''
                }
                {
                    quizMakingStep === 3 ?
                    <SmartSelectWeakestTopic 
                        subjectCache={subjectCache}
                        chapterCache={chapterCache}
                        setSubjectCache={setSubjectCache}
                        setChapterCache={setChapterCache}
                        setQuizMakingStep={setQuizMakingStep}
                        selectedTopics={selectedTopics}
                        setSelectedTopics={setSelectedTopics}
                        mcqDistributionPerTopic={mcqDistributionPerTopic}
                        filterChapterIDs={filterChapterIDs}
                        filterSubjectIDs={filterSubjectIDs}
                        topicsCache={topicsCache}
                        setTopicsCache={setTopicsCache}
                    /> : ''
                }

                <div className='w-full flex flex-col items-center justify-center gap-4 pl-4 pr-4 mt-4'>
                    {errorMessage ? <span className='text-red-500 '>{errorMessage}</span> : null}
                    <div className="w-full flex flex-col gap-2 sm:flex-row mb-4 ">
                        {
                            quizMakingStep > 0 && quizMakingStep < 3 ?
                            <button
                                onClick={() => {
                                    setErrorMessage("");
                                    setQuizMakingStep(prev => prev > 0 ? (isWeakestChapterOrSubject === 1 && quizMakingStep === 3 ? prev - 2 : prev - 1) : prev);
                                }}
                                className="inline-block cursor-pointer items-center rounded-xl border-2 border-[#2D302D] px-5 py-3 [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.08em] text-[#8B8E8B]"
                                >Back
                            </button> : ''
                        }

                        {
                            quizMakingStep > 0 && quizMakingStep < 3 ?
                            <button
                                onClick={() => {
                                    //0 means error and do not move
                                    //1 means to move 1 steps
                                    //2 means to move 2 steps
                                    moveToNextStepAndFilter(setErrorMessage, isWeakestChapterOrSubject);
                                }} 
                                className="w-full flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-[#0E0F0E] bg-[#FFC600] px-5 py-3 [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em] text-[#0E0F0E]"
                            >
                                Next
                            </button> : ''
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default SmartSelect
