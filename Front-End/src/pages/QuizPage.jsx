import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizService from "../store/useQuizService"; // API service for fetching questions
import ProgressBar from "../components/ProgressBar"; // Progress bar component
import QuizReflectionModal from "../components/QuizReflectionModal"; // Modal for showing reflection

const QuizPage = () => {
  const { category, difficulty, level } = useParams(); // Get category, difficulty, and level from URL
  const navigate = useNavigate(); // To navigate to QuizHomePage
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(""); // State to store correct answer
  const [points, setPoints] = useState(0); // State for points earned
  const [totalQuestions, setTotalQuestions] = useState(0); // State to store total questions in category
  const [reflection, setReflection] = useState(""); // Store reflection for the question
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Fetch the next question based on category, difficulty, and level
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData = await quizService.getNextQuestion(category, difficulty, level);
      setQuestion(questionData);
      setCorrectAnswer(questionData.correctAnswer); // Ensure correctAnswer is set after question data is fetched
    };

    fetchQuestion();
  }, [category, difficulty, level, currentQuestionOrder]);

  // Fetch total number of questions for the given category, difficulty, and level
  useEffect(() => {
    const fetchTotalQuestions = async () => {
      try {
        const result = await quizService.getTotalOrder(category, difficulty, level);
        console.log("Total questions fetched:", result); // Debugging the total questions
        setTotalQuestions(result.totalOrder); // Set total questions from the response
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
        // Submit answer to backend
        const result = await quizService.submitAnswer(question._id, selectedAnswer);

        // Set the answer submission state
        setIsSubmitted(true);
        setPoints(result.pointsEarned); // Set the points earned from the backend response

        // Store the correct answer in the state for comparison (from backend response)
        setCorrectAnswer(result.correctAnswer); // This should already be done in the fetch call

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
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with SABIL badge */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-xl font-bold">
            {category} Quiz - {difficulty} Level {level}
          </h1>
          <div className="bg-yellow-400 px-4 py-2 rounded font-bold text-black">
            SABIL
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar completed={currentQuestionOrder} total={totalQuestions} />
        </div>

        {question ? (
          <>
            {/* Question Box */}
            <div className="bg-yellow-400 p-8 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-black leading-relaxed">
                {question.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {question.options &&
                question.options.map((option) => (
                  <button
                    key={option.optionLabel}
                    onClick={() => handleAnswerChange(option.optionLabel)}
                    disabled={isSubmitted}
                    className={`p-6 rounded-lg font-bold text-lg transition-colors ${
                      selectedAnswer === option.optionLabel
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-400 text-black hover:bg-gray-300"
                    } ${isSubmitted ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
                  >
                    <div className="text-sm mb-2">{option.optionLabel}.</div>
                    <div>{option.optionText}</div>
                  </button>
                ))}
            </div>

            {/* Result Message */}
            {isSubmitted && (
              <div className="text-center mb-6">
                <p
                  className={`text-lg font-bold ${
                    compareAnswers(selectedAnswer, correctAnswer)
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Your answer is{" "}
                  {compareAnswers(selectedAnswer, correctAnswer) ? "correct" : "incorrect"}!
                </p>
                {selectedAnswer !== correctAnswer && (
                  <p className="text-gray-300 mt-2">
                    The correct answer was: {correctAnswer}
                  </p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuestionOrder === 1}
              >
                Back
              </button>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                    selectedAnswer
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-colors"
                >
                  {currentQuestionOrder === totalQuestions ? "Done" : "Next"}
                </button>
              )}
            </div>

            {/* Question Counter */}
            <div className="text-center mt-6">
              <span className="text-gray-400">
                Question {currentQuestionOrder} of {totalQuestions}
              </span>
            </div>
          </>
        ) : (
          /* Loading State */
          <div className="text-center">
            <div className="bg-gray-700 p-8 rounded-lg mb-8 animate-pulse">
              <div className="h-6 bg-gray-600 rounded mb-4"></div>
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            </div>
            <p className="text-gray-400">Loading question...</p>
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
