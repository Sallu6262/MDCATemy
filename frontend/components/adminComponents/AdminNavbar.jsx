import React from 'react'
import { NavLink } from 'react-router-dom'

const tabBase =
  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 max-lg:flex-1 max-lg:min-w-0 max-lg:flex-col max-lg:justify-center max-lg:gap-1 max-lg:rounded-none max-lg:px-1 max-lg:py-1.5 lg:w-full'

const navLabel =
  'hidden md:inline font-semibold text-[14px] truncate max-lg:text-[9px] max-lg:font-bold max-lg:uppercase max-lg:tracking-[0.05em]'

const AdminNavbar = () => {
  return (
    <>
        <aside className="order-2 fixed bottom-0 left-0 right-0 z-40 w-full border-t border-[#2E302E] bg-[#222422] px-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5 lg:static lg:order-1 lg:z-auto lg:h-screen lg:max-w-[240px] lg:flex-shrink-0 lg:overflow-hidden lg:border-r lg:border-t-0 lg:bg-[#181A18] lg:p-0">
            <div className="mb-5 hidden border-b border-[#2E302E] px-4 pb-5 pt-6 lg:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Admin Panel</p>
                <h1 className="mt-3 text-2xl font-black tracking-tight text-white">MDCATEMY</h1>
                <p className="mt-2 text-sm text-white/50">Dashboard navigation</p>
            </div>

            <nav className="flex w-full flex-row items-stretch justify-center gap-0.5 overflow-x-auto px-0 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:px-2 lg:py-3 [&::-webkit-scrollbar]:hidden">
                <NavLink to='/admin' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10.5l9-7 9 7M5 10v9h14v-9" />
                        </svg>
                        <p className={navLabel}>Home</p>
                      </>
                    )}
                </NavLink>

                <NavLink to='/admin/payments' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2"/>
                          <path d="M2 10h20" strokeWidth="2"/>
                        </svg>
                        <p className={navLabel}>Payments</p>
                      </>
                    )}
                </NavLink>

                <NavLink to='/admin/upload-mcqs' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" />
                        </svg>
                        <p className={navLabel}>Upload Mcqs</p>
                      </>
                    )}
                </NavLink>

                <NavLink to='/admin/custom-test-maker' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6M9 9h6M9 13h6M9 17h6M5 5h.01M5 9h.01M5 13h.01M5 17h.01" />
                        </svg>
                        <p className={navLabel}>Custom Test Maker</p>
                      </>
                    )}
                </NavLink>
            </nav>
        </aside>

    </>
  )
}

export default AdminNavbar