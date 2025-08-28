import React from 'react';

const QuoteSection = () => {
  return (
    <section className="container mt-4">
      <div className="bg-gradient-to-r from-[hsl(var(--quote-start))] to-[hsl(var(--quote-end))] rounded-md px-6 py-3 ring-2 ring-[hsl(var(--quote-end))] shadow-md">
        <blockquote className="text-xl font-semibold text-[hsl(var(--foreground))]">
          "Looks like that answer 2 missed the mark. Here's what really happens in DOM Clobbering:"
        </blockquote>
      </div>
    </section>
  );
};

export default QuoteSection;
