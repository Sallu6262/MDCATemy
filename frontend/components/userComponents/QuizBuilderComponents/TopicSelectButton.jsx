import React, { useEffect, useState } from 'react'
import { accuracyToTextColor } from '../../../utils/HelperObjects';

const TopicSelectButton = ({topics, selectedTopics, setSelectedTopics, chapter, mcqDistributionPerTopic, topicAccuracy}) => {
    const [selectAll, setSelectAll] = useState(topics.every(topic => selectedTopics.has(topic.id)));

    useEffect(() => {
        setSelectAll(topics.every(topic => selectedTopics.has(topic.id)));
    }, [selectedTopics]);

    return (
        <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-black">{chapter.split('_').map(c => c[0].toUpperCase() + c.slice(1)).join(' ')}</p>
            <button onClick={() => {
                const newValue = !selectAll;
                setSelectAll(newValue);

                setSelectedTopics(prev => {
                    const newSet = new Set(prev);

                    if(newValue){
                        topics.forEach(topic => newSet.add(topic.id));
                    } else {
                        topics.forEach(topic => newSet.delete(topic.id));
                    }

                    return newSet;
                });
            }} className="cursor-pointer text-sm font-black text-[#FFC600]">
                {selectAll ? 'De-select All' : 'Select All'}
            </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {
                topics.map((topic, i) => {
                    const isSelected = selectedTopics.has(topic.id);
                    return <button key={i} onClick={() => {
                        setSelectedTopics(prev => {
                            const newSet = new Set(prev);

                            isSelected ? newSet.delete(topic.id) : newSet.add(topic.id);

                            return newSet;
                        });
                    }} className={`cursor-pointer flex w-full items-center gap-3 rounded-xl border-2 ${isSelected ? 'border-[#FFC600] bg-[#FFC600]/10 text-white' : 'text-[#8B8E8B] hover:border-[#FFC600]/50'} px-4 py-3 text-left`}>
                        <span className="flex-1 text-sm font-black">{topic.name}</span>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-black ${accuracyToTextColor(topicAccuracy?.[topic.name?.replaceAll(' ','_').toLowerCase()])}`}>● {topicAccuracy?.[topic.name?.replaceAll(' ','_').toLowerCase()] ?? 0}%</span>
                        <span className="inline-flex items-center gap-1 rounded-full border  pr-2 py-0.5 text-xs font-black text-gray-200"><span className="h-1.5 w-1.5 rounded-full"></span>{mcqDistributionPerTopic[topic.id]}</span>
                    </button>
                })
            }
            </div>
        </div>
    )
}

export default React.memo(TopicSelectButton)