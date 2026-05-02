import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSubjects } from "../utils/api.js";
import { useQuiz } from "../utils/QuizContext.jsx";

const SubjectsPage = () => {
    const navigate = useNavigate();
    const { selectedSubjects, setSelectedSubjects } = useQuiz();
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubjects()
            .then(setSubjects)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const isSelected = (id) => selectedSubjects.some(s => s.subject_id === id);

    const toggle = (subject) => {
        setSelectedSubjects(prev =>
            isSelected(subject.subject_id)
                ? prev.filter(s => s.subject_id !== subject.subject_id)
                : [...prev, subject]
        );
    };

    if (loading) return <div className="card center muted">Loading subjects...</div>;
    if (error)   return <div className="card center" style={{ color: "var(--danger)" }}>Error: {error}</div>;

    return (
        <>
            <div className="card">
                <h2 style={{ marginTop: 0 }}>1. Pick subjects</h2>
                <p className="muted">Select one or more subjects.</p>
                <div className="row">
                    {subjects.map(s => (
                        <button
                            key={s.subject_id}
                            className={isSelected(s.subject_id) ? "" : "ghost"}
                            onClick={() => toggle(s)}
                        >
                            {s.subject_name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="row between">
                <button className="ghost" onClick={() => navigate("/")}>Back</button>
                <button
                    onClick={() => navigate("/configure")}
                    disabled={selectedSubjects.length === 0}
                >
                    Next: Configure ({selectedSubjects.length} selected)
                </button>
            </div>
        </>
    );
};

export default SubjectsPage;
