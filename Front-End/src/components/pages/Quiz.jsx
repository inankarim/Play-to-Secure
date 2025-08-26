import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QuizHeader, QuizQuestion, QuizAnswers, QuizNavigation } from '@/components/Quiz';
import { useWorldProgress } from '@/components/hooks/useWorldProgress';
import { toast } from 'sonner';

const quizData = [
  {
    id: 'question-1',
    question:
      "Imagine you've been asked to review an application's configuration to ensure its security headers are correctly set. What kind of headers would you prioritize and why?",
    answers: [
      { id: 'sqli', text: 'SQLi', correct: false },
      { id: 'css-injection', text: 'CSS Injection', correct: true },
      { id: 'spacer', text: '', size: 'normal' },
      { id: 'csp-bypass', text: 'CSP Bypass', correct: false },
      { id: 'dom', text: 'DOM', size: 'large', correct: false },
    ],
  },
  {
    id: 'question-2',
    question:
      "What is the most effective way to prevent cross-site scripting vulnerabilities?",
    answers: [
      { id: 'sqli-2', text: 'Input validation only', correct: false },
      { id: 'css-injection-2', text: 'Output encoding', correct: true },
      { id: 'spacer-2', text: '', size: 'normal' },
      { id: 'csp-bypass-2', text: 'Using HTTP only', correct: false },
      { id: 'dom-2', text: 'Disable JavaScript', size: 'large', correct: false },
    ],
  },
  {
    id: 'question-3',
    question:
      "Which security mechanism helps prevent clickjacking attacks?",
    answers: [
      { id: 'sqli-3', text: 'CSRF tokens', correct: false },
      { id: 'css-injection-3', text: 'X-Frame-Options', correct: true },
      { id: 'spacer-3', text: '', size: 'normal' },
      { id: 'csp-bypass-3', text: 'HTTPS only', correct: false },
      { id: 'dom-3', text: 'Input validation', size: 'large', correct: false },
    ],
  },
];

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const vulnerability = searchParams.get('vulnerability');
  const level = parseInt(searchParams.get('level') || '1');
  
  const { awardStarsAndUnlock } = useWorldProgress(vulnerability || 'default');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

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

  // Map vulnerability parameter to correct route
  const getGameRoute = (vulnerabilityParam) => {
    const routeMap = {
      'domclobbering': '/game/dom-clobbering',
      'sqli': '/game/sqli',
      'nosqli': '/game/nosqli',
      'xss': '/game/xss',
      'idor': '/game/idor',
      'cssinjection': '/game/css-injection',
      'cspbypass': '/game/csp-bypass',
      'clickjacking': '/game/clickjacking',
      'cdntampering': '/game/cdn-tampering'
    };
    return routeMap[vulnerabilityParam?.toLowerCase()] || '/game';
  };

  const handleComplete = () => {
    if (isCompleted) return;
    
    // Calculate stars based on correct answers
    let correctAnswers = 0;
    quizData.forEach((question) => {
      const selectedAnswer = answers[question.id];
      const correctAnswer = question.answers.find(answer => answer.correct);
      if (selectedAnswer === correctAnswer?.id) {
        correctAnswers++;
      }
    });

    // Award stars: 3 stars for all correct, 2 stars for 2/3 correct, 1 star for 1/3 correct, 0 stars for none
    let stars = 0;
    if (correctAnswers === quizData.length) stars = 3;
    else if (correctAnswers >= Math.ceil(quizData.length * 0.66)) stars = 2;
    else if (correctAnswers >= Math.ceil(quizData.length * 0.33)) stars = 1;
    else stars = 0;

    awardStarsAndUnlock(level, stars);
    setIsCompleted(true);
    
    if (stars > 0) {
      toast.success(`Level ${level} complete! You earned ${stars} star${stars !== 1 ? 's' : ''}. Next level unlocked!`);
    } else {
      toast.error('Quiz failed! You need to answer at least 1 question correctly to earn a star and unlock the next level.');
    }
    
    // Navigate back to the correct vulnerability game map after a delay
    setTimeout(() => {
      const gameRoute = getGameRoute(vulnerability);
      navigate(gameRoute);
    }, 3000);
  };

  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < quizData.length - 1 && answers[currentQuestion.id];
  const allQuestionsAnswered = quizData.every(question => answers[question.id]);

  return (
    <main className="flex flex-col overflow-hidden items-stretch pr-1.5 py-[53px]">
      <div className="relative flex flex-col min-h-[871px] items-center text-xl font-normal pb-[162px] px-20 max-md:max-w-full max-md:pb-[100px] max-md:px-5">
        <div className="ellipse absolute left-1/2 -translate-x-1/2 top-[45%] -translate-y-1/2 z-0" aria-hidden="true" />
        <div className="relative z-10 flex mt-[-11px] w-full max-w-[1014px] flex-col items-center -mb-8 max-md:max-w-full max-md:mb-2.5">
          <QuizHeader />
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4 text-center text-muted-foreground">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </div>
            <QuizQuestion question={currentQuestion.question} questionId={currentQuestion.id} />
            <QuizAnswers
              answers={currentQuestion.answers}
              selectedAnswer={answers[currentQuestion.id] || null}
              onAnswerSelect={handleAnswerSelect}
              questionId={currentQuestion.id}
            />
          </form>
        </div>
      </div>

      <QuizNavigation 
        onPrevious={handlePrevious} 
        onNext={handleNext} 
        canGoPrevious={canGoPrevious} 
        canGoNext={canGoNext}
        onComplete={allQuestionsAnswered && !isCompleted ? handleComplete : undefined}
        isLastQuestion={currentQuestionIndex === quizData.length - 1}
      />
    </main>
  );
};

export default QuizPage;