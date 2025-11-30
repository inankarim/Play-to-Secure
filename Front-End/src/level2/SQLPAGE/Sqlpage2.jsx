import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgimage from '../../assets/sqlpagebg2.png'
import topbanner from '../../assets/banner.png'
import { motion } from 'framer-motion';
import frame1 from '../../assets/treasure/frame1.png'
import frame2 from '../../assets/treasure/frame2.png'
import frame3 from '../../assets/treasure/frame3.png'
import frame4 from '../../assets/treasure/frame4.png'
import frame5 from '../../assets/treasure/frame5.png'
import frame6 from '../../assets/treasure/frame6.png'
import frame7 from '../../assets/treasure/frame7.png'
import Sframe1 from '../../assets/scroll/Sframe1.png'
import Sframe2 from '../../assets/scroll/Sframe2.png'
import Sframe3 from '../../assets/scroll/Sframe3.png'
import Sframe4 from '../../assets/scroll/Sframe4.png'
import icon from '../../assets/short icons/icon.png'

const Sqlpage2 = () => {
    const navigate = useNavigate();
    const [currentFrame, setCurrentFrame] = useState(0);
    const [currentScrollFrame, setCurrentScrollFrame] = useState(0);
    const text = "You are the mighty lion";
    
    const frames = [frame1, frame2, frame3, frame4, frame5, frame6, frame7];
    const scrollFrames = [Sframe1, Sframe2, Sframe3, Sframe4];

    useEffect(() => {
        const textDuration = text.split('').length * 100;
        
        const animationSequence = setTimeout(() => {
            // Treasure chest animation (7 frames over 2700ms)
            setCurrentFrame(1);
            setTimeout(() => setCurrentFrame(2), 500);
            setTimeout(() => setCurrentFrame(3), 700);
            setTimeout(() => setCurrentFrame(4), 1200);
            setTimeout(() => setCurrentFrame(5), 1700);
            setTimeout(() => setCurrentFrame(6), 2200);
            setTimeout(() => setCurrentFrame(7), 2700);

            // Scroll animation (4 frames over 2700ms) - evenly distributed
            setCurrentScrollFrame(1);
            setTimeout(() => setCurrentScrollFrame(2), 900);   // 2700/3 = 900ms intervals
            setTimeout(() => setCurrentScrollFrame(3), 1800);
            setTimeout(() => setCurrentScrollFrame(4), 2700);
        }, textDuration + 500);

        return () => clearTimeout(animationSequence);
    }, []);

    const handleEnterCave = () => {
        navigate('/level2/sqlpage3');
    };

    return (
        <div 
            className="min-h-screen relative flex flex-col items-center overflow-hidden"
            style={{
                backgroundImage: `url(${bgimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Google Font Link */}
            <link href="https://fonts.googleapis.com/css2?family=IM+Fell+Great+Primer+SC&display=swap" rel="stylesheet" />
            
            {/* Top Banner Section */}
            <div className="absolute top-0 left-0 right-0 flex flex-col items-center z-10 pt-8">
                {/* Top Banner Image */}
                <div className="mb-0s">
                    <img 
                        src={topbanner} 
                        alt="Top Banner"
                        className="w-full h-auto object-contain"
                    />
                </div>
                
                {/* The Lions Cave Heading */}
                <div className="bg-[#5a1a1a] px-44 py-10 rounded-lg border-2 border-[#8b4513] shadow-2xl">
                    <h1 
                        className="text-6xl text-[#f5deb3] tracking-wider"
                        style={{ fontFamily: "'IM Fell Great Primer SC', serif" }}
                    >
                        {"The Lions Cave".split('').map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </h1>
                </div>
            </div>
            {/* SVG Filter - Softer background removal */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="remove-bg" colorInterpolationFilters="sRGB">
                        <feComponentTransfer>
                            <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1 1 1 1"/>
                        </feComponentTransfer>
                    </filter>
                </defs>
            </svg>

            
    

            {/* Animations Container */}
            <div className="relative flex items-center justify-center w-full h-full gap-32 mt-60">
                {/* Scroll Animation - Left of Center */}
                <div className="relative">
                    <div className="relative w-[750px] h-[750px]" style={{ isolation: 'isolate' }}>
                        {/* Render ALL scroll frames at once, stacked on top of each other */}
                        {scrollFrames.map((scrollFrame, index) => {
                            const frameNumber = index + 1;
                            const isCurrent = currentScrollFrame === frameNumber;
                            
                            return (
                                <motion.div
                                    key={frameNumber}
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ 
                                        opacity: isCurrent ? 1 : 0
                                    }}
                                    transition={{ 
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    style={{ 
                                        willChange: 'opacity',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <img 
                                        src={scrollFrame} 
                                        alt={`Scroll frame ${frameNumber}`}
                                        className="w-full h-full object-contain"
                                        style={{ 
                                            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))',
                                            imageRendering: 'crisp-edges',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'translateZ(0)',
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Treasure Chest - Right of Center */}
                <div className="relative">
                    <div className="relative w-[800px] h-[800px]" style={{ isolation: 'isolate' }}>
                        {/* Render ALL frames at once, stacked on top of each other */}
                        {frames.map((frame, index) => {
                            const frameNumber = index + 1;
                            const isCurrent = currentFrame === frameNumber;
                            
                            return (
                                <motion.div
                                    key={frameNumber}
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ 
                                        opacity: isCurrent ? 1 : 0
                                    }}
                                    transition={{ 
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    style={{ 
                                        willChange: 'opacity',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <img 
                                        src={frame} 
                                        alt={`Treasure frame ${frameNumber}`}
                                        className="w-full h-full object-contain"
                                        style={{ 
                                            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))',
                                            imageRendering: 'crisp-edges',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'translateZ(0)',
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                        
                        {/* Glow effect */}
                        {currentFrame >= 4 && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                style={{ zIndex: -1 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ 
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <motion.div
                                    className="w-[600px] h-[600px] rounded-full blur-3xl"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 70%)'
                                    }}
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        opacity: [0.6, 0.8, 0.6]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Sparkle particles */}
                    {currentFrame === 7 && (
                        <>
                            {[...Array(12)].map((_, i) => {
                                const angle = (i * Math.PI * 2) / 12;
                                const distance = 180; // Adjusted for smaller chest
                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute rounded-full"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            width: i % 3 === 0 ? '16px' : '10px',
                                            height: i % 3 === 0 ? '16px' : '10px',
                                            background: i % 2 === 0 
                                                ? 'radial-gradient(circle, #fef08a 0%, #fbbf24 100%)' 
                                                : 'radial-gradient(circle, #ffffff 0%, #fbbf24 100%)',
                                            boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                                        }}
                                        initial={{ opacity: 0, scale: 0, x: -4, y: -4 }}
                                        animate={{
                                            opacity: [0, 1, 0.8, 0],
                                            scale: [0, 1.2, 1, 0],
                                            x: [0, Math.cos(angle) * distance],
                                            y: [0, Math.sin(angle) * distance],
                                        }}
                                        transition={{
                                            duration: 1.8,
                                            delay: i * 0.08,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
            </div>

            {/* Enter Cave Button */}
            <motion.button
                onClick={handleEnterCave}
                className="absolute bottom-12 flex items-center gap-3 px-14 py-6 bg-[#5a1a1a] rounded-full border-2 border-[#8b4513] shadow-2xl cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
            >
                <span 
                    className="text-4xl text-[#f5deb3] tracking-wider"
                    style={{ fontFamily: "'IM Fell Great Primer SC', serif" }}
                >
                    Enter Cave
                </span>
                <img 
                    src={icon} 
                    alt="Icon" 
                    className="w-8 h-8"
                />
            </motion.button>
        </div>
    );
};

export default Sqlpage2;