import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
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
	 * Флаг, отвечающий за работу кнопки
	 */
	disabled?: boolean;
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

export const Button = memo((props: ButtonProps) => {
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
			{...otherProps}
		>
			{addonLeft && <span className={styles.addonLeft}>{addonLeft}</span>}
			{children}
			{addonRight && <span className={styles.addonRight}>{addonRight}</span>}
		</button>
	);
});
