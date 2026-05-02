import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../utils/QuizContext.jsx";

const OPTIONS = ["A", "B", "C", "D"];

const ResultPage = () => {
    const navigate = useNavigate();
    const { result, mcqs, answers, reset } = useQuiz();

    useEffect(() => {
        if (!result) navigate("/", { replace: true });
    }, [result, navigate]);

    if (!result) return null;

    const startOver = () => {
        reset();
        navigate("/");
    };

    return (
        <>
            <div className="card center">
                <h2 style={{ marginTop: 0 }}>Quiz #{result.quiz_id} complete</h2>
                <p style={{ fontSize: "2.5rem", margin: "1rem 0" }}>
                    {result.correct_count} / {result.mcq_count}
                </p>
                <p className="muted">Score: {result.score_percent}%</p>
            </div>

            <div className="card">
                <h3 style={{ marginTop: 0 }}>Review</h3>
                {mcqs.map((m, i) => {
                    const picked = answers[m.mcq_id];
                    const correct = m.correct_option;
                    const isRight = picked === correct;
                    return (
                        <div key={m.mcq_id} style={{
                            borderTop: i === 0 ? "none" : "1px solid var(--border)",
                            padding: "1rem 0",
                        }}>
                            <div className="muted" style={{ fontSize: "0.85rem" }}>
                                Q{i + 1} · {m.subject_name} · {m.difficulty.toLowerCase()}
                            </div>
                            <div style={{ margin: "0.4rem 0" }}>{m.question}</div>
                            {OPTIONS.map(letter => {
                                const isPicked  = picked === letter;
                                const isCorrect = correct === letter;
                                let color = "var(--muted)";
                                if (isCorrect) color = "var(--success)";
                                else if (isPicked && !isCorrect) color = "var(--danger)";
                                return (
                                    <div key={letter} style={{ color, fontSize: "0.95rem" }}>
                                        {letter}. {m[`option_${letter.toLowerCase()}`]}
                                        {isCorrect && " ✓"}
                                        {isPicked && !isCorrect && " ✗ (your answer)"}
                                    </div>
                                );
                            })}
                            {m.explanation && (
                                <div className="muted" style={{ marginTop: "0.4rem", fontSize: "0.9rem" }}>
                                    <em>Why:</em> {m.explanation}
                                </div>
                            )}
                            <div style={{
                                marginTop: "0.4rem",
                                color: isRight ? "var(--success)" : "var(--danger)",
                                fontSize: "0.9rem",
                            }}>
                                {isRight ? "Correct" : "Incorrect"}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="row between">
                <button className="ghost" onClick={startOver}>Build Another Quiz</button>
            </div>
        </>
    );
};

export default ResultPage;
