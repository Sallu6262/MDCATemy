import React from 'react'
import {useEffect, useState} from 'react'
import '../src/animation.css';

const REVIEWS = [
  {
    id: 'nasrin',
    quote:
      'Assalamualaikum, My name is Nasrin Ghafoor and Alhamdulillah I scored 175/180 in MDCAT 2025. I joined Mdcatemy for my preparation and I can confidently say that it is the best online platform for test series and guided preparation. Their MCQs are precise MDCAT relevant and free from unnecessary confusion, focusing only on what truly matters. What I appreciated the most was their outstanding staff and management, especially the way they engage with students individually helping them overcome fears and strengthen weak areas. To every MDCAT aspirant: If you\'re confused or feel lost in your preparation, join MDCATemy. It will give you the direction and support you need. Special thanks to Hayan Khan whose constant motivation and personal guidance helped remove the fear of MDCAT and kept us moving forward with confidence.',
    name: 'Nasrin Ghafoor',
    meta: 'MDCAT 2025 — 175/180 · 4th Position, KPK KMU MDCAT',
  },
  {
    id: 'shumaila',
    quote:
      'Walikum Aslam. Allhumdulillah it was really helpful for me. The way you guys put effort into explanations (written as well as YouTube videos) was superb, Masha Allah. Even though I joined another series, it didn\'t help me like that. May Allah be pleased with you guys for helping us.',
    name: 'Shumaila',
  },
  {
    id: 'salman',
    quote:
      'Wa Alaikum Assalam! Thank you for organizing the MDCATemy Online FLPs Session 2025. MDCATemy\'s Online FLPs Session 2025 was amazing! The teachers were great, and the study materials were very helpful. I look forward to being part of MDCATemy\'s future initiatives!',
    name: 'M. Salman',
  },
  {
    id: 'sahibzada',
    quote:
      'Walaikum Salam! I would like to share my feedback. My experience with the academy was very great. The papers were challenging yet helpful, and they gave me a clear idea of where I stand. The tests really helped me identify my weak areas effectively. The team\'s efforts and dedication are truly appreciated. JazakAllah for arranging such a great learning opportunity!',
    name: 'Sahibzada Etminan',
  },
  {
    id: 'hajra',
    quote:
      'The FLPs for MDCAT preparation were very helpful. I found the material so useful that I even made photocopies and studied them again and again. The video lectures were also great and helped me understand everything better. I\'m really thankful for all the effort you put into making these tests and lectures. I hope this support continues in the future. Wishing you all the best and many blessings!',
    name: 'Hajra Shabir',
  },
  {
    id: 'saddam',
    quote:
      'Wa Alaikum Assalam, Bhai, my experience with MDCATemy has been very good. I learned a lot of new things, especially it helped me understand how well my preparation was going. Overall, I gained a lot of knowledge and built my concepts. MDCATemy should definitely be launched again next year. It will be very beneficial for many students. Thanks to the entire MDCATemy team for their efforts and especially to Hayan Bhai. JazakAllah.',
    name: 'Saddam Hussain',
  },
  {
    id: 'adnan',
    quote:
      'W Salam Hayan Sir! I\'m good. My experience with MDCATemy FLPs 2025 was outstanding. The tests were well-planned, concept-based, and helped me track my progress effectively. Each discussion cleared doubts and boosted my confidence. It truly felt like learning under mentors who understand what MDCAT demands. Thank you so much.',
    name: 'Adnan Amin',
  },
  {
    id: 'zeeshan',
    quote:
      'The FLPs were so good, so conceptual, and according to the PMDC syllabus. They were very helpful for me. FLPs were according to past papers. The Physics and Chemistry portions were very good and conceptual, but Biology was a little bit easy. InshaAllah, Allah will give you success in launching MDCATemy as an online academy. Thank you very much, sir.',
    name: 'Zeeshan Khan',
  },
  {
    id: 'moona',
    quote:
      'Thank you so much to all teachers. MDCATemy ke FLPs ne meri bahut help ki hai. Jitna main expect nahi kar rahi thi ke meri preparation achi ho jayegi MDCAT ke liye. Aur sabse jo beneficial mujhe laga wo test ki written explanations thin, jis ki wajah se mujhe MCQs achi tarah clear ho jate the, as our teachers explained them in a very clear way. Baqi teachers bahut cooperative the. Koi bhi problem hoti to wo solve kar lete the. Allah kare ke MDCATemy FLPs ka session isi tarah har saal ho taake students achi tarah se apni preparation kar saken MDCAT ke liye. JazakAllah Khair.',
    name: 'Moona Andaleeb',
  },
  {
    id: 'aliba',
    quote:
      'Alhamdulillah, my experience with the MDCATemy Online FLPs Session 2025 was amazing! The teachers were dedicated, the explanations were clear, and the practice really boosted my confidence. I truly felt guided throughout. I think that was the answer to my Istikhara. Respected Hayan Sir, Hasnain Sir, Mubasir Sir, Shayan Sir, and all the other teachers really guided me in the way it was needed. Practice tests were amazing. They actually taught us how to learn for MDCAT. JazakAllah Khair for all your efforts!!',
    name: 'Aliba Ali',
  },
  {
    id: 'naeema',
    quote:
      'Walikum Salam. Although you are our age fellow or only one year older than us, you literally manage everything perfectly. First of all, I would like to appreciate your support and efforts for us. The way you guided and made things easier for us was more than anything someone can do. The test sessions and even those few lectures which you uploaded were gems for MDCAT aspirants. Honestly speaking, I did not score too well in those tests, but they made me learn important concepts, and those were obviously more important than the marks. JazakAllah. May Allah help you the way you helped us.',
    name: 'Naeema',
  },
]

