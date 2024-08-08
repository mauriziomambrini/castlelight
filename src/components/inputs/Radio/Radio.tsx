import type { CSSProperties, ReactNode } from 'react';

import Typo from '@/components/typography/Typo';
import type { Classnames } from '@/types/compoentsTypes';
import cx from 'classnames';
import s from './Radio.module.scss';

export interface IRadio {
  label?: string | ReactNode;
  id?: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  required?: boolean;
  checkSize?: number;
  checkPosition?: 'before' | 'after';
  onChange?: (...args: any[]) => void;
  onClick?: (...args: any[]) => void;
  classNames?: Classnames<'wrapper' | 'content' | 'label' | 'hint' | 'check'>;
}

const Radio = (props: IRadio) => {
  const {
    label,
    value,
    name,
    checked,
    disabled,
    required,
    checkSize = 1.5,
    checkPosition = 'before',
    id,
    onChange,
    onClick,
    classNames,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event);
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const renderLabel = () => {
    if (!label) return null;
    if (typeof label === 'string')
      return (
        <Typo
          className={classNames?.label}
          text={label}
          size={'lg'}
          weight={'regular'}
          color={'grey'}
        />
      );
    return label;
  };

  const renderContent = () => {
    if (!label) return null;
    return (
      <div className={cx(s.content, classNames?.content)}>{renderLabel()}</div>
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
      style={
        {
          '--ls': `${checkSize}rem`,
          '--ldirection': checkPosition === 'before' ? 'row' : 'row-reverse',
        } as CSSProperties
      }
      onClick={handleClick}
    >
      {renderCheck()}
      {renderContent()}
    </div>
  );
};

export default Radio;
