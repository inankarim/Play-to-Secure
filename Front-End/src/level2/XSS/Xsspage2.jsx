import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import quizService from "../../store/useQuizService";
import { useNavigate } from "react-router-dom";

import arrow1 from "../../assets/XSSNo1/arrow-1.svg";
import arrow2 from "../../assets/XSSNo1/arrow-2.svg";
import div1 from "../../assets/XSSNo1/div-1.png";
import div2 from "../../assets/XSSNo1/div-2.png";
import formRegistration from "../../assets/XSSNo1/form-registration.json";
import hacker from "../../assets/XSSNo1/Hacker.json";
import rectangle8 from "../../assets/XSSNo1/rectangle-8.png";
import rectangle9 from "../../assets/XSSNo1/rectangle-9.png";
import rectangle10 from "../../assets/XSSNo1/rectangle-10.png";
import rectangle49 from "../../assets/XSSNo1/reactangle-49.png"

const Xsspage2 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scale, setScale] = useState(1);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // XSS quiz parameters
  const CATEGORY = "xss";
  const DIFFICULTY = "Medium";
  const LEVEL = 2;
  const ORDER = 1;

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
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Bubbles&display=swap"
          rel="stylesheet"
        />
        <div className="text-center">
          <div className="text-6xl mb-4">📜</div>
          <p className="text-2xl font-bold text-black" style={{ fontFamily: "'Rubik Bubbles', cursive" }}>
            Loading XSS Challenge...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !question) {
    return (
      <div className="w-screen h-screen bg-[#ebe5d9] flex items-center justify-center">
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Bubbles&display=swap"
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

  // Use all options from backend (don't filter)
  const displayOptions = question.options || [];

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }

    try {
      console.log("Submitting answer:", {
        questionId: question._id,
        selectedAnswer
      });

      // Submit answer to backend
      const result = await quizService.submitAnswer(question._id, selectedAnswer);
      
      console.log("Submit result:", result);

      if (result.isCorrect) {
        alert("✅ Correct! Well done!");
      } else {
        alert(`❌ Incorrect. The correct answer was: ${result.correctAnswer}`);
      }

      // Navigate to next page after submission
      // TODO: Update this path to your actual next XSS page
      navigate('/level2/xsspage3'); 
      
    } catch (error) {
      console.error("Error submitting answer:", error);
      
      // Check if it's a duplicate submission error
      if (error.response?.status === 400 && error.response?.data?.message?.includes("already")) {
        alert("You have already answered this question!");
        // Still navigate to next page even if already answered
        navigate('/level2/xsspage3');
      } else {
        alert("Failed to submit answer. Please try again.");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-[#ebe5d9] flex items-center justify-center overflow-hidden">

      {/* ✅ GOOGLE FONTS */}
      <link
        href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Bubbles&display=swap"
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
        <main className="absolute inset-0 bg-[#ebe5d9]">

          {/* White panel */}
          <div className="absolute top-[112px] left-[21px] w-[1390px] h-[885px] bg-white" />

          {/* Header */}
          <h1
            className="absolute top-[32px] left-[280px] w-[926px] text-5xl text-black"
            style={{ fontFamily: "'Rubik Bubbles', cursive" }}
          >
            The XSS Attack: A Coder&apos;s Worst day
          </h1>

          {/* Comic */}
          <img
            src={div2}
            alt="Comic"
            className="absolute top-[193px] left-[59px] w-[701px] h-[701px]"
          />

          {/* Quiz title */}
          <div className="absolute top-[211px] left-[857px] w-[414px] h-[57px] bg-[#e2e83e]" />
          <h2
            className="absolute top-[224px] left-[928px] text-[32px]"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            Cyber Attack Quiz!
          </h2>

          {/* Question - Dynamic from backend */}
          <div className="absolute top-[312px] left-[825px] w-[479px] h-[85px] bg-[#d9d9d9] rounded-[20px]" />
          <p
            className="absolute top-[327px] left-[843px] w-[446px] text-[32px] leading-[35px]"
            style={{ fontFamily: "'Roboto Mono', monospace" }}
          >
            {question.question}
          </p>

          {/* Diagram boxes */}
          <img src={rectangle10} className="absolute top-[458px] left-[840px] w-[140px]" />
          <img src={rectangle9} className="absolute top-[458px] left-[1019px] w-[140px]" />
          <img src={rectangle8} className="absolute top-[458px] left-[1190px] w-[140px]" />
          <img src={rectangle49} className="absolute top-[160px] left-[65px] w-[1398px]" />

          {/* Arrows */}
          <img src={arrow1} className="absolute top-[520px] left-[970px] w-[41px]" />
          <img src={arrow2} className="absolute top-[525px] left-[1151px] w-[40px]" />

          {/* Lottie form */}
          <div className="absolute top-[470px] left-[858px] w-[76px] h-[76px]">
            <p className="text-sm text-start mt-0 text-black">Applicant Portal</p>
            <Lottie animationData={formRegistration} loop autoplay />
          </div>
          <div className="absolute top-[470px] left-[1040px] w-[76px] h-[76px]">
            <p className="text-xl text-start text-black">HR DATABASE SYSTEM</p>
            
          </div>

          {/* Hacker */}
          <img src={div1} className="absolute top-[485px] left-[1197px] w-[131px]" />
          <div className="absolute top-[470px] left-[1213px] w-[99px] h-[92px]">
            <Lottie animationData={hacker} loop autoplay />
          </div>

          {/* Instruction */}
          <p
            className="absolute top-[633px] left-[750px] w-[570px] text-4xl text-center"
            style={{ fontFamily: "'Roboto Mono', monospace" }}
          >
            Choose the correct answer:
          </p>

          {/* Buttons - Dynamic from backend options - Show all options */}
          {displayOptions.map((option, index) => {
            const positions = [
              { top: "700px" },   // Option A
              { top: "754px" },   // Option B
              { top: "808px" },   // Option C
              { top: "862px" },   // Option D (if exists)
            ];
            const position = positions[index] || { top: `${700 + index * 54}px` };
            
            return (
              <button
                key={option.optionLabel}
                className={`absolute left-[947px] w-[272px] h-[41px]
                  rounded-[20px] border border-black shadow transition-all
                  ${selectedAnswer === option.optionLabel ? 'bg-[#d4c519] scale-105' : 'bg-[#e2e83e]'}
                `}
                style={{ top: position.top, fontFamily: "'Permanent Marker', cursive" }}
                onClick={() => setSelectedAnswer(option.optionLabel)}
              >
                <span className="text-2xl">{option.optionText}</span>
              </button>
            );
          })}

          {/* Next/Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`absolute top-[930px] left-[1219px] w-[172px] h-[81px]
              rounded-[20px] transition-all
              ${selectedAnswer ? 'bg-[#e2e83e] hover:bg-[#d4c519] cursor-pointer' : 'bg-gray-400 cursor-not-allowed opacity-50'}
            `}
            style={{ fontFamily: "'Rubik Bubbles', cursive" }}
          >
            <span className="text-5xl">next</span>
          </button>

        </main>
      </div>
    </div>
  );
};

export default Xsspage2;