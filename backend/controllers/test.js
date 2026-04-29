import { AppError, handleAsyncError } from "../error.js";
import pool from "../database.js";
import { convertSubjectsChapterTopicsIntoNestedObject, formatColumnName, readDataFromExcelFile } from "../helpers.js";

export const editTest = handleAsyncError(async (req, res, next) => {
    /*
        test_id,
        test_name, 
        mcq_count,
        test_time,
        test_date,
        topics: [1,2,....]
    */
    const {test_id, test_name, mcq_count, test_time, test_date, topics} = req.body;

    try {
        await pool.query(`BEGIN; UPDATE tests SET test_name='${test_name}', mcq_count=${+mcq_count}, test_time=${+test_time}, test_date='${test_date}'::DATE WHERE test_id=${+test_id}; DELETE FROM test_topics WHERE test_id=${+test_id}; INSERT INTO test_topics (test_id, topic_id) VALUES ${topics.split(",").map(topic_id => `(${+test_id},${+topic_id})`).join(", ")}; COMMIT`);
    } catch (err) {
        await pool.query("ROLLBACK");
        throw err;
    }

    let emails = (await readDataFromExcelFile(req.file.buffer)).map(elem => elem.email);
    let student_ids = (await pool.query("SELECT user_id FROM users WHERE email = ANY($1)", [emails])).rows.map(elem => elem.user_id);

    try {
        await pool.query(`BEGIN; DELETE FROM test_enrollments WHERE test_id=${+test_id}; INSERT INTO test_enrollments (test_id, student_id) VALUES ${student_ids.map(student_id => `(${test_id},${student_id})`).join(", ")}; COMMIT`);
    } catch(err) {
        await pool.query("ROLLBACK");
        throw err;
    }

    res.status(200).json({
        status: "success"
    });
});

export const getAllTests = handleAsyncError(async (req, res, next) => {
    let data = (await pool.query("SELECT id, name, date, mcq_count, time, topics, STRING_AGG(test_mcqs.mcq_id::TEXT, ',') AS mcq_ids FROM (SELECT tests.test_id AS id, test_name AS name, test_date::TEXT AS date, mcq_count, test_time AS time, STRING_AGG(topic_name, ',') AS topics FROM tests LEFT JOIN test_topics ON test_topics.test_id=tests.test_id LEFT JOIN topics ON topics.topic_id=test_topics.topic_id GROUP BY tests.test_id, test_name, test_date, mcq_count, test_time) LEFT JOIN test_mcqs ON test_mcqs.test_id = id GROUP BY id, name, date, mcq_count, time, topics")).rows;
    data = data.map(elem => {
        elem.topics = elem.topics ? elem.topics.split(",") : [];
        elem.mcq_ids = elem.mcq_ids ? elem.mcq_ids.split(",").map(id => +id) : [];
        return elem;        
    });
    res.status(200).json({
        status: "success",
        data
    });
});

export const createTest = handleAsyncError(async (req, res, next) => {

    let {test_name, test_time, mcq_count, test_date, topics } = req.body;

    //  Create test
    const data = await pool.query("INSERT INTO tests(test_name, mcq_count, test_time, test_date) VALUES ($1, $2, $3, $4::DATE) RETURNING test_id", [test_name, +mcq_count, +test_time, test_date]);

    //  Insert topics
    const test_id = data.rows[0]?.test_id;
    topics = topics.split(",").map(elem => +elem);
    await pool.query("INSERT INTO test_topics (test_id, topic_id) VALUES " + topics.map(topic_id => `(${test_id},${topic_id})`).join(", "));
        
    //  Insert enrollments
    let emails = (await readDataFromExcelFile(req.file.buffer)).map(elem => elem.email);
    let student_ids = (await pool.query("SELECT user_id FROM users WHERE email = ANY($1)", [emails])).rows.map(elem => elem.user_id);
    await pool.query("INSERT INTO test_enrollments (test_id, student_id) VALUES " + student_ids.map(student_id => `(${test_id},${student_id})`).join(", "));

    res.status(200).json({
        status: "success",
        data: {
            test_id
        }
    });
});

