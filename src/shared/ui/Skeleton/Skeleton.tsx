import { CSSProperties } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
	className?: string;
	height?: string | number;
	width?: string | number;
	border?: string;
}

export const Skeleton = ({
	className,
	border,
	height,
	width,
}: SkeletonProps) => {
	const style: CSSProperties = {
		width,
		height,
		borderRadius: border,
	};
	return (
		<div
			style={style}
			className={classNames(styles.Skeleton, {}, [className])}
		/>
	);
};
