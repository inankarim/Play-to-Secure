import React from 'react';
import { Brain } from 'lucide-react';

const ExpertOpinion = () => {
  return (
    <header className="container">
      <div className="mx-auto max-w-4xl w-full rounded-xl bg-gradient-to-r from-[hsl(var(--warm-start))] to-[hsl(var(--warm-end))] text-[hsl(var(--foreground))] shadow ring-2 ring-[hsl(var(--quote-end))] px-6 py-4 flex items-center justify-center gap-3">
        <Brain aria-hidden className="h-7 w-7" />
        <h1 className="text-6xl max-md:text-4xl font-semibold">Expert Opinion</h1>
      </div>
    </header>
  );
};

export default ExpertOpinion;
