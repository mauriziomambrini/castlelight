import {
  type CSSProperties,
  type FC,
  type ReactElement,
  type ReactNode,
  createElement,
} from 'react';

import cx from 'classnames';
import s from './Flex.module.scss';

export interface IFlex {
  children: ReactNode;
  tag?: 'div' | 'footer' | 'header' | 'section' | 'article' | 'aside' | 'form';

  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number[];
  className?: string;
}

const Flex: FC<IFlex> = (props: IFlex): ReactElement => {
  const {
    children,
    tag = 'div',
    direction = 'row',
    justify = 'flex-start',
    align = 'flex-start',
    wrap = 'nowrap',
    gap = [0],
    className,
    ...rest
  } = props;

  const flexProps = {
    ...rest,
    className: cx(s.wrapper, className),
    style: {
      '--l-direction': direction,
      '--l-justify': justify,
      '--l-align': align,
      '--l-row-gap': gap[0],
      '--l-column-gap': gap[1] ?? gap[0],
      '--l-wrap': wrap,
    } as CSSProperties,
  };
  return createElement(tag, flexProps, children);
};

export default Flex;
