import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitQuiz } from "../utils/api.js";
import { useQuiz } from "../utils/QuizContext.jsx";

const OPTIONS = ["A", "B", "C", "D"];

const QuizPage = () => {
    const navigate = useNavigate();
    const { mcqs, answers, setAnswers, selectedSubjects, setResult } = useQuiz();
    const [index, setIndex] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (mcqs.length === 0) navigate("/", { replace: true });
    }, [mcqs, navigate]);

    if (mcqs.length === 0) return null;

    const mcq = mcqs[index];
    const selected = answers[mcq.mcq_id];

    const choose = (letter) =>
        setAnswers(prev => ({ ...prev, [mcq.mcq_id]: letter }));

    const allAnswered = mcqs.every(m => answers[m.mcq_id]);

    const submit = async () => {
        setError(null);
        setSubmitting(true);
        try {
            const data = await submitQuiz({
                subject_ids: selectedSubjects.map(s => s.subject_id),
                attempts: mcqs.map(m => ({
                    mcq_id: m.mcq_id,
                    selected_option: answers[m.mcq_id],
                })),
            });
            setResult(data);
            navigate("/result");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="card">
                <div className="row between" style={{ marginBottom: "1rem" }}>
                    <span className="muted">Question {index + 1} of {mcqs.length}</span>
                    <span className="muted">
                        {mcq.subject_name} · <span style={{ textTransform: "lowercase" }}>{mcq.difficulty}</span>
                    </span>
                </div>

                <h3 style={{ marginTop: 0 }}>{mcq.question}</h3>

                <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                    {OPTIONS.map(letter => {
                        const text = mcq[`option_${letter.toLowerCase()}`];
                        const isPicked = selected === letter;
                        return (
                            <button
                                key={letter}
                                className={isPicked ? "" : "ghost"}
                                onClick={() => choose(letter)}
                                style={{ textAlign: "left", padding: "0.75rem 1rem" }}
                            >
                                <strong>{letter}.</strong> {text}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="row between">
                <button
                    className="ghost"
                    onClick={() => setIndex(i => Math.max(0, i - 1))}
                    disabled={index === 0}
                >
                    Previous
                </button>

                {index < mcqs.length - 1 ? (
                    <button onClick={() => setIndex(i => i + 1)} disabled={!selected}>
                        Next
                    </button>
                ) : (
                    <button onClick={submit} disabled={!allAnswered || submitting}>
                        {submitting ? "Submitting..." : "Submit Quiz"}
                    </button>
                )}
            </div>

            {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
        </>
    );
};

export default QuizPage;
