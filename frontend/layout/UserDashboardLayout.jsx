import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/userComponents/UserNavbar'
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import '../src/animation.css';

const UserDashboardLayout = () => {
    const {student, admin} = useOutletContext();
    const navigate = useNavigate();

    const [studentAnalytics, setStudentAnalytics] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [isExamHappening, setIsExamHappening] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
    
    useEffect(() => {
        // console.log('here in dashboard');
        if(!student){
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

        const fetchStats = async () => {
            const res = await fetch(`${API_URL}/users/stats`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            if(data.status === 'success'){
                setStudentAnalytics(data.data);
                // console.log(data);
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

    return (
        <section className={`fade-in flex min-h-0 flex-1 flex-col bg-[#181A18] text-white font-[Inter,sans-serif] antialiased ${isExamHappening ? 'overflow-hidden' : ''}`}>
            <div className={`flex min-h-0 flex-1 flex-col lg:flex-row ${isExamHappening ? 'overflow-hidden' : ''}`}>
                <div className={`order-1 flex min-h-0 flex-1 flex-col lg:order-2 lg:pb-0 ${isExamHappening ? 'overflow-hidden pb-0' : 'pb-[5.5rem]'}`}>
                    <Outlet context={{studentAnalytics, setStudentAnalytics, leaderboard, setIsExamHappening, isExamHappening}}/>
                </div>
                {!isExamHappening ? <UserNavbar /> : ''}
            </div>
        </section>
    )  
}

export default UserDashboardLayout