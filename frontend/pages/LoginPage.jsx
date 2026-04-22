import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const {setStudent, setAdmin, admin, student} = useOutletContext();
    const navigate = useNavigate();

    const loginToWebsite = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res1 = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        const data1 = await res1.json();
        
        if(data1.status === 'success'){
            const res2 = await fetch(`${API_URL}/users/me`,{
                credentials: 'include'
            });

            const data2 = await res2.json();

            if(data2.status === 'success'){
                if(data2.data.payment_status && data2.data.payment_status !== 'VERIFIED'){
                    setStudent(data2.data);
                    navigate('/payment-status');
                } else {
                    if(data2.data.role === 'ADMIN'){
                        setAdmin(data2.data);
                        navigate('/admin');
                    }
                    else{
                        setStudent(data2.data);
                        navigate('/dashboard');
                    }
                }
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        if(student && student.payment_status === 'VERIFIED') navigate('/dashboard');
        if(admin) navigate('/admin');
    });

    return (
        <main className="flex flex-1 flex-col justify-start px-6 pb-12 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12 xl:px-24">
            <div className="mx-auto w-full max-w-md">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Welcome back</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Warrior, Login.</h2>
                <p className="mt-2 text-sm text-white/50">Your tribe is waiting. Pick up where you left off.</p>

                <form className="mt-8 space-y-6 sm:mt-10" onSubmit={loginToWebsite}>
                <div>
                    <label htmlFor="email" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Email address</label>
                    <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden="true">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </span>
                    <input value={email} onChange={e => setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" placeholder="your@email.com" required
                        className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/30 outline-none ring-[#FFC600]/0 focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20" />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                    <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-wider text-white/45">Password</label>
                    <button type='button' className="cursor-pointer text-xs font-semibold text-[#FFC600] hover:text-[#ffd54d]">Forgot password?</button>
                    </div>
                    <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden="true">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </span>
                    <input value={password} onChange={e => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required
                        className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] py-3.5 pl-12 pr-12 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20" />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden="true" title="Visibility toggle needs JS">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </span>
                    </div>
                </div>

                <button type="submit" disabled={loading} className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC600] py-4 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_32px_rgba(255,198,0,0.25)] hover:brightness-105`}>
                    {loading ? 'Processing....' : 'Login to my camp'}
                    <span aria-hidden="true">→</span>
                </button>
                </form>

                <p className="mt-10 text-center text-sm text-white/50">
                    New to MDCATEMY?{' '}
                <Link to="/signup" className="font-semibold text-[#FFC600] hover:text-[#ffd54d]">Join the Tribe →</Link>
                </p>
            </div>
        </main>
    )
}

export default LoginPage;