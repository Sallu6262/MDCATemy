import pool from "../database.js";
import { AppError, handleAsyncError } from "../error.js";
import { convertSyllabusQueryResultIntoSyllabusObject, formatColumnName, isString } from "../helpers.js";
import { isCouponValid } from "./payment.js";

const SAVED_MCQS_PER_PAGE = 10;
const MILLISECONDS_IN_DAY = 86400000;


export const getMe = handleAsyncError(async (req, res, next) => {
    let data, user = req.user;
    if (req.user.role === "ADMIN") {
        data = {
            id: user.user_id,
            name: user.name,
            father_name: user.father_name,
            email: user.email,
            gender: user.gender,
            role: user.role
        }
    } else {
        data = {
            id: user.student_id,
            name: user.name,
            father_name: user.father_name,
            email: user.email,
            role: user.role,
            gender: user.gender,
            phone: user.phone,
            city: user.city,
            province: user.province,
            academic_status: user.academic_status,
            matric_percentage: user.matric_percentage,
            fsc_percentage: user.fsc_percentage,
            prev_mdcat_score: user.prev_mdcat_score,
            predicted_score: user.predicted_score,
            target_marks: user.target_marks,
            payment_status: user.payment_status,
            upgrade_status: user.upgrade_status
        }
    }
    res.status(200).json({
        status: "success",
        data
    });
});

export const getDashboardStats = handleAsyncError(async (req, res, next) => {
    let user = {
        name: req.user.name,
        email: req.user.email,
        streak: req.user.streak,
        tests_attempted: 0,
        today_attempt: 0,
        total_attempt: 0,
        total_correct: 0,
        target_marks: req.user.target_marks,
        predicted_score: req.user.predicted_score,
        subjects: {},
        chapters: {},
        topics: {}
    };
    
    const yesterday = new Date(Date.now()-1*MILLISECONDS_IN_DAY);
    let yesterday_activity = (await pool.query(`SELECT streak, attempt_count, activity_date::TEXT FROM activity WHERE student_id=$1 AND activity_date=$2::DATE`, [req.user.student_id, yesterday])).rows[0];

    if ((!yesterday_activity || yesterday_activity.attempt_count < 50) && req.user.streak != 0) {

        user.streak = 0;
        await pool.query("UPDATE students SET streak=0 WHERE student_id=$1", [req.user.student_id]);

    } else if (yesterday_activity && yesterday_activity.attempt_count >= 50 && +yesterday_activity.streak === req.user.streak) {

        user.streak = req.user.streak+1;
        await pool.query("UPDATE students SET streak=$1 WHERE student_id=$2", [req.user.streak+1, req.user.student_id]);
        
    }
    await captureSubjectMasterySnapshot(req.user.student_id);

    const today_acitivity = (await pool.query(`SELECT attempt_count FROM activity WHERE student_id=$1 AND activity_date=CURRENT_DATE`, [req.user.student_id])).rows[0];
    if (today_acitivity) {
        user.today_attempt = +today_acitivity.attempt_count;
    }

    [user.subjects, user.chapters, user.topics] = await fetchUsersSubjectChapterTopicWisePerformance(req.user.student_id);

    [user.total_attempt, user.total_correct] = Object.values((await pool.query("SELECT COALESCE(COUNT(attempted_mcqs.student_id),0)::INT  AS total_attempt_count, COALESCE(SUM(CASE WHEN attempted_mcqs.selected_option=mcq_bank.correct_option THEN 1 ELSE 0 END),0)::INT AS total_correct_count FROM attempted_mcqs INNER JOIN mcq_bank ON mcq_bank.mcq_id=attempted_mcqs.mcq_id WHERE attempted_mcqs.student_id=$1", [req.user.student_id])).rows[0]);
    user.accuracy = !user.total_attempt ? 0 : Math.round((user.total_correct/user.total_attempt)*100);

    user.tests_attempted = (await pool.query("SELECT COALESCE(COUNT(DISTINCT test_id),0)::INT AS count FROM attempted_mcqs WHERE test_id IS NOT NULL AND student_id=$1", [req.user.student_id])).rows[0].count;
    user.activity = await fetchUserActivity(req.user.student_id, new Date(Date.now()-6*MILLISECONDS_IN_DAY), new Date());
    user.weak_topics = await fetchWeakestNTopics(req.user.student_id, 4);
    user.performance = await calculateUserPerformanceJump(req.user.student_id);

    res.status(200).json({
        status: "success",
        data: user 
    });
});

