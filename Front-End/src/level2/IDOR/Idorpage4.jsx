import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import bg from '../../assets/idorfrontdiv/bg-img2.png'
import crown from '../../assets/idorfrontdiv/animation/crownframe1.png'
import sheild from '../../assets/idorfrontdiv/animation/shieldframe.png'
import diamond from '../../assets/idorfrontdiv/animation/diamondframe.png'
import key from '../../assets/idorfrontdiv/animation/keyframe.png'
import scroll from '../../assets/idorfrontdiv/animation/scrollframe.png'
import glow from '../../assets/idorfrontdiv/animation/glowframeovercrown.png'
import music from '../../assets/jungle-night-pad-381096.mp3'

const Idorpage4 = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    // Load found items
    const foundItems = JSON.parse(localStorage.getItem("idor_items_found")) || [];

    // Function to save item when clicked
    const markItemFound = (itemName) => {
        const found = JSON.parse(localStorage.getItem("idor_items_found")) || [];
        if (!found.includes(itemName)) {
            found.push(itemName);
            localStorage.setItem("idor_items_found", JSON.stringify(found));
        }
    };
    
    useEffect(() => {
        const audio = new Audio(music);
        audio.volume = 0.1;
        audio.play().catch(() => {});
    }, []);

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
            {!foundItems.includes("crown") && (
                <HiddenItem
                    image={crown}
                    alt="crown"
                    top="40%"
                    left="14.56%"
                    onClick={() => {
                        markItemFound("crown");
                        navigate('/level2/idorpage5');
                    }}
                />
            )}

            {!foundItems.includes("shield") && (
                <HiddenItem
                    image={sheild}
                    alt="shield"
                    top="20%"
                    left="6%"
                    onClick={() => {
                        markItemFound("shield");
                        navigate('/level2/idorpage9');
                    }}
                />
            )}

            {!foundItems.includes("diamond") && (
                <HiddenItem
                    image={diamond}
                    alt="diamond"
                    top="56%"
                    left="73%"
                    onClick={() => {
                        markItemFound("diamond");
                        navigate('/level2/idorpage8');
                    }}
                />
            )}

            {!foundItems.includes("key") && (
                <HiddenItem
                    image={key}
                    alt="key"
                    top="87%"
                    left="92%"
                    onClick={() => {
                        markItemFound("key");
                        navigate('/level2/idorpage7');
                    }}
                />
            )}
            
            {!foundItems.includes("scroll") && (
                <HiddenItem
                    image={scroll}
                    alt="scroll"
                    top="30%"
                    left="83%"
                    onClick={() => {
                        markItemFound("scroll");
                        navigate('/level2/idorpage6');
                    }}
                />
            )}
        </div>
    );
};

export default Idorpage4;