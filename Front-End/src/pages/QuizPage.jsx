import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import quizService from "../store/useQuizService"; 
import ProgressBar from "../components/ProgressBar"; 
import QuizReflectionModal from "../components/QuizReflectionModal"; 

const QuizPage = () => {
  const { category, difficulty, level } = useParams(); 
  const navigate = useNavigate(); 
  const location = useLocation();
  
  // State
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(""); 
  const [points, setPoints] = useState(0); 
  const [totalQuestions, setTotalQuestions] = useState(0); 
  const [reflection, setReflection] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ✅ NEW: Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ NEW: Get return path from location state
  const returnPath = location.state?.returnPath || "/quizHome";

  // Fetch question - ✅ FIXED: Added error handling, removed answer exposure
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching question:", { category, difficulty, level, currentQuestionOrder });
        
        const questionData = await quizService.getNextQuestion(category, difficulty, level);
        
        if (!questionData) {
          throw new Error("No more questions available");
        }
        
        setQuestion(questionData);
        // ✅ FIXED: Removed setCorrectAnswer here - was security issue!
        
      } catch (error) {
        console.error("Error fetching question:", error);
        setError(error.message || "Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [category, difficulty, level, currentQuestionOrder]);

  // Fetch total questions
  useEffect(() => {
    const fetchTotalQuestions = async () => {
      try {
        const result = await quizService.getTotalOrder(category, difficulty, level);
        console.log("Total questions fetched:", result); 
        setTotalQuestions(result.totalOrder);
      } catch (error) {
        console.error("Error fetching total order:", error);
      }
    };

    fetchTotalQuestions();
  }, [category, difficulty, level]);

  const handleAnswerChange = (answer) => {
    if (!isSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer || isSubmitted) return;

    try {
      console.log("Submitting answer:", { questionId: question._id, selectedAnswer });
      
      const result = await quizService.submitAnswer(question._id, selectedAnswer);
      
      console.log("Submit result:", result);

      setIsSubmitted(true);
      setPoints(result.pointsEarned); 
      setCorrectAnswer(result.correctAnswer); // ✅ NOW it's safe to set correct answer

      // Fetch reflection from backend
      const reflectionData = await quizService.getAnswerReflection(
        question._id, 
        selectedAnswer, 
        result.isCorrect
      );
      setReflection(reflectionData.reflection);

      // Open the modal
      setIsModalOpen(true);
      
    } catch (error) {
      console.error("Error submitting answer:", error);
      
      // Handle "already answered" error
      if (error.response?.data?.message?.includes("already answered")) {
        alert("You have already answered this question. Moving to next...");
        handleNext();
      } else {
        alert("Failed to submit answer. Please try again.");
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionOrder === totalQuestions) {
      // ✅ FIXED: Navigate to return path instead of hardcoded /quizHome
      console.log("Quiz completed, navigating to:", returnPath);
      navigate(returnPath);
    } else {
      // Proceed to next question
      setIsSubmitted(false);
      setSelectedAnswer(null);
      setCorrectAnswer(""); // Clear correct answer for next question
      setCurrentQuestionOrder(currentQuestionOrder + 1);
    }

    // Close the modal
    setIsModalOpen(false);
  };

  const handleBack = () => {
    if (currentQuestionOrder > 1) {
      setCurrentQuestionOrder(currentQuestionOrder - 1);
      setIsSubmitted(false);
      setSelectedAnswer(null);
      setCorrectAnswer("");
    }
  };

  // ✅ NEW: Exit quiz handler
  const handleExitQuiz = () => {
    if (window.confirm("Are you sure you want to exit the quiz?")) {
      navigate(returnPath);
    }
  };

  // Function to compare answers (case insensitive)
  const compareAnswers = (selected, correct) => {
    return selected && correct ? selected.toUpperCase() === correct.toUpperCase() : false;
  };

  // ✅ NEW: Format category name for better display
  const formatCategoryName = (cat) => {
    const categoryNames = {
      'sqli': 'SQL Injection',
      'xss': 'Cross-Site Scripting (XSS)',
      'idor': 'Insecure Direct Object Reference',
      'csrf': 'Cross-Site Request Forgery',
      'broken authentication': 'Broken Authentication',
      'dom clobbering': 'DOM Clobbering',
      'cdn tampering': 'CDN Tampering',
      'css injection': 'CSS Injection',
      'nosql': 'NoSQL Injection',
      'clickjacking': 'Clickjacking',
      'sql injection': 'SQL Injection',
      'csp bypass': 'CSP Bypass',
    };
    return categoryNames[cat?.toLowerCase()] || cat?.toUpperCase();
  };

  // ✅ NEW: Error state rendering
  if (error) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-red-400 mb-4">Error Loading Quiz</h2>
          <p className="text-gray-300 text-xl mb-8">{error}</p>
          <button
            onClick={handleExitQuiz}
            className="px-8 py-4 bg-yellow-400 text-black rounded-xl text-lg font-bold hover:bg-yellow-300 transition-all duration-200"
          >
            Return to Previous Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header - ✅ IMPROVED: Better formatting + Exit button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-bold">
            {formatCategoryName(category)} - {difficulty} Level {level}
          </h1>
          
          <button
            onClick={handleExitQuiz}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors"
          >
            Exit Quiz
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <ProgressBar completed={currentQuestionOrder} total={totalQuestions} />
        </div>

        {/* ✅ NEW: Loading state */}
        {loading ? (
          <div className="text-center">
            <div className="bg-gray-700 p-12 rounded-xl mb-10 animate-pulse shadow-lg">
              <div className="h-8 bg-gray-600 rounded mb-6"></div>
              <div className="h-6 bg-gray-600 rounded w-3/4 mx-auto"></div>
            </div>
            <p className="text-gray-400 text-xl">Loading question...</p>
          </div>
        ) : question ? (
          <>
            {/* Question Box */}
            <div className="bg-yellow-400 p-12 rounded-xl mb-10 shadow-lg">
              <h2 className="text-2xl font-bold text-black leading-relaxed text-center">
                {question.question}
              </h2>
            </div>

            {/* ✅ NEW: Scenario section (if exists) */}
            {question.scenario && (
              <div className="bg-blue-900/50 p-6 rounded-xl mb-8 border-2 border-blue-500">
                <h3 className="text-xl font-bold text-blue-300 mb-3">📖 Scenario:</h3>
                <p className="text-gray-200 leading-relaxed">{question.scenario}</p>
              </div>
            )}

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-6 mb-10">
              {question.options &&
                question.options.map((option) => (
                  <button
                    key={option.optionLabel}
                    onClick={() => handleAnswerChange(option.optionLabel)}
                    disabled={isSubmitted}
                    className={`p-8 rounded-xl font-bold text-xl transition-all duration-200 shadow-lg hover:shadow-xl ${
                      selectedAnswer === option.optionLabel
                        ? "bg-yellow-400 text-black transform scale-105"
                        : "bg-gray-400 text-black hover:bg-gray-300"
                    } ${isSubmitted ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:transform hover:scale-102"}`}
                  >
                    <div className="text-lg mb-3 font-semibold">{option.optionLabel}.</div>
                    <div className="text-lg leading-relaxed">{option.optionText}</div>
                  </button>
                ))}
            </div>

            {/* Result Message - ✅ IMPROVED: Better feedback */}
            {isSubmitted && (
              <div className="text-center mb-8">
                <p
                  className={`text-2xl font-bold mb-4 ${
                    compareAnswers(selectedAnswer, correctAnswer)
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Your answer is{" "}
                  {compareAnswers(selectedAnswer, correctAnswer) ? "correct! ✅" : "incorrect ❌"}
                </p>
                {!compareAnswers(selectedAnswer, correctAnswer) && correctAnswer && (
                  <p className="text-gray-300 text-lg">
                    The correct answer was: <span className="font-semibold text-green-400">{correctAnswer}</span>
                  </p>
                )}
                {points > 0 && (
                  <p className="text-yellow-400 text-xl font-bold mt-2">
                    +{points} points earned! 🎉
                  </p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mb-8">
              <button
                onClick={handleBack}
                className="px-8 py-4 bg-gray-500 text-white rounded-xl text-lg font-bold hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuestionOrder === 1}
              >
                ← Back
              </button>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className={`px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 ${
                    selectedAnswer
                      ? "bg-yellow-400 text-black hover:bg-yellow-300 hover:transform hover:scale-105"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-yellow-400 text-black rounded-xl text-lg font-bold hover:bg-yellow-300 transition-all duration-200 hover:transform hover:scale-105"
                >
                  {currentQuestionOrder === totalQuestions ? "Complete Quiz 🎯" : "Next Question →"}
                </button>
              )}
            </div>

            {/* Question Counter */}
            <div className="text-center">
              <span className="text-gray-400 text-lg">
                Question {currentQuestionOrder} of {totalQuestions}
              </span>
            </div>
          </>
        ) : (
          /* ✅ NEW: No questions state */
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              You've completed all questions!
            </h2>
            <button
              onClick={() => navigate(returnPath)}
              className="px-8 py-4 bg-yellow-400 text-black rounded-xl text-lg font-bold hover:bg-yellow-300 transition-all duration-200"
            >
              Continue Your Journey
            </button>
          </div>
        )}
      </div>

      {/* Reflection Modal */}
      <QuizReflectionModal
        isOpen={isModalOpen}
        reflection={reflection}
        onClose={() => setIsModalOpen(false)}
        sendMessageToAI={quizService.sendMessageToAI}
      />
    </div>
  );
};

export default QuizPage;