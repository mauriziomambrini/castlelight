import Layout from '@/components/layouts/Layout';
import Typo from '@/components/typography/Typo';
import { useTranslation } from 'react-i18next';
import s from './Scores.module.scss';
// import { useNavigate } from 'react-router-dom';

const Scores = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const { scores, error, loading, fetchScores } = useNotion();

  // useEffect(() => {
  //   fetchScores();
  // }, []);
  //
  // if (loading) return <Layout>{t('Loading...')}</Layout>;
  // if (error) return <Layout>{t(`Error: ${error}`)}</Layout>;

  const scores = [
    {
      name: 'Player',
      difficulty: 'easy',
      score: 10,
      success_rate: 90,
      date: '2024-08-21',
      time: '00:05:00',
    },
  ];

  const renderTitle = () => {
    return (
      <Typo
        className={s.title}
        text={t('scores.title')}
        size={'db'}
        weight={'bold'}
        balancer={true}
      />
    );
  };

  return (
    <Layout>
      {renderTitle()}
      {scores.map((score, index) => (
        <tr key={index}>
          <td>{score.name}</td>
          <td>{score.difficulty}</td>
          <td>{score.success_rate}%</td>
          <td>{score.date}</td>
        </tr>
      ))}
    </Layout>
  );
};

export default Scores;
