import { AppError, handleAsyncError } from "../error.js";
import jwt from "jsonwebtoken";
import pool from "../database.js";
import { unlink } from "node:fs/promises";
import fs from "fs/promises";

export const isCouponValid = async (coupon) => {
    return (await pool.query("SELECT code FROM coupons WHERE code=$1", [coupon])).rows[0] ? true : false;
};

export const getUnverifiedUsers = handleAsyncError(async (req, res, next) => {
    let emails = [];

    try {
        emails = await fs.readdir("receipts");
    } catch (err) {
        console.error("Error: Receipts directory doesn't exist!", err);
    }
    
    emails = emails.map(email => email.replace(".jpg", ""));

    const data = (await pool.query("SELECT name, email, phone, role, upgrade_role, academic_status, payment_status, upgrade_status, coupon FROM users INNER JOIN students ON students.student_id=users.user_id WHERE email = ANY($1) ORDER BY user_id ASC", [emails])).rows;

    res.status(200).json({
        status: "success",
        data
    });
});
export const rejectPayment = handleAsyncError(async (req, res, next) => {
    if (!req.body?.email)
        return next(new AppError("Please provide the user's email to verify his/her payment", 400));
    if (!req.body?.payment_status)
        return next(new AppError("Please provide user's current payment status to reject his/her payment", 400));

    if (req.body.payment_status === 'VERIFIED') {
        await pool.query("UPDATE students SET upgrade_status=NULL, upgrade_role=NULL WHERE student_id = (SELECT user_id FROM users WHERE email=$1)", [req.body.email]);
    } else {
        await pool.query("UPDATE students SET payment_status='REJECTED', upgrade_status=NULL, upgrade_role=NULL WHERE student_id = (SELECT user_id FROM users WHERE email=$1)", [req.body.email]);
    }
    try {
        await unlink(`receipts/${req.body.email}.jpg`);
    } catch(err) {
        console.error(`Error deleting receipt for ${req.body.email}:`, err);
    }
    res.status(200).json({
        status: "success",
        message: "Payment Rejected"
    });
});

export const verifyPayment = handleAsyncError(async (req, res, next) => {
    if (!req.body?.email)
        return next(new AppError("Please provide the user's email to verify his/her payment", 400));
    if (!req.body?.role)
        return next(new AppError("Please provide user's new role to verify his/her payment", 400));

    await pool.query("UPDATE students SET payment_status='VERIFIED', upgrade_status=NULL WHERE student_id = (SELECT user_id FROM users WHERE email=$1)", [req.body.email]);
    await pool.query("UPDATE users SET role=$2 WHERE email=$1", [req.body.email, req.body.role]);
    try {
        await unlink(`receipts/${req.body.email}.jpg`);
    } catch(err) {
        console.error(`Error deleting receipt for ${req.body.email}:`, err);
    }
    res.status(200).json({
        status: "success",
        message: "Payment Verified"
    });
});
export const getPendingPaymentReceipt = (req, res, next) => {
    res.sendFile(`${req.params.email}.jpg`, {root: "receipts"}); 
};

export const getPaymentStatus = (req, res, next) => {    
    res.status(200).json({
        status: "success",
        payment_status: req.user.payment_status,
        upgrade_status: req.user.upgrade_status ?? undefined
    });
};

export const verifyCoupon = handleAsyncError(async (req, res, next) => {
    const flag = await isCouponValid(req.body.coupon); 
    res.status(flag ? 200 : 404).json({
        status: flag ? "success" : "fail"
    });
});