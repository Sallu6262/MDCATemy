import express from "express";
import { getRemainingSeats } from "../controllers/system.js";
import { studentRoles } from "../helpers.js";

const router = express.Router();

router.get("/remaining-seats", getRemainingSeats);

export default router;