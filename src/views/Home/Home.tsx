import Layout from '@/components/layouts/Layout';
import Quiz from '@/components/quizSteps/Quiz';
import Recap from '@/components/quizSteps/Recap';
import Start from '@/components/quizSteps/Start';
import TinyTable from '@/components/utils/TinyTable';
import { useQuizContext } from '@/hooks/useQuizContext';
import { useTranslation } from 'react-i18next';
import s from './Home.module.scss';

const Home = () => {
  const { level, difficulty, currentImage, totalImages, userAnswers } =
    useQuizContext();
  const { t } = useTranslation();

  const renderStart = () => {
    if (difficulty !== undefined) return null;
    return <Start />;
  };

  const renderInfo = () => {
    if (difficulty === undefined) return null;
    if (userAnswers.length === totalImages) return null;

    const infos = [
      {
        key: 'difficulty',
        label: t('label.difficulty'),
        value: difficulty ? t(`label.difficulty_${difficulty}`) : '-',
      },
      {
        key: 'level',
        label: t('label.level'),
        value: level,
      },
      {
        key: 'image',
        label: t('label.image'),
        value: [currentImage, totalImages].join('/'),
      },
    ];

    return (
      <TinyTable
        classNames={{ wrapper: s.tinyTable }}
        data={infos}
        size={['md']}
        col={['auto', '1fr']}
        gap={[0.25]}
      />
    );
  };

  const renderGame = () => {
    if (difficulty === undefined) return null;
    if (userAnswers.length === totalImages) return null;
    return <Quiz />;
  };

  const renderRecap = () => {
    if (userAnswers.length !== totalImages) return null;
    return <Recap />;
  };

  return (
    <Layout>
      {renderInfo()}
      {renderStart()}
      {renderGame()}
      {renderRecap()}
    </Layout>
  );
};

export default Home;
