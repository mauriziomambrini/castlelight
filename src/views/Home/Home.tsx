import Game from '@/components/gameSteps/Game';
import Start from '@/components/gameSteps/Start';
import Layout from '@/components/layouts/Layout';
import { useQuizContext } from '@/hooks/useQuizContext';

const Home = () => {
  const { difficulty, userAnswers, question } = useQuizContext();

  const renderStart = () => {
    if (difficulty !== undefined) return null;
    return <Start />;
  };

  const renderGame = () => {
    if (difficulty === undefined) return null;
    return <Game />;
  };

  const renderRecap = () => {
    if (userAnswers.length !== question?.length) return null;
    return <div>{'RECAP'}</div>;
  };

  return (
    <Layout>
      {renderStart()}
      {renderGame()}
      {renderRecap()}
    </Layout>
  );
};

export default Home;
