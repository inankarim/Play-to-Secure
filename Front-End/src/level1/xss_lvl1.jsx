import React from "react";
import { motion } from "framer-motion";
import arrow9 from "../assets/xss_lvl1/arrow-9.png";
import arrow10 from "../assets/xss_lvl1/arrow-10.png";
import arrow11 from "../assets/xss_lvl1/arrow-11.svg";
import arrow12 from "../assets/xss_lvl1/arrow-12.svg";
import arrow13 from "../assets/xss_lvl1/arrow-13.svg";
import attackerXss from "../assets/xss_lvl1/attacker_xss.png";
import coderXss from "../assets/xss_lvl1/coder_xss.png";
import domBasedXss from "../assets/xss_lvl1/dom-based_xss.png";
import formXss from "../assets/xss_lvl1/form_xss.png";
import group2 from "../assets/xss_lvl1/group-2.png";
import reflectedXss from "../assets/xss_lvl1/reflected_xss.png";
import storedXss from "../assets/xss_lvl1/stored_xss.png";
import xssBackground from "../assets/xss_lvl1/xss_background.png";
import xssBackground2 from "../assets/xss_lvl1/xss_Background2.png";

const XSSlvl1 = () => {
  const xssTypes = [
    {
      image: reflectedXss,
      alt: "Reflected xss",
      top: "1150px",
      left: "131px",
      width: "354px",
      height: "503px",
      desc: "The malicious script comes from the current HTTP request.",
      descLeft: "115px",
      descTop: "1688px",
      descWidth: "359px",
      descHeight: "166px",
    },
    {
      image: storedXss,
      alt: "Stored xss",
      top: "1150px",
      left: "558px",
      width: "345px",
      height: "502px",
      desc: "The malicious script comes from the website's database.",
      descLeft: "544px",
      descTop: "1688px",
      descWidth: "359px",
      descHeight: "166px",
    },
    {
      image: domBasedXss,
      alt: "Dom based xss",
      top: "1150px",
      left: "973px",
      width: "346px",
      height: "504px",
      desc: "The vulnerability exists in client-side code rather than server-side code.",
      descLeft: "973px",
      descTop: "1688px",
      descWidth: "359px",
      descHeight: "166px",
    },
  ];

  return (
    <main className="bg-[#f5f0e2] w-full min-w-[1440px] min-h-[1955px] relative font-['Lakki_Reddy']">
      {/* -------- HOW XSS WORKS SECTION ---------- */}
      <section>
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[90px] left-[65px] w-[1301px] h-[872px]"
          alt=""
          src={xssBackground}
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute top-[766px] left-[79px] w-[1272px] h-[166px] bg-[#d04343] border-[5px] border-black" 
        />

        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute top-[70px] left-[235px] w-[975px] h-20 bg-[#b83535] border-[5px] border-black"
        >
          <h1 className="absolute top-[-13px] left-[212px] text-[64px] text-[#f5f0e2] font-normal text-center [-webkit-text-stroke:2px_#000] font-['Lakki_Reddy']">
            HOW XSS WORKS !!
          </h1>
        </motion.header>

        <motion.img
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-[245px] left-[137px] w-[289px] h-[277px]"
          alt="Attacker"
          src={attackerXss}
        />

        <motion.img
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-[221px] left-[961px] w-[358px] h-[358px] object-cover"
          alt="Developer"
          src={coderXss}
        />

        <motion.img
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          className="absolute top-[423px] left-[568px] w-[314px] h-[177px]"
          alt="Alert"
          src={group2}
        />

        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute top-[188px] left-[578px] w-[293px] h-[195px]"
          alt="Form"
          src={formXss}
        />

        {/* Arrows */}
        <motion.img 
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="absolute top-[305px] left-[885px]" 
          alt="" 
          src={arrow9} 
        />
        <motion.img 
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="absolute top-[320px] left-[370px]" 
          alt="" 
          src={arrow10} 
        />
        <motion.img 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
          className="absolute top-[587px] left-[692px]" 
          alt="" 
          src={arrow11} 
        />
        <motion.img 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.7 }}
          className="absolute top-[550px] left-[855px]" 
          alt="" 
          src={arrow12} 
        />
        <motion.img 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.8 }}
          className="absolute top-[556px] left-[545px]" 
          alt="" 
          src={arrow13} 
        />

        {/* Compromised Data */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.9, type: "spring", stiffness: 200 }}
          className="absolute top-[623px] left-[478px] w-[133px] h-8 bg-[#f5f0e2] border-[3px] border-black"
        >
          <div className="absolute top-[-2px] left-[15px] text-2xl font-['Lakki_Reddy']">Password</div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.0, type: "spring", stiffness: 200 }}
          className="absolute top-[628px] left-[849px] w-[166px] h-8 bg-[#f5f0e2] border-[3px] border-black"
        >
          <div className="absolute top-[-2px] left-[7px] text-2xl font-['Lakki_Reddy']">Wire Transfer</div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.1, type: "spring", stiffness: 200 }}
          className="absolute top-[682px] left-[646px] w-[165px] h-[29px] bg-[#f5f0e2] border-[3px] border-black"
        >
          <div className="absolute top-[-3px] left-[7px] text-2xl font-['Lakki_Reddy']">Sensitive Data</div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="absolute top-[768px] left-[83px] w-[1266px] text-[32px] text-white text-center [-webkit-text-stroke:1px_#000] font-['Lakki_Reddy']"
        >
          Cross-site scripting works by manipulating a vulnerable web site so that it
          returns malicious JavaScript to users. When the malicious code executes in a
          victim's browser, the attacker can fully compromise their interaction with
          the application.
        </motion.p>
      </section>

      {/* -------- TYPES OF XSS SECTION ---------- */}
      <section>
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[1057px] left-[69px] w-[1301px] h-[872px]"
          alt=""
          src={xssBackground2}
        />

        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7 }}
          className="absolute top-[1017px] left-[227px] w-[975px] h-20 bg-[#b83535] border-[5px] border-black"
        >
          <h2 className="absolute top-[-12px] left-[290px] text-[64px] text-[#f5f0e2] [-webkit-text-stroke:2px_#000] font-['Lakki_Reddy']">
            TYPES OF XSS
          </h2>
        </motion.header>

        {xssTypes.map((type, index) => (
          <motion.article 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.img
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={type.image}
              alt={type.alt}
              className="absolute"
              style={{ top: type.top, left: type.left, width: type.width, height: type.height }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="absolute bg-[#f5f0e2] border-[5px] border-black flex items-center justify-center"
              style={{ 
                top: type.descTop, 
                left: type.descLeft, 
                width: type.descWidth,
                height: type.descHeight
              }}
            >
              <p className="text-2xl text-center px-3 font-['Lakki_Reddy']">
                {type.desc}
              </p>
            </motion.div>
          </motion.article>
        ))}
      </section>

      {/* NEXT BUTTON */}
      <motion.button 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute top-[1863px] left-[1246px] w-[165px] h-[81px]"
      >
        <div className="absolute inset-0 bg-[#e2e83e] rounded-[20px] border-[3px] border-black" />
        <span className="absolute top-[12px] left-[40px] text-5xl font-bold font-['Rubik_Bubbles']">next</span>
      </motion.button>
    </main>
  );
};
export default XSSlvl1;