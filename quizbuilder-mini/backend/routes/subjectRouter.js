import express from "express";
import { getAllSubjects } from "../controllers/subject.js";

const router = express.Router();

router.get("/", getAllSubjects);

export default router;
