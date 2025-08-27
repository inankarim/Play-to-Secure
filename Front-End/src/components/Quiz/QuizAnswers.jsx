import React from 'react';

export const QuizAnswers = ({ answers, selectedAnswer, onAnswerSelect, questionId }) => {
  return (
    <fieldset className="flex w-full items-center justify-center gap-9 flex-wrap mt-4">
      <legend className="sr-only">Choose your answer</legend>
      {answers.map((answer) => {
        if (answer.id === 'spacer' || (typeof answer.id === 'string' && answer.id.includes('spacer'))) {
          return <div key={answer.id} className="hidden" aria-hidden />;
        }
        const selected = selectedAnswer === answer.id;
        return (
          <label
            key={answer.id}
            className={`option-pill ${selected ? 'option-pill--selected' : ''} ${answer.size === 'large' ? 'text-[13px]' : ''}`}
            htmlFor={`${questionId}-${answer.id}`}
          >
            <input
              type="radio"
              id={`${questionId}-${answer.id}`}
              name={questionId}
              value={answer.id}
              checked={!!selected}
              onChange={() => onAnswerSelect(answer.id)}
              className="sr-only"
              aria-describedby={questionId}
            />
            <span>{answer.text}</span>
          </label>
        );
      })}
    </fieldset>
  );
};
