import Icon from '@/components/utils/Icon';
import type { Classnames } from '@/types/compoentsTypes.ts';
import type { DifficultyTypes } from '@/types/quizTypes.ts';
import cx from 'classnames';
import { useLayoutEffect, useRef } from 'react';
import s from './HiddenImage.module.scss';

export interface IHiddenImage {
  image: string;
  difficulty?: DifficultyTypes;
  classNames?: Classnames<'wrapper'>;
}

const HiddenImage = (props: IHiddenImage) => {
  const { image, difficulty = 'easy', classNames } = props;

  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (cursorRef.current) {
      const { clientX, clientY } = event;
      const { style } = cursorRef.current;
      style.setProperty('--lx-cursor', `${clientX}px`);
      style.setProperty('--ly-cursor', `${clientY}px`);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={cx(s.wrapper, classNames?.wrapper, s[difficulty])}>
      <div className={s.cursor} ref={cursorRef} />
      <Icon className={s.img} name={image} />
    </div>
  );
};

export default HiddenImage;
