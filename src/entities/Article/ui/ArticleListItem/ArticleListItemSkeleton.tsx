import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import styles from './ArticleListItem.module.scss';
import {
	ArticleBlockType,
	ArticleTextBlock,
	ArticleView,
} from '../../model/types/article';

interface ArticleListItemSkeletonProps {
	className?: string;
	view: ArticleView;
}

export const ArticleListItemSkeleton = ({
	className,
	view,
}: ArticleListItemSkeletonProps) => {
	if (view === ArticleView.BIG) {
		return (
			<div
				className={classNames(styles.ArticleListItem, {}, [
					className,
					styles[view],
				])}
			>
				<Card>
					<div className={styles.header}>
						<Skeleton width={30} height={30} border='50%' />
						<Skeleton
							width={150}
							height={16}
							className={styles.username}
						/>
						<Skeleton
							width={150}
							height={16}
							className={styles.date}
						/>
					</div>
					<Skeleton
						width={250}
						height={24}
						className={styles.title}
					/>
					<Skeleton height={200} className={styles.img} />
					<div className={styles.footer}>
						<Skeleton height={36} width={200} />
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div
			className={classNames(styles.ArticleListItem, {}, [
				className,
				styles[view],
			])}
		>
			<Card>
				<div className={styles.imageWrapper}>
					<Skeleton className={styles.img} width={200} height={200} />
				</div>
				<div className={styles.infoWrapper}>
					<Skeleton width={130} height={16} />
				</div>
				<Skeleton width={150} height={16} className={styles.title} />
			</Card>
		</div>
	);
};
