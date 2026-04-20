import React from 'react'
import RegistrationPageDecoration from '../components/RegistrationPageDecoration'
import { Outlet, useOutletContext } from 'react-router-dom'

const RegistrationLayout = () => {
    const {user, setUser, analytics, setAnalytics} = useOutletContext();

    return (
        <section className="min-h-screen bg-[#141414] text-white antialiased">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <RegistrationPageDecoration />
                <Outlet context={{user, setUser, analytics, setAnalytics}}/>
            </div>
        </section>
    )
}

export default RegistrationLayout