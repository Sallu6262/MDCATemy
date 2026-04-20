import React from 'react'

const REVIEWS = [
  {
    id: 'ayesha',
    quote:
      'The accountability was everything. My coach checked in on me every week. I never felt like I was preparing alone.',
    name: 'Ayesha Tariq',
    meta: 'MDCAT 2024 — 172/200',
  },
  {
    id: 'hassan',
    quote:
      'The drills felt like the real exam. By test day I already knew my pacing and weak chapters.',
    name: 'Hassan Malik',
    meta: 'MDCAT 2024 — 168/200',
  },
  {
    id: 'fatima',
    quote:
      'Mocks + analytics showed exactly where I was leaking marks. Two months later my bio section flipped.',
    name: 'Fatima Noor',
    meta: 'MDCAT 2023 — Repeater · 181/200',
  },
  {
    id: 'bilal',
    quote: 'Clear structure, no noise. I could study after FSc classes and still stay on track.',
    name: 'Bilal Ahmed',
    meta: 'MDCAT 2024 — 159/200',
  },
]

const RegistrationPageDecoration = () => {
  const review = REVIEWS[0]

  return (
    <aside className="relative flex flex-1 flex-col border-b border-white/[0.06] px-6 py-10 lg:max-w-[46%] lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
      <div>
        <div className="relative mx-auto mt-10 max-w-md">
          <div className="mx-auto w-full max-w-[min(300px,78vw)]">
            <svg
              viewBox="0 0 200 200"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-labelledby="registration-score-gem-title"
            >
              <title id="registration-score-gem-title">MDCAT score 184</title>
              <defs>
                <radialGradient id="registrationGemInner" cx="50%" cy="42%" r="58%">
                  <stop offset="0%" stopColor="rgba(255, 198, 0, 0.38)" />
                  <stop offset="42%" stopColor="rgba(45, 42, 32, 0.9)" />
                  <stop offset="100%" stopColor="rgba(16, 16, 16, 1)" />
                </radialGradient>
              </defs>
              <polygon
                points="100,8 192,100 100,192 8,100"
                fill="none"
                stroke="rgba(255,255,255,0.34)"
                strokeWidth="1.15"
                strokeLinejoin="miter"
              />
              <polygon
                points="100,46 154,100 100,154 46,100"
                fill="url(#registrationGemInner)"
                stroke="#FFC600"
                strokeWidth="1.35"
                strokeLinejoin="miter"
              />
              <line x1="100" y1="8" x2="100" y2="46" stroke="rgba(255,255,255,0.2)" strokeWidth="0.85" />
              <line x1="192" y1="100" x2="154" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.85" />
              <line x1="100" y1="192" x2="100" y2="154" stroke="rgba(255,255,255,0.2)" strokeWidth="0.85" />
              <line x1="8" y1="100" x2="46" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.85" />
              <circle cx="100" cy="46" r="3.2" fill="#FFC600" />
              <circle cx="154" cy="100" r="3.2" fill="#FFC600" />
              <circle cx="100" cy="154" r="3.2" fill="#FFC600" />
              <circle cx="46" cy="100" r="3.2" fill="#FFC600" />
              <text
                x="100"
                y="98"
                textAnchor="middle"
                fontFamily="Poppins, system-ui, sans-serif"
                fontWeight="800"
                fontSize="23"
                fill="#FFC600"
              >
                184
              </text>
              <text
                x="100"
                y="120"
                textAnchor="middle"
                fontFamily="Poppins, system-ui, sans-serif"
                fontWeight="600"
                fontSize="6"
                fill="rgba(200,200,200,0.75)"
                letterSpacing="0.22em"
              >
                MDCAT SCORE
              </text>
            </svg>
          </div>
          <h1 className="mt-10 text-center text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
            Train Like a Warrior.
            <br />
            <span className="text-[#FFC600]">Score Like a Legend.</span>
          </h1>
          <div className="mt-8 grid grid-cols-3 gap-2 text-center sm:gap-4">
            <div>
              <p className="text-2xl font-black text-[#FFC600] sm:text-3xl">184</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/40">Top score</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#FFC600] sm:text-3xl">100</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/40">Per batch</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#FFC600] sm:text-3xl">2024</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/40">Founded</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-12">
        <div className="rounded-2xl border border-white/[0.08] bg-[#181818] p-1 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
          <div className="relative flex gap-0 overflow-hidden rounded-xl bg-[#141414]/90">
            <div
              className="w-1 shrink-0 self-stretch rounded-full bg-[#FFC600]"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1 px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">From the tribe</p>
              <div data-reviews-root className="relative mt-3 min-h-[8.5rem] sm:min-h-[9rem]">
                <article data-review-panel data-review-index={0} className="relative z-10">
                  <blockquote className="border-none p-0">
                    <p className="text-[13px] leading-relaxed text-white/80 sm:text-sm">
                      <span className="font-semibold text-[#FFC600]">&ldquo;</span>
                      {review.quote}
                      <span className="font-semibold text-[#FFC600]">&rdquo;</span>
                    </p>
                    <footer className="mt-4 flex flex-col gap-1 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
                      <cite className="not-italic text-sm font-bold text-[#FFC600]">{review.name}</cite>
                      <span className="text-xs text-white/45">{review.meta}</span>
                    </footer>
                  </blockquote>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </aside>
  )
}

export default RegistrationPageDecoration
