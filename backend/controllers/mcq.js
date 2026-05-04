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
    console.log(data);

    await pool.query("INSERT INTO mcq_bank(mcq_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_id, chapter_id, topic_id) VALUES " + data.map(mcq => `(${mcq.mcq_id}, '${mcq.question}', '${mcq.option_a}', '${mcq.option_b}', '${mcq.option_c}', '${mcq.option_d}', '${mcq.correct_option}', '${mcq.explanation}', '${mcq.difficulty}', ${mcq.subject_id}, ${mcq.chapter_id}, ${mcq.topic_id})`).join(", "))

    res.status(200).json({
        status: "success"
    });
});


export const getAllTopics = handleAsyncError(async (req, res, next) => {
    let data = (await pool.query("SELECT DISTINCT subject_name, chapter_name, topic_name, subjects.subject_id, topics.topic_id FROM mcq_bank INNER JOIN subjects ON subjects.subject_id=mcq_bank.subject_id INNER JOIN chapters ON chapters.chapter_id=mcq_bank.chapter_id INNER JOIN topics ON topics.topic_id=mcq_bank.topic_id")).rows;
    let syllabus = convertSyllabusQueryResultIntoSyllabusObject(data);
    let subject_ids = {};

    data.forEach(obj => {
        subject_ids[formatColumnName(obj.subject_name)] = obj.subject_id;
    });

    res.status(200).json({
        status: "success",
        data: {
            subject_ids,
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