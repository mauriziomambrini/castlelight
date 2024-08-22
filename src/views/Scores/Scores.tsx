import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import MarkdownText from '@/components/typography/MarkdownText';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import Tabs from '@/components/utils/Tabs';
import type { ITab } from '@/components/utils/Tabs/Tabs.tsx';
import { useNotion } from '@/hooks/useNotion.ts';
import useTimeFormat from '@/hooks/useTimeFormat.ts';
import type { DifficultyTypes } from '@/types/quizTypes.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Scores.module.scss';

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

const VALID_DIFFICULTIES: DifficultyTypes[] = ['hard', 'medium', 'easy'];

const Scores = () => {
  const { t } = useTranslation();
  const { error, loading, fetchScores, getTopScores } = useNotion();
  const navigate = useNavigate();
  const location = useLocation();
  const [difficulty, setDifficulty] = useState<DifficultyTypes>('hard');
  const scores = getTopScores(difficulty);
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    fetchScores();
  }, []);

  // Set difficulty based on query string
  useEffect(() => {
    const queryDifficulty = searchParams.get('dfy') as DifficultyTypes;
    if (!queryDifficulty) return;
    if (!VALID_DIFFICULTIES.includes(queryDifficulty)) return;
    setDifficulty(queryDifficulty);
  }, [location.search]);

  const handleTab = (tab: ITab<DifficultyTypes>) => {
    setDifficulty(tab.value);
    searchParams.set('dfy', tab.value);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const renderTitle = (type: 'scores' | 'loading' | 'error') => {
    return (
      <Typo
        className={s.title}
        text={t(`${type}.title`)}
        size={'db'}
        weight={'bold'}
        balancer={true}
      />
    );
  };

  const renderText = () => {
    return (
      <MarkdownText
        classNames={{ text: s.text }}
        text={t('scores.text')}
        baseSize={'df'}
        linkTarget={'_self'}
      />
    );
  };

  const renderTabs = () => {
    return (
      <Tabs
        classNames={{ wrapper: s.tabs }}
        tabs={VALID_DIFFICULTIES.map((tab) => ({
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
      const TIME_FORMATED = useTimeFormat(score.time, true);

      return (
        <div className={s.rowTable} key={score.id}>
          <Typo text={RANK} size={'df'} weight={'bold'} />
          <Typo text={score.name} size={'df'} weight={'bold'} />
          <Typo text={SUCCESS_RATE} size={'df'} weight={'bold'} />
          <Typo text={TIME_FORMATED} size={'df'} weight={'bold'} />
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

  const renderLoading = () => {
    if (!loading) return null;
    return (
      <Flex
        className={s.wrapperLoading}
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={[1]}
      >
        {renderTitle('loading')}
        <div className={s.barLoading}>
          <div />
        </div>
      </Flex>
    );
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <Flex
        className={s.wrapperLoading}
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={[1]}
      >
        {renderTitle('error')}
        <Typo text={error} size={'df'} weight={'regular'} balancer={true} />
        <Button
          label={t('action.reload_page')}
          onClick={() => window.location.reload()}
          theme={'outline'}
        />
      </Flex>
    );
  };

  const renderContent = () => {
    if (loading) return null;
    if (error) return null;
    return (
      <Flex
        className={s.wrapper}
        direction={'column'}
        align={'center'}
        gap={[2]}
      >
        <Flex
          className={s.wrapText}
          direction={'column'}
          align={'center'}
          gap={[0.5]}
        >
          {renderTitle('scores')}
          {renderText()}
        </Flex>
        {renderTabs()}
        {renderTable()}
      </Flex>
    );
  };

  return (
    <Layout>
      {renderLoading()}
      {renderError()}
      {renderContent()}
    </Layout>
  );
};

export default Scores;
