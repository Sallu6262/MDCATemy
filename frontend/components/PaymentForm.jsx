import React from 'react'

const PaymentForm = () => {
    return (
        <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
            <section className="rounded-2xl border border-white/[0.1] bg-[#181818] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Payment Details</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Complete your payment</h1>
            <p className="mt-2 text-sm text-white/50">Apply coupon, transfer amount to the account below, then upload proof screenshot.</p>

            <form className="mt-8 space-y-6" action="#" method="post">
                <div>
                <label htmlFor="coupon_code" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Coupon code</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                    id="coupon_code"
                    name="coupon_code"
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    />
                    <button
                    type="button"
                    className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-[#FFC600]/55 bg-[#FFC600]/10 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#FFC600] hover:bg-[#FFC600]/15"
                    >
                    Apply
                    </button>
                </div>
                </div>

                <div>
                <label htmlFor="total_payment" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Total payment (Rs)</label>
                <input
                    id="total_payment"
                    name="total_payment"
                    type="text"
                    value="Rs 18,000"
                    readOnly
                    className="w-full rounded-xl border border-[#FFC600]/25 bg-[#FFC600]/10 px-4 py-3.5 text-base font-bold text-[#FFC600] outline-none"
                />
                </div>

                <div className="rounded-xl border border-white/[0.1] bg-[#141414]/90 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Transfer to this account</p>
                <div className="mt-4 space-y-3">
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Account name</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">MDCATEMY (PVT) LTD</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Account number</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">0102-7865-4471-00</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Account IBAN</p>
                    <p className="mt-1 break-all text-sm font-semibold text-white/90">PK36HABB0001027865447100</p>
                    </div>
                </div>
                </div>

                <div>
                <label htmlFor="payment_screenshot" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Upload payment proof screenshot</label>
                <label htmlFor="payment_screenshot" className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.18] bg-[#1c1c1c] px-4 py-8 text-center hover:border-[#FFC600]/50">
                    <span className="text-sm font-semibold text-white/85">Choose image file</span>
                    <span className="mt-1 text-xs text-white/45">PNG, JPG, JPEG</span>
                </label>
                <input id="payment_screenshot" name="payment_screenshot" type="file" accept="image/*" required className="sr-only" />
                </div>

                <button
                type="submit"
                className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC600] py-4 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_32px_rgba(255,198,0,0.25)] hover:brightness-105"
                >
                Submit Payment
                <span aria-hidden="true">→</span>
                </button>
            </form>
            </section>
        </main>
    )
}

export default PaymentForm