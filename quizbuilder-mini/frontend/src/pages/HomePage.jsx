import { useNavigate } from "react-router-dom";
import { useQuiz } from "../utils/QuizContext.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const { reset } = useQuiz();

    const start = () => {
        reset();
        navigate("/subjects");
    };

    return (
        <div className="card center">
            <h2 style={{ marginTop: 0 }}>Build your own MCQ quiz</h2>
            <p className="muted" style={{ maxWidth: 480, margin: "0 auto 2rem" }}>
                Pick subjects, choose how many easy / medium / hard MCQs you want,
                and we'll randomly assemble a quiz for you from a 30-MCQ bank.
            </p>
            <button onClick={start}>Build Quiz</button>
        </div>
    );
};

export default HomePage;
