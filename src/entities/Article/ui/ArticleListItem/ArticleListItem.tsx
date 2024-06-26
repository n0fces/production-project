import { HTMLAttributeAnchorTarget, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import styles from './ArticleListItem.module.scss';
import {
	Article,
	ArticleBlockType,
	ArticleTextBlock,
	ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

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
	target
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
			(block) => block.type === ArticleBlockType.TEXT
		) as ArticleTextBlock;
		return (
			<div
				className={classNames(styles.ArticleListItem, {}, [
					className,
					styles[view],
				])}
			>
				<Card>
					<div className={styles.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text
							text={article.user.username}
							className={styles.username}
						/>
						<Text
							text={article.createdAt}
							className={styles.date}
						/>
					</div>
					<Text title={article.title} className={styles.title} />
					{types}
					<img
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
						<AppLink
							target={target}
							to={RoutePath.articles_details + article.id}
						>
							<Button theme={ButtonTheme.OUTLINE}>
								{t('Читать далее')}
							</Button>
						</AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<AppLink
			target={target}
			to={RoutePath.articles_details + article.id}
			className={classNames(styles.ArticleListItem, {}, [
				className,
				styles[view],
			])}
		>
			<Card>
				<div className={styles.imageWrapper}>
					<img
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
