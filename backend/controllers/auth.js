import { AppError, handleAsyncError } from "../error.js";
import pool from "../database.js";
import argon from "argon2";
import jwt from "jsonwebtoken";

const signJwtToken = (email, role) => {
    return jwt.sign({ email, role }, process.env.JWT_SIGN_SECRET, {
        expiresIn: "7 days"
    });
}

const signTokenAndSetInCookie = (email, role, res) => {
    res.cookie("mdcatemy-login-token", signJwtToken(email, role), {
        httpOnly: true,
        sameSite: "strict",
        path: "/api",
        maxAge: 7 * 24 * 60 * 60 * 1000,      // 7 days
        secure: process.env.MODE === "prod"
    });
}

const hashPassword = async (password) => {
    try {
        return (await argon.hash(password, {
            hashLength: 32,
            type: argon.argon2id,
            secret: Buffer.from(process.env.PASSWORD_HASH_SECRET)
        }));
    } catch(err) {
        console.error("Error in hashing passwrod: \n", err);
        return err;
    }
}

const verifyPassword = async (actual_password, input_password) => {
    return await argon.verify(actual_password, input_password, {
        secret: Buffer.from(process.env.PASSWORD_HASH_SECRET)
    });
}


export function restrictTo(...roles) {
    return function(req, res, next) {
        if (roles.includes(req.user.role))
            return next();
        next(new AppError("You are not authorized for this service!", 401));
    }
}

export const protect = handleAsyncError(async (req, res, next) => {
    const token = req.cookies["mdcatemy-login-token"];
    if (!token) 
        return next(new AppError("You're not logged in!", 401));
    const payload = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    let user = undefined;

    if (payload.role === "ADMIN")
        user = (await pool.query("SELECT user_id, name, email, role, password_changed_at FROM users WHERE email=$1", [payload.email])).rows[0];
    else
        user = (await pool.query("SELECT student_id, name, email, role, streak, password_changed_at, payment_status, upgrade_status, target_marks FROM users INNER JOIN students ON users.user_id=students.student_id WHERE email=$1", [payload.email])).rows[0];

    if (!user)
        return next(new AppError("This user doesn't exist", 404));
    if (payload.iat*1000 <= user.password_changed_at)
        return next(new AppError("You have changed your password. Please log in again!", 401));
    
    req.user = user;
    next();
});

export const isPaymentVerified = handleAsyncError(async (req, res, next) => {
    if (req.user.payment_status === 'PENDING') 
        return next(new AppError("Your payment process is pending. Please wait until your payment is verified.", 100));
    if (req.user.payment_status === 'REJECTED') 
        return next(new AppError("Your payment has been rejected. Please upload your payment receipt again, or contact the admins to initiate verification process.", 300));
    next();
});


export const signup = handleAsyncError(async (req, res, next) => {
    let {name, father_name, gender, role, phone, email, password, academic_status, province, city, matric_percentage, fsc_percentage, prev_mdcat_score} = req.body;

    if (!name || !father_name || !email || !password || !gender || !phone || !role || !province || !city || !matric_percentage || !fsc_percentage || !academic_status)
        return next(new AppError("Incomplete Data for Signup!", 400));
    
    const AGGREGATE_THRESHOLD = 90;
    const target_marks = parseInt(400*(AGGREGATE_THRESHOLD - 0.1*matric_percentage - 0.4*fsc_percentage));

    if (role === "TRIBE_MEMBER" &&  target_marks > 180)
        return next(new AppError(`You cannot signup for the Study Tribe module. Your target marks are ${target_marks}. Because they're greater than 180, we can't enroll you in this year's batch.`, 400));

    password = await hashPassword(password);

    await pool.query("INSERT INTO users (name, father_name, email, password, gender, role) VALUES ($1, $2, $3, $4, $5, $6)", [name, father_name, email, password, gender, role]);

    const user = (await pool.query("SELECT user_id, role FROM users WHERE email=$1", [email])).rows[0];
    
    await pool.query("INSERT INTO students (student_id, phone, academic_status, province, city, matric_percentage, fsc_percentage, prev_mdcat_score, target_marks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [user.user_id, phone, academic_status, province, city, matric_percentage, fsc_percentage, prev_mdcat_score, target_marks]);
    
    signTokenAndSetInCookie(email, user.role, res);

    res.status(200).json({
        status: "success",
        message: "Signed Up Successfully! Welcome Home!"
    });
});

export const login = handleAsyncError(async (req, res, next) => {
    const {email: input_email, password: input_password} = req.body;

    if (!input_email || !input_password) 
        return next(new AppError("Please provide complete credentials", 400));

        const user = (await pool.query("SELECT email, password FROM users WHERE email=$1", [input_email])).rows[0];

    if (!user || !await verifyPassword(user.password, input_password))
        return next(new AppError("Incorrect email or password!", 401));

    signTokenAndSetInCookie(user.email, user.role, res);

    
    res.status(200).json({
        status: "success",
        message: "Logged In Successfully!"
    });
});

export const logout = (req, res, next) => {
    res.cookie("mdcatemy-login-token", "", {
        sameSite: "strict",
        path: "/api",
        maxAge: 0
    });
    res.status(200).json({
        status: "success",
        message: "Logged out!"
    });
};