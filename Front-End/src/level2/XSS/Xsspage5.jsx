import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import quizService from "../../store/useQuizService";
import progressService from '../../store/progressService';
import { useNavigate } from "react-router-dom";

import geminiGeneratedImage from "../../assets/XSSNo1/xssmiti/quiztime.png";

const Xsspage5 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scale, setScale] = useState(1);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completingAttack, setCompletingAttack] = useState(false);
  const navigate = useNavigate();

  // XSS quiz parameters - ORDER 2
  const CATEGORY = "xss";
  const DIFFICULTY = "Medium";
  const LEVEL = 2;
  const ORDER = 2;

  const BASE_WIDTH = 1440;
  const BASE_HEIGHT = 1024;

  // Fetch question from backend
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching XSS question with params:", {
          category: CATEGORY,
          difficulty: DIFFICULTY,
          level: LEVEL,
          order: ORDER
        });

        const questionData = await quizService.getQuestionByOrder(
          CATEGORY,
          DIFFICULTY,
          LEVEL,
          ORDER
        );
        
        console.log("Question data received:", questionData);
        
        if (questionData) {
          setQuestion(questionData);
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
  }, [CATEGORY, DIFFICULTY, LEVEL, ORDER]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const scaleW = window.innerWidth / BASE_WIDTH;
      const scaleH = window.innerHeight / BASE_HEIGHT;
      setScale(Math.min(scaleW, scaleH));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="w-screen h-screen bg-[#ebe5d9] flex items-center justify-center">
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Bubbles&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">📜</div>
          <p className="text-2xl font-bold text-black" style={{ fontFamily: "'Rubik Bubbles', cursive" }}>
            Loading Defense Challenge...
          </p>
        </motion.div>
      </div>
    );
  }

  // Show error state
  if (error || !question) {
    return (
      <div className="w-screen h-screen bg-[#ebe5d9] flex items-center justify-center">
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Bubbles&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-2xl font-bold text-red-800 mb-4">Question not found!</p>
          <p className="text-lg text-gray-700 mb-2">Error: {error || "Failed to load question"}</p>
          <div className="bg-white p-4 rounded-lg mt-4 text-left max-w-md mx-auto">
            <p className="font-bold mb-2">Searching for:</p>
            <p className="text-sm">Category: {CATEGORY}</p>
            <p className="text-sm">Difficulty: {DIFFICULTY}</p>
            <p className="text-sm">Level: {LEVEL}</p>
            <p className="text-sm">Order: {ORDER}</p>
          </div>
        </div>
      </div>
    );
  }

  // Use all options from backend
  const displayOptions = question.options || [];

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }

    try {
      setCompletingAttack(true);
      
      console.log("Submitting answer:", {
        questionId: question._id,
        selectedAnswer
      });

      // Submit answer to backend
      const result = await quizService.submitAnswer(question._id, selectedAnswer);
      
      console.log("Submit result:", result);

      if (result.isCorrect) {
        toast.success("✅ Correct! Well done!");
      } else {
        toast.error(`❌ Incorrect. The correct answer was: ${result.correctAnswer}`);
      }

      // Mark XSS attack as complete
      await progressService.markAttackComplete('xss');
      
      toast.success('🎉 XSS Attack Completed!');
      
      // Navigate to QuizHomePage
      setTimeout(() => {
        navigate('/quizHome');
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting answer:", error);
      
      // Check if it's a duplicate submission error
      if (error.response?.status === 400 && error.response?.data?.message?.includes("already")) {
        toast.success("You have already answered this question!");
        
        // Still mark attack as complete and navigate
        try {
          await progressService.markAttackComplete('xss');
          toast.success('🎉 XSS Attack Completed!');
        } catch (progressError) {
          console.error('Error marking progress:', progressError);
          toast.error('Failed to save progress, but you can continue!');
        }
        
        setTimeout(() => {
          navigate('/quizHome');
        }, 2000);
      } else {
        toast.error("Failed to submit answer. Please try again.");
        setCompletingAttack(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-[#ebe5d9] flex items-center justify-center overflow-hidden">

      {/* ✅ GOOGLE FONTS */}
      <link
        href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Bubbles&family=Roboto+Mono&display=swap"
        rel="stylesheet"
      />

      <div
        className="relative"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <main className="absolute inset-0 bg-[#ebe5d9] flex items-center justify-center">

          <div className="w-[1360px] h-[940px] bg-white rounded-[30px] shadow-2xl relative overflow-hidden">

            {/* Header - Red background */}
            <motion.div 
              className="absolute top-[10px] left-[35px] w-[1290px] h-[75px] bg-[#e4423d] rounded-[20px] shadow-lg flex items-center justify-center"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <h1
                className="text-5xl text-white"
                style={{ 
                  fontFamily: "'Rubik Bubbles', cursive",
                  WebkitTextStroke: "2px #000000"
                }}
              >
                PREVENTING XSS ATTACKS: DEFENSE!
              </h1>
            </motion.div>

            {/* Left Section - Story */}
            <motion.div 
              className="absolute top-[110px] left-[50px] w-[610px]"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Yellow Header */}
              <div className="w-full h-[50px] bg-[#e2e83e] rounded-t-[20px] flex items-center justify-center border-4 border-black border-b-0">
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                  CYBER ATTACK QUIZ!
                </h2>
              </div>

              {/* Story Content Box */}
              <motion.div 
                className="w-full bg-white border-4 border-black rounded-b-[20px] p-6 shadow-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Story Title */}
                <h3
                  className="text-xl mb-4 text-[#ff6b35]"
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                  The Comment Box Disaster
                </h3>

                {/* Story Text */}
                <div
                  className="text-base leading-relaxed"
                  style={{ fontFamily: "'Roboto Mono', monospace", color: "#d4a574" }}
                >
                  <p className="mb-3">
                    You created a website where users can leave comments.
                  </p>
                  <p className="mb-3">
                    One day, a user posts:
                  </p>
                  <motion.div 
                    className="bg-gray-100 p-3 rounded-lg border-2 border-gray-300 mb-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <code className="text-red-600 font-bold text-sm">
                      &lt;script&gt;alert('Hacked!');&lt;/script&gt;
                    </code>
                  </motion.div>
                  <p>
                    It pops up on every visitor's screen!
                  </p>
                </div>
              </motion.div>

              {/* Quiz Time Comic - Positioned nicely below story */}
              <motion.div
                className="mt-6 flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, -2, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <img
                  src={geminiGeneratedImage}
                  alt="Quiz time comic"
                  className="w-[350px] h-[350px] object-cover rounded-[20px] border-4 border-black shadow-xl"
                />
              </motion.div>
            </motion.div>

            {/* Right Section - Quiz */}
            <motion.div 
              className="absolute top-[110px] left-[690px] w-[620px]"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              
              {/* Quiz Title */}
              <div className="w-full h-[50px] bg-[#e2e83e] rounded-t-[20px] flex items-center justify-center border-4 border-black border-b-0">
                <h2
                  className="text-3xl"
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                >
                  MITIGATION QUIZ!
                </h2>
              </div>

              {/* Question Box */}
              <motion.div 
                className="w-full min-h-[90px] bg-white border-4 border-black rounded-b-[20px] p-5 mb-5 flex items-center justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p
                  className="text-[26px] leading-[30px] text-center"
                  style={{ fontFamily: "'Roboto Mono', monospace", color: "#d4a574" }}
                >
                  {question.question}
                </p>
              </motion.div>

              {/* Instruction */}
              <p
                className="text-3xl text-center mb-4"
                style={{ fontFamily: "'Roboto Mono', monospace", color: "#d4a574" }}
              >
                Choose the correct answer:
              </p>

              {/* Answer Options */}
              <div className="space-y-3">
                {displayOptions.map((option, index) => (
                  <motion.button
                    key={option.optionLabel}
                    className={`w-full h-[80px] rounded-[25px] border-4 border-black shadow-lg transition-all
                      ${selectedAnswer === option.optionLabel 
                        ? 'bg-[#d4c519]' 
                        : 'bg-[#e2e83e]'}
                    `}
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                    onClick={() => setSelectedAnswer(option.optionLabel)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={completingAttack}
                  >
                    <span className="text-[22px]" style={{ color: "#8b7355" }}>
                      {option.optionText}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Done Button (previously "next") */}
              <motion.button
                onClick={handleSubmit}
                disabled={!selectedAnswer || completingAttack}
                className={`w-full h-[70px] mt-5 rounded-[25px] border-4 border-black shadow-xl transition-all
                  ${selectedAnswer && !completingAttack
                    ? 'bg-[#d9d9d9] cursor-pointer' 
                    : 'bg-gray-300 cursor-not-allowed opacity-50'}
                `}
                style={{ fontFamily: "'Rubik Bubbles', cursive" }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={selectedAnswer && !completingAttack ? { 
                  scale: 1.05,
                  backgroundColor: "#c5c5c5"
                } : {}}
                whileTap={selectedAnswer && !completingAttack ? { scale: 0.95 } : {}}
              >
                <span className="text-5xl" style={{ color: "#d4a574" }}>
                  {completingAttack ? '⏳ completing...' : 'done'}
                </span>
              </motion.button>

            </motion.div>

            {/* Completion message */}
            {completingAttack && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              >
                <p 
                  className="text-3xl text-green-600 font-bold"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    fontFamily: "'Rubik Bubbles', cursive"
                  }}
                >
                  🎊 Congratulations! Saving your progress...
                </p>
              </motion.div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
};

export default Xsspage5;