const getMCQsAndSubjectWiseCountsForUser = async (req, next, mcq_query, subject_count_query) => {
    let {page, biology, physics, chemistry, english, logical_reasoning} = req.query;
    let search = req.query.search ?? "";
    let isError = false;
    const subjects = ["Biology", "Physics", "Chemistry", "English", "Logical Reasoning"];
    const selected_subjects = [];

    [page, biology, physics, chemistry, english, logical_reasoning] = 
    [page, biology, physics, chemistry, english, logical_reasoning].map(elem => elem ? +elem : 0);

    if (!Number.isInteger(page) || page <= 0 || !isString(search)) {
        next(new AppError("Incorrect Query", 400));
        throw new Error("Incorrect Query");
    }

    [biology, physics, chemistry, english, logical_reasoning]
    .forEach((flag, index) => {
        if (flag == 1)
            selected_subjects.push(subjects[index]);
    });
    search = search.split(",").map(word => `%${word}%`);

    const mcqs = (await pool.query(mcq_query, [req.user.student_id, SAVED_MCQS_PER_PAGE, (+page-1)*SAVED_MCQS_PER_PAGE, selected_subjects, search])).rows;
    const subject_wise_counts = (await pool.query(subject_count_query, [req.user.student_id])).rows;

    return [subject_wise_counts, mcqs];
};

export const bookmarkMCQ = handleAsyncError(async (req, res, next) => {
    await pool.query("INSERT INTO bookmarks (student_id, mcq_id) VALUES ($1, $2)", [+req.user.student_id, +req.params.mcq_id]);
    res.status(200).json({
        status: "success"
    });
});

export const getSavedMCQs = handleAsyncError(async (req, res, next) => {
    // /saved-mcqs?page=1&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1&search=umair,anwar
    let data = {
        current_count: 0,
        total_count: 0,
        biology: 0,
        physics: 0,
        chemistry: 0,
        english: 0,
        logical_reasoning: 0
    };

    const mcq_query = "SELECT mcq_bank.mcq_id, subject_name, chapter_name, question, option_a, option_b, option_c, option_d, correct_option, explanation, saved_date::TEXT, COUNT(mcq_bank.mcq_id) OVER()::INT AS total_count FROM bookmarks INNER JOIN mcq_bank ON mcq_bank.mcq_id = bookmarks.mcq_id INNER JOIN subjects ON mcq_bank.subject_id = subjects.subject_id INNER JOIN chapters ON mcq_bank.chapter_id = chapters.chapter_id WHERE student_id=$1 AND subjects.subject_name = ANY ($4) AND mcq_bank.question ILIKE ANY($5) ORDER BY saved_date, subject_name DESC LIMIT $2 OFFSET $3";
    const subject_count_query = "SELECT subject_name, COALESCE(COUNT(mcq_bank.mcq_id)::INT, 0) AS mcq_count FROM bookmarks INNER JOIN mcq_bank ON mcq_bank.mcq_id=bookmarks.mcq_id INNER JOIN subjects ON mcq_bank.subject_id=subjects.subject_id WHERE student_id=$1 GROUP BY subject_name";

    const [subject_wise_counts, mcqs] = await getMCQsAndSubjectWiseCountsForUser(req, next, mcq_query, subject_count_query);

    subject_wise_counts.forEach(obj => {
        data[formatColumnName(obj.subject_name)] += obj.mcq_count;
    });

    mcqs.forEach(obj => {
        data.total_count = obj.total_count;
        delete obj.total_count;
    });

    data.current_count = mcqs.length;
    data.mcqs = mcqs;

    res.status(200).json({
        status: "success",
        data
    });
});


