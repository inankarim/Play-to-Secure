import express from "express";
// import { protectRoute } from "../middleware/auth.middleware.js"; // optional later
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  // Stubs (add your real ones later if needed):
  // submitAnswer, getCategories, getLevelsByCategory, getUserProgress, getUserAnsweredQuestions
} from "../controller/sql.controller.js";

const router = express.Router();

// Public/admin (add real admin auth later)
router.post("/create", createQuestion);
router.get("/questions", getQuestions);
router.get("/question/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
