import React from 'react';

const DetailedNoSQLi = () => {
  React.useEffect(() => {
    document.title = 'Detailed NoSQLi';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">Detailed NoSQLi</h1>
      </header>
    </main>
  );
};

export default DetailedNoSQLi;
