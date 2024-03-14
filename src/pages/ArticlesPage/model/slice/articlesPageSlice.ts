import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageScheme } from '../types/articlesPageScheme';
import { fetchArticlesList } from '../services/fetchArticlesList';

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
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
		},
		initState: (state) => {
			state.view = localStorage.getItem(
				ARTICLE_VIEW_LOCALSTORAGE_KEY
			) as ArticleView;
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
					articlesAdapter.setAll(state, action.payload);
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
