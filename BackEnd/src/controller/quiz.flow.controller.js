// controller/quiz.flow.controller.js
import mongoose from "mongoose";
import SqlQuiz from "../models/sql.model.js";
import QuizResponse from "../models/quizResponsemodel.js";
import User from "../models/user.model.js";

// Helper to resolve userId from auth or payload (keeps things flexible)
const resolveUserId = (req) => (req.user?._id || req.user?.id || req.body.userId || req.query.userId);

// Helper: get unanswered question with the lowest order in a segment
async function getNextUnansweredInSegment({ userId, category, difficulty, level }) {
  const questions = await SqlQuiz.find({ category, difficulty, level, isActive: true })
    .sort({ order: 1, createdAt: -1 })
    .select("_id order");

  if (!questions.length) {
    return { completed: true, question: null, remaining: 0 };
  }

  const qIds = questions.map(q => q._id);
  const answered = await QuizResponse.find({ userId, questionId: { $in: qIds } }).select("questionId");
  const answeredSet = new Set(answered.map(a => String(a.questionId)));

  const next = questions.find(q => !answeredSet.has(String(q._id)));
  const remaining = questions.filter(q => !answeredSet.has(String(q._id))).length;

  if (!next) return { completed: true, question: null, remaining: 0 };

  // Fetch full question doc to return
  const full = await SqlQuiz.findById(next._id).select("-correctAnswer -explanation");
  return { completed: false, question: full, remaining };
}

// GET /api/quiz/flow/next?category=...&difficulty=Easy&level=1
export const getNextQuestion = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    const { category, difficulty = "Easy", level = 1 } = req.query;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: userId missing" });
    if (!category) return res.status(400).json({ success: false, message: "category is required" });

    const out = await getNextUnansweredInSegment({
      userId,
      category: String(category).trim(),
      difficulty,
      level: Number(level),
    });

    return res.json({ success: true, data: out });
  } catch (e) {
    console.error("getNextQuestion error:", e);
    return res.status(500).json({ success: false, message: "Error resolving next question", error: e.message });
  }
};

// Helper: check if a segment is complete for a user
async function isSegmentComplete({ userId, category, difficulty, level }) {
  const all = await SqlQuiz.find({ category, difficulty, level, isActive: true }).select("_id");
  if (!all.length) return true;
  const answered = await QuizResponse.countDocuments({ userId, questionId: { $in: all.map(x => x._id) } });
  return answered >= all.length;
}

// Helper: award segment badge (idempotent add on user)
async function awardSegmentBadge({ userId, category, difficulty, level }) {
  const user = await User.findById(userId);
  if (!user) return null;

  const badge = {
    name: `${category} • ${difficulty} • Level ${level}`,
    description: `Completed all ${difficulty} Level ${level} questions for ${category}`,
    icon: "🏅",
    level: difficulty,
  };
  
  // Check if user model has addBadge method
  if (typeof user.addBadge === 'function') {
    await user.addBadge(badge);
  } else {
    console.log("User model doesn't have addBadge method, skipping badge award");
  }
  
  return badge;
}

// GET /api/quiz/flow/question-by-order?category=...&difficulty=Medium&level=2&order=2
export const getQuestionByOrder = async (req, res) => {
  try {
    const { category, difficulty, level, order } = req.query;

    // Validate required parameters
    if (!category) {
      return res.status(400).json({ 
        success: false, 
        message: "category is required" 
      });
    }
    if (!difficulty) {
      return res.status(400).json({ 
        success: false, 
        message: "difficulty is required" 
      });
    }
    if (!level) {
      return res.status(400).json({ 
        success: false, 
        message: "level is required" 
      });
    }
    if (!order) {
      return res.status(400).json({ 
        success: false, 
        message: "order is required" 
      });
    }

    // Find the question
    const question = await SqlQuiz.findOne({
      category: String(category).trim(),
      difficulty,
      level: Number(level),
      order: Number(order),
      isActive: true
    });

    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: `Question not found for category: ${category}, difficulty: ${difficulty}, level: ${level}, order: ${order}` 
      });
    }

    // Return question without correctAnswer and explanation (user hasn't answered yet)
    const questionData = {
      _id: question._id,
      question: question.question,
      scenario: question.scenario,
      options: question.options,
      points: question.points,
      level: question.level,
      category: question.category,
      difficulty: question.difficulty,
      timeLimit: question.timeLimit,
      order: question.order,
      tags: question.tags
    };

    return res.json({
      success: true,
      data: {
        question: questionData
      }
    });
  } catch (e) {
    console.error("getQuestionByOrder error:", e);
    return res.status(500).json({ 
      success: false, 
      message: "Error fetching question by order", 
      error: e.message 
    });
  }
};

