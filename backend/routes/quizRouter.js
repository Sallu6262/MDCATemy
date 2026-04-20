import express from "express";
import multer from "multer";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { submitQuiz, generateQuiz, getAllUserQuizzesNames, createQuiz, getAllUserQuizzesDetails, resumeQuiz } from "../controllers/quiz.js";

const router = express.Router();

// Student functions
// TODO: Implement

// This function is only to help user not enter duplicate name. Althoug HE CAN!
router.get("/names", protect, isPaymentVerified, /* restrictTo("student"), */ getAllUserQuizzesNames);

// TODO: Implement
router.get("/details", protect, isPaymentVerified, /* restrictTo("student"), */ getAllUserQuizzesDetails);
router.post("/create", protect, isPaymentVerified, /* restrictTo("student"), */ createQuiz);
router.post("/resume", protect, isPaymentVerified, /* restrictTo("student"), */ resumeQuiz);
router.post("/generate", protect, isPaymentVerified, /* restrictTo("student"), */ generateQuiz);
router.post("/submit", protect, isPaymentVerified, /* restrictTo("student"), */ submitQuiz);

export default router;