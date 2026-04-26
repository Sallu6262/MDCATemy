import React from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'

const tabBase =
  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 max-lg:flex-1 max-lg:min-w-0 max-lg:flex-col max-lg:justify-center max-lg:gap-1 max-lg:rounded-none max-lg:px-1 max-lg:py-1.5 lg:w-full'

const navLabel =
  'hidden md:inline font-semibold text-[14px] truncate max-lg:text-[9px] max-lg:font-bold max-lg:uppercase max-lg:tracking-[0.05em]'

const UserNavbar = () => {
    const {student} = useOutletContext();
    let name = student?.name;
    name = name?.split(' ')?.map(n => n[0].toUpperCase()).slice(0,2);

    return (
        <aside className="order-2 fixed bottom-0 left-0 right-0 z-40 w-full border-t border-[#2E302E] bg-[#222422] px-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5 lg:static lg:order-1 lg:z-auto lg:h-screen lg:max-w-[240px] lg:flex-shrink-0 lg:overflow-hidden lg:border-r lg:border-t-0 lg:bg-[#181A18] lg:p-0">
            <div className="mb-5 hidden border-b border-[#2E302E] px-4 pb-5 pt-6 lg:block">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Student Panel</p>
                    <h1 className="mt-3 text-2xl font-black tracking-tight text-white">MDCATEMY</h1>
                    <p className="mt-2 text-sm text-white/50">Student navigation</p>
            </div>

            <nav className="flex w-full flex-row items-stretch justify-center gap-0.5 overflow-x-auto px-0 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:px-2 lg:py-3 [&::-webkit-scrollbar]:hidden">
                <NavLink to='/dashboard' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                            <rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/>
                            <rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>
                        </svg>
                        <p className={navLabel}>My Camp</p>
                      </>
                    )}
                </NavLink>

                <NavLink to='/quiz-builder' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                        </svg>
                        <p className={navLabel}>Quiz Builder</p>
                      </>
                    )}
                </NavLink>

                <NavLink to='/test-series' className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/>
                        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
                        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
                        </svg>
                        <p className={navLabel}>Test Series</p>
                      </>
                    )}
                </NavLink>

                <NavLink to='/my-copy' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <rect x="2" y="3" width="20" height="5" rx="1"/>
                        <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
                        <path d="M10 12h4"/>
                        </svg>
                        <p className={navLabel}>My Copy</p>
                      </>
                    )}
                </NavLink>

                <NavLink to='/analytics' end className={({ isActive }) => `${tabBase} ${isActive ? "bg-[#FFC600]/10 text-[#FFC600]" : "text-[#A8ACA8] hover:bg-[#2A2C2A]/40 hover:text-white"}`}>
                    {({ isActive }) => (
                      <>
                        <div className={`hidden lg:block absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <div className={`lg:hidden absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full ${isActive ? 'bg-[#FFC600]' : 'bg-transparent'}`} />
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                        </svg>
                        <p className={navLabel}>Analytics</p>
                      </>
                    )}
                </NavLink>
            </nav>

            <div className="border-t border-[#2E302E] py-3 flex items-center gap-3 px-3">
                <div className="rounded-full bg-[#FFC600]/15 border border-[#FFC600]/30 flex items-center justify-center flex-shrink-0 w-[32px] h-[32px]">
                <span className="font-[Poppins] font-black text-[#FFC600] text-[11px]">{name}</span>
                </div>
                <div className="min-w-0">
                <p className="font-bold text-[16px] text-white leading-tight">{student?.name}</p>
                <p className="text-[12px] text-[#A8ACA8] uppercase tracking-[0.1em]">Warrior</p>
                </div>
            </div>
        </aside>
    )
}

export default UserNavbar