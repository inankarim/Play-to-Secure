import React from 'react';

const DetailedXSS = () => {
  React.useEffect(() => {
    document.title = 'Detailed XSS';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">Detailed XSS</h1>
      </header>
    </main>
  );
};

export default DetailedXSS;
