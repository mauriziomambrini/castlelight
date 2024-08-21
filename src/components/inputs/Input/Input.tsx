import Typo from '@/components/typography/Typo';
import type { Classnames } from '@/types/compoentsTypes.ts';
import cx from 'classnames';
import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
} from 'react';
import s from './Input.module.scss';

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
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onEsc?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  classNames?: Classnames<
    'wrapper' | 'wrapInput' | 'input' | 'label' | 'before' | 'icon' | 'hint'
  >;
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

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    onChange?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    onBlur?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    onKeyDown?.(event);

    if (event.key === 'Enter') {
      onEnter?.(event);
    } else if (event.key === 'Escape') {
      onEsc?.(event);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
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
