import LangSwitch from '@/components/LangSwitch/LangSwitch.tsx';
import Typo from '@/components/typography/Typo';
import useFormat from '@/hooks/useFormat.ts';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import type { Classnames } from '@/types/compoentsTypes.ts';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

export interface IHeader {
  countdown?: number;
  classNames?: Classnames<'wrapper'>;
}

const Header = (props: IHeader) => {
  const { classNames } = props;
  const { question, difficulty, showImage, countdown } = useQuizContext();
  const formattedTime = useFormat(countdown || 0); // Passa il countdown a useFormat

  const renderLangSwitch = () => {
    return <LangSwitch classNames={{ wrapper: s.lang }} />;
  };

  const renderLogo = () => {
    return (
      <Link className={s.logo} to={'/'}>
        <Typo text={'LOGO'} />
        {difficulty && <Typo text={difficulty} />}
        {question && <Typo text={question.image} />}
        {/*<Logo name={logo} maxHeight={1.5} />*/}
      </Link>
    );
  };

  const renderInfo = () => {
    return <div className={s.info}>{renderLogo()}</div>;
  };

  const renderCountDown = () => {
    if (!showImage) return null;
    if (!countdown) return null;
    const isPulsing = countdown > 0 && countdown <= 10;
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
      {renderInfo()}
      {renderCountDown()}
    </div>
  );
};

export default Header;
