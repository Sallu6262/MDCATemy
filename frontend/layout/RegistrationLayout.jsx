import React from 'react'
import RegistrationPageDecoration from '../components/RegistrationPageDecoration'
import { Outlet, useOutletContext } from 'react-router-dom'
import '../src/animation.css';

const RegistrationLayout = () => {
    const {admin, setAdmin, student, setStudent} = useOutletContext();

    return (
        <section className="min-h-screen bg-[#141414] text-white antialiased">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <RegistrationPageDecoration />
                <Outlet context={{admin, setAdmin, student, setStudent}}/>
            </div>
        </section>
    )
}

export default RegistrationLayout