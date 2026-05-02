import { Link } from "react-router-dom";

const Header = () => (
    <header className="app-header">
        <Link to="/" style={{ textDecoration: "none" }}>
            <h1>QuizBuilder<span>-Mini</span></h1>
        </Link>
        <span className="muted">Powered by Docker</span>
    </header>
);

export default Header;
