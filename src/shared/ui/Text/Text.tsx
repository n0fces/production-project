import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Text.module.scss';

export enum TextTheme {
	PRIMARY = 'primary',
	INVERTED = 'inverted',
	ERROR = 'error',
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center',
}

export enum TextSize {
	S = 'size_s',
	M = 'size_m',
	L = 'size_l',
}

export interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeader: Record<TextSize, HeaderTagType> = {
	[TextSize.S]: 'h3',
	[TextSize.M]: 'h2',
	[TextSize.L]: 'h1',
};

export const Text = memo(
	({
		className,
		text,
		title,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M,
	}: TextProps) => {
		// В зависимости от размера будет задавать заголовок нужного уровня, который будет вытаскиваться из нашего маппера
		const HeaderTag = mapSizeToHeader[size];

		return (
			<div
				className={classNames(styles.Text, {}, [
					className,
					styles[theme],
					styles[align],
					styles[size],
				])}
			>
				{title && (
					<HeaderTag className={styles.title}>{title}</HeaderTag>
				)}
				{text && <p className={styles.text}>{text}</p>}
			</div>
		);
	}
);
