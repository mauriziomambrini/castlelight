import { forwardRef } from 'react';

import cx from 'classnames';
import s from './Input.module.scss';

import Typo from '@/components/typography/Typo';
import type { Classnames } from '@/types/compoentsTypes.ts';

export interface IInput {
  type?: 'text';
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorHint?: string;
  id?: string;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  autoComplete?: string;
  maxLength?: number;
  loading?: boolean;
  required?: boolean;
  fake?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onClick?: (...args: any[]) => void;
  onChange?: (...args: any[]) => void;
  onFocus?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
  onKeyDown?: (...args: any[]) => void;
  onEnter?: (...args: any[]) => void;
  onEsc?: (...args: any[]) => void;
  classNames?: Classnames<
    'wrapper' | 'wrapInput' | 'input' | 'label' | 'before' | 'icon' | 'hint'
  >;
  onKeyUp?: (...args: any[]) => void;
}

const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const {
    type = 'text',
    label,
    placeholder,
    errorHint,
    id,
    name,
    value,
    defaultValue,
    autoComplete,
    maxLength,
    loading,
    required,
    fake,
    readOnly,
    disabled,
    onClick,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onEnter,
    onEsc,
    classNames,
  } = props;

  const error = props.error || Boolean(errorHint);

  const handleClick = (event) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  const handleChange = (event) => {
    if (disabled || loading) return;
    onChange?.(event);
  };

  const handleFocus = (event) => {
    if (disabled || loading) return;
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    if (disabled || loading) return;
    onBlur?.(event);
  };

  const handleKeyDown = (event) => {
    if (disabled || loading) return;
    onKeyDown?.(event);
  };

  const handleKeyUp = (event) => {
    if (disabled || loading) return;
    onKeyUp?.(event);
  };

  const renderInput = () => {
    return (
      <input
        className={cx(s.input, classNames?.input)}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        maxLength={maxLength}
        readOnly={readOnly || fake}
        required={required}
        disabled={disabled || loading}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        ref={ref}
      />
    );
  };

  const renderLabel = () => {
    if (!label) return null;
    return (
      <Typo
        className={s.label}
        text={label}
        tag={'label'}
        size={'df'}
        color={'grey-2'}
      />
    );
  };

  const renderError = () => {
    if (!error) return null;
    if (!errorHint) return null;
    if (error && !errorHint) return null;
    return (
      <Typo
        className={s.errorHint}
        text={errorHint}
        tag={'p'}
        size={'sm'}
        color={'error'}
      />
    );
  };

  return (
    <div className={cx(s.wrapper, classNames?.wrapper)}>
      <div
        className={cx(s.wrapInput, {
          [s.error]: error,
          [s.fake]: fake,
          [s.required]: required,
          [s.readOnly]: readOnly,
          [s.disabled]: disabled || loading,
        })}
        onClick={handleClick}
      >
        {renderInput()}
        {renderLabel()}
      </div>
      {renderError()}
    </div>
  );
});
export default Input;
