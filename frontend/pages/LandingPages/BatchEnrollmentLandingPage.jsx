import nasrinFull from "../../assets/Images/nasrin-full.svg"
import hayanCircle from "../../assets/Images/hayan-circle.svg"
import hayanTeacher from "../../assets/Images/hayan-teacher.svg"
import salmanTeacher from "../../assets/Images/salman-teacher.svg"
import awaisTeacher from "../../assets/Images/awais-teacher.svg"
import grammlogic from "../../assets/Images/grammlogic.svg"
import tSaima from "../../assets/Images/t-saima.jpeg"
import tSabah from "../../assets/Images/t-sabah.jpeg"
import tMaliha from "../../assets/Images/t-maliha.jpeg"
import tAleeza from "../../assets/Images/t-aleeza.jpeg"
import tSarwat from "../../assets/Images/t-sarwat.jpeg"
import tBenyamin from "../../assets/Images/t-benyamin.jpeg"
import '../../src/animation.css';
import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom"
import { useEffect } from "react"

const ctaBtn =
  "cursor-pointer inline-block rounded-full bg-[#F6C90E] font-[Inter] font-black uppercase text-[#1a1a1a] no-underline transition-all duration-200 hover:bg-[#1a1a1a] hover:text-white hover:-translate-y-px"

const navLink = 
  "whitespace-nowrap text-[0.85rem] font-semibold tracking-[0.3px] text-[#ffffff] no-underline transition-colors duration-200 hover:text-[#F6C90E] hover:opacity-100 max-[700px]:text-[0.78rem]"

