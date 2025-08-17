import React from 'react';

const DetailedSQLi = () => {
  React.useEffect(() => {
    document.title = 'Detailed SQLi';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">Detailed SQLi</h1>
      </header>
    </main>
  );
};

export default DetailedSQLi;
