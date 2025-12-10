import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// Images
import attacker from "../assets/sqli_lvl1/attacker.png";
import bigbanner from "../assets/sqli_lvl1/bigbanner.png";
import database from "../assets/sqli_lvl1/database.png";
import form from "../assets/sqli_lvl1/form.png";
import sqliBackground from "../assets/sqli_lvl1/sqlibackground.png";

const SQLiLvl1 = () => {
  const navigate = useNavigate();
  const diagramRef = useRef(null);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [showDiagram, setShowDiagram] = useState(false);

  const scrollToDiagram = () => {
    setShowDiagram(true);
    setTimeout(() => {
      diagramRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleContinueToTraining = () => {
    // Navigate to SQLi Easy Level 1 quiz with return path
    // ✅ After completing quiz, user will be sent to /level2/sqlpage2
    navigate('/quiz/sqli/Easy/1', {
      state: { returnPath: '/level2/sqlipage1' }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-black text-white overflow-y-auto">
      {/* Continuous scrollable content */}

      {/* -------------------------------------- FIRST SECTION – BANNER WITH BREACH REPORT --------------------------------------- */}
      {/* Banner Container */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Banner Image */}
        <img
          src={bigbanner}
          alt="SQL Injection Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Animated scanning glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 via-transparent to-transparent animate-pulse"></div>

        {/* Text Overlay */}
        <div className="relative z-10 text-center px-4 max-w-6xl">
          {/* Main Title */}
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse"
            style={{ fontFamily: "'Orbitron', 'Rajdhani', 'Audiowide', sans-serif" }}
          >
            ATTACK METHOD: SQL INJECTION
          </h1>

          {/* Animated Underline */}
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8 animate-pulse"></div>

          {/* Subtitle */}
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 tracking-widest text-red-400 hover:text-red-300 transition-colors duration-300"
            style={{ fontFamily: "'Rajdhani', 'Audiowide', sans-serif", textShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
          >
            THE BREACH REPORT
          </h2>

          {/* Breach Stats */}
          <div className="space-y-4 text-xl md:text-2xl lg:text-3xl font-mono mb-12">
            <p className="text-red-300 hover:text-red-100 hover:scale-105 transition-all duration-300 cursor-default hover:drop-shadow-[0_0_15px_rgba(252,165,165,0.8)]">
              <span className="text-red-500 font-bold animate-pulse">⚠</span> 65 WEBSITES COMPROMISED
            </p>
            <p className="text-orange-300 hover:text-orange-100 hover:scale-105 transition-all duration-300 cursor-default hover:drop-shadow-[0_0_15px_rgba(253,186,116,0.8)]">
              <span className="text-orange-500 font-bold animate-pulse">⚠</span> 2,000,000+ EMAIL ADDRESSES STOLEN
            </p>
            <p className="text-yellow-300 hover:text-yellow-100 hover:scale-105 transition-all duration-300 cursor-default hover:drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]">
              <span className="text-yellow-500 font-bold animate-pulse">⚠</span> DATA SOLD ON UNDERGROUND CHANNELS
            </p>
          </div>

          {/* Button with pulse effect */}
          {!showDiagram && (
            <button
              onClick={scrollToDiagram}
              className="group relative px-10 py-5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-lg shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span className="relative z-10 flex items-center gap-2 text-xl md:text-2xl tracking-wider">
                How SQL INJECTION occurs
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </span>
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          )}
        </div>
      </div>

      {/* -------------------------------------- SECOND SECTION – SQLi Diagram (Hidden until button clicked) --------------------------------------- */}
      {showDiagram && (
        <div
          ref={diagramRef}
          className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 md:p-16"
        >
          {/* ---------- DIAGRAM GRID ----------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {/* Left side — attacker */}
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
                Injection ATTACK
              </h3>

              {/* Attacker Image — permanent glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <img
                  src={attacker}
                  alt="Attacker"
                  className="relative w-40 h-40 object-contain drop-shadow-2xl"
                />
              </div>

              <p className="text-center text-gray-300 font-semibold text-xl md:text-2xl">
                💻 Sends malicious input
              </p>
            </div>

            {/* Middle — login form */}
            <div
              className="flex flex-col items-center space-y-4 relative"
              onMouseEnter={() => setHoveredElement('form')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <img
                src={form}
                alt="Login Form"
                className="w-64 h-64 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-110"
              />

              {hoveredElement === 'form' && (
                <div className="absolute -bottom-8 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-lg md:text-xl animate-bounce">
                  ⚠️ Vulnerable entry point
                </div>
              )}

              {/* Arrow pointing down with animation */}
              <div className="flex flex-col items-center mt-8">
                <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-transparent animate-pulse"></div>
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-500 animate-bounce"></div>
              </div>
            </div>

            {/* Right side — database */}
            <div
              className="flex flex-col items-center space-y-4"
              onMouseEnter={() => setHoveredElement('database')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
                DATABASE
              </h3>

              <div className="relative">
                <img
                  src={database}
                  alt="Database"
                  className="w-48 h-48 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-110"
                />

                {hoveredElement === 'database' && (
                  <div className="absolute inset-0 border-4 border-red-500 rounded-lg animate-pulse"></div>
                )}
              </div>

              <div className="text-center space-y-2 text-red-300 font-mono text-lg md:text-xl">
                <p>🔓 All passwords</p>
                <p>👤 All usernames</p>
              </div>
            </div>
          </div>

          {/* ---------- EXPLANATION BOX ---------- */}
          <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-8 mb-8">
            <p className="text-gray-300 leading-relaxed text-xl md:text-2xl">
              SQL injection (SQLi) is a web security vulnerability that allows
              an attacker to interfere with the queries that an application
              makes to its database. This can allow an attacker to view data
              that they are not normally able to retrieve.
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button 
              onClick={handleContinueToTraining}
              className="group relative px-10 py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold text-xl md:text-2xl rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue to Training →
              </span>
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SQLiLvl1;