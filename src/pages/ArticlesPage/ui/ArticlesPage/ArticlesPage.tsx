import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import styles from './ArticlesPage.module.scss';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const dispatch = useAppDispatch();

	const onLoadNextPart = useCallback(() => {
		// делаем запрос за данными только тогда, когда понимаем, что на сервере есть еще данные
		dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Page
				onlScrollEnd={onLoadNextPart}
				className={classNames(styles.ArticlesPage, {}, [className])}
			>
				<ArticlesPageFilters />
				<ArticleInfiniteList className={styles.list} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
