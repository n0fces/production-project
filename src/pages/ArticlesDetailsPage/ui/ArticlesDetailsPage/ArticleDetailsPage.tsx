import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { AddCommentForArticle } from '../../model/services/addCommentForArticle/AddCommentForArticle';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleRecommendations } from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
	className?: string;
}

// комбинируем для одной страницы сразу два редьюсера
const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	// данная тулкитовая абстрация позволяет нам даже не писать свои собственные селекторы во многих случаях, так как базовые и наиболее часто используемые кейсы уже имплементированы
	const comments = useSelector(getArticleComments.selectAll);
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const dispatch = useAppDispatch();
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const recommendationsIsLoading = useSelector(
		getArticleRecommendationsIsLoading
	);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(AddCommentForArticle(text));
		},
		[dispatch]
	);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	});

	if (!id) {
		return (
			<Page
				className={classNames(styles.ArticleDetailsPage, {}, [
					className,
				])}
			>
				{t('Статья не найдена')}
			</Page>
		);
	}

	return (
		// Здесь DynamicModuleLoader нужен для работы с асинхронным экшеном под комментарии конкретной статьи (articleDetailsCommentsReducer)
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page
				className={classNames(styles.ArticleDetailsPage, {}, [
					className,
				])}
			>
				<ArticleDetailsPageHeader />
				<ArticleDetails id={id} />
				<Text
					size={TextSize.L}
					className={styles.commentTitle}
					title={t('Рекомендуем')}
				/>
				<ArticleList
					articles={recommendations}
					isLoading={recommendationsIsLoading}
					className={styles.recommendations}
					target='_blank'
				/>
				<Text
					size={TextSize.L}
					className={styles.commentTitle}
					title={t('Комментарии')}
				/>
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList
					isLoading={commentsIsLoading}
					comments={comments}
				/>
			</Page>
		</DynamicModuleLoader>
	);
};

// * опять же вообще не уверен, что здесь целесообразно применять memo. Ну вот навряд ли у нас будут изменяться пропсы, но мы все равно зачем-то запоминаем
export default memo(ArticleDetailsPage);
