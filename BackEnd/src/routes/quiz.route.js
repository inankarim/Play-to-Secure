import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import { getNextQuestion, submitAnswer, getQuestionByOrder } from "../controller/quiz.flow.controller.js";
import { getCategories, getLevelsByCategory, getCategoryStatus, getProgressSummary, getTotalOrder, getAnsweredTrail, getAnsweredPrev, getLastAnswered, getAnsweredHistory } from "../controller/quiz.progress.controller.js";
import { getAnswerReflection } from "../controller/quiz.reflection.controller.js";

const router = express.Router();

// ==================== FLOW ROUTES ====================
// Get next unanswered question in a segment
router.get("/next", protectRoute, getNextQuestion);

// Get specific question by order number
router.get("/question-by-order", protectRoute, getQuestionByOrder);

// Submit answer to a question
router.post("/submit", protectRoute, submitAnswer);

// Get reflection/explanation for an answer
router.post("/reflection", protectRoute, getAnswerReflection);

// ==================== PROGRESS & GATING ROUTES ====================
// Get all available categories
router.get("/categories", protectRoute, getCategories);

// Get levels for a specific category
router.get("/levels", protectRoute, getLevelsByCategory);

// Get completion status for a category
router.get("/status", protectRoute, getCategoryStatus);

// Get overall progress summary
router.get("/progress/summary", protectRoute, getProgressSummary);

// Get last answered question in a segment
router.get("/progress/last-answered", protectRoute, getLastAnswered);

// Get answer history for a segment
router.get("/progress/history", protectRoute, getAnsweredHistory);

// Get total number of questions in a segment
router.get("/total-order", protectRoute, getTotalOrder);

// Get trail of answered questions
router.get("/answered-trail", protectRoute, getAnsweredTrail); // ✅ Fixed typo: was "answerd-trail"

// Get previous answered question
router.get("/answered-prev", protectRoute, getAnsweredPrev); // ✅ Fixed: removed "/flow" prefix

export default router;