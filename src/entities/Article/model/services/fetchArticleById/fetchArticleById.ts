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
			const response = await api.get<Article>(`/articles/${articleId}`, {
				params: {
					// чтобы бэк возвращал нам всю информацию о пользователе
					// нам нужны некоторые данные о пользователе, чтобы делать определенное отображение на уровне конкретной статьи
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
