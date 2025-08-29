// src/pages/QuizHomePage.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/z69i_kxes_211202.jpg";
import soundFile from "../assets/jungle-sound-effect-249042.mp3";
import quizService from "../store/useQuizService.js";
import RainCanvas from "../components/RainCanvas.jsx";
import Lottie from "lottie-react";
import monkey from "../assets/monkey.json";
import tiger from "../assets/tiger.json";

// Use this stage to gate (same as your navigation target)
const TARGET_DIFFICULTY = "Easy";
const TARGET_LEVEL = 1;

// KEEP ORDER — unlocks in this order
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

const QuizHomePage = () => {
  const navigate = useNavigate();

  // DB-backed lock state: statusByCat[cat] = { available, completed }
  const [statusByCat, setStatusByCat] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // 🔊 Jungle sounds
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Fetch per-category status from backend on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          CATEGORIES.map(c => quizService.getCategoryStatus(c.value))
        );
        if (cancelled) return;

        const map = {};
        results.forEach((res, idx) => {
          const seg = res?.segments?.find(
            s => s.difficulty === TARGET_DIFFICULTY && Number(s.level) === TARGET_LEVEL
          );
          const available = !!seg && (seg.total || 0) > 0;
          const completed = !!seg?.completed;
          map[CATEGORIES[idx].value] = { available, completed };
        });
        setStatusByCat(map);
      } catch (e) {
        console.error("Failed to load category statuses:", e);
        setStatusByCat({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // 🔊 Try autoplay on mount (may be blocked until user interaction)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    const promise = audio.play();
    if (promise && typeof promise.then === "function") {
      promise.catch(() => {
        // Autoplay blocked — show button as "off"
        setIsPlaying(false);
      });
    }
    return () => {
      audio.pause();
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  // Unlock ONLY the first category (by order) that has questions and is not completed
  const unlockIndex = useMemo(() => {
    for (let i = 0; i < CATEGORIES.length; i++) {
      const st = statusByCat[CATEGORIES[i].value];
      if (st?.available && !st?.completed) return i;
    }
    return -1; // nothing to unlock (maybe all done)
  }, [statusByCat]);

  // DO NOT change navigation — same route as before
  const handleCategoryClick = (categoryValue, index) => {
    const st = statusByCat[categoryValue];
    const isUnlocked = index === unlockIndex && st?.available && !st?.completed && !loading;
    if (!isUnlocked) return;
    navigate(`/quiz/${encodeURIComponent(categoryValue)}/Easy/1`);
  };

  // ----- UI helpers (your map layout) -----
  const getPathPosition = (index) => {
    const positions = [
      { x: 20, y: 90, rotation: 0 },
      { x: 35, y: 83, rotation: 10 },
      { x: 50, y: 75, rotation: -10 },
      { x: 65, y: 68, rotation: 15 },
      { x: 40, y: 60, rotation: -20 },
      { x: 25, y: 52, rotation: 25 },
      { x: 70, y: 45, rotation: -15 },
      { x: 55, y: 37, rotation: 20 },
      { x: 30, y: 30, rotation: -25 },
      { x: 75, y: 23, rotation: 10 },
      { x: 50, y: 13, rotation: 0 }, // Temple/top
    ];
    return positions[index] || { x: 50, y: 50, rotation: 0 };
  };

  const getCategoryStyle = (category, index, isHovered) => {
    const position = getPathPosition(index);
    return {
      position: 'absolute',
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: `translate(-50%, -50%) rotate(${position.rotation}deg) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: isHovered ? 20 : 10,
    };
  };

  const PathLine = ({ from, to }) => {
    const fromPos = getPathPosition(from);
    const toPos = getPathPosition(to);
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id={`jungle-path-${from}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5a3c" />
            <stop offset="50%" stopColor="#a0522d" />
            <stop offset="100%" stopColor="#8b5a3c" />
          </linearGradient>
        </defs>
        <line
          x1={`${fromPos.x}%`} y1={`${fromPos.y}%`}
          x2={`${toPos.x}%`} y2={`${toPos.y}%`}
          stroke={`url(#jungle-path-${from})`}
          strokeWidth="10"
          strokeDasharray="16,10"
          className="transition-all duration-500"
          opacity="0.8"
        />
      </svg>
    );
  };

  const getJungleElements = () => ([
    { type: 'tree', x: 10, y: 60, size: 'large', emoji: '🌳' },
    { type: 'tree', x: 85, y: 70, size: 'medium', emoji: '🌲' },
    { type: 'bush', x: 15, y: 30, size: 'small', emoji: '🌿' },
    { type: 'tree', x: 90, y: 45, size: 'large', emoji: '🌴' },
    { type: 'rock', x: 5, y: 80, size: 'medium', emoji: '🪨' },
    { type: 'bush', x: 80, y: 85, size: 'small', emoji: '🍃' },
    { type: 'vine', x: 60, y: 20, size: 'medium', emoji: '🌱' },
    { type: 'flower', x: 20, y: 15, size: 'small', emoji: '🌺' },
    { type: 'tree', x: 85, y: 25, size: 'medium', emoji: '🌳' },
    { type: 'rock', x: 10, y: 45, size: 'small', emoji: '🗿' },
  ]);

  return (
    <div className="home-page">
      {/* 🔊 Audio element */}
      <audio ref={audioRef} src={soundFile} loop preload="auto" />

      <div className="w-full">
        {/* Jungle Map Container */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${bg})`, zIndex: 0 }}
          />
          {/* Overlay for contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(16,65,35,0.55), rgba(6,78,59,0.55))', zIndex: 0 }}
          />
          {/* 🌧️ Rain overlay */}
          <RainCanvas intensity={1.1} speed={1} angle={20} opacity={0.55} zIndex={1} />

          {/* 🐒 Monkey (top-right, comfy padding, responsive size) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "1.25rem",
              right: "1.25rem",
              zIndex: 2,
              width: "clamp(96px, 10vw, 160px)",
              height: "clamp(96px, 10vw, 160px)",
            }}
          >
            <Lottie animationData={monkey} loop autoplay />
          </div>

          {/* 🐯 Tiger (bottom-left, comfy padding, responsive size) */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "1.25rem",
              left: "1.25rem",
              zIndex: 2,
              width: "clamp(112px, 12vw, 180px)",
              height: "clamp(112px, 12vw, 180px)",
            }}
          >
            <Lottie animationData={tiger} loop autoplay />
          </div>

          {/* Foliage */}
          {getJungleElements().map((el, i) => (
            <div
              key={i}
              className="absolute transform transition-transform hover:scale-110"
              style={{ left: `${el.x}%`, top: `${el.y}%`, transform: 'translate(-50%, -50%)', zIndex: 2 }}
            >
              <div className={`${el.size === 'large' ? 'text-6xl' : el.size === 'medium' ? 'text-4xl' : 'text-2xl'} opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-default filter drop-shadow-lg`}>
                {el.emoji}
              </div>
            </div>
          ))}

          {/* Paths */}
          {CATEGORIES.map((category, index) =>
            index < CATEGORIES.length - 1 ? (
              <PathLine key={`path-${index}`} from={index} to={index + 1} />
            ) : null
          )}

          {/* Stations */}
          {CATEGORIES.map((category, index) => {
            const isHovered = hoveredCategory === category.value;
            const st = statusByCat[category.value] || { available: false, completed: false };

            const isUnlocked = !loading && index === unlockIndex && st.available && !st.completed;
            const isCompleted = st.completed;
            const isTemple = index === CATEGORIES.length - 1;

            return (
              <div
                key={category.value}
                style={getCategoryStyle(category, index, isHovered)}
                className="group"
              >
                <button
                  onClick={() => handleCategoryClick(category.value, index)}
                  onMouseEnter={() => setHoveredCategory(category.value)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  disabled={!isUnlocked}
                  className={`
                    relative rounded-full font-bold transition-all duration-300 shadow-xl
                    ${isTemple ? 'w-32 h-32 text-2xl' : 'w-24 h-24 text-lg'}
                    ${isUnlocked
                      ? 'bg-gradient-to-br from-amber-600 via-yellow-500 to-orange-600 text-white border-4 border-yellow-300 hover:from-amber-500 hover:via-yellow-400 hover:to-orange-500 hover:border-yellow-200'
                      : isCompleted
                        ? 'bg-zinc-500/50 text-white/70 border-4 border-zinc-300 cursor-not-allowed grayscale'
                        : 'bg-zinc-700/50 text-white/70 border-4 border-zinc-500 cursor-not-allowed opacity-70'
                    }
                    ${isUnlocked && isHovered ? 'shadow-2xl transform rotate-0' : ''}
                    ${isTemple && isUnlocked ? 'border-purple-400 bg-gradient-to-br from-purple-600 via-pink-500 to-red-600 shadow-purple-500/50' : ''}
                  `}
                  style={{ zIndex: 3 }}
                  title={
                    loading ? "Loading…" :
                    isUnlocked ? "Click to start" :
                    isCompleted ? "Completed ✅" :
                    st.available ? "🔒 Locked — finish the previous" : "Unavailable"
                  }
                >
                  <div className={`${isTemple ? 'text-4xl' : 'text-2xl'} mb-1 filter drop-shadow-lg`}>
                    {isCompleted ? '🔒' : (isUnlocked ? (isTemple ? '🏛️' : '🗺️') : '🔒')}
                  </div>

                  {/* Completed veil */}
                  {isCompleted && (
                    <div className="absolute inset-0 rounded-full bg-black/35 grid place-items-center text-yellow-100 text-xs font-bold">
                      COMPLETED
                    </div>
                  )}

                  {/* Jungle vines decoration (only when unlocked) */}
                  {isUnlocked && (
                    <>
                      <div className="absolute -top-2 -left-2 text-green-400 text-xl opacity-70 pointer-events-none">🌿</div>
                      <div className="absolute -bottom-2 -right-2 text-green-500 text-lg opacity-60 pointer-events-none">🍃</div>
                    </>
                  )}
                </button>

                {/* Tooltip */}
                <div className={`
                  absolute top-full mt-6 left-1/2 transform -translate-x-1/2 
                  ${
                    isCompleted
                      ? 'bg-zinc-800/90 text-zinc-200 border-zinc-500'
                      : isUnlocked
                        ? 'bg-green-900 bg-opacity-90 text-yellow-300 border-yellow-600'
                        : 'bg-zinc-800/90 text-zinc-200 border-zinc-500'
                  }
                  px-4 py-3 rounded-xl text-sm font-medium
                  opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none
                  whitespace-nowrap z-30 border-2
                `}>
                  <div className="text-center">
                    <div className="font-bold text-lg">{category.label}</div>
                    <div className="text-xs mt-1">
                      {
                        isCompleted ? "✅ Segment completed"
                        : isUnlocked ? "🎯 Click to start adventure"
                        : st.available ? "🔒 Locked — finish the previous" : "Unavailable"
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Jungle Map Title */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-500 to-emerald-600 text-center">
              🌿 Security Quest 🌿
            </h1>
            <p className="text-center text-green-200 mt-2 text-lg font-medium">
              Navigate the cybersecurity jungle and master each challenge!
            </p>
          </div>

          {/* 🔊 Sound control button */}
          <button
            onClick={toggleSound}
            className="absolute bottom-8 right-8 bg-green-800 bg-opacity-70 rounded-xl p-4 backdrop-blur-sm border-2 border-green-600 hover:bg-green-700 transition-colors duration-300 cursor-pointer"
            style={{ zIndex: 3 }}
            aria-label={isPlaying ? 'Mute sounds' : 'Unmute sounds'}
          >
            {isPlaying ? (
              <div className="text-center">
                <div className="text-2xl mb-2">🔊</div>
                <div className="text-green-300 text-sm font-bold">Sounds On</div>
                <div className="text-xs text-green-400 mt-1">Click to mute</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl mb-2">🔇</div>
                <div className="text-red-300 text-sm font-bold">Sounds Off</div>
                <div className="text-xs text-gray-400 mt-1">Click to play</div>
              </div>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes sway { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
        @keyframes prowl {
          0%{transform:translateX(0) scaleX(1);opacity:.8}
          25%{transform:translateX(30px) scaleX(1);opacity:.9}
          50%{transform:translateX(60px) scaleX(-1);opacity:.8}
          75%{transform:translateX(30px) scaleX(-1);opacity:.9}
          100%{transform:translateX(0) scaleX(1);opacity:.8}
        }
        .animate-prowl { animation: prowl 8s ease-in-out infinite; }
        @keyframes tiger-roam {
          0%{transform:translateY(0) rotate(0);filter:brightness(1)}
          25%{transform:translateY(-15px) rotate(5deg);filter:brightness(1.2)}
          50%{transform:translateY(-30px) rotate(0);filter:brightness(1.1)}
          75%{transform:translateY(-15px) rotate(-5deg);filter:brightness(1.2)}
          100%{transform:translateY(0) rotate(0);filter:brightness(1)}
        }
        .animate-tiger-roam { animation: tiger-roam 6s ease-in-out infinite; animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default QuizHomePage;
