import React from 'react'
import { Link } from 'react-router-dom'

const PaymentErrorPage = () => {
  return (
    <section className="min-h-screen antialiased bg-[#121212] text-white font-[Inter,sans-serif] flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
        <p className="text-[#FFC600] text-sm font-bold uppercase tracking-[0.2em] mb-4">Pending</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4">Payment In Pending</h1>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10">
            Your payment is not yet verified. Please wait while it is in process.
        </p>
        <Link
            to='/'
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC600] px-8 py-3.5 text-sm font-black uppercase tracking-wider text-[#181A18] no-underline transition hover:opacity-90 hover:shadow-[0_8px_32px_rgba(255,198,0,0.35)]"
        >
            Back to home
        </Link>
        </div>
        <p className="mt-16 text-xs text-white/25">MDCATEMY</p>
    </section>
  )
}

export default PaymentErrorPage