import React, { useEffect, useRef } from 'react'

const TestSyllabusPopUp = ({test, setSyllabusHidden}) => {
    // console.log(Object.keys(test.syllabus).forEach(subject => console.log(Object.keys(test.syllabus[subject]))));
    // console.log(test?.syllabus);
    const testRef = useRef(null);

    const subjectToColor = (type, subject) => {
        const colors = {
            'biology' : {
                'border' : 'border-[#10B981]',
                'border-l' : 'border-l-[#10B981]',
                'bg' : 'bg-[#10B981]',
                'stroke' : '#10B981' 
            },
            'physics' : {
                'border' : 'border-[#38BDF8]',
                'border-l' : 'border-l-[#38BDF8]',
                'bg' : 'bg-[#38BDF8]',
                'stroke' : '#38BDF8' 
            },
            'chemistry' : {
                'border' : 'border-[#F59E0B]',
                'border-l' : 'border-l-[#F59E0B]',
                'bg' : 'bg-[#F59E0B]',
                'stroke' : '#F59E0B' 
            },
            'english' : {
                'border' : 'border-[#A78BFA]',
                'border-l' : 'border-l-[#A78BFA]',
                'bg' : 'bg-[#A78BFA]',
                'stroke' : '#A78BFA' 
            },
            'logical reasoning' : {
                'border' : 'border-[#F472B6]',
                'border-l' : 'border-l-[#F472B6]',
                'bg' : 'bg-[#F472B6]',
                'stroke' : '#F472B6' 
            }
        }

        return colors?.[subject]?.[type] || '';
    }
    // console.log(test);

    const makeInitialsUpperCase = (str) => {
        str = str.split('_').join(' ');
        return str.slice(0,1).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        testRef.current.focus();
    },[])

    return (
        <>
            <section ref={testRef} tabIndex={-1} className="absolute inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="w-[calc(100%-24px)] max-w-[980px] max-h-[88vh] bg-[#222422] border border-[#2E302E] rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-[#2E302E] flex-shrink-0">
                    <div className="min-w-0">
                        <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.14em] text-[#FFC600] mb-0.5">
                        Test Syllabus
                        </p>
                        <h3 className="font-black text-white text-[24px] truncate">
                        {test?.test_name}
                        </h3>
                        <p className="text-[#A8ACA8] text-[14px] font-[Inter] mt-0.5">
                        {test?.mcq_count} MCQs · {test?.test_time} min
                        </p>
                    </div>
                    <button onClick={() => setSyllabusHidden(true)} className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-[#A8ACA8] hover:text-white hover:bg-[#2A2C2A]/30 transition-colors flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                    <p className="text-[12px] font-[Inter] font-black uppercase tracking-[0.14em] text-[#A8ACA8]">
                        Syllabus Coverage
                    </p>

                    {
                        Object.keys(test?.syllabus).map((subject,i) => {
                            return <div key={i} 
                                className={`bg-[#181A18]/60 border border-[#2E302E] rounded-xl overflow-hidden border-l-[3px] ${subjectToColor('border-l', subject)}`}
                            >
                                <button className="w-full flex items-center justify-between px-3 py-2.5 text-left">
                                <div className="flex items-center gap-2">
                                    <div 
                                    className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border ${subjectToColor('border', subject)}`}
                                    >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={`${subjectToColor('stroke',subject)}`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 7v14" />
                                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                                    </svg>
                                    </div>
                                    <p className="font-[Poppins] font-black text-white text-[18px]">{makeInitialsUpperCase(subject)}</p>
                                </div>
                                </button>

                                <div className="px-3 pb-3 space-y-2">
                                {
                                    Object.keys(test?.syllabus[subject]).map((chapter, i) => {
                                        return (
                                            <div key={i} className="border-l border-[#2E302E] pl-3 ml-2">
                                                <p className="font-[Inter] font-bold text-white text-[14px] mb-1">{makeInitialsUpperCase(chapter)}</p>
                                                <div className="flex flex-wrap gap-1">
                                                {
                                                    test?.syllabus[subject][chapter]?.map((topic, i) => {
                                                        return (
                                                            <span key={i} className="text-[12px] font-[Inter] font-bold px-2.5 py-1 rounded-full bg-[#2A2C2A]/25 border border-[#2E302E] text-[#A8ACA8]">{topic.name || topic}</span>                                              
                                                        )
                                                    })
                                                }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>

                            </div>
                        })
                    }

                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-[#2E302E] flex-shrink-0">
                    <button onClick={() => setSyllabusHidden(true)} className="cursor-pointer w-full py-2.5 bg-[#2A2C2A]/30 border border-[#2E302E] rounded-xl text-white text-[14px] font-[Inter] font-bold hover:border-[#FFC600]/40 transition-colors">
                        Close
                    </button>
                    </div>

                </div>
            </section>
        </>
    )
}

export default TestSyllabusPopUp