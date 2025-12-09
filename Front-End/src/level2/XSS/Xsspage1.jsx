import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import div1 from "../../assets/XSSNo1/div1.png";
import div2 from "../../assets/XSSNo1/div2.png";
import div3 from "../../assets/XSSNo1/div3.png";
import div4 from "../../assets/XSSNo1/div4.png";
import div5 from "../../assets/XSSNo1/div5.png";
import div6 from "../../assets/XSSNo1/div6.png";
import div7 from "../../assets/XSSNo1/div7.png";
import div8 from "../../assets/XSSNo1/div8.png";
import div9 from "../../assets/XSSNo1/div9.png";
import group43 from "../../assets/XSSNo1/Group 43.png";
import vector137 from "../../assets/XSSNo1/Vector 137.svg";
import vector161 from "../../assets/XSSNo1/Vector 161.svg";

const Xsspage1 = () => {
  const [visiblePanels, setVisiblePanels] = useState([]);
  const [scale, setScale] = useState(1);
  const [showFinalPage, setShowFinalPage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rubik+Bubbles&family=Coiny&family=Dokdo&display=swap';
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
    // Show panels one by one with 5 second intervals for better readability
    const delays = [1000, 6000, 11000, 16000, 21000, 26000, 31000, 36000];
    
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setVisiblePanels(prev => [...prev, index + 1]);
      }, delay);
    });

    // After all panels are shown, wait 5 more seconds before showing final page
    setTimeout(() => {
      setShowFinalPage(true);
    }, 41000);
  }, []);

  // Animation variants for appearing effect
  const panelVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut"
      }
    }
  };

  // Bounce animation for div9
  const div9Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.0
      }
    }
  };

  // Fade out animation for comic panels
  const fadeOutVariants = {
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hidden: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="bg-[#ebe5d9] w-screen h-screen fixed inset-0 overflow-hidden flex items-center justify-center">
      <div 
        className="relative w-[1440px] h-[1024px]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div
          className="absolute top-[114px] left-7 w-[1390px] h-[885px] bg-white"
          role="presentation"
        />

        <h1 className="absolute top-7 left-[280px] w-[926px] font-normal text-black text-5xl tracking-[0] leading-[27.4px]"
            style={{ fontFamily: "'Rubik Bubbles', cursive" }}>
          The XSS Attack: A Coder&apos;s Worst day
        </h1>

        <AnimatePresence>
          {!showFinalPage && (
            <motion.div
              initial="visible"
              animate="visible"
              exit="hidden"
              variants={fadeOutVariants}
            >
              {/* Panel 1 - div1 */}
              <motion.img
                className="absolute top-[213px] left-[57px] w-[331px] h-[212px] aspect-[1.56] border-4 border-black rounded-lg"
                alt="Comic panel showing programmer at desk thinking about pushing an update"
                src={div1}
                initial="hidden"
                animate={visiblePanels.includes(1) ? "visible" : "hidden"}
                variants={panelVariants}
              />

              <div
                className="absolute top-[197px] left-[457px] w-[461px] h-[246px] bg-[url(/rectangle-49.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <div
                className="top-[464px] left-[451px] w-[428px] h-72 absolute bg-[url(/image.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <div
                className="top-[197px] left-8 w-[366px] h-[234px] absolute bg-[url(/rectangle-49-2.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <div
                className="top-[462px] left-[30px] w-[376px] h-[442px] absolute bg-[url(/rectangle-49-3.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <div
                className="top-[172px] left-[987px] w-[400px] h-[388px] absolute bg-[url(/rectangle-49-4.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <div
                className="top-[578px] left-[927px] w-[236px] h-[257px] absolute bg-[url(/rectangle-49-5.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <div
                className="top-[578px] left-[1177px] w-[230px] h-[387px] absolute bg-[url(/rectangle-49-6.svg)] bg-[100%_100%]"
                role="presentation"
              />

              {/* Panel 2 - div2 */}
              <motion.img
                className="absolute top-[205px] left-[465px] w-[431px] h-[225px] aspect-[1.91] border-4 border-black rounded-lg"
                alt="Comic panel showing programmer looking confused and worried"
                src={div2}
                initial="hidden"
                animate={visiblePanels.includes(2) ? "visible" : "hidden"}
                variants={panelVariants}
              />

              <img
                className="absolute top-36 left-[780px] w-[181px] h-[106px]"
                alt="Speech bubble decoration"
                src={vector137}
              />

              {/* Panel 3 - div3 */}
              <motion.img
                className="absolute top-[180px] left-[955px] w-[434px] h-[376px] aspect-[1.16] border-4 border-black rounded-lg"
                alt="Comic panel showing server down error message on computer screen"
                src={div3}
                initial="hidden"
                animate={visiblePanels.includes(3) ? "visible" : "hidden"}
                variants={panelVariants}
              />

              {/* Panel 4 - div4 */}
              <motion.img
                className="absolute top-[474px] left-[42px] w-[356px] h-[418px] aspect-[0.85] border-4 border-black rounded-lg"
                alt="Comic panel showing programmer receiving urgent phone call from boss"
                src={div4}
                initial="hidden"
                animate={visiblePanels.includes(4) ? "visible" : "hidden"}
                variants={panelVariants}
              />

              {/* Panel 5 - div5 */}
              <motion.img
                className="absolute top-[473px] left-[468px] w-[397px] h-[273px] aspect-[1.45] border-4 border-black rounded-lg"
                alt="Comic panel showing programmer checking phone with server down notification"
                src={div5}
                initial="hidden"
                animate={visiblePanels.includes(5) ? "visible" : "hidden"}
                variants={panelVariants}
              />

              {/* Panel 6 - div6 */}
              <motion.img
                className="absolute top-[584px] left-[936px] w-[217px] h-[246px] aspect-[0.88] border-4 border-black rounded-lg"
                alt="Comic panel showing angry boss on video call"
                src={div6}
                initial="hidden"
                animate={visiblePanels.includes(6) ? "visible" : "hidden"}
                variants={panelVariants}
              />

              {/* Panel 7 - div7 */}
              <motion.img
                className="absolute top-[595px] left-[1187px] w-[211px] h-[337px] aspect-[0.62] object-cover border-4 border-black rounded-lg"
                alt="Comic panel showing programmer being fired"
                src={div7}
                initial="hidden"
                animate={visiblePanels.includes(7) ? "visible" : "hidden"}
                variants={panelVariants}
              />

              <img
                className="absolute top-[164px] left-[277px] w-[149px] h-[78px]"
                alt="Thought bubble decoration"
                src={vector161}
              />

              <p className="absolute top-[181px] left-[299px] w-[133px] font-normal text-black text-xs tracking-[0] leading-[23px]"
                 style={{ fontFamily: "'Coiny', cursive" }}>
                Just need to push this update...
              </p>

              <img
                className="absolute w-[158px] h-[110px] top-[550px] left-[1038px]"
                alt="Speech bubble with exclamation"
                src={group43}
              />

              <p className="absolute top-[573px] left-[1077px] w-[86px] font-normal text-black text-xs tracking-[0] leading-[23px]"
                 style={{ fontFamily: "'Coiny', cursive" }}>
                only you have access to the server!!!
              </p>

              <p className="absolute top-[172px] left-[804px] font-normal text-black text-xs tracking-[0] leading-[23px]"
                 style={{ fontFamily: "'Coiny', cursive" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wait!!!!
                <br />
                What is Happening!!!
              </p>

              <div
                className="top-[122px] left-2.5 w-[1398px] h-[877px] absolute bg-[url(/rectangle-49-7.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <div
                className="top-[859px] left-[936px] w-[217px] h-[120px] absolute bg-[url(/rectangle-49-9.svg)] bg-[100%_100%]"
                role="presentation"
              />

              <section
                className="absolute top-[772px] left-[457px] w-[424px] h-[193px]"
                aria-label="Comic story description"
              >
                <p className="absolute top-1 left-[11px] w-[405px] font-normal text-black text-[32px] tracking-[0] leading-[23px] border-4 border-black rounded-lg p-3 bg-white"
                   style={{ fontFamily: "'Dokdo', cursive" }}>
                  Programmer Leo thought his weekend was set. But a critical XSS
                  vulnerability had other plans... and now, the main server is down. His
                  boss is on the line, and Leo is about to learn the price of a single
                  line of bad code.
                </p>

                <div
                  className="top-0 left-0 w-[422px] h-[193px] absolute bg-[url(/rectangle-49-8.svg)] bg-[100%_100%]"
                  role="presentation"
                />
              </section>

              {/* Panel 8 - div8 */}
              <motion.img
                className="absolute top-[863px] left-[966px] w-[185px] h-28 aspect-[1.65] border-4 border-black rounded-lg"
                alt="Comic panel showing termination notice"
                src={div8}
                initial="hidden"
                animate={visiblePanels.includes(8) ? "visible" : "hidden"}
                variants={panelVariants}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Page with div9 */}
        <AnimatePresence>
          {showFinalPage && (
            <>
              <div className="absolute top-[122px] left-5 w-[1398px] h-[877px] bg-[url(/rectangle-49.svg)] bg-[100%_100%]" />
              
              <motion.div
                className="absolute top-[143px] left-14 w-[1330px] h-[828px]"
                initial="hidden"
                animate="visible"
                variants={div9Variants}
              >
                <img
                  className="w-full h-full aspect-[1.61]"
                  alt="XSS Attack Warning Illustration"
                  src={div9}
                />
              </motion.div>
              
              <motion.button
                className="absolute top-[840px] left-[1130px] w-56 h-[84px] bg-[#e2e83e] rounded-[20px] cursor-pointer hover:opacity-90 transition-opacity"
                aria-label="Go to next page"
                onClick={() => navigate('/level2/xsspage2')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="block pt-[8px] font-normal text-black text-[60px] tracking-[0] leading-[27.4px] whitespace-nowrap"
                      style={{ fontFamily: "'Rubik Bubbles', cursive" }}>
                  next
                </span>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Xsspage1;