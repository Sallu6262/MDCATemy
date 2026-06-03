import React, { useState } from 'react'
import * as Slider from '@radix-ui/react-slider';

const CustomMixTestPopUp = ({setHidden, setDifficulty, setDifficultyRatio}) => {
    const [cutPoints, setCutPoints] = useState([20, 70]);

    const easy = cutPoints[0];
    const medium = cutPoints[1] - cutPoints[0];
    const hard = 100 - cutPoints[1];

    return (
        <>
        <div className="custom-mix-overlay fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]"></div>

        <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4">
        <div className="w-[calc(100%-1rem)] max-w-md rounded-2xl border-2 border-[#2D302D] bg-[#181A18] p-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.55)] sm:w-[94%]">
            <div className="mb-2 flex items-start justify-between gap-3">
            <div>
                <h2 className="[font-family:Poppins,sans-serif] text-xl font-black leading-tight text-white">Custom Mix</h2>
                <p className="text-[11px] text-[#8B8E8B]">Drag sliders - they auto-balance to 100%</p>
            </div>
            <button onClick={() => {setDifficulty(3); setHidden(true)}} className="cursor-pointer mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-sm text-[#8B8E8B]">×</button>
            </div>

            <div className="relative mb-3 mt-3 h-2.5 overflow-hidden rounded-full bg-[#2D302D]">
                <div className="absolute top-0 left-0 h-full bg-emerald-400" style={{width: `${easy}%`}}></div>
                <div className="absolute top-0 h-full bg-amber-400" style={{left: `${easy}%`, width: `${medium}%`}}></div>
                <div className="absolute top-0 h-full bg-red-400" style={{left: `${easy + medium}%`, width: `${hard}%`}}></div>
            </div>

            {/* this is the main container */}
            <Slider.Root
                value={cutPoints}
                onValueChange={setCutPoints}
                min={0}
                max={100}
                step={1}
                className="relative flex items-center w-full h-10"
                >

                {/* this is for showing filled proportion */}

                {/* track is for showing empty background */}
                <Slider.Track className="relative h-1.5 w-full rounded-full bg-[#2D302D]">
                    {/* range is for showing how much background is filled */}
                    <Slider.Range className="absolute h-full rounded-full bg-transparent" />
                </Slider.Track>

                {/* these are the 2 circles */}
                <Slider.Thumb className="cursor-pointer block h-4 w-4 rounded-full bg-emerald-400" />
                <Slider.Thumb className="cursor-pointer block h-4 w-4 rounded-full bg-red-400" />
            </Slider.Root>

            <div className="flex justify-between text-sm text-white">
                <div>Easy: {easy}</div>
                <div>Medium: {medium}</div>
                <div>Hard: {hard}</div>
            </div>

            <button onClick={() => {setDifficultyRatio({easy, medium, hard}); setHidden(true)}} className="cursor-pointer mt-4 block w-full rounded-xl border-2 border-[#0E0F0E] bg-[#FFC600] px-4 py-3 text-center [font-family:Poppins,sans-serif] text-[18px] font-black text-[#0E0F0E] shadow-[3px_3px_0px_rgba(0,0,0,0.5)] sm:text-[18px]">
            Apply Mix
            </button>
        </div>
        </div>
        </>
    )
}

export default CustomMixTestPopUp