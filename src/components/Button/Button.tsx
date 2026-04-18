import React from 'react';
import Loader from '../Loader';
import Text from 'components/Text';
import s from './Button.module.scss';
import cn from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Варианты отображения */
  view: 'dark' | 'light' | 'strong';

  className?: string;
  disabled?: string;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  view,
  className,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cn(s.button, s[`button-${view}`], disabled && s.button_disabled, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader size="s" className={s.button__loader} />}
      <Text color={view === 'dark' ? 'secondary' : 'primary'} tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
