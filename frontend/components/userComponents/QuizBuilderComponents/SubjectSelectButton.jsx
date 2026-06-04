import React from "react";

const SubjectSelectButton = ({accuracy, showAccuracy, smartSelectHidden, subject, colorClass, setSelectedSubjects, isSelected}) => {
    const actualsubject = subject.toLowerCase().replace(' ', '_');

    return (
        <button onClick={() => {
            setSelectedSubjects(prev => {
                const newSet = new Set(prev);
                newSet.has(actualsubject) ? newSet.delete(actualsubject) : newSet.add(actualsubject);
                return newSet;
            })
        }} className={`cursor-pointer flex w-full items-center gap-3 rounded-xl border-2 ${isSelected ? 'border-[#FFC600] bg-[#FFC600]/10 text-white' : 'text-[#8B8E8B] hover:border-[#FFC600]/50'} px-4 py-3 text-left`}>
            <span className={`h-3 w-3 rounded-full border-2 border-[#0E0F0E] ${colorClass}`}></span>
            <span className="flex-1 [font-family:Poppins,sans-serif] text-sm font-black">{subject}</span>
            {showAccuracy || !smartSelectHidden ? <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 [font-family:Poppins,sans-serif] text-xs font-black text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>{accuracy}%</span> : ''}
        </button>
    )
}

export default SubjectSelectButton;