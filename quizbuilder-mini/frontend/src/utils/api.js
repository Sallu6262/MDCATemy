// In production (nginx) the frontend is served on the same origin and /api is
// proxied to the backend. In dev (`npm run dev`) we point at the backend
// directly via VITE_API_BASE.
const API_BASE = import.meta.env.VITE_API_BASE || "/api/v1";

const request = async (path, options = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || `Request failed (${res.status})`);
    return json.data;
};

export const fetchSubjects = () => request("/subjects");

export const generateQuiz = (payload) =>
    request("/quizzes/generate", { method: "POST", body: JSON.stringify(payload) });

export const submitQuiz = (payload) =>
    request("/quizzes/submit", { method: "POST", body: JSON.stringify(payload) });
