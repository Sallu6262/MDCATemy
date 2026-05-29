import React, { useState } from 'react'
import CustomMixTestPopUp from './CustomMixTestPopUp';

const DifficultySelectButton = ({difficulty, difficultyToSet, isSelected, setDifficulty, setHidden, setDifficultyRatio}) => {
    return (
        <button
            onClick={() => {
                setDifficulty(difficultyToSet);
                if(difficultyToSet === 0){
                    setDifficultyRatio({easy: 100, medium: 0, hard: 0});
                } else if(difficultyToSet === 1){
                    setDifficultyRatio({easy: 0, medium: 100, hard: 0});
                } else if(difficultyToSet === 2){
                    setDifficultyRatio({easy: 0, medium: 0, hard: 100});
                } else if(difficultyToSet === 3){
                    setDifficultyRatio({easy: 33, medium: 34, hard: 33});
                } 
                else if(difficultyToSet === 4) setHidden(false);
            }}
            className={`cursor-pointer rounded-lg border border-[#2D302D] px-4 py-2 text-sm ${isSelected ? 'bg-[#FFC600] font-semibold text-[#0E0F0E]' : 'text-[#8B8E8B]'}`}
            >
            {difficulty}
        </button>
    )
}

const QuizMakingStep4 = ({mcqDistributionPerTopic, selectedTopics, setQuizInfo, setStep, selectedSubjects}) => {
    const [showTimer, setShowTimer] = useState(false);
    const [totalMcqs, setTotalMcqs] = useState([...selectedTopics].reduce((acc, topic) => acc + mcqDistributionPerTopic[topic], 0));
    const [maxMcqs, setMaxMcqs] = useState([...selectedTopics].reduce((acc, topic) => acc + mcqDistributionPerTopic[topic], 0));
    const [difficulty, setDifficulty] = useState(3);
    const [answerAfterEach, setAnswerAfterEach] = useState(true);
    const [difficultyRatio, setDifficultyRatio] = useState({eas: 33, medium: 34, hard: 33});
    const [time, setTime] = useState(30);

    const [hidden, setHidden] = useState(true);

    // console.log(selectedSubjects);

    const numberToDifficulty = {
        0 : 'Easy',
        1 : 'Medium',
        2 : 'Hard',
        3 : 'MDCAT Mix',
        4 : 'Custom',
    }

    const API_URL = import.meta.env.VITE_API_URL;

    const createQuiz = async () => {
        const info = {
            timer: showTimer,
            total_mcqs: totalMcqs,
            difficulty: numberToDifficulty[difficulty],
            answerAfterEach,
            difficultyRatio,
            test_time: time ?? 0
        };

        const res = await fetch(`${API_URL}/quizzes/create`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quiz_name: `new quiz ${Date.now()}`,
                quiz_mode: answerAfterEach ? 'TUTOR' : 'EXAM',
                mcq_count: totalMcqs,
                subject_ids: [...selectedSubjects],
            })
        });

        const data = await res.json();

        if(data.status === 'success'){
            setQuizInfo(info);
            setStep(5);
        }
    }

    return (
        <>
        {difficulty === 4 && !hidden? <CustomMixTestPopUp setDifficulty={setDifficulty} setDifficultyRatio={setDifficultyRatio} setHidden={setHidden}/> : ''}
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl space-y-4 lg:max-w-4xl">
                <section
                className="rounded-2xl border-2 border-[#2D302D] bg-[#181A18] p-4 lg:p-6"
                >
                <p
                    className="mb-5 [font-family:Poppins,sans-serif] text-[13px] font-black uppercase tracking-[0.14em] text-[#FFC600]"
                >
                    Test Settings
                </p>
                <div className="space-y-6">
                    <div>
                    <label
                        className="mb-3 block text-xs font-black uppercase tracking-[0.12em] text-[#8B8E8B]"
                        >Number of MCQs</label
                    >
                    <div className="flex items-center gap-2">
                        <button
                        onClick={() => setTotalMcqs(prev => prev > 1 ? prev - 1 : prev)}
                        className="cursor-pointer h-10 w-10 rounded-xl border-2 border-[#2D302D] bg-[#0E0F0E]/30 text-xl text-[#8B8E8B]"
                        >
                        -</button
                        ><span
                        className="h-10 flex justify-center items-center flex-1 rounded-xl border-2 border-[#2D302D] bg-[#0E0F0E] text-center [font-family:Poppins,sans-serif] text-xl font-black text-[#FFC600]"
                        >{totalMcqs}</span>
                        <button
                        onClick={() => setTotalMcqs(prev => prev < maxMcqs ? prev +  1 : prev)}
                        className="cursor-pointer h-10 w-10 rounded-xl border-2 border-[#2D302D] bg-[#0E0F0E]/30 text-xl text-[#8B8E8B]"
                        >
                        +
                        </button>
                    </div>
                    </div>
                    <div>
                    <label
                        className="mb-3 block text-xs font-black uppercase tracking-[0.12em] text-[#8B8E8B]"
                        >Difficulty Level</label
                    >
                    <div className="flex flex-wrap gap-2">
                        <DifficultySelectButton difficulty={"Easy"} difficultyToSet={0} isSelected={difficulty === 0} setDifficulty={setDifficulty} setHidden={setHidden} setDifficultyRatio={setDifficultyRatio}/>
                        <DifficultySelectButton difficulty={"Medium"} difficultyToSet={1} isSelected={difficulty === 1} setDifficulty={setDifficulty} setHidden={setHidden} setDifficultyRatio={setDifficultyRatio}/>
                        <DifficultySelectButton difficulty={"Hard"} difficultyToSet={2} isSelected={difficulty === 2} setDifficulty={setDifficulty} setHidden={setHidden} setDifficultyRatio={setDifficultyRatio}/>
                        <DifficultySelectButton difficulty={"MDCAT Mix"} difficultyToSet={3} isSelected={difficulty === 3} setDifficulty={setDifficulty} setHidden={setHidden} setDifficultyRatio={setDifficultyRatio}/>
                        <DifficultySelectButton difficulty={"Custom"} difficultyToSet={4} isSelected={difficulty === 4} setDifficulty={setDifficulty} setHidden={setHidden} setDifficultyRatio={setDifficultyRatio}/>
                    </div>
                    </div>
                    <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label
                        className="text-xs font-black uppercase tracking-[0.12em] text-[#8B8E8B]"
                        >Timer</label
                        >
                        <button onClick={() => setShowTimer(prev => !prev)} className={`cursor-pointer relative h-5 w-9 rounded-full ${showTimer ? 'bg-[#FFC600]' : 'bg-gray-800'}`}><span className={`absolute ${showTimer ? 'left-[18px]' : 'left-[0px]'} top-[3px] h-3.5 w-3.5 rounded-full bg-white`}></span></button>
                    </div>
                    
                    {
                        showTimer ? 
                        <div className="overflow-hidden">
                            <div className="flex items-center gap-2 mt-1">
                                <input type="number" min="5" max="180" value={time} onChange={e => setTime(e.target.value)}
                                    className="w-16 h-9 bg-[#181A18] border border-[#2E302E] rounded-lg px-3 text-white font-inter text-sm text-center focus:outline-none focus:border-[#FFC600]" />
                                <span className="text-[#A8ACA8] text-[12px] font-inter">minutes</span>
                            </div>
                        </div> : ''
                    }

                    </div>
                    <div>
                    <label
                        className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-[#8B8E8B]"
                        >Show Answer</label
                    >
                    <div
                        className="flex overflow-hidden rounded-lg border border-[#2D302D]"
                    >
                        <button onClick={() => setAnswerAfterEach(true)} className={`cursor-pointer flex-1 py-2 text-sm font-bold ${answerAfterEach ? 'bg-[#FFC600] font-semibold text-[#0E0F0E]' : 'text-[#8B8E8B]'}`}>
                        After each</button
                        ><button
                        onClick={() => setAnswerAfterEach(false)}
                        className={`cursor-pointer flex-1 py-2 text-sm ${!answerAfterEach ? 'bg-[#FFC600] font-semibold text-[#0E0F0E]' : 'text-[#8B8E8B]'}`}
                        >
                        At the end
                        </button>
                    </div>
                    <button
                        onClick={() => createQuiz()}
                        className="mt-4 w-full flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-[#0E0F0E] bg-[#FFC600] px-5 py-3 [font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em] text-[#0E0F0E]"
                        >Submit Settings
                    </button>
                    </div>
                </div>
                </section>
                <div className="flex gap-2">
                </div>
            </div>
        </div>
        </>
    )
}

export default QuizMakingStep4