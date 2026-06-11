import express from "express";
import multer from "multer";
import { protect, restrictTo } from "../controllers/auth.js";
import { verifyCoupon, getPaymentStatus, getUnverifiedUsers, rejectPayment, verifyPayment, getPendingPaymentReceipt  } from "../controllers/payment.js";
import { AppError } from "../error.js";

const router = express.Router();

// Student functions.
router.get("/status", protect, getPaymentStatus);
router.post("/verify-coupon", protect, verifyCoupon);


// Admin functions.
router.get("/pending", protect, restrictTo("ADMIN"), getUnverifiedUsers);
router.get("/receipt/:email", protect, restrictTo("ADMIN"), getPendingPaymentReceipt);
router.post("/verify", protect, restrictTo("ADMIN"), verifyPayment);
router.delete("/reject", protect, restrictTo("ADMIN"), rejectPayment);

export default router;