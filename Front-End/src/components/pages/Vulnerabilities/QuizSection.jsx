import React, { useState } from 'react';

const quizQuestions = [
  {
    id: 1,
    question: "Which vulnerability involves injecting malicious SQL commands into database queries?",
    options: ["XSS", "SQLi", "IDOR", "CSRF"],
    correctAnswer: 1,
    explanation: "SQL Injection (SQLi) involves inserting malicious SQL commands into application queries to manipulate the database."
  },
  {
    id: 2,
    question: "What does XSS stand for?",
    options: ["Cross-Site Scripting", "Cross-Site Security", "Extended Security System", "External Script Source"],
    correctAnswer: 0,
    explanation: "XSS stands for Cross-Site Scripting, a vulnerability that allows attackers to inject malicious scripts into web pages."
  },
  {
    id: 3,
    question: "Which attack tricks users into clicking on hidden elements?",
    options: ["SQL Injection", "Clickjacking", "CSRF", "DOM Clobbering"],
    correctAnswer: 1,
    explanation: "Clickjacking tricks users into clicking on hidden elements by overlaying transparent frames over legitimate content."
  }
];

export const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (!quizStarted) {
    return (
      <section className="self-center flex w-full justify-center mt-10">
        <button
          onClick={startQuiz}
          className="bg-cta text-primary-foreground font-bold uppercase tracking-wide py-3 px-10 rounded-[10px] transition-opacity duration-200 hover:opacity-90"
          aria-label="Open quiz"
        >
          QUIZ
        </button>
      </section>
    );
  }

  if (showResult) {
    return (
      <section className="self-center flex flex-col items-center max-w-md mx-auto mt-[29px] p-6 bg-card text-card-foreground rounded-lg shadow-lg border border-border">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-xl mb-4">
          Your Score: {score} / {quizQuestions.length}
        </div>
        <div className="text-lg mb-6 text-center text-muted-foreground">
          {score === quizQuestions.length 
            ? "Perfect! You have excellent knowledge of web security vulnerabilities."
            : score >= quizQuestions.length / 2
            ? "Good job! Keep learning about web security."
            : "Keep studying! Web security is crucial for developers."}
        </div>
        <button
          onClick={resetQuiz}
          className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded transition-colors duration-200 hover:brightness-105"
        >
          Take Quiz Again
        </button>
      </section>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
  <section className="self-center flex flex-col items-center max-w-2xl mx-auto mt-[29px] p-6 bg-card text-card-foreground rounded-lg shadow-lg border border-border">
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Security Quiz</h2>
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
        ></div>
      </div>
    </div>

    <h3 className="text-lg font-semibold mb-6 text-center">
      {question.question}
    </h3>

    <div className="w-full space-y-3 mb-6">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerSelect(index)}
          className={`w-full p-3 text-left rounded-lg border transition-colors duration-200 ${
            selectedAnswer === index
              ? 'bg-accent border-accent text-accent-foreground'
              : 'bg-background border-border hover:bg-muted text-foreground'
          }`}
        >
          {option}
        </button>
      ))}
    </div>

    <button
      onClick={handleNextQuestion}
      disabled={selectedAnswer === null}
      className={`px-6 py-2 rounded font-semibold transition-colors duration-200 ${
        selectedAnswer !== null
          ? 'bg-primary hover:brightness-110 text-primary-foreground'
          : 'bg-muted text-muted-foreground cursor-not-allowed'
      }`}
    >
      {currentQuestion + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}
    </button>
  </section>
  );
};

export default QuizSection;
