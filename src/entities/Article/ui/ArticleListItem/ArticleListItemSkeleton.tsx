import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardRedesigned } from '@/shared/ui/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';
import { ArticleView } from '../../model/consts/consts';
import styles from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
	className?: string;
	view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
	(props: ArticleListItemSkeletonProps) => {
		const { className, view } = props;

		const mainClass = styles.ArticleListItemRedesigned;

		const Skeleton = SkeletonRedesigned;

		if (view === ArticleView.BIG) {
			const cardContent = (
				<>
					<div className={styles.header}>
						<Skeleton border="50%" height={30} width={30} />
						<Skeleton width={150} height={16} className={styles.username} />
						<Skeleton width={150} height={16} className={styles.date} />
					</div>
					<Skeleton width={250} height={24} className={styles.title} />
					<Skeleton height={200} className={styles.img} />
					<div className={styles.footer}>
						<Skeleton height={36} width={200} />
					</div>
				</>
			);
			return (
				<div className={classNames(mainClass, {}, [className, styles[view]])}>
					<CardRedesigned border="round" className={styles.card}>
						{cardContent}
					</CardRedesigned>
				</div>
			);
		}

		const cardContent = (
			<>
				<Skeleton
					width="100%"
					height={150}
					border="32px"
					className={styles.img}
				/>
				<div className={styles.infoWrapper}>
					<Skeleton width={130} height={16} />
				</div>
				<Skeleton width={150} height={16} className={styles.title} />
			</>
		);

		return (
			<div className={classNames(mainClass, {}, [className, styles[view]])}>
				<CardRedesigned border="round" className={styles.card}>
					{cardContent}
				</CardRedesigned>
			</div>
		);
	},
);
