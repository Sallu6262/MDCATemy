import React, { useRef, useState } from 'react'
import AdminDashboardHeader from '../../components/adminComponents/AdminDashboardHeader'
import CustomTestMakerStep1 from '../../components/adminComponents/CustomTestMakerStep1'
import CustomTestMakerStep2 from '../../components/adminComponents/CustomTestMakerStep2';
import CustomTestMakerStep3 from '../../components/adminComponents/CustomTestMakerStep3';
import CustomTestMakerStep4 from '../../components/adminComponents/CustomTestMakerStep4';

const AdminCustomTestMakerPage = () => {
    const [step, setStep] = useState(1);
    const [isTestCreated, setIsTestCreated] = useState(true);
    const [selectedTestID, setSelectedTestID] = useState(null);
    const [selectedTest, setSelectedTest] = useState({});

    // const [updatedTest, setUpdatedTest] = useState({});

    const sectionRef = useRef(null);

    const nextStage = () => {
        setStep(prev => prev < 4 ? prev + 1 : prev);
        sectionRef.current.scrollIntoView();
    }

    const previousStage = () => {
        setStep(prev => prev > 1 ? prev - 1 : prev);
        sectionRef.current.scrollIntoView();
    }

    return (
        <main className="flex-1 p-6 lg:p-10" ref={sectionRef}>
            <AdminDashboardHeader />

            <section className="mt-6 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
                {step == 1 ? <CustomTestMakerStep1 nextStage={nextStage} setIsTestCreated={setIsTestCreated} selectedTestID={selectedTestID} setSelectedTestID={setSelectedTestID} setSelectedTest={setSelectedTest}/> : ''}
                {step == 2 ? <CustomTestMakerStep2 selectedTest={selectedTest} setSelectedTest={setSelectedTest} nextStage={nextStage}/> : ''}
                {step == 3 ? <CustomTestMakerStep3 selectedTest={selectedTest} setSelectedTest={setSelectedTest} nextStage={nextStage} isTestCreated={isTestCreated}/> : ''}
                {step == 4 ? <CustomTestMakerStep4 selectedTest={selectedTest} isTestCreated={isTestCreated}/> : ''}
            
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                    {step > 1 && step < 4 ? <button onClick={previousStage} type="button" className="cursor-pointer inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/[0.07]">Back</button> : <div></div>}
                    {/* {step > 1 ? <button onClick={nextStage} type="button" className="cursor-pointer inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#FFC600] px-6 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_28px_rgba(255,198,0,0.25)] transition hover:brightness-105">{step == 4 ? 'Submit' : 'Next'}</button> : <div></div>} */}
                </div>
            </section>

        </main>
    )
}

export default AdminCustomTestMakerPage