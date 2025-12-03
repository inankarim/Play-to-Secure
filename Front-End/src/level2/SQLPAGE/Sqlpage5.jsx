import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

import { useNavigate } from 'react-router-dom';

const frames = [
    frame1, frame2, frame3, frame4, frame5, frame6,
    frame7, frame8, frame9, frame10, frame11, frame12,
    frame13, frame14
];

const Sqlpage5 = () => {

    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    // ---------- PLAY SIREN ON PAGE LOAD ----------
    useEffect(() => {
        const audio = new Audio(police);
        audio.volume = 0.4;        // lower volume
        audio.play().catch(() => {});  // ignore autoplay errors
    }, []);

    // ---------- ANIMATION: STOP AT FINAL FRAME ----------
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

    const handleEnterCave = () => {
        navigate('/level2/idorpage1');
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
                    Congratulations You Are Safe
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

export default Sqlpage5;
