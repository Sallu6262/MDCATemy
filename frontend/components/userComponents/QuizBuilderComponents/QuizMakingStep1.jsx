import React, { useState } from 'react'
import SubjectSelectButton from './SubjectSelectButton'

const QuizMakingStep1 = ({setSelectedSubjects, selectedSubjects}) => {
    const subjectToColor = {
        'Biology' : '#10B981',
        'Chemistry' : '#A78BFA',
        'Physics' : '#38BDF8',
        'English' : '#F59E0B',
        'Logical Reasoning' : '#F472B6',
    }

    return (
        <>
        <section className="overflow-hidden rounded-2xl border-2 border-[#2D302D] bg-[#181A18] shadow-[4px_4px_0px_rgba(255,198,0,0.1)]">
            <div className="flex flex-wrap items-center gap-3 border-b border-[#2D302D]/60 bg-[#0E0F0E]/20 px-4 py-3">
            <span className="[font-family:Poppins,sans-serif] text-[11px] font-black uppercase tracking-[0.14em] text-[#8B8E8B]/50">Your Prep</span>
            <span className="flex items-center gap-1 text-xs text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>{'Strong >=75%'}</span>
            <span className="flex items-center gap-1 text-xs text-amber-400"><span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>Improving 50-74%</span>
            <span className="flex items-center gap-1 text-xs text-red-400"><span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>{'Needs work <50%'}</span>
            </div>

            <div className="p-4 lg:p-6">
            <div className="mb-4 flex items-center justify-between">
                <p className="[font-family:Poppins,sans-serif] text-[13px] font-black uppercase tracking-[0.14em] text-[#FFC600]">Select Subjects</p>
                <p className="text-sm text-[#8B8E8B]">{selectedSubjects.size} selected</p>
            </div>

            <div className="grid gap-2 lg:grid-cols-2 lg:gap-3">
                <SubjectSelectButton subject={"Biology"} colorClass={`bg-[${subjectToColor["Biology"]}]`} setSelectedSubjects={setSelectedSubjects} isSelected={selectedSubjects.has('biology')}/>
                <SubjectSelectButton subject={"Chemistry"} colorClass={`bg-[${subjectToColor["Chemistry"]}]`} setSelectedSubjects={setSelectedSubjects} isSelected={selectedSubjects.has('chemistry')}/>
                <SubjectSelectButton subject={"Physics"} colorClass={`bg-[${subjectToColor["Physics"]}]`} setSelectedSubjects={setSelectedSubjects} isSelected={selectedSubjects.has('physics')}/>
                <SubjectSelectButton subject={"English"} colorClass={`bg-[${subjectToColor["English"]}]`} setSelectedSubjects={setSelectedSubjects} isSelected={selectedSubjects.has('english')}/>
                <SubjectSelectButton subject={"Logical Reasoning"} colorClass={`bg-[${subjectToColor["Logical Reasoning"]}]`} setSelectedSubjects={setSelectedSubjects} isSelected={selectedSubjects.has('logical_reasoning')}/>
            </div>
            </div>
        </section>
        </>
    )
}

export default QuizMakingStep1