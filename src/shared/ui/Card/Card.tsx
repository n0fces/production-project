import { HTMLAttributes, ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Card.module.scss';

type CardVariant = 'normal' | 'outlined' | 'light';
type CardPadding = '0' | '8' | '16' | '24';
type CardBorder = 'round' | 'normal';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	variant?: CardVariant;
	max?: boolean;
	padding?: CardPadding;
	border?: CardBorder;
}

export const Card = memo((props: CardProps) => {
	const {
		className,
		children,
		variant = 'normal',
		max,
		padding = '8',
		border = 'normal',
		...otherProps
	} = props;

	return (
		<div
			className={classNames(styles.Card, { [styles.max]: max }, [
				className,
				styles[variant],
				styles[`gap_${padding}`],
				styles[border],
			])}
			{...otherProps}>
			{children}
		</div>
	);
});
