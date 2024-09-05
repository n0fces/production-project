import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticlesDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import styles from './ArticleListItem.module.scss';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { AppImage } from '@/shared/ui/deprecated/AppImage';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = ({
	className,
	article,
	view,
	target,
}: ArticleListItemProps) => {
	const { t } = useTranslation();

	const types = (
		<Text text={article.type.join(', ')} className={styles.types} />
	);
	const views = (
		<>
			<Text text={String(article.views)} className={styles.views} />
			<Icon Svg={EyeIcon} />
		</>
	);

	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find(
			(block) => block.type === ArticleBlockType.TEXT,
		) as ArticleTextBlock;
		return (
			<div
				data-testid="ArticleListItem"
				className={classNames(styles.ArticleListItem, {}, [
					className,
					styles[view],
				])}
			>
				<Card>
					<div className={styles.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={styles.username} />
						<Text text={article.createdAt} className={styles.date} />
					</div>
					<Text title={article.title} className={styles.title} />
					{types}
					<AppImage
						fallback={<Skeleton width="100%" height="250px" />}
						src={article.img}
						alt={article.title}
						className={styles.img}
					/>
					{textBlock && (
						<ArticleTextBlockComponent
							block={textBlock}
							className={styles.textBlock}
						/>
					)}
					<div className={styles.footer}>
						{/* отличная идея с точки зрения доступности. Кнопку запихнуть в ссылку) */}
						<AppLink target={target} to={getRouteArticlesDetails(article.id)}>
							<Button theme={ButtonTheme.OUTLINE}>{t('Читать далее')}</Button>
						</AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<AppLink
			data-testid="ArticleListItem"
			target={target}
			to={getRouteArticlesDetails(article.id)}
			className={classNames(styles.ArticleListItem, {}, [
				className,
				styles[view],
			])}
		>
			<Card>
				<div className={styles.imageWrapper}>
					<AppImage
						fallback={<Skeleton width="200px" height="200px" />}
						src={article.img}
						alt={article.title}
						className={styles.img}
					/>
					<Text text={article.createdAt} className={styles.date} />
				</div>
				<div className={styles.infoWrapper}>
					{types}
					{views}
				</div>
				<Text text={article.title} className={styles.title} />
			</Card>
		</AppLink>
	);
};
