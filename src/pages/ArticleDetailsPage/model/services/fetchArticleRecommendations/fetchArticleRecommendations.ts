import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
	Article[],
	void,
	ThunkConfig<string>
>(
	'articleDetailsPage/fetchArticleRecommendations',
	async (_, { rejectWithValue, extra: { api } }) => {
		try {
			// понятно, что в реальном проекте мы бы запрашивали данные, которые являлись бы рекомендациями на основе каких-то может алгоритмов машинного обучения. Мы просто запросим 4 статьи
			const response = await api.get<Article[]>('/articles', {
				params: {
					_limit: 4,
				},
			});
			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (error) {
			return rejectWithValue('error');
		}
	},
);
