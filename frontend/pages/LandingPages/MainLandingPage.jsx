import { Link, useOutlet, useOutletContext } from "react-router-dom"
import hayanImg from "../../assets/Images/Hayan.svg"
import salmanImg from "../../assets/Images/salman.png"
import flpsImg from "../../assets/Images/flps.svg"
import plannerImg from "../../assets/Images/planner.svg"
import courseImg from "../../assets/Images/course.svg"
import webinarImg from "../../assets/Images/webinar.svg"
import '../../src/animation.css';

const ctaBtn =
  "inline-block rounded-full bg-[#F6C90E] font-[Inter] font-black uppercase text-[#1a1a1a] no-underline transition-all duration-200 hover:bg-[#1a1a1a] hover:text-white hover:-translate-y-px"

const MainLandingPage = () => {
  const {enrollmentCount} = useOutletContext();

  return (
    <div className="font-[Inter] antialiased overflow-x-hidden bg-[#f5f5f5] text-[#1a1a1a]">

      {/* Eyebrow strip */}
      <div className="flex items-center justify-center gap-2.5 overflow-hidden bg-[#F6C90E] px-4 py-[13px] text-center text-sm font-semibold text-[#1a1a1a] max-[900px]:gap-[7px] max-[900px]:px-4 max-[900px]:py-[11px] max-[900px]:text-xs">
        <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#e8273a] animate-pulse" />
        <span>
          MDCATEMY Bahadur Batch 2026 &nbsp;•&nbsp; <strong>Enrollments {enrollmentCount === 0 ? 'Closed' : 'Open'}</strong>{" "}
          {enrollmentCount !== 0 && (`• ${enrollmentCount} Seats Remaining`)} 
        </span>
      </div>

      {/* Hero — desktop */}
      <section className="relative h-[420px] overflow-hidden bg-[#f5f5f5] max-[900px]:flex max-[900px]:h-auto max-[900px]:min-h-0 max-[900px]:flex-col">
        <div className="absolute bottom-0 left-0 w-[300px] max-[900px]:hidden">
          <img
            src={hayanImg}
            alt="Hayan Khan — Founder"
            className="block h-[380px] w-[300px] object-cover object-top"
          />
        </div>

        <div className="absolute left-1/2 top-1/2 flex w-[580px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center max-[900px]:static max-[900px]:order-1 max-[900px]:w-full max-[900px]:translate-none max-[900px]:px-6 max-[900px]:pt-12 max-[900px]:pb-9">
          <h1 className="mb-4 text-[3.6rem] font-black leading-[1.05] tracking-[-2px] text-[#1a1a1a] whitespace-nowrap max-[900px]:text-[2.2rem] max-[900px]:tracking-[-1px] max-[900px]:whitespace-normal">
            DO YOU WANT TO CRACK
            <br />
            MDCAT 2026?
          </h1>
          <p className="mb-8 text-[1.3rem] font-normal leading-[1.65] text-[#1a1a1a] max-[900px]:text-base">
            Train with the team that has only one goal.
            <br />
            <strong className="font-bold text-[#1a1a1a]">To get you into a medical college.</strong>
          </p>
          <Link
            to="/batch-enrollment"
            className={`${ctaBtn} px-[72px] py-[22px] text-[17px] tracking-[1.5px] max-[900px]:w-full max-[900px]:px-6 max-[900px]:py-[18px] max-[900px]:text-sm`}
          >
            YES, I WANT TO CRACK IT
          </Link>
        </div>

        <div className="absolute bottom-0 right-0 w-[300px] max-[900px]:hidden">
          <img
            src={salmanImg}
            alt="Salman Javed — Physics Instructor"
            className="block h-[380px] w-[300px] object-cover object-top"
          />
        </div>
      </section>

      {/* Mobile founders row */}
      <div className="hidden max-[900px]:flex items-end justify-center overflow-hidden">
        <img src={hayanImg} alt="Hayan Khan" className="block w-1/2 max-w-[210px]" />
        <img src={salmanImg} alt="Salman Javed" className="block w-1/2 max-w-[210px]" />
      </div>

      {/* Free study material */}
      <section id="study-material" className="bg-white px-6 py-[52px] pb-[60px]">
        <div className="mx-auto max-w-[1160px] text-center">
          <h2 className="mb-2.5 text-[2.8rem] font-black tracking-[-1px] text-[#1a1a1a] max-[900px]:text-[2rem]">
            <span className="text-[#F6C90E]">FREE</span> STUDY MATERIAL
          </h2>
          <p className="mb-8 text-base font-normal text-[#666]">A gift for you.</p>
          <div className="mb-11 h-px w-full bg-[#ddd]" />

          <div className="flex flex-wrap justify-center gap-8 max-[900px]:gap-9">
            {/* Card 1: FLPs */}
            <div className="flex w-[240px] flex-col items-center max-[900px]:min-w-[160px] max-[900px]:w-[calc(50%-18px)] max-[500px]:w-full max-[500px]:max-w-[280px]">
              <span className="mb-3.5 rounded-full bg-[#e8273a] px-4 py-[5px] text-xs font-extrabold uppercase tracking-[0.5px] text-white">
                It&apos;s Free
              </span>
              <h3 className="mb-5 text-center text-base font-black uppercase leading-[1.25] tracking-[-0.2px] text-[#1a1a1a]">
                MDCAT FULL LENGTH
                <br />
                PAPERS
              </h3>
              <div className="mb-5 flex h-[200px] w-[200px] items-center justify-center">
                <img src={flpsImg} alt="MDCAT Full Length Papers" className="h-full w-full object-contain" />
              </div>
              <p className="mb-5 max-w-[220px] flex-1 text-center text-[0.88rem] leading-[1.55] text-[#555]">
                12 FLPs covering the whole MDCAT syllabus. Learn and practice.
              </p>
              <a
                href="https://drive.google.com/drive/folders/1Dre1kbfdFibhZ50LWsBByQhlmNZggN3T?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBtn} w-full px-6 py-[15px] text-center text-sm tracking-[0.8px]`}
              >
                Download Free
              </a>
            </div>

            {/* Card 2: Planner */}
            <div className="flex w-[240px] flex-col items-center max-[900px]:min-w-[160px] max-[900px]:w-[calc(50%-18px)] max-[500px]:w-full max-[500px]:max-w-[280px]">
              <span className="mb-3.5 rounded-full bg-[#e8273a] px-4 py-[5px] text-xs font-extrabold uppercase tracking-[0.5px] text-white">
                It&apos;s Free
              </span>
              <h3 className="mb-5 text-center text-base font-black uppercase leading-[1.25] tracking-[-0.2px] text-[#1a1a1a]">
                30 DAY MDCAT
                <br />
                STUDY PLANNER
              </h3>
              <div className="mb-5 flex h-[200px] w-[200px] items-center justify-center">
                <img src={plannerImg} alt="30 Day MDCAT Study Planner" className="h-full w-full object-contain" />
              </div>
              <p className="mb-5 max-w-[220px] flex-1 text-center text-[0.88rem] leading-[1.55] text-[#555]">
                An MDCAT planner to cover your whole syllabus in 30 days.
              </p>
              <a
                href="https://drive.google.com/file/d/1PBFq5hzrxDGL1psjkE-ZDZudyO8R4ucA/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBtn} w-full px-6 py-[15px] text-center text-sm tracking-[0.8px]`}
              >
                Download Free
              </a>
            </div>

            {/* Card 3: Course */}
            <div className="flex w-[240px] flex-col items-center max-[900px]:min-w-[160px] max-[900px]:w-[calc(50%-18px)] max-[500px]:w-full max-[500px]:max-w-[280px]">
              <span className="mb-3.5 rounded-full bg-[#e8273a] px-4 py-[5px] text-xs font-extrabold uppercase tracking-[0.5px] text-white">
                It&apos;s Free
              </span>
              <h3 className="mb-5 text-center text-base font-black uppercase leading-[1.25] tracking-[-0.2px] text-[#1a1a1a]">
                HOW TO SCORE 170+
                <br />
                IN MDCAT 2026
              </h3>
              <div className="mb-5 flex h-[200px] w-[200px] items-center justify-center">
                <img src={courseImg} alt="How to Score 170+ in MDCAT 2026" className="h-full w-full object-contain" />
              </div>
              <p className="mb-5 max-w-[220px] flex-1 text-center text-[0.88rem] leading-[1.55] text-[#555]">
                A full course on exactly how to score 170+ in MDCAT 2026.
              </p>
              <a
                href="https://www.youtube.com/watch?v=Q2vzdE8ULSc&pp=0gcJCR4LAYcqIYzv"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBtn} w-full px-6 py-[15px] text-center text-sm tracking-[0.8px]`}
              >
                Take This Course
              </a>
            </div>

            {/* Card 4: Webinar */}
            <div className="flex w-[240px] flex-col items-center max-[900px]:min-w-[160px] max-[900px]:w-[calc(50%-18px)] max-[500px]:w-full max-[500px]:max-w-[280px]">
              <span className="mb-3.5 rounded-full bg-[#e8273a] px-4 py-[5px] text-xs font-extrabold uppercase tracking-[0.5px] text-white">
                It&apos;s Free
              </span>
              <h3 className="mb-5 text-center text-base font-black uppercase leading-[1.25] tracking-[-0.2px] text-[#1a1a1a]">
                WHY 90% OF MDCAT
                <br />
                STUDENTS FAIL
              </h3>
              <div className="mb-5 flex h-[200px] w-[200px] items-center justify-center">
                <img src={webinarImg} alt="Why 90% of MDCAT Students Fail Webinar" className="h-full w-full object-contain" />
              </div>
              <p className="mb-5 max-w-[220px] flex-1 text-center text-[0.88rem] leading-[1.55] text-[#555]">
                How to be in the 10% that actually makes it. Full webinar.
              </p>
              <a
                href="https://www.youtube.com/watch?v=9tsu7yo64hs&t=2141s"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBtn} w-full px-6 py-[15px] text-center text-sm tracking-[0.8px]`}
              >
                Watch This Webinar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free MDCAT Counseling */}
      <section className="bg-[#1a1a1a] px-6 py-16 text-center">
        <div className="max-w-[600px] mx-auto">
          <span className="inline-block text-[11px] font-extrabold tracking-[2px] uppercase text-[#ffffff] mb-[18px]">
            100% Free &nbsp;·&nbsp; No Commitment
          </span>
          <h2 className="text-[2rem] font-black text-[#ffffff] tracking-[-1px] uppercase leading-[1.05] mb-3.5 max-[640px]:text-[1.65rem]">
            GET FREE MDCAT COUNSELING
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.55)] leading-[1.7] mb-8">
            Send your details and questions and we will answer you within 24 hours.
          </p>
          <a
            href="https://forms.gle/zbeoaP1UmkFEh6fRA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#F6C90E] text-[#1a1a1a] text-[15px] font-black tracking-[1.5px] uppercase no-underline px-[52px] py-5 rounded-full transition-all duration-200 hover:bg-[#ffffff] hover:text-[#1a1a1a] hover:-translate-y-px max-[640px]:w-full max-[640px]:px-6 max-[640px]:py-[18px]"
          >
            Get Free Counseling
          </a>
          <p className="text-[0.78rem] text-[rgba(255,255,255,0.25)] mt-3.5 tracking-[0.3px]">
            Fill out a quick form — takes less than 2 minutes
          </p>
        </div>
      </section>

      {/* Vision */}
      <section id="about" className="bg-[#f5f5f5] px-6 py-24">
        <div className="mx-auto flex max-w-[1100px] items-start gap-[72px] max-[900px]:flex-col max-[900px]:gap-10 max-[900px]:text-center">
          <div className="mt-[180px] w-[320px] shrink-0 overflow-hidden border-[3px] border-[#1a1a1a] bg-[#f5f5f5] max-[900px]:mx-auto max-[900px]:mt-0 max-[900px]:w-[260px]">
            <img src={hayanImg} alt="Hayan Khan — Founder, MDCATEMY" className="block h-auto w-full" />
          </div>

          <div>
            <h2 className="mb-7 text-[1.7rem] font-black uppercase leading-[1.1] tracking-[-0.5px] text-[#1a1a1a] whitespace-nowrap max-[900px]:whitespace-normal">
              THE <span className="text-[#F6C90E]">VISION</span> BEHIND MDCATEMY
            </h2>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              Assalam o Alaikum. I am Hayan, a second year medical student at Bacha Khan Medical
              College. I scored 184 on MDCAT 2024.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              After cracking my MDCAT I realized something. The test itself is not that hard.
              Traditional academies have made it hard. They focus on lectures, teach things beyond
              your syllabus just to seem intelligent, and pile on content that will never appear in
              your exam.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              But here is the truth. Resources and lectures are not what students lack. You can find
              free resources everywhere. What students actually lack is guidance, accountability,
              consistency, and the right mindset.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              Students need someone to keep them on track. Someone to detect their mistakes before they
              even notice them. Someone to fix their mindset, because most students are not failing
              because of content gaps. They are failing because they are afraid of the test. That
              fear turns into panic. That panic causes them to fail.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              No academy is working on making students courageous. No academy is working on mental
              health. That is the gap I saw and that is exactly what I built MDCATEMY to fill.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              I wanted to build an academy that focuses on mindset as much as preparation. That teaches
              only what is in your syllabus. That does not make you fear the test but trains you so
              thoroughly that the test feels easy.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              That is why I, along with my best friend Salman Javed, built MDCATEMY.
            </p>
            <p className="mb-9 text-[1.1rem] font-bold leading-[1.6] text-[#1a1a1a]">
              So here is my question to you.
              <br />
              Do you want to crack MDCAT 2026 with the people that are as invested in your dream as
              you are?
            </p>
            <Link
              to="/batch-enrollment"
              className={`${ctaBtn} px-[52px] py-5 text-[15px] tracking-[1.5px] max-[900px]:block max-[900px]:w-full max-[900px]:px-6 max-[900px]:py-[18px] max-[900px]:text-center`}
            >
              YES, I WANT TO CRACK IT
            </Link>
          </div>
        </div>
      </section>

      {/* Salman */}
      <section className="bg-[#f5f5f5] px-6 pb-24 pt-8">
        <div className="mx-auto flex max-w-[1100px] items-start gap-[72px] max-[900px]:flex-col max-[900px]:gap-10 max-[900px]:text-center">
          <div className="w-[320px] shrink-0 self-center overflow-hidden border-[3px] border-[#1a1a1a] bg-[#f5f5f5] max-[900px]:mx-auto max-[900px]:w-[260px]">
            <img src={salmanImg} alt="Salman Javed — Physics Instructor" className="block h-auto w-full" />
          </div>

          <div className="flex-1">
            <h2 className="mb-7 text-[1.7rem] font-black uppercase leading-[1.1] tracking-[-0.5px] text-[#1a1a1a]">
              MEET SALMAN JAVED
            </h2>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              I am Muhammad Salman Javed, currently pursuing BS Computer Science from GIKI. I secured
              merit number 15 all over Pakistan in GIKI test, and through my childhood friend Hayan, I
              have been closely connected with the MDCAT preparation journey as well.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              My message is centered around something I have personally felt for a long time: students
              do not only need lectures, notes, and tests; they need proper guidance, communication,
              grooming, and accountability throughout their journey. Every year, many students work
              extremely hard, get into medical universities, and genuinely want to guide their juniors.
              But most of that experience remains limited to small circles because there is no proper
              platform to connect seniors with a wider student body.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              As a result, many students learn important lessons about mindset, consistency, pressure,
              decision-making, time management, and life much later than they should. MDCAT success is
              not only about academics; many non-academic factors shape a student&apos;s confidence,
              journey, and final outcome. We wanted to fill this gap by creating a platform where
              seniors who have achieved this dream can guide juniors in a structured and meaningful
              way.
            </p>
            <p className="mb-2 text-[1.05rem] leading-[1.55] text-[#444]">
              The purpose is simple: to help the next generation learn earlier, grow faster, stay
              consistent, and go even beyond the people guiding them.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainLandingPage
