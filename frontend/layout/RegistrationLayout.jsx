import React from 'react'
import RegistrationPageDecoration from '../components/RegistrationPageDecoration'
import { Outlet } from 'react-router-dom'

const RegistrationLayout = () => {
    return (
        <section className="min-h-screen bg-[#141414] text-white antialiased">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <RegistrationPageDecoration />
                <Outlet />
            </div>
        </section>
    )
}

export default RegistrationLayout