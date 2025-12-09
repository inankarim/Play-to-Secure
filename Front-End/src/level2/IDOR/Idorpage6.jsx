import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import bg from '../../assets/idorfrontdiv/animation/bgimage/videoimage.mp4';
import audio from '../../assets/idorfrontdiv/animation/bgimage/arab-190763.mp3';

const Idorpage6 = () => {
   const navigate = useNavigate();
   const [showContent, setShowContent] = useState(false);
   const [videoEnded, setVideoEnded] = useState(false);
   const [isMusicPlaying, setIsMusicPlaying] = useState(true);
   const audioRef = useRef(null);
   const videoRef = useRef(null);

   useEffect(() => {
    // Start music when component mounts
    if (audioRef.current) {
        audioRef.current.currentTime = 5;
        audioRef.current.play().catch(error => {
            console.log("Audio autoplay prevented:", error);
            setIsMusicPlaying(false);
        });

        // Stop music at 40 seconds (after 35 seconds of playing)
        const stopTimer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }, 35000);

        return () => {
            clearTimeout(stopTimer);
            // ADD THIS: Stop audio when component unmounts
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }
}, []);

   const handleVideoEnd = () => {
       setVideoEnded(true);
       setTimeout(() => setShowContent(true), 300);
   };

   const toggleMusic = () => {
       if (audioRef.current) {
           if (isMusicPlaying) {
               audioRef.current.pause();
           } else {
               audioRef.current.play();
           }
           setIsMusicPlaying(!isMusicPlaying);
       }
   };

   const contentSections = [
       {
           delay: 0,
           content: (
               <>
                   <motion.h1 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                       className="text-6xl md:text-7xl font-bold mb-8"
                       style={{ 
                           fontFamily: "'Uncial Antiqua', cursive",
                           textShadow: '3px 3px 8px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.6)',
                           color: '#3c1810'
                       }}
                   >
                       UUID Scroll
                   </motion.h1>
                   <motion.p
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.6 }}
                       className="text-2xl md:text-3xl mb-10 font-bold"
                       style={{
                           color: '#1a0f08',
                           textShadow: '2px 2px 6px rgba(255,255,255,0.9), 1px 1px 4px rgba(0,0,0,0.6)'
                       }}
                   >
                       Use UUID/Hashed IDs instead of sequential integers
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
                   className="mb-10"
               >
                   <h2 className="text-4xl md:text-5xl mb-6 flex items-center gap-4 font-bold"
                       style={{ 
                           fontFamily: "'Uncial Antiqua', cursive",
                           color: '#7c2d12',
                           textShadow: '2px 2px 6px rgba(255,255,255,0.9), 1px 1px 4px rgba(0,0,0,0.7)'
                       }}>
                       <span className="text-5xl">📜</span> How It Works:
                   </h2>
                   <motion.p
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="text-xl md:text-2xl leading-relaxed font-bold"
                       style={{
                           color: '#1a0f08',
                           textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
                       }}
                   >
                       UUIDs are 128-bit numbers (written in hexadecimal, split by dashes into 5 groups) 
                       that make it <span className="font-extrabold" style={{ 
                           color: '#991b1b',
                           textShadow: '2px 2px 6px rgba(255,255,255,1)'
                       }}>practically impossible for attackers to guess valid values.</span>
                   </motion.p>
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
                   className="mb-10"
               >
                   <h2 className="text-4xl md:text-5xl mb-6 flex items-center gap-4 font-bold"
                       style={{ 
                           fontFamily: "'Uncial Antiqua', cursive",
                           color: '#7c2d12',
                           textShadow: '2px 2px 6px rgba(255,255,255,0.9), 1px 1px 4px rgba(0,0,0,0.7)'
                       }}>
                       <span className="text-5xl">🛡️</span> Attack Prevented:
                   </h2>
                   <motion.p
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="text-xl md:text-2xl leading-relaxed font-bold"
                       style={{
                           color: '#1a0f08',
                           textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
                       }}
                   >
                       Stops integer-based and sequential IDOR attacks where attackers increment IDs 
                       <span className="font-extrabold" style={{ 
                           color: '#991b1b',
                           textShadow: '2px 2px 6px rgba(255,255,255,1)'
                       }}> (id=1, id=2, id=3...)</span>
                   </motion.p>
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
                   className="mb-10"
               >
                   <h2 className="text-4xl md:text-5xl mb-6 flex items-center gap-4 font-bold"
                       style={{ 
                           fontFamily: "'Uncial Antiqua', cursive",
                           color: '#78350f',
                           textShadow: '2px 2px 6px rgba(255,255,255,0.9), 1px 1px 4px rgba(0,0,0,0.7)'
                       }}>
                       <span className="text-5xl">💻</span> Code Example:
                   </h2>
                   <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="p-6 rounded-lg border-4 font-mono text-lg md:text-xl shadow-2xl"
                       style={{
                           backgroundColor: 'rgba(255, 251, 235, 0.95)',
                           borderColor: '#1a0f08'
                       }}
                   >
                       <p className="font-bold mb-3 text-xl" style={{ 
                           color: '#15803d',
                           textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
                       }}>// GOOD: Use UUID</p>
                       <p className="font-bold mb-1" style={{ color: '#1a0f08' }}>/api/users/550e8400-e29b-41d4-</p>
                       <p className="font-bold mb-5" style={{ color: '#1a0f08' }}>a716-446655440000</p>
                       
                       <p className="font-bold mb-3 text-xl" style={{ 
                           color: '#b91c1c',
                           textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
                       }}>// BAD: Use Sequential ID</p>
                       <p className="font-bold" style={{ color: '#1a0f08' }}>/api/users/123</p>
                   </motion.div>
               </motion.div>
           )
       },
       {
           delay: 5.6,
           content: (
               <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                   className="mb-10"
               >
                   <h2 className="text-4xl md:text-5xl mb-6 flex items-center gap-4 font-bold"
                       style={{ 
                           fontFamily: "'Uncial Antiqua', cursive",
                           color: '#a16207',
                           textShadow: '2px 2px 6px rgba(255,255,255,0.9), 1px 1px 4px rgba(0,0,0,0.7)'
                       }}>
                       <span className="text-5xl">⚠️</span> Important Note:
                   </h2>
                   <motion.p
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="text-xl md:text-2xl leading-relaxed font-bold"
                       style={{
                           color: '#1a0f08',
                           textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
                       }}
                   >
                       However, even with complex identifiers, <span className="font-extrabold underline" style={{ 
                           color: '#991b1b',
                           textShadow: '2px 2px 6px rgba(255,255,255,1)',
                           textDecorationColor: '#991b1b',
                           textDecorationThickness: '3px'
                       }}>
                       access control checks are still essential!</span>
                   </motion.p>
               </motion.div>
           )
       }
   ];

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-amber-50">
            {/* Audio Element */}
            <audio ref={audioRef} src={audio} />

            {/* Music Control Button - Always visible */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={toggleMusic}
                className="fixed top-6 right-6 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-4"
                style={{
                    background: 'linear-gradient(to bottom, #78350f, #451a03)',
                    borderColor: '#1a0f08'
                }}
            >
                <span className="text-3xl">
                    {isMusicPlaying ? '🔊' : '🔇'}
                </span>
            </motion.button>

            {/* Video Background */}
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

            {/* Content Overlay - Shows after video ends */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full min-h-screen flex items-center justify-center p-8"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(255, 251, 235, 0.7) 0%, rgba(245, 222, 179, 0.85) 100%)'
                        }}
                    >
                        <div className="max-w-5xl w-full">
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

                            {/* Continue Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 7 }}
                                className="flex justify-center mt-14"
                            >
                                <button
                                    onClick={() => navigate('/level2/idorquizPage',{
        state: { fromPage: 'idorpage6' }
    })}
                                    className="px-10 py-5 text-white text-2xl font-bold rounded-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4"
                                    style={{ 
                                        fontFamily: "'Uncial Antiqua', cursive",
                                        background: 'linear-gradient(to right, #78350f, #451a03)',
                                        borderColor: '#1a0f08'
                                    }}
                                >
                                    Continue Your Quest →
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Google Font */}
            <link href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap" rel="stylesheet" />
        </div>
    );
};

export default Idorpage6;