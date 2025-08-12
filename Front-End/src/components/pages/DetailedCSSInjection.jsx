import React from 'react';

const DetailedCSSInjection = () => {
  React.useEffect(() => {
    document.title = 'Detailed CSS Injection';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">Detailed CSS Injection</h1>
      </header>
    </main>
  );
};

export default DetailedCSSInjection;
