import React from 'react';
import { NavigationButton } from '@/components/Vulnerabilities/XSS/DetailedVulnerability/NavigationButton';

const DetailedXSS = () => {
  React.useEffect(() => {
    document.title = 'Detailed XSS';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container text-center mb-14">
        <h1 className="text-[84px] font-normal text-foreground tracking-tight max-md:text-5xl">
          Detailed XSS
        </h1>
      </header>
      <NavigationButton />
    </main>
  );
};

export default DetailedXSS;
