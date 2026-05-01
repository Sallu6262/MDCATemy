import React, { useState, useEffect } from 'react'
import UpcomingTestCard from '../../components/userComponents/UpcomingTestCard'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UpcomingTestsList from '../../components/userComponents/UpcomingTestsList';
import PreviousTestsList from '../../components/userComponents/PreviousTestsList'
import UserScheduleCard from '../../components/userComponents/UserScheduleCard'
import TestSyllabusPopUp from '../../components/userComponents/TestSyllabusPopUp';
import '../../src/animation.css';

const UserTestSeriesPage = () => {
    // const [recentUpcomingTest, setRecentUpcomingTest] = useState(null);
    const {upcomingTests, previousTests} = useOutletContext();
    // console.log("upcoming: ", upcomingTests);

    // const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    
    return (
        <>
            <style>
                {
                    `
                        * { box-sizing: border-box; }
                        ::-webkit-scrollbar { width: 6px; }
                        ::-webkit-scrollbar-track { background: #181A18; }
                        ::-webkit-scrollbar-thumb { background: #FFC600; border-radius: 3px; }
                        ::selection { background: rgba(255,198,0,0.3); color: #fff; }
                    `
                }
            </style>
            <main className="fade-in relative flex-1 overflow-hidden pb-[58px] lg:pb-0 w-full">
                
                <div className="h-full overflow-y-auto">
                <div className="w-full px-4 pt-4 pb-6 space-y-5 lg:max-w-5xl lg:mx-auto lg:px-8">

                    <div>
                    <div className="flex items-center gap-2 mb-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/>
                        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
                        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
                        </svg>
                        <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.16em] text-[#FFC600]">
                        Test Series
                        </p>
                    </div>
                    <h1 className="font-[Poppins] font-black text-white text-[22px] leading-tight">
                        MDCATEMY Test Series
                    </h1>
                    <p className="text-[#A8ACA8] text-[14px] font-[Inter] mt-1">
                        A rolling mix of chapter drills, topic quizzes and full PMDC-style mocks.
                        Schedule shifts - show up when your test does.
                    </p>
                    </div>

                    <UpcomingTestCard upcomingTest={upcomingTests?.[0]}/>

                    <UpcomingTestsList upcomingTests={upcomingTests}/>

                    <PreviousTestsList previousTests={previousTests}/>

                    <UserScheduleCard />

                </div>
                </div>
            </main>
        </>
    )
}

export default UserTestSeriesPage