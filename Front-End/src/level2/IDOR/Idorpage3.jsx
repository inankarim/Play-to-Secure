import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/idorfrontdiv/bg-img2.png';
import { getIdorProgress } from '../../lib/idoritemProgress.js';
import progressService from '../../store/progressService';
import toast from 'react-hot-toast';

const Idorpage3 = () => {
    const navigate = useNavigate();
    const [completedItems, setCompletedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completingAttack, setCompletingAttack] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);

    // Fetch progress from backend - this will run every time the component mounts
    const fetchProgress = async () => {
        try {
            setLoading(true);
            const response = await getIdorProgress();
            console.log('Fetched IDOR progress:', response);
            
            if (response.success) {
                setCompletedItems(response.data.completedItems);
                
                // Check if all 5 quests are completed
                if (response.data.completedItems.length === 5) {
                    setShowCompletion(true);
                }
            }
        } catch (error) {
            console.error('Failed to fetch progress:', error);
            setCompletedItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []); // Run on mount

    // Also refresh progress when window gains focus (user returns from another tab/page)
    useEffect(() => {
        const handleFocus = () => {
            console.log('Window focused, refreshing progress...');
            fetchProgress();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    // Calculate progress percentage based on completed items (quizzes finished)
    const progress = (completedItems.length / 5) * 100;
    const allQuestsComplete = completedItems.length === 5;

    const handleBeginSearch = () => {
        navigate('/level2/idorpage4');
    };

    // Handle completing the IDOR attack
    const handleCompleteAttack = async () => {
        try {
            setCompletingAttack(true);
            
            // Mark IDOR attack as complete
            await progressService.markAttackComplete('idor');
            
            toast.success('🎉 IDOR Attack Completed!');
            
            // Navigate back to QuizHomePage
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
            className="min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-2xl mx-auto px-6 text-center"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl md:text-6xl font-bold mb-8 text-white"
                    style={{
                        textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                        fontFamily: 'Georgia, serif'
                    }}
                >
                    The Great IDOR Challenge
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/30"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-white">
                        {allQuestsComplete ? '🎉 All Scrolls Discovered!' : 'Your Quest begins: Find the hidden scrolls'}
                    </h2>
                    
                    <p className="text-lg text-gray-100 mb-6 leading-relaxed">
                        {allQuestsComplete 
                            ? 'Congratulations, brave adventurer! You have uncovered all the secret scrolls and mastered the IDOR vulnerabilities!'
                            : 'Brave adventurer, many secret scrolls to uncover powerful knowledge and secure your treasure!'
                        }
                    </p>

                    {/* Progress bar */}
                    <div className="mb-2">
                        <p className="text-sm text-gray-200 mb-2 font-medium">Discovery Progress</p>
                        <div className="w-full bg-gray-700/50 rounded-full h-6 border-2 border-blue-400/50">
                            <motion.div
                                key={progress} // Force re-render when progress changes
                                initial={{ width: 0 }}
                                animate={{ width: loading ? "0%" : `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full rounded-full flex items-center justify-center ${
                                    allQuestsComplete 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                                }`}
                            >
                                <span className="text-xs font-semibold text-white">
                                    {loading ? "..." : Math.round(progress) + "%"}
                                </span>
                            </motion.div>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">
                            {completedItems.length} of 5 quests completed
                        </p>
                        
                        {/* Debug info - remove in production */}
                        {completedItems.length > 0 && (
                            <p className="text-xs text-gray-400 mt-2">
                                Completed: {completedItems.join(', ')}
                            </p>
                        )}
                    </div>
                </motion.div>

                {/* Show completion button when all quests are done */}
                <AnimatePresence>
                    {showCompletion && allQuestsComplete && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mb-6"
                        >
                            <button
                                onClick={handleCompleteAttack}
                                disabled={completingAttack}
                                className={`px-12 py-4 text-white text-xl font-bold rounded-full shadow-2xl transition-all duration-300 border-2
                                    ${completingAttack 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]'
                                    }`}
                                style={{
                                    fontFamily: 'Georgia, serif',
                                    background: completingAttack 
                                        ? "linear-gradient(135deg, #555, #777)"
                                        : "linear-gradient(135deg, #10b981, #059669)",
                                    borderColor: "#10b981"
                                }}
                            >
                                {completingAttack ? '⏳ Completing...' : '🎉 Complete IDOR Attack'}
                            </button>

                            {completingAttack && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-green-400 font-semibold mt-4 text-lg"
                                >
                                    🎊 Saving your progress...
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Continue/Begin Search button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBeginSearch}
                    className="bg-gradient-to-r from-cyan-400 to-teal-400 text-gray-900 px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:from-cyan-300 hover:to-teal-300 transition-all duration-300 border-2 border-cyan-300"
                >
                    {allQuestsComplete ? 'Review Your Journey' : 'Begin Your Search'}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Idorpage3;