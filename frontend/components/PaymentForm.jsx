import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import '../src/animation.css';

const selectChevron =
  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23FFC600%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')"

const PaymentForm = () => {
    const {student} = useOutletContext();
    const paymentType = {
        'QUIZ_ONLY' : 3000,
        'TEST_ONLY' : 2000,
        'DUAL_ACCESS' : 5000,
        'TRIBE_MEMBER' : 25000
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [payment, setPayment] = useState(paymentType[student?.role]);
    const [paymentProof, setPaymentProof] = useState('');
    const [coupon, setCoupon] = useState('');
    const [tempCoupon, setTempCoupon] = useState('');
    const [upgradedRole, setUpgradedRole] = useState(student?.role || '');

    const [isCouponCorrect, setIsCouponCorrect] = useState('');
    const [applyLoading, setApplyLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const verifyCoupon = async () => {
        if(coupon?.length === 0) return;

        setApplyLoading(true);

        const res = await fetch(`${API_URL}/users/verify-coupon`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                coupon
            })
        });

        if(res.status === 200){
            setIsCouponCorrect("true");
            setPayment(prev => 0.8 * prev);
        } else {
            setIsCouponCorrect("false");
        }

        setTempCoupon(coupon);

        setCoupon('');
        setApplyLoading(false);
    }

    const submitPayment = async (e) => {
        e.preventDefault();

        setPaymentLoading(true);

        const formData = new FormData();
        formData.append("receipt", paymentProof);
        formData.append("coupon", tempCoupon);
        formData.append("upgrade_role", upgradedRole);

        const res = await fetch(`${API_URL}/users/receipt`,{
            method: "POST",
            credentials: 'include',
            body: formData
        });

        const data = await res.json();
        
        if(data.status === 'success'){
            navigate('/payment-status');
        }

        setPaymentLoading(false);
    }

    useEffect(() => {
        if(student?.upgrade_status === "VERIFIED" ||
            (!student?.upgrade_status && student?.payment_status === "VERIFIED")
        )
            navigate('/dashboard');
    });

    return (
        <main className="fade-in mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
            <section className="rounded-2xl border border-white/[0.1] bg-[#181818] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Payment Details</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Complete your payment</h1>
            <p className="mt-2 text-sm text-white/50">Apply coupon, transfer amount to the account below, then upload proof screenshot.</p>

            <div className="mt-8 space-y-6" >
                <label htmlFor="coupon_code" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Coupon code</label>
                <div className='flex flex-col gap-2 justify-between'>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                        value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                        id="coupon_code"
                        name="coupon_code"
                        type="text"
                        placeholder="Enter coupon code"
                        className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                        />
                    <button
                    type="button"
                    disabled={applyLoading}
                    onClick={verifyCoupon}
                    className={`${applyLoading ? 'cursor-not-allowed' : 'cursor-pointer'} inline-flex items-center justify-center rounded-xl border border-[#FFC600]/55 bg-[#FFC600]/10 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#FFC600] hover:bg-[#FFC600]/15`}
                    >
                        {applyLoading ? 'Processing....' : 'Apply'}
                    </button>
                </div>
                {isCouponCorrect == 'true' ? <p className='text-sm text-green-500'>&nbsp; Coupon verified! Check New Payment!</p> : ''}
                {isCouponCorrect == 'false' ? <p className='text-sm text-red-500'>&nbsp; Invalid Coupon!</p> : ''}
                </div>

                <div>
                <label htmlFor="total_payment" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Total payment (Rs)</label>
                <input
                    id="total_payment"
                    name="total_payment"
                    type="text"
                    value={`Rs ${payment}`}
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

                <form className='flex flex-col gap-4' onSubmit={submitPayment}>
                    {
                        student?.payment_status === 'VERIFIED' && student?.upgrade_status === 'PENDING' ? 
                        <div>
                            <label htmlFor="student_type" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                            Select your new plan
                            </label>
                            <select
                            readOnly={student}
                            value={upgradedRole}
                            onChange={e => setUpgradedRole(e.target.value)}
                            id="student_type"
                            name="student_type"
                            required

                            style={{ backgroundImage: selectChevron }}
                            className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.1] bg-[#1c1c1c] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                            >
                            <option value="" disabled className="bg-[#1c1c1c]">
                                Select student type
                            </option>
                            <option value="QUIZ_ONLY" disabled={student?.role === 'QUIZ_ONLY'} className="bg-[#1c1c1c]">
                                Quiz Builder Student
                            </option>
                            <option value="TRIBE_MEMBER" disabled={student?.role === 'TRIBE_MEMBER'} className="bg-[#1c1c1c]">
                                Study Tribe Student
                            </option>
                            <option value="TEST_ONLY" disabled={student?.role === 'TEST_ONLY'} className="bg-[#1c1c1c]">
                                Test Series Student
                            </option>
                            <option value="DUAL_ACCESS" disabled={student?.role === 'DUAL_ACCESS'} className="bg-[#1c1c1c]">
                                Quiz Builder + Test Series Student
                            </option>
                            </select>
                        </div> :
                        ''
                    }

                    <div>
                    <label htmlFor="payment_screenshot" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Upload payment proof screenshot</label>
                    <label htmlFor="payment_screenshot" className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.18] bg-[#1c1c1c] px-4 py-8 text-center hover:border-[#FFC600]/50">
                        <span className="text-sm font-semibold text-white/85">Choose image file</span>
                        <span className="mt-1 text-xs text-white/45">PNG, JPG, JPEG</span>
                        <span className="mt-1 text-sm font-semibold text-white/85">{paymentProof?.name || 'No File Selected Yet'}</span>
                    </label>
                    <input onChange={e => setPaymentProof(e.target.files[0])} id="payment_screenshot" name="payment_screenshot" type="file" accept="image/*" required className="sr-only" />
                    </div>

                    <button
                    type="submit"
                    disabled={paymentLoading}
                    className={`${paymentLoading ? 'cursor-not-allowed' : 'cursor-pointer'} flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC600] py-4 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_32px_rgba(255,198,0,0.25)] hover:brightness-105`}
                    >
                    {paymentLoading ? 'Processing....' : 'Submit Payment →'}
                    </button>
                </form>
            </div>
            </section>
        </main>
    )
}

export default PaymentForm