import express from "express";
import multer from "multer";
import { signup, login, logout, protect, restrictTo, isPaymentVerified } from "../controllers/auth.js";
import { getMe, getDashboardStats, getSavedMCQs, getWrongMCQs, deleteSavedMCQ, deleteWrongMCQ, uploadPaymentReceipt, bookmarkMCQ } from "../controllers/user.js";

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
router.get("/stats", protect, isPaymentVerified, /* restrictTo("student"), */ getDashboardStats);
router.get("/bookmarks", protect, isPaymentVerified, /* restrictTo("student"), */ getSavedMCQs);
router.post("/bookmarks/:mcq_id", protect, isPaymentVerified, /* restrictTo("student"), */ bookmarkMCQ);
router.delete("/bookmarks/:mcq_id", protect, isPaymentVerified, /* restrictTo("student"), */ deleteSavedMCQ);
router.get("/mistakes", protect, isPaymentVerified, /* restrictTo("student"), */ getWrongMCQs);
router.delete("/mistakes/:mcq_id", protect, isPaymentVerified, /* restrictTo("student"), */ deleteWrongMCQ);

router.post("/signup", signup);
router.post("/receipt", protect, upload.single("receipt"), uploadPaymentReceipt);

// Both student and admin functions
router.post("/login", login);
router.post("/logout", protect, isPaymentVerified, logout);

export default router;