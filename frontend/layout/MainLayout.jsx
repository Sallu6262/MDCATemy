import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet, useRouteLoaderData } from "react-router-dom"
import ScrollToTop from "../components/Scroller"
import { useState } from "react"

const MainLayout = () => {
  const res = useRouteLoaderData('root');
  const [analytics, setAnalytics] = useState();

  const [student, setStudent] = useState(res.status === 'success' && res.data.role !== 'ADMIN' ? res.data : null);
  const [admin, setAdmin] = useState(res.status === 'success' ? res.data : null);

  return (
    <>
      <Navbar user={student || admin} setUser={student ? setStudent : setAdmin}/>
      <ScrollToTop />
      <Outlet context={{admin, setAdmin, student, setStudent, analytics, setAnalytics}}/>
      <Footer />
    </>
  )
}

export default MainLayout