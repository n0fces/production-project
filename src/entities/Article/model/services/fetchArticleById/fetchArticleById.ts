import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
	Article,
	string,
	ThunkConfig<string>
>(
	'articleDetails/fetchArticleById',
	async (articleId, { rejectWithValue, extra: { api } }) => {
		try {
			// делаем запрос за конкретной статьей
			const response = await api.get<Article>(`/articles/${articleId}`);
			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	}
);
