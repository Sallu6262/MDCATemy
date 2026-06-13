import React, { useEffect, useState } from 'react'
import { accuracyToTextColor } from '../../../../utils/HelperObjects';

const TopicSkeleton = () => {
    return (
        <div className="rounded-3xl bg-white/5 p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 w-full rounded-xl bg-white/10"></div>
            ))}
      </div>
    )
}

const SmartSelectWeakestTopic = ({setExamCreatedFromSmartSelect, setSmartSelectHidden, subjectIDsCache, chapterIDsCache, setSubjectIDsCache, setChapterIDsCache, weakTopics, setWeakTopics, isWeakestChapterOrSubject, filterChapterIDs, filterSubjectIDs, setQuizMakingStep, setSelectedTopics, mcqDistributionPerTopic}) => {
    const [numberOfWeakestTopics, setNumberOfWeakestTopics] = useState(5);
    const [numberChoice, setNumberChoice] = useState("5");
    const [limitChanged, setLimitChanged] = useState(false);

    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchWeakestTopics = async (subjectIDs, chapterIDs) => {
        const res = await fetch(`${API_URL}/users/weakest-topics`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                limit: numberOfWeakestTopics,
                subject_ids: isWeakestChapterOrSubject === 1 ? [...subjectIDs] : null,
                chapter_ids: isWeakestChapterOrSubject === 2 ? [...chapterIDs] : null
            })
        });

        console.log('db call');

        if(res.ok){            
            const data = await res.json();

            return data.status === 'success' ? data.data : [];
        }

        return [];
    }

    useEffect(() => {
        const ApplyCacheAndFetchTopics = async () => {
            const subjectIDs = filterSubjectIDs();
            const chapterIDs = filterChapterIDs();
            
            if(!limitChanged){
                const checkSubjectCache = subjectIDsCache.size > 0 && [...subjectIDs].every(id => subjectIDsCache.has(id));
                const checkChapterCache = chapterIDsCache.size > 0 && [...chapterIDs].every(id => chapterIDsCache.has(id));
                
                if(isWeakestChapterOrSubject === 1 && checkSubjectCache) return;
                if(isWeakestChapterOrSubject === 2 && checkChapterCache) return;
            }

            setLoading(true);
            const data = await fetchWeakestTopics(subjectIDs, chapterIDs);
                
            setLimitChanged(false);
            setLoading(false);
            setChapterIDsCache(chapterIDs);
            setSubjectIDsCache(subjectIDs);
            setWeakTopics(data);
        }
        
        ApplyCacheAndFetchTopics();
    }, [limitChanged]);
    
    // console.log(limitChanged);
    // console.log(subjectIDsCache, chapterIDsCache);

    return (
        <>
            <div className="flex items-center justify-between border-b border-[#2D302D] px-5 py-3">
                <button onClick={() => {
                    setQuizMakingStep(0);
                    setChapterIDsCache(new Set());
                    setSubjectIDsCache(new Set());
                }} className="cursor-pointer flex items-center gap-2" type='button'>
                    <div
                        aria-label="Back"
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-[#0E0F0E]/40 text-[#8B8E8B]"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </div>
                    <span className="[font-family:Poppins,sans-serif] text-[15px] font-black text-white">
                        Top N Weakest Topics
                    </span>
                </button>
            </div>

            <div className="space-y-5 p-5">
                <div>
                    <p className="mb-2 [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.12em] text-[#8B8E8B]">
                        How many weakest topics?
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        {["3", "5", "10", "Custom"].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => {
                                    setNumberChoice(num);
                                    if (num !== "Custom"){
                                        setNumberOfWeakestTopics(+num);
                                        setLimitChanged(true);
                                    }
                                }}
                                className={`cursor-pointer rounded-lg border px-4 py-2 [font-family:Poppins,sans-serif] text-[13px] font-black ${
                                    numberChoice === num
                                        ? 'border-[#FFC600] bg-[#FFC600] text-[#0E0F0E]'
                                        : 'border-[#2D302D] text-[#8B8E8B]'
                                }`}
                            >
                                {num}
                            </button>
                        ))}
                        {numberChoice === "Custom" ? (
                            <input
                                type="number"
                                min={1}
                                max={15}
                                step={1}
                                value={numberOfWeakestTopics}
                                onChange={e => {
                                    setNumberOfWeakestTopics(Math.min(+e.target.value, 15));
                                    setLimitChanged(true);
                                }}
                                className="h-9 w-16 rounded-lg border border-[#2D302D] bg-[#181A18] px-3 text-center [font-family:Poppins,sans-serif] text-sm font-black text-white focus:border-[#FFC600] focus:outline-none"
                                aria-label="Custom number of weakest topics"
                            />
                        ) : null}
                    </div>
                </div>

                <div>
                    <p className="mb-2 [font-family:Poppins,sans-serif] text-[10px] font-black uppercase tracking-[0.12em] text-[#8B8E8B]">
                        Preview — {numberOfWeakestTopics} topics
                    </p>
                    <div className="max-h-[36vh] space-y-1.5 overflow-y-auto pr-1">
                        {
                            loading ? 
                            <TopicSkeleton /> :
                            weakTopics?.map((topic, i) => {
                                return (
                                    <div key={i} className="cursor-pointer flex items-center gap-3 rounded-xl border border-[#2D302D] bg-[#0E0F0E]/40 px-3.5 py-2.5">
                                        <span className="w-5 text-right [font-family:Poppins,sans-serif] text-[10px] font-black text-[#8B8E8B]/40">{i+1}</span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate [font-family:Poppins,sans-serif] text-[12px] font-black text-white">{topic.topic_name}</p>
                                            <p className="truncate text-[10px] text-[#8B8E8B]/60">{topic.subject_name} · {topic.chapter_name}</p>
                                        </div>
                                        <span className={`rounded-full border px-2 py-0.5 [font-family:Poppins,sans-serif] text-[10px] font-black ${accuracyToTextColor(topic.tmi)}`}>{topic.tmi}%</span>
                                        <span className="inline-flex items-center gap-1 rounded-full border  pr-2 py-0.5 text-xs font-black text-gray-200"><span className="h-1.5 w-1.5 rounded-full"></span>{mcqDistributionPerTopic[topic.topic_id] ?? 0}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setSelectedTopics(weakTopics.map(topic => topic.topic_id));
                        setQuizMakingStep(prev => prev + 1);
                        setSmartSelectHidden(true);
                        setExamCreatedFromSmartSelect(true);
                    }}
                    className="block w-full cursor-pointer rounded-xl border-2 border-[#0E0F0E] bg-[#FFC600] py-3 text-center [font-family:Poppins,sans-serif] text-[13px] font-black text-[#0E0F0E] shadow-[3px_3px_0px_rgba(0,0,0,0.4)]"
                >
                    Add {numberOfWeakestTopics} Topics to Test
                </button>
            </div>
        </>
    )
}

export default SmartSelectWeakestTopic