import pool from "./database.js";
import multer from "multer";
import { Readable } from "stream";
import { readSheet } from 'read-excel-file/node';

export const wait = (seconds) => new Promise((res) => setTimeout(res, seconds*1000));

export const isString = (str) => Object.prototype.toString.call(str) === '[object String]' && (str instanceof String || typeof str === 'string');

export const initialize = () => {
    process.env.MODE = process.env.MODE.trim();
    process.env.DATABASE_USERNAME = process.env.DATABASE_USERNAME.trim();
    process.env.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD.trim();  
}
export const formatColumnName = (name) => name.replaceAll(" ", "_").toLowerCase();

export const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
}

export const readDataFromExcelFile = async (buffer) => {
    const data = await readSheet(Readable.from(buffer));
    const res = [];
    
    data.forEach((row, index) => {
        if (index == 0) return;
        res.push({});
        data[index].forEach((value, j) => {
            res.at(-1)[formatColumnName(data[0][j])] = data[index][j];
        });
    });
    
    return res;
}

export const gracefulShutdown = (server) => {
    return async () => {
        try {
            server.close();
            await pool.end();
            console.log("Gracefully shutting down....");        
        } catch (err) {
            console.log("Ungracefully shutting down....");
            process.exit(-1);
        }
    }
}    

export const convertSyllabusQueryResultIntoSyllabusObject = (data) => {
    const subjects = ["Biology", "Chemistry", "Physics", "Logical Reasoning", "English"];
    const syllabus = {};    

    data.forEach((obj) => {
        const subject = formatColumnName(obj.subject_name);
        const chapter = formatColumnName(obj.chapter_name);
        const topic = obj.topic_name;
        const topic_id = obj.topic_id;

        syllabus[subject] = syllabus[subject] ?? {};
        syllabus[subject][chapter] = syllabus[subject][chapter] ?? [];

        syllabus[subject][chapter].push({
            id: topic_id,
            name: topic
        });
    });
    return syllabus;
}

export const excelFileUpload = multer({storage: multer.memoryStorage(), fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        return cb(null, false);
    cb(null, true);
}});