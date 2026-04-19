import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const tabBase =
  'cursor-pointer rounded-xl border px-4 py-3 text-left transition max-lg:flex-1 max-lg:min-w-0 max-lg:rounded-full max-lg:px-2 max-lg:py-2 max-lg:text-center lg:w-full'

const AdminNavbar = () => {
  return (
    <>
        <aside className="order-2 fixed bottom-0 left-0 right-0 z-40 w-full border-t border-white/10 bg-[#121212] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 lg:static lg:order-1 lg:z-auto lg:h-screen lg:max-w-[280px] lg:flex-shrink-0 lg:border-r lg:border-t-0 lg:p-7">
            <div className="mb-10 hidden lg:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Admin Panel</p>
                <h1 className="mt-3 text-2xl font-black tracking-tight text-white">MDCATEMY</h1>
                <p className="mt-2 text-sm text-white/50">Dashboard navigation</p>
            </div>

            <nav className="flex w-full flex-row gap-1.5 overflow-x-auto px-0 [-ms-overflow-style:none] [scrollbar-width:none] justify-center items-center lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
                <NavLink to='/admin' end className={({ isActive }) => `${tabBase} ${isActive ? "border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] text-white/90"}`}>
                    <p className="text-sm font-semibold max-lg:text-[11px] max-lg:leading-tight max-lg:truncate">Home</p>
                </NavLink>

                <NavLink to='/admin/payments' end className={({ isActive }) => `${tabBase} ${isActive ? "border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] text-white/90"}`}>
                    <p className="text-sm font-semibold max-lg:text-[11px] max-lg:leading-tight max-lg:truncate">Payments</p>
                </NavLink>

                <NavLink to='/admin/upload-mcqs' end className={({ isActive }) => `${tabBase} ${isActive ? "border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] text-white/90"}`}>
                    <p className="text-sm font-semibold max-lg:text-[11px] max-lg:leading-tight max-lg:truncate">Upload Mcqs</p>
                </NavLink>

                <NavLink to='/admin/custom-test-maker' end className={({ isActive }) => `${tabBase} ${isActive ? "border-[#FFC600]/40 bg-[#FFC600]/10 text-[#FFC600]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] text-white/90"}`}>
                    <p className="text-sm font-semibold max-lg:text-[11px] max-lg:leading-tight max-lg:truncate">Custom Test Maker</p>
                </NavLink>
            </nav>
        </aside>

    </>
  )
}

export default AdminNavbar