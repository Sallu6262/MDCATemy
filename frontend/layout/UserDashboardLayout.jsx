import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/userComponents/UserNavbar'
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import '../src/animation.css';
import {clearLocalStorage} from '../utils/HelperObjects';
import Skeleton from '../components/skeletonComponents/Skeleton';

const UserDashboardLayout = () => {
    const {student, admin} = useOutletContext();
    const navigate = useNavigate();

    const [studentAnalytics, setStudentAnalytics] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [isExamHappening, setIsExamHappening] = useState(false);
    const [syllabusAndIDs, setSyllabusAndIDs] = useState({});

    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // console.log('here in dashboard');
        if(!student || student?.payment_status !== 'VERIFIED'){
            navigate('/');
            return;
        } 

        if(student?.payment_status !== 'VERIFIED'){
            navigate('/payment-status');
        }

        if(admin){
            navigate('/admin');
            return;
        }
    }, []);

    useEffect(() => {
        const submitPendingExam = async () => {
            const exam = JSON.parse(localStorage.getItem("exam"));

            if(exam?.examStatus !== "NOT_SUBMITTED") return;

            let url = API_URL;

            if(exam?.isQuiz) url += `/quizzes/result`;
            else url += '/tests/submit';

            const res = await fetch(url, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quiz_id: exam?.test_id,
                    test_id: exam?.test_id,
                    correct_count: exam?.correctMCQsCount
                })
            });

            const data = await res.json();

            if(data.status === 'success'){
                clearLocalStorage();
            }
        }

        submitPendingExam();

        window.addEventListener("online", submitPendingExam);

        return () => window.removeEventListener("online", submitPendingExam);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch(`${API_URL}/users/stats`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            if(data.status === 'success'){
                // console.log(data.data);
                setStudentAnalytics(data.data);
            }
        }

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchLeaderBoard = async() => {
            const res = await fetch(`${API_URL}/users/leaderboard`,{
                method: 'GET',
                credentials: 'include'
            });
        
            const data = await res.json();
        
            if(data.status === 'success'){
                setLeaderboard(data.data);
            }
        }
    
        fetchLeaderBoard();
    }, []);

    useEffect(() => {
        const fetchSyllabus = async () => {
            const res = await fetch(`${API_URL}/mcqs/topics`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            if(data.status === 'success'){
                setSyllabusAndIDs(data.data);
                setLoading(false);
            }
        }

        fetchSyllabus();

    }, []);

    return (
        <section className={`flex min-h-0 flex-1 flex-col bg-[#181A18] text-white font-[Inter,sans-serif] antialiased ${isExamHappening ? 'overflow-hidden' : ''}`}>
            <div className={`flex min-h-0 flex-1 flex-col lg:flex-row ${isExamHappening ? 'overflow-hidden' : ''}`}>
                <div className={`fade-in order-1 flex min-h-0 flex-1 flex-col lg:order-2 lg:pb-0 ${isExamHappening ? 'overflow-hidden pb-0' : 'max-lg:pb-[calc(3.25rem+env(safe-area-inset-bottom,0.35rem))]'}`}>
                    {
                        loading ?
                        <Skeleton className={'h-full w-full'}/> :
                        <Outlet context={{student, studentAnalytics, setStudentAnalytics, leaderboard, setIsExamHappening, isExamHappening, syllabusAndIDs}}/>
                    }
                </div>
                {!isExamHappening ? <UserNavbar /> : ''}
            </div>
        </section>
    )  
}

export default UserDashboardLayout