const chatTestimonials = [
  { img: tSaima, name: "Saima Mushtaq", badge: "MDCAT 2025 — 170/180", badgeStyle: "score" },
  { img: tSabah, name: "Sabah", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tMaliha, name: "Maliha Yunas", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tAleeza, name: "Aleeza", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tSarwat, name: "Sarwat Gul", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
  { img: tBenyamin, name: "Benyamin", badge: "MDCATEMY Student 2025", badgeStyle: "label" },
]

const features = [
  {
    emoji: "🎓",
    title: "Live and Recorded Lectures",
    desc: "You will have live Biology and Physics classes where you can ask questions and interact in real time. Chemistry, English and Logical Reasoning are recorded so you can watch them at your own pace and rewatch any time. Every lecture covers only what is in your MDCAT syllabus. No unnecessary content. No wasted time.",
  },
  {
    emoji: "📝",
    title: "Weekly Sunday Test Session",
    desc: "Every Sunday you will sit a full length MDCAT practice test under real exam conditions. After the test you will get a detailed breakdown of where you went wrong and why. This is how you find your weak areas before the actual exam finds them for you.",
  },
  {
    emoji: "🧠",
    title: "MDCATEMY Quiz Builder",
    desc: "A digital question bank containing topic wise MCQs collected from the last 5 years of MDCAT past papers plus brand new MCQs written strictly according to your syllabus. You can practice any topic any time. It trains your brain to think the way the exam thinks.",
  },
  {
    emoji: "💬",
    title: "Doubt Solver Groups",
    desc: "Have a question about any topic? Post it in your subject specific doubt group and a subject specialist will answer it. No question goes unanswered. No confusion carries forward to the next lecture.",
  },
  {
    emoji: "🦅",
    title: "Your Personal Ghazi Mentor",
    desc: "Every student in Bahadur Batch gets their own personal mentor called a Ghazi. Your Ghazi is a medical student who has already cracked the MDCAT. They will have at least one personal call with you, track your progress throughout the batch, check on you regularly, and are available whenever you need to talk, ask a question, or just need someone to push you forward.",
  },
  {
    emoji: "⚔️",
    title: "Study Tribe — Jangjoo Qabila",
    desc: "You will not study alone. All 100 students are divided into small families of 5. Each family has their own Ghazi leading them. Families compete against each other in friendly battles to stay on track. You will build real friendships, hold each other accountable, and make the journey feel less like a burden and more like a mission you are on together.",
  },
  {
    emoji: "🔍",
    title: "Diagnostic System",
    desc: "Most students do not know what is actually holding them back until it is too late. Our diagnostic system tracks your performance data throughout the batch and automatically detects weaknesses in your preparation before you even notice them. When a weakness is found it is reported to the team and we work on fixing it immediately. We diagnose the problem and then we treat it.",
  },
  {
    emoji: "💚",
    title: "Mental Wellness System",
    desc: "MDCAT pressure breaks students mentally long before the exam day. Our mental wellness system monitors signs of stress, burnout, and anxiety throughout the batch. When we detect that a student is struggling mentally we step in and work on it actively. Because a student who is mentally strong performs far better than a student who only knows the syllabus.",
  },
  {
    emoji: "🏆",
    title: "Ace MDCAT Like a Warrior — Mindset Course by Hayan Khan",
    desc: "This is a complete course dedicated entirely to your mindset. It teaches you how to handle pressure, eliminate the fear of the test, build unshakeable confidence, and walk into the exam hall feeling prepared and fearless. Most students fail not because they do not know the content but because they panic. This course makes sure that never happens to you.",
  },
]

const faqLeft = [
  {
    q: "Are two months enough to prepare for MDCAT?",
    a: "Two months is enough if every single day is structured, guided, and purposeful. Most students waste months studying without direction, without knowing their weak areas, and without anyone checking on them. Bahadur Batch is designed to eliminate all of that waste. You will have live lectures, weekly tests, a personal Ghazi tracking your progress, a diagnostic system catching your weaknesses, and a tribe keeping you consistent every single day. Two focused months with the right system beats six months of studying alone. That is exactly what Bahadur Batch is built for.",
  },
  {
    q: "How does the MDCATEMY Quiz Builder work?",
    a: "The Quiz Builder is a digital question bank built specifically for MDCAT preparation. Every MCQ is classified by topic so you can practice exactly what you are weak in. It contains MCQs from the last 5 years of MDCAT past papers from all provinces plus brand new MCQs written strictly according to your syllabus. You open it, pick a topic, and practice. The questions are designed to make you think the way the exam thinks so by the time you sit the actual test nothing feels unfamiliar.",
  },
  {
    q: "Can I get only the mentorship without the full batch?",
    a: "No. MDCATEMY is built around one goal which is getting every single student into medical college. To deliver on that promise we only offer the complete Bahadur Batch package where every system works together.",
  },
]

const faqRight = [
  {
    q: "How long is the batch?",
    a: "Bahadur Batch runs for 2 months from June 15 to August 16 2026. Federal Board students may join from June 22.",
  },
  {
    q: "Can I join only the test session without the full batch?",
    a: (
      <>
        Yes. If you only want the weekly test session you can join that separately.{" "}
        <a href="#" className="font-bold text-[#1a1a1a] underline">
          View the test session page →
        </a>
      </>
    ),
  },
  {
    q: "What books and provinces do the lectures cover?",
    a: "Every lecture is strictly according to your MDCAT syllabus. We cover all provincial books including Punjab, Sindh, KPK and Federal so no matter which board you are from you are fully covered.",
  },
]

const FaqItem = ({ question, answer }) => (
  <details className="group overflow-hidden rounded-[14px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-[Inter] text-[0.95rem] font-bold leading-snug text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
      {question}
      <span className="shrink-0 text-[1.1rem] font-black leading-none transition-transform duration-300 group-open:rotate-90">
        ›
      </span>
    </summary>
    <div className="px-7 pb-6 text-[0.9rem] leading-[1.75] text-[#555]">{answer}</div>
  </details>
)

const BatchEnrollmentLandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {enrollmentCount} = useOutletContext();

  useEffect(() => {
    if(location?.state?.comingFromFooter){
      document.getElementById(location?.state?.id).scrollIntoView({behavior: 'smooth'});
      navigate(location.pathname, {replace: true, state: null});
    }
  }, []);

  return (
    <div className="overflow-x-hidden font-[Inter] antialiased">
      {/* Eyebrow strip */}
      <div className="flex items-center justify-center gap-2.5 bg-[#F6C90E] px-5 py-[13px] text-center text-sm font-bold text-[#1a1a1a]">
        <span className="inline-block h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#e8273a]" />
        <span>
          BAHADUR BATCH 2026 {enrollmentCount !== 0 && (`• ${enrollmentCount} Seats Remaining`)} 
        </span>
      </div>

      {/* Hero */}
      <section className="relative bg-[#1e2428] px-6 pb-[72px] pt-20 text-center max-[600px]:px-5 max-[600px]:pb-14 max-[600px]:pt-[52px]">
        <nav className="absolute left-0 top-0 z-10 flex w-full items-center justify-center gap-9 px-6 py-4 max-[700px]:justify-start max-[700px]:gap-4 max-[700px]:overflow-x-auto max-[700px]:px-5 max-[700px]:py-3">
          <Link className={navLink} onClick={() => document.getElementById("testimonials").scrollIntoView({behavior: 'smooth'})}>
            Testimonials
          </Link>
          <Link className={navLink} onClick={() => document.getElementById("teachers").scrollIntoView({behavior: 'smooth'})}>
            Our Teachers
          </Link>
          <Link className={navLink} onClick={() => document.getElementById("enroll").scrollIntoView({behavior: 'smooth'})}>
            Pricing
          </Link>
          <Link className={navLink} onClick={() => document.getElementById("faq").scrollIntoView({behavior: 'smooth'})}>
            FAQs
          </Link>
          <Link className={navLink} onClick={() => document.getElementById("scholarships").scrollIntoView({behavior: 'smooth'})}>
            Scholarships
          </Link>
        </nav>

        <h1 className="mb-6 text-[clamp(1.8rem,3.2vw,3rem)] font-black uppercase leading-[1.1] tracking-[-1.5px] text-[#EEEEEE] max-[600px]:tracking-[-1px]">
          WAIT! BEFORE YOU ENROLL,
          <br />
          <span className="text-[#F6C90E]">WATCH THIS</span>
        </h1>

        <p className="mb-[52px] text-[clamp(1.3rem,2.4vw,1.9rem)] font-normal leading-normal text-[#EEEEEE] max-[600px]:whitespace-normal whitespace-nowrap">
          Let me tell you how we are going to get you into a medical college.
        </p>

        <div className="mx-auto aspect-video w-full max-w-[960px] overflow-hidden rounded-lg bg-black shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          <iframe
            className="block h-full w-full border-0"
            src="https://www.youtube.com/embed/segTM8x2HWs?start=4142&autoplay=1&mute=0&rel=0&modestbranding=1"
            title="Bahadur Batch enrollment video"
            allow="encrypted-media; fullscreen"
          />
        </div>
      </section>

      {/* Post video */}
      <div className="bg-[#f5f5f5] px-6 py-[72px] pb-20 text-center">
        <p className="mx-auto mb-10 max-w-[780px] text-xl font-normal leading-[1.75] text-[#444]">
          Bahadur Batch offers 2 month intensive training where you get your own mentor, a Study Tribe, live
          lectures, a diagnostic system, weekly tests and an MCQ bank.
          <br />
          <strong className="font-bold text-[#1a1a1a]">
            All designed for one purpose. Getting you into a medical college.
          </strong>
        </p>
        <button
          onClick={() => document.getElementById("enroll").scrollIntoView({behavior: 'smooth'})}
          className={`${ctaBtn} cursor-pointer mt-2 px-[52px] py-[22px] text-[17px] tracking-[1.5px] max-[600px]:w-full max-[600px]:px-5 max-[600px]:py-[18px] max-[600px]:text-sm`}
        >
          I AM READY TO TRAIN FOR MDCAT 2026
        </button>
      </div>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white px-6 pt-20">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="mb-10 text-[clamp(1.3rem,2.4vw,1.8rem)] font-black leading-snug tracking-[-0.5px] text-[#1a1a1a]">
            Last year we only ran a weekly test session.
            <br />
            <span className="text-[#F6C90E]">Here is what students said.</span>
          </h2>
          <div className="-mb-10 flex flex-col items-center">
            <img
              src={nasrinFull}
              alt="Nasrin Ghafoor testimonial"
              className="block w-full max-w-[520px] mix-blend-multiply max-[600px]:max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Chat testimonials — horizontal scroll */}
      <section className="bg-white pb-[70px] pt-[60px]">
        <p className="mx-auto mb-9 max-w-[1100px] px-6 text-center text-[clamp(1.2rem,2vw,1.6rem)] font-black leading-snug tracking-[-0.5px] text-[#1a1a1a]">
          At the end of our session we asked students about their experience.
          <br />
          Here are some of the many responses we received.
        </p>
        <p className="mx-auto mb-5 max-w-[1100px] px-6 text-center text-[0.88rem] font-medium text-[#888]">
          Scroll horizontally to see more testimonials →
        </p>
        <div className="overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max items-start gap-5 px-6 snap-x snap-mandatory">
            {chatTestimonials.map((t) => (
              <div
                key={t.name}
                className="flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
              >
                <img src={t.img} alt={t.name} className="block h-[320px] w-auto max-[600px]:h-60" />
                <div className="border-t border-[#f0f0f0] px-3.5 py-2.5">
                  <div className="mb-0.5 text-[0.82rem] font-extrabold text-[#1a1a1a]">{t.name}</div>
                  {t.badgeStyle === "score" ? (
                    <span className="inline-block rounded-full bg-[#1a1a1a] px-2.5 py-0.5 text-[0.72rem] font-bold tracking-[0.5px] text-[#F6C90E]">
                      {t.badge}
                    </span>
                  ) : (
                    <span className="text-[0.72rem] font-medium text-[#888]">{t.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section id="teachers" className="bg-white px-6 py-24 pb-[100px]">
        <h2 className="mb-14 text-center text-[2.2rem] font-black uppercase tracking-[-1px] text-[#1a1a1a] max-[500px]:text-[1.6rem]">
          Meet Your Teachers
        </h2>
        <div className="mx-auto flex max-w-[1200px] items-stretch gap-6 max-[900px]:flex-wrap max-[500px]:flex-col">
          <div className="flex flex-1 flex-col items-center rounded-[20px] bg-white px-6 pb-8 pt-9 text-center shadow-[0_8px_48px_rgba(0,0,0,0.10)] max-[900px]:flex-[1_1_calc(50%-12px)] max-[500px]:flex-[1_1_100%]">
            <div className="mb-5 h-[110px] w-[110px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#F6C90E] bg-[#1a1a1a]">
              <img src={hayanTeacher} alt="Hayan Khan" className="block h-full w-full object-cover object-top" />
            </div>
            <p className="mb-1.5 text-[1.05rem] font-black tracking-[-0.2px] text-[#1a1a1a]">Hayan Khan</p>
            <p className="mb-4 text-[0.78rem] font-bold uppercase leading-snug tracking-[0.8px] text-[#555]">
              Biology Teacher &amp;
              <br />
              Founder of MDCATEMY
            </p>
            <div className="mx-auto mb-4 h-0.5 w-10 bg-[#F6C90E]" />
            <p className="mb-6 flex-1 text-[0.85rem] leading-[1.7] text-[#555]">
              2nd year MBBS student at Bacha Khan Medical College. Scored 184 on MDCAT 2024. Teaches Biology strictly
              according to your syllabus with a focus on concepts that actually appear in the test.
            </p>
            <a href="#" className={`${ctaBtn} w-full px-6 py-3.5 text-xs tracking-wide`}>
              Watch Demo Lecture
            </a>
          </div>

          <div className="flex flex-1 flex-col items-center rounded-[20px] bg-white px-6 pb-8 pt-9 text-center shadow-[0_8px_48px_rgba(0,0,0,0.10)] max-[900px]:flex-[1_1_calc(50%-12px)] max-[500px]:flex-[1_1_100%]">
            <div className="mb-5 h-[110px] w-[110px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#F6C90E] bg-[#1a1a1a]">
              <img src={salmanTeacher} alt="Salman Javed" className="block h-full w-full object-cover object-top" />
            </div>
            <p className="mb-1.5 text-[1.05rem] font-black tracking-[-0.2px] text-[#1a1a1a]">Salman Javed</p>
            <p className="mb-4 text-[0.78rem] font-bold uppercase leading-snug tracking-[0.8px] text-[#555]">
              Physics Teacher &amp;
              <br />
              Co-Founder of MDCATEMY
            </p>
            <div className="mx-auto mb-4 h-0.5 w-10 bg-[#F6C90E]" />
            <p className="mb-6 flex-1 text-[0.85rem] leading-[1.7] text-[#555]">
              4th semester CS student at Ghulam Ishaq Khan Institute. 15th on merit across all of Pakistan. GIK scholarship
              holder. Teaches Physics with a concept-first approach strictly within your MDCAT syllabus.
            </p>
            <a href="#" className={`${ctaBtn} w-full px-6 py-3.5 text-xs tracking-wide`}>
              Watch Demo Lecture
            </a>
          </div>

          <div className="flex flex-1 flex-col items-center rounded-[20px] bg-white px-6 pb-8 pt-9 text-center shadow-[0_8px_48px_rgba(0,0,0,0.10)] max-[900px]:flex-[1_1_calc(50%-12px)] max-[500px]:flex-[1_1_100%]">
            <div className="mb-5 h-[110px] w-[110px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#F6C90E] bg-[#1a1a1a]">
              <img src={awaisTeacher} alt="Dr. Awais" className="block h-full w-full object-cover object-top" />
            </div>
            <p className="mb-1.5 text-[1.05rem] font-black tracking-[-0.2px] text-[#1a1a1a]">Dr. Awais</p>
            <p className="mb-4 text-[0.78rem] font-bold uppercase leading-snug tracking-[0.8px] text-[#555]">
              Chemistry Teacher
            </p>
            <div className="mx-auto mb-4 h-0.5 w-10 bg-[#F6C90E]" />
            <p className="mb-6 flex-1 text-[0.85rem] leading-[1.7] text-[#555]">
              PhD in Chemistry. The teacher who taught both Hayan and Salman during their own preparation. Now bringing
              that same expertise directly into your MDCAT preparation, strictly according to your syllabus.
            </p>
            <a href="#" className={`${ctaBtn} w-full px-6 py-3.5 text-xs tracking-wide`}>
              Watch Demo Lecture
            </a>
          </div>

          <div className="flex flex-1 flex-col items-center rounded-[20px] bg-white px-6 pb-8 pt-9 text-center shadow-[0_8px_48px_rgba(0,0,0,0.10)] max-[900px]:flex-[1_1_calc(50%-12px)] max-[500px]:flex-[1_1_100%]">
            <div className="mb-5 flex h-[110px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#F6C90E] bg-white">
              <img src={grammlogic} alt="GrammLogic" className="block h-[75%] w-[75%] object-contain" />
            </div>
            <p className="mb-1.5 text-[1.05rem] font-black tracking-[-0.2px] text-[#1a1a1a]">GrammLogic</p>
            <p className="mb-4 text-[0.78rem] font-bold uppercase leading-snug tracking-[0.8px] text-[#555]">
              English &amp; Logical Reasoning
            </p>
            <div className="mx-auto mb-4 h-0.5 w-10 bg-[#F6C90E]" />
            <p className="mb-6 flex-1 text-[0.85rem] leading-[1.7] text-[#555]">
              MDCATEMY has collaborated with GrammLogic, one of Pakistan&apos;s most trusted English and Logical
              Reasoning preparation platforms, to give you the best possible experience in these subjects.
            </p>
            <a
              href="https://grammlogic.com"
              target="_blank"
              rel="noreferrer"
              className={`${ctaBtn} w-full px-6 py-3.5 text-xs tracking-wide`}
            >
              Visit GrammLogic
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="enroll" className="bg-[#f5f5f5] px-6 py-24 pb-[100px]">
        <div className="mx-auto max-w-[780px]">
          <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_48px_rgba(0,0,0,0.10)]">
            <div className="flex items-center gap-9 px-[52px] py-12 pb-11 max-[700px]:flex-col max-[700px]:px-6 max-[700px]:py-8 max-[700px]:text-center">
              <img
                src={hayanCircle}
                alt="Hayan Khan"
                className="h-[130px] w-[130px] shrink-0 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="mb-3.5 text-[2.4rem] font-black leading-[1.1] tracking-[-1px] text-[#111]">
                  Enroll in
                  <br />
                  Bahadur Batch
                </h2>
                <p className="mb-1 text-[1.05rem] font-extrabold text-[#111]">PKR 19,999 &nbsp;—&nbsp; One-time fee</p>
                <p className="mb-5 text-[0.92rem] font-semibold text-[#111]">
                  Installment plan is available for deserving students
                </p>
                <Link to="/signup" 
                  onClick={(e) => {
                    if(enrollmentCount === 0) e.preventDefault();
                    else localStorage.setItem("student-type", "TRIBE_MEMBER");
                  }} 
                  className={`${ctaBtn} px-10 py-4 text-sm tracking-[1.5px] max-[700px]:w-full max-[700px]:text-center`}>
                  {enrollmentCount === 0 ? 'Enrollment Closed!' : 'Enroll Now'}
                </Link>
              </div>
            </div>

            <div className="mx-[52px] h-px bg-[#efefef] max-[700px]:mx-6" />

            <ul className="list-none px-[52px] max-[700px]:px-6">
              {features.map((f, i) => (
                <li
                  key={f.title}
                  className={`flex items-start gap-4 py-[22px] ${i < features.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}
                >
                  <span className="mt-0.5 shrink-0 text-[1.3rem]">{f.emoji}</span>
                  <div>
                    <p className="mb-1 text-[0.98rem] font-bold text-[#111]">{f.title}</p>
                    <p className="text-[0.88rem] leading-[1.7] text-[#444]">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#efefef] px-[52px] py-11 pb-12 text-center max-[700px]:px-6 max-[700px]:py-9">
              <p className="mb-1.5 text-[1.6rem] font-black text-[#111]">PKR 19,999</p>
              <p className="mb-8 text-[0.92rem] font-semibold text-[#111]">
                2 months instalment plan available for deserving students
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-[360px] text-center">
                  <button
                    onClick={() => document.getElementById("enroll").scrollIntoView({behavior: 'smooth'})}
                    className={`${ctaBtn} flex w-full flex-col items-center gap-1.5 px-10 py-[18px] text-sm tracking-[1.5px]`}
                  >
                    Enroll from 15th June 2026
                    <div className="text-[0.85rem] font-normal normal-case tracking-[0.3px]">
                      Recommended for all students
                    </div>
                  </button>
                </div>
                <div className="w-full max-w-[360px] text-center">
                  <button
                    onClick={() => document.getElementById("enroll").scrollIntoView({behavior: 'smooth'})}
                    className={`${ctaBtn} flex w-full flex-col items-center gap-1.5 px-10 py-[18px] text-sm tracking-[1.5px]`}
                  >
                    Enroll from 22nd June 2026
                    <div className="text-[0.85rem] font-normal normal-case tracking-[0.3px]">
                      Recommended for Federal students
                    </div>
                  </button>
                </div>
                <div className="w-full max-w-[360px] text-center">
                  <a
                    href="https://wa.me/923019014141"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full border-2 border-[#1a1a1a] bg-white px-7 py-3 font-[Inter] text-xs font-bold uppercase tracking-wide text-[#1a1a1a] no-underline transition-all duration-200 hover:bg-[#1a1a1a] hover:text-white hover:-translate-y-px"
                  >
                    Talk to a Real Person
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section id="refund" className="bg-[#f5f5f5] px-6 pb-24 pt-20">
        <div className="mx-auto max-w-[780px]">
          <div className="rounded-[20px] bg-white px-[60px] py-14 shadow-[0_4px_32px_rgba(0,0,0,0.07)] max-[600px]:px-6 max-[600px]:py-9">
            <h2 className="mb-7 text-[1.75rem] font-black leading-snug tracking-[-0.5px] text-[#1a1a1a] max-[600px]:text-[1.35rem]">
              Our 100% Satisfaction Guarantee
              <br />
              &amp; Money-Back Promise
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[#444]">
              We want your investment in MDCATEMY to be a complete no-brainer for you. If you are actually going to show
              up and do the work.
            </p>
            <p className="mb-4 text-base leading-[1.8] text-[#444]">
              Showing up and doing the work means{" "}
              <strong className="font-bold text-[#1a1a1a]">
                attending your lectures, participating in your weekly test sessions, staying active in your Study Tribe,
                and engaging with your Ghazi mentor
              </strong>{" "}
              throughout the batch.
            </p>
            <p className="mb-4 text-base leading-[1.8] text-[#444]">
              If you have done all of that and for whatever reason you are not 100% happy with your experience,{" "}
              <strong className="font-bold text-[#1a1a1a]">
                send us an email within 30 days of joining and we will refund your entire payment.
              </strong>
            </p>
            <p className="mb-4 text-base leading-[1.8] text-[#444]">
              However please note that the money-back guarantee only applies if you have been an active participant
              throughout the batch and have included your reason for the refund in the email.
            </p>
            <p className="text-base leading-[1.8] text-[#444]">
              We are not here to take your money and disappear. We are here to get you into medical college. And if we
              have not delivered on that promise while you held up your end,{" "}
              <strong className="font-bold text-[#1a1a1a]">you deserve your money back.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f5f5f5] px-6 py-24 pb-[100px]">
        <h2 className="mb-14 text-center text-[2.2rem] font-black uppercase tracking-[-1px] text-[#1a1a1a] max-[700px]:text-[1.6rem]">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto flex max-w-[1000px] items-start gap-4 max-[700px]:flex-col">
          <div className="flex flex-1 flex-col gap-4">
            {faqLeft.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-4">
            {faqRight.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              if(enrollmentCount !== 0) document.getElementById('enroll').scrollIntoView({behavior: 'smooth'});
            }}
            className={`${ctaBtn} px-[52px] py-[22px] text-[17px] tracking-[1.5px] max-[600px]:w-full max-[600px]:px-5 max-[600px]:py-[18px] max-[600px]:text-sm`}
          >
            {enrollmentCount === 0 ? 'Enrollment Closed!' : 'Enroll Now'}
          </button>
        </div>
      </section>

      {/* Got questions */}
      <section id="contact" className="bg-[#f5f5f5] px-6 pb-[100px]">
        <div className="mx-auto max-w-[780px]">
          <div className="rounded-[20px] bg-white px-[60px] py-[52px] shadow-[0_4px_32px_rgba(0,0,0,0.07)] max-[600px]:px-6 max-[600px]:py-9">
            <h2 className="mb-2.5 text-[1.75rem] font-black tracking-[-0.5px] text-[#1a1a1a]">Got Questions?</h2>
            <p className="mb-3.5 text-base font-bold text-[#1a1a1a]">Still not sure, or just want to chat?</p>
            <p className="mb-8 text-base leading-[1.75] text-[#555]">
              If your question is not answered above, we are just a message away. Send us a WhatsApp message and we will
              get back to you as soon as possible.
            </p>
            <a
              href="https://wa.me/923058697159"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-9 py-[18px] font-[Inter] text-[15px] font-extrabold tracking-[0.5px] text-white no-underline transition-all duration-200 hover:bg-[#1ebe5d] hover:-translate-y-px max-[600px]:w-full max-[600px]:justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section id="scholarships" className="bg-[#f5f5f5] px-6 py-24 pb-[100px]">
        <div className="mx-auto max-w-[780px]">
          <div className="rounded-[20px] bg-white px-[60px] py-[52px] shadow-[0_4px_32px_rgba(0,0,0,0.07)] max-[600px]:px-6 max-[600px]:py-9">
            <h2 className="mb-4 text-[2.2rem] font-black uppercase tracking-[-1px] text-[#1a1a1a] max-[600px]:text-[1.6rem]">
              The MDCATEMY Scholarships
            </h2>
            <p className="mb-5 text-base leading-[1.7] text-[#1a1a1a]">
              We know that not everyone can afford MDCATEMY. We do not want money to be the reason a deserving student
              misses their shot at becoming a doctor.
            </p>
            <p className="mb-4 text-base leading-[1.8] text-[#1a1a1a]">
              That is why we are offering <strong className="font-bold">20 scholarships</strong> for Bahadur Batch 2026.
              These are need-based scholarships for students who have worked hard academically and genuinely need financial
              support to access the right preparation.
            </p>

            <div className="my-8 h-px w-full bg-[#e5e5e5]" />

            <p className="mb-3 text-base font-bold text-[#1a1a1a]">To apply you must have:</p>
            <ul className="mb-5 list-none p-0">
              {["Above 90% in Matric", "Above 90% in FSc or FSc 1st year (if 2nd year result is not yet out)", "Genuine financial need"].map(
                (item) => (
                  <li
                    key={item}
                    className="relative border-b border-[#f0f0f0] py-2 pl-7 text-[0.97rem] leading-relaxed text-[#1a1a1a] last:border-b-0 before:absolute before:left-0 before:font-black before:text-[#F6C90E] before:content-['✓']"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>

            <div className="my-8 h-px w-full bg-[#e5e5e5]" />

            <p className="mb-3 text-base font-bold text-[#1a1a1a]">Application Process</p>

            <div className="mb-7">
              <p className="mb-1.5 text-xs font-extrabold uppercase tracking-[1.5px] text-[#999]">Step 1</p>
              <p className="mb-2 text-[1.05rem] font-black text-[#1a1a1a]">Fill the Scholarship Form</p>
              <p className="text-[0.95rem] leading-[1.75] text-[#1a1a1a]">
                The form will ask for your personal details, academic results, and required documents. Fill it completely
                and honestly. Incomplete forms will not be reviewed.
              </p>
            </div>

            <div className="mb-7">
              <p className="mb-1.5 text-xs font-extrabold uppercase tracking-[1.5px] text-[#999]">Step 2</p>
              <p className="mb-2 text-[1.05rem] font-black text-[#1a1a1a]">Record a 5 Minute Video</p>
              <p className="text-[0.95rem] leading-[1.75] text-[#1a1a1a]">
                Record a maximum 5 minute video introducing yourself and answering these three questions:
              </p>
              <ul className="mt-2.5 list-none p-0">
                {[
                  "Why do you deserve a spot in Bahadur Batch?",
                  "Why do you need a scholarship financially?",
                  "What are your goals and ambitions behind cracking the MDCAT?",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative border-b border-[#f0f0f0] py-2 pl-7 text-[0.97rem] leading-relaxed text-[#1a1a1a] last:border-b-0 before:absolute before:left-0 before:font-black before:text-[#F6C90E] before:content-['✓']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[0.95rem] leading-[1.75] text-[#1a1a1a]">
                Paste the video link in the scholarship form before submitting.
              </p>
              <p className="mt-2.5 text-[0.95rem] font-bold leading-[1.75] text-[#1a1a1a]">
                Note: Male students must show their faces in the video. Female students can wear abaya, hijab, or niqab
                and if they are uncomfortable with a video, they can record a voice message instead.
              </p>
            </div>

            <div className="mb-7">
              <p className="mb-1.5 text-xs font-extrabold uppercase tracking-[1.5px] text-[#999]">Step 3</p>
              <p className="mb-2 text-[1.05rem] font-black text-[#1a1a1a]">Wait for Our Response</p>
              <p className="text-[0.95rem] leading-[1.75] text-[#1a1a1a]">
                We will personally review every application and reach out to shortlisted students directly on WhatsApp.
              </p>
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeHVRB4l-Z4kmAqbZLGViH180yEMQzSByMzcKH_QxZqp6v6pg/viewform?usp=publish-editor"
                target="_blank"
                className={`${ctaBtn} mb-6 px-12 py-5 text-[15px] tracking-[1.5px] max-[600px]:w-full max-[600px]:px-6 max-[600px]:py-[18px] max-[600px]:text-center`}
              >
                Apply for the MDCATEMY Scholarship
              </a>
              <p className="mx-auto max-w-[580px] text-[0.85rem] leading-[1.7] text-[#1a1a1a]">
                20 scholarships will be awarded Inshallah.
                <br />
                Applications are reviewed on a rolling basis so apply as early as possible. Only students who meet the
                academic eligibility criteria and submit a complete form with a video will be considered.
              </p>
              <p className="mt-9 text-center text-base font-bold text-[#1a1a1a]">Good luck. We are rooting for you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BatchEnrollmentLandingPage
