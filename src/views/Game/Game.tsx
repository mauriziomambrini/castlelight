import InfoQuiz from '@/components/game/InfoQuiz';
import Quiz from '@/components/game/Quiz';
import Start from '@/components/game/Start';
import Layout from '@/components/layouts/Layout';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const { difficulty, totalImages, userAnswers } = useQuizContext();
  const navigate = useNavigate();

  // Navigate to Recap route if quiz completed
  useEffect(() => {
    if (userAnswers.length === totalImages) {
      navigate('/recap');
    }
  }, [userAnswers, totalImages, navigate]);

  const renderStart = () => {
    if (difficulty !== undefined) return null;
    return <Start />;
  };

  const renderQuiz = () => {
    if (difficulty === undefined) return null;
    if (userAnswers.length === totalImages) return null;
    return (
      <Fragment>
        <InfoQuiz />
        <Quiz />
      </Fragment>
    );
  };

  return (
    <Layout>
      {renderStart()}
      {renderQuiz()}
    </Layout>
  );
};

export default Game;
