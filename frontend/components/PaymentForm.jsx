import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import '../src/animation.css';
import sendErrorSuccessMessage from '../utils/sendErrorSuccessMessage';

const selectChevron =
  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23FFC600%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')"

const PaymentForm = () => {
    const {student} = useOutletContext();
    const paymentType = {
        'QUIZ_ONLY' : 3000,
        'TEST_ONLY' : 2000,
        'DUAL_ACCESS' : 3500,
        'TRIBE_MEMBER' : 18000
    }

    const discountCoupon10 = new Set(['MDAM001','MDAM002','MDAM003','MDAM004','MDAM005'
        ,'MDAM006','MDAM007','MDAM009','MDAM010','MDAM011'
    ]);

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [payment, setPayment] = useState(paymentType[student?.role ?? "DUAL_ACCESS"]);
    const [paymentProof, setPaymentProof] = useState('');
    const [coupon, setCoupon] = useState('');
    const [tempCoupon, setTempCoupon] = useState('');
    const [upgradedRole, setUpgradedRole] = useState(student?.role || '');
    const [selectedStartDate, setSelectedStartDate] = useState('2026-06-15');
    const [discount, setDiscount] = useState(0.8);

    const [isCouponCorrect, setIsCouponCorrect] = useState('');
    const [applyLoading, setApplyLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [isInstallment, setIsInstallment] = useState(false);

    const [paymentError, setPaymentError] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');

    const verifyCoupon = async () => {
        if(coupon?.length === 0) return;

        setApplyLoading(true);

        if(discountCoupon10.has(coupon)){
            setIsCouponCorrect("true");
            setDiscount(0.9);
        } else {
            const res = await fetch(`${API_URL}/payments/verify-coupon`,{
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
                setDiscount(0.8);
            } else {
                setIsCouponCorrect("false");
            }
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

        const res = await fetch(`${API_URL}/users/receipt`,{
            method: "POST",
            credentials: 'include',
            body: formData
        });

        const data = await res.json();
        
        if(data.status === 'success'){
            setPaymentMessage('');
            setPaymentError(false);
            navigate('/payment-status');
        } else {
            sendErrorSuccessMessage('error', data.message);
            setPaymentMessage(data.message);
            setPaymentError(true);
        }

        setPaymentLoading(false);
    }

    useEffect(() => {
        if(student?.upgrade_status === "VERIFIED" ||
            (!student?.upgrade_status && student?.payment_status === "VERIFIED")
        )
            navigate('/dashboard');
    });

    useEffect(() => {
        const baseAmount = paymentType[student?.role ?? "DUAL_ACCESS"];
        let amount = isInstallment && student?.role === "TRIBE_MEMBER" ? baseAmount / 2 : baseAmount;
        if (isCouponCorrect === 'true'){
            amount *= discount;
        }
        setPayment(amount);
    }, [isInstallment, student?.role, isCouponCorrect]);

    return (
        <main className="fade-in mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
            <section className="rounded-2xl border border-white/[0.1] bg-[#181818] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Payment Details</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Complete your payment</h1>
            <p className="mt-2 text-sm text-white/50">Apply coupon, transfer amount to the account below, then upload proof screenshot.</p>

            <div className="mt-8 space-y-6" >
                {
                    student?.role === "TRIBE_MEMBER" &&
                    <>
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
                    </>
                }

                <div>
                {
                    student?.role === "TRIBE_MEMBER" &&
                    <>
                    <p className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Payment plan</p>
                    <div className="mb-5 space-y-3">
                        <label
                        htmlFor="payment-one-time"
                        className={`block cursor-pointer rounded-2xl border p-4 transition ${
                            !isInstallment
                            ? 'border-[#FFC600] bg-[#FFC600]/10'
                            : 'border-white/[0.12] bg-white/[0.03] hover:border-white/[0.22]'
                        }`}
                        >
                        <div className="flex items-center gap-4">
                            <input
                            id="payment-one-time"
                            type="radio"
                            name="payment_plan"
                            checked={!isInstallment}
                            onChange={() => setIsInstallment(false)}
                            className="h-5 w-5 accent-[#FFC600]"
                            />
                            <div>
                            <p className="text-[1.05rem] font-extrabold text-white/85">One time fee</p>
                            <p className="mt-1 text-sm font-semibold text-white/65">Pay the full amount in a single transfer</p>
                            </div>
                        </div>
                        </label>

                        <label
                        htmlFor="payment-installment"
                        className={`block cursor-pointer rounded-2xl border p-4 transition ${
                            isInstallment
                            ? 'border-[#FFC600] bg-[#FFC600]/10'
                            : 'border-white/[0.12] bg-white/[0.03] hover:border-white/[0.22]'
                        }`}
                        >
                        <div className="flex items-center gap-4">
                            <input
                            id="payment-installment"
                            type="radio"
                            name="payment_plan"
                            checked={isInstallment}
                            onChange={() => setIsInstallment(true)}
                            className="h-5 w-5 accent-[#FFC600]"
                            />
                            <div>
                            <p className="text-[1.05rem] font-extrabold text-white/85">Pay in Installment</p>
                            <p className="mt-1 text-sm font-semibold text-white/65">Pay half now — remaining half due later</p>
                            </div>
                        </div>
                        </label>
                    </div>
                    </>
                }

                <label htmlFor="total_payment" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Total payment (Rs)</label>
                {!isInstallment && payment === paymentType["TRIBE_MEMBER"] && <p className="mb-2 text-base font-bold text-red-500 line-through decoration-red-500">Rs 20000</p>}
                <input
                    id="total_payment"
                    name="total_payment"
                    type="text"
                    value={`Rs ${payment}`}
                    readOnly
                    className="w-full rounded-xl border border-[#FFC600]/25 bg-[#FFC600]/10 px-4 py-3.5 text-base font-bold text-[#FFC600] outline-none"
                />
                </div>

                <div>
                <p className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Select your start date</p>
                <div className="space-y-3">
                    <label
                    htmlFor="start-date-15"
                    className={`block cursor-pointer rounded-2xl border p-4 transition ${
                        selectedStartDate === '2026-06-15'
                        ? 'border-[#FFC600] bg-[#FFC600]/10'
                        : 'border-white/[0.12] bg-white/[0.03] hover:border-white/[0.22]'
                    }`}
                    >
                    <div className="flex items-center gap-4">
                        <input
                        id="start-date-15"
                        type="radio"
                        name="start_date"
                        value="2026-06-15"
                        checked={selectedStartDate === '2026-06-15'}
                        onChange={(e) => setSelectedStartDate(e.target.value)}
                        className="h-5 w-5 accent-[#FFC600]"
                        />
                        <div>
                        <p className="text-[1.05rem] font-extrabold text-white/85">Start 15th June 2026</p>
                        <p className="mt-1 text-[1.05rem] font-extrabold text-white/65">Recommended for all students</p>
                        </div>
                    </div>
                    </label>

                    <label
                    htmlFor="start-date-22"
                    className={`block cursor-pointer rounded-2xl border p-4 transition ${
                        selectedStartDate === '2026-06-22'
                        ? 'border-[#FFC600] bg-[#FFC600]/10'
                        : 'border-white/[0.12] bg-white/[0.03] hover:border-white/[0.22]'
                    }`}
                    >
                    <div className="flex items-center gap-4">
                        <input
                        id="start-date-22"
                        type="radio"
                        name="start_date"
                        value="2026-06-22"
                        checked={selectedStartDate === '2026-06-22'}
                        onChange={(e) => setSelectedStartDate(e.target.value)}
                        className="h-5 w-5 accent-[#FFC600]"
                        />
                        <div>
                        <p className="text-[1.05rem] font-extrabold text-white/85">Start 22nd June 2026</p>
                        <p className="mt-1 text-[1.05rem] font-extrabold text-white/65">Recommended for Federal students</p>
                        </div>
                    </div>
                    </label>
                </div>
                </div>

                <div className="rounded-xl border border-white/[0.1] bg-[#141414]/90 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Transfer to this account</p>
                <div className="mt-4 space-y-5">
                    <div className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFC600]">Easypaisa / JazzCash</p>
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Account name</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">Muhammad Hayan Khan</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Account number</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">03058697159</p>
                    </div>
                    </div>

                    <div className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFC600]">Bank Transfer</p>
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Bank</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">Meezan Bank</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Account title</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">MUHAMMAD HAYAN KHAN</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Account number</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">00300114286728</p>
                    </div>
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
                        <span className="text-sm font-semibold text-white/85">Choose image file (max: 100 KB)</span>
                        <span className="mt-1 text-xs text-white/45">PNG, JPG, JPEG</span>
                        <span className="mt-1 text-sm font-semibold text-white/85">{paymentProof?.name || 'No File Selected Yet'}</span>
                    </label>
                    <input onChange={e => setPaymentProof(e.target.files[0])} id="payment_screenshot" name="payment_screenshot" type="file" accept="image/*" required className="sr-only" />
                    </div>

                    <span className={`inline-block text-lg text-center ${paymentError ? 'text-red-500' : 'text-green-500'}`}>{paymentMessage}</span>

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