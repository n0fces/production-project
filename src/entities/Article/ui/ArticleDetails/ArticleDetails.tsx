import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import EyeIcon from 'shared/assets/icons/eye.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import styles from './ArticleDetails.module.scss';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
	className?: string;
	id: string;
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
					<ArticleCodeBlockComponent
						key={block.id}
						className={styles.block}
						block={block}
					/>
				);
			case ArticleBlockType.IMAGE:
				return (
					<ArticleImageBlockComponent
						key={block.id}
						className={styles.block}
						block={block}
					/>
				);
			case ArticleBlockType.TEXT:
				return (
					<ArticleTextBlockComponent
						key={block.id}
						className={styles.block}
						block={block}
					/>
				);
			// дефолтный кейс у нас в принципе не должен отработать. Только если бэкенд нас не предупредил об изменениях
			default:
				return null;
		}
	}, []);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

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
				<Skeleton className={styles.title} width={300} height={32} />
				<Skeleton className={styles.skeleton} width={600} height={24} />
				<Skeleton
					className={styles.skeleton}
					width='100%'
					height={200}
				/>
				<Skeleton
					className={styles.skeleton}
					width='100%'
					height={200}
				/>
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
				<div className={styles.avatarWrapper}>
					<Avatar
						size={200}
						src={article?.img}
						className={styles.avatar}
					/>
				</div>
				<Text
					className={styles.title}
					title={article?.title}
					text={article?.subtitle}
					size={TextSize.L}
				/>
				<div className={styles.articleInfo}>
					<Icon Svg={EyeIcon} className={styles.icon} />
					<Text text={String(article?.views)} />
				</div>
				<div className={styles.articleInfo}>
					<Icon Svg={CalendarIcon} className={styles.icon} />
					<Text text={article?.createdAt} />
				</div>
				{/* в зависимости от типа будем возвращать соответствующий блок */}
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		// будем размонтировать редьюсер после того, как ушли со страницы статьи
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(styles.ArticleDetails, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	);
});
