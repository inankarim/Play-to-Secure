import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuizService } from '../store/useQuizService'; // Use your quiz service to fetch data
import QuestionShow from '../components/QuestionShow';
import Answer from '../components/Answer';
import ProgressBar from '../components/ProgressBar';
import axiosInstance from '../lib/axios';

const QuizPage = () => {
  const { category } = useParams();
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [historyState, setHistoryState] = useState({});
  const [difficulty, setDifficulty] = useState('Easy');
  const [level, setLevel] = useState(1);

  // Fetch the next question
  const { getNextQuestion, submitAnswer } = useQuizService;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/flow/next?category=${category}&difficulty=${difficulty}&level=${level}`);
        setQuestions(response.data.data.question);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [category, difficulty, level]);

  const handleAnswerSubmit = async () => {
    const result = await submitAnswer(questions[questionIndex]._id, selectedAnswer);
    if (result.isCorrect) {
      setScore(score + questions[questionIndex].points);
    }
    setIsSubmitted(true);

    // Update historyState to track completed questions
    setHistoryState({
      ...historyState,
      [questions[questionIndex]._id]: {
        selectedAnswer,
        isCorrect: result.isCorrect,
      },
    });
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      // If all questions for this level are answered, move to next level
      if (difficulty === 'Easy' && level === 1) {
        setLevel(2);
      } else if (difficulty === 'Easy' && level === 2) {
        setDifficulty('Medium');
        setLevel(1);
      } else if (difficulty === 'Medium' && level === 1) {
        setDifficulty('Hard');
        setLevel(1);
      } else {
        history.push(`/quiz/done`);
      }
    }
  };

  return (
    <div className="quiz-page">
      <h1>{category} Quiz</h1>
      <ProgressBar current={questionIndex + 1} total={questions.length} />

      <div className="question-section">
        <QuestionShow question={questions[questionIndex]} />
        <Answer
          question={questions[questionIndex]}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          onSubmit={handleAnswerSubmit}
        />
      </div>

      {isSubmitted && (
        <div>
          <p>{`Your answer is ${selectedAnswer === questions[questionIndex].correctAnswer ? 'correct' : 'incorrect'}`}</p>
          <button onClick={handleNext}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
