import Layout from '@/components/layouts/Layout';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import Tabs from '@/components/utils/Tabs';
import type { ITab } from '@/components/utils/Tabs/Tabs.tsx';
import { useNotion } from '@/hooks/useNotion.ts';
import type { DifficultyTypes } from '@/types/quizTypes.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './Scores.module.scss';
// import { useNavigate } from 'react-router-dom';

// const MOCKSCORES = [
//   {
//     id: 'aA',
//     name: 'Player',
//     success_rate: 90,
//     time: 5.596,
//   },
//   {
//     id: 'bB',
//     name: 'Player 2',
//     success_rate: 90,
//     time: 5.596,
//   },
// ];

const Scores = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { error, loading, fetchScores, getTopScores } = useNotion();
  const [difficulty, setDifficulty] = useState<DifficultyTypes>('hard');
  const scores = getTopScores(difficulty);

  useEffect(() => {
    fetchScores();
  }, []);

  if (loading) return <Layout>{t('Loading...')}</Layout>;
  if (error) return <Layout>{t(`Error: ${error}`)}</Layout>;

  const handleTab = (tab: ITab<DifficultyTypes>) => {
    setDifficulty(tab.value);
  };

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

  const renderTabs = () => {
    return (
      <Tabs
        classNames={{ wrapper: s.tabs }}
        tabs={['hard', 'medium', 'easy'].map((tab) => ({
          key: tab,
          label: t(`label.difficulty_${tab}`),
          value: tab as DifficultyTypes,
          active: difficulty === tab,
        }))}
        onClick={handleTab}
      />
    );
  };

  const renderHeaderTable = () => {
    const COLUMNS = ['rank', 'name', 'success_rate', 'time'];

    return (
      <div className={s.headerTable}>
        {COLUMNS.map((col) => {
          return (
            <Typo
              key={col}
              text={t(`label.${col}`)}
              size={'md'}
              weight={'regular'}
            />
          );
        })}
      </div>
    );
  };

  const renderRowsTable = () => {
    return scores.map((score, index) => {
      const RANK = index + 1;
      const SUCCESS_RATE = `${score.success_rate}%`;

      return (
        <div className={s.rowTable} key={score.id}>
          <Typo text={RANK} size={'df'} weight={'bold'} />
          <Typo text={score.name} size={'df'} weight={'bold'} />
          <Typo text={SUCCESS_RATE} size={'df'} weight={'bold'} />
          <Typo text={score.time} size={'df'} weight={'bold'} />
        </div>
      );
    });
  };

  const renderTable = () => {
    return (
      <div className={s.table}>
        {renderHeaderTable()}
        {renderRowsTable()}
      </div>
    );
  };

  return (
    <Layout>
      <Flex
        className={s.wrapper}
        direction={'column'}
        // justify={'center'}
        align={'center'}
        gap={[2]}
      >
        {renderTitle()}
        {renderTabs()}
        {renderTable()}
      </Flex>
    </Layout>
  );
};

export default Scores;
