import React, { useState } from 'react'

const CustomMixTestPopUp = ({setHidden, setDifficulty, setDifficultyRatio}) => {
    const [values, setValues] = useState({
        easy: 20,
        medium: 50,
        hard: 30
    });

    const handleChange = (type, newValue) => {
        setValues(prev => {
            const oldValue = prev[type];
            let delta = newValue - oldValue;

            let next = { ...prev };
            next[type] = newValue;

            const others = Object.keys(prev).filter(k => k !== type);
            const totalOthers = others.reduce((sum, k) => sum + prev[k], 0);

            let remaining = Math.abs(delta);

            others.forEach((k, i) => {
            if (totalOthers === 0) return;

            const share = prev[k] / totalOthers;

            let change = Math.floor(remaining * share);

            if (delta > 0) {
                // current increased → reduce others
                next[k] = Math.max(0, prev[k] - change);
            } else {
                // current decreased → increase others
                next[k] = prev[k] + change;
            }

            remaining -= change;

            // fix rounding loss
            if (i === others.length - 1) {
                if (delta > 0) next[k] -= remaining;
                else next[k] += remaining;
            }
            });

            return next;
        });
    };

    return (
        <>
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]"></div>

        <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4">
        <div className="w-[calc(100%-1rem)] max-w-md rounded-2xl border border-[#2D302D] bg-[#181A18]/95 p-4 shadow-[0_16px_45px_rgba(0,0,0,0.55)] sm:w-[94%]">
            <div className="mb-2 flex items-start justify-between gap-3">
            <div>
                <h2 className="[font-family:Poppins,sans-serif] text-xl font-black leading-tight">Custom Mix</h2>
                <p className="text-[11px] text-[#8B8E8B]">Drag sliders - they auto-balance to 100%</p>
            </div>
            <button onClick={() => {setDifficulty(3); setHidden(true)}} className="cursor-pointer mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#0E0F0E]/50 text-sm text-[#8B8E8B]">×</button>
            </div>

            <div className="mb-3 mt-3 h-2.5 overflow-hidden rounded-full bg-[#2D302D]">
            <div className="h-full w-[20%] bg-emerald-400"></div>
            <div className="-mt-2.5 ml-[20%] h-2.5 w-[50%] bg-amber-400"></div>
            <div className="-mt-2.5 ml-[70%] h-2.5 w-[30%] bg-red-400"></div>
            </div>

            <div className="space-y-3">
            <div className="grid grid-cols-[44px_1fr_42px] items-center gap-3">
                <p className="[font-family:Poppins,sans-serif] text-[13px] font-black text-emerald-400">Easy</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={values.easy}
                    onChange={e => handleChange("easy", +e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#2D302D] accent-emerald-400"
                />
                <p className="text-right [font-family:Poppins,sans-serif] text-[13px] font-black text-emerald-400">{values.easy}%</p>
            </div>

            <div className="grid grid-cols-[44px_1fr_42px] items-center gap-3">
                <p className="[font-family:Poppins,sans-serif] text-[13px] font-black text-amber-400">Medium</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={values.medium}
                    onChange={e => handleChange("medium", +e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#2D302D] accent-amber-400"
                />
                <p className="text-right [font-family:Poppins,sans-serif] text-[13px] font-black text-amber-400">{values.medium}%</p>
            </div>

            <div className="grid grid-cols-[44px_1fr_42px] items-center gap-3">
                <p className="[font-family:Poppins,sans-serif] text-[13px] font-black text-red-400">Hard</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={values.hard}
                    onChange={e => handleChange("hard", +e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#2D302D] accent-red-400"
                />
                <p className="text-right [font-family:Poppins,sans-serif] text-[13px] font-black text-red-400">{values.hard}%</p>
            </div>
            </div>

            <button onClick={() => {setDifficultyRatio(values); setHidden(true)}} className="cursor-pointer mt-4 block w-full rounded-xl border-2 border-[#0E0F0E] bg-[#FFC600] px-4 py-3 text-center [font-family:Poppins,sans-serif] text-[18px] font-black text-[#0E0F0E] shadow-[3px_3px_0px_rgba(0,0,0,0.5)] sm:text-[18px]">
            Apply Mix
            </button>
        </div>
        </div>
        </>
    )
}

export default CustomMixTestPopUp