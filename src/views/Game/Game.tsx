import Layout from '@/components/layouts/Layout';
import { questions } from '@/data/questions';
import { useQuiz } from '@/hooks/useQuiz';
import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const difficulty = 'easy';

  const {
    currentQuestion,
    question,
    showImage,
    quizStarted,
    countdown,
    handleAnswer,
    userAnswers,
    calculateScore,
    startQuiz,
  } = useQuiz(questions, difficulty);

  useEffect(() => {
    startQuiz();
  }, [currentQuestion]);

  useEffect(() => {
    if (userAnswers.length === questions.length) {
      navigate('/recap', { state: { userAnswers, questions } });
    }
  }, [userAnswers]);

  return (
    <Layout countDown={countdown}>
      {showImage ? (
        <figure
          style={{ width: '50%', maxHeight: '100dvh', background: 'orange' }}
        >
          <img
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            src={question.image}
            alt='quiz'
          />
        </figure>
      ) : (
        quizStarted && (
          <div>
            <h2>Select the correct answer:</h2>
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )
      )}
    </Layout>
  );
};

export default Game;
