import express from 'express';
import leaderboardController from "../controller/leaderboard.controller.js";

const router = express.Router();

// Route to get leaderboard data
router.get('/', leaderboardController.getLeaderboard);

export default router;
