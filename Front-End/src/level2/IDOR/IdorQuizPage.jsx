// src/pages/idorquizpage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import quizService from "../../store/useQuizService";
import { motion, AnimatePresence } from "framer-motion";

const IdorQuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user came from to determine question order
  const { fromPage } = location.state || {};

  // Map fromPage to question order
  const pageOrderMap = {
    'idorpage5': 1,
    'idorpage6': 2,
    'idorpage7': 3,
    'idorpage8': 4,
    'idorpage9': 5,
  };

  const ORDER = pageOrderMap[fromPage] || 1;
  
  // Fixed IDOR Level 2 Medium quiz parameters
  const CATEGORY = "idor";
  const DIFFICULTY = "Medium";
  const LEVEL = 2;

  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [reflection, setReflection] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific question on mount
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching question with params:", {
          category: CATEGORY,
          difficulty: DIFFICULTY,
          level: LEVEL,
          order: ORDER
        });

        // Fetch question by category, difficulty, level, and order
        const questionData = await quizService.getQuestionByOrder(
          CATEGORY,
          DIFFICULTY,
          LEVEL,
          ORDER
        );
        
        console.log("Question data received:", questionData);
        
        if (questionData) {
          setQuestion(questionData);
          // Don't set correctAnswer here - it will come from submit response
        } else {
          console.error("Question not found for order:", ORDER);
          setError("Question not found");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
        setError(error.message || "Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [ORDER, CATEGORY, DIFFICULTY, LEVEL]);

  const handleAnswerSelect = (optionLabel) => {
    if (!isSubmitted) {
      setSelectedAnswer(optionLabel);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer || isSubmitted) return;

    try {
      console.log("Submitting answer:", {
        questionId: question._id,
        selectedAnswer
      });

      // Submit answer to backend
      const result = await quizService.submitAnswer(question._id, selectedAnswer);
      
      console.log("Submit result:", result);

      setIsSubmitted(true);
      setIsCorrect(result.isCorrect);
      setCorrectAnswer(result.correctAnswer);

      // Fetch AI reflection
      const reflectionData = await quizService.getAnswerReflection(
        question._id,
        selectedAnswer,
        result.isCorrect
      );
      
      console.log("Reflection data:", reflectionData);
      
      setReflection(reflectionData.reflection);
      setShowReflection(true);

    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };

  const handleBackToJourney = () => {
    // Go back to IDOR hub
    navigate('/level2/idorpage4');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 251, 235, 0.9) 0%, rgba(245, 222, 179, 0.95) 100%)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">📜</div>
          <p className="text-2xl font-bold" style={{ 
            fontFamily: "'Uncial Antiqua', cursive",
            color: '#78350f'
          }}>
            Loading Ancient Scroll...
          </p>
          <p className="text-sm mt-2" style={{ color: '#78350f' }}>
            Order: {ORDER} | From: {fromPage || 'unknown'}
          </p>
        </motion.div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 251, 235, 0.9) 0%, rgba(245, 222, 179, 0.95) 100%)'
        }}
      >
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-2xl font-bold text-red-800 mb-4">Question not found!</p>
          <div className="bg-white/80 p-6 rounded-lg mb-6 text-left">
            <p className="text-lg text-gray-700 mb-2">
              <strong>Searching for:</strong>
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Category: <strong>{CATEGORY}</strong></li>
              <li>• Level: <strong>{LEVEL}</strong></li>
              <li>• Difficulty: <strong>{DIFFICULTY}</strong></li>
              <li>• Order: <strong>{ORDER}</strong></li>
              <li>• From Page: <strong>{fromPage || 'Not specified'}</strong></li>
            </ul>
            {error && (
              <p className="text-red-600 mt-4">
                Error: {error}
              </p>
            )}
          </div>
          <button
            onClick={() => navigate('/level2/idorpage4')}
            className="mt-6 px-8 py-4 bg-amber-800 text-white rounded-lg font-bold hover:bg-amber-700 transition-all"
            style={{ fontFamily: "'Uncial Antiqua', cursive" }}
          >
            Return to IDOR Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(255, 251, 235, 0.9) 0%, rgba(245, 222, 179, 0.95) 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-8xl">🏛️</div>
        <div className="absolute top-20 right-20 text-6xl">📜</div>
        <div className="absolute bottom-20 left-20 text-7xl">🗡️</div>
        <div className="absolute bottom-10 right-10 text-6xl">🛡️</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBackToJourney}
          className="mb-8 px-6 py-3 text-lg font-bold rounded-lg border-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          style={{
            backgroundColor: 'rgba(255, 251, 235, 0.9)',
            borderColor: '#78350f',
            color: '#78350f'
          }}
        >
          <span className="text-2xl">←</span> Back to IDOR Hub
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ 
              fontFamily: "'Uncial Antiqua', cursive",
              color: '#78350f',
              textShadow: '3px 3px 6px rgba(0,0,0,0.3)'
            }}
          >
            Test Your Knowledge
          </h1>
          <p className="text-xl font-bold" style={{ color: '#451a03' }}>
            IDOR Scroll #{ORDER} - {DIFFICULTY} Challenge
          </p>
        </motion.div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 p-10 rounded-2xl border-4 shadow-2xl"
          style={{
            backgroundColor: 'rgba(255, 251, 235, 0.95)',
            borderColor: '#78350f'
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">📜</span>
            <h2 
              className="text-2xl md:text-3xl font-bold leading-relaxed"
              style={{ 
                color: '#1a0f08',
                textShadow: '1px 1px 3px rgba(255,255,255,0.8)'
              }}
            >
              {question.question}
            </h2>
          </div>

          {question.scenario && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 p-6 rounded-lg border-2"
              style={{
                backgroundColor: 'rgba(245, 222, 179, 0.5)',
                borderColor: '#a16207'
              }}
            >
              <p className="text-lg font-medium" style={{ color: '#451a03' }}>
                📖 <span className="font-bold">Scenario:</span> {question.scenario}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-6 mb-10">
          {question.options && question.options.map((option, index) => (
            <motion.button
              key={option.optionLabel}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              onClick={() => handleAnswerSelect(option.optionLabel)}
              disabled={isSubmitted}
              className={`
                p-8 rounded-xl font-bold text-left transition-all duration-300 border-4 shadow-lg
                ${selectedAnswer === option.optionLabel
                  ? 'transform scale-105 shadow-2xl'
                  : 'hover:transform hover:scale-102 hover:shadow-xl'
                }
                ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{
                backgroundColor: selectedAnswer === option.optionLabel
                  ? 'rgba(245, 158, 11, 0.9)'
                  : 'rgba(255, 251, 235, 0.9)',
                borderColor: selectedAnswer === option.optionLabel
                  ? '#78350f'
                  : '#a16207',
                color: '#1a0f08'
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-bold min-w-[40px]">
                  {option.optionLabel}.
                </span>
                <span className="text-xl leading-relaxed">
                  {option.optionText}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Result Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mb-8 p-8 rounded-xl border-4"
              style={{
                backgroundColor: isCorrect 
                  ? 'rgba(34, 197, 94, 0.2)' 
                  : 'rgba(239, 68, 68, 0.2)',
                borderColor: isCorrect ? '#15803d' : '#991b1b'
              }}
            >
              <p className={`text-3xl font-bold mb-4 ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              {!isCorrect && correctAnswer && (
                <p className="text-xl font-semibold" style={{ color: '#451a03' }}>
                  The correct answer was: <span className="font-bold text-2xl">{correctAnswer}</span>
                </p>
              )}
              
              {/* After submission, show back to hub button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <p className="text-lg mb-4" style={{ color: '#451a03' }}>
                  Return to IDOR Hub to continue your journey
                </p>
                <button
                  onClick={handleBackToJourney}
                  className="px-10 py-4 text-white text-xl font-bold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-4"
                  style={{
                    background: 'linear-gradient(to right, #78350f, #451a03)',
                    borderColor: '#1a0f08',
                    fontFamily: "'Uncial Antiqua', cursive"
                  }}
                >
                  Return to Hub →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reflection Modal */}
        <AnimatePresence>
          {showReflection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6"
              onClick={() => setShowReflection(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-3xl w-full p-10 rounded-2xl border-4 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(255, 251, 235, 0.98)',
                  borderColor: '#78350f'
                }}
              >
                <div className="text-center mb-6">
                  <span className="text-6xl mb-4 block">🦉</span>
                  <h3 
                    className="text-4xl font-bold mb-2"
                    style={{ 
                      fontFamily: "'Uncial Antiqua', cursive",
                      color: '#78350f'
                    }}
                  >
                    Ancient Wisdom
                  </h3>
                </div>
                
                <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(245, 222, 179, 0.5)' }}>
                  <p className="text-lg leading-relaxed" style={{ color: '#1a0f08' }}>
                    {reflection}
                  </p>
                </div>

                <button
                  onClick={() => setShowReflection(false)}
                  className="w-full py-4 rounded-lg font-bold text-xl text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #78350f, #451a03)',
                    fontFamily: "'Uncial Antiqua', cursive"
                  }}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button - Only show before submission */}
        {!isSubmitted && (
          <div className="flex justify-center gap-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`
                px-12 py-5 text-white text-2xl font-bold rounded-lg shadow-xl 
                transition-all duration-300 border-4
                ${selectedAnswer 
                  ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
                }
              `}
              style={{
                background: selectedAnswer 
                  ? 'linear-gradient(to right, #78350f, #451a03)'
                  : '#9ca3af',
                borderColor: '#1a0f08',
                fontFamily: "'Uncial Antiqua', cursive"
              }}
            >
              Submit Answer
            </motion.button>
          </div>
        )}

        {/* Explanation (after submission) */}
        {isSubmitted && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 p-8 rounded-xl border-4"
            style={{
              backgroundColor: 'rgba(254, 243, 199, 0.8)',
              borderColor: '#a16207'
            }}
          >
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: '#78350f' }}>
              <span className="text-3xl">💡</span> Explanation:
            </h4>
            <p className="text-lg leading-relaxed" style={{ color: '#451a03' }}>
              {question.explanation}
            </p>
          </motion.div>
        )}
      </div>

      {/* Add Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap" rel="stylesheet" />
    </div>
  );
};

export default IdorQuizPage;