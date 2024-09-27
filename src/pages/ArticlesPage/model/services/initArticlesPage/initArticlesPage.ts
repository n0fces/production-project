import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import { SortOrder } from '@/shared/types/sort';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
	void,
	URLSearchParams,
	ThunkConfig<string>
>(
	'articlesPage/initArticlesPage',
	async (searchParams, { dispatch, getState }) => {
		const inited = getArticlesPageInited(getState());
		// * потом надо написать тест на то, что после инициализации данные диспачи не отработают (а в неинициализированном, наоборот, отрабатывают)
		if (!inited) {
			const orderFromURL = searchParams.get('order') as SortOrder;
			const sortFromURL = searchParams.get('sort') as ArticleSortField;
			const searchFromURL = searchParams.get('search');
			const typeFromURL = searchParams.get('type') as ArticleType;
			// Здесь Тимур упоминал, что эти ифы можно оптимизировать. Потом подумай, как это можно сделать, если по итогам курса этого не сделаем
			if (orderFromURL) {
				dispatch(articlesPageActions.setOrder(orderFromURL));
			}
			if (sortFromURL) {
				dispatch(articlesPageActions.setSort(sortFromURL));
			}
			if (searchFromURL) {
				dispatch(articlesPageActions.setSearch(searchFromURL));
			}
			if (typeFromURL) {
				dispatch(articlesPageActions.setType(typeFromURL));
			}
			// сначала инициализируем нужное значение лимит и отображение списка статей, а потом делаем запрос на сервер за нужным количеством статей
			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({}));
		}
	},
);
