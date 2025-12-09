import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useQuizService from '../../store/useQuizService.js';
import bg from "../../assets/sqlbackground.png";
import lock from "../../assets/lock.png";
import door from "../../assets/door.png";

const slideVariants = {
  enter: {
    x: 1000,
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.8
    }
  },
  exit: {
    x: -1000,
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
};

const sectionVariant = {
  hidden: { x: -150, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.6
    }
  }
};

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.5
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  })
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: {
      duration: 0.3
    }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const doorVariants = {
  hidden: { 
    scale: 0.5, 
    opacity: 0,
    rotate: -10
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8
    }
  }
};

const Sqlpage1 = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [showHintModal, setShowHintModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(10);

  // Unique identifier for this page
  const PAGE_IDENTIFIER = "sql-page1-stone-door-auth";
  const CATEGORY = "SQL Basics";
  const LEVEL = 1;
  const MAX_POINTS = 10;
  const POINTS_DEDUCTION = 2;
  const MAX_ATTEMPTS = 5;

  const words = ["You", "are", "the", "mighty", "Lion"];

  // Calculate points based on attempts
  const calculatePoints = (attemptCount) => {
    const points = MAX_POINTS - (attemptCount * POINTS_DEDUCTION);
    return Math.max(0, points); // Never go below 0
  };

  // Check if user has already completed this page
  useEffect(() => {
    checkPageCompletion();
  }, []);

  const checkPageCompletion = async () => {
    try {
      setIsLoading(true);
      const response = await useQuizService.checkPageCompletion(PAGE_IDENTIFIER);
      setIsCompleted(response.completed);
      console.log('Page completion status:', response);
    } catch (error) {
      console.error('Error checking completion status:', error);
      setIsCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (isCorrect, userAnswer, pointsToAward) => {
    try {
      setIsSubmitting(true);

      const response = await useQuizService.submitShortAnswer(
        PAGE_IDENTIFIER,
        [userAnswer],
        isCorrect,
        pointsToAward,
        CATEGORY,
        LEVEL,
        null
      );

      if (response.success && isCorrect) {
        setIsCompleted(true);
        console.log('Answer submitted successfully:', response);
      }
      return response;
    } catch (error) {
      console.error('Error submitting answer:', error.response?.data || error.message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start showing words after component mounts
  useEffect(() => {
    setShowWords(true);
  }, []);

  // Auto-advance sections every 5 seconds
  useEffect(() => {
    if (currentSection < 2) {
      const timer = setTimeout(() => {
        setCurrentSection(prev => prev + 1);
      }, 5000);

      return () => clearTimeout(timer);
    } else if (currentSection === 2) {
      const finalTimer = setTimeout(() => {
        setIsIntroComplete(true);
      }, 5000);

      return () => clearTimeout(finalTimer);
    }
  }, [currentSection]);

  // Reset on reload
  useEffect(() => {
    setCurrentSection(0);
    setIsIntroComplete(false);
    setShowWords(true);
  }, []);

  const handleExecuteQuery = async () => {
    const trimmedQuery = sqlQuery.trim();
    
    if (!trimmedQuery) {
      setShowErrorModal(true);
      return;
    }

    // Normalize the query spacing but preserve case for password
    const normalizedQuery = trimmedQuery
      .replace(/\s+/g, ' ')
      .replace(/\s*=\s*/g, ' = ')
      .replace(/;+$/g, '')
      .trim();

    console.log('Original Query:', trimmedQuery);
    console.log('Normalized Query:', normalizedQuery);

    // Convert to lowercase for structure checking only
    const lowerQuery = normalizedQuery.toLowerCase();
    
    // Extract password value from the query (PRESERVE ORIGINAL CASE)
    const passwordMatch = normalizedQuery.match(/password\s*=\s*["']([^"']+)["']/i);
    const extractedPassword = passwordMatch ? passwordMatch[1] : '';
    
    // Extract name value from the query
    const nameMatch = normalizedQuery.match(/name\s*=\s*["']([^"']+)["']/i);
    const extractedName = nameMatch ? nameMatch[1].toLowerCase() : '';
    
    // Check if query structure is correct
    const hasSelectAll = lowerQuery.includes('select') && lowerQuery.includes('*');
    const hasFromUsers = lowerQuery.includes('from') && lowerQuery.includes('users');
    const hasWhere = lowerQuery.includes('where');
    const hasAnd = lowerQuery.includes('and');
    const hasName = nameMatch !== null;
    const hasPassword = passwordMatch !== null;
    
    // THE CORRECT PASSWORD (case-sensitive)
    const CORRECT_PASSWORD = '12345*In';
    
    // Check if credentials match
    const nameCorrect = extractedName === 'john';
    const passwordCorrect = extractedPassword === CORRECT_PASSWORD; // EXACT MATCH
    
    // Debug logging
    console.log('Validation Details:', {
      extractedName,
      extractedPassword,
      expectedPassword: CORRECT_PASSWORD,
      nameCorrect,
      passwordCorrect,
      hasSelectAll,
      hasFromUsers,
      hasWhere,
      hasAnd,
      hasName,
      hasPassword
    });
    
    // ALL conditions must be true
    const isCorrect = hasSelectAll && 
                      hasFromUsers && 
                      hasWhere && 
                      hasAnd && 
                      hasName &&
                      hasPassword &&
                      nameCorrect && 
                      passwordCorrect;

    console.log('Final Result:', isCorrect ? 'CORRECT' : 'INCORRECT');
    console.log('Current Attempts:', attempts);

    if (isCorrect) {
      // Calculate points based on current attempts (before this correct answer)
      const pointsEarned = calculatePoints(attempts);
      setCurrentPoints(pointsEarned);
      
      // Submit the correct answer to backend with earned points
      await submitAnswer(true, trimmedQuery, pointsEarned);
      
      setShowSuccessModal(true);
      setSqlQuery('');
    } else {
      // Increment attempts for wrong answer
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Calculate new points after this wrong attempt
      const newPoints = calculatePoints(newAttempts);
      setCurrentPoints(newPoints);
      
      console.log('Wrong answer! Attempts:', newAttempts, 'Points remaining:', newPoints);
      
      // If max attempts reached, submit with 0 points and mark as completed (failed)
      if (newAttempts >= MAX_ATTEMPTS) {
        await submitAnswer(false, trimmedQuery, 0);
        setIsCompleted(true); // Lock the question after max attempts
      }
      
      setShowErrorModal(true);
    }
  };

  const sections = [
    {
      id: 1,
      color: "bg-red-500",
      title: "",
      description: "You are the mighty Lion, the undisputed king of the jungle. Your cave is your fortress, filled with treasures and resources — the finest prey, water reserves, and precious resources collected over years of reign."
    },
    {
      id: 2,
      color: "bg-blue-500",
      title: "",
      description: "But the jungle is full of cunning creatures. Hyenas, jackals, and rival predators circle your territory day and night, scheming to infiltrate your cave and steal your hard-earned treasures."
    },
    {
      id: 3,
      color: "bg-green-500",
      title: "",
      description: "However, you are not alone. You command a pride of loyal lionesses and your powerful sons — your trusted family who need to enter and exit the cave freely to hunt, patrol, and defend your territory."
    }
  ];

  // Show loading state while checking completion
  if (isLoading) {
    return (
      <div 
        className="h-screen w-full bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  // If intro is not complete, show sliding sections
  if (!isIntroComplete) {
    return (
      <div 
        className="h-screen w-full bg-cover bg-center bg-fixed overflow-hidden flex flex-col"
        style={{ 
          backgroundImage: `url(${bg})`,
          fontFamily: "'Hind Kochi', sans-serif"
        }}
      >
        {/* Animated Title Text - Upper Portion */}
        <div className="flex-shrink-0 pt-8 pb-6">
          <div className="flex justify-center items-center gap-3 md:gap-4 flex-wrap px-4">
            {words.map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wordVariants}
                initial="hidden"
                animate={showWords ? "visible" : "hidden"}
                className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold drop-shadow-2xl"
                style={{
                  fontFamily: "'Hind Kochi', sans-serif",
                  textShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.5)'
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Sections - Center Portion - BIGGER */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`${sections[currentSection].color} bg-opacity-80 p-10 md:p-14 lg:p-20 rounded-3xl shadow-2xl max-w-7xl w-full`}
              style={{ fontFamily: "'Hind Kochi', sans-serif" }}
            >
              {sections[currentSection].title && (
                <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-semibold text-center mb-8">
                  {sections[currentSection].title}
                </h1>
              )}
              
              <p className="text-white text-xl md:text-3xl lg:text-4xl font-medium text-center leading-relaxed">
                {sections[currentSection].description}
              </p>
              
              {/* Progress indicator */}
              <div className="mt-10 flex justify-center gap-3 md:gap-4">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 w-16 md:w-20 rounded-full transition-colors duration-300 ${
                      index === currentSection ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              {/* Timer display */}
              <p className="text-white/80 text-lg md:text-2xl text-center mt-8 font-medium">
                {currentSection < 2 ? 'Next section in 20s...' : 'Page will be scrollable in 20s...'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // After intro, show scrollable page with all sections TOGETHER
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed py-12 md:py-16"
      style={{ 
        backgroundImage: `url(${bg})`,
        fontFamily: "'Hind Kochi', sans-serif"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8 md:space-y-12">
        {/* Section 1 */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-red-500 bg-opacity-80 p-8 md:p-12 rounded-3xl shadow-2xl">
            <p className="text-white text-lg md:text-2xl lg:text-3xl font-medium text-center leading-relaxed">
              You are the mighty Lion, the undisputed king of the jungle. Your cave is your fortress, filled with treasures and resources — the finest prey, water reserves, and precious resources collected over years of reign.
            </p>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-blue-500 bg-opacity-80 p-8 md:p-12 rounded-3xl shadow-2xl">
            <p className="text-white text-lg md:text-2xl lg:text-3xl font-medium text-center leading-relaxed">
              But the jungle is full of cunning creatures. Hyenas, jackals, and rival predators circle your territory day and night, scheming to infiltrate your cave and steal your hard-earned treasures.
            </p>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-green-500 bg-opacity-80 p-8 md:p-12 rounded-3xl shadow-2xl">
            <p className="text-white text-lg md:text-2xl lg:text-3xl font-medium text-center leading-relaxed">
              However, you are not alone. You command a pride of loyal lionesses and your powerful sons — your trusted family who need to enter and exit the cave freely to hunt, patrol, and defend your territory.
            </p>
          </div>
        </motion.div>

        {/* SQL Query Input Section / Door Section */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {isCompleted ? (
            // SHOW DOOR - QUESTION ALREADY ANSWERED CORRECTLY OR MAX ATTEMPTS REACHED
            <div className="p-8 md:p-12 rounded-3xl shadow-2xl">
              <motion.div
                variants={doorVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center"
              >
                <div className="mb-6">
                  <motion.img 
                    src={door} 
                    alt="Open Door" 
                    className="w-full max-w-md h-auto opacity-90"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
                <div className="mt-8 text-center">                 
                  {/* Continue Button */}
                  <button
                    onClick={() => navigate('/level2/sqlpage2')}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold py-4 px-10 rounded-full text-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
                  >
                    <span>Continue Your Journey</span>
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            // SHOW QUESTION INPUT - NOT YET ANSWERED
            <div className="bg-purple-950 bg-opacity-80 p-8 md:p-12 rounded-3xl shadow-2xl border-dotted border-8 border-red-500">
              <div className="flex justify-center items-center mb-6">
                <img src={lock} alt="Lock" className="w-1/3 h-auto opacity-80" />
              </div>

              <h1 className="text-white text-4xl md:text-3xl lg:text-6xl font-semibold text-center mb-6">
                The Stone Door Logic
              </h1>
              <p className="text-white text-lg md:text-2xl lg:text-3xl font-medium text-center leading-relaxed mb-8">
                You've installed a magical stone door at the cave's entrance — a lock that responds only to secret passwords. Your family knows the correct password, and the stone door recognizes their voices, allowing them safe passage. Now write the code to setup the lock.
              </p>

              {/* Points and Attempts Display */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-xl px-6 py-3">
                  <span className="text-yellow-400 font-bold text-lg">
                    🏆 Points Available: {calculatePoints(attempts)}
                  </span>
                </div>
                <div className="bg-red-500/20 border-2 border-red-400 rounded-xl px-6 py-3">
                  <span className="text-red-400 font-bold text-lg">
                    ⚔️ Attempts: {attempts}/{MAX_ATTEMPTS}
                  </span>
                </div>
              </div>

              {/* Hint Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setShowHintModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  Show Hint
                </button>
              </div>

              {/* SQL Input */}
              <div className="relative w-full mb-6">
                <input
                  type="text"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleExecuteQuery()}
                  placeholder="Write Sql Query"
                  disabled={isSubmitting}
                  className={`w-full h-[66px] bg-gray-400/40 backdrop-blur-sm rounded-[10px] px-6 pr-28 text-white placeholder:text-white placeholder:font-semibold text-lg font-semibold outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
                <button 
                  onClick={handleExecuteQuery}
                  disabled={isSubmitting}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-[90px] h-[46px] bg-gradient-to-r from-purple-500 to-purple-600 rounded-[25px] flex items-center justify-center transition-all shadow-lg ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-purple-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Hint Modal */}
      <AnimatePresence>
        {showHintModal && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowHintModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-yellow-400/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowHintModal(false)}
                className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors"
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-6 text-center">
                🗄️ DATABASE HINT
              </h2>
              
              <div className="space-y-4 text-white">
                <div className="bg-gray-800/60 p-4 rounded-xl">
                  <span className="font-semibold text-blue-400 text-xl">Table:</span> 
                  <span className="ml-2 text-white text-xl">users</span>
                </div>
                
                <div className="bg-gray-800/60 p-4 rounded-xl">
                  <span className="font-semibold text-blue-400 text-xl">Columns:</span>
                  <div className="ml-6 mt-3 space-y-2">
                    <div className="font-mono text-lg">
                      name = <span className="text-green-400">"John"</span>
                    </div>
                    <div className="font-mono text-lg">
                      password = <span className="text-green-400">"12345*In"</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 p-4 rounded-xl">
                  <span className="font-semibold text-yellow-400 text-xl">🎯 Mission:</span>
                  <p className="ml-2 mt-2 text-white text-lg leading-relaxed">
                    Write a SQL query to authenticate and find the user with the correct credentials.
                  </p>
                </div>
                
                <div className="text-center pt-2 text-base text-gray-300 italic bg-gray-800/40 p-3 rounded-xl">
                  💡 Hint: Use SELECT with WHERE clause to match both name AND password
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowHintModal(false)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-green-900 to-green-950 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-green-400/50 max-w-2xl w-full relative"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors"
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <svg 
                    className="w-16 h-16 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
                  🎉 Success!
                </h2>
                
                <p className="text-white text-xl md:text-2xl mb-6 leading-relaxed">
                  The stone door recognizes the password! Your family can now enter safely while keeping intruders out.
                </p>

                <div className="bg-green-800/40 border-2 border-green-400 rounded-xl p-6 mb-6">
                  <p className="text-green-200 text-lg mb-2">
                    ✅ SQL Query Executed Successfully
                  </p>
                  <p className="text-green-200 text-lg mb-2">
                    🏆 +{currentPoints} Points Earned!
                  </p>
                  {attempts > 0 && (
                    <p className="text-yellow-200 text-sm">
                      (Solved in {attempts + 1} attempt{attempts > 0 ? 's' : ''})
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/level2/sqlpage2');
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
                >
                  Continue Your Journey
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-red-900 to-red-950 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-red-400/50 max-w-2xl w-full relative"
            >
              <button
                onClick={() => setShowErrorModal(false)}
                className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mb-6"
                >
                  <svg 
                    className="w-16 h-16 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-red-400 mb-4">
                  ❌ Incorrect
                </h2>
                
                <p className="text-white text-xl md:text-2xl mb-6 leading-relaxed">
                  The stone door remains locked. The password doesn't match. Check your SQL query carefully!
                </p>

                <div className="bg-red-800/40 border-2 border-red-400 rounded-xl p-6 mb-6">
                  {attempts >= MAX_ATTEMPTS ? (
                    <>
                      <p className="text-red-200 text-lg mb-2">
                        ⚠️ Maximum attempts reached!
                      </p>
                      <p className="text-red-200 text-lg">
                        You earned 0 points for this challenge.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-red-200 text-lg mb-2">
                        ⚔️ Attempt {attempts} of {MAX_ATTEMPTS}
                      </p>
                      <p className="text-yellow-200 text-lg mb-2">
                        -2 points deducted! Points remaining: {calculatePoints(attempts)}
                      </p>
                      <p className="text-red-200 text-lg mb-4">
                        💡 Remember:
                      </p>
                      <ul className="text-red-200 text-left list-disc list-inside space-y-1">
                        <li>Check the spelling of table and column names</li>
                        <li>Passwords are case-sensitive</li>
                        <li>Use both AND conditions for name and password</li>
                      </ul>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setShowErrorModal(false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
                >
                  {attempts >= MAX_ATTEMPTS ? 'Continue' : 'Try Again'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sqlpage1;