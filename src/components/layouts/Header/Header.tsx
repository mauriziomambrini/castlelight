import * as IMAGES from '@/assets/images';
import LangSwitch from '@/components/LangSwitch/LangSwitch.tsx';
import Typo from '@/components/typography/Typo';
import useFormat from '@/hooks/useFormat.ts';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import type { Classnames } from '@/types/compoentsTypes.ts';
import cx from 'classnames';

import Logo from '@/components/utils/Logo';
import { useNavigate } from 'react-router-dom';
import s from './Header.module.scss';

export interface IHeader {
  countdown?: number;
  classNames?: Classnames<'wrapper'>;
}

const Header = (props: IHeader) => {
  const { classNames } = props;
  const navigate = useNavigate();
  const { countdown, quizState, resetQuiz } = useQuizContext();
  const { showImage } = quizState;
  const formattedTime = useFormat(countdown || 0);

  const handleClick = () => {
    resetQuiz();
    navigate('/');
  };

  const renderLangSwitch = () => {
    return <LangSwitch classNames={{ wrapper: s.lang }} />;
  };

  const renderLogo = () => {
    return (
      <div className={s.logo} onClick={() => handleClick()}>
        <Logo name={IMAGES.logo} maxHeight={1.5} />
      </div>
    );
  };

  const renderCountDown = () => {
    if (!showImage) return null;
    if (!countdown) return null;
    const isPulsing = countdown > 0 && countdown <= 5;
    return (
      <Typo
        className={cx(s.countdown, { [s.pulse]: isPulsing })}
        text={formattedTime}
        size={'xxl'}
        weight={'semi'}
      />
    );
  };

  return (
    <div className={cx(s.wrapper, classNames?.wrapper)}>
      {renderLangSwitch()}
      {renderLogo()}
      {renderCountDown()}
    </div>
  );
};

export default Header;
