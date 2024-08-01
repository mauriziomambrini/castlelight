import type { CSSProperties, FC, ReactElement } from 'react';

import s from './Divider.module.scss';

import type {
  Classnames,
  ColorType,
  DividerThemeType,
} from '@/types/compoentsTypes';
import cx from 'classnames';

export interface IDivider {
  theme?: DividerThemeType;
  spacing?: number[];
  color?: ColorType;
  classNames?: Classnames<'wrapper'>;
}

const Divider: FC<IDivider> = (props: IDivider): ReactElement => {
  const {
    theme = 'line',
    spacing = [1.5],
    color = 'grey-4',
    classNames,
  } = props;

  const renderLine = () => {
    if (theme === 'space') return null;
    return <div className={s.line} />;
  };

  return (
    <div
      className={cx(classNames?.wrapper, s.wrapper, s[theme])}
      style={
        {
          '--ls': spacing
            .map((value) => value + 'rem')
            .filter(Boolean)
            .join(' '),
          '--lc-line': `var(--c-${color})`,
        } as CSSProperties
      }
    >
      {renderLine()}
    </div>
  );
};

export default Divider;
