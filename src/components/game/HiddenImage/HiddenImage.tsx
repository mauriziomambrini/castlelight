import Icon from '@/components/utils/Icon';
import useTouchDevice from '@/hooks/useTouchDevice'; // Assicurati che il percorso dell'import sia corretto
import type { Classnames } from '@/types/compoentsTypes.ts';
import type { DifficultyTypes } from '@/types/quizTypes.ts';
import cx from 'classnames';
import { type CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import s from './HiddenImage.module.scss';

export interface IHiddenImage {
  image: string;
  difficulty?: DifficultyTypes;
  classNames?: Classnames<'wrapper'>;
}

const HiddenImage = (props: IHiddenImage) => {
  const { image, difficulty = 'easy', classNames } = props;
  const isTouchDevice = useTouchDevice();
  const cursorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isCursorVisible, setIsCursorVisible] = useState(false); // Stato per la visibilità

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
    setIsCursorVisible(true); // Rende visibile il cursore al touch start
  };

  const handleTouchEnd = () => {
    setIsCursorVisible(false); // Nasconde il cursore al touch end
  };

  useLayoutEffect(() => {
    const wrapperElement = wrapperRef.current;

    if (wrapperElement) {
      const addTouchListeners = () => {
        wrapperElement.addEventListener('touchmove', handleTouchMove);
        wrapperElement.addEventListener('touchstart', handleTouchStart);
        wrapperElement.addEventListener('touchend', handleTouchEnd);
      };

      const removeTouchListeners = () => {
        wrapperElement.removeEventListener('touchmove', handleTouchMove);
        wrapperElement.removeEventListener('touchstart', handleTouchStart);
        wrapperElement.removeEventListener('touchend', handleTouchEnd);
      };

      const addMouseListeners = () => {
        wrapperElement.addEventListener('mousemove', handleMouseMove);
      };

      const removeMouseListeners = () => {
        wrapperElement.removeEventListener('mousemove', handleMouseMove);
      };

      if (isTouchDevice) {
        addTouchListeners();
      } else {
        addMouseListeners();
      }

      return () => {
        if (isTouchDevice) {
          removeTouchListeners();
        } else {
          removeMouseListeners();
        }
      };
    }
  }, [isTouchDevice]);

  return (
    <div
      className={cx(s.wrapper, classNames?.wrapper, s[difficulty])}
      style={
        {
          '--lop-light': isCursorVisible && isTouchDevice ? 1 : 0,
        } as CSSProperties
      }
      ref={wrapperRef}
    >
      <div className={s.light} ref={cursorRef} />
      <Icon className={s.img} name={image} />
    </div>
  );
};

export default HiddenImage;