const REVIEW_INTERVAL_MS = 12000

const RegistrationPageDecoration = () => {
  const [reviewNumber, setReviewNumber] = useState(0);
  const review = REVIEWS[reviewNumber];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewNumber(prev => (prev + 1) % REVIEWS.length);
    }, REVIEW_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="fade-in relative flex flex-1 flex-col border-b border-white/[0.06] px-6 py-10 lg:max-w-[46%] lg:border-b-0 lg:border-r lg:px-12 lg:py-14 order-2 lg:order-1">
      <style>
        {`
          [data-reviews-root] {
            isolation: isolate;
          }

          [data-review-panel] {
            will-change: opacity, transform;
            animation: reviewSwap 0.7s ease-out forwards;
          }

          @keyframes reviewSwap {
            0% {
              opacity: 0;
              transform: translateY(8px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
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
                  <stop offset="42%" stopColor="rgb(var(--ui-panel-rgb) / 0.9)" />
                  <stop offset="100%" stopColor="rgb(var(--ui-bg-rgb) / 1)" />
                </radialGradient>
              </defs>
              <polygon
                points="100,8 192,100 100,192 8,100"
                fill="none"
                stroke="rgb(var(--ui-text-rgb) / 0.34)"
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
              <line x1="100" y1="8" x2="100" y2="46" stroke="rgb(var(--ui-text-rgb) / 0.2)" strokeWidth="0.85" />
              <line x1="192" y1="100" x2="154" y2="100" stroke="rgb(var(--ui-text-rgb) / 0.2)" strokeWidth="0.85" />
              <line x1="100" y1="192" x2="100" y2="154" stroke="rgb(var(--ui-text-rgb) / 0.2)" strokeWidth="0.85" />
              <line x1="8" y1="100" x2="46" y2="100" stroke="rgb(var(--ui-text-rgb) / 0.2)" strokeWidth="0.85" />
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
                175
              </text>
              <text
                x="100"
                y="120"
                textAnchor="middle"
                fontFamily="Poppins, system-ui, sans-serif"
                fontWeight="600"
                fontSize="6"
                fill="rgb(var(--ui-text-rgb) / 0.75)"
                letterSpacing="0.22em"
              >
                MDCAT SCORE
              </text>
            </svg>
          </div>
          <h1 className="mt-10 text-center text-xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
            EVERY WHITE COAT BEGINS
            <br />
            AS A
            <br />
            <span className="text-[#FFC600]">WARRIOR IN THE DARK.</span>
          </h1>
          <div className="mt-8 grid grid-cols-3 gap-2 text-center sm:gap-4">
            <div>
              <p className="text-2xl font-black text-[#FFC600] sm:text-3xl">175</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/40">Top score</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#FFC600] sm:text-3xl">120</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/40">Per batch</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#FFC600] sm:text-3xl">2025</p>
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
              <div data-reviews-root className="relative mt-3 min-h-[10rem] sm:min-h-[11rem]">
                <article key={review.id} data-review-panel className="relative z-10">
                  <blockquote className="border-none p-0">
                    <p className="text-[13px] leading-relaxed text-white/80 sm:text-sm">
                      <span className="font-semibold text-[#FFC600]">&ldquo;</span>
                      {review.quote}
                      <span className="font-semibold text-[#FFC600]">&rdquo;</span>
                    </p>
                    <footer className="mt-4 flex flex-col gap-1 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
                      <cite className="not-italic text-sm font-bold text-[#FFC600]">{review.name}</cite>
                      {review.meta && (
                        <span className="text-xs text-white/45">{review.meta}</span>
                      )}
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
