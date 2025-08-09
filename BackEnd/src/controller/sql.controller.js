import SqlQuiz from "../models/sql.model.js";
import UserResponse from "../models/userResponse.model.js";
import mongoose from "mongoose";

// Get questions by category and level
export const getQuestions = async (req, res) => {
  try {
    const { category, level, limit = 10, random = false } = req.query;
    
    // Validate required category
    if (!category) {
      console.log("Error in getQuestions: Category is required");
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    let questions;
    
    if (random === 'true') {
      // Get random questions
      questions = await SqlQuiz.getRandomQuestions(
        category, 
        level ? parseInt(level) : null, 
        parseInt(limit)
      );
    } else {
      // Get sequential questions
      questions = await SqlQuiz.getQuestionsByCategory(
        category, 
        level ? parseInt(level) : null
      ).limit(parseInt(limit));
    }

    // Don't send the correct answer to the client
    const questionsForClient = questions.map(q => ({
      _id: q._id,
      question: q.question,
      scenario: q.scenario,
      options: q.options,
      points: q.points,
      level: q.level,
      category: q.category,
      difficulty: q.difficulty,
      timeLimit: q.timeLimit,
      order: q.order
    }));

    console.log(`Successfully fetched ${questionsForClient.length} questions for category: ${category}, level: ${level || 'all'}`);
    
    res.status(200).json({
      success: true,
      data: {
        questions: questionsForClient,
        total: questionsForClient.length,
        category: category,
        level: level || 'all'
      }
    });

  } catch (error) {
    console.error("Error in getQuestions controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching questions",
      error: error.message
    });
  }
};

// Create a new quiz question
export const createQuestion = async (req, res) => {
  try {
    const {
      question,
      scenario,
      options,
      correctAnswer,
      points,
      level,
      category,
      difficulty,
      explanation,
      tags,
      timeLimit,
      order
    } = req.body;

    // Validate required fields
    if (!question || !options || !correctAnswer || !category) {
      console.log("Error in createQuestion: Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Question, options, correctAnswer, and category are required"
      });
    }

    // Validate options array
    if (!Array.isArray(options) || options.length !== 4) {
      console.log("Error in createQuestion: Invalid options array");
      return res.status(400).json({
        success: false,
        message: "Exactly 4 options are required"
      });
    }

    // Validate option labels
    const requiredLabels = ['A', 'B', 'C', 'D'];
    const providedLabels = options.map(opt => opt.optionLabel?.toUpperCase());
    const hasAllLabels = requiredLabels.every(label => providedLabels.includes(label));

    if (!hasAllLabels) {
      console.log("Error in createQuestion: Invalid option labels");
      return res.status(400).json({
        success: false,
        message: "Options must have labels A, B, C, D"
      });
    }

    // Validate correct answer
    if (!requiredLabels.includes(correctAnswer.toUpperCase())) {
      console.log("Error in createQuestion: Invalid correct answer");
      return res.status(400).json({
        success: false,
        message: "Correct answer must be A, B, C, or D"
      });
    }

    // Create new question
    const newQuestion = new SqlQuiz({
      question: question.trim(),
      scenario: scenario?.trim() || null,
      options: options.map(opt => ({
        optionLabel: opt.optionLabel.toUpperCase(),
        optionText: opt.optionText.trim()
      })),
      correctAnswer: correctAnswer.toUpperCase(),
      points: points || 10,
      level: level || 1,
      category: category.trim(),
      difficulty: difficulty || 'Medium',
      explanation: explanation?.trim() || null,
      tags: tags || [],
      timeLimit: timeLimit || 30,
      order: order || 0
    });

    // Save to database
    const savedQuestion = await newQuestion.save();

    console.log(`Successfully created question: ${savedQuestion._id} - Category: ${category}, Level: ${level}`);

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: savedQuestion
    });

  } catch (error) {
    console.error("Error in createQuestion controller:", error.message);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating question",
      error: error.message
    });
  }
};

