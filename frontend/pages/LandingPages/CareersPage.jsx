import '../../src/animation.css';

const CareersPage = () => {
    return (
        <div className="font-[Inter] antialiased overflow-x-hidden bg-white text-[#1a1a1a]">
        <section className="bg-[#1a1a1a] py-20 px-6 text-center">
            <div className="max-w-[680px] mx-auto">
            <div className="inline-block text-[#F6C90E] text-[11px] font-bold tracking-[3px] uppercase mb-5">
                Careers at Mdcatemy
            </div>
            <h1 className="font-black text-[#ffffff] uppercase leading-none mb-5 text-[clamp(2.4rem,6.5vw,4.6rem)] tracking-[-2px]">
                BECOME AN
                <br />
                <span className="text-[#F6C90E]">AMBASSADOR</span>
            </h1>
            <p className="text-[1rem] leading-[1.75] text-[rgba(255,255,255,0.5)]">
                Represent Mdcatemy. Empower students around you. Grow with us.
            </p>
            </div>
        </section>

        <section className="bg-white px-6 pt-[72px] pb-[72px]">
            <div className="max-w-[780px] mx-auto">
            <div className="text-center mb-10">
                <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#F6C90E] mb-3">Watch This First</p>
                <h2 className="font-black text-[#1a1a1a] uppercase leading-tight text-[clamp(1.6rem,4vw,2.2rem)] tracking-[-0.5px]">
                EVERYTHING YOU NEED
                <br />
                TO KNOW
                </h2>
            </div>

            <div className="max-w-[380px] w-full mx-auto max-sm:max-w-full">
                <div className="relative w-full pb-[177.78%] rounded-[20px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.22)] bg-black">
                <iframe
                    src="https://www.instagram.com/reel/DWpCl95DCVt/embed"
                    scrolling="no"
                    allowTransparency="true"
                    allow="encrypted-media; autoplay"
                    title="Mdcatemy Ambassador Program Reel"
                    className="absolute top-0 left-0 w-full h-full border-0"
                />
                </div>
            </div>

            <p className="text-center text-[0.82rem] mt-5 text-[#999]">
                Can&apos;t see the reel?{' '}
                <a
                href="https://www.instagram.com/reel/DWpCl95DCVt/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#1a1a1a] no-underline hover:text-[#F6C90E] transition-colors duration-200"
                >
                Open on Instagram →
                </a>
            </p>
            </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 pt-[72px] pb-[88px]">
            <div className="max-w-[680px] mx-auto text-center">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#F6C90E] mb-4">Ambassador Program</p>
            <h2 className="font-black text-[#ffffff] uppercase leading-tight mb-5 text-[clamp(1.6rem,4vw,2.2rem)] tracking-[-0.5px]">
                WHY JOIN US?
            </h2>
            <p className="text-[1rem] text-[rgba(255,255,255,0.5)] leading-[1.75] mb-0">
                The Mdcatemy Ambassador Program is for motivated MDCAT students who want to do more than just study. Represent a brand that actually cares about students, earn real rewards, and help your peers find the right path.
            </p>

            <div className="grid grid-cols-2 gap-4 my-9 mb-10 text-left max-sm:grid-cols-1">
                <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl px-[22px] py-5">
                <div className="w-2 h-2 bg-[#F6C90E] rounded-full mb-2.5" />
                <div className="text-[0.88rem] font-extrabold text-[#ffffff] uppercase tracking-[0.3px] mb-1.5">Earn Rewards</div>
                <div className="text-[0.85rem] text-[rgba(255,255,255,0.5)] leading-[1.6]">Get rewarded for every successful referral you bring to Mdcatemy.</div>
                </div>

                <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl px-[22px] py-5">
                <div className="w-2 h-2 bg-[#F6C90E] rounded-full mb-2.5" />
                <div className="text-[0.88rem] font-extrabold text-[#ffffff] uppercase tracking-[0.3px] mb-1.5">Official Recognition</div>
                <div className="text-[0.85rem] text-[rgba(255,255,255,0.5)] leading-[1.6]">Be featured on Mdcatemy&apos;s official platforms as a campus ambassador.</div>
                </div>

                <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl px-[22px] py-5">
                <div className="w-2 h-2 bg-[#F6C90E] rounded-full mb-2.5" />
                <div className="text-[0.88rem] font-extrabold text-[#ffffff] uppercase tracking-[0.3px] mb-1.5">Build Your Brand</div>
                <div className="text-[0.85rem] text-[rgba(255,255,255,0.5)] leading-[1.6]">Develop real-world communication, outreach, and leadership skills.</div>
                </div>

                <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl px-[22px] py-5">
                <div className="w-2 h-2 bg-[#F6C90E] rounded-full mb-2.5" />
                <div className="text-[0.88rem] font-extrabold text-[#ffffff] uppercase tracking-[0.3px] mb-1.5">Be Part of the Mission</div>
                <div className="text-[0.85rem] text-[rgba(255,255,255,0.5)] leading-[1.6]">Help other MDCAT students find the guidance they need to succeed.</div>
                </div>
            </div>

            <a
                href="https://forms.gle/1y63gdgQ1LPAKHQL9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#F6C90E] text-[#1a1a1a] text-[15px] font-black tracking-[1.5px] uppercase no-underline px-14 py-5 rounded-full transition-all duration-200 hover:bg-[#ffffff] hover:text-[#1a1a1a] hover:-translate-y-px max-sm:w-full max-sm:text-center max-sm:px-6 max-sm:py-[18px]"
            >
                Join as Ambassador
            </a>
            <p className="text-[0.78rem] mt-4 text-[rgba(255,255,255,0.25)]">
                Fill out a short application form — we review every submission
            </p>
            </div>
        </section>
        </div>
    )
}

export default CareersPage
