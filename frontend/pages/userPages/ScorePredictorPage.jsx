import React from 'react';
import { Link } from 'react-router-dom';

const ScorePredictorPage = () => {
  return (
    <main className="fade-in relative flex-1 overflow-y-auto pb-[58px] lg:pb-0 w-full bg-[#181A18]">
      <div className="w-full px-4 pt-4 pb-8 space-y-5 lg:max-w-5xl lg:mx-auto lg:px-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-[#A8ACA8] text-[14px] font-[Inter] hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Dashboard
        </Link>

        <section className="w-full max-w-3xl mx-auto bg-[#1a1c1a] rounded-2xl px-5 sm:px-6 pt-6 pb-7 border border-white/[0.08] shadow-[0_8px_28px_rgba(0,0,0,0.30)]">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <p className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.14em] text-white/40">Score Predictor</p>
              <h3 className="font-['Poppins'] font-bold text-[24px] text-white/95 leading-tight mt-1">Your Predicted Score</h3>
              <p className="font-['Inter'] text-[14px] text-white/55 mt-1">Accuracy × MDCAT subject weights</p>
            </div>
            <div className="text-right">
              <p className="font-['Inter'] text-[12px] uppercase tracking-wider text-white/35">Target</p>
              <p className="font-['Poppins'] font-black text-[24px] leading-none text-white/90 mt-1">175</p>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <svg viewBox="0 -10 200 115" className="w-[80%] max-w-[420px] mx-auto block">
              <path d="M 14.00 100.00 A 86 86 0 0 1 39.21 39.21 L 52.62 52.62 A 67 67 0 0 0 33.00 100.00 Z" fill="#EF4444" />
              <path d="M 39.21 39.21 A 86 86 0 0 1 100.00 14.00 L 100.00 33.00 A 67 67 0 0 0 52.62 52.62 Z" fill="#F97316" />
              <path d="M 100.00 14.00 A 86 86 0 0 1 160.79 39.21 L 147.38 52.62 A 67 67 0 0 0 100.00 33.00 Z" fill="#EAB308" />
              <path d="M 160.79 39.21 A 86 86 0 0 1 186.00 100.00 L 167.00 100.00 A 67 67 0 0 0 147.38 52.62 Z" fill="#22C55E" />
              <text x="14" y="100" textAnchor="end" dominantBaseline="middle" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.35)">0</text>
              <text x="39.21" y="39.21" textAnchor="end" dominantBaseline="middle" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.35)">45</text>
              <text x="100" y="1" textAnchor="middle" dominantBaseline="middle" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.35)">90</text>
              <text x="160.79" y="39.21" textAnchor="start" dominantBaseline="middle" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.35)">135</text>
              <text x="186" y="100" textAnchor="start" dominantBaseline="middle" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.35)">180</text>
              <g transform={`translate(100 100) rotate(${180 - 131})`}>
                <path d="M 3,0 C 2.2,-28 1,-60 0,-62 C -1,-60 -2.2,-28 -3,0 C -1.5,3 1.5,3 3,0 Z" fill="rgba(255,255,255,0.90)" />
              </g>
              <circle cx="100" cy="100" r="6" fill="rgba(255,255,255,0.90)" />
              <circle cx="100" cy="100" r="2.8" fill="#FFC600" />
            </svg>

            <div className="mt-3 bottom-1 left-0 right-0 flex justify-center pointer-events-none">
              <div className="text-center">
                <span className="font-['Poppins'] font-black leading-none" style={{ color: '#EAB308', fontSize: '52px' }}>131</span>
                <span className="font-['Inter'] text-[16px] text-white/45 ml-1">/ 180</span>
              </div>
            </div>
          </div>

          <a
            href="#"
            className="flex items-center justify-center gap-1.5 w-full mt-4 mb-5 py-3 rounded-xl border border-[#FFC600]/25 bg-[#FFC600]/[0.06] font-['Inter'] font-semibold text-[14px] text-[#E0A800] hover:bg-[#FFC600]/[0.12] transition-colors"
          >
            Understand Score Predictor Algorithm
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </a>

          <div className="border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 mb-3">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
              <p className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.12em] text-white/45">Leaderboard</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">🥇</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#10B98122', color: '#10B981' }}>FN</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Fatima Noor</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#22C55E' }}>178</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">🥈</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#38BDF822', color: '#38BDF8' }}>AR</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Ahmed Raza</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#22C55E' }}>174</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">🥉</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#A78BFA22', color: '#A78BFA' }}>SM</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Sara Malik</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#22C55E' }}>169</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">4</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#FB923C22', color: '#FB923C' }}>OS</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Omar Sheikh</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#22C55E' }}>162</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">5</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#2DD4BF22', color: '#2DD4BF' }}>ZA</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Zainab Ali</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#22C55E' }}>155</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">6</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#F59E0B22', color: '#F59E0B' }}>BY</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Bilal Yousaf</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#22C55E' }}>148</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#FFC600]/10 border border-[#FFC600]/25">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">7</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#FFC60022', color: '#FFC600' }}>HK</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate font-bold text-white/95">Hayan Khan (You)</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#EAB308' }}>131</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">8</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#8B5CF622', color: '#8B5CF6' }}>AT</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Ayesha Tariq</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#EAB308' }}>124</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">9</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#06B6D422', color: '#06B6D4' }}>IQ</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Imran Qureshi</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#EAB308' }}>112</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl">
                <span className="font-['Poppins'] font-bold text-[13px] w-5 text-center text-white/40">10</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-bold text-[10px]" style={{ background: '#EF444422', color: '#EF4444' }}>NF</div>
                <span className="flex-1 font-['Inter'] text-[14px] truncate text-white/70">Noor Fatima</span>
                <span className="font-['Poppins'] font-bold text-[15px]" style={{ color: '#F97316' }}>98</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ScorePredictorPage;