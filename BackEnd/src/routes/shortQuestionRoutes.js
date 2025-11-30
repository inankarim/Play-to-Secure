import express from 'express';
import { 
  submitPageAnswer, 
  checkPageCompletion, 
  getUserCompletedPages,
  getUserProgress
} from '../controller/shortQuestionController.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Submit answer for a page
router.post('/submit', protectRoute, submitPageAnswer);

// Check if user has completed a specific page
router.get('/check/:pageIdentifier', protectRoute, checkPageCompletion);

// Get all completed pages
router.get('/completed', protectRoute, getUserCompletedPages);

// Get user progress
router.get('/progress', protectRoute, getUserProgress);

export default router;