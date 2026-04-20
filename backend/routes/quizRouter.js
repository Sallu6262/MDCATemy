import express from "express";
import multer from "multer";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { recordAnswer, generateQuiz, createQuiz, getAllUserQuizzesDetails, submitQuizResult } from "../controllers/quiz.js";

const router = express.Router();

// Student functions
router.get("/details", protect, isPaymentVerified, /* restrictTo("student"), */ getAllUserQuizzesDetails);
router.post("/create", protect, isPaymentVerified, /* restrictTo("student"), */ createQuiz);
router.post("/generate", protect, isPaymentVerified, /* restrictTo("student"), */ generateQuiz);
router.post("/record-answer", protect, isPaymentVerified, /* restrictTo("student"), */ recordAnswer);
router.post("/result", protect, isPaymentVerified, /* restrictTo("student"), */ submitQuizResult);

export default router;