import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import Layout from '@/components/layouts/Layout';
import MarkdownText from '@/components/typography/MarkdownText';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import Icon from '@/components/utils/Icon';
import TinyTable from '@/components/utils/TinyTable';
import { useNotion } from '@/hooks/useNotion.ts';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import useRecap from '@/hooks/useRecap.ts';
import useTimeFormat from '@/hooks/useTimeFormat.ts';
import type { ScoreTypes } from '@/types/quizTypes.ts';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import s from './Recap.module.scss';

const Recap = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    resetQuiz, // Ensure this is available
    quizState,
    calculateScore,
  } = useQuizContext();
  const { score, successRate } = calculateScore();
  const { difficulty, totalTime } = quizState;
  const { pathRef, pathLength, dashOffset, animatedSuccessRate, resultData } =
    useRecap();
  const { submitScore } = useNotion();
  const [playerName, setPlayerName] = useState('');
  const timeFormdatted = useTimeFormat(totalTime || 0, true);
  const isoDate = new Date().toISOString().split('.')[0];

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const scoreData: ScoreTypes = {
      name: playerName,
      difficulty: difficulty || 'Unknown',
      score: score,
      success_rate: successRate,
      date: isoDate,
      time: totalTime || 0,
    };

    try {
      await submitScore(scoreData);
      // Reset quiz and navigate after successful submission
      resetQuiz();
      navigate('/scores');
    } catch (error) {
      // Handle error if needed
      console.error('Failed to submit score:', error);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setPlayerName(inputValue);
  };

  const renderProgressBar = () => {
    return (
      <div className={s.progressBar}>
        <svg width='100%' height='100%' viewBox='0 0 160 160'>
          <path
            d={
              'M34.047,126.686c-11.766,-11.766 -19.047,-28.016 -19.047,-45.953c0,-35.875 29.126,-65 65,-65c35.874,0 65,29.125 65,65c0,17.937 -7.281,34.187 -19.047,45.953'
            }
            fill='none'
            stroke='var(--c-grey-5)'
            strokeWidth='1.5rem'
            strokeLinecap='round'
          />
          <path
            ref={pathRef}
            d={
              'M34.047,126.686c-11.766,-11.766 -19.047,-28.016 -19.047,-45.953c0,-35.875 29.126,-65 65,-65c35.874,0 65,29.125 65,65c0,17.937 -7.281,34.187 -19.047,45.953'
            }
            fill='none'
            stroke={'var(--c-grey)'}
            strokeWidth='1rem'
            strokeLinecap='round'
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>
    );
  };

  const renderIcon = () => {
    return <Icon className={s.img} name={resultData.image} />;
  };

  const renderScore = () => {
    return (
      <Typo
        className={s.score}
        text={`${animatedSuccessRate}%`}
        size='db'
        weight='semi'
      />
    );
  };

  const renderInfo = () => {
    const INFOS = [
      {
        key: 'difficulty',
        label: t('label.difficulty'),
        value: difficulty ? t(`label.difficulty_${difficulty}`) : '-',
      },
      {
        key: 'time',
        label: t('label.time'),
        value: totalTime ? timeFormdatted : '-',
      },
    ];

    return (
      <TinyTable
        classNames={{ wrapper: s.tinyTable }}
        data={INFOS}
        size={['md']}
        col={['auto', '1fr']}
        gap={[0.25]}
      />
    );
  };

  const renderTitle = () => {
    return (
      <Typo
        className={s.title}
        text={t(`recap.${resultData.text}.title`)}
        tag={'h1'}
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
        text={t(`recap.${resultData.text}.text`)}
        baseSize={'lg'}
      />
    );
  };

  const renderForm = () => {
    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          placeholder={t('input.placeholder.name_annals')}
          value={playerName}
          onChange={handleNameChange}
          maxLength={20}
        />
        <Button
          classNames={{ button: s.btnForm }}
          type={'submit'}
          label={t('action.submit_score')}
          theme={'outline'}
        />
      </form>
    );
  };

  return (
    <Layout>
      <Flex
        className={s.wrapper}
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={[2]}
      >
        <div className={s.wrapProgress}>
          {renderProgressBar()}
          {renderIcon()}
          {renderScore()}
          {renderInfo()}
        </div>

        <Flex
          className={s.wrapText}
          direction={'column'}
          align={'center'}
          gap={[1]}
        >
          {renderTitle()}
          {renderText()}
        </Flex>
        {renderForm()}
      </Flex>
    </Layout>
  );
};

export default Recap;