export const discardTest = handleAsyncError(async (req, res, next) => {
    const { test_id } = req.body;
    if (!test_id || !Number.isInteger(+test_id))
        return next(new AppError("Incorrect Query", 400));

    await pool.query("DELETE FROM attempted_mcqs WHERE student_id=$1 AND test_id=$2", [req.user.student_id, +test_id]);

    res.status(200).json({
        status: "success"
    });
});


export const addToTest = handleAsyncError(async (req, res, next) => {
    const { test_id, mcq_id } = req.body;
    await pool.query("INSERT INTO test_mcqs (test_id, mcq_id) VALUES ($1, $2)", [test_id, mcq_id]);

    res.status(200).json({
        status: "success"
    });
});

export const getAllPreviousTests = handleAsyncError(async (req, res, next) => {
    const result = (await pool.query("SELECT tests.test_id, tests.test_name, tests.test_date::TEXT, tests.mcq_count, SUM(CASE WHEN attempted_mcqs.selected_option = mcq_bank.correct_option THEN 1 ELSE 0 END)::INT AS correct, SUM(CASE WHEN attempted_mcqs.selected_option != mcq_bank.correct_option THEN 1 ELSE 0 END)::INT AS mistakes, SUM(CASE WHEN attempted_mcqs.selected_option IS NULL THEN 1 ELSE 0 END)::INT AS skipped FROM tests LEFT JOIN test_mcqs ON test_mcqs.test_id=tests.test_id LEFT JOIN mcq_bank ON mcq_bank.mcq_id = test_mcqs.mcq_id LEFT JOIN attempted_mcqs ON attempted_mcqs.mcq_id = mcq_bank.mcq_id AND attempted_mcqs.test_id = test_mcqs.test_id WHERE ((attempted_mcqs.student_id=$1 AND tests.test_date <= CURRENT_DATE) OR (attempted_mcqs.student_id IS NULL AND tests.test_date < CURRENT_DATE)) AND tests.test_id IN (SELECT test_id FROM test_enrollments WHERE student_id=$1) GROUP BY tests.test_id, tests.test_name, tests.test_date, tests.mcq_count ORDER BY test_date DESC", [req.user.student_id])).rows;

    res.status(200).json({
        status: "success",
        data: result
    });
});

export const getAllUpcomingTests = handleAsyncError(async (req, res, next) => {

    let data = (await pool.query("SELECT res.test_id, test_name, test_date, mcq_count, test_time, subjects, chapters, topics, SUM(CASE WHEN mcq_bank.subject_id=1 THEN 1 ELSE 0 END )::INT AS biology_mcq_count, SUM(CASE WHEN mcq_bank.subject_id=2 THEN 1 ELSE 0 END )::INT AS chemistry_mcq_count, SUM(CASE WHEN mcq_bank.subject_id=3 THEN 1 ELSE 0 END )::INT AS physics_mcq_count, SUM(CASE WHEN mcq_bank.subject_id=4 THEN 1 ELSE 0 END )::INT AS english_mcq_count, SUM(CASE WHEN mcq_bank.subject_id=5 THEN 1 ELSE 0 END )::INT AS logical_reasoning_mcq_count FROM (SELECT test_id, test_name, test_date, mcq_count, test_time, STRING_AGG( subject_name, ',' order BY subject_name ) AS subjects, STRING_AGG( chapters_per_subject, '&&&' ORDER BY subject_name ) AS chapters, STRING_AGG( topics_per_subject, '^^^' ORDER BY subject_name ) AS topics FROM (SELECT test_id, test_name, test_date, mcq_count, test_time, subject_name, STRING_AGG( chapter_name, ',' ORDER BY chapter_name ) AS chapters_per_subject, STRING_AGG( topics_per_chapter, '&&&' ORDER BY chapter_name ) AS topics_per_subject FROM (SELECT tests.test_id AS test_id, test_name, test_date::TEXT, mcq_count, test_time, subject_name, chapter_name, STRING_AGG( topic_name, ',' ORDER BY topic_name ) AS topics_per_chapter FROM tests LEFT JOIN test_topics ON tests.test_id = test_topics.test_id LEFT JOIN topics ON test_topics.topic_id = topics.topic_id LEFT JOIN subjects ON topics.subject_id = subjects.subject_id LEFT JOIN chapters ON chapters.chapter_id = topics.chapter_id WHERE tests.test_date >= CURRENT_DATE AND tests.test_id IN (SELECT test_id FROM test_enrollments WHERE student_id = $1 ) AND tests.test_id NOT IN (SELECT test_id FROM attempted_mcqs WHERE student_id = $1 AND test_id IS NOT NULL ) GROUP BY tests.test_id, test_name, test_date, mcq_count, test_time, subject_name, chapter_name ORDER BY tests.test_date ) GROUP BY test_id, test_name, test_date, mcq_count, test_time, subject_name) GROUP BY test_id, test_name, test_date, mcq_count, test_time) AS res LEFT JOIN test_mcqs ON test_mcqs.test_id=res.test_id LEFT JOIN mcq_bank ON mcq_bank.mcq_id=test_mcqs.mcq_id GROUP BY res.test_id, test_name, test_date, mcq_count, test_time, subjects, chapters, topics", [req.user.student_id])).rows;

    data = data.map((obj) => {        

        obj.syllabus = {}
        obj.chapters = obj.chapters?.split("&&&") ?? [];
        obj.topics = obj.topics?.split("^^^") ?? [];

        obj.subjects?.split(",").forEach((subject, subj_idx) => {

            obj.syllabus[formatColumnName(subject)] = {};
            const topics_per_chapter = obj.topics[subj_idx]?.split("&&&") ?? [];

            obj.chapters[subj_idx]?.split(",").forEach((chap, chap_idx) => {
                obj.syllabus[formatColumnName(subject)][formatColumnName(chap)] = topics_per_chapter[chap_idx]?.split(",") ?? [];
            });
        });

        obj.subjects = obj.chapters = obj.topics = undefined;
        return obj;
    });

    res.status(200).json({
        status: "success",
        data
    });
});

