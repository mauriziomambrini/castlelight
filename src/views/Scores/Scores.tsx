import Layout from '@/components/layouts/Layout';
import { useNotion } from '@/hooks/useNotion.ts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Scores = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { scores, error, loading, fetchScores } = useNotion();

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  if (loading) return <Layout>{t('Loading...')}</Layout>;
  if (error) return <Layout>{t(`Error: ${error}`)}</Layout>;

  return (
    <Layout>
      {'SCORES'}
      {scores.map((score, index) => (
        <tr key={index}>
          <td>{score.name}</td>
          <td>{score.difficulty}</td>
          <td>{score.score}</td>
          <td>{score.success_rate}%</td>
          <td>{score.date}</td>
          <td>{score.time}</td>
        </tr>
      ))}
    </Layout>
  );
};

export default Scores;
