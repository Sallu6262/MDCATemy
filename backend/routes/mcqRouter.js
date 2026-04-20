import express from "express";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { getMcqDistributionPerTopic, uploadMCQs, getAllTopics } from "../controllers/mcq.js";
import { excelFileUpload } from "../helpers.js";

const router = express.Router();


// Admin functions.
router.post("/upload", protect, /* restrictTo("admin"), */ excelFileUpload.single("file"), uploadMCQs);

// Student Functions.
// I don't remember why this function was?
// router.post("/add", protect, isPaymentVerified, getAllTopics);

// Both student and admin functions.
router.get("/distribution-per-topic", protect, isPaymentVerified, getMcqDistributionPerTopic);
router.get("/topics", protect, isPaymentVerified, getAllTopics);

export default router;