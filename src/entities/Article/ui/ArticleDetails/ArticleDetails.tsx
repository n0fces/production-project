import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AppImage } from '@/shared/ui/AppImage';
import { Card } from '@/shared/ui/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import styles from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

const ArticleDetailsContent = () => {
	const article = useSelector(getArticleDetailsData);

	return (
		<>
			<Text title={article?.title} size="l" bold />
			<Text title={article?.subtitle} />
			<AppImage
				fallback={
					<SkeletonRedesigned width="100%" height={420} border="16px" />
				}
				src={article?.img}
				className={styles.img}
			/>
			{article?.blocks.map(renderArticleBlock)}
		</>
	);
};

const ArticleDetailsSkeleton = () => {
	const Skeleton = SkeletonRedesigned;
	return (
		<VStack gap="16" max>
			<Skeleton
				className={styles.avatar}
				width={200}
				height={200}
				border="50%"
			/>
			<Skeleton className={styles.title} width={300} height={32} />
			<Skeleton className={styles.skeleton} width={600} height={24} />
			<Skeleton className={styles.skeleton} width="100%" height={200} />
			<Skeleton className={styles.skeleton} width="100%" height={200} />
		</VStack>
	);
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);

	useInitialEffect(() => void dispatch(fetchArticleById(id)));

	// из-за того, что мы используем DynamicModuleLoader, было логичнее поступить именно так (меняем содержимое самой разметки)
	let content;

	if (isLoading) {
		content = <ArticleDetailsSkeleton />;
	} else if (error) {
		content = (
			<Text
				align="center"
				variant="error"
				title={t('Произошла ошибка при загрузке статьи')}
			/>
		);
	} else {
		content = <ArticleDetailsContent />;
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
