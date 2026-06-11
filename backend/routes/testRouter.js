import express from "express";
import { isPaymentVerified, protect, restrictTo, verifyTestAccess } from "../controllers/auth.js";
import { getAllTests, createTest, editTest, getAllUpcomingTests, addToTest, getAllPreviousTests, discardTest, getAttemptedTestInfo, getLiveTestInfo, submitTest  } from "../controllers/test.js";
import { recordAnswer } from "../controllers/quiz.js";
import { excelFileUpload, testStudentRoles } from "../helpers.js";

const router = express.Router();

// Admin functions
router.get("/names", protect, restrictTo("ADMIN"), getAllTests);
router.post("/create", protect, restrictTo("ADMIN"), excelFileUpload.single("file"), createTest);
router.post("/edit", protect, restrictTo("ADMIN"),  excelFileUpload.single("file"), editTest);
router.post("/add-mcq", protect, restrictTo("ADMIN"),  addToTest);


// Student functions
router.get("/previous", protect, restrictTo(...testStudentRoles), isPaymentVerified, getAllPreviousTests);
router.get("/upcoming", protect, restrictTo(...testStudentRoles), isPaymentVerified, getAllUpcomingTests);
router.post("/record-answer", protect, isPaymentVerified, verifyTestAccess, restrictTo(...testStudentRoles), recordAnswer);
router.post("/discard", protect, isPaymentVerified, verifyTestAccess, restrictTo(...testStudentRoles), discardTest);
router.post("/submit", protect, isPaymentVerified, verifyTestAccess, restrictTo(...testStudentRoles), submitTest);
router.get("/attempted/:test_id", protect, isPaymentVerified, restrictTo(...testStudentRoles), getAttemptedTestInfo);
router.get("/live/:test_id", protect, isPaymentVerified, restrictTo(...testStudentRoles), getLiveTestInfo);


export default router;