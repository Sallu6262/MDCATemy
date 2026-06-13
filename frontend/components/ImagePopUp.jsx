import { useEffect, useRef } from 'react'
import '../src/animation.css'

const ImagePopUp = ({ src = '', alt = 'Image preview', setPopUpHidden }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        popupRef?.current?.scrollIntoView({behaviour: 'smooth', block: 'center'});
    }, []);

    return (
        <section
            ref={popupRef}
            className="fade-in custom-mix-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="image-popup-panel relative w-[calc(100%-24px)] max-w-3xl overflow-hidden rounded-2xl border border-[#2E302E] bg-[#222422] shadow-2xl">
                <button
                    type="button"
                    onClick={() => setPopUpHidden(true)}
                    aria-label="Close"
                    className="quiz-btn-secondary absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border bg-[#1c1c1c] text-[#A8ACA8] transition-colors hover:border-[#FFC600]/40 hover:text-[#FFC600]"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className="max-h-[85vh] overflow-auto p-3 pt-14 sm:p-4 sm:pt-14">
                    <img
                        src={src}
                        alt={alt}
                        className="mx-auto block h-auto max-h-[75vh] w-full rounded-xl object-contain"
                    />
                </div>

                <div className="border-t border-[#2E302E] px-4 py-4 sm:px-5">
                    <button
                        type="button"
                        onClick={() => setPopUpHidden(true)}
                        className="quiz-btn-secondary w-full cursor-pointer rounded-xl border px-4 py-3 text-[14px] font-[Inter] font-bold text-[#A8ACA8] transition-colors hover:border-[#FFC600]/40 hover:!text-[#FFC600] sm:ml-auto"
                    >
                        Close
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ImagePopUp
