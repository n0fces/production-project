import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'shared/ui/Page/Page';
import {
	ArticleList,
	ArticleView,
	ArticleViewSelector,
} from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles,
} from '../../model/slice/articlesPageSlice';
import styles from './ArticlesPage.module.scss';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const { t } = useTranslation('article');
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const error = useSelector(getArticlesPageError);
	const view = useSelector(getArticlesPageView);

	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch]
	);

	const onLoadNextPart = useCallback(() => {
		// делаем запрос за данными только тогда, когда понимаем, что на сервере есть еще данные
		dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	useInitialEffect(() => {
		// сначала инициализируем нужное значение лимит и отображение списка статей, а потом делаем запрос на сервер за нужным количеством статей
		dispatch(articlesPageActions.initState());
		dispatch(
			fetchArticlesList({
				page: 1,
			})
		);
	});

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page
				onlScrollEnd={onLoadNextPart}
				className={classNames(styles.ArticlesPage, {}, [className])}
			>
				{error ? (
					<Text text={t('Что-то пошло не так')} />
				) : (
					<>
						<ArticleViewSelector
							view={view}
							onViewClick={onChangeView}
						/>
						<ArticleList
							view={view}
							articles={articles}
							isLoading={isLoading}
						/>
					</>
				)}
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
