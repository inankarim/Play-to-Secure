// In user.route.js or leaderboard.route.js
import express from "express";
import { getLeaderboard } from "../controller/user.controller.js"; // Or appropriate controller
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/leaderboard - Fetch leaderboard data
router.get("/leaderboard", protectRoute, getLeaderboard);

export default router;
