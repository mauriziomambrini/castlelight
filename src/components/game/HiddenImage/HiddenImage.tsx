import Icon from '@/components/utils/Icon';
import useTouchDevice from '@/hooks/useTouchDevice'; // Assicurati che il percorso dell'import sia corretto
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
  const isTouchDevice = useTouchDevice(); // Usa l'hook per rilevare i dispositivi touch

  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (cursorRef.current) {
      const { clientX, clientY } = event;
      const { style } = cursorRef.current;
      style.setProperty('--lx-cursor', `${clientX}px`);
      style.setProperty('--ly-cursor', `${clientY}px`);
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (cursorRef.current) {
      const { clientX, clientY } = event.touches[0];
      const { style } = cursorRef.current;
      style.setProperty('--lx-cursor', `${clientX}px`);
      style.setProperty('--ly-cursor', `${clientY}px`);
    }
  };

  const handleTouchStart = () => {
    if (cursorRef.current) {
      cursorRef.current.style.visibility = 'visible';
    }
  };

  const handleTouchEnd = () => {
    if (cursorRef.current) {
      cursorRef.current.style.visibility = 'hidden';
    }
  };

  useLayoutEffect(() => {
    const addTouchListeners = () => {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
    };

    const removeTouchListeners = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    const addMouseListeners = () => {
      document.addEventListener('mousemove', handleMouseMove);
    };

    const removeMouseListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };

    isTouchDevice ? addTouchListeners() : addMouseListeners();

    return () => {
      isTouchDevice ? removeTouchListeners() : removeMouseListeners();
    };
  }, [isTouchDevice]);

  return (
    <div className={cx(s.wrapper, classNames?.wrapper, s[difficulty])}>
      <div className={s.light} ref={cursorRef} />
      <Icon className={s.img} name={image} />
    </div>
  );
};

export default HiddenImage;
