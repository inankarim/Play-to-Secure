import React from 'react';

const DetailedIDOR = () => {
  React.useEffect(() => {
    document.title = 'Detailed IDOR';
  }, []);

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">Detailed IDOR</h1>
      </header>
    </main>
  );
};

export default DetailedIDOR;
