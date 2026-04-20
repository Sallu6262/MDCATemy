import React from 'react'
import AdminDashboardHeader from '../components/adminComponents/AdminDashboardHeader'

const AdminPaymentsPage = () => {
  return (
    <>
        <main className="flex-1 p-6 lg:p-10">
            <AdminDashboardHeader />

            <section className="mt-6 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFC600]">Payments</p>
            <h3 className="mt-3 text-xl font-bold text-white">Payment Review</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65">
                Review the submitted payment screenshot and confirm the user details before approving or rejecting the payment.
            </p>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <article className="rounded-xl border border-white/10 bg-[#121212] p-4">
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white/80">Payment Screenshot</p>
                    <p className="text-xs text-white/45">Image 1 of 3</p>
                </div>

                <div>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
                        <img
                        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
                        alt="Payment proof"
                        className="block h-[340px] w-full object-cover"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-6">
                        <button
                        type="button"
                        aria-label="Previous image"
                        className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-full border border-[#FFC600]/40 bg-[#FFC600] text-lg font-black text-[#181A18] shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition hover:opacity-90"
                        >
                        ‹
                        </button>

                        <button
                        type="button"
                        aria-label="Next image"
                        className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-full border border-[#FFC600]/40 bg-[#FFC600] text-lg font-black text-[#181A18] shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition hover:opacity-90"
                        >
                        ›
                        </button>
                    </div>
                </div>
                </article>

                <article className="rounded-xl border border-white/10 bg-[#121212] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFC600]">User details</p>

                <div className="mt-4 space-y-3">
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">Name</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">Ali Raza</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">Email</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">ali.raza@email.com</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">Gender</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">Male</p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-[11px] uppercase tracking-wide text-white/45">Date of Birth</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">12 Aug 2006</p>
                    </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <button
                    type="button"
                    className="cursor-pointer rounded-lg bg-[#FFC600] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#181A18] transition hover:opacity-90"
                    >
                    Verify
                    </button>
                    <button
                    type="button"
                    className="cursor-pointer rounded-lg border border-red-400/50 bg-red-500/10 px-5 py-3 text-sm font-black uppercase tracking-wider text-red-200 transition hover:bg-red-500/20"
                    >
                    Reject
                    </button>
                    <button
                    type="button"
                    className="cursor-pointer rounded-lg bg-[#FFC600] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#181A18] transition hover:opacity-90"
                    >
                    Upgrade Plan
                    </button>
                </div>
                </article>
            </div>
            </section>
        </main>
    </>
  )
}

export default AdminPaymentsPage