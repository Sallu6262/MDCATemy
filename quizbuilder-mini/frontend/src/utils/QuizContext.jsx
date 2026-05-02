import { createContext, useContext, useState } from "react";

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
    const [selectedSubjects, setSelectedSubjects] = useState([]); // [{id, name}]
    const [config, setConfig] = useState({ easy: 0, medium: 0, hard: 0 });
    const [mcqs, setMcqs] = useState([]);
    const [answers, setAnswers] = useState({}); // { mcq_id: 'A' | 'B' | ... }
    const [result, setResult] = useState(null);

    const reset = () => {
        setSelectedSubjects([]);
        setConfig({ easy: 0, medium: 0, hard: 0 });
        setMcqs([]);
        setAnswers({});
        setResult(null);
    };

    return (
        <QuizContext.Provider value={{
            selectedSubjects, setSelectedSubjects,
            config, setConfig,
            mcqs, setMcqs,
            answers, setAnswers,
            result, setResult,
            reset,
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const ctx = useContext(QuizContext);
    if (!ctx) throw new Error("useQuiz must be used inside <QuizProvider>");
    return ctx;
};
