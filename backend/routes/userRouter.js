import express from "express";
import multer from "multer";
import { signup, login, logout, protect, restrictTo, isPaymentVerified } from "../controllers/auth.js";
import { getMe, getDashboardStats, getSavedMCQs, getWrongMCQs, deleteSavedMCQ, deleteWrongMCQ, uploadPaymentReceipt, bookmarkMCQ, getWeakestTopics, getPredictedScoreLeaderboard, getUserActivity, getUsersSubjectChapterTopicWisePerformance } from "../controllers/user.js";
import { studentRoles } from "../helpers.js";

const router = express.Router();

const upload = multer({storage: multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${req.user.email}.jpg`);
    },
    destination: (req, file, cb) => {
        cb(null, `receipts`);
    }
}), fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image"))
        return cb(null, false);
    cb(null, true);
}, limits: {
    fields: 2,
    fileSize: 100 * 1024,
    files: 1,
    parts: 4
}});


// Student functions
router.get("/me", protect, getMe);
router.get("/stats", protect, isPaymentVerified, restrictTo(...studentRoles), getDashboardStats);
router.get("/activity", protect, isPaymentVerified, restrictTo(...studentRoles), getUserActivity);
router.get("/performance", protect, isPaymentVerified, restrictTo(...studentRoles), getUsersSubjectChapterTopicWisePerformance); 
router.get("/leaderboard", protect, isPaymentVerified, restrictTo(...studentRoles), getPredictedScoreLeaderboard);
router.post("/weakest-topics", protect, isPaymentVerified, restrictTo(...studentRoles), getWeakestTopics);

router.get("/bookmarks", protect, isPaymentVerified, restrictTo(...studentRoles), getSavedMCQs);
router.post("/bookmarks/:mcq_id", protect, isPaymentVerified, restrictTo(...studentRoles), bookmarkMCQ);
router.delete("/bookmarks/:mcq_id", protect, isPaymentVerified, restrictTo(...studentRoles), deleteSavedMCQ);

router.get("/mistakes", protect, isPaymentVerified, restrictTo(...studentRoles), getWrongMCQs);
router.delete("/mistakes/:mcq_id", protect, isPaymentVerified, restrictTo(...studentRoles), deleteWrongMCQ);

router.post("/receipt", protect, restrictTo(...studentRoles), upload.single("receipt"), uploadPaymentReceipt);

// Both student and admin functions
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protect, isPaymentVerified, logout);

export default router;