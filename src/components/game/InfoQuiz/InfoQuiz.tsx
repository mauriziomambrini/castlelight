import TinyTable from '@/components/utils/TinyTable';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import { useTranslation } from 'react-i18next';
import s from './InfoQuiz.module.scss';

const InfoQuiz = () => {
  const { totalImages, quizState } = useQuizContext();
  const { currentImage, difficulty, level } = quizState;
  const { t } = useTranslation();

  const INFOS = [
    {
      key: 'difficulty',
      label: t('label.difficulty'),
      value: difficulty ? t(`label.difficulty_${difficulty}`) : '-',
    },
    {
      key: 'level',
      label: t('label.level'),
      value: level + 1,
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
      data={INFOS}
      size={['md']}
      col={['auto', '1fr']}
      gap={[0.25]}
    />
  );
};

export default InfoQuiz;
