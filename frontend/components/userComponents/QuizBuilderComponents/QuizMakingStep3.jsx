import React, { useEffect, useState } from 'react'
import { subjectToColor, formatName } from '../../../utils/HelperObjects';
import TopicSelectButton from './TopicSelectButton';

const QuizMakingStep3 = ({filteredSubjects, filteredChapters, selectedTopics, setSelectedTopics, mcqDistributionPerTopic, topicAccuracy, showAccuracy}) => {
    // console.log(filteredChapters);
    const [subject, setSubject] = useState(Object.keys(filteredSubjects)[0]);
    const [chaptersPerSubject, setChaptersPerSubject] = useState(filteredSubjects[subject]);

    useEffect(() => {
        let tempData = {...filteredSubjects[subject]};
        Object.keys(filteredSubjects[subject]).forEach(chapter => {
            if(!(chapter in filteredChapters)){
                delete tempData[chapter];
            }
        });
        setChaptersPerSubject(tempData);
    }, [subject]);

    return (
        <>
        <section
          className="rounded-2xl border-2 border-[#2D302D] bg-[#181A18]"
        >
            {
                Object.keys(filteredSubjects).map((sub, i) => {
                    
                    return (
                        <button key={i} onClick={() => setSubject(sub)} className={`cursor-pointer px-3 lg:px-4 py-2.5 lg:py-3 text-[11px] lg:text-[13px] font-poppins font-black whitespace-nowrap flex-shrink-0 text-white ${sub === subject ? 'border-b-2 border-[#FFC600]' : ''}`}>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full flex-shrink-0 border border-[#181A18]" style={{backgroundColor: `${subjectToColor[formatName(sub)]}`}}></div>
                                    {formatName(sub)}
                                {/* <span className="text-[9px] lg:text-[10px] font-poppins font-black bg-[#FFC600]/20 text-[#FFC600] rounded-full px-1.5 py-0.5">3</span> */}
                            </div>
                        </button>
                    )
                })
            }
            <div className="flex flex-col gap-5 p-4 lg:p-6">
                {
                    !chaptersPerSubject || Object.keys(chaptersPerSubject).length === 0 ? 

                    <span className='inline-block text-center'>No chapters selected for {formatName(subject)}</span> :

                    Object.keys(chaptersPerSubject).map((chapter, i) => { 
                        return <TopicSelectButton showAccuracy={showAccuracy} topicAccuracy={topicAccuracy} mcqDistributionPerTopic={mcqDistributionPerTopic} key={i} topics={chaptersPerSubject[chapter]} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} chapter={chapter}/>
                    })
                }
            </div>
        </section>
        </>
    )
}

export default QuizMakingStep3