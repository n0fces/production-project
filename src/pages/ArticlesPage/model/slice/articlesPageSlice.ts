import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageScheme } from '../types/articlesPageScheme';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateScheme>(
	(state) => state.articlesPage || articlesAdapter.getInitialState()
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
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		initState: (state) => {
			const view = localStorage.getItem(
				ARTICLE_VIEW_LOCALSTORAGE_KEY
			) as ArticleView;
			state.view = view;
			state.limit = view === ArticleView.BIG ? 4 : 9;
			state._inited = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticlesList.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(
				fetchArticlesList.fulfilled,
				(state, action: PayloadAction<Article[]>) => {
					state.isLoading = false;
					// нам нужно не полностью данные перезатирать, добавлять данные по мере скролла и подгрузки данные. Поэтому используем addMany, а не setAll, так как setAll будет перезатирать
					articlesAdapter.addMany(state, action.payload);
					// если при загрузке данных пришел массив, у которого ненулевая длина, то мы оставляем hasMore true
					state.hasMore = action.payload.length > 0;
				}
			)
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
