import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
}

export const Card = ({ className, children, ...otherProps }: CardProps) => {
	return (
		<div
			className={classNames(styles.Card, {}, [className])}
			{...otherProps}
		>
			{children}
		</div>
	);
};
