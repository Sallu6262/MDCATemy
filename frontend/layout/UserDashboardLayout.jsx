import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/userComponents/UserNavbar'
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import '../src/animation.css';

const UserDashboardLayout = () => {
    const {student, admin} = useOutletContext();
    const navigate = useNavigate();

    const [studentAnalytics, setStudentAnalytics] = useState(null);
    const [predictedScore, setPredictedScore] = useState(0);

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
        const fetchPredictedScore = async() => {
            // const res = await fetch(`${API_URL}/users/predicted-score`,{
            //     method: 'GET',
            //     credentials: 'include'
            // });
        
            // const data = await res.json();
        
            // if(data.status === 'success'){
            //     setPredictedScore(data.data?.predicted_score);
            // }
        }
    
        fetchPredictedScore();
      }, []);

    return (
        <section className="fade-in min-h-screen bg-[#181A18] text-white font-[Inter,sans-serif] antialiased">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <div className="order-1 flex min-h-0 min-w-0 flex-1 flex-col pb-[5.5rem] lg:order-2 lg:pb-0">
                    <Outlet context={{studentAnalytics, setStudentAnalytics, predictedScore}}/>
                </div>
                <UserNavbar />
            </div>
        </section>
    )  
}

export default UserDashboardLayout