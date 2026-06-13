import { Link } from "react-router-dom"
import { scrollToComponent } from "../../utils/HelperObjects"
import Testimonials from "../../components/Testimonials";

const TestSeriesLandingPage = () => {
    return (
        <div className="test-series-landing-page font-[Inter] antialiased overflow-x-hidden bg-[#ffffff] text-[#1a1a1a]">

            {/* Eyebrow */}
            <div className="bg-[#F6C90E] px-4 py-3 text-center text-[13px] font-bold leading-[1.5] tracking-[0.5px] text-[#1a1a1a]">
                ⏳ &nbsp;EARLY BIRD ENDS <span className="text-[#1a1a1a]">18TH JUNE</span> &nbsp;·&nbsp; Limited seats available
            </div>

            {/* Nav */}
            <nav className="sticky top-0 z-[99] flex h-[68px] items-center justify-center border-b border-[rgba(255,255,255,0.07)] bg-[#1a1a1a] px-8 max-[640px]:px-4">
                <div className="hidden items-center gap-7 min-[641px]:flex">
                    <button type="button" onClick={() => scrollToComponent("syllabus", "start")} className="text-[0.85rem] cursor-pointer font-semibold text-[rgba(255,255,255,255)] no-underline transition-colors duration-200 hover:text-[#FFC600]">Syllabus</button>
                    <button type="button" onClick={() => scrollToComponent("pricing", "start")} className="text-[0.85rem] cursor-pointer font-semibold text-[rgba(255,255,255,255)] no-underline transition-colors duration-200 hover:text-[#FFC600]">Pricing</button>
                    <Link to="/batch-enrollment" className="text-[0.85rem] cursor-pointer font-semibold text-[rgba(255,255,255,255)] no-underline transition-colors duration-200 hover:text-[#FFC600]">Bahadur Batch</Link>
                    <Link to="/" className="text-[0.85rem] cursor-pointer font-semibold text-[rgba(255,255,255,255)] no-underline transition-colors duration-200 hover:text-[#FFC600]">Home</Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="bg-[#1a1a1a] px-6 pb-14 pt-16 text-center">
                <h1 className="mb-4 text-[clamp(2rem,6.5vw,4.5rem)] font-black uppercase leading-none tracking-[-2px] text-[#ffffff] max-[640px]:tracking-[-1px]">
                    MDCAT ONLINE FLP&apos;S<br />SESSION 2026
                </h1>
                <p className="mx-auto mb-9 max-w-[500px] text-base leading-[1.65] text-[rgba(255,255,255,0.6)]">
                    A series of 8 Sunday tests and 3 grand tests, each crafted strictly around the official MDCAT syllabus and calibrated to the real exam&apos;s difficulty level. And there is a surprise waiting for every student who joins. Watch the video below to find out.
                </p>
                <div className="mx-auto mb-4 aspect-video w-full max-w-[960px] overflow-hidden rounded-lg bg-[#000000] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                    <iframe
                        src="https://www.youtube.com/embed/segTM8x2HWs?start=4142&autoplay=1&mute=0&rel=0&modestbranding=1&enablejsapi=1"
                        allow="encrypted-media; fullscreen"
                        title="MDCATEMY Online FLP's 2026"
                        className="block h-full w-full border-none"
                    />
                </div>
            </section>

            {/* Post Video */}
            <div className="bg-[#ffffff] px-6 py-[52px] text-center">
                <h2 className="text-center text-[clamp(1.8rem,5vw,3rem)] font-black uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                    BUY OUR ONLINE FLP&apos;S AND GET<br />OUR TRAINING GROUND FOR FREE.
                </h2>
            </div>

            {/* Training Grounds */}
            <section className="bg-[#ffffff] px-6 py-20">
                <div className="mx-auto max-w-[920px]">
                    <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[3px] text-[rgba(0,0,0,0.3)]">Included Free - With Every Purchase</p>
                    <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-black uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                        WHAT ARE<br />TRAINING GROUNDS?
                    </h2>
                    <div className="my-7 mb-[52px] border-l-4 border-[#F6C90E] py-1 pl-6">
                        <p className="text-[1.05rem] leading-[1.85] text-[#555555]">
                            Training Grounds is our complete practice system and not just a quiz bank. It is a full environment built to help you train for MDCAT the way a warrior trains for war. You don&apos;t simply sit tests and move on. You build skills, track progress, find your weak points, and sharpen them every single day until exam day.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-[18px] min-[641px]:grid-cols-2">
                        <div className="flex items-start gap-[18px] rounded-[18px] border-[1.5px] border-[#efefef] bg-[#fafafa] p-7 transition-[border-color,box-shadow] duration-200 hover:border-[#F6C90E] hover:shadow-[0_6px_28px_rgba(246,201,14,0.13)]">
                            <div className="mt-0.5 shrink-0 text-[1.7rem] leading-none">🎯</div>
                            <div>
                                <div className="mb-2 text-[0.96rem] font-extrabold text-[#1a1a1a]">Custom Quiz Builder — 8,000+ MCQs</div>
                                <div className="text-[0.86rem] leading-[1.75] text-[#666666]">A massive MCQ bank of over 8,000 questions. Pick any subject, chapter, or topic, set your question count and timer, and fire. Also includes a Smart Quiz Builder mode — discover what it can do when you&apos;re inside.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-[18px] rounded-[18px] border-[1.5px] border-[#efefef] bg-[#fafafa] p-7 transition-[border-color,box-shadow] duration-200 hover:border-[#F6C90E] hover:shadow-[0_6px_28px_rgba(246,201,14,0.13)]">
                            <div className="mt-0.5 shrink-0 text-[1.7rem] leading-none">📋</div>
                            <div>
                                <div className="mb-2 text-[0.96rem] font-extrabold text-[#1a1a1a]">Saved Copy &amp; Mistake Copy</div>
                                <div className="text-[0.86rem] leading-[1.75] text-[#666666]">Star any MCQ during a quiz and it lands in your Saved Copy. Every question you get wrong goes automatically into your Mistake Copy. Two sharp personal collections that make revision targeted and ruthless.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-[18px] rounded-[18px] border-[1.5px] border-[#efefef] bg-[#fafafa] p-7 transition-[border-color,box-shadow] duration-200 hover:border-[#F6C90E] hover:shadow-[0_6px_28px_rgba(246,201,14,0.13)]">
                            <div className="mt-0.5 shrink-0 text-[1.7rem] leading-none">📊</div>
                            <div>
                                <div className="mb-2 text-[0.96rem] font-extrabold text-[#1a1a1a]">Detailed Analytics</div>
                                <div className="text-[0.86rem] leading-[1.75] text-[#666666]">Know exactly how prepared you are — down to every topic, chapter, and subject. Drill-down circles take you from subject level to chapter level to individual topic level, so no blind spot survives.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-[18px] rounded-[18px] border-[1.5px] border-[#efefef] bg-[#fafafa] p-7 transition-[border-color,box-shadow] duration-200 hover:border-[#F6C90E] hover:shadow-[0_6px_28px_rgba(246,201,14,0.13)]">
                            <div className="mt-0.5 shrink-0 text-[1.7rem] leading-none">🔮</div>
                            <div>
                                <div className="mb-2 text-[0.96rem] font-extrabold text-[#1a1a1a]">Score Predictor</div>
                                <div className="text-[0.86rem] leading-[1.75] text-[#666666]">Our algorithm reads your topic-level readiness and predicts your MDCAT score — not just a total, but a separate predicted score for each of the 5 MDCAT subjects. Know your number before the exam does.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-[18px] rounded-[18px] border-[1.5px] border-[#efefef] bg-[#fafafa] p-7 transition-[border-color,box-shadow] duration-200 hover:border-[#F6C90E] hover:shadow-[0_6px_28px_rgba(246,201,14,0.13)]">
                            <div className="mt-0.5 shrink-0 text-[1.7rem] leading-none">🏆</div>
                            <div>
                                <div className="mb-2 text-[0.96rem] font-extrabold text-[#1a1a1a]">National Leaderboard</div>
                                <div className="text-[0.86rem] leading-[1.75] text-[#666666]">See where you rank among all MDCAT aspirants in Pakistan. Rankings are based on your overall preparation score — not just Sunday test results. Compare yourself with your peers and push harder.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-[18px] rounded-[18px] border-[1.5px] border-[#efefef] bg-[#fafafa] p-7 transition-[border-color,box-shadow] duration-200 hover:border-[#F6C90E] hover:shadow-[0_6px_28px_rgba(246,201,14,0.13)]">
                            <div className="mt-0.5 shrink-0 text-[1.7rem] leading-none">✨</div>
                            <div>
                                <div className="mb-2 text-[0.96rem] font-extrabold text-[#1a1a1a]">And Much More</div>
                                <div className="text-[0.86rem] leading-[1.75] text-[#666666]">Training Grounds is constantly growing. There is more inside waiting for you — features that make your preparation smarter, sharper, and more targeted every time you open it.</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-9 rounded-[14px] bg-[#F6C90E] px-7 py-[18px] text-center">
                        <p className="text-[0.92rem] font-extrabold tracking-[0.2px] text-[#1a1a1a]">All of this is completely free for every student who joins MDCATEMY Online FLP&apos;s. 🎁</p>
                    </div>
                </div>
            </section>

            {/* Syllabus */}
            <section id="syllabus" className="bg-[#f5f5f5] px-6 py-[72px]">
                <div className="mx-auto max-w-[900px]">
                    <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[3px] text-[rgba(0,0,0,0.3)]">Full Test Syllabus</p>
                    <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-black uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                        11 TESTS.<br />COMPLETE MDCAT SYLLABUS.
                    </h2>
                    <p className="mt-2.5 text-base leading-[1.65] text-[#666666]">Every test covers new topics. By 9th August every chapter has been tested. Then come the three grand tests.</p>
                    <img
                        src={new URL("../../assets/Images/test-series-schedule.png", import.meta.url).href}
                        alt="MDCAT FLPs Test Series Schedule 2026"
                        className="mt-9 block w-full rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.12)]"
                    />
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="bg-[#f5f5f5] px-6 pb-20 pt-[72px] text-center">
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[3px] text-[rgba(0,0,0,0.3)]">Get the Package</p>
                <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-black uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                    JOIN MDCATEMY<br />ONLINE FLP&apos;S.
                </h2>
                <p className="mx-auto mt-2.5 max-w-[460px] text-base leading-[1.65] text-[#666666]">11 tests covering the complete MDCAT 2026 syllabus — plus Training Grounds, our full practice portal, completely free.</p>

                <div className="relative mx-auto mt-[52px] max-w-[560px] rounded-3xl border border-[#e8e8e8] bg-[#ffffff] px-10 py-12 shadow-[0_8px_48px_rgba(0,0,0,0.1)] max-[640px]:px-6 max-[640px]:py-10">
                    <div className="absolute left-1/2 top-[-16px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F6C90E] px-[22px] py-1.5 text-[0.7rem] font-black uppercase tracking-[1px] text-[#1a1a1a]">
                        30% Early Bird — Ends 18th June
                    </div>

                    <div className="mb-8 mt-2 text-center">
                        <div className="mb-1.5 text-[1.3rem] font-extrabold text-[#1a1a1a] line-through decoration-[#e8273a] decoration-2">PKR 3,000</div>
                        <div className="mb-1.5 text-[clamp(3rem,8vw,4.8rem)] font-black leading-none tracking-[-3px] text-[#1a1a1a]">Rs. 2,500</div>
                        <div className="text-[0.82rem] font-bold text-[#16a34a]">You save Rs. 500 &nbsp;·&nbsp; Price increases on 18th June</div>
                    </div>

                    <div className="mb-8 rounded-[14px] bg-[#1a1a1a] px-5 py-[18px]">
                        <div className="mb-3 text-[0.62rem] font-extrabold uppercase tracking-[2px] text-[rgba(255,255,255,0.35)]">Early Bird Ends In</div>
                        <div className="flex items-center justify-center gap-2.5">
                            <div className="min-w-[44px] text-center">
                                <div className="text-[1.9rem] font-black leading-none tracking-[-1px] text-[#F6C90E]">08</div>
                                <div className="mt-1 text-[0.58rem] uppercase tracking-[1px] text-[rgba(255,255,255,0.28)]">Days</div>
                            </div>
                            <div className="pb-3.5 text-[1.5rem] font-black text-[rgba(255,255,255,0.18)]">:</div>
                            <div className="min-w-[44px] text-center">
                                <div className="text-[1.9rem] font-black leading-none tracking-[-1px] text-[#F6C90E]">14</div>
                                <div className="mt-1 text-[0.58rem] uppercase tracking-[1px] text-[rgba(255,255,255,0.28)]">Hours</div>
                            </div>
                            <div className="pb-3.5 text-[1.5rem] font-black text-[rgba(255,255,255,0.18)]">:</div>
                            <div className="min-w-[44px] text-center">
                                <div className="text-[1.9rem] font-black leading-none tracking-[-1px] text-[#F6C90E]">32</div>
                                <div className="mt-1 text-[0.58rem] uppercase tracking-[1px] text-[rgba(255,255,255,0.28)]">Mins</div>
                            </div>
                            <div className="pb-3.5 text-[1.5rem] font-black text-[rgba(255,255,255,0.18)]">:</div>
                            <div className="min-w-[44px] text-center">
                                <div className="text-[1.9rem] font-black leading-none tracking-[-1px] text-[#F6C90E]">09</div>
                                <div className="mt-1 text-[0.58rem] uppercase tracking-[1px] text-[rgba(255,255,255,0.28)]">Secs</div>
                            </div>
                        </div>
                    </div>

                    <ul className="mb-8 list-none text-left">
                        <li className="block border-none pb-0 pt-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-3.5 py-[5px] text-[0.65rem] font-black uppercase tracking-[1.5px] text-[#ffffff]">📝 &nbsp;Online FLP&apos;s Session</span>
                        </li>
                        <li className="border-none p-0">
                            <div className="my-2 mb-1 h-px bg-[#e8e8e8]" />
                        </li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#1a1a1a]">✓</span>8 Online Sunday Tests (21 June – 9 August)</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#1a1a1a]">✓</span>3 Grand Tests (11, 12 &amp; 14 August)</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#1a1a1a]">✓</span>Immersive Sound Modes During Every Test</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#1a1a1a]">✓</span>Complete Post-Test MCQ Review</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#1a1a1a]">✓</span>PDF Download for Every Test</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#1a1a1a]">✓</span>Advance Syllabus View for Upcoming Tests</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#1a1a1a]">✓</span>Full Test Explanation Lectures</li>

                        <li className="block border-none pb-0 pt-7">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-3.5 py-[5px] text-[0.65rem] font-black uppercase tracking-[1.5px] text-[#ffffff]">🏋️ &nbsp;Training Grounds — Included Free</span>
                        </li>
                        <li className="border-none p-0">
                            <div className="my-2 mb-1 h-px bg-[#e8e8e8]" />
                        </li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#16a34a]">✓</span>Smart Quiz Builder with 8,000+ MCQs</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#16a34a]">✓</span>My Copy — Saved &amp; Mistake</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#16a34a]">✓</span>Analytics Dashboard (Subject → Chapter → Topic)</li>
                        <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#16a34a]">✓</span>Score Predictor — 5 Subjects + Total</li>
                        <li className="flex items-center gap-3 py-2.5 text-[0.9rem] font-semibold text-[#333333]"><span className="shrink-0 font-black text-[#16a34a]">✓</span>National Leaderboard</li>
                    </ul>

                    <Link
                        to="/signup"
                        onClick={() => {
                            localStorage.setItem("student-type","DUAL_ACCESS");
                        }}
                        rel="noopener noreferrer"
                        className="mb-3 block rounded-full bg-[#F6C90E] px-[18px] py-[18px] text-center text-[0.95rem] font-black uppercase tracking-[1.5px] text-[#1a1a1a] no-underline transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#1a1a1a] hover:text-[#F6C90E]"
                    >
                        Join MDCATEMY Online FLP&apos;s
                    </Link>
                    <a
                        href="https://wa.me/923019014141"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-full border-2 border-[#1a1a1a] px-[14px] py-[14px] text-center text-[0.82rem] font-extrabold uppercase tracking-[1px] text-[#1a1a1a] no-underline transition-[background,color] duration-200 hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                    >
                        💬 &nbsp;Talk to Us First
                    </a>
                </div>
            </section>

            {/* Reviews + Free FLP */}
            <section className="bg-[#ffffff] px-6 pb-[70px] pt-20">
                <div className="mx-auto max-w-[1100px]">
                    <h2 className="mb-12 text-center text-[clamp(1.3rem,2.6vw,1.9rem)] font-black leading-[1.35] tracking-[-0.5px] text-[#1a1a1a]">
                        We ran these exact 12 papers last year.<br />
                        <span className="text-[#F6C90E]">Here is what students said.</span>
                    </h2>

                    <div className="mb-4 flex flex-wrap items-center justify-center gap-12 max-[820px]:flex-col max-[820px]:gap-10">
                        <div className="flex flex-[0_1_520px] flex-col items-center">
                            <p className="mb-4 text-[0.7rem] font-extrabold uppercase tracking-[2px] text-[#F6C90E]">★ &nbsp;Topper&apos;s Review</p>
                            <img
                                src={new URL("../../assets/Images/nasrin-full.svg", import.meta.url).href}
                                alt="Nasrin Ghafoor — 175/180 MDCAT 2025"
                                className="block w-full max-w-[520px] mix-blend-multiply"
                            />
                        </div>

                        <div className="flex w-[280px] shrink-0 flex-col items-center rounded-[18px] border border-[#eeeeee] bg-[#fafafa] px-6 py-7 max-[820px]:order-[-1]">
                            <span className="mb-3.5 rounded-full bg-[#e8273a] px-4 py-[5px] text-[12px] font-extrabold uppercase tracking-[0.5px] text-[#ffffff]">It&apos;s Free</span>
                            <h3 className="mb-[18px] text-center text-base font-black uppercase leading-[1.25] tracking-[-0.2px] text-[#1a1a1a]">Last Year&apos;s<br />MDCATEMY FLP&apos;s</h3>
                            <div className="mb-[18px] flex h-[190px] w-[190px] items-center justify-center">
                                <img
                                    src={new URL("../../assets/Images/flps.svg", import.meta.url).href}
                                    alt="MDCAT Full Length Papers"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <p className="mb-5 max-w-[230px] text-center text-[0.86rem] leading-[1.55] text-[#555555]">The same 12 FLPs we conducted last year — covering the whole MDCAT syllabus. Download and practice free.</p>
                            <a
                                href="https://drive.google.com/drive/folders/1Dre1kbfdFibhZ50LWsBByQhlmNZggN3T?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full rounded-full bg-[#F6C90E] px-6 py-[15px] text-center text-[14px] font-black uppercase tracking-[0.8px] text-[#1a1a1a] no-underline transition-[background,color,transform] duration-200 hover:-translate-y-px hover:bg-[#1a1a1a] hover:text-[#ffffff]"
                            >
                                Download Free
                            </a>
                        </div>
                    </div>
                </div>
                
                <Testimonials />
            </section>
        </div>
    )
}

export default TestSeriesLandingPage
