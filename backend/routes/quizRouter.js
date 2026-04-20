import express from "express";
import multer from "multer";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { submitQuiz, generateQuiz, getAllQuizNamesForUser, createQuiz } from "../controllers/quiz.js";

const router = express.Router();

// Student functions
// TODO: Implement
router.get("/names", protect, isPaymentVerified, /* restrictTo("student"), */ getAllQuizNamesForUser);
// TODO: Implement
router.post("/create", protect, isPaymentVerified, /* restrictTo("student"), */ createQuiz);
router.post("/generate", protect, isPaymentVerified, /* restrictTo("student"), */ generateQuiz);
router.post("/submit", protect, isPaymentVerified, /* restrictTo("student"), */ submitQuiz);

export default router;