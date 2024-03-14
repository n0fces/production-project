import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<
	Article[],
	void,
	ThunkConfig<string>
>(
	'articlesPage/fetchArticlesList',
	async (_, { rejectWithValue, extra: { api } }) => {
		try {
			const response = await api.get<Article[]>('/articles', {
				params: {
					// нужно, чтобы отрисовывать аватарку пользователя, который написал статью при формате отображения статей BIG
					_expand: 'user',
				},
			});
			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (error) {
			return rejectWithValue('error');
		}
	}
);
