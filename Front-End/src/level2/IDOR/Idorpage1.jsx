import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../../assets/idorfrontdiv/Frame 6.png';
import img3 from '../../assets/idorfrontdiv/Frame 8.png';
import jungle from '../../assets/idorfrontdiv/jungle2.png';

const Idorpage1 = () => {
    const navigate = useNavigate();
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [hoveredTheme, setHoveredTheme] = useState(null);

    const themes = [
        { id: 'desert', name: 'DESERT', img: img1, available: false },
        { id: 'jungle', name: 'JUNGLE', img: jungle, available: true, route: '/level2/idorpage2' },
        { id: 'snow', name: 'SNOW', img: img3, available: false }
    ];

    const handleThemeClick = (theme) => {
        if (theme.available) {
            setSelectedTheme(theme.id);
        }
    };

    const handleBeginJourney = () => {
        const themeId = hoveredTheme || selectedTheme;
        if (themeId) {
            const theme = themes.find(t => t.id === themeId);
            if (theme && theme.route) {
                navigate(theme.route);
            }
        }
    };

    const hoveredThemeData = themes.find(t => t.id === hoveredTheme);
    const isButtonEnabled = selectedTheme || hoveredTheme;

    return (
        <div 
            className='min-h-screen font-bold flex flex-col' 
            style={{
                backgroundColor: '#EDE2CB'
            }}
            onMouseLeave={() => setHoveredTheme(null)}
        >
            {/* Header */}
            <motion.div 
                className='text-center pt-8' 
                style={{
                    color: '#543D2C'
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <p className='text-5xl'>IDOR: The Treasure Chest Heist</p>
                <p className='text-2xl mt-2'>Choose Your Path, Brave Adventurer</p>
            </motion.div>

            {/* Theme Selection */}
            <div className='flex-1 flex items-center justify-center px-8'>
                <AnimatePresence mode="wait">
                    {!hoveredTheme ? (
                        <motion.div 
                            key="selection"
                            className='flex gap-12 items-center justify-center w-full max-w-7xl'
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            {themes.map((theme, index) => (
                                <motion.div 
                                    key={theme.id}
                                    className='relative flex flex-col items-center'
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                >
                                    {/* Theme Image */}
                                    <motion.div 
                                        onClick={() => handleThemeClick(theme)}
                                        onMouseEnter={() => theme.available && setHoveredTheme(theme.id)}
                                        className={`relative overflow-hidden transition-all duration-300 ${
                                            theme.available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                                        } ${
                                            selectedTheme === theme.id ? 'ring-4 ring-blue-500' : ''
                                        }`}
                                        style={{
                                            width: '549px',
                                            height: '908px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '30px'
                                        }}
                                        whileHover={theme.available ? { 
                                            scale: 1.05,
                                            y: -10,
                                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                                        } : {}}
                                        whileTap={theme.available ? { scale: 0.98 } : {}}
                                    >
                                        <img 
                                            src={theme.img} 
                                            alt={theme.name}
                                            className='w-full h-full object-cover'
                                        />
                                    </motion.div>

                                    {/* Connecting Line (between cards) */}
                                    {index < themes.length - 1 && (
                                        <motion.div 
                                            className='absolute top-1/2 -right-8 w-8 h-0.5 bg-gray-400'
                                            style={{ transform: 'translateY(-50%)' }}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="fullimage"
                            className='flex items-center justify-center'
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ 
                                duration: 0.5,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            <motion.img 
                                src={hoveredThemeData?.img} 
                                alt={hoveredThemeData?.name}
                                style={{
                                    width: '1400px',
                                    height: '900px',
                                    objectFit: 'cover',
                                    borderRadius: '30px',
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                                }}
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <motion.div 
                className='text-center pb-8' 
                style={{ color: '#543D2C' }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <AnimatePresence mode="wait">
                    {!hoveredTheme ? (
                        <motion.div
                            key="footer-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className='text-lg mb-4'>
                                More themes coming soon! Beat the game to unlock them all!
                            </p>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                
                <motion.button 
                    onClick={handleBeginJourney}
                    disabled={!isButtonEnabled}
                    className='px-12 py-4 rounded-full text-white text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed'
                    style={{
                        backgroundColor: '#0F570A'
                    }}
                    whileHover={isButtonEnabled ? { 
                        scale: 1.1,
                        boxShadow: '0 5px 15px rgba(15, 87, 10, 0.4)'
                    } : {}}
                    whileTap={isButtonEnabled ? { scale: 0.95 } : {}}
                    animate={{ opacity: 1 }}
                >
                    Begin Journey
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Idorpage1;