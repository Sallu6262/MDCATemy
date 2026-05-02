import pool from "../database.js";
import { handleAsyncError } from "../error.js";

export const getAllSubjects = handleAsyncError(async (req, res) => {
    const { rows } = await pool.query(
        "SELECT subject_id, subject_name FROM subjects ORDER BY subject_id"
    );
    res.status(200).json({ status: "success", data: rows });
});
