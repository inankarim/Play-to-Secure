import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/idorfrontdiv/bg-img2.png';

const Idorpage3 = () => {
    const navigate = useNavigate();

    // Load found items
    const foundItems = JSON.parse(localStorage.getItem("idor_items_found")) || [];
    const progress = (foundItems.length / 4) * 100;

    const handleBeginSearch = () => {
        navigate('/level2/idorpage4');
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
                        Your Quest begins: Find the hidden scrolls
                    </h2>
                    
                    <p className="text-lg text-gray-100 mb-6 leading-relaxed">
                        Brave adventurer, many secret scrolls to uncover powerful knowledge and secure your treasure!
                    </p>

                    {/* Progress bar */}
                    <div className="mb-2">
                        <p className="text-sm text-gray-200 mb-2 font-medium">Discovery Progress</p>
                        <div className="w-full bg-gray-700/50 rounded-full h-6 border-2 border-blue-400/50">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1 }}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-center"
                            >
                                <span className="text-xs font-semibold text-white">
                                    {Math.round(progress)}%
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBeginSearch}
                    className="bg-gradient-to-r from-cyan-400 to-teal-400 text-gray-900 px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:from-cyan-300 hover:to-teal-300 transition-all duration-300 border-2 border-cyan-300"
                >
                    Begin Your Search
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Idorpage3;
