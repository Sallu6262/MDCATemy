import React, { useState, useEffect } from 'react'
import UpcomingTestCard from '../components/userComponents/UpcomingTestCard'
import { useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skeleton from '../components/skeletonComponents/Skeleton';

const UserTestSeriesLayout = () => {
    const [upcomingTests, setUpcomingTests] = useState([]);
    const [previousTests, setPreviousTests] = useState([]);

    const {setIsExamHappening, isExamHappening} = useOutletContext();

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcomingAndPreviousTests = async () => {
            const res1 = await fetch(`${API_URL}/tests/upcoming`,{
                method: 'GET',
                credentials: 'include'
            });

            const data1 = await res1.json();

            const res2 = await fetch(`${API_URL}/tests/previous`,{
                method: 'GET',
                credentials: 'include'
            });

            const data2 = await res2.json();
            
            if(data1.status === 'success' && data2.status === 'success'){
                setUpcomingTests(data1.data);
                setPreviousTests(data2.data);
                setLoading(false);
                // console.log(data1.data);
            }
        }

        fetchUpcomingAndPreviousTests();
    },[]);

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
            
            {
                loading ? 
                <Skeleton /> :
                <Outlet context={{upcomingTests, previousTests, setIsExamHappening, isExamHappening}}/>
            }
        </>
    )
}

export default UserTestSeriesLayout