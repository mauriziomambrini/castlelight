import * as IMAGES from '@/assets/images';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layouts/Layout';
import MarkdownText from '@/components/typography/MarkdownText';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import Icon from '@/components/utils/Icon';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import s from './Recap.module.scss';

const Recap = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { calculateScore, resetQuiz } = useQuizContext();
  const { successRate } = calculateScore();

  const [pathLength, setPathLength] = useState(0);
  const [dashOffset, setDashOffset] = useState(0);
  const [animatedSuccessRate, setAnimatedSuccessRate] = useState(0);

  const pathRef = useRef<SVGPathElement>(null);

  const resultData = useMemo(() => {
    switch (true) {
      case successRate >= 75:
        return {
          text: 'excellent',
          image: IMAGES.characterKnightSword,
        };
      case successRate >= 50:
        return {
          text: 'good',
          image: IMAGES.characterArcherArrow,
        };
      case successRate >= 25:
        return {
          text: 'normal',
          image: IMAGES.characterSoldierLance,
        };
      default:
        return {
          text: 'bad',
          image: IMAGES.characterFarmer,
        };
    }
  }, [successRate]);

  const animate = (timestamp: number, startTimestamp: number) => {
    const elapsed = timestamp - startTimestamp;
    const progress = Math.min(elapsed / 2000, 1);

    const currentRate = Math.floor(progress * successRate);
    setAnimatedSuccessRate(currentRate);

    const currentOffset = pathLength - (pathLength * currentRate) / 100;
    setDashOffset(currentOffset);

    if (progress < 1) {
      requestAnimationFrame((newTimestamp) =>
        animate(newTimestamp, startTimestamp),
      );
    }
  };

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      setDashOffset(length);
    }
  }, []);

  useEffect(() => {
    if (pathLength > 0) {
      requestAnimationFrame((timestamp) => animate(timestamp, timestamp));
    }
  }, [pathLength, successRate]);

  const handleReset = () => {
    resetQuiz();
    navigate('/game'); // Redirect to the quiz start page
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

  const renderTitle = () => {
    return (
      <Typo
        className={s.title}
        text={t(`recap.${resultData.text}.title`)}
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

  const renderCta = () => {
    return (
      <Button
        classNames={{ button: s.btn }}
        label={t('action.restart')}
        onClick={handleReset}
        theme={'outline'}
      />
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
        {renderCta()}
      </Flex>
    </Layout>
  );
};

export default Recap;
