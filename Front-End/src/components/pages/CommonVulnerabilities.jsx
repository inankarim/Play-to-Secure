import React from 'react';
import HeroSection from './Vulnerabilities/HeroSection';
import VulnerabilityGrid from './Vulnerabilities/VulnerabilityGrid';
import QuizSection from './Vulnerabilities/QuizSection';

const CommonVulnerabilities = () => {
  React.useEffect(() => {
    document.title = 'Common Web Vulnerabilities';
  }, []);

  return (
    <main className="relative bg-app-radial min-h-screen px-6 py-10">
      {/* Subtle centered background spot */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-spot rounded-full w-[min(85vw,900px)] h-[min(85vw,900px)] blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col overflow-hidden items-stretch">
        <HeroSection />
        <VulnerabilityGrid />
        <QuizSection />
      </div>
    </main>
  );
};

export default CommonVulnerabilities;
