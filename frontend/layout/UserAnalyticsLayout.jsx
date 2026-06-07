import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

const UserAnalyticsLayout = () => {
    const {syllabusAndIDs, studentAnalytics} = useOutletContext();
    return (
        <Outlet context={{syllabusAndIDs, studentAnalytics}}/>
    )
}

export default UserAnalyticsLayout