import React, { useState, useEffect } from 'react';
import bgimage from '../../assets/sqlpagebg2.png'
import { motion, AnimatePresence } from 'framer-motion';
import frame1 from '../../assets/treasure/frame1.png'
import frame2 from '../../assets/treasure/frame2.png'
import frame3 from '../../assets/treasure/frame3.png'
import frame4 from '../../assets/treasure/frame4.png'
import frame5 from '../../assets/treasure/frame5.png'
import frame6 from '../../assets/treasure/frame6.png'
import frame7 from '../../assets/treasure/frame7.png'
import './Sqlpage2.css';

const Sqlpage2 = () => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const text = "You are the mighty lion";
    
    // Treasure chest frames with their respective images
    const frames = [frame1, frame2, frame3, frame4, frame5, frame6, frame7];

    useEffect(() => {
        // Auto-start the treasure animation after text completes
        const textDuration = text.split('').length * 100; // 100ms per character
        
        const animationSequence = setTimeout(() => {
            // Frame 1 appears immediately after text
            setCurrentFrame(1);
            
            // Frame 1 -> 2: 500ms delay
            setTimeout(() => setCurrentFrame(2), 500);
            
            // Frame 2 -> 3: 200ms delay
            setTimeout(() => setCurrentFrame(3), 700);
            
            // Frame 3 -> 4: 500ms delay
            setTimeout(() => setCurrentFrame(4), 1200);
            
            // Frame 4 -> 5: 500ms delay
            setTimeout(() => setCurrentFrame(5), 1700);
            
            // Frame 5 -> 6: 500ms delay
            setTimeout(() => setCurrentFrame(6), 2200);
            
            // Frame 6 -> 7: 500ms delay
            setTimeout(() => setCurrentFrame(7), 2700);
        }, textDuration + 500);

        return () => clearTimeout(animationSequence);
    }, []);

    return (
        <div 
            className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${bgimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Text Animation - "You are the mighty lion" */}
            <div className="absolute top-32 text-center">
                <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
                    {text.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </h1>
            </div>

            {/* Treasure Chest Animation - Center but slightly right */}
            <div className="relative flex items-center justify-center w-full h-full">
                <div className="relative ml-20">
                    {/* Container for smoother transitions */}
                    <div className="relative w-80 h-80 treasure-frame-container">
                        <AnimatePresence mode="sync">
                            {currentFrame > 0 && (
                                <motion.div
                                    key={currentFrame}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ 
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <img 
                                        src={frames[currentFrame - 1]} 
                                        alt={`Treasure frame ${currentFrame}`}
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                        style={{ 
                                            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                                            imageRendering: 'crisp-edges',
                                            WebkitBackfaceVisibility: 'hidden',
                                            isolation: 'isolate'
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* Glow effect for frames 4-7 (when treasures appear) */}
                        {currentFrame >= 4 && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <motion.div
                                    className="w-96 h-96 rounded-full bg-yellow-400 blur-3xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.7, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Sparkle particles for final frame */}
                    {currentFrame === 7 && (
                        <>
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                        x: Math.cos((i * Math.PI * 2) / 8) * 100,
                                        y: Math.sin((i * Math.PI * 2) / 8) * 100,
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        delay: 0.2 + i * 0.1,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sqlpage2;