import express from "express";
import multer from "multer";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { recordAnswer, generateQuiz, createQuiz, getAllUserQuizzesDetails, submitQuizResult } from "../controllers/quiz.js";
import { quizStudentRoles } from "../helpers.js";

const router = express.Router();

// Student functions
router.get("/details", protect, restrictTo(...quizStudentRoles), isPaymentVerified, getAllUserQuizzesDetails);
router.post("/create", protect, restrictTo(...quizStudentRoles), isPaymentVerified, createQuiz);
router.post("/generate", protect, isPaymentVerified, generateQuiz);
router.post("/record-answer", protect, isPaymentVerified, recordAnswer);
router.post("/result", protect, restrictTo(...quizStudentRoles), isPaymentVerified, submitQuizResult);

export default router;