// Submit answer for a question
export const submitAnswer = async (req, res) => {
  try {
    const { questionId, selectedAnswer, timeTaken } = req.body;
    const userId = req.user._id; // From auth middleware

    // Validate input
    if (!questionId || !selectedAnswer) {
      console.log("Error in submitAnswer: Missing questionId or selectedAnswer");
      return res.status(400).json({
        success: false,
        message: "Question ID and selected answer are required"
      });
    }

    // Validate questionId format
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      console.log(`Error in submitAnswer: Invalid questionId format: ${questionId}`);
      return res.status(400).json({
        success: false,
        message: "Invalid question ID format"
      });
    }

    // Validate answer format
    if (!['A', 'B', 'C', 'D'].includes(selectedAnswer.toUpperCase())) {
      console.log(`Error in submitAnswer: Invalid answer format: ${selectedAnswer}`);
      return res.status(400).json({
        success: false,
        message: "Selected answer must be A, B, C, or D"
      });
    }

    // Check if user already answered this question
    const existingResponse = await UserResponse.findOne({ 
      userId: userId, 
      questionId: questionId 
    });
    
    if (existingResponse) {
      console.log(`Error in submitAnswer: User ${userId} already answered question ${questionId}`);
      return res.status(409).json({
        success: false,
        message: "You have already answered this question"
      });
    }

    // Find the question
    const question = await SqlQuiz.findById(questionId);
    if (!question || !question.isActive) {
      console.log(`Error in submitAnswer: Question not found or inactive: ${questionId}`);
      return res.status(404).json({
        success: false,
        message: "Question not found or inactive"
      });
    }

    // Check if answer is correct
    const isCorrect = question.correctAnswer === selectedAnswer.toUpperCase();
    const pointsEarned = isCorrect ? question.points : 0;

    // Save user response to database
    const userResponse = new UserResponse({
      userId: userId,
      questionId: questionId,
      selectedAnswer: selectedAnswer.toUpperCase(),
      isCorrect: isCorrect,
      pointsEarned: pointsEarned,
      timeTaken: timeTaken || null,
      category: question.category,
      level: question.level
    });

    await userResponse.save();

    console.log(`User ${userId} answered question ${questionId}: ${selectedAnswer.toUpperCase()} - ${isCorrect ? 'Correct' : 'Incorrect'} (${pointsEarned} points) - Response saved`);

    // Prepare response
    const response = {
      success: true,
      data: {
        questionId: question._id,
        selectedAnswer: selectedAnswer.toUpperCase(),
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        pointsEarned: pointsEarned,
        explanation: question.explanation,
        question: {
          text: question.question,
          category: question.category,
          level: question.level,
          difficulty: question.difficulty
        }
      }
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Error in submitAnswer controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error submitting answer",
      error: error.message
    });
  }
};

// Get all available categories
export const getCategories = async (req, res) => {
  try {
    const categories = await SqlQuiz.distinct("category", { isActive: true });
    
    // Get category stats
    const categoryStats = await SqlQuiz.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$category",
          questionCount: { $sum: 1 },
          levels: { $addToSet: "$level" },
          totalPoints: { $sum: "$points" },
          avgPoints: { $avg: "$points" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log(`Successfully fetched ${categories.length} categories: ${categories.join(', ')}`);

    res.status(200).json({
      success: true,
      data: {
        categories: categories,
        stats: categoryStats
      }
    });

  } catch (error) {
    console.error("Error in getCategories controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message
    });
  }
};

