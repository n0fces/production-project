import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';

import { StateScheme } from '@/app/providers/StoreProvider';

import {
	Article,
	ArticleSortField,
	ArticleType,
	ArticleView,
} from '@/entities/Article';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { SortOrder } from '@/shared/types/sort';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageScheme } from '../types/articlesPageScheme';

const articlesAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateScheme>(
	(state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageScheme>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
		view: ArticleView.SMALL,
		page: 1,
		hasMore: true,
		_inited: false,
		limit: 9,
		// сортировка по умолчанию будет по дате создания
		sort: ArticleSortField.CREATED,
		order: 'asc',
		search: '',
		type: ArticleType.ALL,
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.order = action.payload;
		},
		setSort: (state, action: PayloadAction<ArticleSortField>) => {
			state.sort = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload;
		},
		initState: (state) => {
			const view = localStorage.getItem(
				ARTICLE_VIEW_LOCALSTORAGE_KEY,
			) as ArticleView;
			state.view = view;
			state.limit = view === ArticleView.BIG ? 4 : 9;
			state._inited = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticlesList.pending, (state, action) => {
				state.isLoading = true;
				state.error = undefined;

				if (action.meta.arg.replace) {
					// когда мы хотим полностью перезагрузить данные, то можем при инициализации загрузки просто очистить существующий стейт
					articlesAdapter.removeAll(state);
				}
			})
			.addCase(fetchArticlesList.fulfilled, (state, action) => {
				state.isLoading = false;
				// будет запрашивать данные при достижении определенной позиции скролла до тех пор, пока с сервера прилетает больше либо равно лимита. Когда мы получили массив данных, длина которого меньше лимита, то это знак, что данных больше нет
				state.hasMore = action.payload.length >= state.limit;

				if (action.meta.arg.replace) {
					articlesAdapter.setAll(state, action.payload);
				} else {
					// нам нужно не полностью данные перезатирать, добавлять данные по мере скролла и подгрузки данные. Поэтому используем addMany, а не setAll, так как setAll будет перезатирать
					articlesAdapter.addMany(state, action.payload);
				}
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
