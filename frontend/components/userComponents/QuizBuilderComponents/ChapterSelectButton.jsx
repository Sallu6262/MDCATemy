import React from 'react'
import { useState, useEffect } from 'react';

//could have directly sent filteredSyllabus[subject] which are chapters for that subject (did this in TopicSelectButton so better)
const ChapterSelectButton = ({chapters, subject, colorClass, setSelectedChapters, selectedChapters}) => {
    const [selectAll, setSelectAll] = useState(chapters.every(chapter => selectedChapters.has(chapter)));

    useEffect(() => {
        setSelectAll(chapters.every(chapter => selectedChapters.has(chapter)));
    }, [selectedChapters, chapters]);

    return (
        <>
            <div className="mb-2 flex items-center justify-between">
              {/* <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full border-2 border-[#0E0F0E] ${colorClass}`}></span>
                <p
                  className="[font-family:Poppins,sans-serif] text-sm font-black uppercase tracking-[0.1em]"
                >
                  {subject}
                </p>
              </div> */}
              <div></div>
              <button onClick={() => {
                    const newValue = !selectAll;
                    setSelectAll(newValue);

                    setSelectedChapters(prev => {
                        const chapterSet = new Set(prev);

                        if (newValue) {
                            chapters.forEach(c => chapterSet.add(c));
                        } else {
                            chapters.forEach(c => chapterSet.delete(c));
                        }

                        return new Set(chapterSet);
                    });
              }} className="cursor-pointer [font-family:Poppins,sans-serif] text-sm font-black text-[#FFC600]">
                {selectAll ? 'De-select All' : 'Select all'}
              </button>
            </div>
            <div className="grid gap-2 lg:grid-cols-2">
                {
                    chapters.map((chapter, i) => {
                        const isSelected = selectedChapters.has(chapter);
                        return <button key={i} onClick={() => {
                                    setSelectedChapters(prev => {
                                        const newSet = new Set(prev);
                                        newSet.has(chapter) ? newSet.delete(chapter) : newSet.add(chapter);
                                        return newSet;
                                    })
                                }} className={`cursor-pointer flex w-full items-center gap-3 rounded-xl border-2 ${isSelected ? 'border-[#FFC600] bg-[#FFC600]/10 text-white' : 'text-[#8B8E8B] hover:border-[#FFC600]/50'} px-4 py-3 text-left`}>
                                    <span className="flex-1 [font-family:Poppins,sans-serif] text-sm font-black">{chapter.split('_').map(c => c[0].toUpperCase() + c.slice(1)).join(' ')}</span>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 [font-family:Poppins,sans-serif] text-xs font-black text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>76%</span>
                                </button>
                    })
                }
            </div>
        </>
    )
}

export default React.memo(ChapterSelectButton);