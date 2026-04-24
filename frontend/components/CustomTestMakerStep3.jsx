import React, { useCallback, useEffect, useState } from 'react'
import SubjectCard from './SubjectCard'

//show error message in case of no selected topics
const CustomTestMakerStep3 = ({selectedTest, setSelectedTest, nextStage, isTestCreated}) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [subjects, setSubjects] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState(() => new Set());
    const [message, setMessage] = useState("");

    // console.log(selectedTopics);
    const handleTopics = useCallback((topicID) => {
        setSelectedTopics(prev => {
            const newSet = new Set(prev);

            if(prev.has(topicID))
                newSet.delete(topicID);
            else
                newSet.add(topicID);

            return newSet;
        });
    },[]);

    const submitTopics = () => {
        let topicIDS = new Set();

        if(selectedTest?.topics?.length){
            subjects.forEach(subject => {
                subject.chapters.forEach(chapter => {
                    chapter.topics.forEach(topic => {
                        selectedTest?.topics.forEach(prevTopic => {
                            if(prevTopic === topic.name){
                                topicIDS.add(topic.id);
                            }
                        })
                    })
                })
            });
        }

        // console.log('previous ids:',[...topicIDS]);

        if(selectedTopics.size){
            [...selectedTopics].forEach(selectedTopic => {
                topicIDS.add(selectedTopic);
            })
        }


        if(topicIDS.size){
            setSelectedTest(prev => ({...prev, topics: [...topicIDS]}));
            nextStage();
        } else {
            //show error in case of not selecting topics
        }
    }

    useEffect(() => {
        const fetchTopics = async () => {
            const res = await fetch(`${API_URL}/mcqs/topics`,{
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            // console.log(data.data);
            if(data.status === 'success'){
                setSubjects(data.data);
            }
        }

        fetchTopics();
    },[]);

    return (
        <>
            <style>
                {
                    `
                        details > summary { list-style: none; }
                        details > summary::-webkit-details-marker { display: none; }
                        details.subject-disclosure[open] > summary .subject-chevron { transform: rotate(90deg); }
                        details.chapter-disclosure[open] > summary .chapter-chevron { transform: rotate(90deg); }
                    `
                }
            </style>

            <section className="text-white font-[Inter,sans-serif] antialiased">
                <div className="mx-auto flex max-w-4xl flex-col px-4 pb-12 pt-8 sm:px-6 lg:px-8">
                    <header className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Custom test maker</p>
                    <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Step 3 — Topics from syllabus</h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/55">Open a subject to see its chapters, then a chapter to select topics (checkboxes). Mock data from database.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                        <span className="font-semibold text-[#FFC600]">3</span> / 4
                    </div>
                    </header>

                    <section className="flex-1 space-y-4">

                        {
                            subjects?.map((subject, i) => <SubjectCard key={i} subject={subject.subject} chapters={subject.chapters} setSelectedTopics={handleTopics} selectedTopics={selectedTopics}/>)
                        }
                        
                    </section>
                    <button onClick={submitTopics} className="mt-6 self-end cursor-pointer inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#FFC600] px-6 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_28px_rgba(255,198,0,0.2)] transition hover:brightness-105">
                        Submit Topics
                    </button>
                </div>
            </section>
        </>
    )
}

export default CustomTestMakerStep3