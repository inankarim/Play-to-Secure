import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import progressService from '../../store/progressService';

import bg from '../../assets/sqlpagebg3.png';
import police from '../../assets/police-siren-397963.mp3';
import icon from '../../assets/short icons/icon.png';

import frame1 from '../../assets/fox2/frame1.png';
import frame2 from '../../assets/fox2/frame2.png';
import frame3 from '../../assets/fox2/frame3.png';
import frame4 from '../../assets/fox2/frame4.png';
import frame5 from '../../assets/fox2/frame5.png';
import frame6 from '../../assets/fox2/frame6.png';
import frame7 from '../../assets/fox2/frame7.png';
import frame8 from '../../assets/fox2/frame8.png';
import frame9 from '../../assets/fox2/frame9.png';
import frame10 from '../../assets/fox2/frame10.png';
import frame11 from '../../assets/fox2/frame11.png';
import frame12 from '../../assets/fox2/frame12.png';
import frame13 from '../../assets/fox2/frame13.png';
import frame14 from '../../assets/fox2/frame14.png';

const frames = [
    frame1, frame2, frame3, frame4, frame5, frame6,
    frame7, frame8, frame9, frame10, frame11, frame12,
    frame13, frame14
];

const Sqlpage5 = () => {
    const [index, setIndex] = useState(0);
    const [completingAttack, setCompletingAttack] = useState(false);
    const navigate = useNavigate();

    // Play siren on page load
   // Play siren on page load
useEffect(() => {
    const audio = new Audio(police);
    audio.volume = 0.4;
    audio.play().catch(() => {});
    
    // ADD THIS: Cleanup function
    return () => {
        audio.pause();
        audio.currentTime = 0;
    };
}, []);

    // Animation: stop at final frame
    useEffect(() => {
        if (index >= frames.length - 1) return;

        const interval = setInterval(() => {
            setIndex(prev => {
                if (prev >= frames.length - 1) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 900);

        return () => clearInterval(interval);
    }, [index]);

    // Handle completing SQL attack
    const handleCompleteAttack = async () => {
        try {
            setCompletingAttack(true);
            
            // Mark SQL attack as complete
            await progressService.markAttackComplete('sql');
            
            toast.success('🎉 SQL Injection Attack Completed!');
            
            // Navigate to QuizHomePage
            setTimeout(() => {
                navigate('/quizHome');
            }, 2000);
            
        } catch (error) {
            console.error('Error completing attack:', error);
            toast.error('Failed to save progress, but you can continue!');
            setTimeout(() => {
                navigate('/quizHome');
            }, 2000);
        }
    };

    return (
        <div 
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: '20vw auto',
                backgroundPosition: 'top left',
                backgroundRepeat: 'repeat',
                minHeight: '100vh',
                padding: '20px',
                overflowY: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {/* Sprite Animation */}
            <img
                src={frames[index]}
                alt="fox animation"
                style={{
                    width: '1380px',
                    objectFit: 'contain',
                    imageRendering: 'pixelated'
                }}
            />

            {/* Complete SQL Attack Button */}
            <motion.button
                onClick={handleCompleteAttack}
                disabled={completingAttack}
                className={`absolute bottom-12 flex items-center gap-3 px-14 py-6 rounded-full border-2 shadow-2xl
                    ${completingAttack 
                        ? 'bg-gray-600 border-gray-500 cursor-not-allowed opacity-70' 
                        : 'bg-[#5a1a1a] border-[#8b4513] cursor-pointer'
                    }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={!completingAttack ? { 
                    scale: 1.05,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                    transition: { duration: 0.2 }
                } : {}}
                whileTap={!completingAttack ? { scale: 0.98 } : {}}
            >
                <span 
                    className="text-4xl text-[#f5deb3] tracking-wider"
                    style={{ fontFamily: "'IM Fell Great Primer SC', serif" }}
                >
                    {completingAttack 
                        ? '⏳ Completing...' 
                        : '🎉 Complete SQL Attack'
                    }
                </span>
                {!completingAttack && (
                    <img 
                        src={icon} 
                        alt="Icon" 
                        className="w-8 h-8"
                    />
                )}
            </motion.button>

            {/* Completion message */}
            {completingAttack && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-32 text-center"
                >
                    <p 
                        className="text-3xl text-green-400 font-bold"
                        style={{ 
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            fontFamily: "'IM Fell Great Primer SC', serif"
                        }}
                    >
                        🎊 Congratulations! Saving your progress...
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Sqlpage5;