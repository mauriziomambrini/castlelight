import type {
  TypoColorType,
  TypoFamilyType,
  TypoLineHeightType,
  TypoSizeType,
  TypoTagType,
  TypoWeightType,
} from '@/types/compoentsTypes';
import { createElement, useMemo } from 'react';
import Balancer from 'react-wrap-balancer';

import s from './Typo.module.scss';

import cx from 'classnames';

export interface ITypo {
  text: string | number;
  tag?: TypoTagType;
  family?: TypoFamilyType;
  size?: TypoSizeType;
  weight?: TypoWeightType;
  lineHeight?: TypoLineHeightType;
  color?: TypoColorType;
  balancer?: boolean;
  className?: string;
}

const Typo = (props: ITypo) => {
  const {
    text,
    tag = 'span',
    family = 'main',
    size = 'df',
    weight = 'regular',
    lineHeight = 'default',
    color = 'default',
    balancer = false,
    className,
  } = props;

  const typoProps = useMemo(() => {
    return {
      className: cx(s.typo, className),
      style: {
        '--lc': `var(--c-${color})`,
        '--lff': `var(--ff-${family})`,
        '--lfs': `var(--fs-${size})`,
        '--lfw': `var(--fw-${weight})`,
        '--llh': lineHeight === 'default' ? '0.25rem' : '0.5em',
      },
    };
  }, [family, size, weight, lineHeight, color, className]);

  const getText = () => {
    if (balancer) {
      return <Balancer>{text}</Balancer>;
    }

    return text;
  };

  return createElement(tag, typoProps, getText());
};

export default Typo;
