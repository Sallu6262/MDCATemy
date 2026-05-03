import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import PreviousTestCard from '../../components/userComponents/PreviousTestCard';
import '../../src/animation.css';

const AllPreviousTestsPage = () => {
  const {previousTests} = useOutletContext();
  // console.log(previousTests);
  const [missed, setMissed] = useState(0);

  useEffect(() => {
    let count = 0;
    previousTests?.forEach(test => count = test.correct === 0 && test.mistakes === 0 ? count : count + 1);
    setMissed(count);
  }, []);

  return (
    <main className="fade-in relative flex-1 overflow-y-auto pb-[58px] lg:pb-0 w-full">
      <div className="w-full px-4 pt-4 pb-6 space-y-4 lg:max-w-5xl lg:mx-auto lg:px-8">
        <Link to="/dashboard/test-series" className="inline-flex items-center gap-1.5 text-[#A8ACA8] text-[14px] font-[Inter] hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Test Series
        </Link>

        <div>
          <h1 className="font-[Poppins] font-black text-white text-[28px] leading-tight">Previous Tests</h1>
          <p className="text-[#A8ACA8] text-[15px] font-[Inter] mt-1">{missed} attempted - {previousTests?.length - missed} missed</p>
        </div>

        {
          previousTests?.map((previousTest, i) => <PreviousTestCard key={i} previousTest={previousTest}/>)
        }
      </div>
    </main>
  )
}

export default AllPreviousTestsPage