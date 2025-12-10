import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/idorfrontdiv/bg-img2.png';
import crown from '../../assets/idorfrontdiv/animation/crownframe1.png';
import diamond from '../../assets/idorfrontdiv/animation/shieldframe.png';

import key from '../../assets/idorfrontdiv/animation/keyframe.png';
import scroll from '../../assets/idorfrontdiv/animation/scrollframe.png';
import glow from '../../assets/idorfrontdiv/animation/glowframeovercrown.png';
import music from '../../assets/jungle-night-pad-381096.mp3';
import { getIdorProgress, markItemFound } from '../../lib/idoritemProgress';

const Idorpage4 = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    // Load both found items AND completed items from backend
    const [foundItems, setFoundItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch progress on mount
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                setLoading(true);
                const response = await getIdorProgress();
                console.log('Idorpage4 - Fetched progress:', response);
                
                if (response.success) {
                    setFoundItems(response.data.foundItems || []);
                    setCompletedItems(response.data.completedItems || []);
                }
            } catch (error) {
                console.error('Failed to fetch progress:', error);
                setFoundItems([]);
                setCompletedItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    // Refresh progress when window gains focus
    useEffect(() => {
        const handleFocus = async () => {
            console.log('Window focused, refreshing item progress...');
            try {
                const response = await getIdorProgress();
                if (response.success) {
                    setFoundItems(response.data.foundItems || []);
                    setCompletedItems(response.data.completedItems || []);
                    console.log('Progress refreshed:', response.data);
                }
            } catch (error) {
                console.error('Failed to refresh progress:', error);
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    // Function to save item when clicked - now saves to backend
    const handleItemClick = async (itemName, navigateTo) => {
        try {
            // Mark item as found in backend
            const response = await markItemFound(itemName);
            if (response.success) {
                // Update local state with new found items
                setFoundItems(response.data.foundItems || []);
                setCompletedItems(response.data.completedItems || []);
            }
        } catch (error) {
            console.error('Failed to mark item as found:', error);
            // Still update local state as fallback
            if (!foundItems.includes(itemName)) {
                setFoundItems([...foundItems, itemName]);
            }
        } finally {
            // Navigate regardless of success/failure
            navigate(navigateTo);
        }
    };
    
   useEffect(() => {
    const audio = new Audio(music);
    audio.volume = 0.1;
    audio.play().catch(() => {});
    
    // ADD THIS: Cleanup function
    return () => {
        audio.pause();
        audio.currentTime = 0;
    };
}, []);

    // Helper function to check if an item should be hidden
    // Hide if it's either found OR completed
    const shouldHideItem = (itemName) => {
        const isCompleted = completedItems.includes(itemName);
        console.log(`${itemName}: completed=${isCompleted}`);
        return isCompleted;
    };

    const HiddenItem = ({ image, alt, top, left, onClick }) => (
        <motion.div
            style={{ 
                position: 'absolute', 
                top, 
                left, 
                cursor: 'pointer',
                width: '5vw',  // Responsive width based on viewport
                height: '5vw', // Maintains aspect ratio
                minWidth: '60px', // Minimum size for small screens
                minHeight: '60px',
                maxWidth: '120px', // Maximum size for large screens
                maxHeight: '120px'
            }}
            onHoverStart={() => setHoveredItem(alt)}
            onHoverEnd={() => setHoveredItem(null)}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
        >
            <img 
                src={image} 
                alt={alt} 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    position: 'relative', 
                    zIndex: 2 
                }} 
            />

            {hoveredItem === alt && (
                <motion.img
                    src={glow}
                    alt="glow"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '154%',  // Proportional to parent
                        height: '154%',
                        zIndex: 1,
                        objectFit: 'contain'
                    }}
                    initial={{ scale: 0.8, opacity: 0, x: '-50%', y: '-50%' }}
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0], rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            )}
        </motion.div>
    );

    if (loading) {
        return (
            <div
                style={{
                    backgroundImage: `url(${bg})`,
                    height: '100vh',
                    width: '100vw',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className="text-white text-2xl font-bold">Loading...</div>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundImage: `url(${bg})`,
                height: '100vh',
                width: '100vw',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {!shouldHideItem("crown") && (
                <HiddenItem
                    image={crown}
                    alt="crown"
                    top="40%"
                    left="14.56%"
                    onClick={() => handleItemClick("crown", '/level2/idorpage9')}
                />
            )}

            

            {!shouldHideItem("diamond") && (
                <HiddenItem
                    image={diamond}
                    alt="diamond"
                    top="56%"
                    left="73%"
                    onClick={() => handleItemClick("diamond", '/level2/idorpage8')}
                />
            )}

            {!shouldHideItem("key") && (
                <HiddenItem
                    image={key}
                    alt="key"
                    top="87%"
                    left="92%"
                    onClick={() => handleItemClick("key", '/level2/idorpage7')}
                />
            )}
            
            {!shouldHideItem("scroll") && (
                <HiddenItem
                    image={scroll}
                    alt="scroll"
                    top="30%"
                    left="83%"
                    onClick={() => handleItemClick("scroll", '/level2/idorpage6')}
                />
            )}
        </div>
    );
};

export default Idorpage4;