import React, { useState } from 'react';
import { QuizHeader, QuizQuestion, QuizAnswers, QuizNavigation } from '@/components/Quiz';

const quizData = [
  {
    id: 'question-1',
    question:
      "Imagine you've been asked to review an application's configuration to ensure its security headers are correctly set. What kind of headers would you prioritize and why?",
    answers: [
      { id: 'sqli', text: 'SQLi' },
      { id: 'css-injection', text: 'CSS Injection' },
      { id: 'spacer', text: '', size: 'normal' },
      { id: 'csp-bypass', text: 'CSP Bypass' },
      { id: 'dom', text: 'DOM', size: 'large' },
    ],
  },
  {
    id: 'question-2',
    question:
      "Imagine you've been asked to review an application's configuration to ensure its security headers are correctly set. What kind of headers would you prioritize and why?",
    answers: [
      { id: 'sqli-2', text: 'SQLi' },
      { id: 'css-injection-2', text: 'CSS Injection' },
      { id: 'spacer-2', text: '', size: 'normal' },
      { id: 'csp-bypass-2', text: 'CSP Bypass' },
      { id: 'dom-2', text: 'DOM', size: 'large' },
    ],
  },
  {
    id: 'question-3',
    question:
      "Imagine you've been asked to review an application's configuration to ensure its security headers are correctly set. What kind of headers would you prioritize and why?",
    answers: [
      { id: 'sqli-3', text: 'SQLi' },
      { id: 'css-injection-3', text: 'CSS Injection' },
      { id: 'spacer-3', text: '', size: 'normal' },
      { id: 'csp-bypass-3', text: 'CSP Bypass' },
      { id: 'dom-3', text: 'DOM', size: 'large' },
    ],
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerSelect = (answerId) => {
    if (answerId === 'spacer' || (typeof answerId === 'string' && answerId.includes('spacer'))) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < quizData.length - 1;

  return (
    <main className="flex flex-col overflow-hidden items-stretch pr-1.5 py-[53px]">
      <div className="relative flex flex-col min-h-[871px] items-center text-xl font-normal pb-[162px] px-20 max-md:max-w-full max-md:pb-[100px] max-md:px-5">
        <div className="ellipse absolute left-1/2 -translate-x-1/2 top-[45%] -translate-y-1/2 z-0" aria-hidden="true" />
        <div className="relative z-10 flex mt-[-11px] w-full max-w-[1014px] flex-col items-center -mb-8 max-md:max-w-full max-md:mb-2.5">
          <QuizHeader />
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <QuizQuestion question={currentQuestion.question} questionId={currentQuestion.id} />
            <QuizAnswers
              answers={currentQuestion.answers}
              selectedAnswer={answers[currentQuestion.id] || null}
              onAnswerSelect={handleAnswerSelect}
              questionId={currentQuestion.id}
            />
            {quizData.slice(1).map((question) => (
              <React.Fragment key={question.id}>
                <QuizQuestion question={question.question} questionId={question.id} />
                <QuizAnswers
                  answers={question.answers}
                  selectedAnswer={answers[question.id] || null}
                  onAnswerSelect={(answerId) => {
                    if (answerId === 'spacer' || (typeof answerId === 'string' && answerId.includes('spacer'))) return;
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: answerId,
                    }));
                  }}
                  questionId={question.id}
                />
              </React.Fragment>
            ))}
          </form>
        </div>
      </div>

      <QuizNavigation onPrevious={handlePrevious} onNext={handleNext} canGoPrevious={canGoPrevious} canGoNext={canGoNext} />
    </main>
  );
};

export default QuizPage;
