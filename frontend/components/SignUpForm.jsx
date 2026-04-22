import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'

const selectChevron =
  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23FFC600%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')"

const SignUpForm = ({setStep}) => {
    const {student, setStudent} = useOutletContext();

    const [userName, setUserName] = useState(student?.name || '');
    const [fatherName, setFatherName] = useState(student?.father_name || '');
    const [gender, setGender] = useState(student?.gender || '');
    const [number, setNumber] = useState(student?.phone || '');
    const [province, setProvince] = useState(student?.province || '');
    const [city, setCity] = useState(student?.city || '');
    const [studentType, setStudentType] = useState(student?.role || '');
    const [sscMarks, setSSCMarks] = useState('');
    const [fscMarks1, setFSCMarks1] = useState('');
    const [fscMarks2, setFSCMarks2] = useState('');
    const [mdcatScore, setMdcatScore] = useState(student?.prev_mdcat_score || '');
    const [email, setEmail] = useState(student?.email || '');
    const [password, setPassword] = useState(student?.password || '');
    const [academicStatus, setAcademicStatus] = useState(student?.academic_status || '');

    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const signupToWebsite = async (e) => {
        e.preventDefault();

        if(student){
            setStep(prev => prev == 1 ? prev + 1 : prev);
            return;
        }

        setLoading(true);

        const res = await fetch(`${API_URL}/users/signup`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                father_name: fatherName,
                gender,
                role: studentType,
                email,
                password,
                phone: `+92${number}`,
                province,
                city,
                academic_status: academicStatus,
                matric_percentage: Number(((sscMarks / 1100) * 100).toFixed(2)) || 0,
                fsc_percentage: Number((((fscMarks2 ?? fscMarks1) / (fscMarks2 ? 1100 : 550)) * 100).toFixed(2)) || 0,
                prev_mdcat_score: mdcatScore || 0
            })
        });

        const data = await res.json();
        
        if(data.status === 'success'){
            const res2 = await fetch(`${API_URL}/users/me`,{
                credentials: 'include'
            });

            const data2 = await res2.json();

            if(data2.status === 'success'){
                setStudent(data2.data);
                setStep(prev => prev == 1 ? prev + 1 : prev);
            }

        }

        setLoading(false);
    }

    const upgradePlan = () => {
        if(student.payment_status === 'VERIFIED'){
            setStep(prev => prev == 1 ? prev + 1 : prev);
        }
    }

    return (
        <main className="flex flex-1 flex-col justify-start px-6 pb-12 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12 xl:px-24">
            <div className="mx-auto w-full max-w-lg">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC600]">Join the tribe</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Warrior, enlist.</h2>
                <p className="mt-2 text-sm text-white/50">Tell us who you are — we’ll shape your camp around your story.</p>

                <form className="mt-8 space-y-5 sm:mt-10" onSubmit={signupToWebsite}>
                <div>
                    <label htmlFor="full_name" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Full name
                    </label>
                    <input
                    readOnly={student}
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="As on CNIC / B-form"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    />
                </div>

                <div>
                    <label htmlFor="father_name" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Father name
                    </label>
                    <input
                    readOnly={student}
                    value={fatherName}
                    onChange={e => setFatherName(e.target.value)}
                    id="father_name"
                    name="father_name"
                    type="text"
                    required
                    placeholder="Father's full name"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    />
                </div>

                <fieldset>
                    <legend className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">Gender</legend>
                    <div className="flex flex-wrap gap-4">
                    <select
                        disabled={student}
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        id="gender"
                        name="gender"
                        required
                        style={{ backgroundImage: selectChevron }}
                        className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.1] bg-[#1c1c1c] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    >
                        <option value="" disabled className="bg-[#1c1c1c]">
                        Select Gender
                        </option>
                        <option value="M" className="bg-[#1c1c1c]">
                        M
                        </option>
                        <option value="F" className="bg-[#1c1c1c]">
                        F
                        </option>
                    </select>
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="whatsapp_local" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    WhatsApp number
                    </label>
                    <div className="flex rounded-xl border border-white/[0.1] bg-[#1c1c1c] focus-within:border-[#FFC600]/50 focus-within:ring-2 focus-within:ring-[#FFC600]/20">
                    <span className="flex shrink-0 items-center border-r border-white/[0.08] px-4 text-sm font-semibold text-[#FFC600]">
                        +92
                    </span>
                    <input
                        readOnly={student}
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        id="whatsapp_local"
                        name="whatsapp_local"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        required
                        placeholder="3XXXXXXXXX"
                        className="min-w-0 flex-1 bg-transparent py-3.5 pr-4 pl-3 text-sm text-white placeholder:text-white/30 outline-none"
                    />
                    </div>
                    <p className="mt-1.5 text-xs text-white/35">Pakistan numbers only — country code is fixed.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                    <label htmlFor="province" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                        Province
                    </label>
                    <select
                        disabled={student}
                        value={province}
                        onChange={e => setProvince(e.target.value)}
                        id="province"
                        name="province"
                        required
                        style={{ backgroundImage: selectChevron }}
                        className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.1] bg-[#1c1c1c] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    >
                        <option value="" disabled className="bg-[#1c1c1c]">
                        Select province
                        </option>
                        <option value="punjab" className="bg-[#1c1c1c]">
                        Punjab
                        </option>
                        <option value="sindh" className="bg-[#1c1c1c]">
                        Sindh
                        </option>
                        <option value="kpk" className="bg-[#1c1c1c]">
                        Khyber Pakhtunkhwa
                        </option>
                        <option value="balochistan" className="bg-[#1c1c1c]">
                        Balochistan
                        </option>
                        <option value="islamabad" className="bg-[#1c1c1c]">
                        Islamabad Capital Territory
                        </option>
                        <option value="gb" className="bg-[#1c1c1c]">
                        Gilgit-Baltistan
                        </option>
                        <option value="ajk" className="bg-[#1c1c1c]">
                        Azad Jammu & Kashmir
                        </option>
                    </select>
                    </div>
                    <div>
                    <label htmlFor="city" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                        City
                    </label>
                    <input
                        readOnly={student}
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        id="city"
                        name="city"
                        type="text"
                        required
                        placeholder="e.g. Lahore"
                        className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="mdcat_status" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    MDCAT status
                    </label>
                    <select
                    disabled={student}
                    value={academicStatus}
                    onChange={e => setAcademicStatus(e.target.value)}
                    id="mdcat_status"
                    name="mdcat_status"
                    required
                    style={{ backgroundImage: selectChevron }}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.1] bg-[#1c1c1c] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    >
                    <option value="" disabled className="bg-[#1c1c1c]">
                        Select status
                    </option>
                    <option value="fresher" className="bg-[#1c1c1c]">
                        Fresher
                    </option>
                    <option value="repeater" className="bg-[#1c1c1c]">
                        Repeater
                    </option>
                    </select>
                </div>

                <div>
                    <label htmlFor="student_type" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Student type
                    </label>
                    <select
                    disabled={student}
                    value={studentType}
                    onChange={e => setStudentType(e.target.value)}
                    id="student_type"
                    name="student_type"
                    required

                    style={{ backgroundImage: selectChevron }}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.1] bg-[#1c1c1c] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    >
                    <option value="" disabled className="bg-[#1c1c1c]">
                        Select student type
                    </option>
                    <option value="QUIZ_ONLY" className="bg-[#1c1c1c]">
                        Quiz Builder Student
                    </option>
                    <option value="TRIBE_MEMBER" className="bg-[#1c1c1c]">
                        Study Tribe Student
                    </option>
                    <option value="TEST_ONLY" className="bg-[#1c1c1c]">
                        Test Series Student
                    </option>
                    <option value="DUAL_ACCESS" className="bg-[#1c1c1c]">
                        Quiz Builder + Test Series Student
                    </option>
                    </select>
                </div>

                <div>
                    <label htmlFor="ssc_year" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                        {student?.matric_percentage ? 'SSC Percentage' : 'SSC Marks'}
                    </label>
                    <input
                        readOnly={student}
                        value={student?.matric_percentage || sscMarks}
                        onChange={e => setSSCMarks(e.target.value)}
                        id="ssc_year"
                        name="ssc_year"
                        type="number"
                        required
                        min={0}
                        max={student?.matric_percentage ? 100 : 1100}
                        step={1}
                        placeholder="e.g. 1050"
                        className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    />
                </div>

                <div className={`grid gap-5 {student ? 'sm:grid-cols-1' : 'sm:grid-cols-2'}`}>
                    {
                        student ? 
                        <div>
                            <label htmlFor="fsc_year" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                                FSC Percentage
                            </label>
                            <input
                                readOnly={student}
                                value={student?.fsc_percentage}
                                id="fsc_year"
                                name="fsc_year"
                                type="number"
                                min={0}
                                max={100}
                                step={1}
                                placeholder="e.g. 1050"
                                className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                            />
                        </div> :
                        <>
                            <div>
                                <label htmlFor="fsc_year1" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                                    FSC first year marks
                                </label>
                                <input
                                    value={fscMarks1}
                                    onChange={e => setFSCMarks1(e.target.value)}
                                    id="fsc_year1"
                                    name="fsc_year1"
                                    type="number"
                                    required
                                    min={0}
                                    max={550}
                                    step={1}
                                    placeholder="e.g. 520"
                                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                                />
                            </div>
                            <div>
                            <label htmlFor="fsc_year2" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                                FSC second year marks
                            </label>
                            <input
                                value={fscMarks2}
                                onChange={e => setFSCMarks2(e.target.value)}
                                id="fsc_year2"
                                name="fsc_year2"
                                type="number"
                                min={0}
                                max={1100}
                                step={1}
                                placeholder="e.g. 540"
                                className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                            />
                            </div>
                        </>
                    }
                </div>

                {
                    academicStatus === 'repeater' ? 
                    <div>
                        <label htmlFor="prev_mdcat" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                        Previous MDCAT score
                        </label>
                        <input
                        readOnly={student}
                        value={mdcatScore}
                        onChange={e => setMdcatScore(e.target.value)}
                        id="prev_mdcat"
                        name="prev_mdcat"
                        type="number"
                        required
                        min={0}
                        max={200}
                        step={1}
                        placeholder="e.g 150"
                        className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                        />
                    </div> : 
                    ''
                }

                <div>
                    <label htmlFor="email" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Email address
                    </label>
                    <input
                    readOnly={student}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-white/45">
                    Password
                    </label>
                    <input
                    readOnly={student}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#1c1c1c] px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FFC600]/50 focus:ring-2 focus:ring-[#FFC600]/20"
                    />
                </div>

                <div className={`mt-2 grid gap-3 ${student?.pending_status === 'VERIFIED' ? 'sm:grid-cols-2': 'sm:grid-cols-1'}`}>
                    {
                        student?.pending_status === 'VERIFIED' ? 
                        <button
                            type="button"
                            onClick={upgradePlan}
                            className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} inline-flex w-full items-center justify-center rounded-xl border border-[#FFC600]/55 bg-[#FFC600]/10 py-4 text-sm font-black uppercase tracking-wider text-[#FFC600] transition hover:bg-[#FFC600]/15`}
                        >
                            {loading ? 'Processing...' : 'Upgrade Plan'}
                        </button> :
                        <button
                            type="submit"
                            className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC600] py-4 text-sm font-black uppercase tracking-wider text-[#181A18] shadow-[0_8px_32px_rgba(255,198,0,0.25)] transition hover:brightness-105`}
                        >
                            {loading ? 'Processing...' : 'Next'}
                            <span aria-hidden="true">→</span>
                        </button>
                    }
                </div>
                </form>

                <p className="mt-10 text-center text-sm text-white/50">
                Already enlisted?{' '}
                <Link to="/login" className="font-semibold text-[#FFC600] transition hover:text-[#ffd54d]">
                    Warrior, login →
                </Link>
                </p>
            </div>
        </main>
    )
}

export default SignUpForm
