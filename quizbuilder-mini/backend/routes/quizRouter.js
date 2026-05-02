import express from "express";
import { generateQuiz, submitQuiz, getAllQuizzes } from "../controllers/quiz.js";

const router = express.Router();

router.get("/",          getAllQuizzes);
router.post("/generate", generateQuiz);
router.post("/submit",   submitQuiz);

export default router;
