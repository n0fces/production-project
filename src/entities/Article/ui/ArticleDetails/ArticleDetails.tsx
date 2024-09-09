import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIconDeprecated from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIconDeprecated from '@/shared/assets/icons/eye-20-20.svg';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
	Text as TextDeprecated,
	TextAlign,
	TextSize,
	TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import styles from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
	const article = useSelector(getArticleDetailsData);

	return (
		<>
			<HStack justify="center" max className={styles.avatarWrapper}>
				<AvatarDeprecated
					size={200}
					src={article?.img}
					className={styles.avatar}
				/>
			</HStack>
			<VStack gap="4" max data-testid="ArticleDetails.Info">
				<TextDeprecated
					className={styles.title}
					title={article?.title}
					text={article?.subtitle}
					size={TextSize.L}
				/>
				<HStack gap="8" className={styles.articleInfo}>
					<IconDeprecated className={styles.icon} Svg={EyeIconDeprecated} />
					<TextDeprecated text={String(article?.views)} />
				</HStack>
				<HStack gap="8" className={styles.articleInfo}>
					<IconDeprecated
						className={styles.icon}
						Svg={CalendarIconDeprecated}
					/>
					<TextDeprecated text={article?.createdAt} />
				</HStack>
			</VStack>
			{article?.blocks.map(renderArticleBlock)}
		</>
	);
};

const Redesigned = () => {
	const article = useSelector(getArticleDetailsData);

	return (
		<>
			<Text title={article?.title} size="l" bold />
			<Text title={article?.subtitle} />
			<AppImage
				fallback={<Skeleton width="100%" height={420} border="16px" />}
				src={article?.img}
				className={styles.img}
			/>
			{article?.blocks.map(renderArticleBlock)}
		</>
	);
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);

	useInitialEffect(() => dispatch(fetchArticleById(id)));

	// из-за того, что мы используем DynamicModuleLoader, было логичнее поступить именно так (меняем содержимое самой разметки)
	let content;

	if (isLoading) {
		content = (
			<>
				<SkeletonDeprecated
					className={styles.avatar}
					width={200}
					height={200}
					border="50%"
				/>
				<SkeletonDeprecated width={300} height={32} />
				<SkeletonDeprecated width={600} height={24} />
				<SkeletonDeprecated width="100%" height={200} />
				<SkeletonDeprecated width="100%" height={200} />
			</>
		);
	} else if (error) {
		content = (
			<TextDeprecated
				align={TextAlign.CENTER}
				theme={TextTheme.ERROR}
				title={t('Произошла ошибка при загрузке статьи')}
			/>
		);
	} else {
		content = (
			<ToggleFeatures
				feature="isAppRedesigned"
				on={<Redesigned />}
				off={<Deprecated />}
			/>
		);
	}

	return (
		<Card max className={className} padding="24">
			{/* будем размонтировать редьюсер после того, как ушли со страницы статьи */}
			<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
				<VStack gap="16" max className={styles.ArticleDetails}>
					{content}
				</VStack>
			</DynamicModuleLoader>
		</Card>
	);
});
