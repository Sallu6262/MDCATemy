import React from 'react'
import TopicCard from './TopicCard'

const ChapterCard = ({chapter, chapterNo, topics, setSelectedTopics, selectedTopics}) => {
    // console.log(selectedTopics);
    return (
        <details className="chapter-disclosure rounded-xl">
            <summary className="cursor-pointer px-2 py-3 text-left transition hover:bg-white/[0.03] sm:px-3">
            <div className="flex items-start gap-2">
                <span className="chapter-chevron mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-xs text-white/50 transition-transform">▸</span>
                <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Chapter {chapterNo}</p>
                <p className="text-sm font-medium text-white/90">{chapter}</p>
                </div>
            </div>
            </summary>
            <ul className="space-y-2 border-l border-white/[0.06] pb-4 pl-8 pr-2 pt-1 sm:pl-10">
                {
                    topics?.map(topic => {
                        return  <li key={topic.id} className="flex items-start gap-3">
                                    <TopicCard topicID={topic.id} topic={topic.name} isSelected={selectedTopics?.has(topic.id)} setSelectedTopics={setSelectedTopics}/>
                                </li>
                    }) 
                }
            </ul>
        </details>
    )
}

export default React.memo(ChapterCard)