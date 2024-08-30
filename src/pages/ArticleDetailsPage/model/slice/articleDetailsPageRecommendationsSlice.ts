import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { StateScheme } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { ArticleDetailsPageRecommendationsScheme } from '../types/articleDetailsPageRecommendationsScheme';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
});

export const getArticleRecommendations =
	recommendationsAdapter.getSelectors<StateScheme>(
		(state) =>
			state.articleDetailsPage?.recommendations ||
			recommendationsAdapter.getInitialState(),
	);

export const articleDetailsPageRecommendationsSlice = createSlice({
	name: 'articleDetailsPageRecommendationsSlice',
	initialState:
		recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsScheme>(
			{
				isLoading: false,
				error: undefined,
				ids: [],
				entities: {},
			},
		),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticleRecommendations.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(
				fetchArticleRecommendations.fulfilled,
				(state, action: PayloadAction<Article[]>) => {
					state.isLoading = false;
					recommendationsAdapter.setAll(state, action.payload);
				},
			)
			.addCase(fetchArticleRecommendations.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const {
	actions: articleDetailsPageRecommendationsActions,
	reducer: articleDetailsPageRecommendationsReducer,
} = articleDetailsPageRecommendationsSlice;
