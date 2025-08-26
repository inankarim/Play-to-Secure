import React from 'react';

export const QuizNavigation = ({ onPrevious, onNext, canGoPrevious, canGoNext, onComplete, isLastQuestion }) => {
  return (
    <nav className="self-center flex w-full max-w-[1361px] items-center justify-between px-8 py-8">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`footer-btn footer-btn--prev ${!canGoPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Go to previous question"
      >
        Previous
      </button>
      {isLastQuestion && onComplete ? (
        <button
          onClick={onComplete}
          className="footer-btn footer-btn--next uppercase font-bold"
          aria-label="Complete quiz"
        >
          COMPLETE
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`footer-btn footer-btn--next uppercase font-bold ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Go to next question"
        >
          NEXT
        </button>
      )}
    </nav>
  );
};
