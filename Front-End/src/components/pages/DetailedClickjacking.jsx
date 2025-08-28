import React from 'react';

const DetailedClickjacking = () => {
  React.useEffect(() => {
    document.title = 'Detailed Clickjacking';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">Detailed Clickjacking</h1>
      </header>
    </main>
  );
};

export default DetailedClickjacking;
