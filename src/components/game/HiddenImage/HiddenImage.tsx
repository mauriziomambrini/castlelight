import Button from '@/components/buttons/Button';
import Icon from '@/components/utils/Icon';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import useTouchDevice from '@/hooks/useTouchDevice'; // Assicurati che il percorso dell'import sia corretto
import type { Classnames } from '@/types/compoentsTypes.ts';
import type { DifficultyTypes } from '@/types/quizTypes.ts';
import cx from 'classnames';
import {
  type CSSProperties,
  Fragment,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const HiddenImage = (props: IHiddenImage) => {
  const { t } = useTranslation();
  const { image, difficulty = 'easy', classNames } = props;
  const { skipImage } = useQuizContext();
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

  const handleTouchStart = (event: TouchEvent) => {
    if (cursorRef.current) {
      const { clientX, clientY } = event.touches[0];
      cursorRef.current.style.setProperty('--lx-cursor', `${clientX}px`);
      cursorRef.current.style.setProperty('--ly-cursor', `${clientY}px`);
      setIsCursorVisible(true);
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (cursorRef.current) {
      const currentCursor = cursorRef.current;
      requestAnimationFrame(() => {
        const { clientX, clientY } = event.touches[0];
        if (currentCursor) {
          currentCursor.style.setProperty('--lx-cursor', `${clientX}px`);
          currentCursor.style.setProperty('--ly-cursor', `${clientY}px`);
        }
      });
    }
  };

  const handleTouchEnd = () => {
    setIsCursorVisible(false);
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

  const renderImage = () => {
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

  const renderCta = () => {
    return (
      <Button
        classNames={{ button: s.cta, label: s.labelCta }}
        label={t('action.skip')}
        onClick={() => skipImage()}
        theme={'text'}
      />
    );
  };

  return (
    <Fragment>
      {renderImage()}
      {renderCta()}
    </Fragment>
  );
};

import { useTranslation } from 'react-i18next';
import s from './HiddenImage.module.scss';

export interface IHiddenImage {
  image: string;
  difficulty?: DifficultyTypes;
  classNames?: Classnames<'wrapper'>;
}

export default HiddenImage;
