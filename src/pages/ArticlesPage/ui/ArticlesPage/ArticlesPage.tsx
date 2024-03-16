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
import { Page } from 'widgets/Page/Page';
import {
	ArticleList,
	ArticleView,
	ArticleViewSelector,
} from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
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
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

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

	// для этого компонента мы не будем удалять редьюсер, а заново при его появлении не хотим делать повторный запрос
	useInitialEffect(() => {
		dispatch(initArticlesPage());
	});

	return (
		<DynamicModuleLoader reducers={reducers}>
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
