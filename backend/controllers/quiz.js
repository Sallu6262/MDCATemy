import { readDataFromExcelFile } from "../helpers.js";
import { AppError, handleAsyncError } from "../error.js";
import pool from "../database.js";

export const getAllUserQuizzesDetails = handleAsyncError(async (req, res, next) => {
    let data = (await pool.query("SELECT quizzes.quiz_id, quiz_name, correct_count, mcq_count, attempt_date::TEXT, quiz_mode, STRING_AGG(subjects.subject_id::TEXT, ',') AS subject_ids, STRING_AGG(subject_name, ',') AS subject_names FROM quizzes INNER JOIN quiz_subjects ON quizzes.quiz_id=quiz_subjects.quiz_id INNER JOIN subjects ON subjects.subject_id=quiz_subjects.subject_id WHERE student_id=$1 GROUP BY quizzes.quiz_id, quiz_name, correct_count, mcq_count, attempt_date, quiz_mode ORDER BY quizzes.quiz_id DESC", [req.user.student_id])).rows;
    data = data.map(elem => {
        elem.subjects = [];
        elem.subject_ids = elem.subject_ids.split(",");
        elem.subject_names = elem.subject_names.split(",");
        elem.subject_ids.forEach((_, index) => {
            elem.subjects.push({
                id: +elem.subject_ids[index],
                name: elem.subject_names[index],
            });
        });
        elem.subject_ids = elem.subject_names = undefined;
        return elem;
    });
    res.status(200).json({
        status: "success",
        data
    });
});

export const createQuiz = handleAsyncError(async (req, res, next) => {
    let {quiz_name, quiz_mode, mcq_count, subject_ids, quiz_count} = req.body;
    quiz_name = quiz_name ?? `Quiz ${quiz_count+1}`;

    const quiz_id = (await pool.query("INSERT INTO quizzes (quiz_name, mcq_count, quiz_mode, student_id) VALUES ($1, $2, $3, $4) RETURNING quiz_id", [quiz_name, mcq_count, quiz_mode, req.user.student_id])).rows[0]?.quiz_id;
    await pool.query("INSERT INTO quiz_subjects(quiz_id, subject_id) VALUES " + subject_ids.map(subject_id => `(${quiz_id}, ${subject_id})`));

    res.status(200).json({
        status: "success",
        message: "Quiz created successfully!"
    });
});

export const generateQuiz = handleAsyncError(async (req, res, next) => {
    /*
        query: ?easy=10&medium=5&hard=3
        body: {
            topic_ids: [1,2,3,....]  
        }
    */
    let quiz = {
        count: {
            easy: 0, medium: 0, hard: 0
        },
        mcqs: {
            easy: [], medium: [], hard: []
        }
    };

    let isError = false;    
    let {easy, medium, hard} = req.body;
    [easy, medium, hard] = [easy, medium, hard].map(elem => elem ? +elem : 0);

    [easy, medium, hard].forEach(count => {
        if (isError || !Number.isInteger(count) || count < 0)
            return isError = true;
    });
    if (isError || !req.body.topic_ids || !Array.isArray(req.body.topic_ids)) 
        return next(new AppError("Incorrect Query", 400));

    let query = "SELECT mcq_bank.mcq_id, topic_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_name, chapter_name, (CASE WHEN bookmarks.mcq_id IS NOT NULL THEN 1 ELSE 0 END) AS is_bookmarked FROM mcq_bank INNER JOIN subjects ON subjects.subject_id = mcq_bank.subject_id INNER JOIN chapters ON chapters.chapter_id = mcq_bank.chapter_id LEFT JOIN bookmarks ON bookmarks.mcq_id=mcq_bank.mcq_id AND bookmarks.student_id=$1 WHERE difficulty='<<diff>>' AND topic_id = ANY($3) ORDER BY RANDOM() LIMIT $2";

    if (easy) {
        query = query.replace("<<diff>>", "EASY");
        quiz.mcqs.easy = (await pool.query(query, [req.user.student_id, easy, req.body.topic_ids])).rows;
        query = query.replace("EASY", "<<diff>>");
    }
    if (medium) {
        query = query.replace("<<diff>>", "MEDIUM");
        quiz.mcqs.medium = (await pool.query(query, [req.user.student_id, medium, req.body.topic_ids])).rows;
        query = query.replace("MEDIUM", "<<diff>>");
    }
    if (hard) {
        query = query.replace("<<diff>>", "HARD");
        quiz.mcqs.hard = (await pool.query(query, [req.user.student_id, hard, req.body.topic_ids])).rows;
    }

    quiz.count.easy = quiz.mcqs.easy.length;
    quiz.count.medium = quiz.mcqs.medium.length;
    quiz.count.hard = quiz.mcqs.hard.length;

    res.status(200).json({
        status: "success",
        data: quiz
    });
});


export const recordAnswer = handleAsyncError(async (req, res, next) => {
/*
    body: {
        quiz_id | test_id,
        attempts: [ { id, selected_option, correct_option } ]
    }
*/

    const {test_id, quiz_id, attempts: mcq_attempts} = req.body;
    const correct_count = mcq_attempts.reduce((count, mcq) => count + (mcq.selected_option === mcq.correct_option), 0)
    
    let today_activity = (await pool.query(`SELECT attempt_count, correct_count FROM activity WHERE student_id=$1 AND activity_date=$2::DATE`, [req.user.student_id, new Date()])).rows;

    if (!today_activity.length)
        await pool.query("INSERT INTO activity(student_id, attempt_count, correct_count, streak) VALUES ($1, $2, $3, $4)", [req.user.student_id, mcq_attempts.length, correct_count, req.user.streak]);
    else
        await pool.query("UPDATE activity SET attempt_count=$2, correct_count=$3, streak=$4 WHERE student_id=$1 AND activity_date=$5::DATE", [req.user.student_id, today_activity[0].attempt_count + mcq_attempts.length, today_activity[0].correct_count + correct_count, req.user.streak, new Date()]);

    // await pool.query("UPDATE students SET total_mistakes=total_mistakes+$2 WHERE student_id=$1", [req.user.student_id, mcq_attempts.length - correct_count]);

    if (quiz_id)
        await pool.query("INSERT INTO attempted_mcqs (student_id, mcq_id, quiz_id, selected_option) VALUES " + mcq_attempts.map(mcq => `(${req.user.student_id}, ${mcq.id}, ${quiz_id}, '${mcq.selected_option}')`).join(", "));
    else
        await pool.query("INSERT INTO attempted_mcqs (student_id, mcq_id, test_id, selected_option) VALUES " + mcq_attempts.map(mcq => `(${req.user.student_id}, ${mcq.id}, ${test_id}, '${mcq.selected_option}')`).join(", "));

    res.status(200).json({
        status: "success"
    });
});

export const submitQuizResult = handleAsyncError(async (req, res, next) => {
    const {quiz_id, correct_count} = req.body;
    if (!quiz_id || !correct_count)
        return next("Please provide both quiz_id and correct_count", 400);

    await pool.query("UPDATE quizzes SET correct_count=$2 WHERE quiz_id=$1", [quiz_id, correct_count]);

    res.status(200).json({
        status: "success"
    });
});
