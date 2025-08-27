// controller/quiz.progress.controller.js
import SqlQuiz from "../models/sql.model.js";
import UserResponse from "../models/userResponse.model.js";

const resolveUserId = (req) => (req.user?._id || req.user?.id || req.body.userId || req.query.userId);

// GET /api/quiz/categories
export const getCategories = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    const categories = await SqlQuiz.distinct("category", { isActive: true });

    // Pre-aggregate counts per (difficulty, level) for each category
    const agg = await SqlQuiz.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: { category: "$category", difficulty: "$difficulty", level: "$level" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Optionally load user progress to mark nextStage per category
    let progressMap = new Map();
    if (userId) {
      const answered = await UserResponse.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: { category: "$category", level: "$level" },
            answered: { $sum: 1 },
          },
        },
      ]);
      progressMap = new Map(
        answered.map(r => [
          `${r._id.category}::${r._id.level}`,
          r.answered,
        ])
      );
    }

    // Shape the response
    const countsByCat = {};
    for (const row of agg) {
      const { category, difficulty, level } = row._id;
      countsByCat[category] ||= { Easy: {}, Medium: {}, Hard: {} };
      countsByCat[category][difficulty][String(level)] = row.count;
    }

    const data = categories.map((cat) => {
      const counts = countsByCat[cat] || { Easy: {}, Medium: {}, Hard: {} };

      // naive nextStage: default to Easy level 1 if it exists; otherwise the first available
      const nextStage =
        Object.keys(counts.Easy).length
          ? { difficulty: "Easy", level: Math.min(...Object.keys(counts.Easy).map(Number)) || 1 }
          : Object.keys(counts.Medium).length
          ? { difficulty: "Medium", level: Math.min(...Object.keys(counts.Medium).map(Number)) || 1 }
          : Object.keys(counts.Hard).length
          ? { difficulty: "Hard", level: Math.min(...Object.keys(counts.Hard).map(Number)) || 1 }
          : null;

      // available flag if there is at least one question anywhere
      const available = !!(Object.keys(counts.Easy).length || Object.keys(counts.Medium).length || Object.keys(counts.Hard).length);

      // minimal userProgress sample (answers per level, if userId provided)
      const userProgress = {};
      if (userId) {
        ["Easy", "Medium", "Hard"].forEach((diff) => {
          userProgress[diff] = {};
          Object.keys(counts[diff]).forEach((lvl) => {
            const key = `${cat}::${Number(lvl)}`;
            userProgress[diff][lvl] = { answered: progressMap.get(key) || 0, total: counts[diff][lvl] };
          });
        });
      }

      return { category: cat, available, counts, userProgress, nextStage };
    });

    // globalStage is computed in /progress/summary; here just return null or a simple default
    return res.json({ success: true, data, globalStage: null });
  } catch (e) {
    console.error("getCategories error:", e);
    return res.status(500).json({ success: false, message: "Error loading categories", error: e.message });
  }
};

