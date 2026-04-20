import express from "express";
import { isPaymentVerified, protect, restrictTo } from "../controllers/auth.js";
import { getAllTests, createTest, editTest, getUpcomingTest, addToTest, getTestInfo, getAllTestStats, submitTest } from "../controllers/test.js";
import { excelFileUpload } from "../helpers.js";

const router = express.Router();

// Admin functions
router.get("/names", protect, /* restrictTo("admin"), */ getAllTests);
router.post("/create", protect, /* restrictTo("admin"), */ excelFileUpload.single("file"), createTest);
router.post("/add-mcq", protect, /* restrictTo("admin"), */ addToTest);


// Student functions
router.get("/all", protect, isPaymentVerified, /* restrictTo("student"), */ getAllTestStats);
router.get("/:slug", protect, isPaymentVerified, /* restrictTo("student"), */ getTestInfo);



// TODO: Implement All following.
router.get("/upcoming", protect, isPaymentVerified, /* restrictTo("student"), */ getUpcomingTest);
router.post("/submit", protect, isPaymentVerified, /* restrictTo("student"), */ submitTest);
router.post("/edit", protect, /* restrictTo("admin"), */ editTest);

export default router;