import React, { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom';
import UpcomingTestCard from '../../components/userComponents/UpcomingTestCard';
import '../../src/animation.css';

const AllUpcomingTestsPage = () => {
    const {upcomingTests} = useOutletContext();
    // console.log(typeof setStartTest);

    return (
        <main className="fade-in relative flex-1 overflow-hidden pb-[58px] lg:pb-0 w-full">
            <div className="h-full overflow-y-auto w-full">
                <div className="w-full px-4 pt-4 pb-6 space-y-5 lg:max-w-5xl lg:mx-auto lg:px-8">
                    <Link to="/dashboard/test-series" className="inline-flex items-center gap-1.5 text-[#A8ACA8] text-[14px] font-[Inter] hover:text-white transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                        Back to Test Series
                    </Link>
                    
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFC600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/>
                            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
                            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
                            </svg>
                            <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.16em] text-[#FFC600]">
                            Upcoming Tests
                            </p>
                        </div>
                        <h1 className="font-[Poppins] font-black text-white text-[22px] leading-tight">
                            MDCATEMY All Upcoming Tests
                        </h1>
                        <p className="text-[#A8ACA8] text-[14px] font-[Inter] mt-1">
                            Check out your upcoming tests below.
                            Plan ahead and stay on track.
                        </p>

                    </div>

                    <div className='flex flex-col gap-10'>
                        {
                            upcomingTests?.map((upcomingTest, i) => {
                                return <div key={i}>
                                    <UpcomingTestCard upcomingTest={upcomingTest}/>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AllUpcomingTestsPage;