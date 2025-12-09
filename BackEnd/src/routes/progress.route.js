import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  markAttackComplete,
  getCompletedAttacks
} from "../controller/progress.controller.js";

const router = express.Router();

// Mark an attack as complete
router.post("/attack/complete", protectRoute, markAttackComplete);

// Get all completed attacks
router.get("/attacks", protectRoute, getCompletedAttacks);

export default router;