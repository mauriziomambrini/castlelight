import Radio from '@/components/inputs/Radio';
import Typo from '@/components/typography/Typo';
import Flex from '@/components/utils/Flex';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import { useTranslation } from 'react-i18next';
import s from './QuestionsList.module.scss';

const QuestionsList = () => {
  const { t } = useTranslation();
  const { question, handleAnswer, quizState } = useQuizContext();
  const { currentQuestion, userAnswers } = quizState;

  const shuffledOptions = question?.options
    ? [...question.options].sort(() => Math.random() - 0.5)
    : [];

  const selectedAnswer = userAnswers[currentQuestion];

  return (
    <Flex
      className={s.wrapper}
      direction={'column'}
      justify={'center'}
      align={'center'}
      gap={[1]}
    >
      <Typo
        className={s.title}
        text={t('questions_list.title')}
        size={'db'}
        weight={'bold'}
        balancer={true}
      />
      {shuffledOptions.map((option) => {
        return (
          <Radio
            key={option}
            name={option}
            value={option}
            label={t(`answer_${option}`)}
            onClick={() => handleAnswer(option)}
            checked={selectedAnswer === option}
          />
        );
      })}
    </Flex>
  );
};

export default QuestionsList;