export const getWrongMCQs = handleAsyncError(async (req, res, next) => {
    // /wrong-mcqs?page=1&biology=1&physics=1&chemistry=1&english=1&logical_reasoning=1&search=umair,anwar

    let data = {
        current_count: 0,
        total_count: 0,
        biology: 0,
        physics: 0,
        chemistry: 0,
        english: 0,
        logical_reasoning: 0,
        total_mistakes: 0,
        pending_mistakes: 0
    };

    const mcq_query = "SELECT DISTINCT mcq_bank.mcq_id, subject_name, chapter_name, question, option_a, option_b, option_c, option_d, correct_option, selected_option, explanation, difficulty, attempted_mcqs.attempted_date::TEXT AS attempted_date, COUNT(mcq_bank.mcq_id) OVER()::INT AS total_count FROM attempted_mcqs INNER JOIN mcq_bank ON mcq_bank.mcq_id = attempted_mcqs.mcq_id INNER JOIN subjects ON mcq_bank.subject_id = subjects.subject_id INNER JOIN chapters ON mcq_bank.chapter_id = chapters.chapter_id WHERE student_id=$1 AND subjects.subject_name = ANY ($4) AND mcq_bank.question ILIKE ANY($5) AND attempted_mcqs.selected_option != mcq_bank.correct_option ORDER BY attempted_date, subject_name DESC LIMIT $2 OFFSET $3";
    const subject_count_query = "SELECT subject_name, COALESCE(COUNT(mcq_bank.mcq_id)::INT, 0) AS mcq_count FROM attempted_mcqs INNER JOIN mcq_bank ON mcq_bank.mcq_id=attempted_mcqs.mcq_id INNER JOIN subjects ON mcq_bank.subject_id=subjects.subject_id WHERE student_id=$1 AND attempted_mcqs.selected_option != mcq_bank.correct_option GROUP BY subject_name";
    
    const [subject_wise_counts, mcqs] = await getMCQsAndSubjectWiseCountsForUser(req, next, mcq_query, subject_count_query); 

    subject_wise_counts.forEach(obj => {
        data[formatColumnName(obj.subject_name)] += obj.mcq_count;
    });

    mcqs.forEach(obj => {
        data.total_count = obj.total_count;
        delete obj.total_count;
    });
    data.current_count = mcqs.length;
    data.mcqs = mcqs;

    [data.total_mistakes, data.pending_mistakes] = Object.values((await pool.query("SELECT COUNT(attempted_mcqs.mcq_id)::INT AS total_mistakes, COALESCE(SUM(CASE WHEN attempted_mcqs.selected_option != mcq_bank.correct_option THEN 1 ELSE 0 END),0)::INT AS pending_mistakes FROM attempted_mcqs INNER JOIN mcq_bank ON mcq_bank.mcq_id = attempted_mcqs.mcq_id WHERE attempted_mcqs.student_id=$1 AND (attempted_mcqs.selected_option != mcq_bank.correct_option OR attempted_mcqs.is_mastered=1)", [req.user.student_id])).rows[0]);
    
    res.status(200).json({
        status: "success",
        data
    });
});

export const deleteSavedMCQ = handleAsyncError(async (req, res, next) => {
    if (!req.params.mcq_id || !Number.isInteger(+req.params.mcq_id)) 
        return next(new AppError("Incorrect Query", 400));

    await pool.query("DELETE FROM bookmarks WHERE student_id=$1 AND mcq_id=$2", [+req.user.student_id, +req.params.mcq_id]);

    res.status(200).json({
        status: "success"
    });
});

export const deleteWrongMCQ = handleAsyncError(async (req, res, next) => {
    const { mcq_id: mcq } = req.params;

    if (!mcq || !Number.isInteger(+mcq)) 
        return next(new AppError("Incorrect Query", 400));

    await pool.query(`UPDATE attempted_mcqs SET selected_option=(SELECT correct_option FROM mcq_bank WHERE mcq_id=$2), is_mastered=1 WHERE student_id=$1 AND mcq_id=$2`, [+req.user.student_id, mcq]);

    res.status(200).json({
        status: "success"
    });
});

