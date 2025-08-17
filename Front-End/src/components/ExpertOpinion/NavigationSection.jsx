import React from 'react';
import { Button } from '@/components/ui/button';

const NavigationSection = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  const handleQuizClick = () => {
    // Placeholder for quiz navigation or modal
    console.log('Quiz button clicked');
  };

  return (
    <nav className="container flex justify-center gap-4 mt-6">
      <Button variant="gradient" className="uppercase tracking-wider" onClick={handleBackClick} aria-label="Go back to previous page">
        Back
      </Button>
      <Button variant="gradient" className="uppercase tracking-wider" onClick={handleQuizClick} aria-label="Start quiz">
        Quiz
      </Button>
    </nav>
  );
};

export default NavigationSection;
