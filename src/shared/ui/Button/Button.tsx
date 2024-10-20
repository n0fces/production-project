import {
	ButtonHTMLAttributes,
	ForwardedRef,
	ReactNode,
	forwardRef,
} from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import styles from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
	 */
	variant?: ButtonVariant;
	/**
	 * Флаг, делающий кнопку квадратной
	 */
	square?: boolean;
	/**
	 * Размер кнопки в соответствии с дизайн системой
	 */
	size?: ButtonSize;
	/**
	 * Содержимое кнопки
	 */
	children?: ReactNode;
	/**
	 * Увеличивает кнопку на всю свободную ширину
	 */
	fullWidth?: boolean;
	/**
	 * Добавляет иконку слева
	 */
	addonLeft?: ReactNode;
	/**
	 * Добавляет иконку справа
	 */
	addonRight?: ReactNode;
	/**
	 * Добавляет цветовое оформление
	 */
	color?: ButtonColor;
}

export const Button = forwardRef(
	(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
		const {
			className,
			children,
			variant = 'outline',
			square,
			size = 'm',
			disabled,
			fullWidth,
			addonLeft,
			addonRight,
			color = 'normal',
			...otherProps
		} = props;

		const mods: Mods = {
			[styles.square]: square,
			[styles.disabled]: disabled,
			[styles.fullWidth]: fullWidth,
			[styles.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
		};

		return (
			<button
				type="button"
				className={classNames(styles.Button, mods, [
					className,
					styles[variant],
					styles[size],
					styles[color],
				])}
				disabled={disabled}
				ref={ref}
				{...otherProps}>
				{addonLeft && <span className={styles.addonLeft}>{addonLeft}</span>}
				{children}
				{addonRight && <span className={styles.addonRight}>{addonRight}</span>}
			</button>
		);
	},
);
