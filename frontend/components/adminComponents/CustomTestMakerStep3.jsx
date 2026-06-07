import React, { useCallback, useEffect, useState } from 'react'
import SubjectCard from '../SubjectCard'

//show error message in case of no selected topics
const CustomTestMakerStep3 = ({selectedTest, setSelectedTest, nextStage, isTestCreated}) => {
    // console.log(selectedTest);

    const API_URL = import.meta.env.VITE_API_URL;

    const [subjects, setSubjects] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState(() => new Set());
    const [message, setMessage] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

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

    const submitTopics = async () => {
        let topicIDS = new Set();

        setSubmitLoading(true);

        if(selectedTest?.topics?.length){
            Object.keys(subjects).forEach(subject => {
                Object.keys(subjects[subject]).forEach(chapter => {
                    subjects[subject][chapter].forEach(topic => {
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
            let topicIDsString = "";
            [...topicIDS].forEach((topicID, i) => {
                topicIDsString += `${topicID}`;
        
                if(i < [...topicIDS]?.length - 1) topicIDsString += ',';
            });

            // console.log('topic ids:',topicIDsString);

            const formData = new FormData();
            formData.append("file", selectedTest?.file);
            formData.append("test_name", selectedTest?.name);
            formData.append("test_time", selectedTest?.time);
            formData.append("test_date", selectedTest?.date?.toISOString());
            formData.append("mcq_count", selectedTest?.mcq_count);
            formData.append("topics", topicIDsString);

            if(!isTestCreated){
                formData.append("test_id", selectedTest?.id);
            }

            const res = await fetch(`${API_URL}/tests/${isTestCreated ? 'create' : 'edit'}`,{
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            const data = await res.json();

            if(data.status === 'success'){
                console.log(data);
                const id = data.data?.test_id || selectedTest?.id; 
                if(isTestCreated) setSelectedTest(prev => ({...prev, id , topics: [...topicIDS]}));
                else setSelectedTest(prev => ({...prev, topics: [...topicIDS]}));
                nextStage();
            } else {
                setMessage(data.message);
            }
        } else {
            //show error in case of not selecting topics
            setMessage("Please select at least 1 topic.");
        }

        setSubmitLoading(false);
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
                // console.log(data.data);
                setSubjects(data.data.syllabus);
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
                            Object.keys(subjects)?.map((subject, i) => <SubjectCard key={i} subject={subject.slice(0,1).toUpperCase() + subject.slice(1)} chapters={subjects[subject]} setSelectedTopics={handleTopics} selectedTopics={selectedTopics}/>)
                        }
                        
                    </section>
                    <div className='mt-5 flex md:flex-row flex-col justify-end items-center gap-3'>
                        <span className='text-base text-red-500'>{message}</span>
                        <button onClick={submitTopics} disabled={submitLoading} className={`${submitLoading ? 'cursor-not-allowed' : 'cursor-pointer'} self-end inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#FFC600] px-6 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_28px_rgba(255,198,0,0.2)] transition hover:brightness-105`}>
                            {submitLoading ? 'Processing....' : 'Submit Topics'}
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CustomTestMakerStep3