import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import styles from './ArticleDetailsPage.module.scss';
import {
	articleDetailsCommentsReducer,
	getArticleComments,
} from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForArticle } from '../../model/services/AddCommentForArticle/AddCommentForArticle';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	// данная тулкитовая абстрация позволяет нам даже не писать свои собственные селекторы во многих случаях, так как базовые и наиболее часто используемые кейсы уже имплементированы
	const comments = useSelector(getArticleComments.selectAll);
	const dispatch = useAppDispatch();
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(AddCommentForArticle(text));
		},
		[dispatch]
	);

	useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

	if (!id) {
		return (
			<div
				className={classNames(styles.ArticleDetailsPage, {}, [
					className,
				])}
			>
				{t('Статья не найдена')}
			</div>
		);
	}

	return (
		// Здесь DynamicModuleLoader нужен для работы с асинхронным экшеном под комментарии конкретной статьи (articleDetailsCommentsReducer)
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div
				className={classNames(styles.ArticleDetailsPage, {}, [
					className,
				])}
			>
				<ArticleDetails id={id} />
				<Text
					className={styles.commentTitle}
					title={t('Комментарии')}
				/>
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList
					isLoading={commentsIsLoading}
					comments={comments}
				/>
			</div>
		</DynamicModuleLoader>
	);
};

// * опять же вообще не уверен, что здесь целесообразно применять memo. Ну вот навряд ли у нас будут изменяться пропсы, но мы все равно зачем-то запоминаем
export default memo(ArticleDetailsPage);
