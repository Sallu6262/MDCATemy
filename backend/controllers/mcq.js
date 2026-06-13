import pool from "../database.js";
import { formatColumnName, readDataFromExcelFile } from "../helpers.js";
import { AppError, handleAsyncError } from "../error.js";
import { convertSyllabusQueryResultIntoSyllabusObject } from "../helpers.js";

export const getMcqDistributionPerTopic = handleAsyncError(async (req, res, next) => {
    const data = (await pool.query("SELECT topics.topic_id, topic_name, COUNT(mcq_bank.mcq_id)::INT FROM mcq_bank RIGHT JOIN topics ON mcq_bank.topic_id = topics.topic_id GROUP BY topics.topic_id, topics.topic_name")).rows;
    res.status(200).json({
        status: "success",
        data
    });
});

export const uploadMCQs = handleAsyncError(async (req, res, next) => {
    if (!req.file)
        return next(new AppError("No file uploaded.", 400));

    const data = await readDataFromExcelFile(req.file.buffer);

    const query = "INSERT INTO mcq_bank(mcq_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_id, chapter_id, topic_id) VALUES " + data.map(mcq => {
        mcq.question = String(mcq.question).replace(/'/g, "''");
        mcq.option_a = String(mcq.option_a).replace(/'/g, "''");
        mcq.option_b = String(mcq.option_b).replace(/'/g, "''");
        mcq.option_c = String(mcq.option_c).replace(/'/g, "''");
        mcq.option_d = String(mcq.option_d).replace(/'/g, "''");
        mcq.correct_option = String(mcq.correct_option).replace(/'/g, "''");
        mcq.explanation = String(mcq.explanation).replace(/'/g, "''");
        return `(${mcq.mcq_id}, '${mcq.question}', '${mcq.option_a}', '${mcq.option_b}', '${mcq.option_c}', '${mcq.option_d}', '${mcq.correct_option}', '${mcq.explanation}', '${mcq.difficulty}', ${mcq.subject_id}, ${mcq.chapter_id}, ${mcq.topic_id})`;
    }).join(", ");

    await pool.query(query);

    res.status(204).json({
        status: "success"
    });
});


export const getAllTopics = handleAsyncError(async (req, res, next) => {
    let data = (await pool.query("SELECT subject_name, chapter_name, topic_name, subjects.subject_id, chapters.chapter_id, topics.topic_id FROM topics INNER JOIN chapters ON chapters.chapter_id=topics.chapter_id INNER JOIN subjects ON subjects.subject_id=topics.subject_id")).rows;
    let syllabus = convertSyllabusQueryResultIntoSyllabusObject(data);
    let subject_ids = {};
    let chapter_ids = {};

    data.forEach(obj => {
        subject_ids[formatColumnName(obj.subject_name)] = obj.subject_id;
    });
    data.forEach(obj => {
        chapter_ids[formatColumnName(obj.chapter_name)] = obj.chapter_id;
    });

    res.status(200).json({
        status: "success",
        data: {
            subject_ids,
            chapter_ids,
            syllabus,
        }
    });
});

export const deleteMCQ = handleAsyncError(async (req, res, next) => {
    (await pool.query("DELETE FROM mcq_bank WHERE mcq_id=$1", [req.params.mcq_id]));
    res.status(204).json({
        status: "success"
    });
});

export const retestWrongMCQs = handleAsyncError(async (req, res, next) => {

    // /mcqs/retest?start=1&end=10&biology=1&physics=1&search=umair,anwar
    
    const {start, end} = req.query;
    const subjects = [];

    if (req.query.biology) subjects.push("Biology");        
    if (req.query.physics) subjects.push("Physics");
    if (req.query.english) subjects.push("English");
    if (req.query.chemistry) subjects.push("Chemistry");
    if (req.query.logical_reasoning) subjects.push("Logical Reasoning");

    const search = req.query?.search?.split(",").map(word => `%${word}%`) ?? ["%"];    
    const mcqs = (await pool.query("SELECT mcq_bank.mcq_id, topic_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_name, chapter_name, (CASE WHEN bookmarks.mcq_id IS NOT NULL THEN 1 ELSE 0 END) AS is_bookmarked FROM attempted_mcqs INNER JOIN mcq_bank ON mcq_bank.mcq_id = attempted_mcqs.mcq_id INNER JOIN subjects ON mcq_bank.subject_id = subjects.subject_id INNER JOIN chapters ON mcq_bank.chapter_id = chapters.chapter_id LEFT JOIN bookmarks ON bookmarks.mcq_id = mcq_bank.mcq_id AND bookmarks.student_id = $1 WHERE attempted_mcqs.student_id=$1 AND subjects.subject_name = ANY ($4) AND mcq_bank.question ILIKE ANY($5) AND attempted_mcqs.selected_option != mcq_bank.correct_option ORDER BY attempted_date, subject_name DESC LIMIT $2 OFFSET $3", [req.user.student_id, end-start+1, start-1, subjects, search])).rows;

    res.status(200).json({
        status: "success",
        data: mcqs
    });
});