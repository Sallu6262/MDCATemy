import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuiz } from "../utils/api.js";
import { useQuiz } from "../utils/QuizContext.jsx";

const ConfigurePage = () => {
    const navigate = useNavigate();
    const { selectedSubjects, config, setConfig, setMcqs, setAnswers } = useQuiz();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedSubjects.length === 0) navigate("/subjects", { replace: true });
    }, [selectedSubjects, navigate]);

    const total = config.easy + config.medium + config.hard;

    const update = (key) => (e) => {
        const value = Math.max(0, parseInt(e.target.value || "0", 10));
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const start = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await generateQuiz({
                subject_ids: selectedSubjects.map(s => s.subject_id),
                easy:   config.easy,
                medium: config.medium,
                hard:   config.hard,
            });
            if (data.count.total === 0) {
                setError("No MCQs matched your filters. Pick more subjects or change difficulty counts.");
                return;
            }
            setMcqs(data.mcqs);
            setAnswers({});
            navigate("/quiz");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="card">
                <h2 style={{ marginTop: 0 }}>2. Configure quiz</h2>
                <p className="muted">
                    Selected: {selectedSubjects.map(s => s.subject_name).join(", ")}
                </p>

                <div className="row" style={{ marginTop: "1rem" }}>
                    {["easy", "medium", "hard"].map(key => (
                        <label key={key} style={{ flex: 1, minWidth: 140 }}>
                            <div style={{ marginBottom: 4, textTransform: "capitalize" }}>{key}</div>
                            <input
                                type="number"
                                min="0"
                                value={config[key]}
                                onChange={update(key)}
                            />
                        </label>
                    ))}
                </div>

                <p className="muted" style={{ marginTop: "1rem" }}>
                    Total MCQs: <strong style={{ color: "var(--text)" }}>{total}</strong>
                </p>

                {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
            </div>

            <div className="row between">
                <button className="ghost" onClick={() => navigate("/subjects")}>Back</button>
                <button onClick={start} disabled={total === 0 || loading}>
                    {loading ? "Generating..." : "Start Quiz"}
                </button>
            </div>
        </>
    );
};

export default ConfigurePage;
