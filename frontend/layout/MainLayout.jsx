import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet, useRouteLoaderData } from "react-router-dom"
import ScrollToTop from "../components/Scroller"
import { useState } from "react"

const MainLayout = () => {
  const res = useRouteLoaderData('root');
  const [analytics, setAnalytics] = useState();
  const [user, setUser] = useState(res.status === 'success' && res.data.payment_status === 'VERIFIED' ? res.data : null);

  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <ScrollToTop />
      <Outlet context={{user, setUser, analytics, setAnalytics}}/>
      <Footer />
    </>
  )
}

export default MainLayout