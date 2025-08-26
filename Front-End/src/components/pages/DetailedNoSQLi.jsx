import React from 'react';
import { NavigationButton } from '@/components/Vulnerabilities/NoSQLi/DetailedVulnerability/NavigationButton';

const DetailedNoSQLi = () => {
  React.useEffect(() => {
    document.title = 'Detailed NoSQLi';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container text-center mb-14">
        <h1 className="text-[84px] font-normal text-foreground tracking-tight max-md:text-5xl">
          Detailed NoSQLi
        </h1>
      </header>
      <NavigationButton />
    </main>
  );
};

export default DetailedNoSQLi;
