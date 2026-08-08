import express from "express";
import protect from "../middleware/auth.middleware.js";
import { suggestTask } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/suggest", protect, suggestTask);

export default router;