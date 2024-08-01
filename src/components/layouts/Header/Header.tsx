import Typo from '@/components/typography/Typo';
import type { Classnames } from '@/types/compoentsTypes.ts';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

export interface IHeader {
  countDown?: string;
  classNames?: Classnames<'wrapper'>;
}

const Header = (props: IHeader) => {
  const { countDown, classNames } = props;

  const renderLogo = () => {
    return (
      <Link className={s.logo} to={'/'}>
        <Typo text={'LOGO'} />
        {/*<Logo name={logo} maxHeight={1.5} />*/}
      </Link>
    );
  };

  const renderCountDown = () => {
    if (!countDown) return null;
    return <Typo text={countDown} />;
  };

  return (
    <div className={cx(s.wrapper, classNames?.wrapper)}>
      {renderLogo()}
      {renderCountDown()}
    </div>
  );
};

export default Header;