// GET /api/quiz/levels?category=...&difficulty=Easy
export const getLevelsByCategory = async (req, res) => {
  try {
    const { category, difficulty = "Easy" } = req.query;
    if (!category) return res.status(400).json({ success: false, message: "category is required" });

    const rows = await SqlQuiz.aggregate([
      { $match: { category: String(category).trim(), difficulty, isActive: true } },
      { $group: { _id: "$level", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const data = rows.map(r => ({ level: r._id, count: r.count }));
    return res.json({ success: true, data });
  } catch (e) {
    console.error("getLevelsByCategory error:", e);
    return res.status(500).json({ success: false, message: "Error loading levels", error: e.message });
  }
};

// GET /api/quiz/status?category=...
export const getCategoryStatus = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    const { category } = req.query;
    if (!category) return res.status(400).json({ success: false, message: "category is required" });
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: userId missing" });

    const all = await SqlQuiz.find({ category: String(category).trim(), isActive: true })
      .sort({ difficulty: 1, level: 1, order: 1 })
      .select("_id difficulty level order");

    // Build segments -> totals per (difficulty, level)
    const segments = {};
    for (const q of all) {
      const key = `${q.difficulty}::${q.level}`;
      segments[key] ||= { difficulty: q.difficulty, level: q.level, total: 0, answered: 0, nextOrder: null, completed: false };
      segments[key].total += 1;
    }

    // Pull answered for this user within the category
    const answered = await UserResponse.find({ userId, category: String(category).trim() })
      .select("questionId");

    const answeredSet = new Set(answered.map(a => String(a.questionId)));
    for (const q of all) {
      const key = `${q.difficulty}::${q.level}`;
      if (answeredSet.has(String(q._id))) {
        segments[key].answered += 1;
      }
    }

    // Compute nextOrder per segment
    for (const q of all) {
      const key = `${q.difficulty}::${q.level}`;
      if (!answeredSet.has(String(q._id)) && segments[key].nextOrder === null) {
        segments[key].nextOrder = q.order;
      }
    }

    // Completed flag
    Object.values(segments).forEach(seg => {
      seg.completed = seg.answered >= seg.total && seg.total > 0;
    });

    return res.json({
      success: true,
      data: {
        category: String(category).trim(),
        segments: Object.values(segments).sort((a, b) => a.difficulty.localeCompare(b.difficulty) || a.level - b.level),
      },
    });
  } catch (e) {
    console.error("getCategoryStatus error:", e);
    return res.status(500).json({ success: false, message: "Error loading category status", error: e.message });
  }
};

// GET /api/quiz/progress/summary
export const getProgressSummary = async (req, res) => {
  try {
    const userId = resolveUserId(req);
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: userId missing" });

    const categories = await SqlQuiz.distinct("category", { isActive: true });

    // Map of available counts per (category,difficulty,level)
    const counts = await SqlQuiz.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: { category: "$category", difficulty: "$difficulty", level: "$level" }, total: { $sum: 1 } } },
    ]);

    const byCat = {};
    for (const r of counts) {
      const { category, difficulty, level } = r._id;
      byCat[category] ||= { Easy: {}, Medium: {}, Hard: {} };
      byCat[category][difficulty][String(level)] = r.total;
    }

    // User answers per category/level
    const answers = await UserResponse.aggregate([
      { $match: { userId } },
      { $group: { _id: { category: "$category", level: "$level" }, answered: { $sum: 1 } } },
    ]);

    const answeredMap = new Map(answers.map(r => [`${r._id.category}::${r._id.level}`, r.answered]));

    // Compute global stage:
    // Start at Easy level1. Advance only when *every* category that has that stage is completed.
    const stageOrder = ["Easy", "Medium", "Hard"];
    let globalStage = null;

    outer:
    for (const diff of stageOrder) {
      // find all levels that exist in any category for this difficulty
      const allLevels = new Set();
      for (const cat of categories) {
        const map = byCat[cat]?.[diff] || {};
        Object.keys(map).forEach(lvl => allLevels.add(Number(lvl)));
      }
      const sortedLevels = Array.from(allLevels).sort((a, b) => a - b);

      for (const lvl of sortedLevels) {
        // check if all categories that have (diff,lvl) are completed by user
        let allDone = true;
        for (const cat of categories) {
          const total = byCat[cat]?.[diff]?.[String(lvl)] || 0;
          if (!total) continue; // category doesn't have this stage
          const ans = answeredMap.get(`${cat}::${lvl}`) || 0;
          if (ans < total) { allDone = false; break; }
        }

        if (!allDone) {
          globalStage = { difficulty: diff, level: lvl };
          break outer;
        }
      }
      // If we got here, all levels of this difficulty are done; continue to next difficulty
    }

    // If everything done, keep last stage (Hard, max level) or set null
    if (!globalStage) {
      globalStage = { difficulty: "Hard", level: null }; // null means fully complete
    }

    // Which categories to show now: those that *have* questions for globalStage
    const categoriesView = categories.map(cat => {
      const total = globalStage.level
        ? (byCat[cat]?.[globalStage.difficulty]?.[String(globalStage.level)] || 0)
        : 0;
      return {
        category: cat,
        show: globalStage.level ? total > 0 : false,
        nextStage: globalStage.level ? { difficulty: globalStage.difficulty, level: globalStage.level } : null,
        reason: globalStage.level ? (total > 0 ? null : `No ${globalStage.difficulty} level ${globalStage.level}`) : "All done",
      };
    });

    return res.json({ success: true, data: { globalStage, categories: categoriesView } });
  } catch (e) {
    console.error("getProgressSummary error:", e);
    return res.status(500).json({ success: false, message: "Error computing progress summary", error: e.message });
  }
};
