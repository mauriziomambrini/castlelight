import Typo from '@/components/typography/Typo';
import Icon from '@/components/utils/Icon';
import type {
  ButtonColorType,
  ButtonSizeType,
  ButtonThemeType,
  Classnames,
  IconPositionType,
} from '@/types/compoentsTypes.ts';
import { type CSSProperties, Fragment } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import s from './Button.module.scss';

export interface IButton {
  label: string;
  icon?: string;
  iconPosition?: IconPositionType;
  type?: 'button' | 'submit' | 'reset' | undefined;
  theme?: ButtonThemeType;
  size?: ButtonSizeType;
  color?: ButtonColorType;
  loading?: boolean;
  disabled?: boolean;
  to?: string;
  href?: string;
  target?: '_blank' | undefined;
  onClick?: (...args: any[]) => void;
  classNames?: Classnames<'button' | 'label' | 'icon'>;
}

const Button = (props: IButton) => {
  const {
    label,
    icon,
    iconPosition,
    type = 'button',
    theme = 'fill',
    size = 'tr',
    color = 'grey',
    loading,
    disabled,
    to,
    href,
    target = undefined,
    onClick,
    classNames,
  } = props;

  const buttonProps = {
    className: cx(s.btn, classNames?.button, s[theme], s[size], {
      [s.disabled]: disabled,
      [s.loading]: loading,
    }),
    style: {
      '--lc': `var(--c-${color})`,
      '--l-icon-position': iconPosition === 'before' ? 'row' : 'row-reverse',
    } as CSSProperties,
    disabled: disabled,
    type: type,
  };

  const handleClick = () => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (loading) return null;
    return <Icon className={cx(s.icon, classNames?.icon)} name={icon} />;
  };

  const renderLabel = () => {
    if (!label) return null;
    return (
      <Typo
        className={cx(s.label, classNames?.label)}
        text={label}
        size={'df'}
        weight={'medium'}
      />
    );
  };

  const renderContent = () => {
    return (
      <Fragment>
        {renderIcon()}
        {renderLabel()}
      </Fragment>
    );
  };

  if (to) {
    return (
      <Link {...buttonProps} to={to}>
        {renderContent()}
      </Link>
    );
  }

  if (href) {
    return (
      <a {...buttonProps} href={href} target={target}>
        {renderContent()}
      </a>
    );
  }

  return (
    <button {...buttonProps} onClick={handleClick} type={type}>
      {renderContent()}
    </button>
  );
};

export default Button;
