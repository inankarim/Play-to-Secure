import React from 'react';

export const QuizQuestion = ({ question, questionId }) => {
  return (
    <section className="q-panel">
      <h2 id={questionId}>{question}</h2>
    </section>
  );
};