// Get levels for a specific category
export const getLevelsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!category) {
      console.log("Error in getLevelsByCategory: Category parameter is required");
      return res.status(400).json({
        success: false,
        message: "Category parameter is required"
      });
    }
    
    const levels = await SqlQuiz.aggregate([
      { $match: { category: category, isActive: true } },
      {
        $group: {
          _id: "$level",
          questionCount: { $sum: 1 },
          totalPoints: { $sum: "$points" },
          difficulties: { $addToSet: "$difficulty" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    if (levels.length === 0) {
      console.log(`Error in getLevelsByCategory: No questions found for category: ${category}`);
      return res.status(404).json({
        success: false,
        message: `No questions found for category: ${category}`
      });
    }

    console.log(`Successfully fetched ${levels.length} levels for category: ${category}`);

    res.status(200).json({
      success: true,
      data: {
        category: category,
        levels: levels
      }
    });

  } catch (error) {
    console.error("Error in getLevelsByCategory controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching levels",
      error: error.message
    });
  }
};

// Get a specific question by ID
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      console.log("Error in getQuestionById: Question ID parameter is required");
      return res.status(400).json({
        success: false,
        message: "Question ID parameter is required"
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Error in getQuestionById: Invalid ObjectId format: ${id}`);
      return res.status(400).json({
        success: false,
        message: "Invalid question ID format"
      });
    }
    
    const question = await SqlQuiz.findById(id);
    if (!question || !question.isActive) {
      console.log(`Error in getQuestionById: Question not found or inactive: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Question not found or inactive"
      });
    }

    // Don't send the correct answer
    const questionForClient = {
      _id: question._id,
      question: question.question,
      scenario: question.scenario,
      options: question.options,
      points: question.points,
      level: question.level,
      category: question.category,
      difficulty: question.difficulty,
      timeLimit: question.timeLimit,
      order: question.order
    };

    console.log(`Successfully fetched question: ${id} - Category: ${question.category}, Level: ${question.level}`);

    res.status(200).json({
      success: true,
      data: questionForClient
    });

  } catch (error) {
    console.error("Error in getQuestionById controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching question",
      error: error.message
    });
  }
};

// Get user's quiz progress and statistics
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category } = req.query;

    const userProgress = await UserResponse.getUserProgress(userId, category);
    
    // Get overall stats - FIXED aggregation pipeline
    const overallStats = await UserResponse.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalQuestions: { $sum: 1 },
          correctAnswers: { $sum: { $cond: ["$isCorrect", 1, 0] } },
          totalPoints: { $sum: "$pointsEarned" },
          categoriesAttempted: { $addToSet: "$category" }
        }
      },
      {
        $addFields: {
          accuracy: {
            $cond: [
              { $gt: ["$totalQuestions", 0] },
              { $multiply: [{ $divide: ["$correctAnswers", "$totalQuestions"] }, 100] },
              0
            ]
          }
        }
      }
    ]);

    console.log(`Successfully fetched progress for user: ${userId}, category: ${category || 'all'}`);

    res.status(200).json({
      success: true,
      data: {
        userId: userId,
        progressByCategory: userProgress,
        overallStats: overallStats[0] || {
          totalQuestions: 0,
          correctAnswers: 0,
          totalPoints: 0,
          categoriesAttempted: [],
          accuracy: 0
        }
      }
    });

  } catch (error) {
    console.error("Error in getUserProgress controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user progress",
      error: error.message
    });
  }
};

// Get user's answered questions to avoid showing them again
export const getUserAnsweredQuestions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category, level, limit = 50 } = req.query;

    const matchQuery = { userId: userId };
    if (category) matchQuery.category = category;
    if (level) matchQuery.level = parseInt(level);

    const answeredQuestions = await UserResponse.find(matchQuery)
      .populate('questionId', 'question category level difficulty points')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    console.log(`Successfully fetched ${answeredQuestions.length} answered questions for user: ${userId}`);

    res.status(200).json({
      success: true,
      data: {
        answeredQuestions: answeredQuestions,
        total: answeredQuestions.length
      }
    });

  } catch (error) {
    console.error("Error in getUserAnsweredQuestions controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching answered questions",
      error: error.message
    });
  }
};