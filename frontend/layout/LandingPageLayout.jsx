import React from 'react'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/Scroller'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const LandingPageLayout = () => {
    return (
        <>
            <Navbar isLanding={true}/>
            <ScrollToTop />
            <Outlet />
            <Footer />
        </>
    )
}

export default LandingPageLayout