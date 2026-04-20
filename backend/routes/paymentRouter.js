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
router.get("/pending", /* restrictTo("admin"), */ getUnverifiedUsers);
router.get("/receipt/:email", /* restrictTo("admin"), */ getPendingPaymentReceipt);
router.post("/verify", /* restrictTo("admin"), */ verifyPayment);
router.delete("/reject", /* restrictTo("admin"), */ rejectPayment);

export default router;