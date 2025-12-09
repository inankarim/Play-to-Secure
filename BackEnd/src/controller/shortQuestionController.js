import UserResponse from '../models/shortquestion.model.js';
import User from '../models/user.model.js';

// Submit answer for a page
export const submitPageAnswer = async (req, res) => {
  try {
    const { pageIdentifier, shortAnswers, isCorrect, pointsEarned, category, level, timeTaken } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!pageIdentifier || !shortAnswers || typeof isCorrect !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: pageIdentifier, shortAnswers, and isCorrect are required'
      });
    }

    // Check if user has already completed this page
    const existingResponse = await UserResponse.findOne({ 
      userId, 
      pageIdentifier 
    });
    
    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: 'You have already completed this challenge',
        data: existingResponse
      });
    }

    // Create new response
    const userResponse = await UserResponse.create({
      userId,
      pageIdentifier,
      shortAnswers: Array.isArray(shortAnswers) ? shortAnswers : [shortAnswers],
      isCorrect,
      pointsEarned: pointsEarned || 0,
      category,
      level,
      timeTaken: timeTaken || null
    });

    // ✅ ADD POINTS TO USER'S TOTAL
    if (pointsEarned && pointsEarned > 0) {
      const user = await User.findById(userId);
      if (user) {
        await user.addPoints(pointsEarned);
        // Optionally update experience level based on new points
        await user.updateExperienceLevel();
      }
    }

    res.status(201).json({
      success: true,
      message: 'Answer submitted successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('Submit answer error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already completed this challenge'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error submitting answer',
      error: error.message
    });
  }
};

// Check if user has completed a specific page
export const checkPageCompletion = async (req, res) => {
  try {
    const { pageIdentifier } = req.params;
    const userId = req.user._id;

    if (!pageIdentifier) {
      return res.status(400).json({
        success: false,
        message: 'Page identifier is required'
      });
    }

    const response = await UserResponse.findOne({ 
      userId, 
      pageIdentifier 
    });

    res.json({
      success: true,
      completed: !!response,
      data: response || null
    });

  } catch (error) {
    console.error('Check completion error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking completion status',
      error: error.message
    });
  }
};

// Get all completed pages for a user
export const getUserCompletedPages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category } = req.query;

    const completedPages = await UserResponse.getUserCompletedPages(userId, category);

    const stats = {
      totalCompleted: completedPages.length,
      correctAnswers: completedPages.filter(r => r.isCorrect).length,
      totalPoints: completedPages.reduce((sum, r) => sum + r.pointsEarned, 0),
      accuracy: completedPages.length > 0 
        ? ((completedPages.filter(r => r.isCorrect).length / completedPages.length) * 100).toFixed(2) 
        : 0
    };

    res.json({
      success: true,
      count: completedPages.length,
      stats,
      data: completedPages
    });

  } catch (error) {
    console.error('Get completed pages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching completed pages',
      error: error.message
    });
  }
};

// Get user progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category } = req.query;

    const progress = await UserResponse.getUserProgress(userId, category);

    res.json({
      success: true,
      data: progress
    });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message
    });
  }
};