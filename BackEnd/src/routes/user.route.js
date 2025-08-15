
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserProfile, updateProfile } from "../controller/auth.controller.js"; // Import necessary controller functions

const router = express.Router();

// Protected routes
router.get("/me", protectRoute, getUserProfile); // Get user profile with points and badges
router.put("/update", protectRoute, updateProfile); // Update user profile

export default router;
