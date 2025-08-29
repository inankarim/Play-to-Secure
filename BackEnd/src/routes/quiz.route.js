
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"; // add when ready

import { getNextQuestion, submitAnswer } from "../controller/quiz.flow.controller.js";
import { getCategories, getLevelsByCategory, getCategoryStatus, getProgressSummary, getTotalOrder,getAnsweredTrail,getAnsweredPrev,getLastAnswered,getAnsweredHistory } from "../controller/quiz.progress.controller.js";

import { getAnswerReflection } from "../controller/quiz.reflection.controller.js";

const router = express.Router();

// Flow
router.get("/next", protectRoute, getNextQuestion);
router.post("/submit", protectRoute, submitAnswer);

// Progress & gating
router.get("/categories", protectRoute, getCategories);
router.get("/levels", protectRoute, getLevelsByCategory);
router.get("/status", protectRoute, getCategoryStatus);
router.get("/progress/summary", protectRoute, getProgressSummary);
router.post("/reflection", protectRoute, getAnswerReflection);
router.get("/total-order", protectRoute, getTotalOrder);
router.get("/answerd-trail", protectRoute, getAnsweredTrail);
router.get("/flow/answered-prev", protectRoute, getAnsweredPrev);
router.get('/progress/last-answered', protectRoute, getLastAnswered);
router.get('/progress/history', protectRoute, getAnsweredHistory);

export default router;
