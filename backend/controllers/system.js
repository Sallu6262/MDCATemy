import pool from "../database.js";
import { handleAsyncError } from "../error.js";

export const getRemainingSeats = handleAsyncError(async (req, res, next) => {
    const seats = (await pool.query("SELECT 120 - COALESCE(COUNT(student_id), 0)::INT AS remaining_seats FROM students INNER JOIN users ON students.student_id = users.user_id WHERE payment_status='VERIFIED' AND role='TRIBE_MEMBER'")).rows[0].remaining_seats;

    res.status(200).json({
        status: "success",
        data: {
            seats
        }
    });
})
