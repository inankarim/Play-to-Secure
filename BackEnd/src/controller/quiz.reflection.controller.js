import mongoose from "mongoose";
import SqlQuiz from "../models/sql.model.js";

// POST /api/quiz/reflection
// Body: { questionId, userAnswer, isCorrect }
export const getAnswerReflection = async (req, res) => {
  try {
    const { questionId, userAnswer, isCorrect } = req.body;

    // Validate the questionId
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ success: false, message: "Invalid questionId" });
    }

    // Find the question in the database
    const q = await SqlQuiz.findById(questionId);
    if (!q || !q.isActive) {
      return res.status(404).json({ success: false, message: "Question not found or inactive" });
    }

    // Use the explanation from the model if available (for feedback)
    const explanation = q.explanation || (
      isCorrect
        ? "Nice work! Your answer matches the key constraint in the scenario. Keep watching for edge cases and default behaviors—they often decide between close options."
        : "Close! Re-read the condition that rules out the distractor—notice how it violates a required assumption. Next time, verify constraints against each option before choosing."
    );

    // Build a compact prompt (optional: useful when using AI later)
    const prompt = `
Question: ${q.question}
${q.scenario ? `Scenario: ${q.scenario}` : ""}
Options:
${q.options.map(o => `${o.optionLabel}. ${o.optionText}`).join("\n")}
User Answer: ${String(userAnswer).toUpperCase()}
Correct? ${!!isCorrect}
${q.explanation ? `Official Explanation: ${q.explanation}` : ""}
Reflection: ${explanation}
`.trim();

    // For now, return the explanation as reflection and include the prompt if in development
    return res.json({ success: true, data: { reflection: explanation, promptUsed: process.env.NODE_ENV === "development" ? prompt : undefined } });
  } catch (e) {
    console.error("getAnswerReflection error:", e);
    return res.status(500).json({ success: false, message: "Error generating reflection", error: e.message });
  }
};
