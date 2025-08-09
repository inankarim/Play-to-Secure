import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
  getQuestions, 
  submitAnswer, 
  getCategories, 
  getLevelsByCategory, 
  getQuestionById,
  getUserProgress,
  getUserAnsweredQuestions,
  createQuestion
} from "../controller/sql.controller.js";

const router = express.Router();

// POST /api/quiz/create - Create a new quiz question
router.post("/create",createQuestion);

// GET /api/quiz/questions - Get questions by category and level
router.get("/questions",getQuestions);

// POST /api/quiz/submit - Submit answer for a question
router.post("/submit", protectRoute, submitAnswer);

// GET /api/quiz/categories - Get all available categories
router.get("/categories", protectRoute, getCategories);

// GET /api/quiz/levels/:category - Get levels for a specific category
router.get("/levels/:category", protectRoute, getLevelsByCategory);

// GET /api/quiz/question/:id - Get a specific question by ID
router.get("/question/:id", protectRoute, getQuestionById);

// GET /api/quiz/progress - Get user's quiz progress and statistics
router.get("/progress", protectRoute, getUserProgress);

// GET /api/quiz/answered - Get user's answered questions
router.get("/answered", protectRoute, getUserAnsweredQuestions);

export default router;