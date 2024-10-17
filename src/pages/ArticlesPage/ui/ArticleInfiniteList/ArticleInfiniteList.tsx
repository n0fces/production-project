import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';

import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slice/articlesPageSlice';

// ! Опять же я уже описывал эту проблему у Тимура. Он забыл про виджеты!

interface ArticleInfiniteListProps {
	className?: string;
}

export const ArticleInfiniteList = ({
	className,
}: ArticleInfiniteListProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation('article');

	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const error = useSelector(getArticlesPageError);
	const view = useSelector(getArticlesPageView);

	return error ? (
		<Text text={t('Что-то пошло не так')} />
	) : (
		<ArticleList
			view={view}
			articles={articles}
			isLoading={isLoading}
			className={className}
		/>
	);
};
