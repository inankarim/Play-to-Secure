import React from 'react';

export const HeroSection = () => {
  return (
    <section className="w-full max-w-[1247px] mx-auto px-6 flex flex-col items-center text-center mt-2">
      {/* Title pill */}
      <div className="gradient-title rounded-[14px] px-8 py-3 shadow-fig-2 inline-block">
        <h1 className="text-strong text-3xl md:text-5xl font-bold">Common Web Vulnerabilities</h1>
      </div>

      {/* Description */}
      <p className="mt-8 max-w-4xl text-strong text-lg md:text-xl leading-relaxed">
        Modern web applications face a variety of security threats that can lead to data breaches, account
        takeovers, and service disruption if not addressed. Understanding these risks is the first step toward
        building safer systems.
      </p>

      {/* Prompt banner */}
      <div className="mt-8 w-full max-w-4xl gradient-prompt rounded-[18px] px-6 py-5 shadow-fig-1">
        <p className="text-white font-extrabold text-xl md:text-2xl">
          Choose a vulnerability from the list below to explore in detail.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
