import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'

const AdminDashboardPage = () => {
    return (
        <section className="min-h-screen bg-[#121212] text-white font-[Inter,sans-serif] antialiased">
            <div className="flex min-h-screen">
            
            <AdminNavbar />

            <main className="flex-1 p-6 lg:p-10">
                <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC600]">Welcome back, Admin</p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Dashboard Overview</h2>
                </div>
                <Link to="/" className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-[#FFC600] px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#181A18] transition hover:opacity-90">
                    Back to site
                </Link>
                </header>

                <div className="grid gap-5 md:grid-cols-3">
                <article className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Today Payments</p>
                    <p className="mt-3 text-3xl font-black text-white">Rs. 0</p>
                    <p className="mt-2 text-sm text-white/50">No transactions recorded today.</p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">MCQs in queue</p>
                    <p className="mt-3 text-3xl font-black text-white">0</p>
                    <p className="mt-2 text-sm text-white/50">Upload actions will appear here.</p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Custom tests</p>
                    <p className="mt-3 text-3xl font-black text-white">0</p>
                    <p className="mt-2 text-sm text-white/50">Generated test sets will be shown here.</p>
                </article>
                </div>

                <section className="mt-6 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFC600]">Home</p>
                <h3 className="mt-3 text-xl font-bold text-white">Welcome to your admin dashboard</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65">
                    From here, you can keep track of incoming payments, upload new MCQs, and create custom tests for your students.
                    Use the left menu to open any section and manage your platform smoothly.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full border border-[#FFC600]/40 bg-[#FFC600]/10 px-4 py-1.5 text-xs font-semibold text-[#FFC600]">Easy to use</span>
                    <span className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-white/70">All tools in one place</span>
                    <span className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-white/70">Built for daily management</span>
                </div>
                </section>
            </main>
            </div>
        </section>
    )
}

export default AdminDashboardPage