import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
    return (
        <main className="flex flex-1 flex-col justify-start px-6 pb-12 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12 xl:px-24">
            <div className="mx-auto w-full max-w-lg">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Join the tribe</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Warrior, enlist.</h2>
                <p className="mt-2 text-sm text-white/50">Tell us who you are — we’ll shape your camp around your story.</p>

                <form className="mt-10 space-y-5" action="#" method="post">
                    <div>
                        <label htmlFor="full_name" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Full name</label>
                        <input id="full_name" name="full_name" type="text" autoComplete="name" required placeholder="As on CNIC / B-form"
                            className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20" />
                    </div>

                    <div>
                        <label htmlFor="father_name" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Father name</label>
                        <input id="father_name" name="father_name" type="text" required placeholder="Father's full name"
                            className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20" />
                    </div>

                    <fieldset>
                        <legend className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Gender</legend>
                        <div className="flex flex-wrap gap-4">
                            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/85">
                                <input type="radio" name="gender" value="male" className="h-4 w-4 border-white/20 bg-[#1c1c1c] text-[#FFC600] focus:ring-[#FFC600]/40" />
                                Male
                            </label>
                            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/85">
                                <input type="radio" name="gender" value="female" className="h-4 w-4 border-white/20 bg-[#1c1c1c] text-[#FFC600] focus:ring-[#FFC600]/40" />
                                Female
                            </label>
                            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/85">
                                <input type="radio" name="gender" value="rather_not_say" className="h-4 w-4 border-white/20 bg-[#1c1c1c] text-[#FFC600] focus:ring-[#FFC600]/40" />
                                Rather not say
                            </label>
                        </div>
                    </fieldset>

                    <div>
                        <label htmlFor="whatsapp_local" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">WhatsApp number</label>
                        <div className="flex rounded-xl border border-white/[0.1] bg-[#1c1c1c] focus-within:border-[#FFC600]/50 focus-within:ring-2 focus-within:ring-[#FFC600]/20">
                            <span className="flex shrink-0 items-center border-r border-white/[0.08] px-4 text-sm font-semibold text-[#FFC600]">+92</span>
                            <input id="whatsapp_local" name="whatsapp_local" type="tel" inputMode="numeric" pattern="[0-9]*" maxLength="10" required placeholder="3XXXXXXXXX"
                                className="min-w-0 flex-1 bg-transparent py-3.5 pr-4 pl-3 text-sm text-white placeholder:text-white/30 outline-none" />
                        </div>
                        <p className="mt-1.5 text-xs text-white/35">Pakistan numbers only — country code is fixed.</p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="province" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Province</label>
                            <select id="province" name="province" required
                                className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.1] bg-[#1c1c1c] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                                style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23FFC600%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')" }}>
                                <option value="" disabled selected className="bg-[#1c1c1c]">Select province</option>
                                <option value="punjab" className="bg-[#1c1c1c]">Punjab</option>
                                <option value="sindh" className="bg-[#1c1c1c]">Sindh</option>
                                <option value="kpk" className="bg-[#1c1c1c]">Khyber Pakhtunkhwa</option>
                                <option value="balochistan" className="bg-[#1c1c1c]">Balochistan</option>
                                <option value="islamabad" className="bg-[#1c1c1c]">Islamabad Capital Territory</option>
                                <option value="gb" className="bg-[#1c1c1c]">Gilgit-Baltistan</option>
                                <option value="ajk" className="bg-[#1c1c1c]">Azad Jammu & Kashmir</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="city" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">City</label>
                            <input id="city" name="city" type="text" required placeholder="e.g. Lahore"
                                className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20" />
                        </div>
                    </div>

                    <button type="submit" className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC600] py-4 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_32px_rgba(255,198,0,0.25)] transition hover:brightness-105">
                        Create my camp
                        <span aria-hidden="true">→</span>
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-white/50">
                    Already enlisted?
                    <Link to="/login" className="font-semibold text-[#FFC600] transition hover:text-[#ffd54d]"> Warrior, login →</Link>
                </p>
            </div>
        </main>
    )
}

export default SignUpPage