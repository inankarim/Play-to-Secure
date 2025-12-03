import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/idorfrontdiv/bg-img2.png'
import read from '../../assets/please.mp3'

const Idorpage2 = () => {
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

   useEffect(() => {
    const audio = new Audio(read);
    audio.volume = 0.6;

    const timer = setTimeout(() => {
        audio.play().catch(() => {});
    }, 300);

    return () => clearTimeout(timer); // cleanup when component unmounts
}, []);


    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    const bounceVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200
            }
        }
    };

    const floatAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const shakeAnimation = {
        rotate: [0, -5, 5, -5, 5, 0],
        transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
        }
    };

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden p-2 md:p-4 lg:p-6" 
             style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
             }}>
            <link href="https://fonts.googleapis.com/css2?family=Emilys+Candy&family=Henny+Penny&family=Jersey+25&display=swap" rel="stylesheet"></link>
           
            {/* Main Content Box */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-[98%] md:w-[92%] lg:w-[85%] xl:w-[80%] max-h-[96vh] flex flex-col"
            >
                {/* Header with Wolf Character */}
                <motion.div 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    className="bg-gradient-to-r from-[#1a4d5c] to-[#2a6d7c] px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-t-3xl flex items-center gap-3 md:gap-4 lg:gap-6 border-[3px] border-[#4a9db5] flex-shrink-0"
                >
                    <motion.div 
                        animate={floatAnimation}
                        className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#6ba8c4] rounded-xl flex items-center justify-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl flex-shrink-0"
                    >
                        🐺
                    </motion.div>
                    <motion.h1 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white m-0" 
                        style={{ fontFamily: "'Henny Penny', cursive" }}
                    >
                        The Big Wolf's Confession
                    </motion.h1>
                </motion.div>

                {/* Story Content */}
                <div className="bg-[#f5f0d8] px-4 md:px-6 lg:px-10 xl:px-12 py-3 md:py-4 lg:py-5 rounded-b-3xl border-[3px] border-t-0 border-[#4a9db5] flex-1 flex flex-col justify-start overflow-y-auto">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-1 md:space-y-2 lg:space-y-2 flex-1"
                    >
                        <motion.p 
                            variants={textVariants}
                            className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center leading-snug text-[#2d2d2d] m-0" 
                            style={{ fontFamily: "'Emilys Candy', cursive" }}
                        >
                            "Let me tell you how I became the RICHEST fox in the forest! <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>🦊</motion.span><motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}>✨</motion.span>
                        </motion.p>

                        <motion.p 
                            variants={textVariants}
                            className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center leading-snug text-[#2d2d2d] m-0" 
                            style={{ fontFamily: "'Emilys Candy', cursive" }}
                        >
                            "I discovered a treasure vault <motion.span className="font-bold" animate={{ color: ['#2d2d2d', '#d4a574', '#2d2d2d'] }} transition={{ duration: 2, repeat: Infinity }}>API</motion.span> at https://forest-bank.com/api/treasure?id=123
                        </motion.p>

                        <motion.p 
                            variants={textVariants}
                            className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl  text-center leading-snug text-[#2d2d2d] m-0" 
                            style={{ fontFamily: "'Emilys Candy', cursive" }}
                        >
                            "But here's the thing... they only checked <motion.span className="font-bold" whileHover={{ scale: 1.2, color: "#ff6b6b" }}>IF</motion.span> you were logged in, not <motion.span className="font-bold" whileHover={{ scale: 1.2, color: "#ff6b6b" }}>WHO</motion.span> you were!
                        </motion.p>

                        <motion.p 
                            variants={textVariants}
                            className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center leading-snug text-[#2d2d2d] m-0" 
                            style={{ fontFamily: "'Emilys Candy', cursive" }}
                        >
                            "So I simply changed the <motion.span className="font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>ID</motion.span>: id=124, id=125, id=126... and BOOM! <motion.span animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>💥</motion.span> Every animal's treasure became MINE!
                        </motion.p>

                        <motion.p 
                            variants={textVariants}
                            className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center leading-snug text-[#2d2d2d] m-0" 
                            style={{ fontFamily: "'Emilys Candy', cursive" }}
                        >
                            "This, my friend, <span className="bg-[#d4a574] px-2 py-1 rounded">is called</span> an <motion.span className="font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>IDOR attack</motion.span> - Insecure Direct Object Reference! <motion.span animate={{ rotate: [0, -20, 20, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}>🎯</motion.span>"
                        </motion.p>

                        <motion.p 
                            variants={textVariants}
                            className="text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl  leading-snug text-[#2d2d2d] italic m-0" 
                            style={{ fontFamily: "'Emilys Candy', cursive" }}
                        >
                            "I manipulated the 'id' parameter to access treasures that weren't mine. The API trusted the ID I sent without checking if I had permission! Rookie mistake! <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}>🤦</motion.span>"
                        </motion.p>

                        {/* Vulnerability Box */}
                        <motion.div 
                            variants={bounceVariants}
                            className="bg-white border-[3px] border-[#4a9db5] rounded-2xl p-3 md:p-4 lg:p-5 my-2"
                        >
                            <motion.h2 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 150, delay: 1.5 }}
                                className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#2a6d7c] m-0 mb-2 md:mb-3 text-center" 
                                style={{ fontFamily: "'Henny Penny', cursive" }}
                            >
                                The IDOR Vulnerability
                            </motion.h2>

                            <motion.div 
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.7 }}
                                className="bg-[#ffe6e6] p-2 md:p-3 lg:p-4 rounded-xl border-2 border-[#ff6b6b]"
                            >
                                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                                    <motion.span 
                                        animate={shakeAnimation}
                                        className="text-2xl md:text-4xl lg:text-5xl"
                                    >
                                        ❌
                                    </motion.span>
                                    <motion.span 
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#c92a2a]" 
                                        style={{ fontFamily: "'Emilys Candy', cursive" }}
                                    >
                                        BAD CODE:
                                    </motion.span>
                                </div>
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                    className="bg-[#2d2d2d] text-[#00ff00] p-2 md:p-3 lg:p-4 rounded-lg font-mono text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl relative"
                                >
                                    <motion.div 
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute top-1 md:top-2 right-2 md:right-3 bg-[#4a9db5] text-white px-1.5 md:px-2 lg:px-3 py-0.5 md:py-1 rounded text-sm md:text-base font-bold"
                                    >
                                        441 × 57
                                    </motion.div>
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 2.2 }} className="mb-0.5 md:mb-1">GET /api/treasure?id=123</motion.div>
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 2.4 }} className="text-[#888] mb-0.5 md:mb-1">// Only checks: Is user logged in?</motion.div>
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 2.6 }} className="text-[#ff6b6b] mb-0.5 md:mb-1">// NEVER checks: Does user OWN treasure 123?</motion.div>
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 2.8 }}>→ Returns treasure data</motion.div>
                                </motion.div>
                            </motion.div>

                            <motion.p 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 3 }}
                                className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-[#2d2d2d] mt-2 md:mt-3 text-center italic m-0" 
                                style={{ fontFamily: "'Emilys Candy', cursive" }}
                            >
                                "I just incremented the ID and stole EVERYTHING!"
                            </motion.p>
                        </motion.div>

                        {/* Bottom Message */}
                        <motion.div 
                            variants={bounceVariants}
                            className="bg-[#d4a574] p-2 md:p-3 lg:p-4 rounded-2xl my-2"
                        >
                            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-snug text-[#2d2d2d] m-0" 
                               style={{ fontFamily: "'Emilys Candy', cursive" }}
                            >
                                But those clever forest guardians created <motion.span className="font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>5 MAGICAL MITIGATIONS</motion.span> to protect treasures from wolves like me! I've hidden them across this enchanted forest...
                            </p>
                        </motion.div>

                        <motion.p 
                            variants={textVariants}
                            className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-[#2d2d2d] text-center m-0 mt-1 md:mt-2" 
                            style={{ fontFamily: "'Emilys Candy', cursive" }}
                        >
                            Can YOU find all 5 treasures and learn how to stop IDOR attacks <motion.span animate={{ scale: [1, 1.3, 1], rotate: [0, 20, -20, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">❓</motion.span>
                        </motion.p>
                    </motion.div>

                    {/* Start Button */}
                    <motion.button
                        onClick={() => navigate('/level2/idorpage3')}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 3.5, type: "spring", stiffness: 150 }}
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 md:py-4 lg:py-5 xl:py-6 bg-gradient-to-b from-[#a8e6cf] to-[#7fd3b5] border-[3px] border-[#4a9db5] rounded-2xl text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#2d2d2d] cursor-pointer shadow-lg mt-2 md:mt-3 flex-shrink-0"
                        style={{ fontFamily: "'Henny Penny', cursive" }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Start the Treasure Hunt
                        </motion.span>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Idorpage2;