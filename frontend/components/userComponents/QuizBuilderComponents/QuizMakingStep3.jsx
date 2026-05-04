import React, { useState } from 'react'
import TopicSelectButton from './TopicSelectButton';

const QuizMakingStep3 = ({filteredChapters, selectedTopics, setSelectedTopics, mcqDistributionPerTopic}) => {
    // console.log(filteredChapters);

    return (
        <>
        <section
          className="rounded-2xl border-2 border-[#2D302D] bg-[#181A18] p-4 lg:p-6"
        >
            {
                Object.keys(filteredChapters).map((chapter, i) => {
                    return <TopicSelectButton mcqDistributionPerTopic={mcqDistributionPerTopic} key={i} topics={filteredChapters[chapter]} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} chapter={chapter}/>
                })
            }
        </section>
        </>
    )
}

export default QuizMakingStep3