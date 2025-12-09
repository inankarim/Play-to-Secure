import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import crownBg from '../../assets/idorfrontdiv/animation/bgimage/crown.png';

const Idorpage9 = () => {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(true);

    // Navigate back to Idorpage3
    const handleBackToQuest = () => {
        navigate('/level2/idorquizPage');
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
                        className="text-left mb-8"
                        style={{
                            fontFamily: "'Cinzel Decorative', cursive",
                            color: softWhite,
                            textShadow,
                            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                            fontWeight: 'bold'
                        }}
                    >
                        Token Validator
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-left mb-10"
                        style={{
                            fontFamily: "'Philosopher', sans-serif",
                            color: softWhite,
                            textShadow,
                            fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                            fontWeight: 'bold'
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
                        className="mb-6"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#88c0ff",
                            textShadow,
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 'bold'
                        }}
                    >
                        📋 How It Works:
                    </h2>

                    <p
                        className="leading-relaxed"
                        style={{
                            fontFamily: "'Philosopher', sans-serif",
                            color: softWhite,
                            textShadow,
                            fontSize: 'clamp(1.125rem, 2.5vw, 2rem)',
                            fontWeight: 'bold'
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
                        className="mb-6"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#7fffa8",
                            textShadow,
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 'bold'
                        }}
                    >
                        🛡️ Attack Prevented:
                    </h2>

                    <p
                        className="leading-relaxed"
                        style={{
                            fontFamily: "'Philosopher', sans-serif",
                            color: softWhite,
                            textShadow,
                            fontSize: 'clamp(1.125rem, 2.5vw, 2rem)',
                            fontWeight: 'bold'
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
                        className="mb-6"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#ff7f7f",
                            textShadow,
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 'bold'
                        }}
                    >
                        ⚔️ BAD: Trusting URL Parameters
                    </h2>

                    <div
                        className="p-8 rounded-lg border-4 font-mono shadow-2xl mb-8 text-left overflow-x-auto"
                        style={{
                            backgroundColor: "rgba(255,0,0,0.08)",
                            borderColor: "#ff7f7f",
                            color: "#ffbcbc",
                            textShadow,
                            fontSize: 'clamp(0.875rem, 1.5vw, 1.5rem)'
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
                        className="mb-6"
                        style={{
                            fontFamily: "'Cinzel', serif",
                            color: "#7fffa8",
                            textShadow,
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 'bold'
                        }}
                    >
                        💻 GOOD: Token-Based Authorization
                    </h2>

                    <div
                        className="p-8 rounded-lg border-4 font-mono shadow-2xl text-left overflow-x-auto"
                        style={{
                            backgroundColor: "rgba(0, 50, 0, 0.35)",
                            borderColor: "#7fffa8",
                            color: "#c8ffdd",
                            textShadow,
                            fontSize: 'clamp(0.875rem, 1.5vw, 1.5rem)'
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
            {/* Background Image with increased brightness */}
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${crownBg})`,
                    filter: 'brightness(1.5)'
                }}
            ></div>

            {/* Lighter Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>

            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full min-h-screen flex items-start justify-center p-8"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(20,20,20,0.75) 0%, rgba(0,0,0,0.85) 100%)"
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
                                    className="px-12 py-6 text-white rounded-lg shadow-2xl transition-all duration-300 border-4 hover:scale-105"
                                    style={{
                                        fontFamily: "'Cinzel', serif",
                                        background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                                        borderColor: "#06b6d4",
                                        textShadow,
                                        fontSize: 'clamp(1.25rem, 2vw, 2rem)',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Continue Your Quest →
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