import React, { useRef } from "react";
import { ChevronDown } from 'lucide-react';

// Import all images
import arrow1 from "../assets/sqli/arrow-1.svg";
import arrow2 from "../assets/sqli/arrow-2.svg";
import arrow3 from "../assets/sqli/arrow-3.svg";
import arrow4 from "../assets/sqli/arrow-4.svg";
import arrow6 from "../assets/sqli/arrow-6.svg";
import arrow7 from "../assets/sqli/arrow-7.svg";
import attacker from "../assets/sqli/attacker.png";
import bigbanner from "../assets/sqli/bigbanner.png";
import database from "../assets/sqli/database.png";
import form from "../assets/sqli/form.png";
import line1 from "../assets/sqli/line-1.svg";
import line2 from "../assets/sqli/line-2.svg";
import line3 from "../assets/sqli/line-3.svg";
import line4 from "../assets/sqli/line-4.svg";
import rectangle3 from "../assets/sqli/rectangle-3.svg";
import rectangle6 from "../assets/sqli/rectangle-6.svg";
import rectangle7 from "../assets/sqli/rectangle-7.svg";
import sqliBackground from "../assets/sqli/sqlibackground.png";

const SQLiLvl1 = () => {
  const diagramRef = useRef(null);

  const scrollToDiagram = () => {
    diagramRef.current?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="overflow-y-auto h-screen">
      {/* First Section - Banner */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${sqliBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%'
        }}
      >
        <img
          className="w-full max-w-[1100px] h-auto px-4"
          alt="SQL Injection Attack Banner"
          src={bigbanner}
        />

        {/* Scroll Button */}
        <button 
          onClick={scrollToDiagram}
          className="mt-8 bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105 flex items-center gap-2 animate-pulse"
        >
          <span>Learn How It Works</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </section>

      {/* Second Section - Diagram */}
      <section 
        ref={diagramRef}
        className="relative min-h-screen flex items-center justify-center py-20"
        style={{
          backgroundImage: `url(${sqliBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%'
        }}
      >
        <div className="relative w-full max-w-[1190px] h-[929px] mx-auto">
          {/* Attacker */}
          <img
            className="absolute top-[189px] left-0 w-[248px] h-[456px]"
            alt="Attacker illustration"
            src={attacker}
          />

          {/* Database */}
          <img
            className="absolute top-[189px] right-0 w-[236px] h-[236px]"
            alt="Database illustration"
            src={database}
          />

          {/* Password Box */}
          <div className="absolute top-[494px] right-[222px] w-[221px] h-[35px] bg-[#dfd2d0] rounded-[30px] border-[3px] border-solid border-[#f31212]" />
          <div className="absolute top-[495px] right-[240px] w-[186px] font-['Madimi_One'] text-[#920000] text-xl text-center">
            All passwords
          </div>

          {/* Username Box */}
          <div className="absolute top-[570px] right-[239px] w-[221px] h-[35px] bg-[#dfd2d0] rounded-[30px] border-[3px] border-solid border-[#f31212]" />
          <div className="absolute top-[574px] right-[256px] w-[186px] font-['Madimi_One'] text-[#920000] text-xl text-center">
            All usernames
          </div>

          {/* Login Form */}
          <img
            className="absolute top-[168px] left-[378px] w-[248px] h-[278px]"
            alt="Login form illustration"
            src={form}
          />

          {/* Injection Attack Label */}
          <img
            className="absolute top-[108px] left-[9px] w-[347px] h-[60px]"
            alt=""
            src={rectangle3}
          />
          <h3 className="absolute top-[114px] left-[46px] font-['Madimi_One'] text-white text-4xl text-center">
            Injection ATTACK
          </h3>

          {/* How SQL INJECTION occurs */}
          <img
            className="absolute top-0 left-[341px] w-[476px] h-[70px]"
            alt=""
            src={rectangle7}
          />
          <h2 className="absolute top-1.5 left-[365px] font-['Madimi_One'] text-white text-4xl text-center">
            How SQL INJECTION occurs
          </h2>

          {/* Database Label */}
          <img
            className="absolute top-[146px] right-[121px] w-[284px] h-[43px]"
            alt=""
            src={rectangle6}
          />
          <p className="absolute top-[132px] right-[194px] w-[178px] font-['Madimi_One'] text-white text-[32px] text-center">
            DATABASE
          </p>

          {/* Arrows and Lines */}
          <img className="absolute top-[313px] right-[23px] w-0.5 h-[202px]" alt="" src={arrow2} />
          <img className="absolute top-[515px] right-[21px] w-[201px] h-px" alt="" src={arrow3} />
          <img className="absolute top-[515px] left-[670px] w-[77px] h-px" alt="" src={arrow4} />
          <img className="absolute top-[587px] right-[121px] w-[118px] h-0.5" alt="" src={arrow6} />
          <img className="absolute top-[515px] right-[124px] w-px h-[74px]" alt="" src={line1} />
          <img className="absolute top-[580px] left-[670px] w-[63px] h-px" alt="" src={line2} />
          <img className="absolute top-[420px] left-[670px] w-0.5 h-[163px]" alt="" src={line3} />
          <img className="absolute top-[417px] left-[248px] w-[127px] h-0.5" alt="" src={arrow7} />
          <img className="absolute top-[421px] left-[375px] w-[296px] h-px" alt="" src={line4} />
          <img className="absolute top-[311px] right-[123px] w-[101px] h-1" alt="" src={arrow1} />

          {/* Description Box */}
          <div className="absolute top-[645px] left-[19px] right-[12px] h-[284px] bg-[#78503e] rounded-[30px] border-[5px] border-solid border-white shadow-[0px_4px_4px_#ffffff]" />
          <p className="absolute top-[666px] left-[75px] right-[75px] font-['Lakki_Reddy'] text-white text-[40px] leading-relaxed">
            SQL injection (SQLi) is a web security vulnerability that allows an
            attacker to interfere with the queries that an application makes to
            its database. This can allow an attacker to view data that they are
            not normally able to retrieve.
          </p>
        </div>

        {/* Continue Button */}
        <button 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all hover:scale-105"
        >
          Continue to Training →
        </button>
      </section>
    </div>
  );
};

export default SQLiLvl1;