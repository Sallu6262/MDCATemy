import pool from "../database.js";
import { handleAsyncError } from "../error.js";

export const getRemainingSeats = handleAsyncError(async (req, res, next) => {
    
    // Dynamically Calculate from Verified TIRBE_MEMBERs students count.
    // const seats = (await pool.query("SELECT 88 - COALESCE(COUNT(student_id), 0)::INT AS remaining_seats FROM students INNER JOIN users ON students.student_id = users.user_id WHERE payment_status='VERIFIED' AND role='TRIBE_MEMBER'")).rows[0].remaining_seats;

    // Get from the database hard coded count.
    const seats = (await pool.query("SELECT remaining_seats FROM global_variables LIMIT 1")).rows[0].remaining_seats;

    res.status(200).json({
        status: "success",
        data: {
            seats
        }
    });
})
