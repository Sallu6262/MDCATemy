import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboardHeader = () => {
  return (
    <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC600]">Welcome back, Admin</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Dashboard Overview</h2>
        </div>
        <Link to="/" className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-[#FFC600] px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#181A18] transition hover:opacity-90">
            Back to site
        </Link>
    </header>
  )
}

export default AdminDashboardHeader