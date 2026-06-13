import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ExamTakingScreen from '../../components/userComponents/ExamTakingScreen';

const ReviewPreviousExamPage = () => {
    const [previousExam, setPreviousExam] = useState(JSON.parse(localStorage.getItem("previous-exam-mcqs")));
    const navigate = useNavigate();
    const {examType} = useParams();

    let urlTypeLabel = previousExam?.isMistakeCopyExam ? 'My Copy' : (previousExam?.isQuiz ? 'Quiz Builder' : 'Test Series');

    useEffect(() => {
        if(['quiz-builder', 'test-series', 'my-copy'].every(type => type !== examType)){
            navigate('/page-not-found');
        }
    }, []);

    return (
        <div className="flex flex-col overflow-hidden h-[calc(100dvh-72px-5.5rem)] max-h-[calc(100dvh-72px-5.5rem)] lg:h-[calc(100dvh-72px)] lg:max-h-[calc(100dvh-72px)]">
            <div className="flex-shrink-0 px-4 pt-3 pb-2 lg:px-8">
                <Link to={`/dashboard/${examType}`} className="cursor-pointer inline-flex items-center gap-1.5 text-[#A8ACA8] text-[16px] font-[Inter] hover:text-white transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    {`Back To ${urlTypeLabel}`}
                </Link>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
                <ExamTakingScreen isQuiz={previousExam?.isQuiz ?? false} isExamHappening={false} exam={previousExam} layoutFillParent />
            </div>
        </div>
    )
}

export default ReviewPreviousExamPage