export const uploadPaymentReceipt = handleAsyncError(async (req, res, next) => {
    const { coupon, upgrade_role } = req.body;
    
    if (coupon && await isCouponValid(coupon)) {
        try {
            await pool.query(`BEGIN; UPDATE students SET coupon='${coupon}' WHERE student_id=${req.user.student_id}; DELETE FROM coupons WHERE coupon_id IN (SELECT coupon_id FROM coupons WHERE code='${coupon}' ORDER BY coupon_id LIMIT 1); COMMIT`);
        } catch(error) {
            await pool.query("ROLLBACK");
            next(error);
        }
    }
    if (req.user.payment_status === "VERIFIED") {
        if (!upgrade_role) 
            return next(new AppError("Please provide the role user wants to upgrade to", 400));

        (await pool.query("UPDATE students SET upgrade_status='PENDING', upgrade_role=$2 WHERE student_id=$1", [req.user.student_id, upgrade_role]));
    }
    else {
        (await pool.query("UPDATE students SET payment_status='PENDING' WHERE student_id=$1", [req.user.student_id]));
    }

    res.status(200).json({
        status: "success",
        payment_status: req.user.payment_status === "REJECTED" ? "PENDING" : req.user.payment_status,
        upgrade_status: req.user.payment_status === "VERIFIED" ? "PENDING" : undefined,
    });
});

export const getWeakestTopics = handleAsyncError(async (req, res, next) => {

    /*
        {
            "limit": 20,
            "chapter_ids": [1,2,6,7,8]
        }
    */


    const limit  = +req.body.limit;
    const subject_ids = req.body.subject_ids;
    const chapter_ids = req.body.chapter_ids;
    let data;

    if (!limit || !Number.isInteger(limit) || limit <= 0) 
        return next("Please specify the number of weakest topics", 400);
            
    data = await fetchWeakestNTopics(req.user.student_id, limit, subject_ids ?? chapter_ids, subject_ids ? true : false);

    res.status(200).json({
        status: "success",
        data
    });
});

export const getUserActivity = handleAsyncError(async (req, res, next) => {

    // /users/activity?start_date=2026-04-26&end_date=2026-04-29

    const start_date = req.query.start_date; 
    const end_date = req.query.end_date; 

    if (!start_date || !end_date) 
        return next(new AppError("Please provide Start of the Week, and End of the Week", 400));

    const data = await fetchUserActivity(req.user.student_id, start_date, end_date);

    res.status(200).json({
        status: "success",
        data
    });
});

export const getPredictedScoreLeaderboard = handleAsyncError(async (req, res, next) => {
    const data = (await pool.query("SELECT student_id AS id, name, father_name, predicted_score FROM users INNER JOIN students ON users.user_id=students.student_id ORDER BY predicted_score DESC")).rows;

    res.status(200).json({
        status: "success",
        data
    }); 
});

export const getUsersSubjectChapterTopicWisePerformance = handleAsyncError(async (req, res, next) => {
    const [subjects, chapters, topics] = await fetchUsersSubjectChapterTopicWisePerformance(req.user.student_id);

    res.status(200).json({
        status: "success",
        data: {
            subjects,
            chapters,
            topics
        }
    });
});


const fetchUsersSubjectChapterTopicWisePerformance = async (student_id) => {
    const subjects = {}, chapters = {}, topics = {};
    const chapters_and_topics_prep_score = (await pool.query("SELECT subjects.subject_name, chapters.chapter_name, topics.topic_name, chapter_mastery.tmi, chapter_mastery.cms, SUM(chapter_mastery.cms * chapter_weight) OVER(PARTITION BY chapter_mastery.subject_id) / SUM(chapter_weight) OVER (PARTITION BY chapter_mastery.subject_id) AS sms FROM (SELECT topic_mastery.subject_id, topic_mastery.chapter_id, topic_mastery.topic_id, topic_mastery.tmi, (SUM(tmi * topic_weight) OVER(PARTITION BY topic_mastery.chapter_id) / SUM(topic_weight) OVER (PARTITION BY topic_mastery.chapter_id)) AS cms FROM topic_mastery INNER JOIN topics ON topics.topic_id = topic_mastery.topic_id WHERE student_id=$1) AS chapter_mastery INNER JOIN topics ON topics.topic_id = chapter_mastery.topic_id INNER JOIN chapters ON chapters.chapter_id = chapter_mastery.chapter_id INNER JOIN subjects ON subjects.subject_id = chapter_mastery.subject_id", [student_id])).rows;
    
    chapters_and_topics_prep_score.forEach(obj => {
        subjects[formatColumnName(obj.subject_name)] = Math.round((obj.sms ?? 0) * 100) / 100;
        chapters[formatColumnName(obj.chapter_name)] = Math.round((obj.cms ?? 0) * 100) / 100;
        topics[formatColumnName(obj.topic_name)] = Math.round((obj.tmi ?? 0) * 100) / 100;
    });

    return [subjects, chapters, topics];
};

