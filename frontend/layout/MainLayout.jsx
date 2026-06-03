import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet, useRouteLoaderData } from "react-router-dom"
import ScrollToTop from "../components/Scroller"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = () => {
  const res = useRouteLoaderData('root');

  const [student, setStudent] = useState(res.status === 'success' && res.data.role !== 'ADMIN' ? res.data : null);
  const [admin, setAdmin] = useState(res.status === 'success' && res.data.role === 'ADMIN' ? res.data : null);

  return (
    <section className="min-h-screen flex flex-col">
      <Navbar user={student || admin} setUser={student ? setStudent : setAdmin} isLanding={false}/>
      <ScrollToTop />
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet context={{admin, setAdmin, student, setStudent}}/>
      </div>
      <ToastContainer />
    </section>
  )
}

export default MainLayout