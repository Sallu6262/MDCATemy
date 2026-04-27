import React, { forwardRef } from 'react'

const DownloadPDFComponent = forwardRef(({test}, ref) => {
    // console.log(test);
    return (
        <div
            ref={ref}
            className="max-w-3xl mx-auto p-8 border"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
            >

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">
                {test?.test_name}
                </h1>

                <p style={{ fontSize: "12px", color: "#4b5563", marginTop: "4px" }}>
                Total Questions: {test?.mcqs?.length}
                </p>
            </div>

            {
                test?.mcqs?.map((mcq, i) => {
                    return <div key={i} className="mb-6 pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
    
                        <div className="flex justify-between">
                            <p className="font-semibold">
                                Q{i+1}. {mcq.question}
                            </p>
                        </div>

                        <div className="mt-2 pl-4 space-y-1">
                            <p>A) {mcq.option_a}</p>
                            <p>B) {mcq.option_b}</p>
                            <p>C) {mcq.option_c}</p>
                            <p>D) {mcq.option_d}</p>
                        </div>

                        {/* Correct Answer */}
                        <p style={{ marginTop: "8px", fontSize: "12px", color: "#10b981" }}>
                        Correct Answer: {mcq.correct_option}
                        </p>

                        <p style={{ fontSize: "11px", color: "#2563eb" }}>
                            {mcq.subject_name}
                        </p>
                    </div>
                })
            }
        </div>
    )
})

export default DownloadPDFComponent