export const getTestInfo = handleAsyncError(async (req, res, next) => {    
    const data = (await pool.query("SELECT DISTINCT subject_name, chapter_name, topic_name, topics.topic_id FROM test_topics INNER JOIN topics ON test_topics.topic_id = topics.topic_id INNER JOIN chapters ON topics.chapter_id = chapters.chapter_id INNER JOIN subjects ON topics.subject_id = subjects.subject_id WHERE test_id=$1", [req.params.test_id])).rows;
    const syllabus = convertSubjectsChapterTopicsIntoNestedObject(data);
    const mcqs = (await pool.query("SELECT mcq_bank.mcq_id, question, option_a, option_b, option_c, option_d, selected_option, correct_option, explanation, subject_name FROM tests INNER JOIN test_mcqs ON test_mcqs.test_id = tests.test_id INNER JOIN mcq_bank ON mcq_bank.mcq_id = test_mcqs.mcq_id INNER JOIN subjects ON subjects.subject_id=mcq_bank.subject_id LEFT JOIN attempted_mcqs ON attempted_mcqs.mcq_id = mcq_bank.mcq_id AND attempted_mcqs.test_id = tests.test_id WHERE tests.test_id=$2 AND (attempted_mcqs.student_id=$1 OR attempted_mcqs.student_id IS NULL)", [req.user.student_id, req.params.test_id])).rows;

    let highest_score = (await pool.query("SELECT MAX(count)::INT AS max FROM ( SELECT SUM(CASE WHEN attempted_mcqs.selected_option = mcq_bank.correct_option THEN 1 ELSE 0 END) AS count FROM tests INNER JOIN test_mcqs ON test_mcqs.test_id = tests.test_id INNER JOIN mcq_bank ON mcq_bank.mcq_id = test_mcqs.mcq_id INNER JOIN attempted_mcqs ON attempted_mcqs.mcq_id = mcq_bank.mcq_id AND attempted_mcqs.test_id = tests.test_id WHERE tests.test_id= $1 GROUP BY attempted_mcqs.student_id )", [req.params.test_id])).rows;
    highest_score = highest_score.length === 0 ? undefined : highest_score[0].max;

    res.status(200).json({
        status: "success",
        data: {
            highest_score,
            syllabus, 
            mcqs
        }
    });
});