import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ButtonTheme {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clearInverted',
	OUTLINE = 'outline',
	OUTLINE_RED = 'outlineRed',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
	children?: ReactNode;
	fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		theme = ButtonTheme.OUTLINE,
		square,
		size = ButtonSize.M,
		disabled,
		fullWidth,
		...otherProps
	} = props;

	const mods: Mods = {
		[styles[theme]]: true,
		[styles.square]: square,
		// Такие классы, у которых значение равно true, лучше добавлять в additional категорию
		[styles[size]]: true,
		[styles.disabled]: disabled,
		[styles.fullWidth]: fullWidth,
	};

	return (
		<button
			type='button'
			className={classNames(styles.Button, mods, [className])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
