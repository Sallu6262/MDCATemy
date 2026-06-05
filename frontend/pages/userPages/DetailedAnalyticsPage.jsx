import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import {formatName, subjectToColor} from '../../utils/HelperObjects'

const DetailedAnalyticsPage = ({isSubjectOrChapter}) => {
    const {syllabusAndIDs, studentAnalytics: sa} = useOutletContext();
    const {subject, chapter} = useParams();
    
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState([]);

    const [formattedSubject, setFormattedSubject] = useState(subject);
    const [formattedChapter, setFormattedChapter] = useState(chapter ?? "None");

    // console.log(syllabusAndIDs?.syllabus?.['biology']['cell_biology']);
    // console.log(topics)
    useEffect(() => {
        if(syllabusAndIDs?.syllabus){
            setChapters(Object.keys(syllabusAndIDs.syllabus[subject.replaceAll('-','_')]));
            setFormattedSubject(formatName(subject));

            if(!isSubjectOrChapter){
                setTopics(syllabusAndIDs.syllabus?.[subject.replaceAll('-','_')][chapter.replaceAll('-','_')]);
                setFormattedChapter(formatName(chapter));
            }
        }
    }, [syllabusAndIDs, chapter]);

    const calculateAverage = () => {
        let total = 0;
        if(isSubjectOrChapter){
            chapters?.forEach(chapter => {
                total += sa?.chapters[chapter] || 0;
            })
            return (total / chapters?.length).toFixed(2);
        } else {
            topics?.forEach(topic => {
                total += sa?.topics[topic.name] || 0;
            })
            return (total / topics?.length).toFixed(2) ?? 0;
        }
    }

    const findStrongestChapter = () => {
        let strongest = 'None';
        let value = 0;

        if(isSubjectOrChapter){
            chapters?.forEach(chapter => {
                if(sa?.chapters[chapter] >= value){
                    strongest = chapter;
                    value = sa?.chapters[chapter];
                }
            });
        } else {
            topics?.forEach(topic => {
                if(sa?.topics[topic.name] >= value){
                    strongest = topic.name;
                    value = sa?.topics[topic.name];
                }
            });
        }

        return (
            <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-[#A8ACA8] [font-family:Poppins,sans-serif]">Strongest</p>
                <p className="truncate text-[13px] font-black text-white [font-family:Poppins,sans-serif]">{formatName(strongest)}</p>
                <p className="text-[12px] font-black text-[#10B981] [font-family:Poppins,sans-serif]">{(isSubjectOrChapter ? sa?.chapters[strongest] : sa?.topics[strongest]) ?? 0}%</p>
            </div>
        )
    }

    const findWeakestChapter = () => {
        let weakest = 'None';
        let value = 0;

        if(isSubjectOrChapter){
            chapters?.forEach(chapter => {
                if(sa?.chapters[chapter] <= value){
                    weakest = chapter;
                    value = sa?.chapters[chapter];
                }
            });
        } else {
            topics?.forEach(topic => {
                if(sa?.topics[topic.name] <= value){
                    weakest = topic.name;
                    value = sa?.topics[topic.name];
                }
            });
        }
        
        return (
            <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-[#A8ACA8] [font-family:Poppins,sans-serif]">Needs Work</p>
                <p className="truncate text-[13px] font-black text-white [font-family:Poppins,sans-serif]">{formatName(weakest)}</p>
                <p className="text-[12px] font-black text-[#EF4444] [font-family:Poppins,sans-serif]">{(isSubjectOrChapter ? sa?.chapters[weakest] : sa?.topics[weakest]) ?? 0}%</p>
            </div>
        )
    }

    return (
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 lg:px-8">
                    <Link
                        to={isSubjectOrChapter ? "/dashboard/analytics" : `/dashboard/analytics/${subject}`} 
                        className="group inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.1em] text-[#A8ACA8] transition-colors [font-family:Poppins,sans-serif] hover:text-[#FFC600]"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-[#2E302E] bg-[#222422] transition-colors group-hover:border-[#FFC600]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </div>
                        Back to Analytics
                    </Link>

                    <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-[#2E302E] bg-[#222422] p-5 shadow-[4px_4px_0px_rgba(255,198,0,0.12)] sm:flex-row">
                        <div className="shrink-0">
                            <div className="relative" style={{ width: '120px', height: '120px' }}>
                                <svg width="120" height="120" className="-rotate-90">
                                    <circle cx="60" cy="60" r="54.5" stroke="var(--ui-border)" strokeWidth="11" fill="none" />
                                    <circle cx="60" cy="60" r="54.5" stroke={`${subjectToColor[formattedSubject]}`} strokeWidth="11" strokeLinecap="round" fill="none" strokeDasharray="342.40" strokeDashoffset={342.4 - (((isSubjectOrChapter ? sa?.subjects[subject.replaceAll('-','_')] : sa?.chapters[chapter.replaceAll('-','_')]) ?? 0) / 100) * 342.4} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-black [font-family:Poppins,sans-serif]" style={{ color: subjectToColor[formattedSubject], fontSize: '18px' }}>{(isSubjectOrChapter ? sa?.subjects[subject.replaceAll('-','_')] : sa?.chapters[chapter.replaceAll('-','_')]) ?? 0}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#A8ACA8] [font-family:Poppins,sans-serif]">{isSubjectOrChapter ? 'Subject' : 'Chapter'} Overview</p>
                            <h1 className="mb-3 text-3xl font-black text-white [font-family:Poppins,sans-serif]">{isSubjectOrChapter ? formattedSubject : formattedChapter}</h1>
                            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                                <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#2E302E] bg-[#181A18] px-3 py-1.5 text-[11px] font-black text-white [font-family:Poppins,sans-serif]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                    </svg>
                                    {isSubjectOrChapter ? `${chapters?.length} chapters` : `${topics?.length} Topics`}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#2E302E] bg-[#181A18] px-3 py-1.5 text-[11px] font-black [font-family:Poppins,sans-serif]" style={{ color: subjectToColor[formattedSubject] }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                        <polyline points="16 7 22 7 22 13" />
                                    </svg>
                                    Avg {calculateAverage()}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 rounded-2xl border-2 border-[#2E302E] bg-[#222422] p-4 shadow-[3px_3px_0px_rgba(255,198,0,0.08)]">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2" style={{ backgroundColor: '#10B98122', borderColor: '#10B98155' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                    <polyline points="16 7 22 7 22 13" />
                                </svg>
                            </div>
                            {findStrongestChapter()}
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border-2 border-[#2E302E] bg-[#222422] p-4 shadow-[3px_3px_0px_rgba(255,198,0,0.08)]">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2" style={{ backgroundColor: '#EF444422', borderColor: '#EF444455' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                    <polyline points="16 17 22 17 22 11" />
                                </svg>
                            </div>
                            {findWeakestChapter()}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-1 text-[14px] font-black uppercase tracking-[0.08em] text-white [font-family:Poppins,sans-serif]">{isSubjectOrChapter ? 'Chapter' : 'Topic'} Accuracy</h2>
                        <p className="mb-4 text-[12px] text-[#A8ACA8] [font-family:Inter,sans-serif]">
                            {isSubjectOrChapter ? `${chapters?.length} chapters` : `${topics?.length} Topics`} · colored ring shows your accuracy {isSubjectOrChapter ? ' · tap to drill into topics' : ''}
                        </p>

                        <div className="rounded-2xl border-2 border-[#2E302E] bg-[#222422] p-5 shadow-[4px_4px_0px_rgba(255,198,0,0.1)]">
                            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {
                                    isSubjectOrChapter ? 
                                    chapters?.map((chapter, i) => {
                                        return (
                                            <Link key={i} to={chapter.replaceAll('_','-')} className="group rounded-xl p-2 transition-all hover:scale-[1.05] hover:bg-white/[0.07] cursor-pointer">
                                                <div className="flex select-none flex-col items-center gap-2">
                                                    <div className="relative" style={{ width: '88px', height: '88px' }}>
                                                        <svg width="88" height="88" className="-rotate-90">
                                                            <circle cx="44" cy="44" r="40.5" stroke="var(--ui-border)" strokeWidth="7" fill="none" />
                                                            <circle cx="44" cy="44" r="40.5" stroke={subjectToColor[formattedSubject]} strokeWidth="7" strokeLinecap="round" fill="none" strokeDasharray="254.47" strokeDashoffset={254.47 - ((sa?.chapters[chapter] ?? 0) / 100) * 254.47} />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="font-black [font-family:Poppins,sans-serif]" style={{ color: subjectToColor[formattedSubject], fontSize: '13px' }}>{sa?.chapters[chapter] ?? 0}%</span>
                                                        </div>
                                                        <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--ui-bg)] bg-[#FFC600] shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.5)]">
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#181A18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="9 18 15 12 9 6" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <p className="px-1 text-center text-[12px] font-black leading-tight text-white transition-colors [font-family:Poppins,sans-serif] group-hover:text-[#FFC600]">{formatName(chapter)}</p>
                                                </div>
                                            </Link>
                                        )
                                    }) 
                                    : 
                                    topics?.map((topic, i) => {
                                        return (
                                            <div key={i} className="group rounded-xl p-2 transition-all">
                                                <div className="flex select-none flex-col items-center gap-2">
                                                    <div className="relative" style={{ width: '88px', height: '88px' }}>
                                                        <svg width="88" height="88" className="-rotate-90">
                                                            <circle cx="44" cy="44" r="40.5" stroke="var(--ui-border)" strokeWidth="7" fill="none" />
                                                            <circle cx="44" cy="44" r="40.5" stroke={subjectToColor[formattedSubject]} strokeWidth="7" strokeLinecap="round" fill="none" strokeDasharray="254.47" strokeDashoffset={254.47 - ((sa?.topics[topic.name] ?? 0) / 100) * 254.47} />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="font-black [font-family:Poppins,sans-serif]" style={{ color: subjectToColor[formattedSubject], fontSize: '13px' }}>{sa?.topics[topic.name] ?? 0}%</span>
                                                        </div>
                                                    </div>
                                                    <p className="px-1 text-center text-[12px] font-black leading-tight text-white transition-colors [font-family:Poppins,sans-serif] group-hover:text-[#FFC600]">{formatName(topic.name)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex justify-center pt-2">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#2E302E] bg-[#222422] px-5 py-3 text-[12px] font-black uppercase tracking-[0.1em] text-white shadow-[3px_3px_0px_rgba(255,198,0,0.1)] transition-colors [font-family:Poppins,sans-serif] hover:border-[#FFC600] hover:text-[#FFC600]"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back to Analytics
                        </a>
                    </div> */}

                    <div className="h-4" />
                </div>
            </div>
        </div>
    );
};

export default DetailedAnalyticsPage;
