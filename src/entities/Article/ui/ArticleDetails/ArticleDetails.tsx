import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { ArticleBlockType } from '../../model/consts/consts';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const article = useSelector(getArticleDetailsData);
	const error = useSelector(getArticleDetailsError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.CODE:
				return (
					<ArticleCodeBlockComponent key={block.id} block={block} />
				);
			case ArticleBlockType.IMAGE:
				return (
					<ArticleImageBlockComponent key={block.id} block={block} />
				);
			case ArticleBlockType.TEXT:
				return (
					<ArticleTextBlockComponent key={block.id} block={block} />
				);
			// дефолтный кейс у нас в принципе не должен отработать. Только если бэкенд нас не предупредил об изменениях
			default:
				return null;
		}
	}, []);

	useInitialEffect(() => dispatch(fetchArticleById(id)));

	// из-за того, что мы используем DynamicModuleLoader, было логичнее поступить именно так (меняем содержимое самой разметки)
	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton
					className={styles.avatar}
					width={200}
					height={200}
					border='50%'
				/>
				<Skeleton width={300} height={32} />
				<Skeleton width={600} height={24} />
				<Skeleton width='100%' height={200} />
				<Skeleton width='100%' height={200} />
			</>
		);
	} else if (error) {
		content = (
			<Text
				align={TextAlign.CENTER}
				theme={TextTheme.ERROR}
				title={t('Произошла ошибка при загрузке статьи')}
			/>
		);
	} else {
		content = (
			<>
				<HStack justify='center' max>
					<Avatar
						size={200}
						src={article?.img}
						className={styles.avatar}
					/>
				</HStack>
				<VStack gap='4' max>
					<Text
						title={article?.title}
						text={article?.subtitle}
						size={TextSize.L}
					/>
					<HStack gap='8'>
						<Icon Svg={EyeIcon} />
						<Text text={String(article?.views)} />
					</HStack>
					<HStack gap='8'>
						<Icon Svg={CalendarIcon} />
						<Text text={article?.createdAt} />
					</HStack>
				</VStack>
				{/* в зависимости от типа будем возвращать соответствующий блок */}
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		// будем размонтировать редьюсер после того, как ушли со страницы статьи
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<VStack
				gap='16'
				max
				className={classNames(styles.ArticleDetails, {}, [className])}
			>
				{content}
			</VStack>
		</DynamicModuleLoader>
	);
});