// POST /api/quiz/flow/submit
export const submitAnswer = async (req, res) => {
  try {
    console.log("=== SUBMIT ANSWER START ===");
    const userId = resolveUserId(req);
    const { questionId, selectedAnswer, timeTaken } = req.body;

    console.log("Request:", { userId, questionId, selectedAnswer, timeTaken });

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId missing" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ success: false, message: "Invalid questionId" });
    }
    
    if (!selectedAnswer) {
      return res.status(400).json({ success: false, message: "selectedAnswer is required" });
    }

    const q = await SqlQuiz.findById(questionId);
    if (!q || !q.isActive) {
      return res.status(404).json({ success: false, message: "Question not found or inactive" });
    }

    console.log("Question found:", q.question);
    console.log("Question points:", q.points);

    // Grade - Use the question's points value
    const isCorrect = String(selectedAnswer).toUpperCase() === q.correctAnswer;
    let pointsEarned = isCorrect ? (q.points || 0) : 0;

    console.log("Graded:", { isCorrect, pointsEarned, correctAnswer: q.correctAnswer });

    // Optional: enforce timeLimit
    if (q.timeLimit && Number(timeTaken) > q.timeLimit) {
      pointsEarned = isCorrect ? Math.floor((q.points || 0) / 2) : 0;
      console.log("Time limit exceeded, points adjusted:", pointsEarned);
    }

    // Persist response using QuizResponse model
    console.log("Creating QuizResponse...");
    await QuizResponse.create({
      userId,
      questionId,
      selectedAnswer: String(selectedAnswer).toUpperCase(),
      isCorrect,
      pointsEarned,
      timeTaken: typeof timeTaken === "number" ? timeTaken : null,
      category: q.category,
      level: q.level,
      difficulty: q.difficulty,
      order: q.order
    });
    console.log("QuizResponse created successfully");

    // Update user totals & experience - FIXED VERSION
    console.log("Updating user points...");
    let updatedUser = null;
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        console.error("❌ User not found with ID:", userId);
      } else {
        console.log("✅ User found:", user.fullName);
        console.log("📊 Current total points:", user.totalPoints);
        console.log("➕ Points to add:", pointsEarned);
        
        // Direct update - increment totalPoints
        user.totalPoints = (user.totalPoints || 0) + pointsEarned;
        
        // Update experience level based on new total
        if (user.totalPoints >= 2000) {
          user.experienceLevel = 'Advanced';
        } else if (user.totalPoints >= 500) {
          user.experienceLevel = 'Intermediate';
        } else {
          user.experienceLevel = 'Beginner';
        }
        
        // Save the user
        await user.save();
        updatedUser = user;
        
        console.log("✅ Points updated successfully!");
        console.log("📊 New total points:", user.totalPoints);
        console.log("⭐ Experience level:", user.experienceLevel);
      }
    } catch (userError) {
      console.error("❌ ERROR updating user:", userError.message);
      console.error("Stack trace:", userError.stack);
      // Continue anyway - response is saved
    }

    // Check segment completion
    console.log("Checking segment completion...");
    let segmentCompleted = false;
    try {
      segmentCompleted = await isSegmentComplete({
        userId,
        category: q.category,
        difficulty: q.difficulty,
        level: q.level,
      });
      console.log("Segment completed:", segmentCompleted);
    } catch (segmentError) {
      console.error("ERROR checking segment completion:", segmentError);
    }

    let badgeAwarded = null;
    if (segmentCompleted) {
      console.log("Awarding badge...");
      try {
        badgeAwarded = await awardSegmentBadge({
          userId,
          category: q.category,
          difficulty: q.difficulty,
          level: q.level,
        });
        console.log("Badge awarded:", badgeAwarded);
      } catch (badgeError) {
        console.error("ERROR awarding badge:", badgeError);
      }
    }

    // Preload next question
    console.log("Getting next question...");
    let next = null;
    try {
      next = await getNextUnansweredInSegment({
        userId,
        category: q.category,
        difficulty: q.difficulty,
        level: q.level,
      });
      console.log("Next question retrieved");
    } catch (nextError) {
      console.error("ERROR getting next question:", nextError);
    }

    console.log("Sending response...");
    return res.json({
      success: true,
      data: {
        isCorrect,
        pointsEarned,
        correctAnswer: q.correctAnswer,
        segmentCompleted,
        badgeAwarded,
        next,
        updatedTotalPoints: updatedUser ? updatedUser.totalPoints : null // Send back updated total
      },
    });
  } catch (e) {
    console.error("=== SUBMIT ANSWER ERROR ===");
    console.error("Error message:", e.message);
    console.error("Error stack:", e.stack);
    return res.status(500).json({ 
      success: false, 
      message: "Error submitting answer", 
      error: e.message 
    });
  }
};