import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <aside className="w-full max-w-[280px] border-r border-white/10 bg-[#121212] p-6 lg:p-7">
        <div className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Admin Panel</p>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-white">MDCATEMY</h1>
        <p className="mt-2 text-sm text-white/50">Dashboard navigation</p>
        </div>

        <nav className="space-y-2 flex flex-col">
            <NavLink to='/admin/payments' className={({ isActive }) => `cursor-pointer w-full rounded-xl px-4 py-3 text-left transition border ${isActive ? "border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] text-white/90"}`}>
                <p className="text-sm font-semibold">Payments</p>
            </NavLink>

            <NavLink to='/admin/upload-mcqs' className={({ isActive }) => `cursor-pointer w-full rounded-xl px-4 py-3 text-left transition border ${isActive ? "border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] text-white/90"}`}>
                <p className="text-sm font-semibold">Upload Mcqs</p>
            </NavLink>

            <NavLink to='/admin/custom-test-maker' className={({ isActive }) => `cursor-pointer w-full rounded-xl px-4 py-3 text-left transition border ${isActive ? "border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] text-white/90"}`}>
                <p className="text-sm font-semibold">Custom Test Maker</p>
            </NavLink>
        </nav>
    </aside>
  )
}

export default AdminNavbar