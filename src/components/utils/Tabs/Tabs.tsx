import {
  type CSSProperties,
  type MouseEvent,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import Typo from '@/components/typography/Typo';
import type { Classnames } from '@/types/compoentsTypes.ts';
import cx from 'classnames';
import s from './Tabs.module.scss';

export interface ITab<T extends string> {
  key?: string;
  label?: string;
  value: T;
  active: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export interface ITabs<T extends string> {
  theme?: 'switch';
  tabs: ITab<T>[];
  onClick?: (tab: ITab<T>, event: MouseEvent<HTMLDivElement>) => void;
  classNames?: Classnames<'wrapper' | 'tab' | 'label'>;
}

const Tabs = <T extends string>(props: ITabs<T>) => {
  const { theme = 'switch', tabs, onClick, classNames } = props;
  const parentRef = useRef<HTMLDivElement | null>(null);
  const tabsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeTab = useMemo(() => {
    return tabs.findIndex((tab) => tab.active && !tab.hidden);
  }, [tabs]);

  useLayoutEffect(() => {
    const tab = tabsRefs.current[activeTab];
    if (parentRef.current && tab) {
      const { offsetWidth, offsetLeft, offsetTop } = tab;
      const { style } = parentRef.current;
      style.setProperty('--lw-tab', `${offsetWidth}px`);
      style.setProperty('--lleft-tab', `${offsetLeft}px`);
      style.setProperty('--ltop-tab', `${offsetTop}px`);
    }
  }, [activeTab, tabsRefs.current, parentRef.current]);

  const handleClick = (tab: ITab<T>, event: MouseEvent<HTMLDivElement>) => {
    if (typeof onClick === 'function') {
      onClick(tab, event);
    }
  };

  const renderLabel = (tab: ITab<T>) => {
    if (!tab.label) return null;
    return (
      <Typo
        className={cx(s.label, classNames?.label)}
        text={tab.label}
        tag={'p'}
        size={'df'}
      />
    );
  };

  const renderTab = (tab: ITab<T>, i: number) => {
    if (tab.hidden) return null;
    return (
      <div
        className={cx(s.tab, classNames?.tab, {
          [s.active]: tab.active,
          [s.disabled]: tab.disabled,
        })}
        key={tab.value || tab.key}
        onClick={(e) => handleClick(tab, e)}
        role='tab'
        ref={(el) => {
          tabsRefs.current[i] = el;
        }}
      >
        {renderLabel(tab)}
      </div>
    );
  };

  return (
    <div
      className={cx(s.wrapper, classNames?.wrapper, {
        [s[theme]]: true,
      })}
      role='tablist'
      style={{ '--l-item-number': tabs?.length } as CSSProperties}
      ref={parentRef}
    >
      {tabs.map(renderTab).filter(Boolean)}
    </div>
  );
};

export default Tabs;
