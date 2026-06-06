import express from "express";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { getMcqDistributionPerTopic, uploadMCQs, getAllTopics, deleteMCQ, retestWrongMCQs } from "../controllers/mcq.js";
import { excelFileUpload } from "../helpers.js";

const router = express.Router();


// Admin functions. 
router.post("/upload", protect, /* restrictTo("ADMIN"), */ excelFileUpload.single("file"), uploadMCQs);
router.delete("/:mcq_id", protect, /* restrictTo("ADMIN"), */ deleteMCQ);

// Both student and admin functions.
router.get("/distribution-per-topic", protect, isPaymentVerified, getMcqDistributionPerTopic);
router.get("/topics", protect, isPaymentVerified, getAllTopics);

// Student functions.
router.get("/retest", protect, isPaymentVerified, retestWrongMCQs);

export default router;