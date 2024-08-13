import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Loader } from 'shared/ui/Loader/Loader';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';

// ! Тимур вообще забыл про виджеты, которые как раз и предназначены, чтобы объединять энтити и фичи, а потом эти независимые блоки просто вставлять в страницы
// ! Тогда страницы будут максимально тонкими, а вся "сборка" будет происходить в виджетах
// ! Вообще не нужно городить чаще всего сегменты ui для страниц. Для этой сборки есть слой виджетов

interface ArticleDetailsCommentsProps {
	className?: string;
	id?: string;
}

export const ArticleDetailsComments = ({
	className,
	id,
}: ArticleDetailsCommentsProps) => {
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();

	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentForArticle(text));
		},
		[dispatch]
	);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	});

	return (
		<VStack gap='16' max className={className}>
			<Text size={TextSize.L} title={t('Комментарии')} />
			<Suspense fallback={<Loader />}>
				<AddCommentForm onSendComment={onSendComment} />
			</Suspense>
			<CommentList isLoading={commentsIsLoading} comments={comments} />
		</VStack>
	);
};
