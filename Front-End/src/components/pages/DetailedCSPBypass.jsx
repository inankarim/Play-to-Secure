import React from 'react';

const DetailedCSPBypass = () => {
  React.useEffect(() => {
    document.title = 'Detailed CSP Bypass';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">Detailed CSP Bypass</h1>
      </header>
    </main>
  );
};

export default DetailedCSPBypass;
