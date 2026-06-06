import pool from "../database.js";
import { handleAsyncError } from "../error.js";

export const getRemainingSeats = handleAsyncError(async (req, res, next) => {
    const seats = (await pool.query("SELECT 100 - COALESCE(COUNT(student_id), 0)::INT AS remaining_seats FROM students WHERE payment_status='VERIFIED'")).rows[0].remaining_seats;

    res.status(200).json({
        status: "success",
        data: {
            seats
        }
    });
})