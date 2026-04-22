import React from 'react'
import AdminDashboardHeader from '../components/adminComponents/AdminDashboardHeader'
import { useState } from 'react'
import { useEffect } from 'react';
import ErrorComponent from '../components/ErrorComponent'
import { useNavigate, useOutletContext } from 'react-router-dom';

const AdminPaymentsPage = () => {
    const [users, setUsers] = useState([]);
    const [userReceipt, setUserReceipt] = useState(' ');
    const [userNumber, setUserNumber] = useState(0);

    const [verifyLoading, setVerifyLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const decrementUser = () => {
        setUserNumber(prev => prev > 0 ? prev - 1 : prev);
        fetchUserReceipt(users, userNumber - 1);
    }

    const incrementUser = () => {
        setUserNumber(prev => prev < users?.length - 1 ? prev + 1 : prev);
        fetchUserReceipt(users, userNumber + 1);
    }

    const fetchUserReceipt = async(usersArray, index) => {
        if(index >= 0 && index < usersArray?.length){
            const res = await fetch(`${API_URL}/payments/receipt/${usersArray[index]?.email}`);
            const image = await res.blob();
            setUserReceipt(URL.createObjectURL(image));
        } else {
            setUserReceipt(' ');
        }
    }

    const verifyPayment = async () => {
        setVerifyLoading(true);

        const res = await fetch(`${API_URL}/payments/verify`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: users[userNumber]?.email,
                role: users[userNumber]?.role
            })
        });

        if(res.status === 200){
            setUsers(prev => {
                const updated = prev.filter(user => user.email !== prev[userNumber]?.email);
                fetchUserReceipt(updated, 0);
                return updated;
            });
            setUserNumber(0);
        }

        setVerifyLoading(false);
    }

    const rejectPayment = async () => {
        setRejectLoading(true);

        const res = await fetch(`${API_URL}/payments/reject`,{
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: users[userNumber]?.email
            })
        });

        if(res.status === 200){
            setUsers(prev => {
                const updated = prev.filter(user => user.email !== prev[userNumber]?.email);
                fetchUserReceipt(updated, 0);
                return updated;
            });
            setUserNumber(0);
        }

        setRejectLoading(false);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`${API_URL}/payments/pending`,{
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();
            
            if(data.status === 'success'){
                setUsers(data.data);

                if(data.data?.length > 0){
                    const res = await fetch(`${API_URL}/payments/receipt/${data.data?.[0].email}`);
                    const image = await res.blob();
                    setUserReceipt(URL.createObjectURL(image));
                }
            }
        }

        fetchUsers();
    },[]);

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

                {
                    users?.length > 0 ? 
                    <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <article className="rounded-xl border border-white/10 bg-[#121212] p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold text-white/80">Payment Screenshot</p>
                        <p className="text-xs text-white/45">Image {userNumber + 1} of {users?.length}</p>
                    </div>

                    <div>
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
                            <img
                            src={userReceipt}
                            alt="Payment proof"
                            className="block h-[340px] w-full object-cover"
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-6">
                            <button
                            onClick={decrementUser}
                            type="button"
                            aria-label="Previous image"
                            className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-full border border-[#FFC600]/40 bg-[#FFC600] text-lg font-black text-[#181A18] shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition hover:opacity-90"
                            >
                            ‹
                            </button>

                            <button
                            onClick={incrementUser}
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
                        <p className="mt-1 md:text-base text-sm text-white/90">{users[userNumber]?.name}</p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                        <p className="text-[11px] uppercase tracking-wide text-white/45">Email</p>
                        <p className="mt-1 md:text-base text-sm text-white/90">{users[userNumber]?.email}</p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                        <p className="text-[11px] uppercase tracking-wide text-white/45">Coupon</p>
                        <p className="mt-1 md:text-base text-sm text-white/90">{users[userNumber]?.coupon || 'User entered invalid coupon OR no coupon for this user'}</p>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                        <p className="text-[11px] uppercase tracking-wide text-white/45">Upgrade Role</p>
                        <p className="mt-1 md:text-base text-sm text-white/90">{users[userNumber]?.upgrade_role ? 'This user wants to upgrade' : 'This is a new user'}</p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <button
                        onClick={verifyPayment}
                        type="button"
                        className={`${verifyLoading ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-lg bg-[#FFC600] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#181A18] transition hover:opacity-90`}
                        >
                        {users[userNumber]?.upgrade_status === "PENDING" ? `${verifyLoading ? 'Processing...' : 'Upgrade'}` : `${verifyLoading ? 'Processing...' : 'Verify'}`}
                        </button>
                        <button
                        onClick={rejectPayment}
                        type="button"
                        className={`${verifyLoading ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-lg border border-red-400/50 bg-red-500/10 px-5 py-3 text-sm font-black uppercase tracking-wider text-red-200 transition hover:bg-red-500/20`}
                        >
                        Reject
                        </button>
                    </div>
                    </article>
                </div> :
                <div className="mt-6 rounded-xl border border-white/10 bg-[#121212] p-10 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFC600]">All Caught Up</p>
                    <h4 className="mt-3 text-lg font-bold text-white">No pending payments right now</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                        There are currently no users with pending payments.
                    </p>
                </div>
                }
                
                </section>
            </main>
        </>
    )
}

export default AdminPaymentsPage