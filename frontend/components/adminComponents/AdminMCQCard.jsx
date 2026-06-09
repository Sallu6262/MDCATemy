import React, { useEffect, useRef, useState } from 'react'

const MCQCard = ({mcq, mcqNo, testID, setMcqsAddedCount}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [addedLoading, setAddedLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const addMCQToTest = async () => {
        setAddedLoading(true);

        const res = await fetch(`${API_URL}/tests/add-mcq`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                test_id: testID,
                mcq_id: mcq.mcq_id
            })
        });

        const data = await res.json();

        if(data.status === 'success'){
            setIsAdded(true);
            setMessage("MCQ added to test!");
            setError(false);
            setMcqsAddedCount(prev => prev + 1);
        } else {
            setMessage(data.message || 'MCQ failed to add!');
            setError(true);
        }

        setAddedLoading(false);
    }

    const deleteMCQFromBank = async () => {
        setDeleteLoading(true);

        const res = await fetch(`${API_URL}/mcqs/${mcq.mcq_id}`,{
            method: 'DELETE',
            credentials: 'include'
        });

        if(res.status === 204){
            setIsDeleted(true);
            setMessage("MCQ deleted successfully!");
            setError(false);
        } else {
            setMessage("Deletion failed!");
            setError(true);
        }

        setDeleteLoading(false);
    }

    return (
        <article id={`mcq-${mcq.mcq_id}`} tabIndex="-1" className={`scroll-mt-36 rounded-2xl border border-white/10 bg-[#1A1A1A]/95 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:p-6`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
                <div>
                <div className="text-sm font-semibold text-white">MCQ <span className="font-mono text-base text-[#FFC600]">#{mcqNo}</span></div>
                    <p className="mt-1 text-xs text-white/40">Topics: {mcq.chapter_name} · {mcq.subject_name}</p>
                </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-stretch gap-2 sm:ml-8">
                {message ? <p className={`text-right text-sm ${error ? 'text-red-500' : 'text-green-500'}`}>{message}</p> : null}
                <div className="flex w-full items-center justify-between">
                    {!isAdded ? (
                        <button
                            onClick={addMCQToTest}
                            disabled={addedLoading}
                            type="button"
                            className={`${addedLoading ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-xl border border-[#FFC600]/35 bg-[#FFC600]/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#FFC600] transition hover:bg-[#FFC600]/20`}
                        >
                            {addedLoading ? 'Processing....' : 'Add to test'}
                        </button>
                    ) : <span />}
                    {!isDeleted ? (
                        <button
                            type="button"
                            onClick={deleteMCQFromBank}
                            disabled={deleteLoading}
                            className={`${deleteLoading ? 'cursor-not-allowed' : 'cursor-pointer'} shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-400 transition hover:bg-red-500/20`}
                        >
                            {deleteLoading ? '...' : 'Delete from bank'}
                        </button>
                    ) : <span />}
                </div>
            </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/90">{mcq.question}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">A.</span> {mcq.option_a}</div>
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">B.</span> {mcq.option_b}</div>
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">C.</span> {mcq.option_c}</div>
            <div className="rounded-xl border border-white/10 bg-[#121212]/80 px-3 py-2.5 text-sm text-white/85"><span className="text-white/40">D.</span> {mcq.option_d}</div>
            </div>
            <p className="mt-4 text-sm text-white/75"><span className="font-semibold text-white/90">Difficulty:</span> {mcq.difficulty}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75"><span className="font-semibold text-white/90">Explanation:</span> {mcq.explanation || 'No explanation for this question.'}</p>
        </article>
    )
}

export default React.memo(MCQCard)