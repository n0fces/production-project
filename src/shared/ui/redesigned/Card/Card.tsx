import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	variant?: CardVariant;
	max?: boolean;
	padding?: CardPadding;
}

export const Card = memo((props: CardProps) => {
	const {
		className,
		children,
		variant = 'normal',
		max,
		padding = '8',
		...otherProps
	} = props;

	return (
		<div
			className={classNames(styles.Card, { [styles.max]: max }, [
				className,
				styles[variant],
				styles[`gap_${padding}`],
			])}
			{...otherProps}
		>
			{children}
		</div>
	);
});
