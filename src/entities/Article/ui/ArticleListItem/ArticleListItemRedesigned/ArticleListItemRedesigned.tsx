import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/AppImage';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleListItemProps } from '../ArticleListItem';
import styles from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo(
	({ className, article, view, target }: ArticleListItemProps) => {
		const { t } = useTranslation('article');

		const userInfo = (
			<>
				<Avatar size={32} src={article.user.avatar} className={styles.avatar} />
				<Text bold text={article.user.username} />
			</>
		);
		const views = (
			<HStack gap="8">
				<Icon Svg={EyeIcon} />
				<Text text={String(article.views)} className={styles.views} />
			</HStack>
		);

		if (view === ArticleView.BIG) {
			const textBlock = article.blocks.find(
				(block) => block.type === ArticleBlockType.TEXT,
			);

			return (
				<Card
					padding="24"
					max
					data-testid="ArticleListItem"
					className={classNames(styles.ArticleListItem, {}, [
						className,
						styles[view],
					])}>
					<VStack max gap="16">
						<HStack gap="8" max>
							{userInfo}
							<Text text={article.createdAt} />
						</HStack>
						<Text title={article.title} bold />
						<Text title={article.subtitle} size="s" />
						<AppImage
							fallback={<Skeleton width="100%" height={250} />}
							src={article.img}
							className={styles.img}
							alt={article.title}
						/>
						{textBlock?.paragraphs && (
							// ! при помщи css можно нормально обрезать текст, чтобы везде было одинаково
							// ! просто высотой скрывать текст неправильно
							<Text
								className={styles.textBlock}
								text={textBlock.paragraphs.slice(0, 2).join(' ')}
							/>
						)}
						<HStack max justify="between">
							<AppLink target={target} to={getRouteArticleDetails(article.id)}>
								<Button variant="outline">{t('Читать далее')}</Button>
							</AppLink>
							{views}
						</HStack>
					</VStack>
				</Card>
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
				])}>
				<Card className={styles.card} border="round" padding="0">
					<AppImage
						fallback={<Skeleton width="100%" height={200} />}
						alt={article.title}
						src={article.img}
						className={styles.img}
					/>
					<VStack className={styles.info} gap="4">
						<Text title={article.title} className={styles.title} />
						<VStack gap="4" className={styles.footer} max>
							<HStack justify="between" max>
								<Text text={article.createdAt} className={styles.date} />
								{views}
							</HStack>
							<HStack gap="4">{userInfo}</HStack>
						</VStack>
					</VStack>
				</Card>
			</AppLink>
		);
	},
);
