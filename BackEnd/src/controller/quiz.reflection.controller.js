// controller/quiz.reflection.controller.js
import mongoose from "mongoose";
import SqlQuiz from "../models/sql.model.js";

// POST /api/quiz/reflection
// export const getAnswerReflection = async (req, res) => {
//   try {
//     const { questionId, userAnswer, isCorrect } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(questionId)) {
//       return res.status(400).json({ success: false, message: "Invalid questionId" });
//     }

//     const q = await SqlQuiz.findById(questionId);
//     if (!q || !q.isActive) {
//       return res.status(404).json({ success: false, message: "Question not found or inactive" });
//     }

//     // Build a compact prompt (you can replace this with your AI SDK call)
//     const prompt = `
// Question: ${q.question}
// ${q.scenario ? `Scenario: ${q.scenario}` : ""}
// Options:
// ${q.options.map(o => `${o.optionLabel}. ${o.optionText}`).join("\n")}
// User Answer: ${String(userAnswer).toUpperCase()}
// Correct? ${!!isCorrect}
// ${q.explanation ? `Official Explanation: ${q.explanation}` : ""}
// Give a short, encouraging reflection (2–3 sentences) explaining why the choice is correct/incorrect and one tip to remember next time.
// `.trim();

//     // TODO: call your AI provider here. For now, return a deterministic message.
//     const reflection = isCorrect
//       ? "Nice work! Your answer matches the key constraint in the scenario. Keep watching for edge cases and default behaviors—they often decide between close options."
//       : "Close! Re-read the condition that rules out the distractor—notice how it violates a required assumption. Next time, verify constraints against each option before choosing.";

//     return res.json({ success: true, data: { reflection, promptUsed: process.env.NODE_ENV === "development" ? prompt : undefined } });
//   } catch (e) {
//     console.error("getAnswerReflection error:", e);
//     return res.status(500).json({ success: false, message: "Error generating reflection", error: e.message });
//   }
// };


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

    // Use the reflection from the model (if available)
    const reflection = q.reflection || (
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
Reflection: ${reflection}
`.trim();

    // For now, return the reflection from the model and include the prompt if in development
    return res.json({ success: true, data: { reflection, promptUsed: process.env.NODE_ENV === "development" ? prompt : undefined } });
  } catch (e) {
    console.error("getAnswerReflection error:", e);
    return res.status(500).json({ success: false, message: "Error generating reflection", error: e.message });
  }
};
