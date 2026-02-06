import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
        <Outlet />
    </>
  )
}

export default MainLayout