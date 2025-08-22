import { useEffect, useMemo, useState } from "react";
import { Shield, MessageSquare, Plus, Edit, Trash2, CheckCircle2, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const LABELS = ["A", "B", "C", "D"];

// Category list with label + value + emoji (saved value stays lowercase; UI shows label+emoji)
const CATEGORIES = [
  { value: "sqli", label: "SQLi 🗄️" },
  { value: "xss", label: "XSS 🧪" },
  { value: "dom clobbering", label: "DOM Clobbering 🌐" },
  { value: "cdn tampering", label: "CDN Tampering 🚧" },
  { value: "css injection", label: "CSS Injection 🎨" },
  { value: "nosql", label: "NoSQL 📊" },
  { value: "clickjacking", label: "Clickjacking 🖱️" },
  { value: "sql injection", label: "SQL Injection 💉" },
  { value: "csp bypass", label: "CSP Bypass 🔓" },
  { value: "idor", label: "IDOR 🔑" },
  { value: "broken authentication", label: "Broken Authentication 🔐" },
];

const DEFAULT_CATEGORY = CATEGORIES[0].value; // "sqli"

// quick helpers
const categoryValueToLabel = (val) => CATEGORIES.find((c) => c.value === val)?.label || val;

const DEFAULT_QUESTION = {
  question: "",
  scenario: "",
  options: LABELS.map((L) => ({ optionLabel: L, optionText: "" })),
  correctAnswer: "A",
  points: 10,
  level: 1,
  category: DEFAULT_CATEGORY,
  difficulty: "Medium",
  explanation: "",
  tags: [],
  isActive: true,
  timeLimit: 30,
  order: 0,
};

const AdminQuizPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ ...DEFAULT_QUESTION });
  const [tagsInput, setTagsInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter uses the same category list
  const [categoryFilter, setCategoryFilter] = useState(DEFAULT_CATEGORY);

  // Only admins
  useEffect(() => {
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/quiz/questions", {
        params: {
          category: categoryFilter,
          limit: 200,
          includeAnswer: true, // admin view shows correctAnswer
        },
      });
      setQuestions(data?.data?.questions || data?.questions || []);
    } catch (e) {
      console.error("fetchQuestions", e);
      alert(e?.response?.data?.message || "Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [categoryFilter]);

  const resetForm = () => {
    setCurrentQuestion({ ...DEFAULT_QUESTION, category: categoryFilter });
    setTagsInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const updateOptionText = (label, value) => {
    setCurrentQuestion((p) => ({
      ...p,
      options: p.options.map((o) => (o.optionLabel === label ? { ...o, optionText: value } : o)),
    }));
  };

  const validateForm = () => {
    const q = currentQuestion;
    if (!q.question.trim()) return alert("Please enter a question"), false;
    if (!q.category) return alert("Please choose a category"), false;
    if (!LABELS.includes(q.correctAnswer)) return alert("Correct answer must be A, B, C, D"), false;
    if (!Array.isArray(q.options) || q.options.length !== 4) return alert("Exactly 4 options are required"), false;
    for (const opt of q.options) {
      if (!LABELS.includes(opt.optionLabel)) return alert("Option labels must be A, B, C, D"), false;
      if (!opt.optionText.trim()) return alert("All option texts are required"), false;
    }
    if (q.points < 1) return alert("Points must be >= 1"), false;
    if (q.level < 1) return alert("Level must be >= 1"), false;
    if (q.timeLimit < 10) return alert("Time limit must be >= 10s"), false;
    return true;
  };

  const addOrUpdateQuestion = async () => {
    if (!validateForm()) return;

    const payload = {
      ...currentQuestion,
      tags: tagsInput.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
    };

    try {
      setLoading(true);
      if (editingId) {
        await axiosInstance.put(`/quiz/${editingId}`, payload);
      } else {
        await axiosInstance.post("/quiz/create", payload);
      }
      await fetchQuestions();
      resetForm();
    } catch (e) {
      console.error("saveQuestion", e);
      alert(e?.response?.data?.message || "Failed to save question");
    } finally {
      setLoading(false);
    }
  };

  const editQuestion = (q) => {
    setCurrentQuestion({
      ...DEFAULT_QUESTION,
      ...q,
      // Keep A/B/C/D order in editor
      options: LABELS.map((L) => q.options.find((o) => o.optionLabel === L) || ({ optionLabel: L, optionText: "" })),
      // If existing category not in our fixed list, fall back to DEFAULT_CATEGORY
      category: CATEGORIES.some((c) => c.value === q.category) ? q.category : DEFAULT_CATEGORY,
    });
    setTagsInput((q.tags || []).join(", "));
    setEditingId(q._id);
    setShowForm(true);
  };

  const deleteQuestion = async (id) => {
    if (!id) return alert("Missing id");
    if (!confirm("Delete this question?")) return;
    try {
      setLoading(true);
      await axiosInstance.delete(`/quiz/${id}`);
      await fetchQuestions();
    } catch (e) {
      console.error("deleteQuestion", e);
      alert(e?.response?.data?.message || "Failed to delete question");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin", { replace: true });
  };

  const stats = useMemo(() => {
    const categories = new Set(questions.map((q) => q.category));
    const diffs = new Set(questions.map((q) => q.difficulty));
    return { total: questions.length, categories: categories.size, difficulties: diffs.size };
  }, [questions]);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="flex-1">
          <Shield className="w-8 h-8 mr-3" />
          <h1 className="text-xl font-bold">Admin Dashboard - Quiz Manager</h1>
        </div>
        <div className="flex-none">
          <button onClick={handleLogout} className="btn btn-ghost text-primary-content">Logout</button>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-6xl">

        {/* Top controls */}
        <div className="flex gap-3 items-end mb-6">
          <div className="form-control w-64">
            <label className="label"><span className="label-text font-semibold">Filter Category</span></label>
            <select
              className="select select-bordered"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary gap-2" disabled={loading}>
            <Plus className="w-5 h-5" /> {showForm ? "Cancel" : "Add New Question"}
          </button>
          {loading && <span className="text-sm opacity-60">Loading…</span>}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white"><div className="card-body"><h3 className="text-lg opacity-90">Total Questions</h3><p className="text-3xl font-bold">{stats.total}</p></div></div>
          <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white"><div className="card-body"><h3 className="text-lg opacity-90">Categories</h3><p className="text-3xl font-bold">{stats.categories}</p></div></div>
          <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white"><div className="card-body"><h3 className="text-lg opacity-90">Difficulty Levels</h3><p className="text-3xl font-bold">{stats.difficulties}</p></div></div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card bg-base-200 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">{editingId ? "Edit Question" : "Create New Question"}</h2>

              {/* Q + Scenario */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold text-lg">Question</span></label>
                  <textarea
                    className="textarea textarea-bordered h-32 text-base"
                    placeholder="Enter question…"
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, question: e.target.value }))}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold text-lg">Scenario (optional)</span></label>
                  <textarea
                    className="textarea textarea-bordered h-32 text-base"
                    placeholder="Add scenario/context…"
                    value={currentQuestion.scenario}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, scenario: e.target.value }))}
                  />
                </div>
              </div>

              {/* Options */}
              <div className="form-control mt-6">
                <label className="label"><span className="label-text font-semibold text-lg">Answer Options</span></label>
                <div className="space-y-4">
                  {LABELS.map((label) => {
                    const val = currentQuestion.options.find((o) => o.optionLabel === label)?.optionText || "";
                    return (
                      <div key={label} className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="correctAnswer"
                          className="radio radio-primary radio-lg"
                          checked={currentQuestion.correctAnswer === label}
                          onChange={() => setCurrentQuestion((p) => ({ ...p, correctAnswer: label }))}
                        />
                        <span className="text-lg font-semibold w-8">{label}.</span>
                        <input
                          type="text"
                          className="input input-bordered flex-1"
                          placeholder={`Option ${label}`}
                          value={val}
                          onChange={(e) => updateOptionText(label, e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="label">
                  <span className="label-text-alt text-base-content/60 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Select the radio to mark the correct option
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Category dropdown */}
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Category</span></label>
                  <select
                    className="select select-bordered text-base"
                    value={currentQuestion.category}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, category: e.target.value }))}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Difficulty</span></label>
                  <select
                    className="select select-bordered text-base"
                    value={currentQuestion.difficulty}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, difficulty: e.target.value }))}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Level</span></label>
                  <input
                    type="number"
                    min={1}
                    className="input input-bordered"
                    value={currentQuestion.level}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, level: Math.max(1, Number(e.target.value || 1)) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Points</span></label>
                  <input
                    type="number"
                    min={1}
                    className="input input-bordered"
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, points: Math.max(1, Number(e.target.value || 1)) }))}
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Time Limit (sec)</span></label>
                  <input
                    type="number"
                    min={10}
                    className="input input-bordered"
                    value={currentQuestion.timeLimit}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, timeLimit: Math.max(10, Number(e.target.value || 10)) }))}
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Order</span></label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={currentQuestion.order}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, order: Number(e.target.value || 0) }))}
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Active</span></label>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={currentQuestion.isActive}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, isActive: e.target.checked }))}
                  />
                </div>
              </div>

              {/* Explanation & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Explanation (optional)</span></label>
                  <textarea
                    className="textarea textarea-bordered h-28"
                    placeholder="Why the answer is correct…"
                    value={currentQuestion.explanation}
                    onChange={(e) => setCurrentQuestion((p) => ({ ...p, explanation: e.target.value }))}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Tags (comma-separated)</span></label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="e.g., injection, auth, web"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="card-actions justify-end gap-3 mt-6">
                <button onClick={resetForm} className="btn btn-ghost" disabled={loading}>Cancel</button>
                <button onClick={addOrUpdateQuestion} className="btn btn-primary gap-2" disabled={loading}>
                  <CheckCircle2 className="w-5 h-5" />
                  {editingId ? "Update Question" : "Add Question"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">Quiz Questions</h3>
            <div className="badge badge-primary badge-lg">{questions.length} Questions</div>
          </div>

          {loading && questions.length === 0 ? (
            <div className="text-center py-16 text-base-content/60">Loading…</div>
          ) : questions.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-24 h-24 mx-auto text-base-content/20 mb-6" />
              <h4 className="text-2xl font-semibold text-base-content/60 mb-2">No questions created yet</h4>
              <p className="text-base-content/40">Click "Add New Question" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q._id} className="card bg-white shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-semibold text-gray-800 flex-1">
                        <span className="text-primary mr-3">Q{index + 1}.</span>{q.question}
                      </h4>
                      <div className="flex gap-2">
                        <button onClick={() => editQuestion(q)} className="btn btn-sm btn-ghost text-primary" title="Edit"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteQuestion(q._id)} className="btn btn-sm btn-ghost text-error" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>

                    {q.scenario && <div className="mb-3 p-3 rounded-lg bg-base-200 text-sm"><strong>Scenario:</strong> {q.scenario}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {LABELS.map((L) => {
                        const opt = (q.options || []).find((o) => o.optionLabel === L);
                        const isCorrect = q.correctAnswer === L;
                        return (
                          <div key={L} className={`p-3 rounded-lg border ${isCorrect ? "bg-success/10 border-success" : "bg-base-100 border-base-300"}`}>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{L}.</span>
                              <span className="flex-1">{opt?.optionText || ""}</span>
                              {isCorrect && <span className="badge badge-success badge-sm">✓</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-3 items-center text-sm text-base-content/60">
                      {/* show pretty label+emoji, store raw value */}
                      <span className="badge badge-outline">{categoryValueToLabel(q.category)}</span>
                      <span className={`badge ${q.difficulty === "Easy" ? "badge-success" : q.difficulty === "Medium" ? "badge-warning" : "badge-error"} badge-outline`}>{q.difficulty}</span>
                      <span className="badge badge-outline">Lvl {q.level}</span>
                      <span className="badge badge-outline">{q.points} pts</span>
                      <span className="badge badge-outline">{q.timeLimit}s</span>
                      {q.isActive ? <span className="badge badge-primary">Active</span> : <span className="badge">Inactive</span>}
                      {q.tags?.length ? <span className="badge badge-outline">Tags: {q.tags.join(", ")}</span> : null}
                      <span className="text-xs ml-auto">Created: {q.createdAt ? new Date(q.createdAt).toLocaleString() : "-"}</span>
                    </div>

                    {q.explanation && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm text-primary">Show explanation</summary>
                        <div className="mt-2 text-sm">{q.explanation}</div>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuizPage;
