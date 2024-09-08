import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from '../ArticleListItem.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { ArticleTextBlock } from '../../../model/types/article';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { getRouteArticleDetails } from '@/shared/const/router';

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
	const { className, article, view, target } = props;
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
				<Card className={styles.card}>
					<div className={styles.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={styles.username} />
						<Text text={article.createdAt} className={styles.date} />
					</div>
					<Text title={article.title} className={styles.title} />
					{types}
					<AppImage
						fallback={<Skeleton width="100%" height={250} />}
						src={article.img}
						className={styles.img}
						alt={article.title}
					/>
					{textBlock && (
						<ArticleTextBlockComponent
							block={textBlock}
							className={styles.textBlock}
						/>
					)}
					<div className={styles.footer}>
						<AppLink target={target} to={getRouteArticleDetails(article.id)}>
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
			to={getRouteArticleDetails(article.id)}
			className={classNames(styles.ArticleListItem, {}, [
				className,
				styles[view],
			])}
		>
			<Card className={styles.card}>
				<div className={styles.imageWrapper}>
					<AppImage
						fallback={<Skeleton width={200} height={200} />}
						alt={article.title}
						src={article.img}
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
});
