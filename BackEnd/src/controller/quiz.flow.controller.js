// controller/quiz.flow.controller.js
import mongoose from "mongoose";
import SqlQuiz from "../models/sql.model.js";
import UserResponse from "../models/userResponse.model.js";
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
  const answered = await UserResponse.find({ userId, questionId: { $in: qIds } }).select("questionId");
  const answeredSet = new Set(answered.map(a => String(a.questionId)));

  const next = questions.find(q => !answeredSet.has(String(q._id)));
  const remaining = questions.filter(q => !answeredSet.has(String(q._id))).length;

  if (!next) return { completed: true, question: null, remaining: 0 };

  // Fetch full question doc to return
  const full = await SqlQuiz.findById(next._id).select("-correctAnswer -explanation");
  return { completed: false, question: full, remaining };
}

// GET /api/quiz/next?category=...&difficulty=Easy&level=1
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
  const answered = await UserResponse.countDocuments({ userId, questionId: { $in: all.map(x => x._id) } });
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
  await user.addBadge(badge);
  return badge;
}

// POST /api/quiz/submit
// Body: { questionId, selectedAnswer, timeTaken? }
export const submitAnswer = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    const { questionId, selectedAnswer, timeTaken } = req.body;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: userId missing" });
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ success: false, message: "Invalid questionId" });
    }
    if (!selectedAnswer) return res.status(400).json({ success: false, message: "selectedAnswer is required" });

    const q = await SqlQuiz.findById(questionId);
    if (!q || !q.isActive) {
      return res.status(404).json({ success: false, message: "Question not found or inactive" });
    }

    // Prevent duplicate answers (unique index will also enforce)
    const already = await UserResponse.findOne({ userId, questionId });
    if (already) {
      return res.status(409).json({ success: false, message: "You already answered this question" });
    }

    // Grade
    const isCorrect = String(selectedAnswer).toUpperCase() === q.correctAnswer;
    let pointsEarned = isCorrect ? (q.points || 0) : 0;

    // Optional: enforce timeLimit (reject or reduce points)
    if (q.timeLimit && Number(timeTaken) > q.timeLimit) {
      // Example policy: half points if late but correct
      pointsEarned = isCorrect ? Math.floor((q.points || 0) / 2) : 0;
    }

    // Persist response
    await UserResponse.create({
      userId,
      questionId,
      selectedAnswer: String(selectedAnswer).toUpperCase(),
      isCorrect,
      pointsEarned,
      timeTaken: typeof timeTaken === "number" ? timeTaken : null,
      category: q.category,
      level: q.level,
    });

    // Update user totals & experience
    const user = await User.findById(userId);
    if (user) {
      await user.addPoints(pointsEarned);
      await user.updateExperienceLevel();
    }

    // Check segment completion
    const segmentCompleted = await isSegmentComplete({
      userId,
      category: q.category,
      difficulty: q.difficulty,
      level: q.level,
    });

    let badgeAwarded = null;
    if (segmentCompleted) {
      badgeAwarded = await awardSegmentBadge({
        userId,
        category: q.category,
        difficulty: q.difficulty,
        level: q.level,
      });
    }

    // Preload next question in the same segment for smooth UX
    const next = await getNextUnansweredInSegment({
      userId,
      category: q.category,
      difficulty: q.difficulty,
      level: q.level,
    });

    return res.json({
      success: true,
      data: {
        isCorrect,
        pointsEarned,
        segmentCompleted,
        badgeAwarded,
        next,
      },
    });
  } catch (e) {
    // Duplicate guard via unique index
    if (e?.code === 11000) {
      return res.status(409).json({ success: false, message: "You already answered this question" });
    }
    console.error("submitAnswer error:", e);
    return res.status(500).json({ success: false, message: "Error submitting answer", error: e.message });
  }
};
