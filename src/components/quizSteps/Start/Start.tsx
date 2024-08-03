import Button from '@/components/buttons/Button';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import { useQuizContext } from '@/hooks/useQuizContext';
import type { DifficultyTypes } from '@/types/quizTypes.ts';
import { useTranslation } from 'react-i18next';
import s from './Start.module.scss';

const Start = () => {
  const { setDifficulty } = useQuizContext();
  const { t } = useTranslation();
  const difficultyLevels: DifficultyTypes[] = ['easy', 'medium', 'hard'];

  return (
    <Flex className={s.wrapper} direction={'column'} align={'center'} gap={[3]}>
      <Flex
        className={s.wrapText}
        direction={'column'}
        align={'center'}
        gap={[1]}
      >
        <Typo
          className={s.title}
          text={t('start.title')}
          size={'db'}
          weight={'bold'}
          balancer={true}
        />
        <Typo
          className={s.mobileText}
          text={t('start.mobile_text')}
          size={'lg'}
          lineHeight={'paragraph'}
          balancer={true}
        />
        <Typo
          className={s.desktopText}
          text={t('start.desktop_text')}
          size={'lg'}
          balancer={true}
        />
      </Flex>
      <div className={s.wrapBtn}>
        {difficultyLevels.map((level) => {
          return (
            <Button
              key={level}
              classNames={{ button: s.btn }}
              label={t(`action.difficulty_${level}`)}
              onClick={() => setDifficulty(level)}
              theme={'outline'}
            />
          );
        })}
      </div>
    </Flex>
  );
};

export default Start;
