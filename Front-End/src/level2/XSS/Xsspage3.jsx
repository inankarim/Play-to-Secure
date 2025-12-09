import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import geminiGeneratedImageSklb4Osklb4Osklb1 from "../../assets/XSSNo1/bg.png";
import polygon2 from "../../assets/XSSNo1/polygon 2.png";
import polygon3 from "../../assets/XSSNo1/polygon 3.png";
import polygon4 from "../../assets/XSSNo1/polygon 4.png";
import polygon5 from "../../assets/XSSNo1/polygon 5.png";
import polygon6 from "../../assets/XSSNo1/polygon 6.svg";
import polygon7 from "../../assets/XSSNo1/polygon 7.svg";
import polygon8 from "../../assets/XSSNo1/polygon 8.svg";
import rectangle1 from "../../assets/XSSNo1/rectangle 1.png";

const Xsspage3 = () => {
  const [scale, setScale] = useState(1);
  const [showFirstSet, setShowFirstSet] = useState(true);
  const [showSecondSet, setShowSecondSet] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    // Calculate scale based on window size
    const calculateScale = () => {
      const scaleX = window.innerWidth / 1440;
      const scaleY = window.innerHeight / 1024;
      setScale(Math.min(scaleX, scaleY, 1));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    // Timeline of animations
    // Show first set initially, then hide after 3 seconds
    const hideFirstSet = setTimeout(() => {
      setShowFirstSet(false);
    }, 3000);

    // Show second set after first set starts hiding
    const showSecondSetTimer = setTimeout(() => {
      setShowSecondSet(true);
    }, 3500);

    // Show text after polygons 7 and 8 appear
    const showTextTimer = setTimeout(() => {
      setShowText(true);
    }, 4500);

    // Hide text and show next button after 5 seconds of text being visible
    const hideTextTimer = setTimeout(() => {
      setShowText(false);
      setShowNextButton(true);
    }, 9500);

    return () => {
      clearTimeout(hideFirstSet);
      clearTimeout(showSecondSetTimer);
      clearTimeout(showTextTimer);
      clearTimeout(hideTextTimer);
    };
  }, []);

  return (
    <main className="bg-[#ebe5d9] w-screen h-screen fixed inset-0 overflow-hidden flex items-center justify-center">
      <div 
        className="relative w-[1440px] h-[1024px]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Background rectangle with image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-28 left-[21px] w-[1398px] h-[887px]"
          style={{
            backgroundImage: `url(${geminiGeneratedImageSklb4Osklb4Osklb1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-7 left-[280px] w-[926px] font-normal text-black text-5xl tracking-[0] leading-[27.4px] z-10"
          style={{ fontFamily: "'Rubik Bubbles', cursive" }}
        >
          The XSS Attack: A Coder&apos;s Worst day
        </motion.h1>

        {/* First Set of Polygons (2, 3, 4, 5, 6) */}
        <AnimatePresence>
          {showFirstSet && (
            <>
              {/* Polygon 2 - comes from top, exits to top */}
              <motion.img
                initial={{ y: -300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -300, opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  ease: "easeOut"
                }}
                className="absolute top-[147px] left-[84px] w-[499px] h-[356px] z-20"
                alt="Decorative polygon shape"
                src={polygon2}
              />

              {/* Polygon 3 - comes from top, exits to top */}
              <motion.img
                initial={{ y: -300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -300, opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7,
                  ease: "easeOut"
                }}
                className="absolute top-[147px] left-[419px] w-[496px] h-96 z-20"
                alt="Decorative polygon shape"
                src={polygon3}
              />

              {/* Polygon 4 - comes from top, exits to top */}
              <motion.img
                initial={{ y: -300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -300, opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.9,
                  ease: "easeOut"
                }}
                className="absolute top-[147px] left-[869px] w-[451px] h-[426px] z-20"
                alt="Decorative polygon shape"
                src={polygon4}
              />

              {/* Polygon 5 - comes from left, exits to left */}
              <motion.img
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{ 
                  duration: 0.9, 
                  delay: 1.1,
                  ease: "easeOut"
                }}
                className="absolute top-[503px] left-[106px] w-[525px] h-[439px] z-20"
                alt="Decorative polygon shape"
                src={polygon5}
              />

              {/* Polygon 6 - comes from right, exits to right */}
              <motion.img
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ 
                  duration: 0.9, 
                  delay: 1.3,
                  ease: "easeOut"
                }}
                className="absolute top-[558px] left-[552px] w-[767px] h-[382px] object-cover z-20"
                alt="Decorative polygon overlay"
                src={polygon6}
              />
            </>
          )}
        </AnimatePresence>

        {/* Rectangle overlay */}
        <div
          className="absolute top-28 left-[21px] w-[1398px] h-[887px] bg-[url(/rectangle-49.svg)] bg-[100%_100%] pointer-events-none z-30"
          aria-hidden="true"
        />

        {/* Second Set of Polygons (7, 8) */}
        <AnimatePresence>
          {showSecondSet && (
            <>
              {/* Polygon 8 - comes from left */}
              <motion.img
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.9,
                  ease: "easeOut"
                }}
                className="left-[35px] w-[754px] absolute top-[180px] h-[640px] z-40"
                alt="Polygon 8"
                src={polygon8}
              />

              {/* Polygon 7 - comes from right */}
              <motion.img
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.9,
                  ease: "easeOut"
                }}
                className="left-[660px] w-[727px] absolute top-[180px] h-[640px] z-40"
                alt="Polygon 7"
                src={polygon7}
              />
            </>
          )}
        </AnimatePresence>

        {/* Text that appears when polygons 7 and 8 are visible */}
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-[853px] left-[77px] w-[1303px] h-[75px] z-50"
            >
              <div className="absolute top-0 left-0 w-full h-[75px] bg-[#d9d9d9] rounded-[30px] shadow-[0px_4px_4px_#00000040]" />
              <p 
                className="absolute top-2 left-[26px] right-[26px] font-normal text-black text-[32px] tracking-[0.64px] leading-[78px] whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontFamily: "'Rubik Bubbles', cursive" }}
              >
                You opened the CV he sent you three days ago and still saw nothing in it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        <AnimatePresence>
          {showNextButton && (
            <motion.button
              className="absolute top-[840px] left-[1130px] w-56 h-[84px] bg-[#e2e83e] rounded-[20px] cursor-pointer hover:opacity-90 transition-opacity z-50"
              aria-label="Go to next page"
              onClick={() => navigate('/level2/xsspage4')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span 
                className="block pt-[8px] font-normal text-black text-[60px] tracking-[0] leading-[27.4px] whitespace-nowrap"
                style={{ fontFamily: "'Rubik Bubbles', cursive" }}
              >
                next
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Xsspage3;