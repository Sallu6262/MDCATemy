import React, { useEffect } from 'react'
import UserNavbar from '../components/userComponents/UserNavbar'
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"

const UserDashboardLayout = () => {
    const {student, admin} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log('here in dashboard');
        if(!student){
            navigate('/');
            return;
        } 

        if(admin){
            navigate('/admin');
            return;
        }
    });

    return (
        <section className="min-h-screen bg-[#181A18] text-white font-[Inter,sans-serif] antialiased">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <div className="order-1 flex min-h-0 min-w-0 flex-1 flex-col pb-[5.5rem] lg:order-2 lg:pb-0">
                    <Outlet />
                </div>
                <UserNavbar />
            </div>
        </section>
    )  
}

export default UserDashboardLayout