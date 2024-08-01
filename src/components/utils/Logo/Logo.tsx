import type { Classnames } from '@/types/compoentsTypes';
import cx from 'classnames';
import type { CSSProperties, FC, ReactElement } from 'react';
import Svg from 'react-inlinesvg';
import s from './Logo.module.scss';

export interface ILogo {
  name?: string;
  maxHeight?: number;
  classNames?: Classnames<'wrapper' | 'logo'>;
}

const Logo: FC<ILogo> = (props: ILogo): ReactElement => {
  const { name, maxHeight, classNames } = props;
  const src = name || '';
  return (
    <div
      className={cx(s.wrapper, classNames?.wrapper)}
      style={{ '--lh-max': `${maxHeight}rem` } as CSSProperties}
    >
      <Svg className={cx(s.logo, classNames?.logo)} src={src} />
    </div>
  );
};

export default Logo;
