import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizService from "../store/useQuizService"; 
import ProgressBar from "../components/ProgressBar"; 
import QuizReflectionModal from "../components/QuizReflectionModal"; 

const QuizPage = () => {
  const { category, difficulty, level } = useParams(); 
  const navigate = useNavigate(); 
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(""); 
  const [points, setPoints] = useState(0); 
  const [totalQuestions, setTotalQuestions] = useState(0); 
  const [reflection, setReflection] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

 
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData = await quizService.getNextQuestion(category, difficulty, level);
      setQuestion(questionData);
      setCorrectAnswer(questionData.correctAnswer); 
    };

    fetchQuestion();
  }, [category, difficulty, level, currentQuestionOrder]);

  
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
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    if (selectedAnswer && !isSubmitted) {
      try {
        
        const result = await quizService.submitAnswer(question._id, selectedAnswer);

        
        setIsSubmitted(true);
        setPoints(result.pointsEarned); 

        
        setCorrectAnswer(result.correctAnswer);

        // Fetch reflection from backend
        const reflectionData = await quizService.getAnswerReflection(question._id, selectedAnswer, result.isCorrect);
        setReflection(reflectionData.reflection); // Store the reflection

        // Open the modal
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionOrder === totalQuestions) {
      // If it's the last question, show "Done" and navigate to QuizHomePage
      navigate("/quizHome"); // Redirect user to QuizHomePage
    } else {
      setIsSubmitted(false);
      setSelectedAnswer(null);
      setCurrentQuestionOrder(currentQuestionOrder + 1); // Proceed to the next question
    }

    // Close the modal when user proceeds
    setIsModalOpen(false);
  };

  const handleBack = () => {
    if (currentQuestionOrder > 1) {
      setCurrentQuestionOrder(currentQuestionOrder - 1);
      setIsSubmitted(false);
      setSelectedAnswer(null);
    }
  };

  // Function to compare answers (case insensitive)
  const compareAnswers = (selected, correct) => {
    return selected && correct ? selected.toUpperCase() === correct.toUpperCase() : false;
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header with SABIL badge */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-bold">
            {category}Quiz - {difficulty} Level {level}
          </h1>
          
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <ProgressBar completed={currentQuestionOrder} total={totalQuestions} />
        </div>

        {question ? (
          <>
            {/* Question Box */}
            <div className="bg-yellow-400 p-12 rounded-xl mb-10 shadow-lg">
              <h2 className="text-2xl font-bold text-black leading-relaxed text-center">
                {question.question}
              </h2>
            </div>

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

            {/* Result Message */}
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
                  {compareAnswers(selectedAnswer, correctAnswer) ? "correct" : "incorrect"}!
                </p>
                {selectedAnswer !== correctAnswer && (
                  <p className="text-gray-300 text-lg">
                    The correct answer was: <span className="font-semibold">{correctAnswer}</span>
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
                Back
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
                  {currentQuestionOrder === totalQuestions ? "Done" : "Next"}
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
          /* Loading State */
          <div className="text-center">
            <div className="bg-gray-700 p-12 rounded-xl mb-10 animate-pulse shadow-lg">
              <div className="h-8 bg-gray-600 rounded mb-6"></div>
              <div className="h-6 bg-gray-600 rounded w-3/4 mx-auto"></div>
            </div>
            <p className="text-gray-400 text-xl">Loading question...</p>
          </div>
        )}
      </div>

      {/* Reflection Modal */}
      <QuizReflectionModal
        isOpen={isModalOpen}
        reflection={reflection}
        onClose={() => setIsModalOpen(false)}
        sendMessageToAI={quizService.sendMessageToAI} // Add this line
      />
    </div>
  );
};

export default QuizPage;