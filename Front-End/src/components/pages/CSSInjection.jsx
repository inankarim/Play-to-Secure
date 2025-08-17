import React from 'react';
import { useNavigate } from 'react-router-dom';

const CSSInjectionPage = () => {
  React.useEffect(() => {
    document.title = 'CSS Injection';
  }, []);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-page pt-14 px-6">
      <header className="container">
        <h1 className="text-4xl font-bold">CSS Injection</h1>
      </header>
      <section className="container mt-6">
        <button
          onClick={() => navigate('/detailed-vulnerability-css-injection')}
          className="bg-cta text-foreground px-6 py-2 rounded-full font-semibold"
        >
          Learn More
        </button>
      </section>
    </main>
  );
};

export default CSSInjectionPage;
