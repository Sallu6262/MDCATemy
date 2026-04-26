import React, { useState, useEffect } from 'react'
import UpcomingTestCard from '../components/userComponents/UpcomingTestCard'
import { useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserTestSeriesLayout = () => {
    const [upcomingTests, setUpcomingTests] = useState([]);
    const [previousTests, setPreviousTests] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

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
                // console.log(data1.data);
            }
        }

        fetchUpcomingAndPreviousTests();
    },[]);

    return (
        <>
            <Outlet context={{upcomingTests, previousTests}}/>
        </>
    )
}

export default UserTestSeriesLayout