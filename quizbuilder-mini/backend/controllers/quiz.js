import pool from "../database.js";
import { AppError, handleAsyncError } from "../error.js";

export const generateQuiz = handleAsyncError(async (req, res, next) => {
    /*
        body: {
            subject_ids: [1, 2, ...],
            easy: number, medium: number, hard: number
        }
    */
    let { subject_ids, easy = 0, medium = 0, hard = 0 } = req.body;
    [easy, medium, hard] = [easy, medium, hard].map(Number);

    if (!Array.isArray(subject_ids) || subject_ids.length === 0)
        return next(new AppError("subject_ids must be a non-empty array.", 400));

    if ([easy, medium, hard].some(n => !Number.isInteger(n) || n < 0))
        return next(new AppError("Difficulty counts must be non-negative integers.", 400));

    if (easy + medium + hard === 0)
        return next(new AppError("Total MCQ count must be at least 1.", 400));

    const sql = `
        SELECT mcq_id, question, option_a, option_b, option_c, option_d,
               correct_option, explanation, difficulty,
               mcq_bank.subject_id, subject_name
        FROM mcq_bank
        INNER JOIN subjects ON subjects.subject_id = mcq_bank.subject_id
        WHERE difficulty = $1 AND mcq_bank.subject_id = ANY($2)
        ORDER BY RANDOM() LIMIT $3
    `;

    const buckets = { easy: [], medium: [], hard: [] };
    if (easy)   buckets.easy   = (await pool.query(sql, ["EASY",   subject_ids, easy])).rows;
    if (medium) buckets.medium = (await pool.query(sql, ["MEDIUM", subject_ids, medium])).rows;
    if (hard)   buckets.hard   = (await pool.query(sql, ["HARD",   subject_ids, hard])).rows;

    const mcqs = [...buckets.easy, ...buckets.medium, ...buckets.hard];

    res.status(200).json({
        status: "success",
        data: {
            count: {
                easy:   buckets.easy.length,
                medium: buckets.medium.length,
                hard:   buckets.hard.length,
                total:  mcqs.length,
            },
            mcqs,
        },
    });
});

export const submitQuiz = handleAsyncError(async (req, res, next) => {
    /*
        body: {
            quiz_name?: string,
            subject_ids: [1, 2, ...],
            attempts: [ { mcq_id, selected_option } ]
        }
    */
    const { quiz_name, subject_ids, attempts } = req.body;

    if (!Array.isArray(subject_ids) || subject_ids.length === 0)
        return next(new AppError("subject_ids must be a non-empty array.", 400));
    if (!Array.isArray(attempts) || attempts.length === 0)
        return next(new AppError("attempts must be a non-empty array.", 400));

    const mcqIds = attempts.map(a => a.mcq_id);
    const correctMap = new Map(
        (await pool.query(
            "SELECT mcq_id, correct_option FROM mcq_bank WHERE mcq_id = ANY($1)",
            [mcqIds]
        )).rows.map(r => [r.mcq_id, r.correct_option])
    );

    let correct_count = 0;
    for (const a of attempts) {
        if (correctMap.get(a.mcq_id) === a.selected_option) correct_count++;
    }

    const client = await pool.connect();
    let quiz_id;
    try {
        await client.query("BEGIN");

        const finalName = quiz_name?.trim() || `Quiz ${Date.now()}`;
        const insertQuiz = await client.query(
            "INSERT INTO quizzes (quiz_name, mcq_count, correct_count) VALUES ($1, $2, $3) RETURNING quiz_id",
            [finalName, attempts.length, correct_count]
        );
        quiz_id = insertQuiz.rows[0].quiz_id;

        for (const sid of subject_ids) {
            await client.query(
                "INSERT INTO quiz_subjects (quiz_id, subject_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
                [quiz_id, sid]
            );
        }

        for (const a of attempts) {
            await client.query(
                "INSERT INTO attempted_mcqs (quiz_id, mcq_id, selected_option) VALUES ($1, $2, $3)",
                [quiz_id, a.mcq_id, a.selected_option]
            );
        }

        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }

    res.status(201).json({
        status: "success",
        data: {
            quiz_id,
            mcq_count: attempts.length,
            correct_count,
            score_percent: Math.round((correct_count / attempts.length) * 100),
        },
    });
});

export const getAllQuizzes = handleAsyncError(async (req, res) => {
    const { rows } = await pool.query(`
        SELECT q.quiz_id, q.quiz_name, q.mcq_count, q.correct_count,
               q.attempt_date,
               COALESCE(STRING_AGG(s.subject_name, ', ' ORDER BY s.subject_name), '') AS subjects
        FROM quizzes q
        LEFT JOIN quiz_subjects qs ON qs.quiz_id = q.quiz_id
        LEFT JOIN subjects s ON s.subject_id = qs.subject_id
        GROUP BY q.quiz_id
        ORDER BY q.quiz_id DESC
    `);
    res.status(200).json({ status: "success", data: rows });
});
