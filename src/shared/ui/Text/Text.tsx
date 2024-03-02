import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Text.module.scss';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center',
}

export interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	align?: TextAlign;
}

export const Text = memo(
	({
		className,
		text,
		title,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
	}: TextProps) => {
		return (
			<div
				className={classNames(styles.Text, {}, [
					className,
					styles[theme],
					styles[align],
				])}
			>
				{title && <p className={styles.title}>{title}</p>}
				{text && <p className={styles.text}>{text}</p>}
			</div>
		);
	}
);
