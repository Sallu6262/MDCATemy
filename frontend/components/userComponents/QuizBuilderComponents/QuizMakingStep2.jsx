import React, { useState } from 'react'
import ChapterSelectButton from './ChapterSelectButton';

const QuizMakingStep2 = ({filteredSyllabus, selectedChapters, setSelectedChapters}) => {
    // console.log(filteredSyllabus);
    const subjectToColor = {
        'biology' : '#10B981',
        'chemistry' : '#A78BFA',
        'physics' : '#38BDF8',
        'english' : '#F59E0B',
        'logical_reasoning' : '#F472B6',
    }

    return (
        <>
        <section
          className="overflow-hidden rounded-2xl border-2 border-[#2D302D] bg-[#181A18]"
        >
          <div
            className="border-b border-[#2D302D]/60 px-4 py-3 text-xs text-[#8B8E8B]"
          >
            Your Prep legend visible
          </div>
            <div className="flex flex-col gap-5 p-4 lg:p-6">
                {
                    Object.keys(filteredSyllabus)?.map((subject, i) => {
                        return <ChapterSelectButton key={i} subject={subject} chapters={Object.keys(filteredSyllabus[subject])} setSelectedChapters={setSelectedChapters} selectedChapters={selectedChapters} colorClass={`bg-[${subjectToColor[subject]}]`}/>
                    })
                }
            </div>
        </section>
        </>
    )
}

export default QuizMakingStep2