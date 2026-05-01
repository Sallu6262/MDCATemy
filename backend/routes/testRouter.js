import express from "express";
import { isPaymentVerified, protect, restrictTo, verifyTestAccess } from "../controllers/auth.js";
import { getAllTests, createTest, editTest, getAllUpcomingTests, addToTest, getAllPreviousTests, discardTest, getAttemptedTestInfo, getLiveTestInfo  } from "../controllers/test.js";
import { recordAnswer } from "../controllers/quiz.js";
import { excelFileUpload } from "../helpers.js";

const router = express.Router();

// Admin functions
router.get("/names", protect, /* restrictTo("admin"), */ getAllTests);
router.post("/create", protect, /* restrictTo("admin"), */ excelFileUpload.single("file"), createTest);
router.post("/edit", protect, /* restrictTo("admin"), */ excelFileUpload.single("file"), editTest);
router.post("/add-mcq", protect, /* restrictTo("admin"), */ addToTest);


// Student functions
router.get("/previous", protect, isPaymentVerified, /* restrictTo("student"), */ getAllPreviousTests);
router.get("/upcoming", protect, isPaymentVerified, /* restrictTo("student"), */ getAllUpcomingTests);
router.post("/record-answer", protect, isPaymentVerified, verifyTestAccess, /* restrictTo("student"), */ recordAnswer);
router.post("/discard", protect, isPaymentVerified, verifyTestAccess, discardTest)
router.get("/attempted/:test_id", protect, isPaymentVerified, /* restrictTo("student"), */ getAttemptedTestInfo);
router.get("/live/:test_id", protect, isPaymentVerified, /* restrictTo("student"), */ getLiveTestInfo);


export default router;