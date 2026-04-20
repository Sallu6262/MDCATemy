import express from "express";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { getAllTests, createTest, editTest, getUpcomingTest, addToTest, getTestInfo, getAllTestStats, submitTest } from "../controllers/test.js";
import { excelFileUpload } from "../helpers.js";

const router = express.Router();

// Admin functions
router.get("/names", protect, /* restrictTo("admin"), */ getAllTests);
// TODO: Implement
router.post("/create", protect, /* restrictTo("admin"), */ excelFileUpload.single("file"), createTest);
// TODO: Implement
router.post("/edit", protect, /* restrictTo("admin"), */ editTest);
router.post("/add-mcq", protect, /* restrictTo("admin"), */ addToTest);


// Student functions
// TODO: Implement
router.get("/upcoming", protect, isPaymentVerified, /* restrictTo("student"), */ getUpcomingTest);
router.get("/all", protect, isPaymentVerified, /* restrictTo("student"), */ getAllTestStats);
router.get("/:slug", protect, isPaymentVerified, /* restrictTo("student"), */ getTestInfo);
// TODO: Implement
router.post("/submit", protect, isPaymentVerified, /* restrictTo("student"), */ submitTest);

export default router;