import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import bg from '../../assets/idorfrontdiv/animation/bgimage/KeyVideo.mov';
import audio from '../../assets/idorfrontdiv/animation/bgimage/key.mp3';

const Idorpage7 = () => {
   const navigate = useNavigate();
   const [showContent, setShowContent] = useState(false);
   const [isMusicPlaying, setIsMusicPlaying] = useState(true);
   const audioRef = useRef(null);
   const videoRef = useRef(null);

   useEffect(() => {
       // Start music when component mounts
       if (audioRef.current) {
           audioRef.current.currentTime = 0;
           audioRef.current.play().catch(error => {
               console.log("Audio autoplay prevented:", error);
               setIsMusicPlaying(false);
           });

           // Stop music at 35 seconds
           const stopTimer = setTimeout(() => {
               if (audioRef.current) {
                   audioRef.current.pause();
               }
           }, 35000);

           return () => clearTimeout(stopTimer);
       }
   }, []);

   const handleVideoEnd = () => {
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
                       className="text-6xl md:text-8xl font-bold mb-8"
                       style={{ 
                           fontFamily: "'Cinzel Decorative', cursive",
                           textShadow: '4px 4px 12px rgba(0,0,0,1), 0 0 30px rgba(255,215,0,0.8), 0 0 50px rgba(255,215,0,0.5)',
                           color: '#ffd700',
                           WebkitTextStroke: '2px rgba(139,69,19,0.8)'
                       }}
                   >
                       Ownership Checker
                   </motion.h1>
                   <motion.p
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.6 }}
                       className="text-2xl md:text-4xl mb-10 font-bold"
                       style={{
                           fontFamily: "'Philosopher', sans-serif",
                           color: '#fff8dc',
                           textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,215,0,0.6)',
                           letterSpacing: '1px'
                       }}
                   >
                       Verify resource ownership belongs to the user
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
                   <h2 className="text-4xl md:text-6xl mb-6 flex items-center gap-4 font-bold"
                       style={{ 
                           fontFamily: "'Cinzel', serif",
                           color: '#ffa500',
                           textShadow: '3px 3px 10px rgba(0,0,0,1), 0 0 25px rgba(255,165,0,0.7)',
                           WebkitTextStroke: '1px rgba(139,69,19,0.6)'
                       }}>
                       <span className="text-6xl">📋</span> How It Works:
                   </h2>
                   <motion.p
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="text-xl md:text-3xl leading-relaxed font-bold"
                       style={{
                           fontFamily: "'Philosopher', sans-serif",
                           color: '#fffacd',
                           textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.8)',
                           lineHeight: '1.8'
                       }}
                   >
                       The core weakness of IDOR is access-control failure. The server MUST verify the 
                       authenticated user actually owns (or is permitted to access) the referenced object before returning 
                       it. <span className="font-extrabold" style={{ 
                           color: '#ff4500',
                           textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,69,0,0.8)',
                           WebkitTextStroke: '0.5px rgba(139,0,0,0.8)'
                       }}>Return 403/404 when ownership cannot be proven (least privilege principle).</span>
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
                   <h2 className="text-4xl md:text-6xl mb-6 flex items-center gap-4 font-bold"
                       style={{ 
                           fontFamily: "'Cinzel', serif",
                           color: '#ffa500',
                           textShadow: '3px 3px 10px rgba(0,0,0,1), 0 0 25px rgba(255,165,0,0.7)',
                           WebkitTextStroke: '1px rgba(139,69,19,0.6)'
                       }}>
                       <span className="text-6xl">🛡️</span> Attack Prevented:
                   </h2>
                   <motion.p
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="text-xl md:text-3xl leading-relaxed font-bold"
                       style={{
                           fontFamily: "'Philosopher', sans-serif",
                           color: '#fffacd',
                           textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.8)',
                           lineHeight: '1.8'
                       }}
                   >
                       Stops ALL IDOR attacks - <span className="font-extrabold" style={{ 
                           color: '#ff4500',
                           textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,69,0,0.8)',
                           WebkitTextStroke: '0.5px rgba(139,0,0,0.8)'
                       }}>this is the fundamental defense!</span>
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
                   <h2 className="text-4xl md:text-6xl mb-6 flex items-center gap-4 font-bold"
                       style={{ 
                           fontFamily: "'Cinzel', serif",
                           color: '#ffa500',
                           textShadow: '3px 3px 10px rgba(0,0,0,1), 0 0 25px rgba(255,165,0,0.7)',
                           WebkitTextStroke: '1px rgba(139,69,19,0.6)'
                       }}>
                       <span className="text-6xl">💻</span> Code Example:
                   </h2>
                   <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       className="p-8 rounded-lg border-4 font-mono text-lg md:text-2xl shadow-2xl"
                       style={{
                           backgroundColor: 'rgba(25, 25, 25, 0.95)',
                           borderColor: '#ffa500',
                           boxShadow: '0 0 30px rgba(255,165,0,0.5), inset 0 0 20px rgba(0,0,0,0.5)'
                       }}
                   >
                       <p className="font-bold mb-4 text-2xl" style={{ 
                           fontFamily: "'Courier Prime', monospace",
                           color: '#00ff00',
                           textShadow: '2px 2px 4px rgba(0,0,0,1), 0 0 10px rgba(0,255,0,0.5)'
                       }}>// GOOD: Check ownership</p>
                       <p className="font-bold mb-1" style={{ 
                           fontFamily: "'Courier Prime', monospace",
                           color: '#f0e68c' 
                       }}>const resource = await</p>
                       <p className="font-bold mb-1" style={{ 
                           fontFamily: "'Courier Prime', monospace",
                           color: '#f0e68c' 
                       }}>service.findById(id);</p>
                       <p className="font-bold mb-6" style={{ 
                           fontFamily: "'Courier Prime', monospace",
                           color: '#f0e68c' 
                       }}>
                           if (resource.ownerId !== req.userId) {'{'}<br/>
                           &nbsp;&nbsp;return res.status(403).json({'{'}error: 'Forbidden'{'}'}),<br/>
                           {'}'}
                       </p>
                       
                       <p className="font-bold mb-4 text-2xl" style={{ 
                           fontFamily: "'Courier Prime', monospace",
                           color: '#ff6347',
                           textShadow: '2px 2px 4px rgba(0,0,0,1), 0 0 10px rgba(255,99,71,0.5)'
                       }}>// SQL GOOD:</p>
                       <p className="font-bold mb-1" style={{ 
                           fontFamily: "'Courier Prime', monospace",
                           color: '#87ceeb' 
                       }}>SELECT * FROM orders</p>
                       <p className="font-bold" style={{ 
                           fontFamily: "'Courier Prime', monospace",
                           color: '#87ceeb' 
                       }}>WHERE id = 123 AND user_id = :current_user_id;</p>
                   </motion.div>
               </motion.div>
           )
       }
   ];

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-black">
            {/* Audio Element */}
            <audio ref={audioRef} src={audio} loop />

            {/* Music Control Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={toggleMusic}
                className="fixed top-6 right-6 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-4"
                style={{
                    background: 'linear-gradient(135deg, #8b4513, #d2691e)',
                    borderColor: '#ffa500',
                    boxShadow: '0 0 20px rgba(255,165,0,0.6), inset 0 0 10px rgba(0,0,0,0.5)'
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

            {/* Dark Overlay for better text visibility */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-5"></div>

            {/* Content Overlay - Shows after video ends */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full min-h-screen flex items-center justify-center p-8"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(20, 20, 20, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)'
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

                            {/* Continue Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 5.6 }}
                                className="flex justify-center mt-16"
                            >
                                <button
                                    onClick={() => navigate('/level2/idorquizPage', {
                                        state: { fromPage: 'idorpage7' }
                                    })}
                                    className="px-12 py-6 text-white text-3xl font-bold rounded-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4"
                                    style={{ 
                                        fontFamily: "'Cinzel', serif",
                                        background: 'linear-gradient(135deg, #8b4513, #d2691e, #cd853f)',
                                        borderColor: '#ffd700',
                                        boxShadow: '0 0 30px rgba(255,215,0,0.6), inset 0 0 15px rgba(0,0,0,0.3)',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    Continue Your Quest →
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@700;900&family=Philosopher:wght@700&family=Courier+Prime:wght@700&display=swap" rel="stylesheet" />
        </div>
    );
};

export default Idorpage7;