import React, { useEffect, useState } from 'react'
import SavedCopy from '../../components/userComponents/SavedCopy';
import MistakesCopy from '../../components/userComponents/MistakesCopy';
import '../../src/animation.css';
import Skeleton from '../../components/skeletonComponents/Skeleton';
import MCQListSkeleton from '../../components/skeletonComponents/MCQListSkeleton'

const UserCopyPage = () => {
    const sessionState = JSON.parse(sessionStorage.getItem("isSavedCopy"));
    const [mistakeOrSave, setMistakeOrSave] = useState(sessionState ?? true);
    const [savedMcqs, setSavedMcqs] = useState([]);
    const [wrongMcqs, setWrongMcqs] = useState([]);
    const [totalMistakes, setTotalMistakes] = useState(0);
    const [pendingMistakes, setPendingMistakes] = useState(0);
    const [totalSaved, setTotalSaved] = useState({});
    const [totalWrong, setTotalWrong] = useState({});

    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchSavedAndWrongMcqs = async () => {
            const res1 = await fetch(`${API_URL}/users/bookmarks?page=1&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1`, {
                method: 'GET',
                credentials: 'include'
            });

            const data1 = await res1.json();

            const res2 = await fetch(`${API_URL}/users/mistakes?page=1&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1`, {
                method: 'GET',
                credentials: 'include'
            });

            const data2 = await res2.json();

            if(data1.status === 'success' && data2.status === 'success'){
                // console.log(data1);
                setSavedMcqs(data1.data?.mcqs);
                setWrongMcqs(data2.data?.mcqs);
                setTotalMistakes(data2.data?.total_mistakes);
                setPendingMistakes(data2.data?.pending_mistakes);
                setTotalSaved({
                    all: data1.data.biology + data1.data.physics + data1.data.chemistry + data1.data.english + data1.data.logical_reasoning,
                    biology: data1.data.biology,
                    physics: data1.data.physics,
                    chemistry: data1.data.chemistry,
                    english: data1.data.english,
                    logical_reasoning: data1.data.logical_reasoning  
                });
                setTotalWrong({
                    all: data2.data.biology + data2.data.physics + data2.data.chemistry + data2.data.english + data2.data.logical_reasoning,
                    biology: data2.data.biology,
                    physics: data2.data.physics,
                    chemistry: data2.data.chemistry,
                    english: data2.data.english,
                    logical_reasoning: data2.data.logical_reasoning  
                });

                setLoading(false);
            }
        }

        fetchSavedAndWrongMcqs();
    }, []);

    return (
        <>
            <style>
                {
                    `* { box-sizing: border-box; }
                    ::-webkit-scrollbar { width: 6px; }
                    ::-webkit-scrollbar-track { background: #181A18; }
                    ::-webkit-scrollbar-thumb { background: #FFC600; border-radius: 3px; }
                    ::selection { background: rgba(255,198,0,0.3); color: #fff; }

                    /* yellow left-border callout */
                    .callout-yellow {
                    border-left: 3px solid #FFC600;
                    }
                    /* hide horizontal scrollbars on filter chip rows */
                    .scrollbar-none::-webkit-scrollbar { display: none; }
                    .scrollbar-none { scrollbar-width: none; }
                    
                    `
                }
            </style>
            <main className="fade-in my-copy-page flex-1 overflow-hidden lg:pb-0">
                <div className="h-full overflow-y-auto">
                <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto">

                    <div className="mb-6">
                    <h1 className="font-[Poppins] font-black text-white text-[22px] lg:text-[26px]">My Copy</h1>
                    <p className="font-[Inter] text-[#A8ACA8] text-[13px] mt-1">
                        Your saved MCQs and mistake log — all in one place.
                    </p>
                    </div>

                    <div className="flex gap-1 bg-[#181A18] border border-[#2E302E] rounded-xl p-1 mb-8">
                    <button id="tab-saved" onClick={() => setMistakeOrSave(true)} className={`cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-[Inter] font-bold ${mistakeOrSave ? 'bg-[#FFC600] text-[#181A18]' : 'text-[#A8ACA8] hover:text-white'} shadow-sm transition-colors`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                        </svg>
                        Saved Copy
                    </button>
                    <button id="tab-mistakes" onClick={() => setMistakeOrSave(false)} className={`cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-[Inter] font-bold ${!mistakeOrSave ? 'bg-[#FFC600] text-[#181A18]' : 'text-[#A8ACA8] hover:text-white'} transition-colors`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        Mistakes Copy
                    </button>
                    </div>

                    {
                        loading ? 
                        <MCQListSkeleton /> :
                        (
                            mistakeOrSave 
                            ? <SavedCopy setSavedMcqs={setSavedMcqs} savedMcqs={savedMcqs} totalSaved={totalSaved}/> 
                            : <MistakesCopy setTotalWrong={setTotalWrong} totalWrong={totalWrong} wrongMcqs={wrongMcqs} setPendingMistakes={setPendingMistakes} totalMistakes={totalMistakes} pendingMistakes={pendingMistakes} setWrongMcqs={setWrongMcqs}/>
                        )
                    }

                </div>
                </div>
            </main>
        </>
    )
}

export default UserCopyPage