const captureSubjectMasterySnapshot = async (student_id) => {
    const res = await pool.query("INSERT INTO subject_mastery (student_id, subject_id, sms) SELECT $1 AS student_id, cms_table.subject_id, SUM(cms_table.cms * chapters.chapter_weight) / SUM(chapters.chapter_weight) AS sms FROM (SELECT topic_mastery.subject_id, topic_mastery.chapter_id, SUM(tmi * topic_weight) / SUM(topic_weight) AS cms FROM topic_mastery INNER JOIN topics ON topics.topic_id = topic_mastery.topic_id WHERE student_id=$1 GROUP BY topic_mastery.subject_id, topic_mastery.chapter_id) AS cms_table INNER JOIN chapters ON chapters.chapter_id=cms_table.chapter_id WHERE NOT EXISTS (SELECT 1 FROM subject_mastery WHERE student_id=$1 AND snapshot_date=CURRENT_DATE) GROUP BY cms_table.subject_id", [student_id]);
}

const fetchWeakestNTopics = async (student_id, n, ids, isSubjectIds) => {
    if (!ids)
        return (await pool.query("SELECT subject_name, chapter_name, topic_name, ROUND(tmi)::INT AS tmi FROM topic_mastery INNER JOIN topics ON topic_mastery.topic_id=topics.topic_id INNER JOIN chapters ON topic_mastery.chapter_id=chapters.chapter_id INNER JOIN subjects ON topic_mastery.subject_id=subjects.subject_id WHERE student_id=$1 ORDER BY tmi ASC LIMIT $2", [student_id, n])).rows;
    else
        return (await pool.query(`SELECT topics.topic_id, topic_name, chapter_name, subject_name, ROUND(tmi)::INT AS tmi FROM topic_mastery INNER JOIN topics ON topic_mastery.topic_id=topics.topic_id INNER JOIN chapters ON topic_mastery.chapter_id=chapters.chapter_id INNER JOIN subjects ON topic_mastery.subject_id=subjects.subject_id WHERE student_id=$1 AND ${isSubjectIds ? "subjects.subject_id" : "chapters.chapter_id"} = ANY ($3) ORDER BY tmi ASC LIMIT $2`, [student_id, n, ids])).rows
}

const calculateUserPerformanceJump = async (student_id) => {
    return (await pool.query("SELECT subject_name, ROUND(subject_mastery.sms - COALESCE((SELECT sms FROM subject_mastery inr_sub_mast WHERE student_id=$1 AND inr_sub_mast.subject_id=subject_mastery.subject_id AND snapshot_date <= CURRENT_DATE - INTERVAL '30 days' ORDER BY snapshot_date DESC LIMIT 1), 0))::INT AS prev_month_increase, ROUND(subject_mastery.sms - COALESCE((SELECT sms FROM subject_mastery inr_sub_mast WHERE student_id=$1 AND inr_sub_mast.subject_id=subject_mastery.subject_id AND snapshot_date <= CURRENT_DATE - INTERVAL '7 days' ORDER BY snapshot_date DESC LIMIT 1), 0))::INT AS prev_week_increase, ROUND(subject_mastery.sms - COALESCE((SELECT sms FROM subject_mastery inr_sub_mast WHERE student_id=$1 AND inr_sub_mast.subject_id=subject_mastery.subject_id AND snapshot_date <= CURRENT_DATE - INTERVAL '1 day' ORDER BY snapshot_date DESC LIMIT 1), 0))::INT AS prev_day_increase FROM subject_mastery INNER JOIN subjects ON subjects.subject_id=subject_mastery.subject_id WHERE student_id=$1 AND subject_mastery.snapshot_date=CURRENT_DATE", [student_id])).rows;
}

const fetchUserActivity = async (student_id, start_date, end_date) => {
    return (await pool.query(`SELECT attempt_count, correct_count, activity_date::TEXT FROM activity WHERE student_id=$1 AND activity_date >= $2::DATE AND activity_date <= $3::DATE ORDER BY activity_date`, [student_id, start_date, end_date])).rows;
}