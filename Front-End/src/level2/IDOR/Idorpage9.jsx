import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import bg from '../../assets/idorfrontdiv/animation/bgimage/diamond.mp4';
import audio from '../../assets/idorfrontdiv/animation/bgimage/shimmering.mp3';

const Idorpage9 = () => {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(true);
    const audioRef = useRef(null);
    const videoRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
        if (audioRef.current) {
            try {
                audioRef.current.currentTime = 0;
                audioRef.current.volume = 0.5;
                await audioRef.current.play();
                setIsMusicPlaying(true);
            } catch (error) {
                setIsMusicPlaying(false);
            }
        }
    };

    playAudio();

    const stopTimer = setTimeout(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsMusicPlaying(false);
        }
    }, 35000);

    return () => {
        clearTimeout(stopTimer);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
}, []);

    const handleVideoEnd = () => {
        setTimeout(() => setShowContent(true), 300);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
                setIsMusicPlaying(false);
            } else {
                audioRef.current.play().catch(() => {});
                setIsMusicPlaying(true);
            }
        }
    };

    // Navigate back to Idorpage3
    const handleBackToQuest = () => {
        navigate('/level2/idorpage3');
    };

    const softWhite = "#f2f2f2";
    const textShadow = "2px 2px 6px rgba(0,0,0,0.9)";

    const contentSections = [
        {
            delay: 0,
            content: (
                <>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold mb-8 text-left"
                        style={{
                            fontFamily: "'Cinzel Decorative', cursive",
                            color: softWhite,
                            textShadow
                        }}
                    >
                        Token Validator
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-2xl md:text-4xl mb-10 font-bold text-left"
                        style={{
                            fontFamily: "'Philosopher', sans-serif",
                            color: softWhite,
                            textShadow
                        }}
                    >
                        Ensure user IDs come from secure tokens — not from URL parameters
                    </motion.p>
                </>
            )
        },

        {
            delay: 1.4,
            content: (
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 text-left"
                >
                    <h2
                        className="text-4xl md:text-6xl mb-6 font-bold"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#88c0ff",
                            textShadow
                        }}
                    >
                        📋 How It Works:
                    </h2>

                    <p
                        className="text-xl md:text-3xl leading-relaxed font-bold"
                        style={{
                            fontFamily: "'Philosopher', sans-serif",
                            color: softWhite,
                            textShadow
                        }}
                    >
                        Tokens contain authenticated user information like
                        <span style={{ color: "#9ae6ff" }}> userId </span>,
                        so your backend should read that value instead of trusting
                        <span style={{ color: "#ff9a9a" }}> parameters from the URL.</span>
                    </p>
                </motion.div>
            )
        },

        {
            delay: 2.8,
            content: (
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 text-left"
                >
                    <h2
                        className="text-4xl md:text-6xl mb-6 font-bold"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#7fffa8",
                            textShadow
                        }}
                    >
                        🛡️ Attack Prevented:
                    </h2>

                    <p
                        className="text-xl md:text-3xl leading-relaxed font-bold"
                        style={{
                            fontFamily: "'Philosopher', sans-serif",
                            color: softWhite,
                            textShadow
                        }}
                    >
                        <span style={{ color: "#7fffa8" }}>
                            ✔ Prevents IDOR by verifying the ID inside the token instead of URL parameters.
                        </span>
                    </p>
                </motion.div>
            )
        },

        {
            delay: 4.2,
            content: (
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 text-left"
                >
                    {/* BAD CODE */}
                    <h2
                        className="text-4xl md:text-6xl mb-6 font-bold"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#ff7f7f",
                            textShadow
                        }}
                    >
                        ⚔️ BAD: Trusting URL Parameters
                    </h2>

                    <div
                        className="p-8 rounded-lg border-4 font-mono text-lg md:text-2xl shadow-2xl mb-8"
                        style={{
                            backgroundColor: "rgba(255,0,0,0.08)",
                            borderColor: "#ff7f7f",
                            color: "#ffbcbc",
                            textShadow
                        }}
                    >
                        <pre>{`// ❌ WRONG — Never trust user-controlled URL params
app.get('/api/reviews/:id', (req, res) => {
    const review = getReview(req.params.id);
    res.json(review);
});`}</pre>
                    </div>

                    {/* GOOD CODE */}
                    <h2
                        className="text-4xl md:text-6xl mb-6 font-bold"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#7fffa8",
                            textShadow
                        }}
                    >
                        💻 GOOD: Token-Based Authorization
                    </h2>

                    <div
                        className="p-8 rounded-lg border-4 font-mono text-lg md:text-2xl shadow-2xl"
                        style={{
                            backgroundColor: "rgba(0, 50, 0, 0.35)",
                            borderColor: "#7fffa8",
                            color: "#c8ffdd",
                            textShadow
                        }}
                    >
                        <pre>{`// ✅ CORRECT — Validate using token's user ID
app.get('/api/reviews/:id', authenticate, (req, res) => {
    const review = getReview(req.params.id);

    if (review.userId !== req.user.id) {
        return res.status(403).send();
    }

    res.json(review);
});`}</pre>
                    </div>
                </motion.div>
            )
        }
    ];

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-black">

            <audio ref={audioRef} src={audio} loop preload="auto" />

            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={toggleMusic}
                className="fixed top-6 right-6 z-[100] p-4 rounded-full border-4 shadow-2xl hover:scale-110 transition-all duration-300"
                style={{
                    background: "#222",
                    borderColor: "#88c0ff",
                    color: softWhite
                }}
            >
                {isMusicPlaying ? "🔊" : "🔇"}
            </motion.button>

            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
            >
                <source src={bg} type="video/mp4" />
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full min-h-screen flex items-start justify-center p-8"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(20,20,20,0.85) 0%, rgba(0,0,0,0.95) 100%)"
                        }}
                    >
                        <div className="max-w-6xl w-full">
                            {contentSections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: section.delay }}
                                >
                                    {section.content}
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 5.6 }}
                                className="flex justify-center mt-16"
                            >
                                <button
                                    onClick={handleBackToQuest}
                                    className="px-12 py-6 text-white text-3xl font-bold rounded-lg shadow-2xl transition-all duration-300 border-4 hover:scale-105"
                                    style={{
                                        fontFamily: "'Cinzel', serif",
                                        background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                                        borderColor: "#06b6d4",
                                        textShadow
                                    }}
                                >
                                    🗺️ Return to Quest
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <link
                href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@700;900&family=Philosopher:wght@700&family=Courier+Prime:wght@700&display=swap"
                rel="stylesheet"
            />
        </div>
    );
};

export default Idorpage9;