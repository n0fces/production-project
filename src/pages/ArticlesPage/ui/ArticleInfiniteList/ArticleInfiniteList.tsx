import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ArticleList } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from '@/shared/ui/Text';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
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
	// получаем гет-параметры из текущей строки
	const [searchParams] = useSearchParams();

	// для этого компонента мы не будем удалять редьюсер, а заново при его появлении не хотим делать повторный запрос
	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

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
