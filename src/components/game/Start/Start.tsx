import Button from '@/components/buttons/Button';
import MarkdownText from '@/components/typography/MarkdownText';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import { useQuizContext } from '@/hooks/useQuizContext';
import useTouchDevice from '@/hooks/useTouchDevice.ts';
import type { DifficultyTypes } from '@/types/quizTypes.ts';
import { useTranslation } from 'react-i18next';
import s from './Start.module.scss';

const Start = () => {
  const { t } = useTranslation();
  const { fillQuizState } = useQuizContext();
  const isTouch = useTouchDevice();
  const difficultyLevels: DifficultyTypes[] = ['easy', 'medium', 'hard'];

  const renderTitle = () => {
    return (
      <Typo
        className={s.title}
        text={t('start.title')}
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
        text={isTouch ? t('start.mobile_text') : t('start.desktop_text')}
        baseSize={'lg'}
      />
    );
  };

  const renderDifficulty = () => {
    return (
      <div className={s.wrapBtn}>
        {difficultyLevels.map((level) => {
          return (
            <Button
              key={level}
              classNames={{ button: s.btn }}
              label={t(`action.difficulty_${level}`)}
              onClick={() => fillQuizState('difficulty', level)}
              theme={'outline'}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Flex className={s.wrapper} direction={'column'} align={'center'} gap={[3]}>
      <Flex
        className={s.wrapText}
        direction={'column'}
        align={'center'}
        gap={[1]}
      >
        {renderTitle()}
        {renderText()}
      </Flex>
      {renderDifficulty()}
    </Flex>
  );
};

export default Start;
