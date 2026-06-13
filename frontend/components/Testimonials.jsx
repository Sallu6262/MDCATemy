import React, { useEffect, useState } from 'react'
import tSaima from "../assets/Images/t-saima.jpeg"
import tSabah from "../assets/Images/t-sabah.jpeg"
import tMaliha from "../assets/Images/t-maliha.jpeg"
import tAleeza from "../assets/Images/t-aleeza.jpeg"
import tSarwat from "../assets/Images/t-sarwat.jpeg"
import tBenyamin from "../assets/Images/t-benyamin.jpeg"
import tAdnan from "../assets/Images/t-adnanamin.jpeg";
import tHajra from "../assets/Images/t-hajrashabbir.jpeg";
import tMaheen from "../assets/Images/t-MaheenNawab.jpeg";
import tAman from "../assets/Images/t-muhammadaman.jpeg";
import tSalman from "../assets/Images/t-muhammadsalman.jpeg";
import tNaeema from "../assets/Images/t-Naeema.jpeg";
import tSaddam from "../assets/Images/t-saddamhussain.jpeg";
import tSahibzada from "../assets/Images/t-SahibzadaEtminan.jpeg";
import tShumaila from "../assets/Images/t-shumaila.jpeg";
import tZeeshan from "../assets/Images/t-zeeshankhan.jpeg";

const chatTestimonials = [
  { img: tSaima, name: "Saima Mushtaq", badge: "MDCAT 2025 — 170/180", badgeStyle: "score" },
  { img: tSabah, name: "Sabah", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tMaliha, name: "Maliha Yunas", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tAleeza, name: "Aleeza", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tSarwat, name: "Sarwat Gul", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tBenyamin, name: "Benyamin", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tAdnan, name: "Adnan Amin", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tHajra, name: "Hajra Shabbir", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tMaheen, name: "Maheen Nawab", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tAman, name: "Muhammad Aman", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tSalman, name: "Muhammad Salman", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tNaeema, name: "Naeema", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tSaddam, name: "Saddam Hussain", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tSahibzada, name: "Sahibzada Etminan", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tShumaila, name: "Shumaila", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tZeeshan, name: "Zeeshan Khan", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
]

const Testimonials = () => {
    const [testimonialNo, setTestimonialNo] = useState(0);
    const [testimonialsPerPage, setTestimonialsPerPage] = useState(3);
    const [displayedTestimonials, setDisplayedTestimonials] = useState(chatTestimonials.slice(0, 3));

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        const updatePerPage = () => setTestimonialsPerPage(mq.matches ? 1 : 3);
        updatePerPage();
        mq.addEventListener("change", updatePerPage);
        return () => mq.removeEventListener("change", updatePerPage);
    }, []);
    
    useEffect(() => {
        setDisplayedTestimonials(chatTestimonials.slice(testimonialNo, testimonialNo + testimonialsPerPage));
    }, [testimonialNo, testimonialsPerPage]);

    return (
        <section className="bg-white pb-[70px] pt-[60px]">
            <p className="mx-auto mb-9 max-w-[1100px] px-6 text-center text-[clamp(1.2rem,2vw,1.6rem)] font-black leading-snug tracking-[-0.5px] text-[#1a1a1a]">
            At the end of our session we asked students about their experience.
            <br />
            Here are some of the many responses we received.
            </p>

            <div className="mx-auto max-w-[1500px] px-6">
            <div className="flex items-center gap-3 md:gap-5">
                {
                testimonialNo > 0 &&
                <button
                    type="button"
                    onClick={() => setTestimonialNo(prev => prev - 1)}
                    aria-label="Previous testimonials"
                    className="testimonials-prev cursor-pointer group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white text-[#1a1a1a] shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-px hover:bg-[#1a1a1a] hover:!text-white disabled:cursor-not-allowed disabled:opacity-30 max-[600px]:h-9 max-[600px]:w-9"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                }

                <div className="min-w-0 flex-1">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {displayedTestimonials.map((t) => (
                    <article
                        key={t.name}
                        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
                    >
                        <div className="flex h-[320px] shrink-0 items-center justify-center bg-[#0b141a] px-2 max-[600px]:h-52">
                        <img src={t.img} alt={t.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex min-h-[76px] flex-col justify-center border-t border-[#f0f0f0] px-3.5 py-2.5">
                        <div className="mb-0.5 text-[0.82rem] font-extrabold text-[#1a1a1a]">{t.name}</div>
                        {t.badgeStyle === "score" ? (
                            <span className="inline-block rounded-full bg-[#1a1a1a] px-2.5 py-0.5 text-[0.72rem] font-bold tracking-[0.5px] text-[#F6C90E]">
                            {t.badge}
                            </span>
                        ) : (
                            <span className="text-[0.72rem] font-medium text-[#888]">{t.badge}</span>
                        )}
                        </div>
                    </article>
                    ))}
                </div>
                </div>

                {
                testimonialNo + testimonialsPerPage < chatTestimonials?.length &&
                <button
                    type="button"
                    onClick={() => setTestimonialNo(prev => prev + 1)}
                    aria-label="Next testimonials"
                    className="testimonials-next cursor-pointer group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-white text-[#1a1a1a] shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-px hover:bg-[#1a1a1a] hover:!text-white disabled:cursor-not-allowed disabled:opacity-30 max-[600px]:h-9 max-[600px]:w-9"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
                }
            </div>
            </div>
        </section>
    )
}

export default Testimonials