import type { CSSProperties, ReactNode } from 'react';

import Typo from '@/components/typography/Typo';
import type { Classnames } from '@/types/compoentsTypes';
import cx from 'classnames';
import s from './Radio.module.scss';

export interface IRadio {
  label?: string | ReactNode;
  hint?: string;
  id?: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  checkSize?: number;
  checkPosition?: 'before' | 'after';
  onChange?: (...args: any[]) => void;
  classNames?: Classnames<'wrapper' | 'content' | 'label' | 'hint' | 'check'>;
}

const Radio = (props: IRadio) => {
  const {
    label,
    hint,
    value,
    name,
    checked,
    disabled,
    required,
    checkSize = 1.5,
    checkPosition = 'before',
    id,
    onChange,
    classNames,
  } = props;

  const handleChange = (event) => {
    if (disabled) return;
    onChange?.(event);
  };

  const renderLabel = () => {
    if (!label) return null;
    if (typeof label === 'string')
      return (
        <Typo
          className={classNames?.label}
          text={label}
          size={'df'}
          weight={'regular'}
          color={'grey'}
        />
      );
    return label;
  };

  const renderHint = () => {
    if (!hint) return null;
    return (
      <Typo
        className={classNames?.hint}
        text={hint}
        size={'sm'}
        weight={'regular'}
        color={'grey-2'}
      />
    );
  };

  const renderContent = () => {
    if (!label && !hint) return null;
    return (
      <div className={cx(s.content, classNames?.content)}>
        {renderLabel()}
        {renderHint()}
      </div>
    );
  };

  const renderCheck = () => {
    return (
      <input
        className={cx(s.check, classNames?.check)}
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        required={required}
      />
    );
  };

  return (
    <div
      className={cx(s.wrapper, classNames?.wrapper, {
        [s.checked]: checked,
        [s.required]: required,
        [s.disabled]: disabled,
      })}
      onClick={handleChange}
      style={
        {
          '--ls': `${checkSize}rem`,
          '--ldirection': checkPosition === 'before' ? 'row' : 'row-reverse',
        } as CSSProperties
      }
    >
      {renderCheck()}
      {renderContent()}
    </div>
  );
};

export default Radio;
