import { Link } from "react-router-dom"
import heroBg from "../assets/background.jpeg"
import "../src/LandingPage.css"

const LandingPage = () => {
  return (
    <div className="landing-page">
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-[72px] hero-bg"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.75) 75%, rgba(10,10,10,0.96) 100%)", zIndex: 1 }}></div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)", zIndex: 2 }}></div>

      <div className="relative w-full max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-center gap-6 py-16" style={{ zIndex: 10 }}>

        <div className="inline-flex items-center gap-2 rounded-full px-5 py-2" style={{ background: "rgba(255,198,0,0.10)", border: "1px solid rgba(255,198,0,0.40)", backdropFilter: "blur(8px)" }}>
          <svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span style={{ color: "#FFC600", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Only 100 Seats Available This Season</span>
        </div>

        <h1 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)", letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.7)" }}>
          Make MDCAT Prep<br />
          <span style={{ color: "#FFC600" }}>Our Job, Not Yours.</span>
        </h1>

        <p className="max-w-2xl mx-auto" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.65, color: "rgba(255,255,255,0.92)", textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
          We have created a system that eliminates confusion, builds discipline, and pushes you forward every single day so you stop stressing, start executing and secure a seat in your favourite Medical College.
        </p>

        <Link to="/" className="btn-primary animate-pulse-glow">Join the academy today</Link>

        <div className="w-full mt-2">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16 / 9", border: "1px solid rgba(255,198,0,0.35)", boxShadow: "0 0 0 1px rgba(255,198,0,0.08), 0 16px 60px rgba(0,0,0,0.6), 0 0 80px rgba(255,198,0,0.12)" }}>
            <iframe
              src="https://www.youtube.com/embed/qk93OJhJJbk?start=875&rel=0&modestbranding=1&color=white"
              title="MDCATEMY Study Tribe — Watch the System Explained"
              className="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <p className="mt-3 text-center text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>▶ Watch: The Study Tribe System Explained</p>
        </div>

        <div className="flex flex-col items-center gap-2 mt-2">
          <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Scroll to continue</span>
          <div className="animate-bounce-y" style={{ color: "#FFC600", opacity: 0.6 }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

      </div>
    </section>

    <section id="pricing" className="py-24 relative overflow-hidden" style={{ backgroundColor: "#181A18" }}>
      <div className="divider-yellow absolute top-0 left-0 right-0"></div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('/assets/tribal-bg.svg')", backgroundSize: "300px 300px", opacity: 0.04 }}></div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,198,0,0.06) 0%, transparent 70%)" }}></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6" style={{ background: "rgba(255,198,0,0.1)", border: "1px solid rgba(255,198,0,0.3)" }}>
            <svg width="13" height="13" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span style={{ color: "#FFC600", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Limited to 100 Warriors per Season</span>
          </div>
          <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.025em" }}>Ready to join the tribe?</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>Pick your plan. Claim your seat. Everything is included — no upsells, no surprises.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">

          <div className="relative rounded-2xl p-8 text-center" style={{ backgroundColor: "#222422", border: "2px solid #FFC600", boxShadow: "0 0 40px rgba(255,198,0,0.15), 0 8px 32px rgba(0,0,0,0.4)" }}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap" style={{ background: "#FFC600", color: "#181A18" }}>Best Value — Save Rs. 997</div>
            <p className="font-bold text-sm uppercase tracking-wide mb-3 mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>Pay Upfront</p>
            <p className="font-black text-white" style={{ fontSize: "2.8rem", lineHeight: 1 }}>Rs. 26,999</p>
            <p className="text-sm mt-2 mb-7" style={{ color: "rgba(255,255,255,0.4)" }}>One-time · Full season access</p>
            <Link to="/login?plan=upfront" className="block w-full font-black text-sm uppercase tracking-wider py-3.5 rounded-xl text-center transition-opacity duration-200 hover:opacity-90" style={{ background: "#FFC600", color: "#181A18", textDecoration: "none" }}>Claim Your Seat — Upfront</Link>
          </div>

          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
            <p className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Installment Plan</p>
            <div className="flex items-end justify-center gap-2 mb-1">
              <p className="font-black text-white" style={{ fontSize: "2.8rem", lineHeight: 1 }}>Rs. 6,999</p>
              <p className="text-base pb-1" style={{ color: "rgba(255,255,255,0.4)" }}>/ mo</p>
            </div>
            <p className="font-bold text-sm mb-1" style={{ color: "#FFC600" }}>× 4 months</p>
            <p className="text-xs mb-7" style={{ color: "rgba(255,255,255,0.3)" }}>Total: Rs. 27,996 · Same access, spread out</p>
            <Link to="/login?plan=installments" className="block w-full font-black text-sm uppercase tracking-wider py-3.5 rounded-xl text-center transition-all duration-200" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Claim Your Seat — Installments</Link>
          </div>

        </div>

        <div className="flex items-start gap-3 rounded-xl p-4 mb-6" style={{ background: "rgba(255,198,0,0.06)", border: "1px solid rgba(255,198,0,0.2)" }}>
          <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="font-bold text-white">Both plans give you identical access</span> — every feature, every session, every resource. The installment plan simply spreads the cost across 4 months.
          </p>
        </div>

        <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          Seats are capped at <strong style={{ color: "rgba(255,255,255,0.6)" }}>100 warriors per season</strong>. Once filled, enrollment closes until the next season opens. Need help with the cost? Scholarships are available — see below.
        </p>

      </div>
    </section>

    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#181A18" }}>
      <div className="divider-yellow absolute top-0 left-0 right-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 6px 28px rgba(0,0,0,0.3)" }}>

          <div className="border-b p-6 lg:p-8" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,198,0,0.1)", border: "1px solid rgba(255,198,0,0.3)" }}>
                <svg width="34" height="34" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>30-Day Money-Back Guarantee</p>
                <h2 className="font-black" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#FFC600" }}>
                  Train for 30 days. If it's not for you,<br />we return every rupee.
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <p className="text-lg leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
              We are not going to hide behind fine print. If you join the Study Tribe, give it a genuine first month — show up to every live session, work with your coach, complete your daily tasks — and it still is not right for you, email us. We will process a <span style={{ color: "#FFC600", fontWeight: 700 }}>full 100% refund</span>. No long forms. No delayed responses. Every single rupee, returned.
            </p>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              The only thing we ask is that you actually try. Not because we want to make the refund difficult — but because one honest month is what this system needs to show you what it can genuinely do.
            </p>

            <div className="rounded-xl p-6 mb-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="font-black text-white text-sm mb-5">To qualify for a refund, all of the following must be true:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>You attended every live session in the first month</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>You completed your daily tasks and stayed active on the platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>You engaged with your Veteran Coach and participated in weekly reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>You email us within 30 days with your reason and one suggestion for how we can improve</span>
                </li>
              </ul>
            </div>

            <div className="flex items-start gap-4 rounded-xl p-5 mb-6" style={{ background: "rgba(255,198,0,0.1)", border: "1px solid rgba(255,198,0,0.25)" }}>
              <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,198,0,0.1)", border: "1px solid rgba(255,198,0,0.3)" }}>
                <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">How to claim:</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Email us at <a href="mailto:info@mdcatemy.com" style={{ color: "#FFC600", fontWeight: 700 }}>info@mdcatemy.com</a> within your first month. Tell us your reason and share one suggestion on how we can improve. That is all we ask.
                </p>
              </div>
            </div>

            <p className="text-sm italic pl-4" style={{ color: "rgba(255,255,255,0.4)", borderLeft: "2px solid rgba(255,198,0,0.4)" }}>
              A warrior who shows up fully and still does not feel the value? We will be the first to say: fair enough. We do not want to keep a single rupee we did not earn.
            </p>
          </div>

        </div>
      </div>
    </section>

    <section id="scholarship" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#181A18" }}>
      <div className="divider-yellow absolute top-0 left-0 right-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 6px 28px rgba(0,0,0,0.4)" }}>

          <div className="border-b p-6 lg:p-8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,198,0,0.1)", border: "1px solid rgba(255,198,0,0.3)" }}>
                <svg width="32" height="32" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Scholarship Program</p>
                <h2 className="font-black" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#FFC600" }}>Talent Should Never Be Blocked by Finances</h2>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.72)" }}>
              We reserve a limited number of partial scholarships each season for students who demonstrate both academic potential and genuine financial need. If that is you, apply. We read every application personally.
            </p>

            <div className="mb-8">
              <p className="font-bold text-white text-base mb-5">Eligibility Criteria</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>Matric marks of 90% or above (board certificate required)</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>FSc First Year marks of 85% or above (if completed)</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>Financial need verified through a brief written statement</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>Completion of the scholarship application form with full details</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>A 5-minute voice note or short video explaining your situation and your goal</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Applications are reviewed on a rolling basis. Apply early — spots are limited.</p>
              <a href="mailto:info@mdcatemy.com?subject=Scholarship Application" className="inline-block font-black text-sm uppercase tracking-wider px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 whitespace-nowrap text-center" style={{ background: "#FFC600", color: "#181A18", textDecoration: "none" }}>Apply for Scholarship</a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="faq" className="py-24 relative" style={{ backgroundColor: "#181A18" }}>
      <div className="divider-yellow absolute top-0 left-0 right-0"></div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#FFC600" }}>Frequently Asked</p>
          <h2 className="font-black text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Questions Warriors Ask</h2>
        </div>

        <div className="space-y-3">

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4 transition-colors duration-200" style={{ color: "rgba(255,255,255,0.7)" }}>Who is the Study Tribe for?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>The Study Tribe is built for FSc Pre-Medical students preparing for MDCAT — both freshers sitting for the first time and repeaters who want to do it differently this season. If you are serious about getting into a medical college and you want a structured system with real accountability, this is for you.</p>
            </div>
          </details>

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4" style={{ color: "rgba(255,255,255,0.7)" }}>What exactly does a Veteran coach do?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>Your Veteran coach is an MDCAT scholar who has appeared in the exam and scored highly. They oversee your entire preparation journey — from your diagnosis session at the start, to checking your daily progress, adjusting your plan when needed, and being available on WhatsApp for direct check-ins. They are not a teacher. They are your preparation manager.</p>
            </div>
          </details>

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4" style={{ color: "rgba(255,255,255,0.7)" }}>How is this different from other online academies?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>Every other academy gives you resources: lectures, notes, MCQs. We give you those too — but the Study Tribe adds what no one else has: a personal Veteran coach, a family of 5 to train with, a personalized daily plan, weekly reviews, counseling sessions, and an accountability system that follows you every single day. Resources are not the problem. The system is.</p>
            </div>
          </details>

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4" style={{ color: "rgba(255,255,255,0.7)" }}>What does the 'Family of 5' mean?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>Inside the tribe, you are placed in a family of 5 students who share a coach. You can see each other's online status on the platform, have a shared discussion group for study sessions, and move through the season together. It is peer accountability built directly into the structure.</p>
            </div>
          </details>

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4" style={{ color: "rgba(255,255,255,0.7)" }}>When does the season start and how long does it run?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>The season is timed around the MDCAT calendar. Once you enroll, your diagnosis session is scheduled within 48 hours and your personalized plan begins immediately. The season runs until the day of your MDCAT.</p>
            </div>
          </details>

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4" style={{ color: "rgba(255,255,255,0.7)" }}>Is the Ace MDCAT Like a Warrior course really free?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>Yes. Every Study Tribe warrior gets full access to Ace MDCAT Like a Warrior at no extra cost. It is included as part of your enrollment. This course focuses entirely on mindset, goal architecture, and the discipline system — the things that hold your preparation together when the pressure builds.</p>
            </div>
          </details>

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4" style={{ color: "rgba(255,255,255,0.7)" }}>What if I cannot afford the full payment?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>That is exactly why we offer the monthly installment plan at Rs. 6,500 per month. You get identical access to everything in the Study Tribe. There are also limited scholarships available for students who qualify. See the scholarship section above for eligibility.</p>
            </div>
          </details>

          <details className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#222422", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="flex items-center justify-between p-6 text-left">
              <span className="faq-question font-semibold text-base pr-4" style={{ color: "rgba(255,255,255,0.7)" }}>What does the 14-day guarantee actually cover?</span>
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="faq-plus items-center justify-center"><svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="faq-minus items-center justify-center"><svg width="14" height="14" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
              </div>
            </summary>
            <div className="px-6 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-base leading-relaxed pt-5" style={{ color: "rgba(255,255,255,0.7)" }}>If you join, attend all sessions, stay active for a full month, and still feel this system is not right for you — email us at info@mdcatemy.com with your reason and one suggestion on how we can improve. We will process a 100% refund with no drama. The only requirement is that you genuinely gave it a full month — because the system needs time to work.</p>
            </div>
          </details>

        </div>
      </div>
    </section>

    <section id="contact" className="py-20 relative" style={{ background: "#FFC600" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(24,26,24,0.6)" }}>Still Have Questions?</p>
        <h2 className="font-black mb-4" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#181A18" }}>Talk to a Real Person.</h2>
        <p className="text-lg leading-relaxed mb-4" style={{ color: "rgba(24,26,24,0.7)" }}>Our team responds to every message. If you have a question about the Study Tribe, pricing, or whether this is right for you — reach out.</p>
        <p className="text-sm font-semibold mb-12" style={{ color: "rgba(24,26,24,0.5)" }}>Average response time: under 2 hours</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:info@mdcatemy.com" className="card-hover flex items-center gap-4 rounded-2xl px-8 py-5" style={{ background: "#181A18", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,198,0,0.1)", border: "1px solid rgba(255,198,0,0.3)" }}>
              <svg width="18" height="18" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-white">Email Us</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>info@mdcatemy.com</p>
            </div>
          </a>

          <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className="card-hover flex items-center gap-4 rounded-2xl px-8 py-5" style={{ background: "#181A18", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,198,0,0.1)", border: "1px solid rgba(255,198,0,0.3)" }}>
              <svg width="18" height="18" fill="none" stroke="#FFC600" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-white">WhatsApp</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Chat with our team</p>
            </div>
          </a>
        </div>
      </div>
    </section>
    </div>
  )
}

export default LandingPage
