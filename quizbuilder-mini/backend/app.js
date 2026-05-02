import express from "express";
import cors from "cors";
import morgan from "morgan";

import subjectRouter from "./routes/subjectRouter.js";
import quizRouter    from "./routes/quizRouter.js";
import { errorMiddleware } from "./error.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(morgan("tiny"));

app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/quizzes",  quizRouter);

app.use((req, res) => res.status(404).json({
    status: "fail",
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
}));

app.use(errorMiddleware);

export default app;
