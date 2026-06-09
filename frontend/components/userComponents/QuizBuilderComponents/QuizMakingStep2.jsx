import React, { useState } from 'react'
import ChapterSelectButton from './ChapterSelectButton';
import { formatName, subjectToColor } from '../../../utils/HelperObjects';

const QuizMakingStep2 = ({filteredSubjects, selectedChapters, setSelectedChapters, chapterAccuracy}) => {
    // console.log(filteredSubjects);
    const [subject, setSubject] = useState(Object.keys(filteredSubjects)[0]);
    // console.log(selectedChapters);

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
            <div className="flex border-b-2 border-[#2E302E] overflow-x-auto">
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

                {/* <button className="px-3 lg:px-4 py-2.5 lg:py-3 text-[11px] lg:text-[13px] font-poppins font-black whitespace-nowrap flex-shrink-0 border-b-2 border-transparent text-[#A8ACA8] hover:text-white">
                    <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full flex-shrink-0 border border-[#181A18]" style="background-color:#A78BFA;"></div>
                    Physics
                    </div>
                </button> */}
            </div>
            <div className="flex flex-col gap-5 p-4 lg:p-6">
                {
                    <ChapterSelectButton chapterAccuracy={chapterAccuracy} subject={subject} chapters={Object.keys(filteredSubjects[subject])} setSelectedChapters={setSelectedChapters} selectedChapters={selectedChapters} colorClassName={`bg-[${subjectToColor[subject]}]`}/>
                }
            </div>
        </section>
        </>
    )
}

export default QuizMakingStep2