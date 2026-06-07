import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/Scroller'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const LandingPageLayout = ({enrollmentCount}) => {
    return (
        <>
            <Navbar isLanding={true} isEnrollmentFinished={enrollmentCount === 0}/>
            <ScrollToTop />
            <Outlet context={{enrollmentCount}}/>
            <Footer />
        </>
    )
}

export default LandingPageLayout