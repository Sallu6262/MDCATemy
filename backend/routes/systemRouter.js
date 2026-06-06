import express from "express";
import { getRemainingSeats } from "../controllers/system.js";

const router = express.Router();

router.get("/remaining-seats", getRemainingSeats);

export default router;