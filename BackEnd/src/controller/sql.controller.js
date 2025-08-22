import SqlQuiz from "../models/sql.model.js";
import mongoose from "mongoose";

// GET /api/quiz/questions
export const getQuestions = async (req, res) => {
  try {
    const { category, level, limit = 50, random = "false", includeAnswer = "false", difficulty, isActive } = req.query;
    if (!category) return res.status(400).json({ success: false, message: "Category is required" });

    const filter = { category };
    if (level) filter.level = Number(level);
    if (difficulty) filter.difficulty = difficulty;
    if (typeof isActive !== "undefined") filter.isActive = isActive === "true";

    let questions;
    if (random === "true") {
      questions = await SqlQuiz.aggregate([{ $match: { ...filter, isActive: true } }, { $sample: { size: Math.min(Number(limit) || 10, 100) } }]);
    } else {
      questions = await SqlQuiz.find(filter).sort({ level: 1, order: 1, createdAt: -1 }).limit(Math.min(Number(limit) || 50, 500));
    }

    const sendAnswer = includeAnswer === "true";
    const payload = questions.map((q) => ({
      _id: q._id,
      question: q.question,
      scenario: q.scenario,
      options: q.options,
      points: q.points,
      level: q.level,
      category: q.category,
      difficulty: q.difficulty,
      timeLimit: q.timeLimit,
      order: q.order,
      ...(sendAnswer ? { correctAnswer: q.correctAnswer, explanation: q.explanation } : {})
    }));

    return res.json({ success: true, data: { questions: payload, total: payload.length, category, level: level || "all" } });
  } catch (e) {
    console.error("getQuestions error:", e);
    return res.status(500).json({ success: false, message: "Error fetching questions", error: e.message });
  }
};

// GET /api/quiz/question/:id
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeAnswer = "false" } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid question ID" });

    const q = await SqlQuiz.findById(id);
    if (!q || !q.isActive) return res.status(404).json({ success: false, message: "Question not found or inactive" });

    const sendAnswer = includeAnswer === "true";
    const data = {
      _id: q._id,
      question: q.question,
      scenario: q.scenario,
      options: q.options,
      points: q.points,
      level: q.level,
      category: q.category,
      difficulty: q.difficulty,
      timeLimit: q.timeLimit,
      order: q.order,
      ...(sendAnswer ? { correctAnswer: q.correctAnswer, explanation: q.explanation } : {})
    };
    return res.json({ success: true, data });
  } catch (e) {
    console.error("getQuestionById error:", e);
    return res.status(500).json({ success: false, message: "Error fetching question", error: e.message });
  }
};

// POST /api/quiz/create
export const createQuestion = async (req, res) => {
  try {
    const body = req.body;
    if (!body.question || !body.category || !Array.isArray(body.options) || body.options.length !== 4 || !body.correctAnswer) {
      return res.status(400).json({ success: false, message: "Missing required fields or invalid options" });
    }
    const labels = ["A", "B", "C", "D"];
    const provided = body.options.map((o) => o.optionLabel?.toUpperCase());
    if (!labels.every((L) => provided.includes(L))) {
      return res.status(400).json({ success: false, message: "Options must include labels A, B, C, D" });
    }
    if (!labels.includes(String(body.correctAnswer).toUpperCase())) {
      return res.status(400).json({ success: false, message: "Correct answer must be A, B, C, or D" });
    }

    const doc = await SqlQuiz.create({
      question: body.question.trim(),
      scenario: body.scenario?.trim() || null,
      options: body.options.map((o) => ({ optionLabel: o.optionLabel.toUpperCase(), optionText: o.optionText.trim() })),
      correctAnswer: body.correctAnswer.toUpperCase(),
      points: body.points || 10,
      level: body.level || 1,
      category: body.category.trim(),
      difficulty: body.difficulty || "Medium",
      explanation: body.explanation?.trim() || null,
      tags: body.tags || [],
      isActive: typeof body.isActive === "boolean" ? body.isActive : true,
      timeLimit: body.timeLimit || 30,
      order: body.order || 0
    });

    return res.status(201).json({ success: true, message: "Question created", data: doc });
  } catch (e) {
    console.error("createQuestion error:", e);
    if (e.name === "ValidationError") {
      return res.status(400).json({ success: false, message: "Validation error", errors: Object.values(e.errors).map((x) => x.message) });
    }
    return res.status(500).json({ success: false, message: "Error creating question", error: e.message });
  }
};

// PUT /api/quiz/:id
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid question ID" });

    const payload = { ...req.body };

    if (payload.options) {
      if (!Array.isArray(payload.options) || payload.options.length !== 4) {
        return res.status(400).json({ success: false, message: "Exactly 4 options are required" });
      }
      const labels = ["A", "B", "C", "D"];
      const provided = payload.options.map((o) => o.optionLabel?.toUpperCase());
      if (!labels.every((L) => provided.includes(L))) {
        return res.status(400).json({ success: false, message: "Options must have labels A, B, C, D" });
      }
      payload.options = payload.options.map((o) => ({ optionLabel: o.optionLabel.toUpperCase(), optionText: o.optionText.trim() }));
    }

    if (payload.correctAnswer) {
      const labels = ["A", "B", "C", "D"];
      if (!labels.includes(payload.correctAnswer.toUpperCase())) {
        return res.status(400).json({ success: false, message: "Correct answer must be A, B, C, or D" });
      }
      payload.correctAnswer = payload.correctAnswer.toUpperCase();
    }

    const updated = await SqlQuiz.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: "Question not found" });

    return res.json({ success: true, message: "Question updated", data: updated });
  } catch (e) {
    console.error("updateQuestion error:", e);
    return res.status(500).json({ success: false, message: "Error updating question", error: e.message });
  }
};

// DELETE /api/quiz/:id
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid question ID" });

    const deleted = await SqlQuiz.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Question not found" });

    return res.json({ success: true, message: "Question deleted" });
  } catch (e) {
    console.error("deleteQuestion error:", e);
    return res.status(500).json({ success: false, message: "Error deleting question", error: e.message });
  }
};
