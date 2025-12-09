import express from 'express';
import IdorItemProgress from '../models/itemModel.js';
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

// Middleware to check if user is authenticated
// Assuming you have a protectRoute middleware, if not, here's a simple one

// Get user's IDOR progress
router.get('/progress', protectRoute, async (req, res) => {
  try {
    let progress = await IdorItemProgress.findOne({ userId: req.user._id });
    
    // If no progress exists, create a new one
    if (!progress) {
      progress = await IdorItemProgress.create({
        userId: req.user._id,
        foundItems: [],
        completedItems: []
      });
    }

    res.status(200).json({
      success: true,
      data: {
        foundItems: progress.foundItems,
        completedItems: progress.completedItems,
        progress: (progress.completedItems.length / 5) * 100, // Progress based on completed quizzes
        isCompleted: progress.isCompleted(),
        completedAt: progress.completedAt
      }
    });
  } catch (error) {
    console.error('Error fetching IDOR progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
      error: error.message
    });
  }
});

// Mark an item as found (when user clicks on it)
router.post('/found', protectRoute, async (req, res) => {
  try {
    const { itemName } = req.body;

    if (!itemName) {
      return res.status(400).json({
        success: false,
        message: 'Item name is required'
      });
    }

    const validItems = ['crown', 'shield', 'diamond', 'key', 'scroll'];
    if (!validItems.includes(itemName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item name'
      });
    }

    // Find or create progress
    let progress = await IdorItemProgress.findOne({ userId: req.user._id });
    
    if (!progress) {
      progress = await IdorItemProgress.create({
        userId: req.user._id,
        foundItems: [],
        completedItems: []
      });
    }

    // Add item using the model method
    progress.addItem(itemName);
    await progress.save();

    res.status(200).json({
      success: true,
      message: `${itemName} found!`,
      data: {
        foundItems: progress.foundItems,
        completedItems: progress.completedItems,
        progress: (progress.completedItems.length / 5) * 100,
        isCompleted: progress.isCompleted(),
        completedAt: progress.completedAt
      }
    });
  } catch (error) {
    console.error('Error marking item as found:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark item as found',
      error: error.message
    });
  }
});

// Mark an item quiz as completed (when user finishes the quiz)
router.post('/complete', protectRoute, async (req, res) => {
  try {
    const { itemName } = req.body;

    if (!itemName) {
      return res.status(400).json({
        success: false,
        message: 'Item name is required'
      });
    }

    const validItems = ['crown', 'shield', 'diamond', 'key', 'scroll'];
    if (!validItems.includes(itemName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item name'
      });
    }

    // Find or create progress
    let progress = await IdorItemProgress.findOne({ userId: req.user._id });
    
    if (!progress) {
      progress = await IdorItemProgress.create({
        userId: req.user._id,
        foundItems: [],
        completedItems: []
      });
    }

    // Mark item as completed using the model method
    progress.completeItem(itemName);
    await progress.save();

    res.status(200).json({
      success: true,
      message: `${itemName} quest completed!`,
      data: {
        foundItems: progress.foundItems,
        completedItems: progress.completedItems,
        progress: (progress.completedItems.length / 5) * 100,
        isCompleted: progress.isCompleted(),
        completedAt: progress.completedAt
      }
    });
  } catch (error) {
    console.error('Error marking item as completed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark item as completed',
      error: error.message
    });
  }
});

// Reset progress (optional - for testing or user reset)
router.delete('/reset', protectRoute, async (req, res) => {
  try {
    await IdorItemProgress.findOneAndDelete({ userId: req.user._id });

    res.status(200).json({
      success: true,
      message: 'Progress reset successfully'
    });
  } catch (error) {
    console.error('Error resetting progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset progress',
      error: error.message
    });
  }
});

export default router;