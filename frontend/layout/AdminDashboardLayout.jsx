import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import AdminNavbar from '../components/adminComponents/AdminNavbar'

const AdminDashboardLayout = () => {
    const {admin, setAdmin, student, setStudent} = useOutletContext();
    
    const navigate = useNavigate();

    useEffect(() => {
        if(!admin){
            navigate('/');
            return;
        }
    },[]);

    return (
        <section className="min-h-screen bg-[#121212] text-white font-[Inter,sans-serif] antialiased">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <div className="order-1 flex min-h-0 min-w-0 flex-1 flex-col pb-[5.5rem] lg:order-2 lg:pb-0">
                    <Outlet context={{admin, setAdmin, student, setStudent}}/>
                </div>
                <AdminNavbar />
            </div>
        </section>
    )
}

export default AdminDashboardLayout